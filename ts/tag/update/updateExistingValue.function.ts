import { AnySupport, BaseSupport, getSupport, Support } from '../Support.class.js'
import { SupportTagGlobal, TagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { processTagArray } from './processTagArray.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { processNewRegularValue, processUpdateRegularValue, RegularValue } from './processRegularValue.function.js'
import { getFakeTemplater, newSupportByTemplater, processTag } from './processTag.function.js'
import { StringTag, DomTag, Tag } from '../Tag.class.js'
import { ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { ContextItem } from '../Context.types.js'

const tagTypes = [ValueTypes.tagComponent, ValueTypes.stateRender]

export function updateExistingValue(
  subject: ContextItem, // InterpolateSubject,
  value: TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  const wasDestroyed = subject.checkValueChange(value, subject)

  if(wasDestroyed === -1) {
    return // do nothing
  }

  // handle already seen tag components
  const tagJsType = value && (value as any).tagJsType as ValueType
  if(tagJsType) {
    const isStateTag = tagTypes.includes(tagJsType)
    if(isStateTag) {
      subject.global = subject.global || getNewGlobal()

      prepareUpdateToComponent(
        value as TemplaterResult,
        subject as ContextItem,
        ownerSupport,
      )

      return
    }

    if(tagJsType === ValueTypes.oneRender) {
      return
    }
  }
  
  const global2 = subject.global as SupportTagGlobal
  if(global2) {
    // was component but no longer
    const support = global2.newest
    if( support ) {
      if(value instanceof Function) {
        return
      }
  
      handleStillTag(
        support,
        subject as ContextItem,
        value as TemplaterResult,
        ownerSupport
      )
  
      const global0 = subject.global as TagGlobal
      if(!global0.locked) {
        ++global0.renderCount
      }
    
      return
    }
  }

  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater:
        processTag(
          ownerSupport,
          subject as ContextItem,
        )
        return
      
      case ValueTypes.tag:
      case ValueTypes.dom:
        const tag = value as StringTag | DomTag
        let templater = tag.templater

        if(!templater) {
          templater = getFakeTemplater()
          tag.templater = templater
          templater.tag = tag
        }
  
        const nowGlobal = subject.global = (subject.global || getNewGlobal()) as SupportTagGlobal
        nowGlobal.newest = newSupportByTemplater(templater, ownerSupport, subject)
    
        processTag(
          ownerSupport,
          subject,
        )
      
        return
    }
  }

  if(value instanceof Array) {
    processTagArray(
      subject,
      value as (TemplaterResult | StringTag)[],
      ownerSupport,
      {added: 0, removed: 0}
    )
  
    return
  }

  if(value instanceof Function) {
    subject.value = value
    return
  }
  // This will cause all other values to render
  if(wasDestroyed) {
    processNewRegularValue(
      value as RegularValue,
      subject,
    )
  } else {
    processUpdateRegularValue(
      value as RegularValue,
      subject,
    )
  }
}

function handleStillTag(
  lastSupport: AnySupport,
  subject: ContextItem,
  value: StringTag | TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  const templater = (value as Tag).templater || value

  const valueSupport = getSupport(
    templater as TemplaterResult,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  const lastSubject = lastSupport.subject as ContextItem
  const newGlobal = lastSubject.global as SupportTagGlobal
  const oldest = newGlobal.oldest
  updateSupportBy(oldest, valueSupport)
}

function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem: ContextItem,
  ownerSupport: BaseSupport | Support,
): void {
  const global = contextItem.global as SupportTagGlobal
  // When last value was not a component
  if(!global.newest) {
    processReplacementComponent(
      templater,
      contextItem,
      ownerSupport,
      {added:0, removed:0},
    )
    return
  }
  
  const support = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem,
  )

  updateExistingTagComponent(
    ownerSupport,
    support, // latest value
    contextItem,
  )
}
