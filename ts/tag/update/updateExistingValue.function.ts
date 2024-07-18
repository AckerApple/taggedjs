import { TagSubject } from '../../subject.types.js'
import { BaseSupport, Support } from '../Support.class.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { isTagTemplater } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { TagArraySubject, processTagArray } from './processTagArray.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { processNewRegularValue, processUpdateRegularValue, RegularValue } from './processRegularValue.function.js'
import { checkDestroyPrevious } from '../checkDestroyPrevious.function.js'
import { getFakeTemplater, processTag, setupNewSupport } from './processTag.function.js'
import { StringTag, DomTag, ContextItem, Tag } from '../Tag.class.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from '../ValueTypes.enum.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'

const tagTypes = [ValueTypes.tagComponent, ValueTypes.stateRender]

export function updateExistingValue(
  subject: ContextItem, // InterpolateSubject,
  value: TemplateValue,
  ownerSupport: BaseSupport | Support,
): {subject: ContextItem, rendered: boolean} {
  const valueType = subject.global.nowValueType as ValueType | BasicTypes | ImmutableTypes
  const wasDestroyed = checkDestroyPrevious(
    subject, value, valueType
  )

  // handle already seen tag components
  const isStateTag = tagTypes.includes(valueType as ValueType)
  if(isStateTag) {
    return prepareUpdateToComponent(
      value as TemplaterResult,
      subject as TagSubject,
      ownerSupport,
    )
  }
  
  // was component but no longer
  const support = (subject as TagSubject).support
  if( support ) {
    const oneRender = [BasicTypes.function, ValueTypes.oneRender].includes(valueType as ValueType | BasicTypes)
    if(oneRender) {
      return {subject, rendered: false} // its a oneRender tag
    }

    handleStillTag(
      subject as TagSubject,
      value as TemplaterResult,
      ownerSupport
    )

    return {subject, rendered: true}
  }

  switch (valueType) {
    case ValueTypes.tagArray:
      processTagArray(
        subject as TagArraySubject,
        value as (TemplaterResult | StringTag)[],
        ownerSupport,
        {counts: {
          added: 0,
          removed: 0,
        }}
      )
      return {subject, rendered: true}

    case ValueTypes.templater:
      processTag(
        value as TemplaterResult,
        ownerSupport,
        subject as TagSubject,
      )
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
  
      processTag(
        templater,
        ownerSupport,
        subject as TagSubject,
      )

      return {subject, rendered: true}

    case BasicTypes.function:
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

  return {subject, rendered: true}
}

function handleStillTag(
  subject: TagSubject,
  value: StringTag | TemplateValue,
  ownerSupport: BaseSupport | Support,
) {
  const lastSupport = subject.support
  // StringTag || OtherTag
  const templater = (value as Tag).templater || value

  const valueSupport = new Support(
    templater as TemplaterResult,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )

  if(isTagTemplater(value)) {
    setupNewSupport(valueSupport, ownerSupport, subject)
  }

  lastSupport.subject.global.oldest.updateBy(valueSupport)
}

function prepareUpdateToComponent(
  templater: TemplaterResult,
  subjectTag: TagSubject,
  ownerSupport: BaseSupport | Support,
): {subject: TagSubject, rendered: boolean} {
  // When last value was not a component
  if(!subjectTag.support) {
    processReplacementComponent(
      templater,
      subjectTag,
      ownerSupport,
      {counts:{added:0, removed:0}},
      // subjectTag.global.placeholder?.parentNode as Element,
    )
   return {subject: subjectTag, rendered: true}
  }
  
  const support = new Support(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    subjectTag,
  )

  const subjectSup = subjectTag.support
  const prevSupport = subjectSup.subject.global.newest as Support
  const newestState = prevSupport.state
  support.state.length = 0
  support.state.push(...newestState)

  subjectTag.global = subjectSup.subject.global
  subjectTag.support = support

  return updateExistingTagComponent(
    ownerSupport,
    support, // latest value
    subjectTag,
  )
}
