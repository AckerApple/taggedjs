import { AnySupport } from '../index.js'
import { getSupportInCycle } from '../cycles/getSupportInCycle.function.js'
import { deepCompareDepth } from '../hasSupportChanged.function.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { isArray, isStaticTag } from '../../isInstance.js'
import { BasicTypes } from '../ValueTypes.enum.js'
import { setUseMemory } from '../../state/index.js'
import { Tag } from '../Tag.type.js'
import { Props } from '../../Props.js'
import { UnknownFunction } from '../index.js'
import { Subject } from '../../subject/Subject.class.js'
import { safeRenderSupport } from './safeRenderSupport.function.js'

export function castProps(
  props: Props,
  newSupport: AnySupport,
  depth: number,
) {
  return props.map(function eachCastProp(prop) {
    return alterProp(
      prop,
      newSupport.ownerSupport as AnySupport,
      newSupport,
      depth,
    )
  })
}

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
function alterProp(
  prop: unknown,
  ownerSupport: AnySupport,
  newSupport: AnySupport,
  depth: number,
) {
  if(isStaticTag(prop) || !prop) {
    return prop
  }

  if(!ownerSupport) {
    return prop // no one above me
  }

  return checkProp(prop, ownerSupport, newSupport, depth)
}

export function checkProp(
  value: unknown | TemplaterResult | SubableProp | unknown[] | Record<string, unknown>,
  ownerSupport: AnySupport,
  newSupport: AnySupport,
  depth: number,
  owner?: any,
) {
  if(!value) {
    return value
  }

  if((value as TemplaterResult).tagJsType) {
    return value
  }

  if(typeof(value) === BasicTypes.function) {
    if(depth <= 1) {
       // only wrap function at depth 0 and 1
      return getPropWrap(value, owner, ownerSupport)
    }
    return value
  }

  if(depth === deepCompareDepth) {
    return value
  }

  const skip = isSkipPropValue(value)
  if( skip ) {
    return value // no children to crawl through
  }

  if(isArray(value)) {
    return checkArrayProp(value as unknown[], newSupport, ownerSupport, depth)
  }

  return checkObjectProp(value as Record<string, unknown>, newSupport, ownerSupport, depth)
}

function checkArrayProp(
  value: unknown[],
  newSupport: AnySupport,
  ownerSupport: AnySupport,
  depth: number,
) {
  for (let index = value.length - 1; index >= 0; --index) {
    const subValue = value[index] as WrapRunner

    value[index] = checkProp(
      subValue,
      ownerSupport,
      newSupport,
      depth + 1,
      value
    )

    if(typeof(subValue) === BasicTypes.function) {
      if(subValue.mem as unknown) {
        continue
      }

      afterCheckProp(
        depth + 1, index, subValue,
        value as unknown as SubableProp,
        newSupport,
      )
    }
  }

  return value
}

function checkObjectProp(
  value: Record<string, unknown>,
  newSupport: AnySupport,
  ownerSupport: AnySupport,
  depth: number,
) {
  const keys = Object.keys(value)
  for(const name of keys){
    const subValue = value[name] as WrapRunner
    const result = checkProp(
      subValue,
      ownerSupport,
      newSupport,
      depth + 1,
      value,
    )

    const newSubValue = value[name] as unknown
    if(newSubValue === result) {
      continue
    }
    
    const getset = Object.getOwnPropertyDescriptor(value, name)
    const hasSetter = getset?.get || getset?.set
    if(hasSetter) {
      continue
    }

    value[name] = result
    if(typeof(result) === BasicTypes.function) {  
      if(subValue.mem as unknown) {
        continue
      }
  
      afterCheckProp(
        depth + 1,
        name,
        subValue,
        value as SubableProp,
        newSupport,
      )
    }
  }
  
  return value
}

type SubableProp = {[name:string]: {subscription: Subject<void>}}

function afterCheckProp(
  depth: number,
  index: string | number,
  originalValue: unknown,
  newProp: SubableProp,
  newSupport: AnySupport
) {
  // restore object to have original function on destroy
  if(depth > 0) {    
    newProp[index].subscription = newSupport.context.destroy$.toCallback(function alterCheckProcessor() {
      newProp[index] = originalValue as unknown as {subscription: Subject<void>}
    })
  }
}

export type WrapRunner = (() => unknown) & {
  original: unknown
  mem: UnknownFunction
  toCall: UnknownFunction
}

export function getPropWrap(
  value: {mem?: unknown},
  owner: any,
  ownerSupport: AnySupport,
) {
  const already = value.mem

  // already previously converted by a parent?
  if(already) {
    return value
  }

  const wrap = function wrapRunner(...args: unknown[]) {
    return callbackPropOwner(wrap.mem, owner, args, ownerSupport)
  } as WrapRunner // what gets called can switch over parent state changes

  wrap.original = value
  wrap.mem = value as UnknownFunction
  

  // copy data properties that maybe on source function
  Object.assign(wrap, value)

  return wrap
}

/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export function callbackPropOwner(
  toCall: UnknownFunction, // original function
  owner: any,
  callWith: unknown[],
  ownerSupport: AnySupport, // <-- WHEN called from alterProp its owner OTHERWISE its previous
) {
  const ownerContext = ownerSupport.context
  const newest = ownerContext.state?.newest || ownerSupport as AnySupport
  const supportInCycle = getSupportInCycle()
  const noCycle = supportInCycle === undefined
  
  // actual function call to original method
  const callbackResult = toCall.apply(owner, callWith)

  const run = function propCallbackProcessor() {
    const context = newest.context
    const global = context.global as SupportTagGlobal

    if(context.locked) {
      return callbackResult // currently in the middle of rendering
    }
    
    if(!global) {
      /*
      context.tagJsVar.processUpdate(
        context.value,
        context,
        ownerSupport,
        [],
      )
*/
      ownerContext.tagJsVar.processUpdate(
        ownerContext.value,
        ownerContext,
        ownerSupport,
        [],
      )
      
      return callbackResult // currently in the middle of rendering
    }

    safeRenderSupport(newest)

    return callbackResult
  }

  if(noCycle) {
    return run()
  }
  
  setUseMemory.tagClosed$.toCallback(run)

  return callbackResult
}

export function isSkipPropValue(value: unknown) {
  return typeof(value)!== BasicTypes.object || !value || (value as Tag).tagJsType
}
