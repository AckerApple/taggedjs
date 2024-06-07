import { BaseTagSupport, TagSupport } from './tag/TagSupport.class.js'
import { deepClone, deepEqual } from './deepFunctions.js'
import { isStaticTag } from './isInstance.js'
import { renderTagSupport } from './tag/render/renderTagSupport.function.js'
import { State, setUse } from './state/index.js'
import { getSupportInCycle } from './tag/getSupportInCycle.function.js'
import { syncStates } from './state/syncStates.function.js'
import { Props } from './Props.js'

export function castProps(
  props: Props,
  newTagSupport: BaseTagSupport | TagSupport,
  stateArray: State,
) {
  return props.map(prop => alterProp(
    prop,
    (newTagSupport as TagSupport).ownerTagSupport,
    stateArray,
    newTagSupport,
  ))
}

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProp(
  prop: unknown,
  ownerSupport: BaseTagSupport | TagSupport,
  stateArray: State,
  newTagSupport: BaseTagSupport | TagSupport,
) {
  if(isStaticTag(prop) || !prop) {
    return prop
  }

  if(!ownerSupport) {
    return prop // no one above me
  }

  return checkProp(prop, ownerSupport, stateArray, newTagSupport)
}

export function checkProp(
  value: any,
  ownerSupport: BaseTagSupport | TagSupport,
  stateArray: State,
  newTagSupport: BaseTagSupport | TagSupport,
  index?: string | number,
  newProp?: any,
  seen: any[] = [],
) {
  if(value instanceof Function) {
    return getPropWrap(value, ownerSupport, stateArray, newTagSupport, index, newProp)
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
        subValue, ownerSupport, stateArray, newTagSupport, index, value, seen
      )

      if(subValue instanceof Function) {
        if(subValue.toCall) {
          continue
        }
  
        afterCheckProp(index, subValue, value, newTagSupport)
      }
    }

    return value
  }


  for(const name in value){
    const subValue = value[name]
    const result = checkProp(
      subValue, ownerSupport, stateArray, newTagSupport, name, value, seen
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
  
      afterCheckProp(name, subValue, value, newTagSupport)
    }
  }
  
  return value
}

function afterCheckProp(
  index: string | number,
  pastValue: any,
  newProp: any,
  newTagSupport: BaseTagSupport | TagSupport
) {
  if(pastValue?.toCall) {
    return // already been done
  }

  // restore object to have original function on destroy
  newTagSupport.global.destroy$.toCallback(() => newProp[index] = pastValue)
}

export function getPropWrap(
  value: any,
  ownerSupport: BaseTagSupport | TagSupport,
  stateArray: State,
  newTagSupport: BaseTagSupport | TagSupport,
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
    return callbackPropOwner(wrap.prop, args, ownerSupport, wrap.stateArray)
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
  ownerSupport: BaseTagSupport | TagSupport, // <-- WHEN called from alterProp its owner OTHERWISE its previous
  oldState: State,
) {
  const newest = ownerSupport.global.newest as TagSupport
  //const newState = newest.memory.state
  const noCycle = getSupportInCycle() === undefined
  //const sync = noCycle && oldState.length === newState.length
  
  //if(sync) {
  //  syncStates(newState, oldState)
  //}
  
  const result = toCall(...callWith)

  // if(sync) {
  //   syncStates(oldState, newState)
  // }
  
  const run = () => {    
    // are we in a rendering cycle? then its being called by alterProps
    if(noCycle === false) {
      // appears a prop function was called sync/immediately so lets see if owner changed state
      const allMatched = newest.memory.state.every(state => {
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

    renderTagSupport(
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
