import { BaseTagSupport, TagSupport } from './TagSupport.class'
import { runAfterRender, runBeforeRedraw, runBeforeRender } from './tagRunner'
import { setUse } from './state'
import { isLikeTags } from './isLikeTags.function'
import { destroyTagMemory } from './destroyTag.function'
import { TagSubject, WasTagSubject } from './subject.types'
import { Wrapper } from './TemplaterResult.class'

export function renderWithSupport(
  tagSupport: TagSupport, // new
  lastSupport: TagSupport | undefined, // previous
  subject: TagSubject, // events & memory
  ownerSupport?: TagSupport, // who to report to
): TagSupport {
  const oldRenderCount = tagSupport.global.renderCount

  beforeWithRender(tagSupport, ownerSupport, lastSupport)
  
  const templater = tagSupport.templater

  // NEW TAG CREATED HERE
  const wrapper = templater.wrapper as Wrapper
  const reSupport = wrapper(tagSupport, subject)
  /* AFTER */

  runAfterRender(tagSupport, reSupport)

  // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
  if(reSupport.global.renderCount > oldRenderCount + 1) {
    return tagSupport.global.newest as TagSupport
  }
  
  tagSupport.global.newest = reSupport

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    destroyUnlikeTags(
      lastSupport,
      reSupport,
      subject,
    )
  }

  const lastOwnerSupport = lastSupport?.ownerTagSupport
  reSupport.ownerTagSupport = (ownerSupport || lastOwnerSupport) as TagSupport

  return reSupport
}

function beforeWithRender(
  tagSupport: BaseTagSupport,
  ownerSupport?: TagSupport,
  lastSupport?: TagSupport,
) {
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
