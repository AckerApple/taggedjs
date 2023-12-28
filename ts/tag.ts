import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"
import { TagSupport } from "./getTagSupport.js"
import { isTagInstance } from "./isInstance.js"

export type Props = unknown

export type Wrapper = (() => Tag) & {
  original: () => Tag
}

export class TemplaterResult {
  props: Props
  newProps: Props
  cloneProps: Props
  tagged!: boolean
  wrapper!: Wrapper

  newest?: Tag
  oldest?: Tag
  redraw?: () => Tag | undefined
  isTemplater = true

  forceRenderTemplate(
    tagSupport: TagSupport,
    ownerTag: Tag,
  ) {
    const tag = this.wrapper()
    tag.tagSupport = tagSupport
    tag.afterRender()
    this.oldest = tag
    tagSupport.oldest = tag
    this.oldest = tag
    this.newest = tag
    tag.ownerTag = ownerTag
    return tag
  }

  renderWithSupport(
    tagSupport: TagSupport,
    runtimeOwnerTag: Tag,
    existingTag: Tag,
  ) {
    const templater = this
    const retag = templater.wrapper()
  
    retag.tagSupport = tagSupport
  
    if(tagSupport.oldest) {
      tagSupport.oldest.afterRender()
    } else {
      retag.afterRender()
    }
    
    templater.newest = retag
    retag.ownerTag = runtimeOwnerTag
  
    const oldest = tagSupport.oldest = tagSupport.oldest || retag
    tagSupport.newest = retag
  
    const oldestTagSupport = oldest.tagSupport
    oldest.tagSupport = oldestTagSupport || tagSupport
    oldest.tagSupport.templater = templater
  
    // retag.getTemplate() // cause lastTemplateString to render
    retag.setSupport(tagSupport)
    const isSameTag = existingTag && existingTag.isLikeTag(retag)
  
    // If previously was a tag and seems to be same tag, then just update current tag with new values
    if(isSameTag) {
      oldest.updateByTag(retag)
      return {remit: false, retag}
    }
  
    return {remit: true, retag}
  }
}

type TagResult = (
  props: Props, // props or children
  children?: Tag
) => Tag

export function tag<T>(
  tagComponent: T | TagResult
): T {
  const result = (function tagWrapper(
    props?: Props | Tag,
    children?: Tag
  ) {
    function callback(toCall: any, callWith: any) {
      const callbackResult = toCall(...callWith)
      templater.newest?.ownerTag?.tagSupport.render()
      return callbackResult
    }
    
    const isPropTag = isTagInstance(props)
    const watchProps = isPropTag ? 0 : props
    const newProps = resetFunctionProps(watchProps, callback)
    
    let argProps = newProps
    if(isPropTag) {
      children = props as Tag
      argProps = noPropsGiven
    }

    function innerTagWrap() {
      return (innerTagWrap.original as TagResult)(argProps, children)
    }

    innerTagWrap.original = tagComponent
    
    const templater: TemplaterResult = new TemplaterResult()
    templater.tagged = true
    templater.props = props // used to call function
    templater.newProps = newProps
    templater.cloneProps = deepClone( newProps )
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  }) as T // we override the function provided and pretend original is what's returned

  ;(result as any).isTag = true

  return result
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
