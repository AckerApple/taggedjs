import { Context, Tag } from './Tag.class'
import { BaseTagSupport, TagSupport } from './TagSupport.class'
import { runAfterRender, runBeforeRedraw, runBeforeRender } from './tagRunner'
import { setUse } from './state'
import { Props } from './Props'
import { TagChildren } from './tag'
import { Provider } from './state/providers'
import { OnDestroyCallback } from './state/onDestroy'
import { TagSubject, WasTagSubject } from './subject.types'
import { isLikeTags } from './isLikeTags.function'
import { destroyTagMemory } from './destroyTag.function'
import { OnInitCallback } from './state/onInit'
import { Subscription } from './subject/Subject.utils'
import { InsertBefore } from './Clones.type'

export type Wrapper = ((
  tagSupport: BaseTagSupport,
  subject: TagSubject,
) => TagSupport) & {
  original: () => Tag
}

export type TagGlobal = {
  oldest?: TagSupport
  newest?: TagSupport
  context: Context // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  providers: Provider[]
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
  deleted: boolean
  isApp?: boolean // root element
  
  // ALWAYS template tag
  insertBefore?: InsertBefore // what element put down before
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to


  subscriptions: Subscription<any>[] // subscriptions created by clones
  
  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  init?: OnInitCallback // what to run when init complete, used for onInit
}

export class TemplaterResult {
  isTemplater = true
  tagged!: boolean
  wrapper?: Wrapper
  
  tag?: Tag

  constructor(
    public props: Props,
    public children: TagChildren,
  ) {}  
}

export function renderWithSupport(
  tagSupport: BaseTagSupport, // new
  lastSupport: TagSupport | undefined, // previous
  subject: TagSubject, // events & memory
  ownerSupport?: TagSupport, // who to report to
): TagSupport {
  /* BEFORE RENDER */
    const lastOwnerSupport = lastSupport?.ownerTagSupport
    const runtimeOwnerSupport: TagSupport | undefined = lastOwnerSupport || ownerSupport

    if(lastSupport) {
      const lastState = lastSupport.memory.state
      const memory = tagSupport.memory
      memory.state = [...lastState]
      tagSupport.global = lastSupport.global

      runBeforeRedraw(tagSupport, lastSupport)
    } else {
      // first time render
      runBeforeRender(tagSupport, runtimeOwnerSupport)

      // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
      const providers = setUse.memory.providerConfig
      providers.ownerSupport = runtimeOwnerSupport
    }
  /* END: BEFORE RENDER */
  
  const templater = tagSupport.templater

  const subTag = subject.tagSupport

  // NEW TAG CREATED HERE
  const wrapper = templater.wrapper as Wrapper
  const reSupport = wrapper(tagSupport, subject)

  /* AFTER */

  runAfterRender(tagSupport, reSupport)

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    destroyUnlikeTags(
      lastSupport,
      reSupport,
      subject,
    )
  }

  reSupport.ownerTagSupport = (ownerSupport || lastOwnerSupport) as TagSupport
  tagSupport.global.newest = reSupport

  return reSupport
}

function destroyUnlikeTags(
  lastSupport: TagSupport, // old
  reSupport: TagSupport, // new
  subject: TagSubject,
) {
  const oldGlobal = lastSupport.global
  const insertBefore = oldGlobal.insertBefore as Element
  
  destroyTagMemory(lastSupport, subject)

  // when a tag is destroyed, disconnect the globals
  reSupport.global = {...oldGlobal} // break memory references
  const global = reSupport.global
  
  global.insertBefore = insertBefore
  global.deleted = false
  
  delete global.oldest
  delete global.newest
  delete (subject as WasTagSubject).tagSupport
}