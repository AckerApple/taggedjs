/** File largely responsible for reacting to element events, such as onclick */

import { Tag } from "./Tag.class"
import { renderTagSupport } from "./renderTagSupport.function"

export type Callback = (...args: any[]) => any & {
  isChildOverride?: true // if this is set, then a parent tag passed children to a tag/component
}

export function bindSubjectCallback(
  value: Callback,
  tag: Tag,
) {
  // Is this children? No override needed
  if((value as any).isChildOverride) {
    return value
  }

  if(!tag.ownerTag && !tag.tagSupport.templater.global.isApp) {
    throw new Error('no ownerTag issue here')
  }

  const subjectFunction = (
    element: Element, args: any[]
  ) => runTagCallback(value, tag, element, args)

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  tag: Tag,
  bindTo: unknown,
  args: any[]
) {
  const tagSupport = tag.tagSupport
  const renderCount = tagSupport.templater.global.renderCount
  const method = value.bind(bindTo)
  const callbackResult = method(...args)

  const sameRenderCount = renderCount === tagSupport.templater.global.renderCount
  
  // already rendered OR tag was deleted before event processing
  if(!sameRenderCount || tagSupport.templater.global.deleted) {
    if(callbackResult instanceof Promise) {
      return callbackResult.then(() => {
        return 'promise-no-data-ever' // tag was deleted during event processing
      })
    }

    return 'no-data-ever' // already rendered
  }

  renderTagSupport(
    tagSupport,
    true, // renderUp - callback may have changed props so also check to render up
  )

  if(callbackResult instanceof Promise) {
    return callbackResult.then(() => {
      if(tagSupport.templater.global.deleted) {
        return 'promise-no-data-ever' // tag was deleted during event processing
      }

      renderTagSupport(
        tagSupport,
        true,
      )
      return 'promise-no-data-ever'
    })
  }

  // Caller always expects a Promise
  return 'no-data-ever'
}
