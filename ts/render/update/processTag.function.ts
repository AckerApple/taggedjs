import { createHtmlSupport, SupportContextItem } from '../../tag/createHtmlSupport.function.js'
import { SupportTagGlobal, TemplaterResult } from '../../tag/getTemplaterResult.function.js'
import { checkTagValueChange } from '../../tag/checkTagValueChange.function.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'
import type { StringTag } from '../../tag/StringTag.type.js'
import type { DomTag } from '../../tag/DomTag.type.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { ContextItem } from '../../tag/Context.types.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { processTagInit } from '../../tag/update/processTagInit.function.js'
import { AnySupport } from '../../tag/AnySupport.type.js'

/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(
  ownerSupport: AnySupport, // owner
  subject: SupportContextItem, // could be tag via result.tag
  counts: Counts,
): AnySupport {
  const global = subject.global as SupportTagGlobal
  const support = global.newest as AnySupport
  support.ownerSupport = ownerSupport
  subject.checkValueChange = checkTagValueChange
  
  const ph = subject.placeholder as Text
  buildBeforeElement(
    support,
    counts,
    undefined,
    ph,
  )

  return support
}

export function tagFakeTemplater(
  tag: StringTag | DomTag
) {
  const templater = getFakeTemplater()
  templater.tag = tag
  tag.templater = templater

  return templater
}

export function getFakeTemplater() {
  const fake = {
    tagJsType: ValueTypes.templater,
    processInit: processTagInit,
  } as TemplaterResult

  return fake
}

/** Create support for a tag component */
export function newSupportByTemplater(
  templater: TemplaterResult,
  ownerSupport: AnySupport,
  subject: ContextItem,
) {
  const support = createHtmlSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const global = subject.global as SupportTagGlobal
  global.context = []

  return support
}
