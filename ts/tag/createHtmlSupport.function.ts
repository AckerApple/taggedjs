import { TemplaterResult } from './getTemplaterResult.function.js'
import { clonePropsBy } from './props/clonePropsBy.function.js'
import { Subject } from '../subject/Subject.class.js'
import { Props } from '../Props.js'
import { BaseSupport } from './BaseSupport.type.js'
import { AnySupport } from './AnySupport.type.js'
import { ContextItem, SupportContextItem } from '../index.js'

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

/** used only for apps, otherwise use Support */
export function getBaseSupport(
  templater: TemplaterResult,
  subject: SupportContextItem,
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

export function createHtmlSupport(
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
