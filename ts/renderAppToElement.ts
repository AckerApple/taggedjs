import { interpolateElement } from "./interpolateElement.js"
import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { Tag } from "./Tag.class.js"
import { runBeforeRender } from "./tagRunner.js"
import { TemplaterResult } from "./tag.js"

export function renderAppToElement(
  app: (...args: unknown[]) => TemplaterResult,
  element: Element,
  props: unknown,
) {
  // Create the app which returns [props, runOneTimeFunction]
  const wrapper = app(props)

  // have a function setup and call the tagWrapper with (props, {update, async, on})
  const result = applyTagUpdater(wrapper)
  const {tag, tagSupport} = result
  
  let lastTag
  tagSupport.mutatingRender = () => {
    runBeforeRender(tagSupport, tag)
    tag.beforeRedraw()

    const fromTag = lastTag = wrapper.wrapper()

    fromTag.setSupport(tag.tagSupport)
    tag.afterRender()
    tag.updateByTag(fromTag)

    if(lastTag) {
      lastTag.destroy(0)
    }

    return lastTag
  }
  
  const context = tag.updateValues(tag.values)
  const template = tag.getTemplate()
  
  element.innerHTML = template.string
  interpolateElement(element, context, tag)

}

export function applyTagUpdater(
  wrapper: TemplaterResult,
) {
  const tagSupport = getTagSupport(wrapper)
  runBeforeRender(tagSupport)

  // Call the apps function for our tag templater
  const templater = tagSupport.templater as TemplaterResult
  const tag = templater.wrapper()

  tag.tagSupport = tagSupport
  tag.afterRender()
  
  return { tag, tagSupport }
}
