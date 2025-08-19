import { TemplaterResult } from '../getTemplaterResult.function.js'
import { processFirstTagResult } from'./processTagResult.function.js'
import { PropsConfig } from '../createHtmlSupport.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getCastedProps } from '../getTagWrap.function.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../index.js'
import { SupportContextItem } from '../SupportContextItem.type.js'
import { firstTagRender } from '../../render/renderTagOnly.function.js'
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'

export function processReplacementComponent(
  templater: TemplaterResult,
  subject:SupportContextItem,
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

  buildBeforeElement(
    support,
    undefined, // element for append child
    subject.placeholder as Text, // placeholder
  )

  return support
}

export function processFirstSubjectComponent(
  templater: TemplaterResult,
  subject:SupportContextItem,
  ownerSupport: AnySupport,
  appendTo: Element,
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

  return processFirstTagResult(
    support,
    appendTo,
  )
}
