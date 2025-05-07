import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import type { StringTag } from '../StringTag.type.js'
import type { Tag } from '../Tag.type.js'
import { ContextItem } from '../Context.types.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../AnySupport.type.js'

export function handleStillTag(
  lastSupport: AnySupport,
  subject: ContextItem,
  value: StringTag | TemplateValue,
  ownerSupport: AnySupport,
) {
  const templater = (value as Tag).templater || value

  const valueSupport = createSupport(
    templater as TemplaterResult,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const lastSubject = lastSupport.subject as ContextItem
  const newGlobal = lastSubject.global as SupportTagGlobal
  const oldest = newGlobal.oldest

  updateSupportBy(oldest, valueSupport)
}
