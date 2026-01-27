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
import { paint, Subject, SubscribeValue, Tag } from '../../index.js'
import { castProps } from '../props/alterProp.function.js'
import { convertTagToElementManaged } from './convertTagToElementManaged.function.js'
import { Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { removeContextInCycle, setContextInCycle } from '../cycles/setContextInCycle.function.js'

function createSupportWithProps(
  templater: TemplaterResult,
  subject: SupportContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  const newSupport = createSupport(
    templater,
    subject,
    ownerSupport,
    ownerSupport?.appSupport,
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
  context:SupportContextItem,
  ownerSupport?: AnySupport,
): AnySupport {
  const support = createSupportWithProps(
    templater,
    context,
    ownerSupport,
  )

  const tag = support.templater.tag as any
  if( !['dom','html'].includes(tag.tagJsType) ) {
    return convertTagToElementManaged(
      support,
      support.ownerSupport as AnySupport,
      context,
    )
  }

  buildBeforeElement(
    support,
    undefined, // element for append child
    context.placeholder as Text, // placeholder
  )

  return support
}

export function makeRealUpdate(
  newContext: ContextItem,
  value: string | number | boolean | Tag | SubscribeValue | TemplaterResult | (Tag | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined,
  context: SupportContextItem,
  convertValue: any,
  support: AnySupport,
) {
  // We need to deprecate this completely (castProps)
  const castedProps = castProps(
    (value as any).props,
    support, // ownerSupport,
    0
  )

  newContext.value.props = castedProps
  const propsConfig = support.propsConfig as PropsConfig
  if(propsConfig) {
    propsConfig.castProps = castedProps
  }
  
  // TODO this outer condition may not be needed at all
  if((value as any)?.tagJsType === 'tagComponent') {
    newContext.inputsHandler = context.inputsHandler
    newContext.updatesHandler = context.updatesHandler

    if (context.inputsHandler) {
      setContextInCycle(context)
      const inputsHandler = context.inputsHandler as any
      inputsHandler( castedProps ) // .inputs()
      removeContextInCycle()
    }

    if (context.updatesHandler) {
      setContextInCycle(context)
      const updatesHandler = context.updatesHandler as any
      updatesHandler( castedProps ) // .updates()
      removeContextInCycle()
    }
  }

  newContext.tagJsVar.processUpdate(convertValue, newContext, support, [])

  newContext.value = convertValue
  // paint()
}

export function afterDestroy(
  context: ContextItem & SupportContextItem,
  _ownerSupport: AnySupport,
) {
  delete context.returnValue
  delete (context as any).global // = {} as any;
  ;(context as SupportContextItem).contexts = [] as any;
  ;(context as SupportContextItem).htmlDomMeta = [] as any
  
  delete context.inputsHandler
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
