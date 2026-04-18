import { output, syncWrapCallback } from './output.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { paintAfters, painting } from '../render/paint.function.js'
import { getContextInCycle, isPromise, paint } from '../index.js'
import { findStateSupportUpContext } from '../interpolations/attributes/getSupportWithState.function.js'
import { removeContextInCycle, setContextInCycle } from './cycles/setContextInCycle.function.js'

jest.mock('../index.js', () => ({
  getContextInCycle: jest.fn(),
  isPromise: jest.fn(),
  paint: jest.fn(),
}))

jest.mock('../render/paint.function.js', () => ({
  paintAfters: [],
  painting: { locks: 0 },
}))

jest.mock('./props/safeRenderSupport.function.js', () => ({
  safeRenderSupport: jest.fn(),
}))

jest.mock('../interpolations/attributes/getSupportWithState.function.js', () => ({
  findStateSupportUpContext: jest.fn(),
}))

jest.mock('./cycles/setContextInCycle.function.js', () => ({
  removeContextInCycle: jest.fn(),
  setContextInCycle: jest.fn(),
}))

describe('output.function', () => {
  beforeEach(() => {
    paintAfters.length = 0
    painting.locks = 0
    ;(isPromise as jest.Mock).mockImplementation((value: unknown) => {
      return !!value && typeof (value as Promise<unknown>).then === 'function'
    })
  })

  it('returns blankHandler when callback is missing', () => {
    expect(output(undefined as any)).toBe(blankHandler)
  })

  it('schedules a second paint callback when wrapped callback returns a promise', async () => {
    const context = {
      global: undefined,
      value: 'value',
      tagJsVar: { processUpdate: jest.fn() },
    } as any

    let resolvePromise!: () => void
    const pending = new Promise<void>((resolve) => {
      resolvePromise = resolve
    })

    syncWrapCallback([], () => pending, context)

    expect(paintAfters).toHaveLength(1)

    resolvePromise()
    await pending

    expect(paintAfters).toHaveLength(2)
  })

  it('runs processUpdate for uncommitted contexts in after-paint callback', () => {
    const processUpdate = jest.fn()
    const context = {
      global: undefined,
      value: 'value',
      tagJsVar: { processUpdate },
    } as any

    syncWrapCallback([], () => 'ok', context)

    expect(paintAfters).toHaveLength(1)
    const [command, args] = paintAfters[0] as [(...args: any[]) => unknown, any[]]
    command(...args)

    expect(processUpdate).toHaveBeenCalledWith('value', context, undefined, [])
    expect(paint).toHaveBeenCalledTimes(1)
    expect(painting.locks).toBe(0)
  })

  it('wraps callbacks with the owner context and marks them as wrapped', () => {
    const ownerContext = { id: 'owner' }
    ;(getContextInCycle as jest.Mock).mockReturnValue({ id: 'render-context' })
    ;(findStateSupportUpContext as jest.Mock).mockReturnValue({
      ownerSupport: { context: ownerContext },
    })

    const callback = jest.fn(() => 'done')
    const wrapped = output(callback)

    expect((wrapped as any).wrapped).toBe(true)

    wrapped('arg')

    expect(setContextInCycle).toHaveBeenCalledWith(ownerContext)
    expect(removeContextInCycle).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('arg')
  })

  it('returns callbacks that are already wrapped without creating a new wrapper', () => {
    ;(getContextInCycle as jest.Mock).mockReturnValue({ id: 'render-context' })
    ;(findStateSupportUpContext as jest.Mock).mockReturnValue({
      ownerSupport: { context: { id: 'owner' } },
    })

    const callback = (() => 'done') as any
    callback.wrapped = true

    expect(output(callback)).toBe(callback)
  })
})
