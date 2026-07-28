import { enqueueBatchAfterUnique } from '../../../render/paint.function.js'
import { ContextItem } from '../../ContextItem.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { processTagArray } from './processTagArray.js'

jest.mock('./createAndProcessContextItem.function.js', () => ({
  createAndProcessContextItem: jest.fn(),
}))

jest.mock('../../../render/paint.function.js', () => ({
  enqueueBatchAfterUnique: jest.fn(),
}))

type TestValue = {
  arrayValue: string
  render: string
}

type TestContext = ContextItem & {
  domNode: {
    id: string
    marker?: { connected: boolean }
  }
  destroyCount: number
}

type RenderedValue = string | null | RenderedValue[]
type TestHandler = (...args: any[]) => unknown

const createContextMock = createAndProcessContextItem as jest.Mock
const enqueueBatchMock = enqueueBatchAfterUnique as jest.Mock

let pendingUpdates: Map<ContextItem, [TestHandler, any[]]>

function keyed(arrayValue: string, render = arrayValue): TestValue {
  return { arrayValue, render }
}

function flushPendingUpdates() {
  const updates = [...pendingUpdates.values()]
  pendingUpdates.clear()

  for (const [handler, args] of updates) {
    handler(...args)
  }
}

function renderedValues(context: ContextItem): RenderedValue[] {
  return (context.lastArray as TestContext[]).map((item): RenderedValue => {
    if(Array.isArray(item.value)) {
      return renderedValues(item)
    }

    return (item.value as TestValue | null)?.render ?? null
  })
}

function processValues(
  context: ContextItem,
  values: Array<TestValue | null | (() => TestValue | null) | any[]>,
  ownerSupport: any,
) {
  processTagArray(context, values as any, ownerSupport)
}

