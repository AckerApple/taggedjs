import { PropsConfig, Support } from '../tag/createHtmlSupport.function.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { deepEqual } from '../deepFunctions.js'
import { renderExistingReadyTag } from'./renderExistingTag.function.js'
import { Props } from '../Props.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import {SupportTagGlobal, TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { PropWatches } from '../index.js'
import { deepCompareDepth, immutablePropMatch, shallowPropMatch } from '../tag/hasSupportChanged.function.js'

export function isInlineHtml(templater: TemplaterResult) {
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

  if(global.locked) {
    global.blocked.push(support)
    return support
  }

  // is it just a vanilla tag, not component?
  if( inlineHtml ) {
    const result = renderInlineHtml(ownerSupport, support) as T
    return result
  }

  global.locked = true

  const subject = support.subject
  if(global.blocked.length) {
    support = global.blocked.pop() as T
    global.blocked = []
  }

  const tag = renderExistingReadyTag(
    global.newest,
    support,
    ownerSupport,
    subject,
  )

  delete global.locked

  return tag as T
}

export function renderInlineHtml(
  ownerSupport: AnySupport,
  support: AnySupport,
) {
  const ownGlobal = ownerSupport.subject.global as SupportTagGlobal
  
  if(!ownGlobal || ownGlobal.deleted === true) {
    return support
  }

  // ??? new change
  const newest = ownGlobal.newest || ownerSupport
  const result = renderSupport(newest as AnySupport)

  return result
}

export function checkRenderUp(
  ownerSupport: AnySupport,
  templater: TemplaterResult,
  support: AnySupport,
) {
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

/** Used when crawling up the chain of child-to-parent tags. See hasSupportChanged for the downward direction */
function hasPropsToOwnerChanged(
  templater: TemplaterResult,
  support: AnySupport,
) {
  const nowProps = templater.props as Props
  const propsConfig = support.propsConfig as PropsConfig
  const latestProps = propsConfig.latest
  const compareLen = hasPropLengthsChanged(nowProps, latestProps)

  if(compareLen) {
    return true
  }

  switch (templater.propWatch) {
    case PropWatches.IMMUTABLE:
      return immutablePropMatch(nowProps, latestProps)  
    
    case PropWatches.SHALLOW:
      return shallowPropMatch(nowProps, latestProps)
  }

  return !deepEqual(nowProps, latestProps, deepCompareDepth)
}

export function hasPropLengthsChanged(
  nowProps: Props,
  latestProps: Props,
) {
  const nowLen = nowProps.length
  const latestLen = latestProps.length
  /*
  const noLength = nowProps && nowLen === 0 && latestLen === 0

  if(noLength) {
    return false
  }
  */
  return nowLen !== latestLen
}
