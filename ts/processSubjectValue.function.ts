import { processSubjectComponent } from './processSubjectComponent.function'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { TagArraySubject, processTagArray } from './processTagArray'
import { TemplaterResult, Wrapper } from './TemplaterResult.class'
import { Clones } from './Clones.type'
import { Tag } from './Tag.class'
import { Counts, Template } from './interpolateTemplate'
import { DisplaySubject, TagSubject } from './Tag.utils'
import { ValueSubject } from './subject/ValueSubject'
import { processRegularValue } from './processRegularValue.function'
import { Callback } from './bindSubjectCallback.function'
import { processTag } from './processTag.function'

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
  value: any | TemplaterResult,
  subject: InterpolateSubject, // could be tag via result.tag
  insertBefore: Element | Text | Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
) {
  const valueType = getValueType(value)
  
  switch (valueType) {
    case ValueTypes.tag:
      processTag(
        value,
        subject as TagSubject,
        insertBefore,
        ownerTag,
      )
      return
  
    case ValueTypes.tagArray:
      return processTagArray(
        subject as TagArraySubject,
        value,
        insertBefore,
        ownerTag,
        options
      )
    
    case ValueTypes.tagComponent:
      processSubjectComponent(
        value as TemplaterResult,
        subject as TagSubject,
        insertBefore,
        ownerTag,
        options,
      )
      return
  }

  processRegularValue(
    value,
    subject as DisplaySubject,
    insertBefore,
  )
}
