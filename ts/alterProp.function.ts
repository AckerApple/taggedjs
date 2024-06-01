import { TagSupport } from './tag/TagSupport.class.js'
import { deepClone, deepEqual } from './deepFunctions.js'
import { isStaticTag } from './isInstance.js'
import { renderTagSupport } from './tag/render/renderTagSupport.function.js'
import { State, setUse } from './state/index.js'
import { getSupportInCycle } from './tag/getSupportInCycle.function.js'
import { syncStates } from './state/syncStates.function.js'

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProp(
  prop: unknown,
  ownerSupport: TagSupport,
  stateArray: State,
  newTagSupport: TagSupport,
  // seen: any[] = [],
) {
  if(isStaticTag(prop) || !prop) {
    return prop
  }

  if(!ownerSupport) {
    return prop // no one above me
  }

  return checkProp(prop, ownerSupport, stateArray, newTagSupport)
}

function checkProp(
  value: any,
  ownerSupport: TagSupport,
  stateArray: State,
  newTagSupport: TagSupport,
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
    value.forEach((x, index) => value[index] = checkProp(x, ownerSupport, stateArray, newTagSupport, index, value, seen))
    return value
  }


  for(const name in value){
    const subValue = value[name]
    const result = checkProp(subValue, ownerSupport, stateArray, newTagSupport, name, value, seen)
    
    const hasSetter = typeof(result) === 'object' || Object.getOwnPropertyDescriptor(value, name)?.set
    if(hasSetter) {
      continue
    }
    
    value[name] = result
  }
  
  return value
}

function getPropWrap(
  value: any,
  ownerSupport: TagSupport,
  stateArray: State,
  newTagSupport: TagSupport,
  name?: string | number,
  newProp?: any,
) {
  const toCall = value.toCall
    
  if(toCall) {
    return value // already previously converted
  }

  const wrap = (...args: any[]) => wrap.toCall(...args) // what gets called can switch over parent state changes
  // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
  wrap.toCall = (...args: any[]) => callbackPropOwner(value, args, ownerSupport, stateArray)
  wrap.original = value

  // copy data properties that maybe on source function
  Object.assign(wrap, value)

  if(name) {
    // restore object to have original function on destroy
    newTagSupport.global.destroy$.toCallback(() => newProp[name] = value)
  }

  return wrap
}

/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export function callbackPropOwner(
  toCall: Function,
  callWith: any,
  ownerSupport: TagSupport, // <-- WHEN called from alterProp its owner OTHERWISE its previous
  stateArray: State,
) {
  const newest = ownerSupport.global.newest as TagSupport
  const newState = newest.memory.state
  const noCycle = getSupportInCycle() === undefined
  const sync = noCycle && stateArray.length === newState.length
  
  if(sync) {
    syncStates(newState, stateArray)
  }
  
  const result = toCall(...callWith)

  if(sync) {
    syncStates(stateArray, newState)
  }
  
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
