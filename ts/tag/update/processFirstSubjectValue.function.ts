import { processSubjectComponent } from './processSubjectComponent.function.js'
import { TagArraySubject, processTagArray } from './processTagArray.js'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { DisplaySubject, TagSubject } from '../../subject.types.js'
import { RegularValue, processFirstRegularValue } from './processRegularValue.function.js'
import { processTag, tagFakeTemplater } from './processTag.function.js'
import { TagSupport } from '../TagSupport.class.js'
import { Tag } from '../Tag.class.js'
import { InterpolateSubject, TemplateValue, processOptions } from './processFirstSubject.utils.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { oneRenderToTagSupport } from './oneRenderToTagSupport.function.js'
import { getValueType } from '../getValueType.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | Tag,
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
      const newSupport = processSubjectComponent(
        value as TemplaterResult,
        subject as TagSubject,
        insertBefore,
        ownerSupport,
        options,
      )
      return newSupport
    
    case ValueTypes.function:
      const v = value as Wrapper
      if((v as any).oneRender) {
        const tagSupport = oneRenderToTagSupport(
          v,
          subject as TagSubject,
          ownerSupport,
        )
        
        renderTagOnly(tagSupport, tagSupport, subject as TagSubject, ownerSupport)
        
        processTag(
          tagSupport.templater, insertBefore, ownerSupport, subject as TagSubject
        )
        return
      }
      break
  }

  processFirstRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    insertBefore,
  )
}
