import { Tag } from "./Tag.class.js"

type Callback = (...args: any[]) => any & {
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

  function subjectFunction(
    element: Element,
    args: any[]
  ) {
    return runTagCallback(value, tag, element, args)
  }

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
  const renderCount = tag.tagSupport.memory.renderCount
  const method = value.bind(bindTo)
  const callbackResult = method(...args)
  
  if(renderCount !== tag.tagSupport.memory.renderCount) {
    return // already rendered
  }

  tag.tagSupport.render()

  if(callbackResult instanceof Promise) {
    return callbackResult.then(() => tag.tagSupport.render() && 'no-data-ever')
  }

  // Caller always expects a Promise
  return Promise.resolve(callbackResult).then(() => 'no-data-ever')
}