describe('processTagArray reconciliation', () => {
  const ownerSupport = {
    context: {},
  } as any

  beforeEach(() => {
    pendingUpdates = new Map()
    enqueueBatchMock.mockImplementation(
      (context: ContextItem, command: [TestHandler, any[]]) => {
        pendingUpdates.set(context, command)
      },
    )

    createContextMock.mockImplementation(
      (
        value: TestValue | null | any[],
        contextOwnerSupport: any,
        _contexts: ContextItem[],
        insertBefore?: Text,
      ): TestContext => {
        const context = {
          value,
          updateCount: 0,
          withinOwnerElement: false,
          parentContext: {},
          arrayStartMarker: { id: `start-${createContextMock.mock.calls.length}` },
          placeholder: insertBefore || { id: 'placeholder' },
          domNode: {
            id: Array.isArray(value) ? 'array' : value?.arrayValue || 'empty',
          },
          destroyCount: 0,
          destroy$: {},
          render$: {},
        } as unknown as TestContext

        if(Array.isArray(value)) {
          context.tagJsVar = {
            tagJsType: 'array',
            processUpdate: (newValue: any[]) => {
              processValues(context, newValue, contextOwnerSupport)
              context.value = newValue
              return 0
            },
            destroy: () => {
              ++context.destroyCount
              for (const child of context.lastArray || []) {
                child.tagJsVar.destroy(child, contextOwnerSupport)
              }
            },
          } as any
          processValues(context, value, contextOwnerSupport)
          return context
        }

        context.tagJsVar = {
          tagJsType: value ? 'test' : 'simple',
          hasValueChanged: () => 0,
          processUpdate: (newValue: TestValue | null) => {
            const oldValue = context.value as TestValue | null
            if(oldValue?.arrayValue !== newValue?.arrayValue) {
              if(oldValue) {
                ++context.destroyCount
              }
              context.domNode = {
                id: newValue?.arrayValue || 'empty',
              }
            }

            context.value = newValue
            context.tagJsVar = {
              ...context.tagJsVar,
              tagJsType: newValue ? 'test' : 'simple',
            }
            return 0
          },
          destroy: () => {
            ++context.destroyCount
          },
        } as any

        return context
      },
    )
  })

  it('preserves an unchanged keyed sibling when the preceding item becomes null', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(
      arrayContext,
      [keyed('A'), keyed('B'), keyed('C')],
      ownerSupport,
    )

    const initial = arrayContext.lastArray as TestContext[]
    const nodeA = initial[0].domNode
    const nodeB = initial[1].domNode
    const nodeC = initial[2].domNode
    const contextB = initial[1]
    const contextC = initial[2]

    processValues(
      arrayContext,
      [keyed('A', 'A2'), null, keyed('C', 'C2')],
      ownerSupport,
    )
    flushPendingUpdates()

    const updated = arrayContext.lastArray as TestContext[]
    expect(renderedValues(arrayContext)).toEqual(['A2', null, 'C2'])
    expect(updated[0].domNode).toBe(nodeA)
    expect(updated[2]).toBe(contextC)
    expect(updated[2].domNode).toBe(nodeC)
    expect(contextB.destroyCount).toBe(1)
    expect(contextC.destroyCount).toBe(0)

    processValues(
      arrayContext,
      [keyed('A', 'A3'), keyed('B', 'B2'), keyed('C', 'C3')],
      ownerSupport,
    )
    flushPendingUpdates()

    const restored = arrayContext.lastArray as TestContext[]
    expect(restored[0].domNode).toBe(nodeA)
    expect(restored[1].domNode).not.toBe(nodeB)
    expect(restored[2]).toBe(contextC)
    expect(restored[2].domNode).toBe(nodeC)
    expect(contextB.destroyCount).toBe(1)
  })

  it('preserves a shifted keyed sibling when an empty middle slot is removed', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(
      arrayContext,
      [keyed('A'), null, keyed('C')],
      ownerSupport,
    )

    const initial = arrayContext.lastArray as TestContext[]
    const emptyContext = initial[1]
    const contextC = initial[2]
    const nodeC = contextC.domNode

    processValues(
      arrayContext,
      [keyed('A', 'A2'), keyed('C', 'C2')],
      ownerSupport,
    )
    flushPendingUpdates()

    const updated = arrayContext.lastArray as TestContext[]
    expect(renderedValues(arrayContext)).toEqual(['A2', 'C2'])
    expect(updated[1]).toBe(contextC)
    expect(updated[1].domNode).toBe(nodeC)
    expect(emptyContext.destroyCount).toBe(1)
    expect(contextC.destroyCount).toBe(0)
  })

  it('does not publish a deferred value before its update handler runs', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem
    const oldA = keyed('A', 'old A')
    const oldB = keyed('B', 'old B')

    processValues(arrayContext, [oldA, oldB], ownerSupport)

    const contextA = (arrayContext.lastArray as TestContext[])[0]
    const newA = keyed('A', 'new A')

    processValues(
      arrayContext,
      [newA, keyed('B', 'new B'), keyed('C', 'new C')],
      ownerSupport,
    )

    expect(contextA.value).toBe(oldA)

    flushPendingUpdates()
    expect(contextA.value).toBe(newA)
  })

  it('updates the event-owning locked item before deferring its siblings', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem
    const oldA = keyed('A', 'old A')
    const oldB = keyed('B', 'old B')

    processValues(arrayContext, [oldA, oldB], ownerSupport)

    const [contextA, contextB] = arrayContext.lastArray as TestContext[]
    contextA.locked = 1
    const newA = keyed('A', 'new A')
    const newB = keyed('B', 'new B')

    processValues(arrayContext, [newA, newB], ownerSupport)

    expect(contextA.value).toBe(newA)
    expect(contextB.value).toBe(oldB)
    expect(pendingUpdates.has(contextA)).toBe(false)
    expect(pendingUpdates.has(contextB)).toBe(true)

    flushPendingUpdates()
    expect(contextB.value).toBe(newB)
  })

  it('inserts a newly unshifted keyed item before the next retained item', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(arrayContext, [keyed('1')], ownerSupport)
    const context1 = (arrayContext.lastArray as TestContext[])[0]
    const context1Start = (context1 as any).arrayStartMarker
    createContextMock.mockClear()

    processValues(
      arrayContext,
      [keyed('2'), keyed('1')],
      ownerSupport,
    )

    expect(createContextMock).toHaveBeenCalledTimes(1)
    expect(createContextMock.mock.calls[0][0]).toEqual(keyed('2'))
    expect(createContextMock.mock.calls[0][3]).toBe(context1Start)
  })

  it.each([
    {
      name: 'empty slot becomes content',
      initial: [keyed('A'), null, keyed('C')],
      next: [keyed('A', 'A2'), keyed('B'), keyed('C', 'C2')],
      expected: ['A2', 'B', 'C2'],
      retained: ['A', 'C'],
    },
    {
      name: 'empty middle slot is inserted',
      initial: [keyed('A'), keyed('C')],
      next: [keyed('A', 'A2'), null, keyed('C', 'C2')],
      expected: ['A2', null, 'C2'],
      retained: ['A', 'C'],
    },
    {
      name: 'leading empty position becomes content',
      initial: [null, keyed('B')],
      next: [keyed('A'), keyed('B', 'B2')],
      expected: ['A', 'B2'],
      retained: ['B'],
    },
    {
      name: 'multiple empty positions become content',
      initial: [keyed('A'), null, null, keyed('D')],
      next: [keyed('A', 'A2'), keyed('B'), keyed('C'), keyed('D', 'D2')],
      expected: ['A2', 'B', 'C', 'D2'],
      retained: ['A', 'D'],
    },
  ])('$name without replacing unaffected keyed nodes', ({
    initial,
    next,
    expected,
    retained,
  }) => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(arrayContext, initial, ownerSupport)

    const originalByKey = new Map(
      (arrayContext.lastArray as TestContext[])
        .filter(item => item.arrayValue !== undefined)
        .map(item => [item.arrayValue, item]),
    )

    processValues(arrayContext, next, ownerSupport)
    flushPendingUpdates()

    expect(renderedValues(arrayContext)).toEqual(expected)
    for (const key of retained) {
      const retainedContext = (arrayContext.lastArray as TestContext[])
        .find(item => item.arrayValue === key)
      expect(retainedContext).toBe(originalByKey.get(key))
    }
  })

  it('handles keyed length growth and shrink without destroying retained nodes', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(arrayContext, [keyed('A'), keyed('B')], ownerSupport)
    const initial = arrayContext.lastArray as TestContext[]
    const contextA = initial[0]
    const contextB = initial[1]

    processValues(
      arrayContext,
      [keyed('A', 'A2'), keyed('B', 'B2'), keyed('C')],
      ownerSupport,
    )
    flushPendingUpdates()
    const contextC = (arrayContext.lastArray as TestContext[])[2]

    expect(renderedValues(arrayContext)).toEqual(['A2', 'B2', 'C'])
    expect((arrayContext.lastArray as TestContext[])[0]).toBe(contextA)
    expect((arrayContext.lastArray as TestContext[])[1]).toBe(contextB)

    processValues(
      arrayContext,
      [keyed('A', 'A3'), keyed('C', 'C2')],
      ownerSupport,
    )
    flushPendingUpdates()

    expect(renderedValues(arrayContext)).toEqual(['A3', 'C2'])
    expect((arrayContext.lastArray as TestContext[])[0]).toBe(contextA)
    expect((arrayContext.lastArray as TestContext[])[1]).toBe(contextC)
    expect(contextB.destroyCount).toBe(1)
    expect(contextC.destroyCount).toBe(0)
  })

  it('reuses a leading empty slot as its content appears and disappears', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(arrayContext, [null, keyed('B')], ownerSupport)
    const emptyContext = (arrayContext.lastArray as TestContext[])[0]
    const contextB = (arrayContext.lastArray as TestContext[])[1]
    const nodeB = contextB.domNode

    processValues(
      arrayContext,
      [keyed('A'), keyed('B', 'B2')],
      ownerSupport,
    )
    expect((arrayContext.lastArray as TestContext[])[0]).toBe(emptyContext)
    expect((arrayContext.lastArray as TestContext[])[1]).toBe(contextB)
    expect(contextB.domNode).toBe(nodeB)

    processValues(
      arrayContext,
      [null, keyed('B', 'B3')],
      ownerSupport,
    )

    expect(renderedValues(arrayContext)).toEqual([null, 'B3'])
    expect((arrayContext.lastArray as TestContext[])[0]).toBe(emptyContext)
    expect((arrayContext.lastArray as TestContext[])[1]).toBe(contextB)
    expect(emptyContext.destroyCount).toBe(1)
    expect(contextB.destroyCount).toBe(0)
  })

  it('preserves imperative DOM owned by an unchanged keyed child', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(
      arrayContext,
      [keyed('A'), keyed('B'), keyed('C')],
      ownerSupport,
    )
    const contextC = (arrayContext.lastArray as TestContext[])[2]
    const marker = { connected: true }
    contextC.domNode.marker = marker

    processValues(
      arrayContext,
      [keyed('A', 'A2'), null, keyed('C', 'C2')],
      ownerSupport,
    )
    flushPendingUpdates()

    const retainedC = (arrayContext.lastArray as TestContext[])[2]
    expect(retainedC).toBe(contextC)
    expect(retainedC.domNode.marker).toBe(marker)
    expect(marker.connected).toBe(true)
    expect(contextC.destroyCount).toBe(0)
  })

  it('applies the same keyed reconciliation inside nested arrays', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(
      arrayContext,
      [[keyed('A'), null, keyed('C')]],
      ownerSupport,
    )
    const nestedContext = (arrayContext.lastArray as TestContext[])[0]
    const contextC = (nestedContext.lastArray as TestContext[])[2] as TestContext

    processValues(
      arrayContext,
      [[keyed('A', 'A2'), keyed('C', 'C2')]],
      ownerSupport,
    )
    flushPendingUpdates()

    expect(renderedValues(arrayContext)).toEqual([['A2', 'C2']])
    expect((nestedContext.lastArray as TestContext[])[1]).toBe(contextC)
    expect(contextC.destroyCount).toBe(0)
  })

  it('evaluates callable entries once per reconciliation', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem
    const callableA = jest.fn(() => keyed('A'))
    const callableB = jest.fn(() => keyed('B'))

    processValues(arrayContext, [callableA, callableB], ownerSupport)
    expect(callableA).toHaveBeenCalledTimes(1)
    expect(callableB).toHaveBeenCalledTimes(1)

    processValues(arrayContext, [callableA, callableB], ownerSupport)
    expect(callableA).toHaveBeenCalledTimes(2)
    expect(callableB).toHaveBeenCalledTimes(2)
  })

  it('treats an empty string as an explicit key', () => {
    const arrayContext = {
      placeholder: { id: 'array-end' },
    } as unknown as ContextItem

    processValues(
      arrayContext,
      [null, keyed(''), keyed('C')],
      ownerSupport,
    )
    const emptyKeyContext = (arrayContext.lastArray as TestContext[])[1]

    processValues(
      arrayContext,
      [keyed('', 'empty key shifted'), keyed('C')],
      ownerSupport,
    )
    flushPendingUpdates()

    expect((arrayContext.lastArray as TestContext[])[0]).toBe(emptyKeyContext)
    expect(renderedValues(arrayContext)[0]).toBe('empty key shifted')
    expect(emptyKeyContext.destroyCount).toBe(0)
  })
})
