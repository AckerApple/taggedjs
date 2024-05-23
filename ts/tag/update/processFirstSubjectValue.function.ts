import { processSubjectComponent } from './processSubjectComponent.function'
import { TagArraySubject, processTagArray } from './processTagArray'
import { TemplaterResult } from '../../TemplaterResult.class'
import { InsertBefore } from '../../interpolations/Clones.type'
import { DisplaySubject, TagSubject } from '../../subject.types'
import { RegularValue, processFirstRegularValue } from './processRegularValue.function'
import { processTag, tagFakeTemplater } from './processTag.function'
import { TagSupport } from '../TagSupport.class'
import { Tag } from '../Tag.class'
import { InterpolateSubject, TemplateValue, ValueTypes, getValueType, processOptions } from './processFirstSubject.utils'

export function processFirstSubjectValue(
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

  processFirstRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    insertBefore,
  )
}
