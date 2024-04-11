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
import { OnInitCallback } from './onInit'
import { Subscription } from './subject/Subject.utils'
import { InsertBefore, isRemoveTemplates } from './Clones.type'
import { restoreTagMarker } from './checkDestroyPrevious.function'

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
    deleted: boolean
    isApp?: boolean // root element
    
    // ALWAYS template tag
    insertBefore?: InsertBefore // what element put down before
    placeholderElm?: InsertBefore // when insertBefore is taken up, the last element becomes or understanding of where to redraw to


    subscriptions: Subscription[] // subscriptions created by clones
    
    destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
    init?: OnInitCallback // what to run when init complete, used for onInit
  } = {
    newestTemplater: this,
    context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
    deleted: false,
    subscriptions: []
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

  /* BEFORE RENDER */
    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag

    if(existingTag) {
      wrapTagSupport.memory.state.newest = [...existingTag.tagSupport.memory.state.newest]
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

  // NEW TAG CREATED HERE
  const retag = templater.wrapper(wrapTagSupport, subject)

  /* AFTER */

  runAfterRender(wrapTagSupport, retag)

  const isLikeTag = !existingTag || isLikeTags(existingTag, retag)
  if(!isLikeTag) {
    destroyUnlikeTags(existingTag, templater, subject)
  }

  retag.ownerTag = runtimeOwnerTag
  wrapTagSupport.templater.global.newest = retag

  return retag
}

function destroyUnlikeTags(
  existingTag: Tag, // old
  templater: TemplaterResult, // new
  subject: TagSubject,
) {
  const oldGlobal = existingTag.tagSupport.templater.global
  const insertBefore = oldGlobal.insertBefore as Element
  
  destroyTagMemory(existingTag, subject)

  // ??? - new so that when a tag is destroy the unlike does not carry the destroy signifier
  templater.global = {...templater.global} // break memory references
  const global = templater.global
  
  global.insertBefore = insertBefore
  global.deleted = false
  
  delete global.oldest
  delete global.newest
  delete subject.tag
}