import { BaseSupport, Support } from './Support.class.js'
import { runAfterRender, runBeforeRender } from'./tagRunner.js'
import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { TagComponent, TagMaker} from './tag.utils.js'
import { TagSubject } from '../subject.types.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'
import { afterChildrenBuilt } from './update/processTag.function.js'
import { textNode } from './textNode.js'

const appElements: {
  support: Support
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
  support: Support
  tags: TagComponent[]
} {
  const appElmIndex = appElements.findIndex(appElm => appElm.element === element)
  if(appElmIndex >= 0) {
    appElements[appElmIndex].support.destroy()
    appElements.splice(appElmIndex, 1)
    // an element already had an app on it
    console.warn('Found and destroyed app element already rendered to element', {element})
  }

  // Create the app which returns [props, runOneTimeFunction]
  const wrapper = app(props) as unknown as TemplaterResult


  // const fragment = document.createDocumentFragment()
  const template = document.createElement('template')
  const placeholder = textNode.cloneNode(false) as Text
  const support = runWrapper(wrapper, template, placeholder)
  const global = support.subject.global
  
  support.appElement = element
  support.isApp = true
  global.isApp = true
    

  // enables hmr destroy so it can control entire app
  ;(element as any).destroy = () => {
    support.destroy() // never return anything here
  }
  
  global.insertBefore = placeholder // template
  ;(global as any).placeholder = placeholder
  const newFragment = support.buildBeforeElement(undefined)
  const children = [...newFragment.children]
  support.subject.global.oldest = support
  support.subject.global.newest = support

  ;(element as any).setUse = (app as any).original.setUse
  appElements.push({element, support})
  element.appendChild(newFragment)

  afterChildrenBuilt(children, support.subject, support)

  return {
    support,
    tags: (app as any).original.tags,
  }
}

export function runWrapper(
  templater: TemplaterResult,
  insertBefore: Element,
  placeholder: Text,
) {
  let newSupport = {} as BaseSupport

  // TODO: A fake subject may become a problem
  const subject = new TagJsSubject(newSupport) as any as TagSubject
    
  newSupport = new BaseSupport(
    templater,
    subject,
  )

  subject.global.insertBefore = insertBefore
  subject.global.placeholder = placeholder
  subject.global.oldest = subject.global.oldest || newSupport
  subject.next( templater )
  subject.support = newSupport as Support
  
  runBeforeRender(newSupport, undefined as unknown as Support)

  // Call the apps function for our tag templater
  const wrapper = templater.wrapper as Wrapper
  const support = wrapper(
    newSupport,
    subject,
  )

  runAfterRender(newSupport, support)

  return support
}
