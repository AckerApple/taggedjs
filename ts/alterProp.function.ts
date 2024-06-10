import { BaseSupport, Support } from './tag/Support.class.js'
import { deepClone, deepEqual } from './deepFunctions.js'
import { isStaticTag } from './isInstance.js'
import { renderSupport } from './tag/render/renderSupport.function.js'
import { State, setUse } from './state/index.js'
import { getSupportInCycle } from './tag/getSupportInCycle.function.js'
import { syncStates } from './state/syncStates.function.js'
import { Props } from './Props.js'

export function castProps(
  props: Props,
  newSupport: BaseSupport | Support,
  stateArray: State,
) {
  return props.map(prop => alterProp(
    prop,
    (newSupport as Support).ownerSupport,
    stateArray,
    newSupport,
  ))
}

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProp(
  prop: unknown,
  ownerSupport: BaseSupport | Support,
  stateArray: State,
  newSupport: BaseSupport | Support,
) {
  if(isStaticTag(prop) || !prop) {
    return prop
  }

  if(!ownerSupport) {
    return prop // no one above me
  }

  return checkProp(prop, ownerSupport, stateArray, newSupport)
}

export function checkProp(
  value: any,
  ownerSupport: BaseSupport | Support,
  stateArray: State,
  newSupport: BaseSupport | Support,
  index?: string | number,
  newProp?: any,
  seen: any[] = [],
) {
  if(value instanceof Function) {
    return getPropWrap(value, ownerSupport, stateArray, newSupport, index, newProp)
  }

  if(seen.includes(value)) {
    return value
  }
  seen.push(value)

  if(typeof(value)!=='object' || !value) {
    return value // no children to crawl through
  }

  if(value instanceof Array) {
    for (let index = value.length - 1; index >= 0; --index) {
      const subValue = value[index]
  
      value[index] = checkProp(
        subValue, ownerSupport, stateArray, newSupport, index, value, seen
      )

      if(subValue instanceof Function) {
        if(subValue.toCall) {
          continue
        }
  
        afterCheckProp(index, subValue, value, newSupport)
      }
    }

    return value
  }


  for(const name in value){
    const subValue = value[name]
    const result = checkProp(
      subValue, ownerSupport, stateArray, newSupport, name, value, seen
    )
    
    const hasSetter = Object.getOwnPropertyDescriptor(value, name)?.set
    if(hasSetter) {
      continue
    }
    
    value[name] = result
    if(result instanceof Function) {
      if(subValue.toCall) {
        continue
      }
  
      afterCheckProp(name, subValue, value, newSupport)
    }
  }
  
  return value
}

function afterCheckProp(
  index: string | number,
  pastValue: any,
  newProp: any,
  newSupport: BaseSupport | Support
) {
  if(pastValue?.toCall) {
    return // already been done
  }

  // restore object to have original function on destroy
  newSupport.subject.global.destroy$.toCallback(() => newProp[index] = pastValue)
}

export function getPropWrap(
  value: any,
  ownerSupport: BaseSupport | Support,
  stateArray: State,
  newSupport: BaseSupport | Support,
  name?: string | number,
  newProp?: any,
) {
  const toCall = value.toCall

  // already previously converted by a parent?
  if(toCall) {
    return value
  }

  const wrap = (...args: any[]) => wrap.toCall(...args) // what gets called can switch over parent state changes
  // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
  wrap.toCall = (...args: any[]) => {
    return callbackPropOwner(wrap.prop, args, ownerSupport)
  }
  wrap.original = value
  wrap.prop = value
  wrap.stateArray = stateArray

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
  const newest = ownerSupport.subject.global.newest as Support
  const noCycle = getSupportInCycle() === undefined  
  const result = toCall(...callWith)
  const run = () => {    
    // are we in a rendering cycle? then its being called by alterProps
    if(noCycle === false) {
      // appears a prop function was called sync/immediately so lets see if owner changed state
      const allMatched = newest.state.every(state => {
        const lastValue = state.lastValue
        const get = state.get()
        const equal = deepEqual(
          deepClone(lastValue),
          get,
        )
  
        return equal
      })
    
      if(allMatched) {
        return result // owner did not change
      }
    }

    renderSupport(
      newest,
      true,
    )

    return result
  }

  if(noCycle) {
    return run()
  }
  
  setUse.memory.tagClosed$.toCallback(run)

  return result
}
