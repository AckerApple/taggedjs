import { InterpolateSubject, TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js'
import { processSubUpdate } from './processSubscriptionUpdate.function.js'
import { Callback } from './attributes/bindSubjectCallback.function.js'
import { ValueSubjectSubscriber } from '../subject/ValueSubject.js'
import { TagGlobal } from '../tag/TemplaterResult.class.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { Subscription } from '../subject/subject.utils.js'
import { ContextItem } from '../tag/Context.types.js'
import { AnySupport } from '../tag/Support.class.js'
import { Counts } from './interpolateTemplate.js'
import { paint } from '../tag/paint.function.js'

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
  
  // onValue mutates so function below calls original and mutation
  const callback = function subValueProcessor(value: TemplateValue) {
    onValue(value)
  } as unknown as (ValueSubjectSubscriber<Callback> & ValueSubjectSubscriber<unknown>)
  
  let syncRun = true
  const sub = subject.subscribe(callback)
  contextItem.subject = subject
  syncRun = false
  
  const global = support.subject.global as TagGlobal
  const subs = global.subscriptions = global.subscriptions || []
  subs.push(sub as unknown as Subscription<unknown>)
}
