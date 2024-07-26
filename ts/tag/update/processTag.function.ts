import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { AnySupport, BaseSupport, getSupport, Support } from '../Support.class.js'
import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'

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
  
  const result = buildBeforeElement(support, undefined, {counts: {added:0, removed:0}})
  const ph = subject.global.placeholder as Text

  for(const dom of result.dom) {
    if(dom.marker) {
      paintInsertBefores.push({
        element: dom.marker,
        relative: ph,
      })
    }

    if(dom.domElement) {
      paintInsertBefores.push({
        element: dom.domElement,
        relative: ph,
      })
    }
  }

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
  const support = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const global = subject.global as SupportTagGlobal
  global.context = []

  setupNewSupport(support, ownerSupport, subject)

  return support
}

export function setupNewSupport(
  support: Support,
  ownerSupport: BaseSupport | Support,
  subject: ContextItem,
) {
  support.subject = subject
  const global = subject.global as SupportTagGlobal
  global.oldest = support
  global.newest = support

  // asking me to render will cause my parent to render
  support.ownerSupport = ownerSupport
}

export function processNewTag(
  templater: TemplaterResult,
  ownerSupport: AnySupport, // owner
  subject: ContextItem, // could be tag via result.tag
  appendTo: Element,
): Support {
  const support = newSupportByTemplater(templater, ownerSupport, subject)

  support.ownerSupport = ownerSupport
  const result = buildBeforeElement(support, appendTo, {counts: {added:0, removed:0}})

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
