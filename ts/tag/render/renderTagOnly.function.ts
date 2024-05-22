import { BaseTagSupport, TagSupport } from '../TagSupport.class'
import { runBeforeRedraw, runBeforeRender } from '../tagRunner'
import { setUse } from '../../state'
import { runAfterRender } from '../tagRunner'
import { TagSubject } from '../../subject.types'
import { Wrapper } from '../../TemplaterResult.class'

export function renderTagOnly(
  newTagSupport: TagSupport,
  lastSupport: TagSupport | undefined,
  subject: TagSubject,
  ownerSupport?: TagSupport,
): TagSupport {
  const oldRenderCount = newTagSupport.global.renderCount

  beforeWithRender(newTagSupport, ownerSupport, lastSupport)
  
  const templater = newTagSupport.templater

  // NEW TAG CREATED HERE
  const wrapper = templater.wrapper as Wrapper
  let reSupport = wrapper(newTagSupport, subject)
  /* AFTER */

  runAfterRender(newTagSupport, ownerSupport)

  // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
  if(reSupport.global.renderCount > oldRenderCount + 1) {
    return newTagSupport.global.newest as TagSupport
  }
  
  newTagSupport.global.newest = reSupport

  return reSupport
}

function beforeWithRender(
  tagSupport: BaseTagSupport, // new
  ownerSupport?: TagSupport,
  lastSupport?: TagSupport,
) {
  const lastOwnerSupport = lastSupport?.ownerTagSupport
  const runtimeOwnerSupport: TagSupport | undefined = lastOwnerSupport || ownerSupport

  if(lastSupport) {
    const lastState = lastSupport.memory.state
    const memory = tagSupport.memory
    // memory.state.length = 0
    // memory.state.push(...lastState)
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