import { TagSupport } from "./TagSupport.class.js"
import { runAfterRender, runBeforeRender } from "./tagRunner.js"
import { TemplaterResult } from "./templater.utils.js"
import { Tag } from "./Tag.class.js"
import { TagComponent } from "./tag.js"
import { renderExistingTag } from "./renderExistingTag.function.js"

const appElements: {tag: Tag, element: Element}[] = []

export function tagElement(
  app: TagComponent, // (...args: unknown[]) => TemplaterResult,
  element: HTMLElement | Element,
  props: unknown,
): {tag: Tag, tags: TagComponent[]} {
  const appElmIndex = appElements.findIndex(appElm => appElm.element === element)
  if(appElmIndex >= 0) {
    appElements[appElmIndex].tag.destroy()
    appElements.splice(appElmIndex, 1)
    // an element already had an app on it
    console.warn('Found and destroyed app element already rendered to element', {element})
  }

  // Create the app which returns [props, runOneTimeFunction]
  const wrapper = app(props) as unknown as TemplaterResult

  // have a function setup and call the tagWrapper with (props, {update, async, on})
  const result = applyTagUpdater(wrapper)
  const {tag, tagSupport} = result
  // wrapper.tagSupport = tagSupport

  tag.appElement = element
  tag.tagSupport.oldest = tag

  addAppTagRender(tag.tagSupport, tag)
    
  const templateElm = document.createElement('template')
  templateElm.setAttribute('id', 'app-tag-' + appElements.length)
  templateElm.setAttribute('app-tag-detail', appElements.length.toString())
  element.appendChild(templateElm)
  
  tag.buildBeforeElement(templateElm)

  ;(element as any).setUse = (app as any).original.setUse

  appElements.push({element, tag})

  return {tag, tags: (app as any).original.tags}
}

export function applyTagUpdater(
  wrapper: TemplaterResult,
) {
  const tagSupport = wrapper.tagSupport
  runBeforeRender(tagSupport, undefined as any as Tag)

  // Call the apps function for our tag templater
  const tag = wrapper.wrapper(tagSupport)
  runAfterRender(tagSupport, tag)
  
  return { tag, tagSupport }
}

/** Overwrites arguments.tagSupport.mutatingRender */
export function addAppTagRender(
  tagSupport: TagSupport,
  tag: Tag,
) {
  tagSupport.templater.redraw = () => {
    const existingTag = tag
    const {retag} = tagSupport.templater.renderWithSupport(
      tagSupport,
      existingTag, // newest
      {} as any, // ownerTag,
    )

    tag.updateByTag(retag)
    return retag
  }
  
  tagSupport.mutatingRender = () => {
    renderExistingTag(tag, tagSupport.templater, tagSupport)
    return tag
  }
}
