import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"

export type Props = unknown

export type TemplaterResult = {
  props: Props
  newProps: Props
  cloneProps: Props
  tagged: boolean
  setCallback: <T>(x: T) => T

  newest?: Tag
}

export function tag<T>(
  tagComponent: (
    props: Props | Tag, // props or children
    children?: Tag
  ) => TemplaterResult
): T {
  return ((props?: Props | Tag, children?: Tag) => {
    let asyncFunc = (param: Props) => param
    
    const callback = (toCall: any, callWith: any) => {
      const callbackResult = toCall(...callWith)
      templater.newest?.ownerTag?.tagSupport.render()
      return callbackResult
    }
    
    const isPropTag = props instanceof Tag
    const watchProps = isPropTag ? 0 : props
    const newProps = resetFunctionProps(watchProps, callback)
    const argProps = isPropTag ? props : newProps

    const templater = tagComponent(argProps, children)
    templater.tagged = true
    templater.props = props // used to call function
    templater.newProps = newProps
    templater.cloneProps = deepClone( newProps )
    templater.setCallback = (x: any) => {
      return asyncFunc = x
    }
    return templater
  }) as T // we override the function provided and pretend original is what's returned
}

function resetFunctionProps(
  props: any,
  callback: any,
) {
  if(typeof(props)!=='object') {
    return props
  }

  const newProps = {...props}

  Object.entries(newProps).forEach(([name, value]) => {
    if(value instanceof Function) {
      newProps[name] = (...args: any[]) => {
        return callback(value, args)
      }
      return
    }

    newProps[name] = value
  })

  return newProps
}
