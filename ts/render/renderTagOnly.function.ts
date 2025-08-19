import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { initState, reStateSupport } from '../state/state.utils.js'
import { AnySupport } from '../tag/index.js'
import { ContextStateSupport } from '../tag/ContextStateMeta.type.js'
import { callTag } from './callTag.function.js'
import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'

export function reRenderTag(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined, // causes restate
  context: SupportContextItem,
  ownerSupport?: AnySupport,
) {
  const stateMeta = context.state
  const prevState = (stateMeta.older as ContextStateSupport).state

  reStateSupport(
    newSupport,
    prevSupport as AnySupport,
    prevState,
  )

  return callTag(newSupport, prevSupport, context, ownerSupport)
}

/** Used during first renders of a support */
export function firstTagRender(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined, // causes restate
  context: SupportContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  initState(newSupport.context)

  setSupportInCycle(newSupport)

  return callTag(newSupport, prevSupport, context, ownerSupport)
}

export function getSupportOlderState(support?: AnySupport) {
  const context = support?.context as SupportContextItem
  const stateMeta = context?.state
  return stateMeta?.older?.state
}
