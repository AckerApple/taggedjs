/** File largely responsible for reacting to element events, such as onclick */

import { setUse } from '../state/setUse.function.js'
import { State } from '../state/state.utils.js'
import { syncStates } from '../state/syncStates.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'
import { TagGlobal } from '../tag/TemplaterResult.class.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { renderSupport } from'../tag/render/renderSupport.function.js'
import { updateExistingTagComponent } from '../tag/update/updateExistingTagComponent.function.js'

const useLocks = true
const noData = 'no-data-ever'
const promiseNoData = 'promise-no-data-ever'

export type Callback = (...args: any[]) => any & {
  isChildOverride?: true // if this is set, then a parent tag passed children to a tag/component
}

export function bindSubjectCallback(
  value: Callback,
  support: BaseSupport | Support,
) {
  // Is this children? No override needed
  if((value as any).isChildOverride) {
    return value
  }

  // const state = setUse.memory.stateConfig.support?.state as State
  const state = support.state as State
  const subjectFunction = (
    element: Element, args: any[],
  ) => runTagCallback(value, support, element, args, state)

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  support: BaseSupport | Support,
  bindTo: unknown,
  args: any[],
  state: State
) {
  const tag = findTagToCallback(support)
  const global = tag.subject.global

  if(global.deleted) {
    return noData
  }

  const newest = global.newest as Support
  const newState = newest.state
  if(newState.length === state.length) {
    syncStates(newState, state)
  }
  // syncStates(newState, tag.state)
  // const renderCount = global.renderCount
  const method = value.bind(bindTo)  
  tag.subject.global.locked = useLocks // prevent another render from re-rendering this tag
  const callbackResult = method(...args)

  /*
  if(renderCount !== global.renderCount) {
    // ??? new - the lock should have been respected
    // return "no-data-ever"
  }
  */

 return afterTagCallback(tag, callbackResult, state)
}

export function afterTagCallback(
  tag: BaseSupport | Support,
  callbackResult: any,
  state: State,
) {
  const global = tag.subject.global
  delete global.locked
  const blocked = global.blocked
  if(blocked.length) {
    let lastResult: BaseSupport | Support | undefined;

    lastResult = runBlocked(
      tag,
      state,
      lastResult as Support,
    )

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
    last.subject.global.locked = useLocks

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
  state: State,
  lastResult?: BaseSupport | Support,
) {
  const global = tag.subject.global
  const blocked = global.blocked

  while (blocked.length > 0) {
    const block = blocked[0] as Support

    blocked.splice(0,1)
    lastResult = updateExistingTagComponent(
      block.ownerSupport,
      block,
      block.subject,
      block.subject.global.insertBefore as any,
      // ??? recently removed
      // false, // true, // renderUp
    )

    global.newest = lastResult
  }
  global.blocked.length = 0
  // global.oldest.updateBy( lastResult as Support )

  /*
  if(lastResult) {
    const newState = lastResult.state
    syncStates(state, newState)

    const newest = renderSupport(
      lastResult,
      true,
    )
    
    global.newest = newest
    global.oldest.updateBy( lastResult as Support )
    syncStates(newState, state)
  }
    */

  return lastResult
}
