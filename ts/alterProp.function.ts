import { isInlineHtml, renderInlineHtml, renderSupport } from './tag/render/renderSupport.function.js'
import { renderExistingReadyTag } from './tag/render/renderExistingTag.function.js'
import { AnySupport, BaseSupport, Support } from './tag/Support.class.js'
import { getSupportInCycle } from './tag/getSupportInCycle.function.js'
import { deepCompareDepth } from './tag/hasSupportChanged.function.js'
import { SupportTagGlobal } from './tag/TemplaterResult.class.js'
import { isArray, isStaticTag } from './isInstance.js'
import { BasicTypes } from './tag/ValueTypes.enum.js'
import { setUseMemory } from './state/index.js'
import { Tag } from './tag/Tag.class.js'
import { Props } from './Props.js'

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
  value: any,
  ownerSupport: BaseSupport | Support,
  newSupport: BaseSupport | Support,
  depth: number,
) {
  if(!value) {
    return value
  }

  if(value.tagJsType) {
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
    for (let index = value.length - 1; index >= 0; --index) {
      const subValue = value[index]
  
      value[index] = checkProp(
        subValue, ownerSupport, newSupport, depth + 1,
      )

      if(typeof(subValue) === BasicTypes.function) {
        if(subValue.mem) {
          continue
        }

        afterCheckProp(depth + 1, index, subValue, value, newSupport)
      }
    }

    return value
  }

  const keys = Object.keys(value)
  for(const name of keys){
    const subValue = value[name]
    const result = checkProp(
      subValue, ownerSupport, newSupport, depth + 1,
    )

    if(value[name] === result) {
      continue
    }
    
    const getset = Object.getOwnPropertyDescriptor(value, name)
    const hasSetter = getset?.get || getset?.set
    if(hasSetter) {
      continue
    }

    value[name] = result
    if(typeof(result) === BasicTypes.function) {
      if(subValue.mem) {
        continue
      }
  
      afterCheckProp(depth + 1, name, subValue, value, newSupport)
    }
  }
  
  return value
}

function afterCheckProp(
  depth: number,
  index: string | number,
  originalValue: any,
  newProp: any,
  newSupport: BaseSupport | Support
) {
  // restore object to have original function on destroy
  if(depth > 0) {    
    const global = newSupport.subject.global as SupportTagGlobal
    newProp[index].subscription = global.destroy$.toCallback(function alterCheckProcessor() {
      newProp[index] = originalValue
    })
  }
}

export function getPropWrap(
  value: any,
  ownerSupport: BaseSupport | Support,
) {
  const already = value.mem

  // already previously converted by a parent?
  if(already) {
    return value
  }

  const wrap = function wrapRunner(...args: any[]) {
    return wrap.toCall(...args)
  } // what gets called can switch over parent state changes
  
  // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
  wrap.toCall = function toCallRunner(...args: any[]) {
    return callbackPropOwner(wrap.mem, args, ownerSupport)
  }
  
  wrap.original = value
  wrap.mem = value

  // copy data properties that maybe on source function
  Object.assign(wrap, value)

  return wrap
}

/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export function callbackPropOwner(
  toCall: Function,
  callWith: any,
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

    /*
    const oldest = global.oldest
    const wasInstant = oldest === newest && global.renderCount === 0
    if(wasInstant) {
      return // prop was called immediately
    }
    */

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
