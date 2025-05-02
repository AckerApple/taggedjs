// taggedjs-no-compile
/** File largely responsible for reacting to element events, such as onclick */

import { isPromise, isTagComponent } from '../../isInstance.js'
import { renderSupport } from '../../tag/render/renderSupport.function.js'
import { AnySupport } from '../../tag/getSupport.function.js'
import { SupportTagGlobal, TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { getUpTags } from './getUpTags.function.js'
import { renderTagUpdateArray } from './renderTagArray.function.js'
import { StatesSetter } from '../../state/states.utils.js'
import { getSupportWithState } from './getSupportWithState.function.js'
import { syncStatesArray } from '../../state/syncStates.function.js'

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
      subjectFunction.states, // newest
      element,
      args,
    )
  }

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value
  
  const component = getSupportWithState(support)
  subjectFunction.support = support

  // subjectFunction.otherSupport = component
  const states = component.states // ?.[0]
  subjectFunction.states = states
  // subjectFunction.states = [...states]

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  support: AnySupport,
  states: StatesSetter[],
  bindTo: unknown,
  args: any[],
) {
  // get actual component owner not just the html`` support
  const component = getSupportWithState(support)
  const subject = component.subject
  const global = subject.global as SupportTagGlobal // tag.subject.global as TagGlobal
  
  global.locked = true // prevent another render from re-rendering this tag

  // sync the new states to the old before the old does any processing
  // syncStatesArray(component.subject.global.newest.states, states)

  // ACTUAL CALLBACK TO ORIGINAL FUNCTION
  const callbackResult = value.apply(bindTo, args)

  // sync the old states to the new
  // syncStatesArray(states, component.subject.global.newest.states)

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
