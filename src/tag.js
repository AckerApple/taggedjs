import { deepClone } from "./deepFunctions.js"

/**
 * @template T
 * @param {T} tagComponent 
 * @returns {T}
 */
export function tag(tagComponent) {
  return (props) => {
    let asyncFunc = param => param
    
    const callback = (toCall, callWith) => {
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
    templater.setCallback = x => {
      return asyncFunc = x
    }
    return templater
  }
}

function resetFunctionProps(props, callback) {
  const newProps = {...props}

  Object.entries(newProps).forEach(([name, value]) => {
    if(value instanceof Function) {
      newProps[name] = (...args) => {
        return callback(value,args)
      }
      return
    }

    newProps[name] = value
  })

  return newProps
}
