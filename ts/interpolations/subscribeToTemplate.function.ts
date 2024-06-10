import { InsertBefore } from './InsertBefore.type.js'
import { InterpolateSubject, TemplateValue } from '../tag/update/processFirstSubject.utils.js'
import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js'
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js'
import { Support } from '../tag/Support.class.js'
import { TemplaterResult } from '../tag/TemplaterResult.class.js'
import { Counts } from './interpolateTemplate.js'
import { swapInsertBefore } from '../tag/setTagPlaceholder.function.js'

export function subscribeToTemplate(
  fragment: DocumentFragment,
  insertBefore: InsertBefore,
  subject: InterpolateSubject,
  ownerSupport: Support,
  counts: Counts, // used for animation stagger computing
) {
  let called = false
  const onValue = (value: TemplateValue) => {
    if(called) {
      updateExistingValue(
        subject,
        value,
        ownerSupport,
        insertBefore, // needed incase type of value changed and a redraw required
      )
      return
    }

    const templater = value as TemplaterResult
    processFirstSubjectValue(
      templater,
      subject,
      insertBefore,
      ownerSupport,
      {
        counts: {...counts},
      },
      syncRun ? fragment : undefined,
    )

    called = true
  }

  // leave no template tag
  if(!subject.global.placeholder) {
    subject.global.placeholder = swapInsertBefore(insertBefore)
  }
  
  let mutatingCallback = onValue
  const callback = (value: TemplateValue) => mutatingCallback(value)
  let syncRun = true
  const sub = subject.subscribe(callback as any)
  syncRun = false
  
  ownerSupport.subject.global.subscriptions.push(sub)
}