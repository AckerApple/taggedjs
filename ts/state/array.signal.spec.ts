import { array } from './array.signal.js'

describe('array.some', () => {
  it('returns a boolean with native predicate arguments and thisArg', () => {
    const values = [2, 4, 6]
    const items = array(values)
    const receiver = { minimum: 4 }
    const calls: Array<[number, number, number[], unknown]> = []
    const result: boolean = items.some(function(this: typeof receiver, value, index, original) {
      calls.push([value, index, original, this])
      return value >= this.minimum
    }, receiver)

    expect(result).toBe(true)
    expect(calls).toEqual([[2, 0, values, receiver], [4, 1, values, receiver]])
    expect(calls[0][2]).toBe(values)
    expect(items.some(value => value > 10)).toBe(false)
  })

  it('short-circuits and never calls the predicate for an empty array', () => {
    const predicate = jest.fn((value: number) => value === 2)
    expect(array([1, 2, 3]).some(predicate)).toBe(true)
    expect(predicate.mock.calls).toEqual([[1, 0, expect.any(Array)], [2, 1, expect.any(Array)]])
    predicate.mockClear()
    expect(array<number>().some(predicate)).toBe(false)
    expect(predicate).not.toHaveBeenCalled()
  })

  it('uses native sparse-array and predicate-validation semantics', () => {
    const values = new Array<number>(3)
    values[2] = 8
    const predicate = jest.fn(() => false)
    expect(array(values).some(predicate)).toBe(false)
    expect(predicate).toHaveBeenCalledTimes(1)
    expect(predicate).toHaveBeenCalledWith(8, 2, values)
    expect(() => array([1]).some(null as any)).toThrow(TypeError)
  })

  it('recomputes on emitted mutations and replacement without emitting on reads', () => {
    const items = array([1])
    const results: boolean[] = []
    const unsubscribe = items.subscribe(() => {
      results.push(items.some(value => value > 2))
    })
    expect(results).toEqual([false])
    expect(items.some(value => value === 1)).toBe(true)
    expect(results).toEqual([false])

    items.push(3)
    items[1] = 0
    items.value = [4]
    items.length = 0
    expect(results).toEqual([false, true, false, true, false])
    unsubscribe.unsubscribe()
    items.push(5)
    expect(results).toHaveLength(5)
  })

  it('retains the existing typed Array<T> predicate API', () => {
    const items = array([{ id: 'one' }])
    const found: boolean = items.some((value, index, original) => {
      const id: string = value.id
      const position: number = index
      const sameType: Array<{ id: string }> = original
      return id === 'one' && position === 0 && sameType.length === 1
    })
    expect(found).toBe(true)
  })
})
