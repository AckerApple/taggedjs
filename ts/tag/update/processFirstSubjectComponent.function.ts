import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { processFirstTagResult, processReplaceTagResult } from'./processTagResult.function.js'
import { PropsConfig,SupportContextItem } from '../createHtmlSupport.function.js'
import { renderWithSupport } from '../render/renderWithSupport.function.js'
import { ContextItem } from '../Context.types.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getCastedProps } from '../getTagWrap.function.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../AnySupport.type.js'

export function processReplacementComponent(
  templater: TemplaterResult,
  subject:SupportContextItem,
  ownerSupport: AnySupport,
  counts: Counts,
): AnySupport {
  // TODO: This below check not needed in production mode
  // validateTemplater(templater)

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
  
  const global = subject.global as SupportTagGlobal
  const {support} = renderWithSupport(
    newSupport,
    global.newest, // existing tag
    subject,
    ownerSupport,
  )

  processReplaceTagResult(
    support,
    counts,
    subject as ContextItem, // The element set here will be removed from document. Also result.tag will be added in here
  )

  return support
}

export function processFirstSubjectComponent(
  templater: TemplaterResult,
  subject:SupportContextItem,
  ownerSupport: AnySupport,
  counts: Counts,
  appendTo: Element,
): AnySupport {
  // TODO: This below check not needed in production mode
  // validateTemplater(templater)

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
    
  const global = subject.global as SupportTagGlobal
  const {support} = renderWithSupport(
    newSupport,
    global.newest, // existing tag   
    subject,
    ownerSupport,
  )

  processFirstTagResult(
    support,
    counts,
    appendTo,
  )

  return support
}
