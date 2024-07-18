import { InsertBefore } from './InsertBefore.type.js'
import { InterpolateSubject, TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js'
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js'
import { AnySupport } from '../tag/Support.class.js'
import { TemplaterResult } from '../tag/TemplaterResult.class.js'
import { Counts } from './interpolateTemplate.js'
import { paint } from '../tag/paint.function.js'
import { setUse } from '../state/setUse.function.js'
import { ContextItem } from '../tag/Tag.class.js'
import { getValueType } from '../tag/getValueType.function.js'

export type SubToTemplateOptions = {
  insertBefore: InsertBefore
  subject: InterpolateSubject
  support: AnySupport
  counts: Counts // used for animation stagger computing
  contextItem: ContextItem
  
  appendTo?: Element
}

export function subscribeToTemplate({
  subject,
  support,
  counts,
  contextItem,
  appendTo,
}: SubToTemplateOptions) {
  let onValue = function onSubValue(value: TemplateValue) {
    const templater = value as TemplaterResult
    const placeholder = subject.global?.placeholder as Text
    processFirstSubjectValue(
      templater,
      contextItem,
      support,
      {...counts},
      syncRun ? appendTo : undefined,
    )

    contextItem.global.lastValue = value

    if(!syncRun && !setUse.memory.stateConfig.support) {
      paint()
    }

    // from now on just run update
    onValue = (value: TemplateValue) => {
      if(value === contextItem.value) {
        return false // same value emitted
      }

      const valueType = getValueType(value)
      contextItem.global.nowValueType = valueType

      updateExistingValue(
        contextItem,
        value,
        support,
      )
      
      contextItem.global.lastValue = value

      if(!setUse.memory.stateConfig.support) {
        paint()
      }

      return
    }
  }
  
  const callback = (value: TemplateValue) => onValue(value)
  let syncRun = true
  const sub = subject.subscribe(callback as any)
  syncRun = false
  
  const global = support.subject.global
  const subs = global.subscriptions = global.subscriptions || []
  subs.push(sub)
}
