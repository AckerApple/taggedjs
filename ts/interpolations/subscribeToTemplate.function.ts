import { InterpolateSubject, TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js'
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js'
import { AnySupport } from '../tag/Support.class.js'
import { TagGlobal, TemplaterResult } from '../tag/TemplaterResult.class.js'
import { Counts } from './interpolateTemplate.js'
import { paint } from '../tag/paint.function.js'
import { setUseMemory } from '../state/setUse.function.js'
import { ContextItem } from '../tag/Tag.class.js'

export type SubToTemplateOptions = {
  insertBefore: Text
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

    processFirstSubjectValue(
      templater,
      contextItem,
      support,
      {...counts},
      syncRun ? appendTo : undefined,
    )

    if(!syncRun && !setUseMemory.stateConfig.support) {
      paint()
    }

    // from now on just run update
    onValue = function subscriptionUpdate(value: TemplateValue) {
      if(value === contextItem.value) {
        return false // same value emitted
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
  }
  
  const callback = function subValueProcessor(value: TemplateValue) {
    onValue(value)
  }
  
  let syncRun = true
  const sub = subject.subscribe(callback as any)
  syncRun = false
  
  const global = support.subject.global as TagGlobal
  const subs = global.subscriptions = global.subscriptions || []
  subs.push(sub)
}
