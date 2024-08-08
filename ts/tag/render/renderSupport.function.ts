import { AnySupport, PropsConfig, Support } from '../Support.class.js'
import { deepEqual } from '../../deepFunctions.js'
import { renderExistingReadyTag } from'./renderExistingTag.function.js'
import { Props } from '../../Props.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { SupportTagGlobal, TemplaterResult } from '../TemplaterResult.class.js'

export function isInlineHtml(templater: TemplaterResult) {
  /*
  return !templater.wrapper && templater.tagJsType !== ValueTypes.stateRender
  */
  return ValueTypes.templater === templater.tagJsType
}

/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport<T extends AnySupport>(
  support: T, // must be latest/newest state render
): T {
  const global = support.subject.global as SupportTagGlobal
  const templater = support.templater
  const inlineHtml = isInlineHtml(templater)
  const ownerSupport = (support as Support).ownerSupport

  // is it just a vanilla tag, not component?
  if( inlineHtml ) {
    return renderInlineHtml(ownerSupport, support) as T
  }

  if(global.locked) {
    global.blocked.push(support)
    return support
  }

  global.locked = true

  const subject = support.subject
  if(global.blocked.length) {
    support = global.blocked.pop() as T
    global.blocked = []
  }

  delete global.locked

  const tag = renderExistingReadyTag(
    global.newest as Support,
    support,
    ownerSupport,
    subject,
  )

  return tag as T
}

export function renderInlineHtml(
  ownerSupport: AnySupport,
  support: AnySupport,
) {
  const ownGlobal = ownerSupport.subject.global as SupportTagGlobal
  
  if(ownGlobal.deleted === true) {
    return support
  }

  // ??? new change
  const newest = ownGlobal.newest || ownerSupport
  const result = renderSupport(newest as Support)

  return result
}

export function checkRenderUp(
  ownerSupport: AnySupport,
  templater: TemplaterResult,
  support: AnySupport,
) {
  if(!ownerSupport) {
    return false
  }

  const selfPropChange = hasPropsToOwnerChanged(
    templater,
    support,
  )
  
  // render owner up first and that will cause me to re-render
  if(ownerSupport && selfPropChange) {    
    return true
  }

  return false
}

function hasPropsToOwnerChanged(
  templater: TemplaterResult,
  support: AnySupport,
) {
  if(support.templater.tagJsType === ValueTypes.stateRender) {
    return true
  }

  const nowProps = templater.props as Props
  const propsConfig = support.propsConfig as PropsConfig
  const latestProps = propsConfig.latestCloned
  const noLength = nowProps && nowProps.length === 0 && latestProps.length === 0
  return !(noLength || deepEqual(nowProps, latestProps))
}
