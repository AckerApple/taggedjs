import { AnySupport, BaseSupport, getSupport, Support } from '../Support.class.js'
import { runBeforeRedraw, runBeforeRender } from'../tagRunner.js'
import { runAfterRender } from'../tagRunner.js'
import { Wrapper } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { ContextItem } from '../Tag.class.js'
import { TagWrapper } from '../tag.utils.js'
import { executeWrap } from '../executeWrap.function.js'

export function renderTagOnly(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined,
  subject: ContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  const oldRenderCount = subject.global.renderCount

  beforeWithRender(
    newSupport,
    ownerSupport,
    prevSupport,
  )
  
  const templater = newSupport.templater
  let reSupport: AnySupport

  // NEW TAG CREATED HERE
  if(templater.tagJsType === ValueTypes.stateRender) {
    const result = templater as any as TagWrapper<any> // .wrapper as any// || {original: templater} as any

    const useSupport = getSupport(
      templater,
      ownerSupport as AnySupport,
      newSupport.appSupport, // ownerSupport.appSupport as Support,
      subject,
    )

    reSupport = executeWrap(
      templater,
      result,
      newSupport,
      subject,
      useSupport,
      prevSupport,
    )
  } else {
    // functions wrapped in tag()
    const wrapper = templater.wrapper as Wrapper
    reSupport = wrapper(
      newSupport,
      subject,
      prevSupport,
    )
  }

  /* AFTER */

  runAfterRender(newSupport, ownerSupport)
    
  subject.global.newest = reSupport

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
  const runtimeOwnerSupport: AnySupport | undefined = lastOwnerSupport || parentSupport

  if(prevSupport) {
    if(prevSupport !== support) {
      const lastState = prevSupport.state
      // ??? new removed
      // support.subject.global = prevSupport.subject.global
      support.state = lastState
    }

    return runBeforeRedraw(support, prevSupport)
  }

  // first time render
  return runBeforeRender(support, runtimeOwnerSupport)
}
