import { Wrapper } from '../tag/getTemplaterResult.function.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { executeWrap } from './executeWrap.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { TagWrapper } from '../tag/tag.utils.js'
import { runAfterRender } from './afterRender.function.js'
import { initState, reState } from '../state/state.utils.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { createSupport } from '../tag/createSupport.function.js'
import { AnySupport } from '../tag/AnySupport.type.js'

export function renderTagOnly(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined, // causes restate
  subject:SupportContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  runBeforeRender(newSupport, prevSupport)
  
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

  reSupport.ownerSupport = newSupport.ownerSupport// || lastOwnerSupport) as AnySupport

  return reSupport
}

function runBeforeRender(
  newSupport: AnySupport,
  prevSupport?: AnySupport,
) {
  const prevState = prevSupport?.state
  const config = setUseMemory.stateConfig

  if(prevState) {
    reState(
      newSupport,
      prevSupport,
      setUseMemory.stateConfig,
      prevState,
    )
    
    return
  }
  
  initState(newSupport, config)
}