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
import { checkTagValueChange, isPromise, paint, Subject, TemplateValue } from '../../index.js'
import { ReadOnlyVar, TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'
import { castProps } from '../props/alterProp.function.js'

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
  const newValue = context.toRender || context.returnValue
  const tagJsVar = valueToTagJsVar(newValue)
  delete (context as ContextItem).global

  const newContext: ContextItem = {
    updateCount: 0,
    value: newValue,
    tagJsVar,
    destroy$: new Subject<void>(),
    placeholder: context.placeholder,
    
    // not important
    valueIndex: -1,
    withinOwnerElement: true,
    parentContext: context,
  }

  const overrideTagVar:ReadOnlyVar = getOverrideTagVar(
    context,
    newContext,
    support,
    subject,
  )

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

/** Used when a tag() does not return html`` */
function getOverrideTagVar(
  context: ContextItem & SupportContextItem,
  newContext: ContextItem,
  support: AnySupport,
  subject: SupportContextItem,
): ReadOnlyVar {
  const overrideTagVar: ReadOnlyVar = {
    tagJsType: 'tag-conversion',
    processInitAttribute: newContext.tagJsVar.processInitAttribute,
    processInit: (
      _value: TemplateValue,
      _contextItem: ContextItem,
      _ownerSupport: AnySupport
    ) => {
      const renderContent = context.toRender || context.returnValue
      return newContext.tagJsVar.processInit(
        renderContent,
        newContext,
        support,
        subject.placeholder
      )
    },
    processUpdate: (
      value: TemplateValue,
      contextItem: ContextItem,
      ownerSupport: AnySupport
    ) => {
      ++context.updateCount
      ++contextItem.updateCount

      const convertValue = context.toRender || context.returnValue
      const oldValue = context.value
      const oldType = oldValue.tagJsType
      const newType = (value as TagJsVar)?.tagJsType
      const hasTypeChanged = newType !== oldType
      const hasChanged = checkTagValueChange(value, context)
      const changed = hasChanged || hasTypeChanged || overrideTagVar.hasValueChanged(
        convertValue,
        context, // newContext,
        support,
      )

      if (changed) {
        overrideTagVar.destroy(context, support)

        updateToDiffValue(
          value,
          context, // newContext
          ownerSupport,
          789
        )

        return
      }

      newContext.value.props = castProps(
        (value as any).props,
        ownerSupport,
        1, // depth of arguments to dig
      )
      
      ;(newContext as SupportContextItem).updatesHandler = context.updatesHandler
      if (context.updatesHandler) {
        const updatesHandler = context.updatesHandler as any
        updatesHandler(newContext.value.props)
      }

      newContext.tagJsVar.processUpdate(convertValue, newContext, support, [])

      newContext.value = convertValue
    },
    hasValueChanged: (
      _value: unknown,
      _contextItem: ContextItem
    ) => {
      const newValue = context.toRender || context.returnValue
      const checkResult = newContext.tagJsVar.hasValueChanged(
        newValue,
        newContext,
        support
      )
      return checkResult
    },
    destroy: (
      contextItem: ContextItem,
      ownerSupport: AnySupport
    ) => {
      ++context.updateCount
      const result = newContext.tagJsVar.destroy(newContext, support)

      if( isPromise(result) ) {
        return result.then(() => {
          const result = afterDestroy(context, ownerSupport)
          paint()
          return result
        })
      }

      return afterDestroy(context, ownerSupport)
    }
  }

  return overrideTagVar
}

function afterDestroy(
  context: ContextItem & SupportContextItem,
  ownerSupport: AnySupport,
) {
  delete context.returnValue
  delete context.toRender;
  delete (context as any).global // = {} as any;
  ;(context as SupportContextItem).contexts = [] as any;
  ;(context as SupportContextItem).htmlDomMeta = [] as any
  delete context.updatesHandler
  
  // context.value.destroy(context, ownerSupport)
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

  // DISCOVER IF tag() did NOT return dom|html
  const tag = support.templater.tag as any
  if( !['dom','html'].includes(tag.tagJsType) ) {
    return convertTagToElementManaged(support, ownerSupport, subject)
  }

  return processFirstTagResult(
    support,
    appendTo,
  )
}
