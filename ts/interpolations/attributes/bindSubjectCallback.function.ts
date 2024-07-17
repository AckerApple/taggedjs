/** File largely responsible for reacting to element events, such as onclick */

import { State } from '../../state/state.utils.js'
import { TagSubject } from '../../subject.types.js'
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
) {
  const state = support.state
  const subjectFunction = (
    element: Element, args: any[],
  ) => {
    return runTagCallback(
      subjectFunction.tagFunction,
      subjectFunction.support.subject.global.newest as Support, // subjectFunction.support
      element,
      args,
      state,
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
  state: State,
) {
  // ??? todo: restore this?
  // const tag = support.templater.tag?.ownerSupport || support
  const tag = support
  const global = tag.subject.global

  // ??? not sure if needed
  /*
  const newest = global.newest as Support
  const newState = newest.state
  if(newState.length === state.length) {
    syncStates(newState, state)
  }
  */

  const method = value.bind(bindTo)  
  global.locked = true // prevent another render from re-rendering this tag
  const callbackResult = method(...args)
  /*
  if(newState.length === state.length) {
    syncStates(state, newState)
  }
  */
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

  const result = renderCallbackSupport(
    global.newest as Support,
    callbackResult,
    global
  )

  return result
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

  while (blocked.length > 0) {
    const block = blocked[0] as Support

    blocked.splice(0,1)
    const lastResult = updateExistingTagComponent(
      block.ownerSupport,
      block,
      block.subject as TagSubject,
    )

    global.newest = lastResult.support
  }

  return global.newest
}
