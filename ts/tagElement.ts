import { BaseTagSupport } from './TagSupport.class'
import { runAfterRender, runBeforeRender } from './tagRunner'
import { TemplaterResult } from './TemplaterResult.class'
import { Tag } from './Tag.class'
import { TagComponent } from './tag'
import { renderExistingTag } from './renderExistingTag.function'
import { Props } from './Props'
import { ValueSubject } from './ValueSubject'
import { TagSubject } from './Tag.utils'

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
  const {tag} = result

  // TODO: is the below needed?
  tag.appElement = element

  addAppTagRender(tag.tagSupport, tag)
    
  const templateElm = document.createElement('template')
  templateElm.setAttribute('id', 'app-tag-' + appElements.length)
  templateElm.setAttribute('app-tag-detail', appElements.length.toString())
  element.appendChild(templateElm)
  
  tag.buildBeforeElement(templateElm)

  wrapper.global.oldest = tag
  wrapper.global.newest = tag

  if(!tag.hasLiveElements) {
    throw new Error('x')
  }

  ;(element as any).setUse = (app as any).original.setUse

  appElements.push({element, tag})

  return {tag, tags: (app as any).original.tags}
}

export function applyTagUpdater(
  wrapper: TemplaterResult,
) {
  const subject = new ValueSubject<Tag>({} as Tag) as unknown as TagSubject
  const tagSupport = new BaseTagSupport(wrapper, subject)
  wrapper.tagSupport = tagSupport
  runBeforeRender(tagSupport, undefined as any as Tag)

  // Call the apps function for our tag templater
  const tag = wrapper.wrapper(
    tagSupport,
    subject,
  )
  // wrapper.global.oldest = tag
  // wrapper.global.newest = tag
  runAfterRender(tagSupport, tag)

  return { tag, tagSupport }
}

/** Overwrites arguments.tagSupport.mutatingRender */
export function addAppTagRender(
  tagSupport: BaseTagSupport,
  tag: Tag,
) {  
  tagSupport.render = () => {    
    const result = renderExistingTag(
      tag,
      tagSupport.templater,
      tagSupport,
      new ValueSubject<Tag>({} as Tag) as unknown as TagSubject,
      {} as unknown as Tag, // ownerTag,
    )
    
    return result.redraw
  }
}
