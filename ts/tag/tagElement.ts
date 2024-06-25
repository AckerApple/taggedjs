import { BaseSupport, Support } from './Support.class.js'
import { runAfterRender, runBeforeRender } from'./tagRunner.js'
import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { Original, TagComponent, TagMaker} from './tag.utils.js'
import { TagSubject } from '../subject.types.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'
import { textNode } from './textNode.js'
import { afterChildrenBuilt } from './update/afterChildrenBuilt.function.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { DomTag, StringTag, Tag } from './Tag.class.js'
import { processFirstSubjectValue } from './update/processFirstSubjectValue.function.js'
import { executeWrap } from './getTagWrap.function.js'
import { setUse } from '../state/setUse.function.js'

const appElements: {
  support: BaseSupport // Support
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
  support: BaseSupport
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

  // TODO: maybe remove below?
  const template = document.createElement('template')

  const placeholder = textNode.cloneNode(false) as Text
  const support = runWrapper(wrapper, template, placeholder)
  const subject = support.subject
  const global = subject.global
  
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
  const children = newFragment.children
  subject.global.oldest = support
  subject.global.newest = support
  
  let setUse = (wrapper as any).setUse
  let tags = (wrapper as any).tags
  
  if(wrapper.tagJsType !== ValueTypes.stateRender) {
    const wrap = app as any as Wrapper
    const parentWrap = wrap.parentWrap
    const original = (wrap as any).original || parentWrap.original as Original
    
    setUse = original.setUse
    tags = (app as any).original.tags
  }

  ;(element as any).setUse = setUse
  appElements.push({element, support})
  element.appendChild(newFragment)

  afterChildrenBuilt(children, subject, support)

  return {
    support,
    tags,
  }
}

export function runWrapper(
  templater: TemplaterResult,
  insertBefore: Element,
  placeholder: Text,
) {
  let newSupport = {} as BaseSupport

  // TODO: A fake subject may become a problem
  const subject = new TagJsSubject(templater) as any as TagSubject
    
  newSupport = new BaseSupport(
    templater,
    subject,
  )

  subject.global.insertBefore = insertBefore
  subject.global.placeholder = placeholder
  subject.global.oldest = subject.global.oldest || newSupport
  // subject.next( templater )
  subject.support = newSupport as Support
  let nowSupport = newSupport
  
  runBeforeRender(newSupport, undefined as unknown as Support)

  if(templater.tagJsType === ValueTypes.stateRender) {
    // nowSupport = newSupport
    // ;(templater as any as TemplaterResult).tag = (templater as any)() as (StringTag | DomTag)

    const stateArray = setUse.memory.stateConfig.array
    const result = templater.wrapper || {original: templater} as any

    nowSupport = executeWrap(
      stateArray,
      templater,
      result,
      newSupport,
      subject,
      newSupport,
    )

  } else {
    // Call the apps function for our tag templater
    const wrapper = templater.wrapper as Wrapper
    nowSupport = wrapper(
      newSupport,
      subject,
    )
  }


  runAfterRender(newSupport, nowSupport)

  return nowSupport
}
