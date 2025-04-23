import { deepCompareDepth, hasSupportChanged, shallowCompareDepth } from'../hasSupportChanged.function.js'
import { AnySupport, PropsConfig,SupportContextItem } from '../getSupport.function.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import {SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { castProps, isSkipPropValue, WrapRunner } from'../../alterProp.function.js'
import { renderSupport } from'../render/renderSupport.function.js'
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js'
import { destroySupport } from '../destroySupport.function.js'
import { getNewGlobal } from './getNewGlobal.function.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { isArray } from '../../isInstance.js'
import { PropWatches } from '../tag.function.js'
import { Props } from '../../Props.js'
import { BaseSupport } from '../BaseSupport.type.js'
import { syncPriorPropFunction } from './syncPriorPropFunction.function.js'

export function updateExistingTagComponent(
  ownerSupport: AnySupport,
  support: AnySupport, // lastest
  subject:SupportContextItem,
): void {
  const global = subject.global as SupportTagGlobal
  const lastSupport = global.newest
  
  const oldWrapper = lastSupport.templater.wrapper
  const newWrapper = support.templater.wrapper
  let isSameTag = false
  const tagJsType = support.templater.tagJsType
  const skipComparing = ValueTypes.stateRender === tagJsType || ValueTypes.renderOnce === tagJsType

  if(skipComparing) {
    isSameTag = support.templater.tagJsType === ValueTypes.renderOnce || isLikeTags(lastSupport,support)
  } else if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.original
    const newFunction = newWrapper.original

    // string compare both functions
    isSameTag = oldFunction === newFunction
  }

  const templater = support.templater
  if(!isSameTag) {
    swapTags(
      subject,
      templater,
      ownerSupport,
    )

    return
  }

  const hasChanged = skipComparing || hasSupportChanged(
    lastSupport as unknown as BaseSupport,
    templater
  )

  // everyhing has matched, no display needs updating.
  if(!hasChanged) {
    const maxDepth = templater.propWatch === PropWatches.DEEP ? deepCompareDepth : shallowCompareDepth
    syncSupports(
      templater,
      support,
      lastSupport,
      ownerSupport,
      maxDepth,
    )

    return
  }

  if(global.locked) {
    global.blocked.push(support)
    return
  }

  renderSupport(support)

  ++subject.renderCount

  return
}

export function syncFunctionProps(
  newSupport: AnySupport,
  lastSupport: AnySupport,
  ownerSupport: AnySupport,
  newPropsArray: unknown[], // templater.props
  maxDepth: number,
  depth = -1,
): Props {
  const global = lastSupport.subject.global as SupportTagGlobal
  const newest = global.newest

  if(!newest) {
    const castedProps = castProps(
      newPropsArray,
      newSupport,
      depth
    )
    newPropsArray.push( ...castedProps )
    const propsConfig = newSupport.propsConfig as PropsConfig
    propsConfig.castProps = castedProps
    return newPropsArray
  }

  lastSupport = newest || lastSupport as AnySupport

  const priorPropConfig = lastSupport.propsConfig as PropsConfig
  const priorPropsArray = priorPropConfig.castProps as Props
  const newArray = []
  for (let index = 0; index < newPropsArray.length; ++index) {
    const prop = newPropsArray[index]
    const priorProp = priorPropsArray[index]

    const newValue = syncPriorPropFunction(
      priorProp,
      prop as WrapRunner,
      newSupport,
      ownerSupport,
      depth + 1,
      maxDepth,
    )

    newArray.push(newValue)
  }

  const newPropsConfig = newSupport.propsConfig as PropsConfig
  newPropsConfig.castProps = newArray

  return newArray
}

export function moveProviders(
  lastSupport: AnySupport,
  newSupport: AnySupport,
) {
  const global = lastSupport.subject.global as SupportTagGlobal
  let pIndex = -1
  const providers = global.providers = global.providers || []

  const pLen = providers.length - 1
  while (pIndex++ < pLen) {
    const provider = providers[pIndex]
    let index = -1
    const pcLen = provider.children.length - 1
    while ( index++ < pcLen) {
      const child = provider.children[index]
      const wasSameGlobals = global === child.subject.global
      if(wasSameGlobals) {
        provider.children.splice(index, 1)
        provider.children.push(newSupport as AnySupport)
        return
      }
    }
  }
}

function syncSupports<T extends AnySupport>(
  templater: TemplaterResult,
  support: AnySupport,
  lastSupport: T,
  ownerSupport: AnySupport,
  maxDepth: number,
) {
  // update function refs to use latest references
  const newProps = templater.props as Props
  const castedProps = syncFunctionProps(
    support,
    lastSupport as AnySupport,
    ownerSupport,
    newProps,
    maxDepth,
  )

  const propsConfig = support.propsConfig as PropsConfig

  // When new support actually makes call to real function, use these pre casted props
  propsConfig.castProps = castedProps
  
  const lastPropsConfig = lastSupport.propsConfig as PropsConfig
  // update support to think it has different cloned props
  lastPropsConfig.latest = propsConfig.latest

  return lastSupport // its the same tag component  
}

/** Was tag, will be tag */
function swapTags(
  subject:SupportContextItem,
  templater: TemplaterResult, // new tag
  ownerSupport: AnySupport
) {
  const global = subject.global as SupportTagGlobal
  const oldestSupport = global.oldest as AnySupport
  destroySupport(oldestSupport)
  
  getNewGlobal(subject) as SupportTagGlobal

  const newSupport = processReplacementComponent(
    templater,
    subject,
    ownerSupport,
    {added: 0, removed: 0},
  )

  return newSupport
}
