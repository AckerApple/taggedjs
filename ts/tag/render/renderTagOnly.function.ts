import { Wrapper } from '../getTemplaterResult.function.js'
import { SupportContextItem } from '../createHtmlSupport.function.js'
import { executeWrap } from '../executeWrap.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { TagWrapper } from '../tag.utils.js'
import { runAfterRender } from '../afterRender.function.js'
import { initState, reState } from '../../state/state.utils.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../AnySupport.type.js'

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
    )
  } else {
    initState(newSupport, config)
  }
  
  const templater = newSupport.templater
  let reSupport: AnySupport

  // NEW TAG CREATED HERE
  if(templater.tagJsType === ValueTypes.stateRender) {
    const result = templater as any as TagWrapper<any> // .wrapper as any// || {original: templater} as any

    reSupport = createSupport(
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
