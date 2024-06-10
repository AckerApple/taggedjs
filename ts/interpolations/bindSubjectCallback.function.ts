/** File largely responsible for reacting to element events, such as onclick */

import { setUse } from '../state/setUse.function.js'
import { syncStates } from '../state/syncStates.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'
import { TagGlobal } from '../tag/TemplaterResult.class.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { renderSupport } from'../tag/render/renderSupport.function.js'
import { updateExistingTagComponent } from '../tag/update/updateExistingTagComponent.function.js'

const useLocks = true

export type Callback = (...args: any[]) => any & {
  isChildOverride?: true // if this is set, then a parent tag passed children to a tag/component
}

export function bindSubjectCallback(
  value: Callback,
  support: Support,
) {
  // Is this children? No override needed
  if((value as any).isChildOverride) {
    return value
  }

  const state = setUse.memory.stateConfig
  const subjectFunction = (
    element: Element, args: any[]
  ) => runTagCallback(value, support, element, args)

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  support: Support,
  bindTo: unknown,
  args: any[],
) {
  const tag = findTagToCallback(support)
  const method = value.bind(bindTo)  
  tag.subject.global.locked = useLocks // prevent another render from re-rendering this tag
  const callbackResult = method(...args)

 return afterTagCallback(tag, callbackResult)
}

function afterTagCallback(
  tag: Support,
  callbackResult: any,
) {
  delete tag.subject.global.locked

  if(tag.subject.global.blocked.length) {    
    let lastResult: BaseSupport | Support | undefined;
    tag.subject.global.blocked.forEach(blocked => {      
      const block = blocked as Support
  
      lastResult = updateExistingTagComponent(
        block.ownerSupport,
        block,
        block.subject,
        block.subject.global.insertBefore as any,
        true, // renderUp
      )

      tag.subject.global.newest = lastResult
      tag.subject.global.blocked.splice(0,1)
    })
    tag.subject.global.blocked.length = 0

    // return lastResult
    return checkAfterCallbackPromise(
      callbackResult,
      lastResult as Support,
      (lastResult as Support).subject.global
    )
  }

  const result = renderCallbackSupport(tag.subject.global.newest as Support, callbackResult, tag.subject.global)
  return result
}

function findTagToCallback(
  support: Support,
): Support {
  // If we are NOT a component than we need to render my owner instead
  if(support.templater.tagJsType === ValueTypes.templater) {
    const owner = support.ownerSupport
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
    return 'no-data-ever' // || last.global.deleted
  }

  renderSupport(
    last as Support,
    true, // renderUp - callback may have changed props so also check to render up
  )

  return checkAfterCallbackPromise(callbackResult, last, global)
}

function checkAfterCallbackPromise(
  callbackResult: any,
  last: BaseSupport | Support,
  global: TagGlobal,
) {
  if(callbackResult instanceof Promise) {
    last.subject.global.locked = useLocks

    return callbackResult.then(() => {
      delete last.subject.global.locked

      if(global.deleted) {
        return 'promise-no-data-ever' // tag was deleted during event processing
      }

      delete last.subject.global.locked
      renderSupport(
        global.newest as Support,
        true,
      )

      return 'promise-no-data-ever'
    })
  }

  return 'no-data-ever'
}