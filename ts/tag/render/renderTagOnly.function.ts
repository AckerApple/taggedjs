import {SupportTagGlobal, Wrapper } from '../getTemplaterResult.function.js'
import { AnySupport, SupportContextItem } from '../getSupport.function.js'
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
  const prevState = prevSupport?.state
  const config = setUseMemory.stateConfig

  if(prevState) {
    reState(
      newSupport,
      prevSupport,
      setUseMemory.stateConfig,
      prevState,
      prevSupport.states,
    )
  } else {
    initState(newSupport, config)
  }
  
  const templater = newSupport.templater
  let reSupport: AnySupport

  // NEW TAG CREATED HERE
  if(templater.tagJsType === ValueTypes.stateRender) {
    const result = templater as any as TagWrapper<any> // .wrapper as any// || {original: templater} as any

    reSupport = getSupport(
      templater,
      ownerSupport as AnySupport,
      newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
      subject,
    )

    executeWrap(
      templater,
      result,
      reSupport,
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

  runAfterRender(reSupport, ownerSupport)

  return reSupport
}
