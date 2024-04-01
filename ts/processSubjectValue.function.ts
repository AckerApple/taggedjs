import { processSubjectComponent } from './processSubjectComponent.function'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { TagArraySubject, processTagArray } from './processTagArray'
import { TemplaterResult } from './TemplaterResult.class'
import { TagSupport } from './TagSupport.class'
import { Clones } from './Clones.type'
import { Tag } from './Tag.class'
import { Counts, Template } from './interpolateTemplate'
import { DisplaySubject, TagSubject } from './Tag.utils'
import { ValueSubject } from './ValueSubject'
import { processRegularValue } from './processRegularValue.function'
import { Callback } from './bindSubjectCallback.function'
import { Props } from './Props'

enum ValueTypes {
  tag = 'tag',
  tagArray = 'tag-array',
  tagComponent = 'tag-component',
  value = 'value',
}

function getValueType(value: any): ValueTypes {
  if(isTagComponent(value)) {
    return ValueTypes.tagComponent
  }

  if (isTagInstance(value)) {
    return ValueTypes.tag
  }

  if (isTagArray(value)) {
    return ValueTypes.tagArray
  }

  return ValueTypes.value
}

type processOptions = {
  forceElement?: boolean
  counts: Counts // used to count stagger
}

export type ClonesAndPromise = {
  clones: Clones
  // promise?: Promise<any>
}

export type InterpolateSubject = TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>

export function processSubjectValue(
  value: any,
  subject: InterpolateSubject, // could be tag via result.tag
  template: Element | Text | Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
  test = false
): Clones {
  const valueType = getValueType(value)
  
  switch (valueType) {
    case ValueTypes.tag:
      processTag(
        value,
        subject as TagSubject,
        template,
        ownerTag,
      )
      return []
  
    case ValueTypes.tagArray:
      return processTagArray(subject as TagArraySubject, value, template, ownerTag, options)
    
    case ValueTypes.tagComponent:
      processSubjectComponent(
        value,
        subject as TagSubject,
        template,
        ownerTag,
        options,
      )
      return []
  }

  return processRegularValue(
    value,
    subject as DisplaySubject,
    template,
  )
}

/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(
  tag: Tag,
  subject: TagSubject, // could be tag via result.tag
  insertBefore: Element | Text | Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag, // owner
) {
  // first time seeing this tag?
  if(!tag.tagSupport) {
    if(!isTagInstance(tag)) {
      throw new Error('issue non-tag here')
    }

    applyFakeTemplater(tag, ownerTag, subject)
    ownerTag.childTags.push(tag as Tag)
  }
  
  tag.ownerTag = ownerTag
  subject.template = insertBefore

  tag.buildBeforeElement(insertBefore, {
    counts: {added:0, removed:0},
    forceElement: true, test: false,
  })
}

export function applyFakeTemplater(
  tag: Tag,
  ownerTag: Tag,
  subject: TagSubject,
) {
  if(!ownerTag) {
    throw new Error('no owner error')
  }
  const fakeTemplater = getFakeTemplater()

  tag.tagSupport = new TagSupport(
    ownerTag.tagSupport,
    fakeTemplater, // the template is provided via html`` call
    subject,
  )

  fakeTemplater.global.oldest = tag
  fakeTemplater.global.newest = tag
  fakeTemplater.tagSupport = tag.tagSupport

  // asking me to render will cause my parent to render
  tag.ownerTag = ownerTag
}

function getFakeTemplater() {
  return {
    global:{
      providers: [],
      context: {},
    },
    children: new ValueSubject([]), // no children
    props: {} as Props,
    isTag: true,
  } as unknown as TemplaterResult
}