import { Events, TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { ContextStateSupport } from '../tag/ContextStateMeta.type.js'
import { tags, TagWrapper } from '../tag/tag.utils.js'
import { empty, ValueTypes } from '../tag/ValueTypes.enum.js'
import { destroySupport } from './destroySupport.function.js'
import { paint, painting } from './paint.function.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, BaseTagGlobal, Wrapper } from '../index.js'
import { createSupport } from '../tag/createSupport.function.js'
import { runAfterSupportRender } from './runAfterRender.function.js'
import { executeWrap } from './executeWrap.function.js'
import { registerTagElement } from './registerNewTagElement.function.js'
import { loadNewBaseSupport } from '../tag/loadNewBaseSupport.function.js'
import { reStateSupport } from '../state/state.utils.js'

export function renderTagElement(
  app: TagMaker,
  global: BaseTagGlobal,
  templater: TemplaterResult,
  templater2: TemplaterResult,
  element: Element,
  subject: SupportContextItem,
  isAppFunction: boolean,
) {
  const placeholder = document.createTextNode(empty)
  tags.push((templater.wrapper || {original: templater}) as unknown as TagWrapper<unknown>)
  const support = runWrapper(
    templater,
    placeholder,
    element,
    subject,
    isAppFunction,
  )
  
  global.isApp = true
  
  if(isAppFunction) {
    templater2.tag = support.templater.tag
  }

  if(!element) {
    throw new Error(`Cannot tagElement, element received is type ${typeof element} and not type Element`)
  }

  // enables hmr destroy so it can control entire app
  ;(element as TagJsElement).destroy = function() {
    const events = global.events as Events
    for (const eventName in events) {
      const callback = events[eventName]
      element.removeEventListener(eventName, callback)
    }
    global.events = {}
    
    ++painting.locks
    const toAwait = destroySupport(support, global) // never return anything here
    --painting.locks

    paint()
    
    return toAwait
  }
  
  ++painting.locks

  const newFragment = registerTagElement(
    support,
    element,
    global,
    templater,
    app,
    placeholder,
  )

  --painting.locks

  paint()
  element.appendChild(newFragment)

  return {
    support,
    tags,
    ValueTypes,
  }
}

export function runWrapper(
  templater: TemplaterResult,
  placeholder: Text,
  appElement: Element,
  subject:SupportContextItem,
  isAppFunction: boolean,
) {
  subject.placeholder = placeholder
  
  const oldest = subject.state.oldest as AnySupport
  const newest = subject.state.newest as AnySupport
  const isFirstRender = newest === oldest

  const newSupport = createSupport(
    templater,
    newest,
    newest.appSupport, // ownerSupport.appSupport as AnySupport,
    subject,
    // castedProps,
  )

  if(!isFirstRender) {
    const olderStateContext = subject.state.older as ContextStateSupport
    reStateSupport(
      newSupport,
      newest,
      olderStateContext.state,
    )
  }

  if(templater.tagJsType === ValueTypes.stateRender) {
    return executeStateWrap(
      templater,
      isAppFunction,
      newSupport,
      subject,
      appElement,    
    )
  }
  
  // Call the apps function for our tag templater
  const wrapper = templater.wrapper as Wrapper
  const nowSupport = wrapper(
    newSupport,
    subject,
  )

  runAfterSupportRender(newSupport)

  return nowSupport
}

function executeStateWrap(
  templater: TemplaterResult,
  isAppFunction: boolean,
  newSupport: AnySupport,
  subject: SupportContextItem,
  appElement: Element,
) {
  const result = (templater.wrapper || {original: templater}) as unknown as TagWrapper<unknown>

  if(!isAppFunction) {
    const newSupport = loadNewBaseSupport(templater, subject, appElement)
    runAfterSupportRender(newSupport)
    return newSupport
  }

  executeWrap(
    templater,
    result,
    newSupport,
  )

  runAfterSupportRender(newSupport)

  return newSupport
}

type TagJsElement = Element & {
  destroy?: (...n: unknown[]) => unknown
}
