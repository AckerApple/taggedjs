/** File largely responsible for reacting to element events, such as onclick */

import { State } from '../../state/state.utils.js'
import { syncStates } from '../../state/syncStates.function.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../../tag/Support.class.js'
import { TagGlobal } from '../../tag/TemplaterResult.class.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { renderSupport } from'../../tag/render/renderSupport.function.js'
import { updateExistingTagComponent } from '../../tag/update/updateExistingTagComponent.function.js'

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
      subjectFunction.tagFunction, subjectFunction.support, element, args, state
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
  const tag = findTagToCallback(support)
  const global = tag.subject.global
  
  // ??? TODO: this may not be needed (its covered below)
  if(global.deleted) {
    return noData
  }

  // ??? not sure if needed
  /*
  const newest = global.newest as Support
  const newState = newest.state
  if(newState.length === state.length) {
    syncStates(newState, state)
  }
  */

  const method = value.bind(bindTo)  
  tag.subject.global.locked = true // prevent another render from re-rendering this tag
  const callbackResult = method(...args)

 return afterTagCallback(tag, callbackResult)
}

export function afterTagCallback(
  tag: BaseSupport | Support,
  callbackResult: any,
) {
  const global = tag.subject.global
  /*
  if (global.deleted) {
    return noData;
  }
  */
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

export function findTagToCallback(
  support: BaseSupport | Support,
): BaseSupport | Support {
  // If we are NOT a component than we need to render my owner instead
  if(support.templater.tagJsType === ValueTypes.templater) {
    const owner = (support as Support).ownerSupport
    return findTagToCallback(owner)
  }

  return support
}

function renderCallbackSupport(
  last: Support,
  callbackResult: any,
  global: TagGlobal,
) {
  if(global.deleted) {
    return noData // || last.global.deleted
  }

  renderSupport(
    last as Support,
    true, // renderUp - callback may have changed props so also check to render up
  )

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
      delete last.subject.global.locked

      if(global.deleted) {
        return promiseNoData // tag was deleted during event processing
      }

      delete last.subject.global.locked
      renderSupport(
        global.newest as Support,
        true,
      )

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

    global.newest = lastResult
  }

  return global.newest
}
