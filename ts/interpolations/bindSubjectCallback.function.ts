/** File largely responsible for reacting to element events, such as onclick */

import { setUse } from '../state/setUse.function.js'
import { syncStates } from '../state/syncStates.function.js'
import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'
import { TagGlobal } from '../tag/TemplaterResult.class.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { renderTagSupport } from'../tag/render/renderTagSupport.function.js'
import { updateExistingTagComponent } from '../tag/update/updateExistingTagComponent.function.js'

const useLocks = true

export type Callback = (...args: any[]) => any & {
  isChildOverride?: true // if this is set, then a parent tag passed children to a tag/component
}

export function bindSubjectCallback(
  value: Callback,
  tagSupport: TagSupport,
) {
  // Is this children? No override needed
  if((value as any).isChildOverride) {
    return value
  }

  const state = setUse.memory.stateConfig
  const subjectFunction = (
    element: Element, args: any[]
  ) => runTagCallback(value, tagSupport, element, args)

  // link back to original. Mostly used for <div oninit ondestroy> animations
  subjectFunction.tagFunction = value

  return subjectFunction
}

export function runTagCallback(
  value: Callback,
  tagSupport: TagSupport,
  bindTo: unknown,
  args: any[],
) {
  const tag = findTagToCallback(tagSupport)
  const method = value.bind(bindTo)  
  tag.global.locked = useLocks // prevent another render from re-rendering this tag
  const callbackResult = method(...args)

 return afterTagCallback(tag, callbackResult)
}

function afterTagCallback(
  tag: TagSupport,
  callbackResult: any,
) {
  delete tag.global.locked

  if(tag.global.blocked.length) {    
    let lastResult: BaseTagSupport | TagSupport | undefined;
    tag.global.blocked.forEach(blocked => {      
      const block = blocked as TagSupport
  
      lastResult = updateExistingTagComponent(
        block.ownerTagSupport,
        block,
        block.subject,
        block.global.insertBefore as any,
        true, // renderUp
      )

      tag.global.newest = lastResult
      tag.global.blocked.splice(0,1)
    })
    tag.global.blocked.length = 0

    // return lastResult
    return checkAfterCallbackPromise(
      callbackResult,
      lastResult as TagSupport,
      (lastResult as TagSupport).global
    )
  }

  const result = renderCallbackSupport(tag.global.newest as TagSupport, callbackResult, tag.global)
  return result
}

function findTagToCallback(
  tagSupport: TagSupport,
): TagSupport {
  // If we are NOT a component than we need to render my owner instead
  if(tagSupport.templater.tagJsType === ValueTypes.templater) {
    const owner = tagSupport.ownerTagSupport
    return findTagToCallback(owner)
  }

  return tagSupport
}

function renderCallbackSupport(
  last: TagSupport,
  callbackResult: any,
  global: TagGlobal,
) {
  if(global.deleted) {
    return 'no-data-ever' // || last.global.deleted
  }

  renderTagSupport(
    last as TagSupport,
    true, // renderUp - callback may have changed props so also check to render up
  )

  return checkAfterCallbackPromise(callbackResult, last, global)
}

function checkAfterCallbackPromise(
  callbackResult: any,
  last: BaseTagSupport | TagSupport,
  global: TagGlobal,
) {
  if(callbackResult instanceof Promise) {
    last.global.locked = useLocks

    return callbackResult.then(() => {
      delete last.global.locked

      if(global.deleted) {
        return 'promise-no-data-ever' // tag was deleted during event processing
      }

      delete last.global.locked
      renderTagSupport(
        global.newest as TagSupport,
        true,
      )

      return 'promise-no-data-ever'
    })
  }

  return 'no-data-ever'
}