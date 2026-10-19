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

  it('supports some with native predicate arguments, thisArg, and short-circuiting', () => {
    const values = [1, 2, 3]
    const watched = arrayWatch(values)
    const receiver = { wanted: 2 }
    const predicate = jest.fn(function(this: typeof receiver, value: number, index: number, original: number[]) {
      expect(this).toBe(receiver)
      expect(original).toBe(values)
      expect(index).toBe(value - 1)
      return value === this.wanted
    })
    const found: boolean = watched.some(predicate, receiver)
    expect(found).toBe(true)
    expect(predicate).toHaveBeenCalledTimes(2)
    expect(renderTagUpdateArray).not.toHaveBeenCalled()
  })

  it('returns false without calling the predicate for an empty watched array', () => {
    const predicate = jest.fn(() => true)
    expect(arrayWatch<number>().some(predicate)).toBe(false)
    expect(predicate).not.toHaveBeenCalled()
  })

  it('keeps readers stable and current after mutation or value replacement', () => {
    const onChange = jest.fn()
    const watched = arrayWatch([1], onChange)
    const some = watched.some
    const map = watched.map
    const results: boolean[] = []
    const unsubscribe = watched.subscribe(() => results.push(some(value => value > 2)))
    expect(some).toBe(watched.some)
    expect(results).toEqual([false])
    expect(some(value => value > 2)).toBe(false)
    expect(onChange).not.toHaveBeenCalled()
    expect(renderTagUpdateArray).not.toHaveBeenCalled()

    watched.push(3)
    watched[1] = 0
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(renderTagUpdateArray).toHaveBeenCalledTimes(2)
    watched.value = [4]
    expect(results).toEqual([false, true, false, true])
    expect(some(value => value > 2)).toBe(true)
    expect(map(value => value * 2)).toEqual([8])
    // Replacing .value emits the signal, but does not use the mutation render hook.
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(renderTagUpdateArray).toHaveBeenCalledTimes(2)
    unsubscribe.unsubscribe()
  })

})
