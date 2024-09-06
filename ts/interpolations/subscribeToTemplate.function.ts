import { InterpolateSubject, TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js'
import { TagGlobal } from '../tag/TemplaterResult.class.js'
import { setUseMemory } from '../state/setUse.function.js'
import { ContextItem } from '../tag/Context.types.js'
import { AnySupport } from '../tag/Support.class.js'
import { Counts } from './interpolateTemplate.js'
import { paint } from '../tag/paint.function.js'
import { processSubUpdate } from './processSubscriptionUpdate.function.js'

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
    processFirstSubjectValue(
      value,
      contextItem,
      support,
      {...counts},
      `rvp_-1_${support.templater.tag?.values.length}`,
      syncRun ? appendTo : undefined,
    )

    if(!syncRun && !setUseMemory.stateConfig.support) {
      paint()
    }

    // from now on just run update
    onValue = function subscriptionUpdate(value: TemplateValue) {
      processSubUpdate(value, contextItem, support)
    }
  }
  
  const callback = function subValueProcessor(value: TemplateValue) {
    onValue(value)
  }
  
  let syncRun = true
  const sub = subject.subscribe(callback as any)
  contextItem.subject = subject
  syncRun = false
  
  const global = support.subject.global as TagGlobal
  const subs = global.subscriptions = global.subscriptions || []
  subs.push(sub)
}
