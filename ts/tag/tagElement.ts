import { BaseSupport, Support } from './Support.class.js'
import { runAfterRender, runBeforeRender } from'./tagRunner.js'
import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { Original, TagComponent, TagMaker} from './tag.utils.js'
import { textNode } from './textNode.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { executeWrap } from './getTagWrap.function.js'
import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { paint, painting } from './paint.function.js'
import { ContextItem } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { subscribeToTemplate } from '../interpolations/subscribeToTemplate.function.js'

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
  // const template = document.createElement('template')

  const placeholder = textNode.cloneNode(false) as Text
  const support = runWrapper(wrapper, placeholder, element)
  const subject = support.subject
  const global = subject.global
  
  global.isApp = true
  
  // enables hmr destroy so it can control entire app
  ;(element as any).destroy = function() {
    support.destroy() // never return anything here
  }
  
  let tags: any[] = []

  ++painting.locks

  const result = support.buildBeforeElement(element)

  subject.global.oldest = support
  subject.global.newest = support
  
  let setUse = (wrapper as any).setUse
  
  if(wrapper.tagJsType !== ValueTypes.stateRender) {
    const wrap = app as any as Wrapper
    const parentWrap = wrap.parentWrap
    const original = (wrap as any).original || parentWrap.original as Original
    
    setUse = original.setUse
    tags.length = 0
    tags.push(...(app as any).original.tags)
  }

  ;(element as any).setUse = setUse
  appElements.push({element, support})

  const newFragment = document.createDocumentFragment()
  newFragment.appendChild(placeholder)
  putDomDown(result.dom, newFragment)
  result.subs.forEach(sub =>
    subscribeToTemplate(sub)
  )
  --painting.locks

  requestAnimationFrame(() => {
    paint()
    element.appendChild(newFragment)
  })

  return {
    support,
    tags,
  }
}

export function runWrapper(
  templater: TemplaterResult,
  placeholder: Text,
  appElement: Element,
) {
  const global = getNewGlobal()

  const subject: ContextItem = {
    value: templater,
    global,
  }
    
  const newSupport = new BaseSupport(
    templater,
    subject,
  )

  newSupport.appElement = appElement

  // subject.global.insertBefore = insertBefore
  global.placeholder = placeholder
  global.insertBefore = placeholder // template
  global.oldest = global.oldest || newSupport
  global.newest = newSupport as Support
  
  runBeforeRender(newSupport, undefined as unknown as Support)

  if(templater.tagJsType === ValueTypes.stateRender) {
    const result = templater.wrapper || {original: templater} as any

    const nowSupport = executeWrap(
      templater,
      result,
      newSupport,
      subject,
      newSupport,
    )

    runAfterRender(newSupport, nowSupport)

    return nowSupport
  }
  
  // Call the apps function for our tag templater
  const wrapper = templater.wrapper as Wrapper
  const nowSupport = wrapper(
    newSupport,
    subject,
  )

  runAfterRender(newSupport, nowSupport)

  return nowSupport
}

function putDomDown(
  dom: DomObjectChildren,
  newFragment: DocumentFragment,
) {
  dom.forEach(domItem => putOneDomDown(domItem, newFragment))
}

function putOneDomDown(
  dom: DomObjectText | DomObjectElement,
  newFragment: DocumentFragment,
) {
  if(dom.domElement) {
    newFragment.appendChild(dom.domElement)
  }
  if(dom.marker) {
    newFragment.appendChild(dom.marker)
  }
}
