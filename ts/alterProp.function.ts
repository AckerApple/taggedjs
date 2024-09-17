import { isInlineHtml, renderInlineHtml } from './tag/render/renderSupport.function.js'
import { renderExistingReadyTag } from './tag/render/renderExistingTag.function.js'
import { AnySupport, BaseSupport, Support } from './tag/Support.class.js'
import { getSupportInCycle } from './tag/getSupportInCycle.function.js'
import { deepCompareDepth } from './tag/hasSupportChanged.function.js'
import { SupportTagGlobal, TemplaterResult } from './tag/TemplaterResult.class.js'
import { isArray, isStaticTag } from './isInstance.js'
import { BasicTypes } from './tag/ValueTypes.enum.js'
import { setUseMemory } from './state/index.js'
import { Tag } from './tag/Tag.class.js'
import { Props } from './Props.js'
import { UnknownFunction } from './tag/index.js'
import { Subject } from './subject/Subject.class.js'

export function castProps(
  props: Props,
  newSupport: BaseSupport | Support,
  depth: number,
) {
  return props.map(prop => alterProp(
    prop,
    (newSupport as Support).ownerSupport,
    newSupport,
    depth,
  ))
}

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProp(
  prop: unknown,
  ownerSupport: BaseSupport | Support,
  newSupport: BaseSupport | Support,
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
  ownerSupport: BaseSupport | Support,
  newSupport: BaseSupport | Support,
  depth: number,
) {
  if(!value) {
    return value
  }

  if((value as TemplaterResult).tagJsType) {
    return value
  }

  if(typeof(value) === BasicTypes.function) {
    return getPropWrap(value, ownerSupport)
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
      subValue, ownerSupport, newSupport, depth + 1,
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
      subValue, ownerSupport, newSupport, depth + 1,
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
        depth + 1, name, subValue,
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
  newSupport: BaseSupport | Support
) {
  // restore object to have original function on destroy
  if(depth > 0) {    
    const global = newSupport.subject.global as SupportTagGlobal
    newProp[index].subscription = global.destroy$.toCallback(function alterCheckProcessor() {
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
  ownerSupport: BaseSupport | Support,
) {
  const already = value.mem

  // already previously converted by a parent?
  if(already) {
    return value
  }

  const wrap = function wrapRunner(...args: unknown[]) {
    return wrap.toCall(...args)
  } as WrapRunner // what gets called can switch over parent state changes

  wrap.original = value
  wrap.mem = value as UnknownFunction

  // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
  wrap.toCall = function toCallRunner(...args: unknown[]) {
    return callbackPropOwner(wrap.mem, args, ownerSupport)
  }

  // copy data properties that maybe on source function
  Object.assign(wrap, value)

  return wrap
}

/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export function callbackPropOwner(
  toCall: UnknownFunction,
  callWith: unknown[],
  ownerSupport: BaseSupport | Support, // <-- WHEN called from alterProp its owner OTHERWISE its previous
) {
  const global = ownerSupport.subject.global as SupportTagGlobal
  const newest = global?.newest || ownerSupport as Support
  const supportInCycle = getSupportInCycle()
  const noCycle = supportInCycle === undefined
  const callbackResult = toCall(...callWith)

  const run = function propCallbackProcessor() {
    const global = newest.subject.global as SupportTagGlobal

    // are we in a rendering cycle? then its being called by alterProps
    if(noCycle === false) {
      const allMatched = global.locked === true
    
      if(allMatched) {
        return callbackResult // owner did not change
      }
    }

    safeRenderSupport(newest, ownerSupport)

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

export function safeRenderSupport(
  newest: AnySupport,
  ownerSupport: AnySupport,
) {
  const subject = newest.subject
  const isInline = isInlineHtml(newest.templater)
  if( isInline ) {
    const result = renderInlineHtml(ownerSupport, newest)
    // TODO: below maybe never true
    /*
    const global = subject.global as TagGlobal
    if(global) {
      delete global.locked
    }
    */
    return result
  }
  
  const global = subject.global as SupportTagGlobal

  global.locked = true

  renderExistingReadyTag(
    global.newest as Support,
    newest,
    ownerSupport,
    subject,
  )

  delete global.locked
}
