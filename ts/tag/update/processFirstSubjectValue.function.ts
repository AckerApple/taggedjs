import { processSubjectComponent } from './processSubjectComponent.function'
import { TagArraySubject, processTagArray } from './processTagArray'
import { TemplaterResult, Wrapper } from '../../TemplaterResult.class'
import { InsertBefore } from '../../interpolations/Clones.type'
import { DisplaySubject, TagSubject } from '../../subject.types'
import { RegularValue, processFirstRegularValue } from './processRegularValue.function'
import { newTagSupportByTemplater, processTag, tagFakeTemplater } from './processTag.function'
import { TagSupport } from '../TagSupport.class'
import { Tag } from '../Tag.class'
import { InterpolateSubject, TemplateValue, ValueTypes, getValueType, processOptions } from './processFirstSubject.utils'
import { renderTagOnly } from '../render/renderTagOnly.function'

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
    
    case ValueTypes.function:
      const v = value as Wrapper
      if((v as any).oneRender) {
        const templater = new TemplaterResult([])
        templater.tagJsType = 'oneRender'
        const tagSupport = newTagSupportByTemplater(
          templater, ownerSupport, subject as TagSubject
        )

        let tag: Tag
        const wrap = () => {
          templater.tag = tag || ((v as any)())
          return tagSupport
        }
        // const wrap = () => ((v as any)())

        templater.wrapper = wrap as any
        wrap.parentWrap = wrap
        wrap.oneRender = true
        ;(wrap.parentWrap as any).original = v
        
        renderTagOnly(tagSupport, tagSupport, subject as TagSubject, ownerSupport)
        // call inner function
        // templater.tag = (v as any)() as Tag
        
        processTag(
          templater, insertBefore, ownerSupport, subject as TagSubject
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
