import { tag } from './tag.function.js'
import { host } from './host.function.js'
import { ContextItem, html } from '../tag/index.js'
import { setContextInCycle, removeContextInCycle } from '../tag/cycles/setContextInCycle.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'

describe('tag.inject', () => {
  afterEach(() => {
    // Clean up any context that might be left over
    removeContextInCycle()
  })

  it('should inject host return value into child context', () => {
    // Create a host that returns a value
    const parentHost = host((color: string) => {
      return { color, title: 'parentHost' }
    })

    const tagJsVar = {
      tagJsType: ValueTypes.host,
      options: {
        callback: parentHost.options.callback
      },
      matchesInjection: parentHost.matchesInjection
    } as any

    const aContext = {
      isAttr: true,
      tagJsVar: tagJsVar,
      returnValue: { color: 'red', title: 'parentHost' }
    } as any

    // Simulate a parent context with the host
    const parentContext = {
      isAttrs: true,
      contexts: [aContext]
    } as any as ContextItem

    // Simulate a child context
    const childContext: any = {
      parentContext
    }

    // Set the child context as current
    setContextInCycle(childContext)

    // Call tag.inject from the child
    const injectedValue = tag.inject(parentHost)

    // Verify the injected value matches the parent's return value
    expect(injectedValue).toEqual({ color: 'red', title: 'parentHost' })
  })

  it('should inject tag component into child context', () => {
    // Create a tag component
    const parentTag = tag(() => html`<div>Parent</div>`)

    // Create a wrapper mock
    const mockWrapper: any = {
      original: parentTag.original,
      tagJsType: ValueTypes.tagComponent
    }

    // Create a templater mock with matchesInjection
    const mockTemplater: any = {
      tagJsType: ValueTypes.templater,
      wrapper: mockWrapper,
      matchesInjection: (inject: any, context: ContextItem) => {
        if(mockTemplater.wrapper === inject || mockTemplater.wrapper?.original === inject?.original) {
          return context
        }
      }
    }

    // Simulate a parent context with the tag component
    const parentContext: any = {
      tagJsVar: mockTemplater,
      returnValue: parentTag
    }

    // Simulate a child context
    const childContext: any = {
      parentContext
    }

    // Set the child context as current
    setContextInCycle(childContext)

    // Call tag.inject from the child
    const injectedValue = tag.inject(parentTag)

    // Verify the injected value is the parent tag
    expect(injectedValue).toBe(parentTag)
  })

  it('should throw error when no context is available', () => {
    // Ensure no context is set
    removeContextInCycle()

    const testHost = host(() => ({ test: 'value' }))

    // Should throw when no context
    expect(() => tag.inject(testHost)).toThrow('tag.inject can only be called within a tag or host context')
  })

  it('should throw error when parent context is not found', () => {
    const testHost = host(() => ({ test: 'value' }))
    const differentHost = host(() => ({ different: 'value' }))

    // Simulate a context without matching parent
    const parentContext: any = {
      isAttrs: true,
      contexts: [{
        tagJsVar: {
          tagJsType: ValueTypes.host,
          options: {
            callback: differentHost.options.callback
          },
          matchesInjection: differentHost.matchesInjection
        },
        returnValue: { different: 'value' }
      }]
    }

    const childContext: any = {
      parentContext
    }

    setContextInCycle(childContext)

    // Should throw when parent not found
    expect(() => tag.inject(testHost)).toThrow('Could not find parent context for tag.inject')
  })

  it('should correctly match host by callback reference', () => {
    const callback = (color: string) => ({ color })
    const host1 = host(callback)
    const host2 = host(callback)

    // Both hosts created with same callback should match
    expect(host1.matchesInjection!(host2, true as any as ContextItem)).toBe(true)

    // Different callback should not match
    const differentCallback = (color: string) => ({ color })
    const host3 = host(differentCallback)
    const injected = host1.matchesInjection!(host3, true as any as ContextItem)
    expect(injected).toBe(false)
  })
})