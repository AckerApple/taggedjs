import { BaseSupport, Support } from '../Support.class.js'
import { runBeforeRedraw, runBeforeRender } from'../tagRunner.js'
import { runAfterRender } from'../tagRunner.js'
import { TagSubject } from '../../subject.types.js'
import { Wrapper } from '../TemplaterResult.class.js'

export function renderTagOnly(
  newSupport: Support | BaseSupport,
  prevSupport: Support | BaseSupport | undefined,
  subject: TagSubject,
  ownerSupport?: Support | BaseSupport,
): Support {
  const oldRenderCount = subject.global.renderCount

  beforeWithRender(newSupport, ownerSupport, prevSupport)
  
  const templater = newSupport.templater

  // NEW TAG CREATED HERE
  const wrapper = templater.wrapper as Wrapper
  let reSupport = wrapper(newSupport, subject)
  /* AFTER */

  runAfterRender(newSupport, ownerSupport)
    
  subject.global.newest = reSupport
  if(!prevSupport && ownerSupport) {
    ownerSupport.subject.global.childTags.push(reSupport)
  }

  // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
  if(subject.global.renderCount > oldRenderCount + 1) {
    return subject.global.newest as Support
  }

  return reSupport
}

function beforeWithRender(
  support: BaseSupport | Support, // new
  parentSupport?: Support | BaseSupport,
  prevSupport?: Support | BaseSupport,
) {
  const lastOwnerSupport = (prevSupport as Support)?.ownerSupport
  const runtimeOwnerSupport: Support | undefined = lastOwnerSupport || parentSupport

  if(prevSupport) {
    if(prevSupport !== support) {
      const lastState = prevSupport.state
      support.subject.global = prevSupport.subject.global
      support.state.length = 0
      support.state.push(...lastState)
    }

    return runBeforeRedraw(support, prevSupport)
  }

  // first time render
  return runBeforeRender(support, runtimeOwnerSupport)
}
