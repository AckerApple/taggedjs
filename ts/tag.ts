import { Tag } from "./Tag.class.js"
import { isTagInstance } from "./isInstance.js"
import { setUse } from "./setUse.function.js"
import { Props } from "./Props.js"
import { TagComponent, TemplaterResult, Wrapper, getNewProps } from "./templater.utils.js"

export const tags: TagComponent[] = []

let tagCount = 0

export type TagEnv = {
  // parentNode: HTMLElement | Element
  /*app: {
    // tag: TagComponent, // (...args: unknown[]) => TemplaterResult,
    element: HTMLElement | Element,  
  }*/
  children?: Tag
}

export function tag<T>(
  tagComponent: T | TagComponent
): T {
  const result = (function tagWrapper(
    props: Props | Tag | undefined,
    children?: Tag
  ) {
    const isPropTag = isTagInstance(props)
    const templater: TemplaterResult = new TemplaterResult(props)
    const newProps = getNewProps(props, templater)
    
    let argProps = newProps
    if(isPropTag) {
      children = props as Tag
      argProps = noPropsGiven
    }

    function innerTagWrap() {
      const originalFunction = innerTagWrap.original as TagComponent
      const props = templater.tagSupport.props // argProps
      const tag = originalFunction(props, children)
      tag.setSupport( templater.tagSupport )
      return tag
    }

    innerTagWrap.original = tagComponent
    
    
    templater.tagged = true    
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  }) as T // we override the function provided and pretend original is what's returned

  updateResult(result, tagComponent as TagComponent)

  // group tags together and have hmr pickup
  updateComponent(tagComponent)
  tags.push(tagComponent as TagComponent)

  return result
}

function updateResult(
  result: any,
  tagComponent: TagComponent
) {
  result.isTag = true
  result.original = tagComponent
}

function updateComponent(
  tagComponent: any
) {
  tagComponent.tags = tags
  tagComponent.setUse = setUse
  tagComponent.tagIndex = ++tagCount
}
class NoPropsGiven {}
const noPropsGiven = new NoPropsGiven()
