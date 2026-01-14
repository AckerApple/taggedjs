import { Events, TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { tags, TagWrapper } from '../tag/tag.utils.js'
import { empty, ValueTypes } from '../tag/ValueTypes.enum.js'
import { destroySupport } from './destroySupport.function.js'
import { paint, painting } from './paint.function.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, SupportTagGlobal } from '../index.js'
import { processReplacementComponent } from '../tag/update/processFirstSubjectComponent.function.js'

// Imports used only by the commented-out runWrapper/executeStateWrap functions:
// import { ContextStateSupport } from '../tag/ContextStateMeta.type.js'
// import { Wrapper } from '../index.js'
// import { createSupport } from '../tag/createSupport.function.js'
// import { runAfterSupportRender } from './runAfterRender.function.js'
// import { executeWrap } from './executeWrap.function.js'
// import { loadNewBaseSupport } from '../tag/loadNewBaseSupport.function.js'
// import { reStateSupport } from '../state/reState.function.js'

export function renderTagElement(
  app: TagMaker,
  global: SupportTagGlobal,
  templater: TemplaterResult,
  templater2: TemplaterResult,
  element: Element, // appElement
  context: SupportContextItem,
  isAppFunction: boolean,
) {
  const placeholder = document.createTextNode(empty)
  tags.push((templater.wrapper || {original: templater}) as unknown as TagWrapper<unknown>)
  context.placeholder = placeholder
  /*
  const support = runWrapper(
    templater,
    placeholder,
    element,
    context,
    isAppFunction,
  )
  */
  
  global.isApp = true

  if(!element) {
    throw new Error(`Cannot tagElement, element received is type ${typeof element} and not type Element`)
  }

  // enables hmr destroy so it can control entire app
  ;(element as TagJsElement).destroy = function() {
    const events = context.events as Events
    for (const eventName in events) {
      const callback = events[eventName]
      element.removeEventListener(eventName, callback)
    }
    context.events = {}
    
    ++painting.locks
    const toAwait = destroySupport(support, global) // never return anything here
    --painting.locks

    paint()
    
    return toAwait
  }
  
  ++painting.locks

  const newFragment = document.createDocumentFragment()
  newFragment.appendChild(placeholder)
  const ownerSupport = {
    appSupport: {
      appElement: element,
      context,
    },
    appElement: element
  } as any as AnySupport
  const support = processReplacementComponent(
    templater,
    context,
    ownerSupport,
  )

  support.appElement = element
  // support.appSupport = support

  if(isAppFunction) {
    templater2.tag = support.templater.tag
  }

  /*
  const newFragment = registerTagElement(
    support,
    element,
    global,
    templater,
    app,
    placeholder,
  )
  */
  --painting.locks

  paint()
  element.appendChild(newFragment)

  return {
    support,
    tags,
    ValueTypes,
  }
}

type TagJsElement = Element & {
  destroy?: (...n: unknown[]) => unknown
}
