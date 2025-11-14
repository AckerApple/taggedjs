import { TemplaterResult } from './getTemplaterResult.function.js'
import { clonePropsBy } from './props/clonePropsBy.function.js'
import { Props } from '../Props.js'
import { AnySupport } from './index.js'
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
  returnValue?: any

  // only on support
  context: ContextItem
}

/** used only for apps, otherwise use Support */
export function getBaseSupport(
  templater: TemplaterResult,
  context: SupportContextItem,
  castedProps?: Props,
): AnySupport {
  const baseSupport = {
    templater,
    context,
    castedProps,

    appSupport: undefined as unknown as AnySupport,
  } as AnySupport
  

  const global = context.global
  global.blocked = []

  // context.state.newer = context.state.newer || { ...setUseMemory.stateConfig }
  if( !context.state ) {
    context.state = {
      newer: {
        state:[],
        states: [],
      }
    }
  }

  return baseSupport
}

export type Support = AnySupport & {
  ownerSupport: AnySupport
  appSupport: AnySupport
}

/** Sets support states to empty array and clones props */
export function upgradeBaseToSupport(
  templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
  support: AnySupport,
  appSupport: AnySupport,
  castedProps?: Props,
): AnySupport {
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
  context: ContextItem,
  castedProps?: Props,
): AnySupport {
  const support = {
    templater,
    context,
    castedProps,

    appSupport: undefined as unknown as AnySupport,
  } as HtmlSupport
  
  support.ownerSupport = ownerSupport
  support.appSupport = appSupport
  return support as AnySupport
}
