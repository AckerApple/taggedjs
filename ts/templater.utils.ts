import { Tag } from './Tag.class'
import { TagSupport } from './TagSupport.class'
import { isTagInstance } from './isInstance'
import { runAfterRender, runBeforeRedraw, runBeforeRender } from './tagRunner'
import { setUse } from './setUse.function'
import { Props } from './Props'
import { TagChildren } from './tag'

export type Wrapper = ((tagSupport: TagSupport) => Tag) & {
  original: () => Tag
}

export class TemplaterResult {
  tagged!: boolean
  wrapper!: Wrapper
  insertBefore!: Element | Text
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

  renderWithSupport(
    tagSupport: TagSupport,
    existingTag: Tag | undefined,
    ownerTag?: Tag,
  ) {
    /* BEFORE RENDER */
      // signify to other operations that a rendering has occurred so they do not need to render again
      ++tagSupport.memory.renderCount

      const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

      // const insertBefore = tagSupport.templater.insertBefore

      if(existingTag) {
        tagSupport.propsConfig = {...existingTag.tagSupport.propsConfig}
        runBeforeRedraw(tagSupport, existingTag)
      } else {
        // first time render
        runBeforeRender(tagSupport, runtimeOwnerTag as Tag)

        // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
        const providers = setUse.memory.providerConfig
        providers.ownerTag = runtimeOwnerTag
      }
    /* END: BEFORE RENDER */

    const templater = this
    const retag = templater.wrapper(tagSupport)

    /* AFTER */

    runAfterRender(tagSupport, retag)
  
    templater.newest = retag
    retag.ownerTag = runtimeOwnerTag
    tagSupport.newest = retag
    
    return {remit: true, retag}
  }
}

export interface TemplateRedraw extends TemplaterResult {
  redraw: () => Tag | undefined
}

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(
  props: Props,
  templater: TemplaterResult,
) {
  function callback(toCall: any, callWith: any) {
    const callbackResult = toCall(...callWith)

    // const tag = templater.oldest as Tag
    const tag = templater.newest
    // const tagSupport = tag.tagSupport
    // const tagSupport = templater.tagSupport
    const tagSupport = tag?.ownerTag?.tagSupport as TagSupport
    tagSupport.render()

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
