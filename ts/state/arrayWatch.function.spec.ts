import { arrayWatch } from './arrayWatch.function.js'
import { getContextInCycle } from '../index.js'
import { findStateSupportUpContext } from '../interpolations/attributes/getSupportWithState.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'

jest.mock('../index.js', () => {
  const actual = jest.requireActual('../index.js')
  return {
    ...actual,
    getContextInCycle: jest.fn(),
  }
})

jest.mock('../interpolations/attributes/getSupportWithState.function.js', () => ({
  findStateSupportUpContext: jest.fn(),
}))

jest.mock('../interpolations/attributes/renderTagArray.function.js', () => ({
  renderTagUpdateArray: jest.fn(),
}))

describe('arrayWatch.function', () => {
  const context = { state: { newest: {} } } as any
  const support = { context } as any

  beforeEach(() => {
    ;(getContextInCycle as jest.Mock).mockReturnValue(context)
    ;(findStateSupportUpContext as jest.Mock).mockReturnValue(support)
  })

  it('exposes array readers and index/length access', () => {
    const watched = arrayWatch([1, 2, 3])

    expect(watched.length).toBe(3)
    expect(watched[0]).toBe(1)
    expect(watched.map(x => x * 2)).toEqual([2, 4, 6])
  })

  it('calls onChange and render once for an editor mutation', () => {
    const onChange = jest.fn()
    const watched = arrayWatch<number>([1], onChange)

    watched.push(2)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith([1, 2])
    expect(renderTagUpdateArray).toHaveBeenCalledTimes(1)
    expect(renderTagUpdateArray).toHaveBeenLastCalledWith([support])
  })

  it('calls onChange and render for index assignment and length truncation', () => {
    const seen: number[][] = []
    const onChange = jest.fn((array: number[]) => {
      seen.push([...array])
    })
    const watched = arrayWatch<number>([1, 2, 3], onChange)

    watched[1] = 99
    watched.length = 1

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(seen).toEqual([[1, 99, 3], [1]])
    expect(renderTagUpdateArray).toHaveBeenCalledTimes(2)
  })

  it('does not render for reader methods', () => {
    const onChange = jest.fn()
    const watched = arrayWatch<number>([1, 2, 3], onChange)

    const result = watched.filter(x => x > 1)

    expect(result).toEqual([2, 3])
    expect(onChange).not.toHaveBeenCalled()
    expect(renderTagUpdateArray).not.toHaveBeenCalled()
  })

  it('returns stable editor and reader function references', () => {
    const watched = arrayWatch<number>([1, 2, 3])

    expect(watched.push).toBe(watched.push)
    expect(watched.splice).toBe(watched.splice)
    expect(watched.map).toBe(watched.map)
  })
})
