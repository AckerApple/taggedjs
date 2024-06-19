import { processSubjectComponent } from './processSubjectComponent.function.js'
import { TagArraySubject, processTagArray } from './processTagArray.js'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { InsertBefore } from '../../interpolations/InsertBefore.type.js'
import { DisplaySubject, TagSubject } from '../../subject.types.js'
import { RegularValue, processFirstRegularValue } from './processRegularValue.function.js'
import { processTag, tagFakeTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { Tag, Dom } from '../Tag.class.js'
import { InterpolateSubject, TemplateValue, processOptions } from './processFirstSubject.utils.js'
import { renderTagOnly } from '../render/renderTagOnly.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { oneRenderToSupport } from './oneRenderToSupport.function.js'
import { getValueType } from '../getValueType.function.js'

export function processFirstSubjectValue(
  value: TemplateValue | Tag,
  subject: InterpolateSubject, // could be tag via result.tag
  insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
  ownerSupport: AnySupport, // owner
  options: processOptions, // {added:0, removed:0}
  fragment?: DocumentFragment
) {
  const valueType = getValueType(value)
  
  switch (valueType) {
    case ValueTypes.templater:
      processTag(
        value as TemplaterResult,
        ownerSupport,
        subject as TagSubject,
        // fragment,
      )
      return

    case ValueTypes.dom:
    case ValueTypes.tag:
      const tag = value as Tag | Dom
      let templater = tag.templater

      if(!templater) {
        templater = tagFakeTemplater(tag)
      }

      processTag(
        templater,
        ownerSupport,
        subject as TagSubject,
        // fragment,
      )
      return
  
    case ValueTypes.tagArray:
      return processTagArray(
        subject as TagArraySubject,
        value as (Tag | TemplaterResult)[],
        insertBefore,
        ownerSupport,
        options,
        fragment,
      )
    
    case ValueTypes.tagComponent:
      const newSupport = processSubjectComponent(
        value as TemplaterResult,
        subject as TagSubject,
        insertBefore,
        ownerSupport,
        options,
        fragment,
      )
      return newSupport
    
    case ValueTypes.function:
      const v = value as Wrapper
      if((v as any).oneRender) {
        const support = oneRenderToSupport(
          v,
          subject as TagSubject,
          ownerSupport,
        )
        
        renderTagOnly(support, support, subject as TagSubject, ownerSupport)
        
        processTag(
          support.templater,
          ownerSupport,
          subject as TagSubject,
          // fragment,
        )
        return
      }
      break
  }

  processFirstRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    subject.global.placeholder || insertBefore,
  )
}