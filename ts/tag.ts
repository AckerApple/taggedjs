import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"

export type Props = unknown

export type TemplaterResult = {
  props: Props
  newProps: Props
  cloneProps: Props
  tagged: boolean

  newest?: Tag
}

export function tag<T>(
  tagComponent: (
    props: Props | Tag, // props or children
    children?: Tag
  ) => TemplaterResult
): T {
  return ((props?: Props | Tag, children?: Tag) => {    
    const callback = (toCall: any, callWith: any) => {
      const callbackResult = toCall(...callWith)
      templater.newest?.ownerTag?.tagSupport.render()
      return callbackResult
    }
    
    const isPropTag = props instanceof Tag
    const watchProps = isPropTag ? 0 : props
    const newProps = resetFunctionProps(watchProps, callback)
    
    let argProps = newProps
    if(isPropTag) {
      children = props
      argProps = noPropsGiven
    }

    const templater = tagComponent(argProps, children)
    templater.tagged = true
    templater.props = props // used to call function
    templater.newProps = newProps
    templater.cloneProps = deepClone( newProps )
    return templater
  }) as T // we override the function provided and pretend original is what's returned
}

class NoPropsGiven {}
const noPropsGiven = new NoPropsGiven()

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
