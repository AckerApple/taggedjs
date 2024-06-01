import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { Tag } from '../Tag.class.js'
import { TagSubject } from '../../subject.types.js'
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { ValueSubject } from '../../subject/index.js'
import { Props } from '../../Props.js'

/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(
  templater: TemplaterResult,
  insertBefore: InsertBefore,
  ownerSupport: TagSupport, // owner
  subject: TagSubject, // could be tag via result.tag
) {
  let tagSupport = subject.tagSupport as any as TagSupport
  
  // first time seeing this tag?
  if(!tagSupport) {
    tagSupport = newTagSupportByTemplater(templater, ownerSupport, subject)
  }
  
  subject.tagSupport = tagSupport
  tagSupport.ownerTagSupport = ownerSupport
  tagSupport.buildBeforeElement(
    insertBefore, {
      counts: {added:0, removed:0},
    }
  )
}

export function tagFakeTemplater(
  tag: Tag
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
    madeChildIntoSubject: false, // TODO this can be removed
    html: () => fake
  } as TemplaterResult

  return fake
}

export function newTagSupportByTemplater(
  templater: TemplaterResult,
  ownerSupport: TagSupport,
  subject: TagSubject,
) {
  const tagSupport = new TagSupport(
    templater,
    ownerSupport,
    subject,
  )

  setupNewTemplater(tagSupport, ownerSupport, subject)

  ownerSupport.childTags.push(tagSupport)

  return tagSupport
}

export function setupNewTemplater(
  tagSupport: TagSupport,
  ownerSupport: TagSupport,
  subject: TagSubject,
) {
  tagSupport.global.oldest = tagSupport
  tagSupport.global.newest = tagSupport

  // asking me to render will cause my parent to render
  tagSupport.ownerTagSupport = ownerSupport
  subject.tagSupport = tagSupport
}
