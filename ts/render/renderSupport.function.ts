import { PropsConfig } from '../tag/createHtmlSupport.function.js'
import { AnySupport } from '../tag/index.js'
import { deepEqual } from '../deepFunctions.js'
import { renderExistingSupport } from'./renderExistingTag.function.js'
import { Props } from '../Props.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import {SupportTagGlobal, TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { PropWatches } from '../index.js'
import { deepCompareDepth, immutablePropMatch } from '../tag/hasSupportChanged.function.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { shallowPropMatch } from '../tag/shallowPropMatch.function.js'

export function isInlineHtml(templater: TemplaterResult) {
  return ValueTypes.templater === templater.tagJsType
}

/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport<T extends AnySupport>(
  support: T, // must be latest/newest state render
): T {
  const subject = support.context
  const global = subject.global as SupportTagGlobal
  const templater = support.templater
  const inlineHtml = isInlineHtml(templater)

  if(subject.locked) {
    console.log('global', {global, subject})
    global.blocked.push(support)
    return support
  }

  // is it just a vanilla tag, not component?
  if( inlineHtml ) {
    const result = renderInlineHtml(support) as T
    return result
  }

  subject.locked = 4

  if(global.blocked.length) {
    support = global.blocked.pop() as T
    global.blocked = []
  }

  const tag = renderExistingSupport(
    subject.state.newest as AnySupport,
    support,
    subject,
  )

  delete subject.locked

  return tag as T
}

/** Renders the owner of the inline HTML even if the owner itself is inline html */
export function renderInlineHtml(
  support: AnySupport,
) {
  const ownerSupport = getSupportWithState(support)
  const ownContext = ownerSupport.context
  const newest = ownContext.state.newest

  // Function below may call renderInlineHtml again if owner is just inline HTML
  const result = renderSupport(newest as AnySupport)

  return result
}

export function checkRenderUp(
  templater: TemplaterResult,
  support: AnySupport,
) {
  if(support.context.global.deleted) {
    return false
  }

  const selfPropChange = hasPropsToOwnerChanged(
    templater,
    support,
  )
  
  // render owner up first and that will cause me to re-render
  if(selfPropChange) {    
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
  
  return nowLen !== latestLen
}
