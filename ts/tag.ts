import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"

export type Props = unknown

export type Wrapper = () => Tag

export class TemplaterResult {
  props: Props
  newProps: Props
  cloneProps: Props
  tagged!: boolean
  wrapper!: Wrapper

  newest?: Tag
  oldest?: Tag
  redraw?: () => Tag | undefined
}

type TagResult = (
  props: Props, // props or children
  children?: Tag
) => Tag

export function tag<T>(
  tagComponent: T | TagResult
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

    const wrapper = () => (tagComponent as TagResult)(argProps, children)
    
    const templater: TemplaterResult = new TemplaterResult()
    templater.tagged = true
    templater.props = props // used to call function
    templater.newProps = newProps
    templater.cloneProps = deepClone( newProps )
    templater.wrapper = wrapper

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
