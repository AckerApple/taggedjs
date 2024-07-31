import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { processFirstTagResult, processReplaceTagResult } from'./processTagResult.function.js'
import { BaseSupport, getSupport, PropsConfig, Support } from '../Support.class.js'
import { renderWithSupport } from '../render/renderWithSupport.function.js'
import { ContextItem } from '../Tag.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getCastedProps } from '../getTagWrap.function.js'

export function processReplacementComponent(
  templater: TemplaterResult,
  subject: ContextItem,
  ownerSupport: BaseSupport | Support,
  counts: Counts,
): BaseSupport | Support {
  // TODO: This below check not needed in production mode
  // validateTemplater(templater)

  const newSupport = getSupport(
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
    subject as ContextItem,
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
  subject: ContextItem,
  ownerSupport: BaseSupport | Support,
  counts: Counts,
  appendTo: Element,
): BaseSupport | Support {
  // TODO: This below check not needed in production mode
  // validateTemplater(templater)

  const newSupport = getSupport(
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
    subject as ContextItem,
    ownerSupport,
  )

  processFirstTagResult(
    support,
    counts,
    appendTo,
  )

  return support
}
