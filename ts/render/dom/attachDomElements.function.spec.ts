import { attachDomElements } from './attachDomElements.function.js'
import { ObjectElement } from '../../interpolations/optimizers/ObjectNode.types.js'
import { AnySupport } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { SupportContextItem } from '../../tag/SupportContextItem.type.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { paintCommands, paintAppends } from '../paint.function.js'
import { SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'

// Mock document for testing
const mockElement = {
  tagName: 'DIV',
  setAttribute: () => undefined,
  removeAttribute: () => undefined,
  addEventListener: () => undefined,
  appendChild: () => undefined,
  insertBefore: () => undefined,
  style: {},
}

global.document = {
  createElement: (tagName: string) => {
    const mine = {...mockElement}
    mine.tagName = tagName.toUpperCase()
    return mine
  },
  createTextNode: jest.fn((text: string) => ({
    textContent: text,
    nodeType: 3,
  })),
} as any

describe('attachDomElements', () => {
  beforeEach(() => {
    // Clear paint commands before each test
    paintCommands.length = 0
    paintAppends.length = 0
    // Clear mock calls
    jest.clearAllMocks()
  })

  it('should create attribute contexts with proper parent-child relationship', () => {
    // Create a mock DOM structure with attributes that reference dynamic values
    // Dynamic attributes use { tagJsVar: index } to reference values array
    const nodes: ObjectElement[] = [{
      nn: 'div',
      at: [
        ['id', {tagJsVar:0}, false], // dynamic attribute referencing value at index 0
        ['class', {tagJsVar:1}, false], // dynamic attribute referencing value at index 1
       ],
      ch: [{
        nn: 'span',
        at: [
          ['id', {tagJsVar:2}, false], // dynamic attribute referencing value at index 0
        ]
      }] // no children for simplicity
    }]

    // Mock values for the attributes - these will be used for dynamic attributes
    const values = ['my-id', 'my-class','span-id']

    // Mock global object
    const mockGlobal: SupportTagGlobal = {
      destroy$: {} as any,
      blocked: [],
      oldest: {} as any,
      newest: {} as any,
      providers: [],
    }

    // Mock support context
    const mockSupportContext: SupportContextItem = {
      valueIndex: 0,
      value: null,
      tagJsVar: {
        tagJsType: ValueTypes.tag,
        processInitAttribute: jest.fn(),
        processInit: jest.fn(),
        processUpdate: jest.fn(),
        destroy: jest.fn(),
        hasValueChanged: jest.fn(() => 0),
      },
      withinOwnerElement: true,
      parentContext: {} as ContextItem,
      contexts: [],
      global: mockGlobal,
      renderCount: 0,
    }

    // Mock support object
    const mockSupport: AnySupport = {
      context: mockSupportContext,
      appSupport: {} as any,
      templater: {} as any,
      state: {} as any,
      states: [],
    }

    // Mock parent context
    const mockParentContext: ContextItem = {
      valueIndex: -1,
      value: null,
      tagJsVar: {
        tagJsType: 'parent',
        processInitAttribute: jest.fn(),
        processInit: jest.fn(),
        processUpdate: jest.fn(),
        destroy: jest.fn(),
        hasValueChanged: jest.fn(() => 0),
      },
      withinOwnerElement: true,
      parentContext: {} as ContextItem,
    }

    // Initial contexts array
    const contexts: ContextItem[] = []

    // Call attachDomElements
    const result = attachDomElements(
      nodes,
      values,
      mockSupport,
      mockParentContext,
      contexts,
      0, // depth
      undefined, // appendTo
      undefined, // insertBefore
    )

    // Verify the result structure
    expect(result).toHaveProperty('dom')
    expect(result).toHaveProperty('contexts')
    expect(result.contexts).toBeInstanceOf(Array)
    expect(result.contexts.length).toBe(3)

    const lastContext = result.contexts[2]
    expect(lastContext.parentContext.isAttrs).toBe(true)
    const trueParentContext = result.contexts[1]
    expect(trueParentContext.parentContext.contexts).toContain(trueParentContext)

    // The contexts array should contain the attribute contexts that were created
    const dynamicAttrContexts = result.contexts.filter(ctx => ctx.isAttr === true)
    
    // We should have contexts for our dynamic attributes (3 total: 2 for div, 1 for span)
    expect(dynamicAttrContexts.length).toBe(3)
    
    // Each dynamic attribute context should have proper parent relationship
    for (const attrContext of dynamicAttrContexts) {
      const parentContext = attrContext.parentContext
      // Each attribute context should have a parentContext
      expect(parentContext).toBeDefined()
      
      // The parentContext should have isAttrs: true
      expect(parentContext.isAttrs).toBe(true)
      
      // The parentContext should have a contexts array containing this attribute
      expect(parentContext.contexts).toBeDefined()
      expect(parentContext.contexts).toContain(attrContext)
      
      // The parentContext should have the element
      expect(parentContext.element).toBeDefined()
    }
  })

  it('should handle elements with no attributes', () => {
    // Create a mock DOM structure without attributes
    const nodes: ObjectElement[] = [{
      nn: 'span',
      at: [], // empty attributes array
      ch: undefined // no children
    }]

    const values: any[] = []

    // Mock global object
    const mockGlobal: SupportTagGlobal = {
      destroy$: {} as any,
      blocked: [],
      oldest: {} as any,
      newest: {} as any,
      providers: [],
    }

    // Mock support context
    const mockSupportContext: SupportContextItem = {
      valueIndex: 0,
      value: null,
      tagJsVar: {
        tagJsType: ValueTypes.tag,
        processInitAttribute: jest.fn(),
        processInit: jest.fn(),
        processUpdate: jest.fn(),
        destroy: jest.fn(),
        hasValueChanged: jest.fn(() => 0),
      },
      withinOwnerElement: true,
      parentContext: {} as ContextItem,
      contexts: [],
      global: mockGlobal,
      renderCount: 0,
    }

    const mockSupport: AnySupport = {
      context: mockSupportContext,
      appSupport: {} as any,
      templater: {} as any,
    }

    const mockParentContext: ContextItem = {
      valueIndex: -1,
      value: null,
      tagJsVar: {
        tagJsType: 'parent',
        processInitAttribute: jest.fn(),
        processInit: jest.fn(),
        processUpdate: jest.fn(),
        destroy: jest.fn(),
        hasValueChanged: jest.fn(() => 0),
      },
      withinOwnerElement: true,
      parentContext: {} as ContextItem,
    }

    const contexts: ContextItem[] = []

    const result = attachDomElements(
      nodes,
      values,
      mockSupport,
      mockParentContext,
      contexts,
      0,
      undefined,
      undefined,
    )

    // Should have no attribute contexts since there are no dynamic attributes
    const dynamicAttrContexts = result.contexts.filter(ctx => ctx.isAttr === true)
    expect(dynamicAttrContexts.length).toBe(0)
  })

  it('should handle nested elements with attributes', () => {
    // Create a mock DOM structure with nested elements
    const nodes: ObjectElement[] = [{
      nn: 'div',
      at: [
        ['id', {tagJsVar:0}, false],
      ],
      ch: [{
        nn: 'span',
        at: [
          ['class', {tagJsVar:1}, false],
        ],
        ch: undefined
      }]
    }]

    const values = ['parent-id', 'child-class']

    // Mock global object
    const mockGlobal: SupportTagGlobal = {
      destroy$: {} as any,
      blocked: [],
      oldest: {} as any,
      newest: {} as any,
      providers: [],
    }

    // Mock support context
    const mockSupportContext: SupportContextItem = {
      valueIndex: 0,
      value: null,
      tagJsVar: {
        tagJsType: ValueTypes.tag,
        processInitAttribute: jest.fn(),
        processInit: jest.fn(),
        processUpdate: jest.fn(),
        destroy: jest.fn(),
        hasValueChanged: jest.fn(() => 0),
      },
      withinOwnerElement: true,
      parentContext: {} as ContextItem,
      contexts: [],
      global: mockGlobal,
      renderCount: 0,
      
      state: {
        newer: {
          state: [],
          states: [],
        }
      },
    }

    const mockSupport: AnySupport = {
      context: mockSupportContext,
      appSupport: {} as any,
      templater: {} as any,
    }

    const mockParentContext: ContextItem = {
      valueIndex: -1,
      value: null,
      tagJsVar: {
        tagJsType: 'parent',
        processInitAttribute: jest.fn(),
        processInit: jest.fn(),
        processUpdate: jest.fn(),
        destroy: jest.fn(),
        hasValueChanged: jest.fn(() => 0),
      },
      withinOwnerElement: true,
      parentContext: {} as ContextItem,
    }

    const contexts: ContextItem[] = []

    const result = attachDomElements(
      nodes,
      values,
      mockSupport,
      mockParentContext,
      contexts,
      0,
      undefined,
      undefined,
    )

    // Should have attribute contexts for dynamic attributes (2 total: 1 for div, 1 for span)
    const dynamicAttrContexts = result.contexts.filter(ctx => ctx.isAttr === true)
    expect(dynamicAttrContexts.length).toBe(2)
    
    // Each dynamic attribute context should have proper parent relationship
    for (const attrContext of dynamicAttrContexts) {
      const parentContext = attrContext.parentContext
      // Each attribute context should have a parentContext
      expect(parentContext).toBeDefined()
      
      // The parentContext should have isAttrs: true
      expect(parentContext.isAttrs).toBe(true)
      
      // The parentContext should have a contexts array containing this attribute
      expect(parentContext.contexts).toBeDefined()
      expect(parentContext.contexts).toContain(attrContext)
      
      // The parentContext should have the element
      expect(parentContext.element).toBeDefined()
    }
  })
})