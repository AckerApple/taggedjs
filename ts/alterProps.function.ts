import { Props } from './Props'
import { Tag } from './Tag.class'
import { TagSupport } from './TagSupport.class'
import { TemplaterResult } from './TemplaterResult.class'
import { isTagInstance } from './isInstance'
import { renderTagSupport } from './renderTagSupport.function'

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(
  props: Props,
  templater: TemplaterResult,
  ownerSupport: TagSupport,
) {
  function callback(toCall: any, callWith: any) {
    const renderCount = templater.global.renderCount
    const callbackResult = toCall(...callWith)
    
    if(templater.global.renderCount > renderCount) {
      throw new Error('already rendered')
    }

    const lastestOwner = ownerSupport.templater.global.newest as Tag
    const newOwner = renderTagSupport(
      lastestOwner.tagSupport, // ??? newestOwner.tagSupport, // ??? ownerSupport,
      true,
    )

    if(newOwner.tagSupport.templater.global.newest != newOwner) {
      throw new Error('newest assignment issue?')
    }

    return callbackResult
  }
  
  const isPropTag = isTagInstance(props)
  const watchProps = isPropTag ? 0 : props
  const newProps = resetFunctionProps(watchProps, callback)

  return newProps
}

function resetFunctionProps(
  props: any,
  callback: (toCall: any, callWith: any) => unknown,
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
        return callback(value, args)
      }

      newProps[name].original = value

      return
    }
  })

  return newProps
}
