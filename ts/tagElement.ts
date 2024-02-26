import { TagSupport } from "./TagSupport.class.js"
import { runAfterRender, runBeforeRedraw, runBeforeRender } from "./tagRunner.js"
import { TagComponent, TemplaterResult } from "./templater.utils.js"
import { Tag } from "./Tag.class.js"

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

  tag.appElement = element
  
  addAppTagRender(tagSupport, tag)
    
  const templateElm = document.createElement('template')
  templateElm.setAttribute('tag-detail','app-template-placeholder')
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
  const tag = wrapper.wrapper()

  tag.tagSupport = tagSupport
  runAfterRender(tag.tagSupport, tag)
  
  return { tag, tagSupport }
}

/** Overwrites arguments.tagSupport.mutatingRender */
export function addAppTagRender(
  tagSupport: TagSupport,
  tag: Tag,
) {
  let lastTag
  tagSupport.mutatingRender = () => {
    runBeforeRedraw(tag.tagSupport, tag)

    const templater = tagSupport.templater as TemplaterResult // wrapper
    const fromTag = lastTag = templater.wrapper()

    tagSupport.latestProps = fromTag.tagSupport.props
    tagSupport.latestClonedProps = fromTag.tagSupport.clonedProps

    fromTag.tagSupport = tagSupport
    runAfterRender(tag.tagSupport, tag)
    tag.updateByTag(fromTag)

    tagSupport.newest = fromTag

    return lastTag
  }
}