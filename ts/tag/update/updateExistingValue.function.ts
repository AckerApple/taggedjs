import { AnySupport, BaseSupport, getSupport, Support } from '../Support.class.js'
import { SupportTagGlobal, TagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { isTagTemplater } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { processTagArray } from './processTagArray.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { processNewRegularValue, processUpdateRegularValue, RegularValue } from './processRegularValue.function.js'
import { checkDestroyPrevious } from '../checkDestroyPrevious.function.js'
import { getFakeTemplater, newSupportByTemplater, processTag, setupNewSupport } from './processTag.function.js'
import { StringTag, DomTag, ContextItem, Tag } from '../Tag.class.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { updateSupportBy } from '../updateSupportBy.function.js'

const tagTypes = [ValueTypes.tagComponent, ValueTypes.stateRender]

export function updateExistingValue(
  subject: ContextItem, // InterpolateSubject,
  value: TemplateValue,
  ownerSupport: BaseSupport | Support,
): {subject: ContextItem, rendered: boolean} {
  const global = subject.global as SupportTagGlobal
  const wasDestroyed = checkDestroyPrevious(subject, value)

  // handle already seen tag components
  const tagJsType = value && (value as any).tagJsType as ValueType
  if(tagJsType) {
    const isStateTag = tagTypes.includes(tagJsType)
    if(isStateTag) {
      return prepareUpdateToComponent(
        value as TemplaterResult,
        subject as ContextItem,
        ownerSupport,
      )
    }

    if(tagJsType === ValueTypes.oneRender) {
      return {subject, rendered: false} // its a oneRender tag
    }
  }
  
  // was component but no longer
  const global2 = subject.global as SupportTagGlobal
  const support = global2.newest
  if( support ) {
    if(value instanceof Function) {
      return {subject, rendered: false} // its a oneRender tag
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
  
    return {subject, rendered: true}
  }

  if(tagJsType) {
    switch (tagJsType) {
      case ValueTypes.templater:
        processTag(
          ownerSupport,
          subject as ContextItem,
        )
  
        const global2 = subject.global as TagGlobal
        if(!global2.locked) {
          ++global2.renderCount
        }
      
        return {subject, rendered: true}
      
      case ValueTypes.tag:
      case ValueTypes.dom:
        const tag = value as StringTag | DomTag
        let templater = tag.templater
    
        if(!templater) {
          templater = getFakeTemplater()
          tag.templater = templater
          templater.tag = tag
        }
  
        global.newest = newSupportByTemplater(templater, ownerSupport, subject)
    
        processTag(
          ownerSupport,
          subject,
        )
  
        if(!global.locked) {
          ++global.renderCount
        }
      
        return {subject, rendered: true}  
    }
  }

  if(value instanceof Array) {
    processTagArray(
      subject,
      value as (TemplaterResult | StringTag)[],
      ownerSupport,
      {added: 0, removed: 0}
    )

    const global1 = subject.global as TagGlobal
    if(!global1.locked) {
      ++global1.renderCount
    }
  
    return {subject, rendered: true}
  }

  if(value instanceof Function) {
    subject.value = value
    return {subject, rendered: false}
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

  const global3 = subject.global as TagGlobal
  if(global3.locked) {
    ++global3.renderCount
  }

  return {subject, rendered: true}
}

function handleStillTag(
  lastSupport: AnySupport,
  subject: ContextItem,
  value: StringTag | TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  const global = subject.global as SupportTagGlobal
  // const lastSupport = global.newest
  const templater = (value as Tag).templater || value

  const valueSupport = getSupport(
    templater as TemplaterResult,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  if(isTagTemplater(value)) {
    setupNewSupport(valueSupport, ownerSupport, subject)
  }

  /*
  if(!lastSupport) {
    console.log('lastSupport.subject', {lastSupport, global, value, support})
    throw new Error('something here')
  }
  */
  const lastSubject = lastSupport.subject as ContextItem
  const newGlobal = lastSubject.global as SupportTagGlobal
  const oldest = newGlobal.oldest
  if(!oldest) {
    console.log('noooooo oldest', {newGlobal, lastSubject, lastSupport})
  }
  if(oldest) {
    updateSupportBy(oldest, valueSupport)
  }
}

function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem: ContextItem,
  ownerSupport: BaseSupport | Support,
): {subject: ContextItem, rendered: boolean} {
  const global = contextItem.global as SupportTagGlobal
  // When last value was not a component
  if(!global.newest) {
    processReplacementComponent(
      templater,
      contextItem,
      ownerSupport,
      {added:0, removed:0},
    )
   return {subject: contextItem, rendered: true}
  }
  
  const support = getSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem,
  )

  return updateExistingTagComponent(
    ownerSupport,
    support, // latest value
    contextItem,
  )
}
