/** File largely responsible for reacting to element events, such as onclick */

import { isPromise } from '../../isInstance.js'
import { AnySupport } from '../../tag/index.js'
import { SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { getUpTags } from './getUpTags.function.js'
import { renderTagUpdateArray } from './renderTagArray.function.js'

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
    return callbackResult.then(thenResolveBy(last, resolvePromise))
  }

  return resolveValue(callbackResult)
}

export function thenResolveBy(
  last: AnySupport,
  resolvePromise: (value: any) => any, // promiseNoData
) {
  return (x: any) => {
    const subject = last.context
    const global = subject.global as SupportTagGlobal
    // delete subject.locked

    if(
      subject.deleted === true ||
      global?.deleted === true // this maybe deprecated
    ) {
      return resolvePromise(x) // tag was deleted during event processing
    }

    const tagsToUpdate = getUpTags(last)
    renderTagUpdateArray(tagsToUpdate)

    return resolvePromise(x)
  }
}