/** File largely responsible for reacting to element events, such as onclick */

import { Tag } from "./Tag.class"
import { renderTagSupport } from "./TagSupport.class"

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
  const renderCount = tagSupport ? tagSupport.templater.global.renderCount : 0  
  const method = value.bind(bindTo)
  const callbackResult = method(...args)

  const sameRenderCount = renderCount === tagSupport.templater.global.renderCount
  
  if(tagSupport && !sameRenderCount) {    
    return // already rendered
  }

  console.log('click render --- ')
  renderTagSupport(
    tagSupport,
    false,
    // tagSupport, tagSupport.subject
  )

  if(callbackResult instanceof Promise) {
    return callbackResult.then(() => {
      console.log('click promise render --- ')
      renderTagSupport(
        tagSupport,
        false,
        // tagSupport, tagSupport.subject
      )
      return 'promise-no-data-ever'
    })
  }

  // Caller always expects a Promise
  return 'no-data-ever'
}
