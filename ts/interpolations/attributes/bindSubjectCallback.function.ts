// taggedjs-no-compile
/** File largely responsible for reacting to element events, such as onclick */

import { isPromise, isTagComponent } from '../../isInstance.js'
import { renderSupport } from '../../tag/render/renderSupport.function.js'
import { AnySupport } from '../../tag/getSupport.function.js'
import { SupportTagGlobal, TagGlobal } from '../../tag/getTemplaterResult.function.js'
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
    
    // const newest = global.newest as AnySupport // || subjectFunction.support
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
  support: AnySupport,
  bindTo: unknown,
  args: any[],
) {
  // get actual component owner not just the html`` support
  let component = support as AnySupport
  while(component.ownerSupport && !isTagComponent(component.templater)) {
    component = component.ownerSupport as AnySupport
  }

  const subject = component.subject
  const global = subject.global as SupportTagGlobal // tag.subject.global as TagGlobal
  global.locked = true // prevent another render from re-rendering this tag

  // ACTUAL CALLBACK TO ORIGINAL FUNCTION
  const callbackResult = value.apply(bindTo, args)

  delete global.locked

  const result = afterTagCallback(
    callbackResult,
    component,
  )

  return result
}

export function afterTagCallback(
  callbackResult: any,
  eventHandlerSupport: AnySupport,
) {
  const global = eventHandlerSupport.subject.global as SupportTagGlobal // tag.subject.global as SupportTagGlobal

  return renderCallbackSupport(
    eventHandlerSupport as AnySupport,
    callbackResult,
    global, // eventHandlerSupport.subject.global as TagGlobal,
  )
}

function renderCallbackSupport(
  last: AnySupport,
  callbackResult: any,
  global:SupportTagGlobal, // TagGlobal,
) {
  const tagsToUpdate = getUpTags(last)
  renderTagUpdateArray(tagsToUpdate)
  return checkAfterCallbackPromise(callbackResult, last, global)
}

export function checkAfterCallbackPromise(
  callbackResult: any,
  last: AnySupport,
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
  tag: AnySupport,
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
