import { Tag } from "./Tag.class.js"

export function bindSubjectCallback(
  value: (...args: any[]) => any,
  tag: Tag,
) {
  function subjectFunction(
    element: Element,
    args: any[]
  ) {
    const renderCount = tag.tagSupport.memory.renderCount

    const method = value.bind(element)
    const callbackResult = method(...args)

    if(renderCount !== tag.tagSupport.memory.renderCount) {
      return // already rendered
    }

    tag.tagSupport.render()

    if(callbackResult instanceof Promise) {
      return callbackResult.then(() => tag.tagSupport.render() && 'no-data-ever')
    }

    return Promise.resolve(callbackResult).then(() => 'no-data-ever')
  }

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value

  return subjectFunction
}
