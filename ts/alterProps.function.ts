import { Props } from './Props'
import { TagSupport } from './TagSupport.class'
import { isTag } from './isInstance'
import { renderTagSupport } from './renderTagSupport.function'
import { isInCycle, tagClosed$ } from './tagRunner'

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(
  props: Props,
  ownerSupport: TagSupport,
) {
  const isPropTag = isTag(props)
  const watchProps = isPropTag ? 0 : props
  const newProps = resetFunctionProps(watchProps, ownerSupport)

  return newProps
}

function resetFunctionProps(
  props: any,
  ownerSupport: TagSupport,
) {
  if(typeof(props)!=='object') {
    return props
  }

  const newProps = props
  // BELOW: Do not clone because if first argument is object, the memory ref back is lost
  // const newProps = {...props} 

  Object.entries(newProps).forEach(([name, value]) => {
    if(value instanceof Function) {
      const original = newProps[name].original
      
      if(original) {
        return // already previously converted
      }

      newProps[name] = (...args: any[]) => {
        return newProps[name].toCall(...args) // what gets called can switch over parent state changes
      }

      // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
      newProps[name].toCall = (...args: any[]) => {
        return callbackPropOwner(value, args, ownerSupport)
      }
      newProps[name].original = value

      return
    }
  })

  return newProps
}

export function callbackPropOwner(
  toCall: Function,
  callWith: any,
  ownerSupport: TagSupport,
) {
  const run = () => {
    const result = toCall(...callWith)
    
    const lastestOwner = ownerSupport.global.newest as TagSupport
    renderTagSupport(
      lastestOwner,
      true,
    )

    return result
  }

  if(!isInCycle()) {
    return run()
  }

  // if a tag is currently rendering, render after it otherwise render now
  // return tagClosed$.toPromise().then(run)
  return tagClosed$.toCallback(run)
}