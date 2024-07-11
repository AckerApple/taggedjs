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

export type SubToTemplateOptions = {
  fragment: DocumentFragment | Element
  insertBefore: InsertBefore
  subject: InterpolateSubject
  support: AnySupport
  counts: Counts // used for animation stagger computing
  contextItem: ContextItem
}

export function subscribeToTemplate({
  fragment,
  subject,
  support,
  counts,
  contextItem,
}: SubToTemplateOptions) {
  let onValue = function onSubValue(value: TemplateValue) {
    const templater = value as TemplaterResult
    processFirstSubjectValue(
      templater,
      contextItem,
      support,
      {
        counts: {...counts},
      },
      syncRun ? fragment : undefined,
    )

    if(!syncRun && !setUse.memory.stateConfig.support) {
      paint()
    }

    // from now on just run update
    onValue = (value: TemplateValue) => {
      updateExistingValue(
        contextItem,
        value,
        support,
      )

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
  
  support.subject.global.subscriptions.push(sub)
}
