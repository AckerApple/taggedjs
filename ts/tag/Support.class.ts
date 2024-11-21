import {SupportTagGlobal, TemplaterResult } from './TemplaterResult.class.js'
import { clonePropsBy } from './clonePropsBy.function.js'
import { Subject } from '../subject/Subject.class.js'
import { ContextItem } from './Context.types.js'
import { Props } from '../Props.js'
import { BaseSupport } from './BaseSupport.type.js'

export type AnySupport = (BaseSupport & {
})

export type PropsConfig = {
  latest: Props // new props NOT cloned props
  castProps?: Props // props that had functions wrapped
}

export type HtmlSupport = {
  appSupport: BaseSupport
  ownerSupport?: AnySupport
  appElement?: Element // only seen on this.getAppSupport().appElement
  propsConfig?: PropsConfig
  
  templater: TemplaterResult,

  // only on support
  subject: ContextItem
}

export type SupportContextItem = ContextItem & {
  global: SupportTagGlobal
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
}

/** used only for apps, otherwise use Support */
export function getBaseSupport(
  templater: TemplaterResult,
  subject:SupportContextItem,
  castedProps?: Props,
): AnySupport {
  const baseSupport = {
    templater,
    subject,
    castedProps,
    
    state: [], // TODO: this is not needed for every type of tag
    states: [], // TODO: this is not needed for every type of tag

    appSupport: undefined as unknown as BaseSupport,
  } as BaseSupport
  
  baseSupport.appSupport = baseSupport

  const global = subject.global
  global.blocked = []
  global.destroy$ = new Subject<void>()

  const props = templater.props  // natural props
  if(props) {
    baseSupport.propsConfig = clonePropsBy(baseSupport, props, castedProps)
  }

  return baseSupport
}

export type Support = AnySupport & {
  ownerSupport: AnySupport
  appSupport: BaseSupport
}

export function getSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  ownerSupport: AnySupport,
  appSupport: BaseSupport,
  subject: ContextItem,
  castedProps?: Props,
): AnySupport {
  const support = getBaseSupport(
    templater,
    subject as SupportContextItem,
    castedProps
  )

  support.ownerSupport = ownerSupport
  support.appSupport = appSupport
  
  return support as AnySupport
}

export function getHtmlSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  ownerSupport: AnySupport,
  appSupport: BaseSupport,
  subject: ContextItem,
  castedProps?: Props,
): AnySupport {
  const support = {
    templater,
    subject,
    castedProps,

    appSupport: undefined as unknown as BaseSupport,
  } as HtmlSupport
  
  support.ownerSupport = ownerSupport
  support.appSupport = appSupport
  return support as AnySupport
}
