import { StringTag, DomTag } from '../Tag.class.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { ValueSubject } from '../../subject/index.js'
import { afterChildrenBuilt } from './afterChildrenBuilt.function.js'
import { Props } from '../../Props.js'
import { ValueTypes } from '../ValueTypes.enum.js'

/** When first time render, adds to owner childTags
 * Used for BOTH inserts & updates
*/
export function processTag(
  templater: TemplaterResult,
  ownerSupport: AnySupport, // owner
  subject: TagSubject, // could be tag via result.tag
): {support: Support, fragment: DocumentFragment} {
  let support = subject.support as any as Support
  const firstTime = support ? false : true
  
  // first time seeing this tag?
  if( firstTime ) {
    support = newSupportByTemplater(templater, ownerSupport, subject)
  }

  subject.support = support
  support.ownerSupport = ownerSupport
  const fragment = support.buildBeforeElement(undefined, {counts: {added:0, removed:0}})
  const children = fragment.children
  const placeholder = subject.global.placeholder as Text
  const parentNode = placeholder.parentNode as ParentNode
  parentNode.insertBefore(fragment, placeholder)

  if( firstTime ) {
    afterChildrenBuilt(children, subject, ownerSupport)
  }

  return {support, fragment}
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
    children: new ValueSubject<StringTag[]>([]), // no children
    
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
  subject: TagSubject,
) {
  support.subject = subject
  subject.global.oldest = support
  subject.global.newest = support

  // asking me to render will cause my parent to render
  support.ownerSupport = ownerSupport
}
