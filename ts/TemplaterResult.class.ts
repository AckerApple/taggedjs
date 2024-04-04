import { Context, Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { runAfterRender, runBeforeRedraw, runBeforeRender } from './tagRunner'
import { setUse } from './setUse.function'
import { Props } from './Props'
import { TagChildren } from './tag'
import { Provider } from './providers'
import { OnDestroyCallback } from './onDestroy'
import { TagSubject } from './Tag.utils'
import { isLikeTags } from './isLikeTags.function'
import { destroyTagMemory } from './destroyTag.function'

export type Wrapper = ((
  tagSupport: BaseTagSupport,
  subject: TagSubject,
) => Tag) & {
  original: () => Tag
}

export class TemplaterResult {
  isTag = false // when true, is basic tag non-component
  tagged!: boolean
  wrapper!: Wrapper

  global: {
    newestTemplater: TemplaterResult
    oldest?: Tag
    newest?: Tag
    context: Context // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: Provider[]
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number
    destroyCallback?: OnDestroyCallback  
    insertBefore?: Element | Text
    isApp?: boolean
    deleted: boolean
  } = {
    newestTemplater: this,
    context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
    deleted: false
  }

  tagSupport!: BaseTagSupport

  constructor(
    public props: Props,
    public children: TagChildren,
  ) {}

  /*
  redraw?: (
    force?: boolean, // force children to redraw
  ) => Tag
  */
  isTemplater = true
}

export function renderWithSupport(
  tagSupport: BaseTagSupport,
  existingTag: Tag | undefined,
  subject: TagSubject,
  ownerTag?: Tag,
): Tag {
  const wrapTagSupport = tagSupport // this.tagSupport
  // const wrapTagSupport = existingTag?.tagSupport.templater.global.newest?.tagSupport || tagSupport
  // this.tagSupport = wrapTagSupport

  /* BEFORE RENDER */
    // signify to other operations that a rendering has occurred so they do not need to render again
    // ++wrapTagSupport.memory.renderCount

    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

    if(existingTag) {
      // wrapTagSupport.templater.props = existingTag.tagSupport.templater.global.newest?.tagSupport.templater.props || wrapTagSupport.templater.props
      wrapTagSupport.memory.state.newest = [...existingTag.tagSupport.memory.state.newest]
      // ??? - new
      wrapTagSupport.templater.global = existingTag.tagSupport.templater.global
      
      runBeforeRedraw(wrapTagSupport, existingTag)
    } else {
      if(!wrapTagSupport) {
        throw new Error('63521')
      }
      // first time render
      runBeforeRender(wrapTagSupport, runtimeOwnerTag as Tag)

      // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
      const providers = setUse.memory.providerConfig
      providers.ownerTag = runtimeOwnerTag
    }
  /* END: BEFORE RENDER */
  
  const templater = wrapTagSupport.templater
  const retag = templater.wrapper(wrapTagSupport, subject)

  /* AFTER */

  runAfterRender(wrapTagSupport, retag)

  const isLikeTag = !existingTag || isLikeTags(existingTag, retag)
  if(!isLikeTag) {
    destroyTagMemory(existingTag, subject)

    delete templater.global.oldest
    delete templater.global.newest
    delete (subject as any).tag

    templater.global.insertBefore = existingTag.tagSupport.templater.global.insertBefore as Element    
  }

  retag.ownerTag = runtimeOwnerTag
  wrapTagSupport.templater.global.newest = retag
  
  if(wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
    throw new Error('56513540')
  }

  if(wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
    throw new Error('5555 - 10')
  }

  return retag
}
