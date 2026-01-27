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
import { syncPriorPropFunction } from '../../tag/update/syncPriorPropFunction.function.js'
import { AnySupport } from '../../tag/index.js'
import { SupportContextItem } from '../../tag/SupportContextItem.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

export function updateExistingTagComponent(
  ownerSupport: AnySupport,
  newSupport: AnySupport, // lastest
  subject:SupportContextItem,
): void {
  const global = subject.global as SupportTagGlobal
  const oldSupport = subject.state.newest as AnySupport
  
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
    oldSupport,
    templater
  )

  // everyhing has matched, no display needs updating.
  if(!hasChanged) {
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
  const subject = oldSupport.context
  const global = subject.global as SupportTagGlobal
  
  if(!global || !subject.state.newest) {
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

  const newest = subject.state.newest
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
  const context = oldSupport.context
  const global = context.global as SupportTagGlobal
  let pIndex = -1
  const providers = context.providers = context.providers || []

  const pLen = providers.length - 1
  while (pIndex++ < pLen) {
    const provider = providers[pIndex]
    let index = -1
    const pcLen = provider.children.length - 1
    while ( index++ < pcLen) {
      const child = provider.children[index]
      const wasSameGlobals = global === child.context.global
      if(wasSameGlobals) {
        provider.children.splice(index, 1)
        provider.children.push(newSupport as AnySupport)
        return
      }
    }
  }
}

/** Was tag, will be tag */
function swapTags(
  contextItem: SupportContextItem,
  templater: TemplaterResult, // new tag
  ownerSupport: AnySupport
) {
  const global = contextItem.global as SupportTagGlobal
  const oldestSupport = contextItem.state.oldest as AnySupport
  destroySupport(oldestSupport, global)
  getNewGlobal(contextItem)

  const t = templater as TagJsVar

  t.processInit(
    templater,
    contextItem,
    ownerSupport,
    contextItem.placeholder,
    // undefined, // appendTo,
  )
}
