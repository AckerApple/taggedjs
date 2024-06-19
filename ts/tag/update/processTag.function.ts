import { afterElmBuild } from '../../interpolations/interpolateTemplate.js'
import { Tag, Dom } from '../Tag.class.js'
import { TagJsSubject } from './TagJsSubject.class.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { ValueSubject } from '../../subject/index.js'
import { Props } from '../../Props.js'

/** When first time render, adds to owner childTags */
export function processTag(
  templater: TemplaterResult,
  ownerSupport: AnySupport, // owner
  subject: TagSubject, // could be tag via result.tag
): Support {
  let support = subject.support as any as Support
  
  // first time seeing this tag?
  if(!support) {
    support = newSupportByTemplater(templater, ownerSupport, subject)
  }

  subject.support = support
  support.ownerSupport = ownerSupport
  const newFragment = support.buildBeforeElement(undefined, {counts: {added:0, removed:0}})
  const children = [...newFragment.children]
  const placeholder = subject.global.placeholder as Text
  const parentNode = placeholder.parentNode as ParentNode
  parentNode.insertBefore(newFragment, placeholder)

  afterChildrenBuilt(children, subject, ownerSupport)

  return support
}

export function tagFakeTemplater(
  tag: Tag | Dom
) {
  const templater = getFakeTemplater()
  templater.tag = tag
  tag.templater = templater

  return templater
}

export function getFakeTemplater() {
  const fake = {
    children: new ValueSubject<Tag[]>([]), // no children
    
    // props: {} as Props,
    props: [] as Props,
    
    isTag: true,
    tagJsType: 'templater',
    tagged: false,
    html: () => fake,
    dom: () => fake,
    key: () => fake,
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
  ownerSupport.subject.global.childTags.push(support)

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

export function afterChildrenBuilt(
  children: Element[],
  subject: TagJsSubject<any>,
  ownerSupport: AnySupport,
) {
  children.forEach(x => afterElmBuild(
    x,
    {counts: {added:0, removed:0}},
    subject.global.context,
    ownerSupport,
  ))
}
