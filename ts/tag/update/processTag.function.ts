import { StringTag, DomTag, ContextItem } from '../Tag.class.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { afterChildrenBuilt } from './afterChildrenBuilt.function.js'
import { Props } from '../../Props.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { DomObjectChildren } from '../../interpolations/optimizers/ObjectNode.types.js'
import { paintAppends, painting } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'

/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates to values that were something else
*/
export function processTag(
  templater: TemplaterResult,
  ownerSupport: AnySupport, // owner
  subject: TagSubject, // could be tag via result.tag
): {support: Support} {
  let support = subject.support as any as Support

  const firstTime = !support || subject.global.renderCount === 0
  
  // first time seeing this tag?
  if( firstTime ) {
    support = newSupportByTemplater(templater, ownerSupport, subject)
  }

  subject.support = support
  support.ownerSupport = ownerSupport
  const appendIndex = paintAppends.length
  const result = support.buildBeforeElement({counts: {added:0, removed:0}})
  const ph = subject.global.placeholder as Text
  
  if(subject.global.deleted) {
    throw new Error('working with something deleted')
  }
  paintAppends.splice(appendIndex, 0, () => {
    const parentNode = ph.parentNode as ParentNode
    
    result.dom.forEach(dom => {
      if(dom.marker) {
        parentNode.insertBefore(dom.marker, ph)
      }
      if(dom.domElement) {
        parentNode.insertBefore(dom.domElement, ph)
      }
    })

    result.subs.forEach(sub => subscribeToTemplate(sub))

    afterChildrenBuilt(subject.global.htmlDomMeta as DomObjectChildren, subject, ownerSupport)
  })

  return {support}
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
    // children: new ValueSubject<StringTag[]>([]), // no children
    
    // props: {} as Props,
    props: [] as Props,
    
    isTag: true,
    tagJsType: ValueTypes.templater,
    tagged: false,
    html: () => fake,
    dom: () => fake,
    key: () => fake,
    type: 'fake-templater',
  } as TemplaterResult

  return fake
}

/** Create Support for a tag component */
export function newSupportByTemplater(
  templater: TemplaterResult,
  ownerSupport: BaseSupport | Support,
  subject: TagSubject,
) {
  const support = new Support(
    templater,
    ownerSupport,
    subject,
  )

  setupNewSupport(support, ownerSupport, subject)

  return support
}

export function setupNewSupport(
  support: Support,
  ownerSupport: BaseSupport | Support,
  subject: ContextItem,
) {
  support.subject = subject
  subject.support = support
  subject.global.oldest = support
  subject.global.newest = support

  // asking me to render will cause my parent to render
  support.ownerSupport = ownerSupport
}
