import { createHtmlSupport } from '../../tag/createHtmlSupport.function.js'
import { TemplaterResult } from '../../tag/getTemplaterResult.function.js'
import { checkTagValueChangeAndUpdate } from '../../tag/checkTagValueChange.function.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'
import type { StringTag } from '../../tag/StringTag.type.js'
import type { DomTag } from '../../tag/DomTag.type.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processTagInit } from '../../tag/update/processTagInit.function.js'
import { AnySupport } from '../../tag/index.js'
import { SupportContextItem } from '../../tag/SupportContextItem.type.js'
import { blankHandler } from '../dom/blankHandler.function.js'

/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(
  ownerSupport: AnySupport, // owner
  contextItem: SupportContextItem, // could be tag via result.tag
): AnySupport {
  const support = contextItem.state.newest as AnySupport
  const ph = contextItem.placeholder as Text
  
  support.ownerSupport = ownerSupport  
  
  buildBeforeElement(
    support,
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
    processInitAttribute: blankHandler,
    processInit: processTagInit,
    processUpdate: blankHandler,
    hasValueChanged: checkTagValueChangeAndUpdate,
    destroy: blankHandler,
    propWatch: 'shallow',
    key: blankHandler,
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

  subject.contexts = []

  return support
}
