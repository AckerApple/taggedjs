import { StringTag, DomTag } from '../Tag.class.js'
import { ContextItem } from '../Context.types.js'
import { AnySupport, BaseSupport, getHtmlSupport, Support } from '../Support.class.js'
import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'
import { checkTagValueChange } from '../checkDestroyPrevious.function.js'

/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
 * Intended use only for updates
*/
export function processTag(
  ownerSupport: AnySupport, // owner
  subject: ContextItem, // could be tag via result.tag
): Support {
  const global = subject.global as SupportTagGlobal
  const support = global.newest as Support
  support.ownerSupport = ownerSupport
  subject.checkValueChange = checkTagValueChange
  
  const ph = subject.placeholder as Text
  const result = buildBeforeElement(support, undefined, ph, {counts: {added:0, removed:0}})

  for(const sub of result.subs) {
    subscribeToTemplate(sub)
  }

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
  } as TemplaterResult

  return fake
}

/** Create Support for a tag component */
export function newSupportByTemplater(
  templater: TemplaterResult,
  ownerSupport: BaseSupport | Support,
  subject: ContextItem,
) {
  const support = getHtmlSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const global = subject.global as SupportTagGlobal
  global.context = []

  return support
}

export function processNewTag(
  templater: TemplaterResult,
  ownerSupport: AnySupport, // owner
  subject: ContextItem, // could be tag via result.tag
  appendTo: Element,
): Support {
  subject.checkValueChange = checkTagValueChange
  const support = newSupportByTemplater(templater, ownerSupport, subject)

  support.ownerSupport = ownerSupport
  const result = buildBeforeElement(support, appendTo, undefined, {counts: {added:0, removed:0}})

  for(const dom of result.dom) {
    if(dom.marker) {
      paintAppends.push({
        element: dom.marker,
        relative: appendTo, // ph.parentNode as Element,
      })
    }

    if(dom.domElement) {
      paintAppends.push({
        element: dom.domElement,
        relative: appendTo, // ph.parentNode as Element,
      })
    }
  }

  let index = -1
  const length = result.subs.length - 1
  //++painting.locks
  while(index++ < length) {
    const sub = result.subs[index]
    subscribeToTemplate(sub)
  }

  return support
}
