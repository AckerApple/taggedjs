import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"
import { TagSupport } from "./getTagSupport.js"
import { isTagInstance } from "./isInstance.js"
import { runAfterRender, runBeforeRedraw, runBeforeRender } from "./tagRunner.js"
import { setUse } from "./setUse.function.js"
import { State } from "./state.js"

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
  redraw?: (
    force?: boolean, // force children to redraw
  ) => Tag | undefined
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
    existingTag: Tag | undefined,
    ownerTag?: Tag,
  ) {
    /* BEFORE RENDER */
      // signify to other operations that a rendering has occurred so they do not need to render again
      ++tagSupport.renderCount

      const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

      if(tagSupport.oldest) {
        tagSupport.oldest.beforeRedraw()
      } else {
        // first time render
        runBeforeRender(tagSupport, tagSupport.oldest)

        // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
        const providers = setUse.memory.providerConfig
        providers.ownerTag = runtimeOwnerTag
      }
    /* END: BEFORE RENDER */

    const templater = this
    const retag = templater.wrapper()

    /* AFTER */
    retag.tagSupport = tagSupport
  
   runAfterRender(tagSupport, retag)
  
    templater.newest = retag
    retag.ownerTag = runtimeOwnerTag
  
    const oldest = tagSupport.oldest = tagSupport.oldest || retag
    tagSupport.newest = retag
  
    const oldestTagSupport = oldest.tagSupport
    oldest.tagSupport = oldestTagSupport || tagSupport
    oldest.tagSupport.templater = templater
  
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

export interface TemplateRedraw extends TemplaterResult {
  redraw: () => Tag | undefined

  // TODO: This might be removable
  tagSupport?: TagSupport
}

export type TagComponent = (
  props: Props, // props or children
  children?: Tag
) => Tag

// type TagResultReady = TagResult & {isTag: true, original: TagResult}

export const tags: TagComponent[] = []

export function tag<T>(
  tagComponent: T | TagComponent
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
      const originalFunction = innerTagWrap.original as TagComponent
      return originalFunction(argProps, children)
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
  ;(result as any).original = tagComponent

  // group tags together and have hmr pickup
  ;(tagComponent as any).tags = tags
  ;(tagComponent as any).setUse = setUse
  tags.push(tagComponent as TagComponent)

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
