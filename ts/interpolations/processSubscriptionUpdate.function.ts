import { TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { ContextItem } from '../tag/Context.types.js'
import { AnySupport } from '../tag/Support.class.js'
import { paint } from '../tag/paint.function.js'

export function processSubUpdate(
  value: TemplateValue,
  contextItem: ContextItem,
  support: AnySupport,
) {
  if(value === contextItem.value) {
    return // same value emitted
  }

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
