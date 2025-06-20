import { deepCompareDepth, hasSupportChanged, shallowCompareDepth } from'../../tag/hasSupportChanged.function.js'
import { PropsConfig } from '../../tag/createHtmlSupport.function.js'
import {SupportTagGlobal, TemplaterResult, Wrapper } from '../../tag/getTemplaterResult.function.js'
import { castProps, WrapRunner } from'../../tag/props/alterProp.function.js'
import { renderSupport } from'../renderSupport.function.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { destroySupport } from '../destroySupport.function.js'
import { getNewGlobal } from '../../tag/update/getNewGlobal.function.js'
import { isLikeTags } from'../../tag/isLikeTags.function.js'
import { PropWatches } from '../../tagJsVars/tag.function.js'
import { Props } from '../../Props.js'
import { BaseSupport } from '../../tag/BaseSupport.type.js'
import { syncPriorPropFunction } from '../../tag/update/syncPriorPropFunction.function.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { SupportContextItem } from '../../tag/SupportContextItem.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function updateExistingTagComponent(
  ownerSupport: AnySupport,
  newSupport: AnySupport, // lastest
  subject:SupportContextItem,
): void {
  const global = subject.global as SupportTagGlobal
  const oldSupport = global.newest
  
  const oldWrapper = oldSupport.templater.wrapper
  let newWrapper = newSupport.templater.wrapper as Wrapper
  let isSameTag = false
  const tagJsType = newSupport.templater.tagJsType
  const skipComparing = ValueTypes.stateRender === tagJsType || ValueTypes.renderOnce === tagJsType

  if(skipComparing) {
    isSameTag = newSupport.templater.tagJsType === ValueTypes.renderOnce || isLikeTags(oldSupport, newSupport)
  } else if(oldWrapper && newWrapper) {
    // is this perhaps an outerHTML compare?
    const innerHTML = oldSupport.templater.tag?._innerHTML
    if(innerHTML) {
      // newWrapper = innerHTML.outerHTML as any as Wrapper
      newWrapper = (newSupport as any).outerHTML
    }

    const oldFunction = oldWrapper.original
    const newFunction = newWrapper.original

    // string compare both functions
    isSameTag = oldFunction === newFunction
  }

  const templater = newSupport.templater
  if(!isSameTag) {
    swapTags(
      subject,
      templater,
      ownerSupport,
    )

    return
  }

  const hasChanged = skipComparing || hasSupportChanged(
    oldSupport as unknown as BaseSupport,
    templater
  )

  // everyhing has matched, no display needs updating.
  if(!hasChanged) {
    const maxDepth = templater.propWatch === PropWatches.DEEP ? deepCompareDepth : shallowCompareDepth
    syncSupports(
      templater,
      newSupport,
      oldSupport,
      ownerSupport,
      maxDepth,
    )

    return
  }

  if( subject.locked ) {
    global.blocked.push( newSupport )
    return
  }

  renderSupport( newSupport )

  ++subject.renderCount

  return
}

export function syncFunctionProps(
  newSupport: AnySupport,
  oldSupport: AnySupport,
  ownerSupport: AnySupport,
  newPropsArray: unknown[], // templater.props
  maxDepth: number,
  depth = -1, // 10 or 3
): Props {
  const subject = oldSupport.subject
  const global = subject.global as SupportTagGlobal
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

  oldSupport = newest || oldSupport as AnySupport

  const priorPropConfig = oldSupport.propsConfig as PropsConfig
  const priorPropsArray = priorPropConfig.castProps as Props
  const newArray: any[] = []
  for (let index = 0; index < newPropsArray.length; ++index) {
    const prop = newPropsArray[index]
    const priorProp = priorPropsArray[index]

    const newValue = syncPriorPropFunction(
      priorProp,
      prop as WrapRunner,
      newSupport,
      ownerSupport,
      maxDepth,
      depth + 1,
    )

    newArray.push(newValue)
  }

  const newPropsConfig = newSupport.propsConfig as PropsConfig
  newPropsConfig.castProps = newArray

  return newArray
}

export function moveProviders(
  oldSupport: AnySupport,
  newSupport: AnySupport,
) {
  const global = oldSupport.subject.global as SupportTagGlobal
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

/** Exchanges entire propsConfigs */
function syncSupports<T extends AnySupport>(
  templater: TemplaterResult,
  support: AnySupport,
  oldSupport: T,
  ownerSupport: AnySupport,
  maxDepth: number,
) {
  // update function refs to use latest references
  const newProps = templater.props as Props
  const castedProps = syncFunctionProps(
    support,
    oldSupport as AnySupport,
    ownerSupport,
    newProps,
    maxDepth,
  )

  const propsConfig = support.propsConfig as PropsConfig

  // When new support actually makes call to real function, use these pre casted props
  propsConfig.castProps = castedProps
  
  const lastPropsConfig = oldSupport.propsConfig as PropsConfig
  // update support to think it has different cloned props
  lastPropsConfig.latest = propsConfig.latest
  
  return oldSupport // its the same tag component  
}

/** Was tag, will be tag */
function swapTags(
  contextItem: SupportContextItem,
  templater: TemplaterResult, // new tag
  ownerSupport: AnySupport
) {
  const global = contextItem.global as SupportTagGlobal
  const oldestSupport = global.oldest as AnySupport
  destroySupport(oldestSupport, global)
  
  getNewGlobal(contextItem)

  ;(templater as TagJsVar).processInit(
    templater,
    contextItem,
    ownerSupport,
    { added: 0, removed: 0 },
    undefined, // appendTo,
    contextItem.placeholder,
  )
}
