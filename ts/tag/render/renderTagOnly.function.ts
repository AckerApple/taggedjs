import { AnySupport, BaseSupport, getSupport, Support } from '../Support.class.js'
import { runAfterRender } from'../tagRunner.js'
import { SupportTagGlobal, Wrapper } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { ContextItem } from '../Context.types.js'
import { TagWrapper } from '../tag.utils.js'
import { executeWrap } from '../executeWrap.function.js'
import { initState, reState } from '../../state/state.utils.js'
import { setUseMemory } from '../../state/setUse.function.js'
import { State } from '../../state/state.types.js'

export function renderTagOnly(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined, // causes restate
  subject: ContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  const global = subject.global as SupportTagGlobal
  const oldRenderCount = global.renderCount

  beforeWithRender(newSupport, prevSupport?.state)
  
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
      useSupport,
    )
  } else {
    // functions wrapped in tag()
    const wrapper = templater.wrapper as Wrapper

    // calls the function returned from getTagWrap()
    reSupport = wrapper(
      newSupport,
      subject,
      prevSupport,
    )
  }

  /* AFTER */

  runAfterRender(newSupport, ownerSupport)
  
  global.newest = reSupport

  // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
  if(global.renderCount > oldRenderCount + 1) {
    return global.newest as Support
  }

  return reSupport
}

function beforeWithRender(
  support: BaseSupport | Support, // new
  prevState?: State,
) {

  if(prevState) {
    const lastState = prevState
    support.state = lastState

    reState(support, setUseMemory.stateConfig)
    return
  }

  // first time render
  initState(support, setUseMemory.stateConfig)
}
