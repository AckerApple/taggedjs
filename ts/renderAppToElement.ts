import { interpolateElement } from "./interpolateElement.js"
import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { runBeforeRender } from "./tagRunner.js"
import { TemplaterResult, tags } from "./tag.js"
import { Tag } from "./Tag.class.js"

export function renderAppToElement(
  app: (...args: unknown[]) => TemplaterResult,
  element: Element,
  props: unknown,
): Tag {
  // Create the app which returns [props, runOneTimeFunction]
  const wrapper = app(props)

  // have a function setup and call the tagWrapper with (props, {update, async, on})
  const result = applyTagUpdater(wrapper)
  const {tag, tagSupport} = result

  tag.appElement = element
  
  addAppTagRender(tagSupport, tag)
  
  const context = tag.updateValues(tag.values)
  
  const templateElm = document.createElement('template')
  templateElm.setAttribute('tag-detail','app-template-placeholder')
  element.appendChild(templateElm)
  
  tag.buildBeforeElement(templateElm)

  ;(element as any).tag = tag
  ;(element as any).tags = (app as any).original.tags
  ;(element as any).setUse = (app as any).original.setUse

  return tag
}

export function applyTagUpdater(
  wrapper: TemplaterResult,
) {
  const tagSupport = getTagSupport(0, wrapper)
  runBeforeRender(tagSupport)

  // Call the apps function for our tag templater
  const templater = tagSupport.templater as TemplaterResult
  const tag = templater.wrapper()

  tag.tagSupport = tagSupport
  tag.afterRender()
  
  return { tag, tagSupport }
}

/** Overwrites arguments.tagSupport.mutatingRender */
export function addAppTagRender(
  tagSupport: TagSupport,
  tag: Tag,
) {
  let lastTag
  tagSupport.mutatingRender = () => {    
    // runBeforeRender(tagSupport, tag)
    tag.beforeRedraw()

    const templater = tagSupport.templater as TemplaterResult // wrapper
    const fromTag = lastTag = templater.wrapper()

    // fromTag.setSupport(tagSupport)
    fromTag.tagSupport = tagSupport
    tag.afterRender()
    tag.updateByTag(fromTag)

    if(lastTag) {
      lastTag.destroy({stagger: 0})
    }

    tagSupport.newest = fromTag

    return lastTag
  }
}