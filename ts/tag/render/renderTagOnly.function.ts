import {SupportTagGlobal, Wrapper } from '../TemplaterResult.class.js'
import { AnySupport, SupportContextItem } from '../Support.class.js'
import { executeWrap } from '../executeWrap.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { TagWrapper } from '../tag.utils.js'
import { runAfterRender } from '../afterRender.function.js'
import { initState, reState } from '../../state/state.utils.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { getSupport } from '../getSupport.function.js'

export function renderTagOnly(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined, // causes restate
  subject:SupportContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  const global = subject.global as SupportTagGlobal
  const oldRenderCount = subject.renderCount
  const prevState = prevSupport?.state
  const config = setUseMemory.stateConfig

  if(prevState) {
    const prevStates = prevSupport.states
    config.prevSupport = prevSupport
    reState(newSupport, setUseMemory.stateConfig, prevState, prevStates)
  } else {
    initState(newSupport, config)
  }
  
  const templater = newSupport.templater
  let reSupport: AnySupport

  // NEW TAG CREATED HERE
  if(templater.tagJsType === ValueTypes.stateRender) {
    const result = templater as any as TagWrapper<any> // .wrapper as any// || {original: templater} as any

    // TODO: Not sure if useSupport could be replaced by just using "newSupport"
    const useSupport = getSupport(
      templater,
      ownerSupport as AnySupport,
      newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
      subject,
    )

    reSupport = executeWrap(
      templater,
      result,
      useSupport,
    )

    reSupport.states = newSupport.states
  } else {
    // functions wrapped in tag()
    const wrapper = templater.wrapper as Wrapper

    // calls the function returned from getTagWrap()
    reSupport = wrapper(
      newSupport,
      subject,
      prevSupport,
    )

    reSupport.states = newSupport.states
  }

  runAfterRender(reSupport, ownerSupport)
  
  // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
  // TODO: below most likely not needed
  if(subject.renderCount > oldRenderCount + 1) {
    return global.newest as AnySupport
  }

  return reSupport
}
