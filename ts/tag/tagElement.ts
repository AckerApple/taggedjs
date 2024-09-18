import { DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { Events, SupportTagGlobal, TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { BaseSupport, getBaseSupport, SupportContextItem } from './Support.class.js'
import { subscribeToTemplate } from '../interpolations/subscribeToTemplate.function.js'
import { buildBeforeElement } from './buildBeforeElement.function.js'
import { TagComponent, TagWrapper } from './tag.utils.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'
import { destroySupport } from './destroySupport.function.js'
import { BaseTagGlobal, checkTagValueChange, DomTag, PropWatches } from './index.js'
import { setUseMemory, UseMemory } from '../state/setUse.function.js'
import { runAfterRender } from './afterRender.function.js'
import { executeWrap } from './executeWrap.function.js'
import { paint, painting } from './paint.function.js'
import { initState } from '../state/state.utils.js'
import { isTagComponent } from '../isInstance.js'
import { Props } from '../Props.js'
import { TagMaker } from './TagMaker.type.js'
import { beforeRerender } from './render/beforeRerender.function.js'

export type TagAppElement = Element & {
  ValueTypes: typeof ValueTypes
  setUse: typeof setUseMemory
}

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
  app: TagMaker,
  element: HTMLElement | Element,
  props?: unknown,
): {
  support: BaseSupport
  tags: TagComponent[]
  ValueTypes: typeof ValueTypes
} {
  const appElmIndex = appElements.findIndex(appElm => appElm.element === element)
  if(appElmIndex >= 0) {
    destroySupport(appElements[appElmIndex].support, 0)
    appElements.splice(appElmIndex, 1)
    // an element already had an app on it
    console.warn('Found and destroyed app element already rendered to element', {element})
  }

  // Create the app which returns [props, runOneTimeFunction]
  
  let templater = (() => (templater2 as unknown as (...n:unknown[]) => unknown)(props)) as unknown as TemplaterResult
  templater.propWatch = PropWatches.NONE
  templater.tagJsType = ValueTypes.stateRender
  // todo: props should be an array
  templater.props = [props]

  // create observable the app lives on
  const subject = getNewSubject(templater, element)
  const global = subject.global as BaseTagGlobal
  initState(global.newest, setUseMemory.stateConfig)

  let templater2 = app(props) as unknown as TemplaterResult
  const isAppFunction = typeof templater2 == BasicTypes.function
  
  if(!isAppFunction) {
    if(!isTagComponent(templater2)) {
      templater.tag = templater2 as unknown as DomTag
      templater2 = app as unknown as TemplaterResult
    } else {
      global.newest.propsConfig = {
        latest: [props] as Props,
        castProps: [props] as Props,
      }
      templater.propWatch = templater2.propWatch
      templater.tagJsType = templater2.tagJsType
      templater.wrapper = templater2.wrapper
      templater = templater2
    }
  }

  const placeholder = document.createTextNode('')
  const support = runWrapper(templater, placeholder, element, subject, isAppFunction)
  
  global.isApp = true
  
  if(isAppFunction) {
    templater2.tag = support.templater.tag
  }

  // enables hmr destroy so it can control entire app
  ;(element as TagJsElement).destroy = function() {
    const events = global.events as Events
    for (const eventName in events) {
      const callback = events[eventName]
      element.removeEventListener(eventName, callback)
    }
    global.events = {}

    destroySupport(support, 0) // never return anything here

    paint()
  }
  
  let tags = [] as TagComponent[] // TagWrapper<unknown>[]

  ++painting.locks

  const result = buildBeforeElement(support, element)

  global.oldest = support
  global.newest = support
  
  let setUse = (templater as unknown as TagAppElement).setUse
  
  if(templater.tagJsType !== ValueTypes.stateRender) {
    const wrap = app as unknown as Wrapper
    const original = (wrap as unknown as TagWrapper<unknown>).original
    // const parentWrap = wrap.parentWrap
    // const original = (wrap as unknown).original || parentWrap.original as Original
    //  const original = parentWrap.original as Original
    
    setUse = original.setUse as unknown as UseMemory
    tags = original.tags as unknown as TagComponent[]
  }

  ;(element as TagAppElement).setUse = setUse
  ;(element as TagAppElement).ValueTypes = ValueTypes
  appElements.push({element, support})

  const newFragment = document.createDocumentFragment()
  newFragment.appendChild(placeholder)

  for(const domItem of result.dom) {
    putOneDomDown(domItem, newFragment)
  }

  for(const sub of result.subs) {
    subscribeToTemplate(sub)
  }
  --painting.locks

  paint()
  element.appendChild(newFragment)

  return {
    support,
    tags,
    ValueTypes,
  }
}

function getNewSubject(
  templater: TemplaterResult,
  appElement: Element,
) {
  const subject: SupportContextItem = {
    value: templater,
    checkValueChange: checkTagValueChange,
    withinOwnerElement: false, // i am the highest owner
    renderCount: 0,

    global: undefined as unknown as SupportTagGlobal, // gets set below in getNewGlobal()
  }

  const global = getNewGlobal(subject) as BaseTagGlobal
  global.events = {}

  loadNewBaseSupport(templater, subject, appElement)

  return subject
}

function loadNewBaseSupport(
  templater: TemplaterResult,
  subject: SupportContextItem,
  appElement: Element,
) {
  const global = subject.global
  const newSupport = getBaseSupport(
    templater,
    subject as SupportContextItem,
  )

  newSupport.appElement = appElement
  global.oldest = global.oldest || newSupport
  global.newest = newSupport
  return newSupport
}

export function runWrapper(
  templater: TemplaterResult,
  placeholder: Text,
  appElement: Element,
  subject: SupportContextItem,
  isAppFunction: boolean,
) {
  subject.placeholder = placeholder
  
  const global = subject.global as SupportTagGlobal
  const useSupport = global.newest
  const oldest = global.oldest
  const isFirstRender = useSupport === oldest
  
  if(!isFirstRender) {
    beforeRerender(useSupport, oldest.state)
  }

  if(templater.tagJsType === ValueTypes.stateRender) {
    const result = (templater.wrapper || {original: templater}) as unknown as TagWrapper<unknown>

    if(!isAppFunction) {
      const newSupport = loadNewBaseSupport(templater, subject, appElement)
      const nowState = setUseMemory.stateConfig.array
      newSupport.state = nowState
      runAfterRender(newSupport)
      return newSupport
    }

    const nowSupport = executeWrap(
      templater,
      result,
      useSupport,
    )

    runAfterRender(nowSupport)

    return nowSupport
  }
  
  // Call the apps function for our tag templater
  const wrapper = templater.wrapper as Wrapper
  const nowSupport = wrapper(
    useSupport,
    subject,
  )

  runAfterRender(nowSupport)

  return nowSupport
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

type TagJsElement = Element & {
  destroy?: (...n: unknown[]) => unknown
}