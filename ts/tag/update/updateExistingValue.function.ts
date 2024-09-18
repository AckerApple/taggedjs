import { AnySupport, BaseSupport, getSupport, Support, SupportContextItem } from '../Support.class.js'
import { getFakeTemplater, newSupportByTemplater, processTag } from './processTag.function.js'
import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { processNowRegularValue, RegularValue } from './processRegularValue.function.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { BasicTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { isArray, isTagComponent } from '../../isInstance.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { StringTag, DomTag, Tag } from '../Tag.class.js'
import { processTagArray } from './processTagArray.js'
import { ContextItem } from '../Context.types.js'

/** Used for all tag value updates. Determines if value changed since last render */
export function updateExistingValue(
  contextItem: ContextItem | SupportContextItem,
  value: TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  // Do not continue if the value is just the same
  if(value === contextItem.value) {
    return
  }

  const wasDestroyed = contextItem.checkValueChange(
    value, contextItem as SupportContextItem
  )

  if(wasDestroyed === -1) {
    return // do nothing
  }

  // handle already seen tag components
  const tagJsType = value && (value as TemplaterResult).tagJsType as ValueType
  if(tagJsType) {
    if(tagJsType === ValueTypes.renderOnce) {
      return
    }

    const isComp = isTagComponent(value)
    if(isComp) {
      if(!contextItem.global) {
        getNewGlobal(contextItem)
      }

      prepareUpdateToComponent(
        value as TemplaterResult,
        contextItem as SupportContextItem,
        ownerSupport,
      )

      return
    }
  }
  
  const global = contextItem.global as SupportTagGlobal
  if(global) {
    // its html/dom based tag
    const support = global.newest
    if( support ) {
      updateContextItemBySupport(
        support,
        contextItem as SupportContextItem,
        value as TemplaterResult,
        ownerSupport,
      )

      return
    }
  }

  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater:
        processTag(
          ownerSupport,
          contextItem,
        )
        return
      
      case ValueTypes.tag:
      case ValueTypes.dom: {
        const tag = value as StringTag | DomTag
        let templater = tag.templater

        if(!templater) {
          templater = getFakeTemplater()
          tag.templater = templater
          templater.tag = tag
        }
  
        const nowGlobal = (contextItem.global ? contextItem.global : getNewGlobal(contextItem)) as SupportTagGlobal
        nowGlobal.newest = newSupportByTemplater(templater, ownerSupport, contextItem)
    
        processTag(
          ownerSupport,
          contextItem,
        )
      
        return
      }
    }
  }

  if(isArray(value)) {
    processTagArray(
      contextItem,
      value as (TemplaterResult | StringTag)[],
      ownerSupport,
      {added: 0, removed: 0}
    )
  
    return
  }

  if(typeof(value) === BasicTypes.function) {
    contextItem.value = value // do not render functions that are not explicity defined as tag html processing
    return
  }
  
  if(wasDestroyed) {
    processNowRegularValue(
      value as RegularValue,
      contextItem,
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
  contextItem: SupportContextItem,
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

/** Used to destro */
function updateContextItemBySupport(
  support: AnySupport,
  contextItem: SupportContextItem,
  value: TemplaterResult,
  ownerSupport: AnySupport,
) {
  if(typeof(value) === BasicTypes.function) {
    return
  }

  handleStillTag(
    support,
    contextItem as ContextItem,
    value,
    ownerSupport,
  )

  return

}
