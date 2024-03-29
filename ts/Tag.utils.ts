import { ValueSubject } from "./ValueSubject"
import { Subject } from "./Subject"
import { Tag } from "./Tag.class"
import { TemplaterResult, renderWithSupport } from "./TemplaterResult.class"
import { bindSubjectCallback } from "./bindSubjectCallback.function"
import { Template } from "./interpolateTemplate"

export type TagSubject = Subject<TemplaterResult> & {
  tag: Tag //  consider renaming to latestTag
  template: Element | Text | Template
}

type RegularValue = string | number | boolean
export type DisplaySubject = Subject<RegularValue> & {
  lastValue?: RegularValue
  clone?: Element | Text | Template
  template: Element | Text | Template
}

export function getSubjectFunction(
  value: any,
  tag: Tag,
) {
  return new ValueSubject( bindSubjectCallback(value, tag) )
}

/** for components */
export function redrawTag(
  subject: TagSubject,
  templater: TemplaterResult,
  ownerTag: Tag,
) {
  const existingTag = subject.tag || templater.global.newest || templater.global.oldest

  if(!templater.global.oldest) {
    throw new Error('issue before event redraw')
  }

  const tagSupport = templater.tagSupport // || existingTag?.tagSupport

  if(!templater.tagSupport) {
    throw new Error('need tag support')
  }

  if(!tagSupport.templater.global.oldest) {
    throw new Error('33333')
  }
  
  let {retag, remit} = renderWithSupport(
    tagSupport,
    existingTag,
    subject,
    ownerTag,
  )

  return retag
}