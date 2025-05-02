import {SupportTagGlobal, TemplaterResult } from './getTemplaterResult.function.js'
import { clonePropsBy } from './clonePropsBy.function.js'
import { Subject } from '../subject/Subject.class.js'
import { ContextItem } from './Context.types.js'
import { Props } from '../Props.js'
import { BaseSupport } from './BaseSupport.type.js'
import { State } from '../state/index.js'
import { StatesSetter } from '../state/states.utils.js'

export type AnySupport = (BaseSupport & {
  state: State
  states: StatesSetter[]
})

export type PropsConfig = {
  latest: Props // new props NOT cloned props
  castProps?: Props // props that had functions wrapped
}

export type HtmlSupport = {
  appSupport: AnySupport
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
): BaseSupport {
  const baseSupport = {
    templater,
    subject,
    castedProps,

    appSupport: undefined as unknown as AnySupport,
  } as BaseSupport
  
  // baseSupport.appSupport = baseSupport

  const global = subject.global
  global.blocked = []
  global.destroy$ = new Subject<void>()

  return baseSupport
}

export type Support = AnySupport & {
  ownerSupport: AnySupport
  appSupport: BaseSupport
}

/** Sets support states to empty array and clones props */
export function upgradeBaseToSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  support: BaseSupport,
  appSupport: AnySupport,
  castedProps?: Props,
): AnySupport {
  // ;(support as AnySupport).state = []
  // ;(support as AnySupport).states = []

  support.appSupport = appSupport
  
  const props = templater.props  // natural props
  if(props) {
    support.propsConfig = clonePropsBy(support as AnySupport, props, castedProps)
  }

  return support as AnySupport
}

export function getHtmlSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  ownerSupport: AnySupport,
  appSupport: AnySupport,
  subject: ContextItem,
  castedProps?: Props,
): AnySupport {
  const support = {
    templater,
    subject,
    castedProps,

    appSupport: undefined as unknown as AnySupport,
  } as HtmlSupport
  
  support.ownerSupport = ownerSupport
  support.appSupport = appSupport
  return support as AnySupport
}

export function getSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  ownerSupport: AnySupport,
  appSupport: AnySupport,
  subject: ContextItem,
  castedProps?: Props,
): AnySupport {
  const support = getBaseSupport(
    templater,
    subject as SupportContextItem,
    castedProps
  ) as AnySupport

  support.ownerSupport = ownerSupport

  return upgradeBaseToSupport(templater, support, appSupport, castedProps)
}
