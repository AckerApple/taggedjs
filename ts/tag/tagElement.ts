import { BaseTagSupport, TagSupport } from './TagSupport.class'
import { runAfterRender, runBeforeRender } from './tagRunner'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class'
import { TagComponent, TagMaker} from './tag'
import { ValueSubject } from '../subject/ValueSubject'
import { TagSubject } from '../subject.types'

const appElements: {
  tagSupport: TagSupport
  element: Element
}[] = []

/**
 * 
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns 
 */
export function tagElement(
  app: TagMaker, // (...args: unknown[]) => TemplaterResult,
  element: HTMLElement | Element,
  props?: unknown,
): {
  tagSupport: TagSupport
  tags: TagComponent[]
} {
  const appElmIndex = appElements.findIndex(appElm => appElm.element === element)
  if(appElmIndex >= 0) {
    appElements[appElmIndex].tagSupport.destroy()
    appElements.splice(appElmIndex, 1)
    // an element already had an app on it
    console.warn('Found and destroyed app element already rendered to element', {element})
  }

  // Create the app which returns [props, runOneTimeFunction]
  const wrapper = app(props) as unknown as TemplaterResult

  // have a function setup and call the tagWrapper with (props, {update, async, on})
  const tagSupport = runWrapper(wrapper)
  
  // TODO: is the below needed?
  tagSupport.appElement = element
  tagSupport.isApp = true
  tagSupport.global.isApp = true
    
  const templateElm = document.createElement('template')
  templateElm.setAttribute('id', 'app-tag-' + appElements.length)
  templateElm.setAttribute('app-tag-detail', appElements.length.toString())
  
  const fragment = document.createDocumentFragment()
  fragment.appendChild(templateElm)

  ;(element as any).destroy = async () => {
    await tagSupport.destroy()
    const insertBefore = tagSupport.global.insertBefore as Element
    const parentNode = insertBefore.parentNode as ParentNode
    parentNode.removeChild(insertBefore)
  }
  
  tagSupport.buildBeforeElement(templateElm)

  tagSupport.global.oldest = tagSupport
  tagSupport.global.newest = tagSupport

  ;(element as any).setUse = (app as any).original.setUse

  appElements.push({element, tagSupport})
  element.appendChild(fragment)

  return {
    tagSupport,
    tags: (app as any).original.tags,
  }
}

export function runWrapper(
  templater: TemplaterResult,
) {
  let newSupport = {} as TagSupport
  const subject = new ValueSubject<TagSupport>(newSupport) as unknown as TagSubject
    
  newSupport = new BaseTagSupport(
    templater,
    subject,
  ) as TagSupport

  subject.set( templater )
  
  subject.tagSupport = newSupport
  
  runBeforeRender(newSupport, undefined as unknown as TagSupport)

  // Call the apps function for our tag templater
  const wrapper = templater.wrapper as Wrapper
  const tagSupport = wrapper(
    newSupport,
    subject,
  )

  runAfterRender(newSupport, tagSupport)

  return tagSupport
}
