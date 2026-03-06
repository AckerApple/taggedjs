import { PropsConfig } from '../../tag/createHtmlSupport.function.js'
import {SupportTagGlobal } from '../../tag/getTemplaterResult.function.js'
import { castProps, WrapRunner } from'../../tag/props/alterProp.function.js'
// import { renderSupport } from'../renderSupport.function.js'
import { Props } from '../../Props.js'
import { syncPriorPropFunction } from '../../tag/update/syncPriorPropFunction.function.js'
import { AnySupport } from '../../tag/index.js'

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
