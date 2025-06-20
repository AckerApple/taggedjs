import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { updateSupportBy } from '../../render/update/updateSupportBy.function.js'
import type { Tag } from '../Tag.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'

export function handleStillTag(
  oldSupport: AnySupport,
  subject: ContextItem,
  value: Tag | TemplateValue,
  ownerSupport: AnySupport,
) {
  // Value is result of either tag(() => html``) or () => html``
  let templater = (value as Tag).templater || value

  const oldTtag = oldSupport.templater.tag
  if(oldTtag) {
    const innerHTML = oldTtag._innerHTML
    if(innerHTML) {
      // Value has innerHTML that is either tag() or html``
      templater = (value as Tag).outerHTML || ((value as Tag)._innerHTML as Tag).outerHTML as Tag
    }
  }

  const valueSupport = createSupport(
    templater as TemplaterResult,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const lastSubject = oldSupport.subject as ContextItem
  const newGlobal = lastSubject.global as SupportTagGlobal
  const oldest = newGlobal.oldest

  updateSupportBy(oldest, valueSupport)
}
