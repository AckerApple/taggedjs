import { isTagComponent } from '../../isInstance.js'
import { AnySupport } from '../../tag/getSupport.function.js'

export function getSupportWithState(support: AnySupport) {
  // get actual component owner not just the html`` support
  let component = support as AnySupport
  while(component.ownerSupport && !isTagComponent(component.templater)) {
    component = component.ownerSupport as AnySupport
  }

  return component.subject.global.newest || component
}
