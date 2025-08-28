/** File largely responsible for reacting to element events, such as onclick */

import { isPromise } from '../../isInstance.js'
import { AnySupport } from '../../tag/index.js'
import { SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { getUpTags } from './getUpTags.function.js'
import { renderTagUpdateArray } from './renderTagArray.function.js'
import { syncSupports } from '../../state/syncStates.function.js'

export function checkToResolvePromise(
  callbackResult: any,
  last: AnySupport,
  {resolvePromise, resolveValue}: {
    resolvePromise: (value: any) => any // promiseNoData
    resolveValue: (value: any) => any // noData
  }
) {
  const isProm = isPromise(callbackResult)

  if(isProm) {
    const subject = last.context
    subject.locked = 2
    return callbackResult.then(thenResolveBy(last, resolvePromise))
  }

  return resolveValue(callbackResult)
}

export function thenResolveBy(
  last: AnySupport,
  resolvePromise: (value: any) => any, // promiseNoData
) {
  return (x: any) => {
    const global = last.context.global as SupportTagGlobal
    //clearTimeout(timeout)
    const subject = last.context
    delete subject.locked

    if(global.deleted === true) {
      return resolvePromise(x) // tag was deleted during event processing
    }

    // The promise may have then changed old variables, lets update forward
    syncSupports(last, subject.state.newest as AnySupport)

    const tagsToUpdate = getUpTags(last)
    renderTagUpdateArray(tagsToUpdate)

    return resolvePromise(x)
  }
}