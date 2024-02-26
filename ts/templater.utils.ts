import { Tag } from "./Tag.class.js"
import { TagSupport } from "./TagSupport.class.js"
import { isTagInstance } from "./isInstance.js"
import { runAfterRender, runBeforeRedraw, runBeforeRender } from "./tagRunner.js"
import { setUse } from "./setUse.function.js"
import { Props } from "./Props.js"
import { ValueSubject } from "./ValueSubject.js"
import { TagChildren } from "./tag.js"

export type Wrapper = (() => Tag) & {
  original: () => Tag
}

export class TemplaterResult {
  tagged!: boolean
  wrapper!: Wrapper

  newest?: Tag
  oldest?: Tag

  tagSupport: TagSupport

  constructor(
    props: Props,
    children: TagChildren,
  ) {
    this.tagSupport = new TagSupport(this, children, props)
  }

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
    runAfterRender(tag.tagSupport, tag)
    
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
      ++tagSupport.memory.renderCount

      const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

      if(tagSupport.oldest) {
        // ensure props are the last ones used
        tagSupport.props = tagSupport.latestProps
        tagSupport.clonedProps = tagSupport.latestClonedProps
        // tagSupport.latestClonedProps = tagSupport.latestClonedProps
    
        runBeforeRedraw(tagSupport, tagSupport.oldest)
      } else {
        // first time render
        runBeforeRender(tagSupport, runtimeOwnerTag as Tag)

        // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
        const providers = setUse.memory.providerConfig
        providers.ownerTag = runtimeOwnerTag
      }
    /* END: BEFORE RENDER */

    const templater = this
    const retag = templater.wrapper()

    /* AFTER */
    tagSupport.latestProps = retag.tagSupport.props
    tagSupport.latestClonedProps = retag.tagSupport.clonedProps

    retag.tagSupport = tagSupport
  
    runAfterRender(tagSupport, retag)
  
    templater.newest = retag
    retag.ownerTag = runtimeOwnerTag
  
    const oldest = tagSupport.oldest = tagSupport.oldest || retag
    tagSupport.newest = retag
  
    const oldestTagSupport = oldest.tagSupport
    oldest.tagSupport = oldestTagSupport || tagSupport
    oldest.tagSupport.templater = templater
  
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
}

export type TagComponent = <T>(
  props?: T, // props or children
  children?: TagChildren,
) => Tag

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(
  props: Props,
  templater: TemplaterResult,
) {
  function callback(toCall: any, callWith: any) {
    const callbackResult = toCall(...callWith)

    const tagSupport = templater.newest?.ownerTag?.tagSupport

    if(tagSupport) {
      tagSupport.render()
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

  const newProps = {...props}

  Object.entries(newProps).forEach(([name, value]) => {
    if(value instanceof Function) {
      newProps[name] = (...args: any[]) => {
        return callback(value, args)
      }

      newProps[name].original = value

      return
    }

    newProps[name] = value
  })

  return newProps
}
