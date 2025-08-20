import { isTagComponent } from '../../isInstance.js'
import { AnySupport, ContextItem } from '../../tag/index.js'

export function findStateSupportUpContext(context: ContextItem) {
  const stateMeta = context.state
  if(stateMeta && stateMeta.newest && stateMeta.newest) {
    return stateMeta.newest
  }

  if(context.parentContext) {
    return findStateSupportUpContext(context.parentContext)
  }
}

export function getSupportWithState(support: AnySupport) {
  // get actual component owner not just the html`` support
  let component = support as AnySupport
  while(component.ownerSupport && !isTagComponent(component.templater)) {
    component = component.ownerSupport as AnySupport
  }

  const stateMeta = component.context.state
  return stateMeta.newest || component
}
