import { PropsConfig } from '../tag/createHtmlSupport.function.js'
import { AnySupport } from '../tag/index.js'
import { deepEqual } from '../deepFunctions.js'
import { Props } from '../Props.js'
import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { PropWatches } from '../index.js'
import { deepCompareDepth, immutablePropMatch } from '../tag/hasSupportChanged.function.js'
import { shallowPropMatch } from '../tag/shallowPropMatch.function.js'

export function checkRenderUp(
  templater: TemplaterResult,
  support: AnySupport,
) {
  const global = support.context.global
  if (global && global.deleted) {
    return false;
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