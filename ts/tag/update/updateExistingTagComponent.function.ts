import { hasSupportChanged } from'../hasSupportChanged.function.js'
import { AnySupport, BaseSupport, PropsConfig, Support } from '../Support.class.js'
import { destroyTagMemory } from'../destroyTag.function.js'
import { renderSupport } from'../render/renderSupport.function.js'
import { castProps, isSkipPropValue } from'../../alterProp.function.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { Props } from '../../Props.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { ContextItem } from '../Tag.class.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'

export function updateExistingTagComponent(
  ownerSupport: BaseSupport | Support,
  support: AnySupport, // lastest
  subject: ContextItem,
): {subject: ContextItem, support: Support | BaseSupport, rendered: boolean} {
  const lastSupport = subject.global.newest as BaseSupport | Support
  
  const oldWrapper = lastSupport.templater.wrapper
  const newWrapper = support.templater.wrapper
  let isSameTag = false
  const skipComparing = [ValueTypes.stateRender, ValueTypes.oneRender].includes(support.templater.tagJsType)

  if(skipComparing) {
    isSameTag = support.templater.tagJsType === ValueTypes.oneRender || isLikeTags(lastSupport,support)
  } else if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.parentWrap.original
    const newFunction = newWrapper.parentWrap.original

    // string compare both functions
    isSameTag = oldFunction === newFunction
  }

  const templater = support.templater
  if(!isSameTag) {
    const newSupport = swapTags(
      subject,
      templater,
      ownerSupport,
    )

    return {subject, support: newSupport, rendered: true}
  }

  const hasChanged = skipComparing || hasSupportChanged(
    lastSupport as unknown as BaseSupport,
    templater
  )


  // everyhing has matched, no display needs updating.
  if(!hasChanged) {
    syncSupports(
      templater,
      support,
      lastSupport,
      ownerSupport,
    )

    return {subject, rendered: false, support: lastSupport}
  }

  if(subject.global.locked) {
    subject.global.blocked.push(support)
    return {subject, support, rendered: false}
  }

  const newSupport = renderSupport(support)

  return {subject, support: newSupport, rendered: true}
}

export function syncFunctionProps(
  newSupport: AnySupport,
  lastSupport: Support,
  ownerSupport: BaseSupport | Support,
  newPropsArray: any[], // templater.props
  depth = -1
): Props {
  const newest = lastSupport.subject.global.newest as Support

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

  lastSupport = newest || lastSupport as Support

  const priorPropConfig = lastSupport.propsConfig as PropsConfig
  const priorPropsArray = priorPropConfig.castProps as Props
  const newArray = []
  for (let index = 0; index < newPropsArray.length; ++index) {
    const prop = newPropsArray[index]
    const priorProp = priorPropsArray[index]

    const newValue = syncPriorPropFunction(
      priorProp, prop, newSupport, ownerSupport,
      depth + 1,
      index,
    )

    newArray.push(newValue)
  }

  const newPropsConfig = newSupport.propsConfig as PropsConfig
  newPropsConfig.castProps = newArray

  return newArray
}

function syncPriorPropFunction(
  priorProp: any,
  prop: any,
  newSupport: BaseSupport | Support,
  ownerSupport: BaseSupport | Support,
  depth: number,
  index: string | number,
  // seen: any[] = [],
) {
  if(priorProp instanceof Function) {
    // the prop i am receiving, is already being monitored/controlled by another parent
    if(prop.mem) {
      priorProp.mem.prop = prop.mem.prop
      priorProp.mem.stateArray = prop.mem.stateArray
      return prop
    }

    const ownerGlobal = ownerSupport.subject.global
    const newest = ownerGlobal.newest as Support
    const oldOwnerState = newest.state

    priorProp.mem = {
      prop,
      stateArray: oldOwnerState,
    }

    return priorProp
  }

  // prevent infinite recursion
  // if(seen.includes(prop)) {
  if(depth === 15) {
    return prop
  }
  // seen.push(prop)

  if( isSkipPropValue(prop) ) {
    return prop // no children to crawl through
  }

  if(prop instanceof Array) {
    for (let index = prop.length - 1; index >= 0; --index) {
      const x = prop[index]
      prop[index] = syncPriorPropFunction(
        priorProp[index], x, newSupport, ownerSupport,
        depth + 1,
        index,
        // seen,
      )
    }

    return prop
  }

  if(priorProp === undefined) {
    return prop
  }

  const keys = Object.keys(prop) 
  for(const name of keys){
    const subValue = (prop as any)[name]
    const result = syncPriorPropFunction(
      priorProp[name],
      subValue,
      newSupport,
      ownerSupport,
      depth + 1,
      name,
      // seen,
    )

    if(prop[name] === result) {
      continue
    }
    
    
    const hasSetter = Object.getOwnPropertyDescriptor(prop, name)?.set
    if(hasSetter) {
      continue
    }

    prop[name] = result
  }
  
  return prop
}

export function moveProviders(
  lastSupport: Support,
  newSupport: AnySupport,
) {
  const global = lastSupport.subject.global
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
        provider.children.push(newSupport as Support)
        return
      }
    }
  }
}

function syncSupports<T extends AnySupport>(
  templater: TemplaterResult,
  support: AnySupport,
  lastSupport: T,
  ownerSupport: AnySupport
) {
  // update function refs to use latest references
  const newProps = templater.props as Props
  const castedProps = syncFunctionProps(
    support,
    lastSupport as Support,
    ownerSupport,
    newProps,
  )

  const propsConfig = support.propsConfig as PropsConfig

  // When new support actually makes call to real function, use these pre casted props
  propsConfig.castProps = castedProps
  
  const lastPropsConfig = lastSupport.propsConfig as PropsConfig
  // update support to think it has different cloned props
  lastPropsConfig.latestCloned = propsConfig.latestCloned

  return lastSupport // its the same tag component  
}

function swapTags(
  subject: ContextItem,
  templater: TemplaterResult,
  ownerSupport: AnySupport
) {
  const global = subject.global
  const oldestSupport = global.oldest as Support
  destroyTagMemory(oldestSupport)
  delete subject.global.deleted

  const newSupport = processReplacementComponent(
    templater,
    subject,
    ownerSupport,
    {added: 0, removed: 0},
  )

  return newSupport
}
