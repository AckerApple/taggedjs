import { TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { ContextItem } from '../tag/Context.types.js'
import { AnySupport } from '../tag/getSupport.function.js'
import { paint } from '../tag/paint.function.js'

/** Used for values that are to subscribe to */
export function processSubUpdate(
  value: TemplateValue, // Observable | Subject
  contextItem: ContextItem,
  support: AnySupport,
) {
  const global = support.subject.global
  if(global.deleted) {
    return // same value emitted
  }

  // checks if same value
  updateExistingValue(
    contextItem,
    value,
    support,
  )

  if(!setUseMemory.stateConfig.support) {
    paint()
  }

  return
}
