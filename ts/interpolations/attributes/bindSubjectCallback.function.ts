/** File largely responsible for reacting to element events, such as onclick */

import { isPromise, isTagComponent } from '../../isInstance.js'
import { syncStates } from '../../state/syncStates.function.js'
import { renderSupport } from '../../tag/render/renderSupport.function.js'
import { AnySupport, BaseSupport, Support } from '../../tag/Support.class.js'
import { SupportTagGlobal, TagGlobal } from '../../tag/TemplaterResult.class.js'
import { getUpTags } from './getUpTags.function.js'
import { renderTagUpdateArray } from './renderTagArray.function.js'

const noData = 'no-data-ever'
const promiseNoData = 'promise-no-data-ever'

export type Callback = (...args: any[]) => any

export function bindSubjectCallback(
  value: Callback,
  support: AnySupport,
) {
  const global = support.subject.global as SupportTagGlobal

  // MAIN EVENT CALLBACK PROCESSOR
  const subjectFunction = function (
    element: Element, args: any[],
  ) {
    if(global.deleted === true) {
      return
    }
    
    // const newest = global.newest as Support // || subjectFunction.support
    return runTagCallback(
      subjectFunction.tagFunction,
      subjectFunction.support, // newest
      element,
      args,
    )
  }

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value
  subjectFunction.support = support

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  support: BaseSupport | Support,
  bindTo: unknown,
  args: any[],
) {
  // get actual component owner not just the html`` support
  let component = support as Support
  while(component.ownerSupport && !isTagComponent(component.templater)) {
    component = component.ownerSupport as Support
  }

  const global = component.subject.global as SupportTagGlobal // tag.subject.global as TagGlobal
  global.locked = true // prevent another render from re-rendering this tag

  // ACTUAL CALLBACK TO ORIGINAL FUNCTION
  const callbackResult = value.apply(bindTo, args)
  
  return afterTagCallback(
    callbackResult,
    component,
  )
}

export function afterTagCallback(
  callbackResult: any,
  eventHandlerSupport: AnySupport,
) {
  const global = eventHandlerSupport.subject.global as SupportTagGlobal // tag.subject.global as SupportTagGlobal
  delete global.locked

  return renderCallbackSupport(
    eventHandlerSupport as Support,
    callbackResult,
    global, // eventHandlerSupport.subject.global as TagGlobal,
  )
}

function renderCallbackSupport(
  last: AnySupport,
  callbackResult: any,
  global: SupportTagGlobal, // TagGlobal,
) {
  const tagsToUpdate = getUpTags(last)
  renderTagUpdateArray(tagsToUpdate)
  return checkAfterCallbackPromise(callbackResult, last, global)
}

export function checkAfterCallbackPromise(
  callbackResult: any,
  last: BaseSupport | Support,
  global: TagGlobal,
) {
  if(isPromise(callbackResult)) {
    const global0 = last.subject.global as TagGlobal
    global0.locked = true

    return callbackResult.then(() => {
      if(global.deleted === true) {
        return promiseNoData // tag was deleted during event processing
      }

      const global1 = last.subject.global as TagGlobal
      delete global1.locked
      const tagsToUpdate = getUpTags(last)
      renderTagUpdateArray(tagsToUpdate)

      return promiseNoData
    })
  }

  return noData
}

export function runBlocked(
  tag: BaseSupport | Support,
) {
  const global = tag.subject.global as SupportTagGlobal
  const blocked = global.blocked

  for(const block of blocked) {
    const lastResult = renderSupport(block)
    global.newest = lastResult
  }
  
  global.blocked = []
  
  return global.newest
}
