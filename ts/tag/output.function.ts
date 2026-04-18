import { AnySupport, ContextItem, getContextInCycle, isPromise, paint, TagGlobal, TemplateValue } from "../index.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { paintAfters, painting } from "../render/paint.function.js"
import { safeRenderSupport } from "./props/safeRenderSupport.function.js"
import { findStateSupportUpContext } from "../interpolations/attributes/getSupportWithState.function.js"
import { removeContextInCycle, setContextInCycle } from "./cycles/setContextInCycle.function.js"


/** Used to call a function that belongs to a calling tag but is not with root arguments */
export function output<CallbackReturn, ReceivedArguments extends any[]>(
  callback: ((...args: any[]) => CallbackReturn),
): (...args: ReceivedArguments) => CallbackReturn {
  if(!callback) {
    return blankHandler as any // output used on an argument that was not passed in
  }

  const context = getContextInCycle()
  // const support = getSupportWithState(context)
  // const parentContext = context?.parentContext

  if(!context) {
    throw new Error('output must be used in render sync with a parent context')
  }

  const support = findStateSupportUpContext(context)
  // const support = getSupportInCycle() as AnySupport
  if(!support) {
    throw new Error('output must be used in render sync fashion')
  }

  if((callback as any).wrapped === true) {
    return callback
  }

  const newCallback = (...args: any[]) => {
    const ownerSupport = support.ownerSupport as AnySupport

    const result = syncWrapCallback(
      args, callback,
      ownerSupport.context, // support.context, // parentContext,
    )

    return result
  }

  newCallback.wrapped = true

  return newCallback
}

export function syncWrapCallback(
  args: any[],
  callback: any,
  context: ContextItem, // aka stateOwner
) {
  setContextInCycle(context)

  const result = callback(...args) // call the latest callback

  return afterCallback(result, context)
}

function afterCallback(
  result: any | Promise<any>,
  context: ContextItem, // aka stateOwner
) {
  const newestOwner = undefined as any

  removeContextInCycle()

  const toPaint = () => {
    const newGlobal = context.global as TagGlobal
    const ignore = newGlobal === undefined || newGlobal.deleted === true
    
    if( ignore ) {
      ++painting.locks
      const targetContext = context // newestOwner.context
      targetContext.tagJsVar.processUpdate(
        targetContext.value as TemplateValue,
        targetContext,
        newestOwner,
        [],
      )
      --painting.locks
      paint()
      return // its not a tag anymore
    }

    ++painting.locks
    safeRenderSupport(newestOwner)
    --painting.locks

    paint()
  }

  if( isPromise(result) ) {
    result.then(() => {
      paintAfters.push([toPaint, []])
    })
  }
  
  paintAfters.push([toPaint, []])

  return result
}