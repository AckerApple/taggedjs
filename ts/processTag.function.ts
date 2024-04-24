import { InsertBefore } from './Clones.type'
import { Tag } from './Tag.class'
import { TagSubject } from './subject.types'
import { TagSupport } from './TagSupport.class'
import { TemplaterResult, Wrapper } from './TemplaterResult.class'
import { ValueSubject } from './subject'
import { Props } from './Props'

/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(
  templater: TemplaterResult,
  insertBefore: InsertBefore,
  ownerSupport: TagSupport, // owner
  subject: TagSubject, // could be tag via result.tag
) {
  let tagSupport: TagSupport = subject.tagSupport
  
  // first time seeing this tag?
  if(!tagSupport) {
    tagSupport = new TagSupport(
      templater,
      ownerSupport,
      subject,
    )
  
    setupNewTemplater(tagSupport, ownerSupport, subject)

    ownerSupport.childTags.push(tagSupport)
  }
  
  subject.tagSupport = tagSupport
  tagSupport.ownerTagSupport = ownerSupport

  tagSupport.buildBeforeElement(
    insertBefore, {
      counts: {added:0, removed:0},
      forceElement: true,
    }
  )
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

export function tagFakeTemplater(
  tag: Tag
) {
  const templater = getFakeTemplater()
  templater.tag = tag
  tag.templater = templater

  return templater
}

export function getFakeTemplater() {
  return  {
    children: new ValueSubject<Tag[]>([]), // no children
    props: {} as Props,
    
    isTag: true,
    isTemplater: false,
    tagged: false,
    // wrapper: (() => undefined) as unknown as Wrapper,
  } as TemplaterResult
}