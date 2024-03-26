import { Context, Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { runAfterRender, runBeforeRedraw, runBeforeRender } from './tagRunner'
import { setUse } from './setUse.function'
import { Props } from './Props'
import { TagChildren } from './tag'
import { Provider } from './providers'
import { OnDestroyCallback } from './onDestroy'
import { TagSubject } from './Tag.utils'

export type Wrapper = ((
  tagSupport: BaseTagSupport,
  subject: TagSubject,
) => Tag) & {
  original: () => Tag
}

export class TemplaterResult {
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
  } = {
    newestTemplater: this,
    context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
  }

  tagSupport!: BaseTagSupport

  constructor(
    public props: Props,
    public children: TagChildren,
  ) {}

  redraw?: (
    force?: boolean, // force children to redraw
  ) => Tag
  isTemplater = true

}

export function renderWithSupport(
  tagSupport: BaseTagSupport,
  existingTag: Tag | undefined,
  subject: TagSubject,
  ownerTag?: Tag,
) {
  const wrapTagSupport = tagSupport // this.tagSupport
  // this.tagSupport = wrapTagSupport

  /* BEFORE RENDER */
    // signify to other operations that a rendering has occurred so they do not need to render again
    // ++wrapTagSupport.memory.renderCount

    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

    if(existingTag) {
      console.log('redrawing existing tag', {
        existingTag,
        org: existingTag.tagSupport.templater.wrapper.original,
        state: existingTag.tagSupport.memory.state.newest,

        wrapTagSupport: wrapTagSupport.templater.wrapper.original,
        wrapState: wrapTagSupport.memory.state.newest,
      })
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
  
  const retag = wrapTagSupport.templater.wrapper(wrapTagSupport, subject)

  /* AFTER */

  runAfterRender(wrapTagSupport, retag)

  retag.ownerTag = runtimeOwnerTag
  wrapTagSupport.templater.global.newest = retag
  subject.tag = retag
  
  if(wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
    throw new Error('56513540')
  }

  if(wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
    throw new Error('5555 - 10')
  }

  // new maybe not needed
  // this.oldest = this.oldest || retag
  // wrapTagSupport.oldest = wrapTagSupport.oldest || retag

  return {remit: true, retag}
}
