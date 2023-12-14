import { interpolateElement } from "./interpolateElement.js"
import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { Tag } from "./Tag.class.js"

export function renderAppToElement(
  app: (...args: unknown[]) => any,
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
    tag.beforeRedraw()

    const fromTag = lastTag = wrapper(tag.tagSupport)

    tag.afterRender()

    fromTag.setSupport(tag.tagSupport)
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
  wrapper: (tagSupport: TagSupport) => Tag,
) {
  const tagSupport = getTagSupport(wrapper)

  // Call the apps function for our tag templater
  const tag = wrapper(tagSupport)

  tag.afterRender()

  tag.tagSupport = tagSupport
  
  return { tag, tagSupport }
}
