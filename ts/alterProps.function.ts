import { TagSupport } from './tag/TagSupport.class'
import { deepClone, deepEqual } from './deepFunctions'
import { isTag } from './isInstance'
import { renderTagSupport } from './tag/render/renderTagSupport.function'
import { setUse } from './state'
import { getSupportInCycle } from './tag/getSupportInCycle.function'

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(
  props: unknown,
  ownerSupport: TagSupport,
) {
  const isPropTag = isTag(props)
  const watchProps = isPropTag ? 0 : props
  const newProps = resetFunctionProps(watchProps, ownerSupport)

  return newProps
}

function resetFunctionProps(
  newProps: any,
  ownerSupport: TagSupport,
) {
  if(typeof(newProps)!=='object' || !ownerSupport) {
    return newProps
  }

  // BELOW: Do not clone because if first argument is object, the memory ref back is lost
  // const newProps = {...props} 

  for(const name in newProps){
    const value = newProps[name]
    if(!(value instanceof Function)) {
      continue
    }

    const toCall = newProps[name].toCall
    
    if(toCall) {
      continue // already previously converted
    }

    newProps[name] = (...args: any[]) =>
      newProps[name].toCall(...args) // what gets called can switch over parent state changes

    // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
    newProps[name].toCall = (...args: any[]) =>
      callbackPropOwner(value, args, ownerSupport)

    newProps[name].original = value
  }

  return newProps
}

export function callbackPropOwner(
  toCall: Function,
  callWith: any,
  ownerSupport: TagSupport,
) {
  // const renderCount = ownerSupport.global.renderCount
  const cycle = getSupportInCycle()

  const result = toCall(...callWith)
  const run = () => {
    const lastestOwner = ownerSupport.global.newest as TagSupport

    if(cycle) {
      // appears a prop function was called sync/immediately so lets see if owner changed state
      const allMatched = lastestOwner.memory.state.every(state => {
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

    const newest = renderTagSupport(
      lastestOwner,
      true,
    )

    lastestOwner.global.newest = newest

    return result
  }

  if(!cycle) {
    return run()
  }
  
  setUse.memory.tagClosed$.toCallback(run)

  return result
}
