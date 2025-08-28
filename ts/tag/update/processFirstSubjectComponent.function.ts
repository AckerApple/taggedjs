import { TemplaterResult } from '../getTemplaterResult.function.js'
import { processFirstTagResult } from'./processTagResult.function.js'
import { PropsConfig } from '../createHtmlSupport.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getCastedProps } from '../getTagWrap.function.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport, ContextItem } from '../index.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { firstTagRender } from '../../render/renderTagOnly.function.js'
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'
import { Subject, TemplateValue } from '../../index.js'
import { ReadOnlyVar, TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'

function createSupportWithProps(
  templater: TemplaterResult,
  subject: SupportContextItem,
  ownerSupport: AnySupport,
): AnySupport {
  const newSupport = createSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    subject,
  )
  
  const newPropsConfig = newSupport.propsConfig as PropsConfig
  if(newPropsConfig) {
    const castedProps = templater.tagJsType !== ValueTypes.tagComponent ? [] : getCastedProps(
      templater,
      newSupport,
    )
  
    newPropsConfig.castProps = castedProps
  }
    
  const support = firstTagRender(
    newSupport,
    subject.state.newest, // existing tag
    subject,
  )

  return support
}

export function processReplacementComponent(
  templater: TemplaterResult,
  subject:SupportContextItem,
  ownerSupport: AnySupport,
): AnySupport {
  const support = createSupportWithProps(
    templater,
    subject,
    ownerSupport,
  )

  const tag = support.templater.tag as any
  if( !['dom','html'].includes(tag.tagJsType) ) {
    return convertTagToElementManaged(support, ownerSupport, subject)
  }

  buildBeforeElement(
    support,
    undefined, // element for append child
    subject.placeholder as Text, // placeholder
  )

  return support
}

function convertTagToElementManaged(
  support: AnySupport,
  ownerSupport: AnySupport,
  subject: SupportContextItem,
) {
  const context = support.context
  const newValue = context.returnValue
  const tagJsVar = valueToTagJsVar(newValue)
  delete (context as ContextItem).global

  const overrideTagVar:ReadOnlyVar = {
    tagJsType: 'tag-conversion',
    processInitAttribute: tagJsVar.processInitAttribute,
    processInit: (
      _value: TemplateValue,
      _contextItem: ContextItem,
      _ownerSupport: AnySupport,
    ) => {
      return tagJsVar.processInit(
        context.returnValue,
        newContext,
        support,
        subject.placeholder,
      )
    },
    processUpdate: (
      value: TemplateValue,
      contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      const convertValue = context.returnValue
      const hasTypeChanged = (value as TagJsVar)?.tagJsType !== context.value.tagJsType
      const changed = hasTypeChanged || overrideTagVar.checkValueChange(convertValue, newContext, support)

      
      if(changed) {
        overrideTagVar.destroy(context, support)
        
        updateToDiffValue(
          value,
          context,
          ownerSupport,
          789,
        )
    
        return
      }

      newContext.value.props = (value as any).props     
      ;(newContext as SupportContextItem).inputsHandler = context.inputsHandler
      if( context.inputsHandler ) {
        const inputsHandler = context.inputsHandler as any
        inputsHandler(newContext.value.props)
      }
      tagJsVar.processUpdate(convertValue, newContext, support, [])

      newContext.value = convertValue
    },
    checkValueChange: (
      _value: unknown,
      _contextItem: ContextItem,
    ) => {
      const newValue = context.returnValue
      const checkResult = tagJsVar.checkValueChange(
        newValue,
        newContext,
        support,
      )
      return checkResult
    },
    destroy: (
      contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      tagJsVar.destroy(newContext, support)
      
      delete context.returnValue

      // Things only needed to perform destroy
      ;(context as SupportContextItem).global = {} as any
      ;(context as SupportContextItem).contexts = [] as any
      ;(context as SupportContextItem).htmlDomMeta = [] as any

      context.value.destroy(context, ownerSupport)

      return 
    }
  }

  const newContext: ContextItem = {
    value: newValue,
    tagJsVar,
    destroy$: new Subject<void>(),
    placeholder: context.placeholder,
    
    // not important
    valueIndex: -1,
    withinOwnerElement: true,
    parentContext: context,
  }

  // context.tagJsVar = context.returnValue
  context.tagJsVar = overrideTagVar

  // TODO: should we be calling this here?
  tagJsVar.processInit(
    newValue,
    newContext,
    support,
    subject.placeholder,
    // appendTo,
  )

  return support
}

export function processFirstSubjectComponent(
  templater: TemplaterResult,
  subject:SupportContextItem,
  ownerSupport: AnySupport,
  appendTo: Element,
): AnySupport {
  const support = createSupportWithProps(
    templater,
    subject,
    ownerSupport,
  )

  const tag = support.templater.tag as any
  if( !['dom','html'].includes(tag.tagJsType) ) {
    return convertTagToElementManaged(support, ownerSupport, subject)
  }

  return processFirstTagResult(
    support,
    appendTo,
  )
}
