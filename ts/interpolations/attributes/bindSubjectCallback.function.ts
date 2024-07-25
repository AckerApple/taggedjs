/** File largely responsible for reacting to element events, such as onclick */

import { AnySupport, BaseSupport, Support } from '../../tag/Support.class.js'
import { TagGlobal } from '../../tag/TemplaterResult.class.js'
import { updateExistingTagComponent } from '../../tag/update/updateExistingTagComponent.function.js'
import { getUpTags } from './getUpTags.function.js'
import { renderTagUpdateArray } from './renderTagArray.function.js'

const noData = 'no-data-ever'
const promiseNoData = 'promise-no-data-ever'

export type Callback = (...args: any[]) => any

export function bindSubjectCallback(
  value: Callback,
  support: AnySupport,
  attrName: string,
) {
  const global = support.subject.global
  const subjectFunction = function (
    element: Element, args: any[],
  ) {
    if(global.deleted) {
      return
    }
    
    const newest = global.newest as Support // || subjectFunction.support
    return runTagCallback(
      subjectFunction.tagFunction,
      newest,
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
  const tag = support
  const global = tag.subject.global
  global.locked = true // prevent another render from re-rendering this tag
  const callbackResult = value.apply(bindTo, args)

  return afterTagCallback(tag, callbackResult)
}

export function afterTagCallback(
  tag: BaseSupport | Support,
  callbackResult: any,
) {
  const global = tag.subject.global
  delete global.locked
  
  const blocked = global.blocked
  if(blocked.length) {
    const lastResult = runBlocked(tag)

    return checkAfterCallbackPromise(
      callbackResult,
      lastResult as Support,
      global
    )
  }

  return renderCallbackSupport(
    global.newest as Support,
    callbackResult,
    global
  )
}

function renderCallbackSupport(
  last: Support,
  callbackResult: any,
  global: TagGlobal,
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
  if(callbackResult instanceof Promise) {
    last.subject.global.locked = true

    return callbackResult.then(() => {
      if(global.deleted) {
        return promiseNoData // tag was deleted during event processing
      }

      delete last.subject.global.locked
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
  const global = tag.subject.global
  const blocked = global.blocked

  for(const block of blocked) {    
    const lastResult = updateExistingTagComponent(
      block.ownerSupport as Support,
      block,
      block.subject,
    )

    global.newest = lastResult.support
  }
  
  global.blocked = []
  
  return global.newest
}
