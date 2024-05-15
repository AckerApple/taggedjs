import { processSubjectComponent } from './processSubjectComponent.function'
import { isTagArray, isTagClass, isTagComponent, isTagTemplater } from '../../isInstance'
import { TagArraySubject, processTagArray } from './processTagArray'
import { TemplaterResult } from '../../TemplaterResult.class'
import { Clones, InsertBefore } from '../../interpolations/Clones.type'
import { Counts, Template } from '../../interpolations/interpolateTemplate'
import { DisplaySubject, TagSubject } from '../../subject.types'
import { ValueSubject } from '../../subject/ValueSubject'
import { RegularValue, processRegularValue } from './processRegularValue.function'
import { Callback } from '../../interpolations/bindSubjectCallback.function'
import { getFakeTemplater, processTag, tagFakeTemplater } from './processTag.function'
import { TagSupport } from '../TagSupport.class'
import { Tag } from '../Tag.class'
import { Subject } from '../../subject'

enum ValueTypes {
  tag = 'tag',
  templater = 'templater',
  tagArray = 'tag-array',
  tagComponent = 'tag-component',
  value = 'value',
}

function getValueType(value: any): ValueTypes {
  if(isTagComponent(value)) {
    return ValueTypes.tagComponent
  }

  if (isTagTemplater(value)) {
    return ValueTypes.templater
  }

  if (isTagClass(value)) {
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

export type InterpolateSubject = (ValueSubject<undefined> | TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>) & {
  clone?: Element | Text | Template
}

// what can be put down with ${}
export type TemplateValue = Tag | TemplaterResult | (Tag | TemplaterResult)[] | RegularValue | Subject<any> | Callback
// export type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag

export function processSubjectValue(
  value: TemplateValue,
  subject: InterpolateSubject, // could be tag via result.tag
  insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
  ownerSupport: TagSupport, // owner
  options: processOptions, // {added:0, removed:0}
) {
  const valueType = getValueType(value)

  switch (valueType) {
    case ValueTypes.templater:
      processTag(
        value as TemplaterResult,
        insertBefore,
        ownerSupport,
        subject as TagSubject,
      )
      return

    case ValueTypes.tag:
      const tag = value as Tag
      let templater = tag.templater

      if(!templater) {
        templater = tagFakeTemplater(tag)
      }

      processTag(
        templater,
        insertBefore,
        ownerSupport,
        subject as TagSubject,
      )
      return
  
    case ValueTypes.tagArray:
      return processTagArray(
        subject as TagArraySubject,
        value as (Tag | TemplaterResult)[],
        insertBefore,
        ownerSupport,
        options
      )
    
    case ValueTypes.tagComponent:
      processSubjectComponent(
        value as TemplaterResult,
        subject as TagSubject,
        insertBefore,
        ownerSupport,
        options,
      )
      return
  }

  processRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    insertBefore,
  )
}
