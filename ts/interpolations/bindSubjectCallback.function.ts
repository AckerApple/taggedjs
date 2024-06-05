/** File largely responsible for reacting to element events, such as onclick */

import { TagSupport } from '../tag/TagSupport.class.js'
import { TagGlobal } from '../tag/TemplaterResult.class.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { renderTagSupport } from'../tag/render/renderTagSupport.function.js'

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
  const myGlobal = tagSupport.global
  const renderCount = myGlobal.renderCount
  const method = value.bind(bindTo)
  const callbackResult = method(...args)
  const sameRenderCount = renderCount === myGlobal.renderCount
  const last = myGlobal.newest as TagSupport
  const skipRender = !sameRenderCount
  
  // already rendered OR tag was deleted before event processing
  if(skipRender) {
    if(callbackResult instanceof Promise) {
      return callbackResult.then(() => {
        return 'promise-no-data-ever' // tag was deleted during event processing
      })
    }
    return 'no-data-ever' // already rendered
  }

  // If we are NOT a component than we need to render my owner instead
  if(tagSupport.templater.tagJsType === ValueTypes.templater) {
    const owner = last.ownerTagSupport
    const newest = owner.global.newest as TagSupport
    return renderCallbackSupport(newest, callbackResult, owner.global)
  }

  return renderCallbackSupport(last, callbackResult, last.global)
}


function renderCallbackSupport(
  last: TagSupport,
  callbackResult: any,
  global: TagGlobal,
) {
  if(global.deleted) {
    return 'no-data-ever' // || last.global.deleted
  }

  const newest = renderTagSupport(
    last as TagSupport,
    true, // renderUp - callback may have changed props so also check to render up
  )

  global.newest = newest

  if(callbackResult instanceof Promise) {
    return callbackResult.then(() => {
      if(global.deleted) {
        return 'promise-no-data-ever' // tag was deleted during event processing
      }

      const newInPromise = renderTagSupport(
        global.newest as TagSupport,
        true,
      )

      global.newest = newInPromise

      return 'promise-no-data-ever'
    })
  }

  return 'no-data-ever'
}