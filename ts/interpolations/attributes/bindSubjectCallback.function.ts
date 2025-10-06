// taggedjs-no-compile
/** File largely responsible for reacting to element events, such as onclick */

import { AnySupport } from '../../tag/index.js'
import { SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { getUpTags } from './getUpTags.function.js'
import { renderTagUpdateArray } from './renderTagArray.function.js'
import { getSupportWithState } from './getSupportWithState.function.js'
import { checkToResolvePromise } from './checkToResolvePromise.function.js'

export type Callback = (...args: any[]) => any

export function bindSubjectCallback(
  value: Callback,
  support: AnySupport,
) {
  const global = support.context.global as SupportTagGlobal

  // MAIN EVENT CALLBACK PROCESSOR
  const subjectFunction = function callbackReplacement(
    element: Element, args: any[],
  ) {
    if(global.deleted === true) {
      return
    }
    
    // const newest = global.newest as AnySupport // || subjectFunction.support
    return runTagCallback(
      subjectFunction.tagFunction,
      subjectFunction.support, // newest
      // subjectFunction.states, // newest
      element,
      args,
    )
  }

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value
  
  // const component = getSupportWithState(support)
  subjectFunction.support = support

  // subjectFunction.otherSupport = component
  //const states = component.states // ?.[0]
  // subjectFunction.states = states

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  support: AnySupport,
  // states: StatesSetter[],
  bindTo: unknown,
  args: any[],
) {
  // get actual component owner not just the html`` support
  const component = getSupportWithState(support)
  const subject = component.context
  // const global = subject.global as SupportTagGlobal // tag.subject.global as TagGlobal
  
  subject.locked = 1 // prevent another render from re-rendering this tag

  // sync the new states to the old before the old does any processing
  // syncStatesArray(component.subject.global.newest.states, states)

  // ACTUAL CALLBACK TO ORIGINAL FUNCTION
  const callbackResult = value.apply(bindTo, args)

  // sync the old states to the new
  // syncStatesArray(states, component.subject.global.newest.states)

  delete subject.locked

  const result = afterTagCallback(
    callbackResult,
    component,
  )

  return result
}

export function afterTagCallback(
  callbackResult: any,
  last: AnySupport,
) {
  const global = last.context.global
  if(global?.deleted) {
    return
  }

  const tagsToUpdate = getUpTags(last)

  renderTagUpdateArray(tagsToUpdate)
  return checkToResolvePromise(
    callbackResult,
    last,
    { resolvePromise, resolveValue }
  )
}

const noData = 'no-data-ever'
const promiseNoData = 'promise-no-data-ever'

function resolvePromise() {
  return promiseNoData
}

function resolveValue() {
  return noData
}
