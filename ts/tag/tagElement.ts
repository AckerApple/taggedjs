import { BaseSupport, Support } from './Support.class.js'
import { runAfterRender, runBeforeRender } from'./tagRunner.js'
import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { Original, TagComponent, TagMaker} from './tag.utils.js'
import { textNode } from './textNode.js'
import { afterChildrenBuilt } from './update/afterChildrenBuilt.function.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { executeWrap } from './getTagWrap.function.js'
import { setUse } from '../state/setUse.function.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { paint, painting } from './paint.function.js'
import { ContextItem } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { getValueType } from './getValueType.function.js'

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
  const support = runWrapper(wrapper, placeholder)
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
  global.placeholder = placeholder
  let tags: any[] = []

  ++painting.locks
  const newFragment = support.buildBeforeElement(undefined)
  --painting.locks

  requestAnimationFrame(() => {
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

    newFragment.appendChild(placeholder)
    paint()
    element.appendChild(newFragment)
    
    afterChildrenBuilt(
      subject.global.htmlDomMeta as DomObjectChildren,
      subject,
      support
    )
  })

  return {
    support,
    tags,
  }
}

export function runWrapper(
  templater: TemplaterResult,
  // insertBefore: Element,
  placeholder: Text,
) {
  // TODO: A fake subject may become a problem
  const subject: ContextItem = {
    value: templater,
    global: getNewGlobal(),
    tagJsType: getValueType(templater),
  }
    
  const newSupport = new BaseSupport(
    templater,
    subject,
  )

  // subject.global.insertBefore = insertBefore
  subject.global.placeholder = placeholder
  subject.global.oldest = subject.global.oldest || newSupport
  subject.support = newSupport as Support
  
  runBeforeRender(newSupport, undefined as unknown as Support)

  if(templater.tagJsType === ValueTypes.stateRender) {
    const stateArray = setUse.memory.stateConfig.array
    const result = templater.wrapper || {original: templater} as any

    const nowSupport = executeWrap(
      stateArray,
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
