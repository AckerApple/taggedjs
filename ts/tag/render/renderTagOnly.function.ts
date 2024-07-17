import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { runBeforeRedraw, runBeforeRender } from'../tagRunner.js'
import { runAfterRender } from'../tagRunner.js'
import { TagSubject } from '../../subject.types.js'
import { Wrapper } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { executeWrap } from '../getTagWrap.function.js'
import { setUse } from '../../state/setUse.function.js'

export function renderTagOnly(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined,
  subject: TagSubject,
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
    const stateArray = setUse.memory.stateConfig.array
    const result = templater.wrapper || {original: templater} as any

    reSupport = executeWrap(
      templater,
      result,
      newSupport,
      subject,
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
    // ??? new removed
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
