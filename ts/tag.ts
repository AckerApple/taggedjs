import { deepClone } from "./deepFunctions.js"

/**
 * @template T
 * @param {T} tagComponent 
 * @returns {T}
 */
export function tag(
  tagComponent: (...args: any[]) => any
) {
  return (props: any) => {
    let asyncFunc = (param: unknown) => param
    
    const callback = (toCall: any, callWith: any) => {
      const callbackResult = toCall(...callWith)
      const ownerTag = templater.newest.ownerTag
      ownerTag.tagSupport.render()
      return callbackResult
    }
    
    const newProps = resetFunctionProps(props, callback)

    const templater = tagComponent( newProps )
    templater.props = props
    templater.newProps = newProps
    templater.cloneProps = deepClone( newProps )
    templater.setCallback = (x: any) => {
      return asyncFunc = x
    }
    return templater
  }
}

function resetFunctionProps(
  props: any,
  callback: any,
) {
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
