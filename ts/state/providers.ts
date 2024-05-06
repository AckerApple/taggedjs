import { deepClone } from '../deepFunctions'
import { BaseTagSupport, TagSupport } from '../TagSupport.class'
import { setUse } from './setUse.function'

export type Provider = {
  constructMethod: any
  instance: any
  clone: any
}

type ProviderConstructor<T> = (new (...args: any[]) => T) | (() => T)

export type ProviderConfig = {
  providers: Provider[]
  ownerSupport?: TagSupport
}

setUse.memory.providerConfig = {
  providers: [] as Provider[],
  ownerSupport: undefined,
}

function get(constructMethod: Function) {
  const config = setUse.memory.providerConfig
  const providers: Provider[] = config.providers
  return providers.find(provider => provider.constructMethod === constructMethod)
}

type functionProvider<T> = () => T
type classProvider<T> = new (...args: any[]) => T

export const providers = {
  create: <T>(
    constructMethod: classProvider<T> | functionProvider<T>
  ): T => {
    const existing = get(constructMethod)
    if(existing) {
      existing.clone = deepClone(existing.instance)
      return existing.instance
    }

    // Providers with provider requirements just need to use providers.create() and providers.inject()
    const instance: T = 'prototype' in constructMethod ? new (constructMethod as classProvider<T>)() : (constructMethod as functionProvider<T>)()
    
    const config = setUse.memory.providerConfig
    config.providers.push({
      constructMethod,
      instance,
      clone: deepClone(instance)
    })
    
    return instance
  },
  
  /**
   * @template T
   * @param {(new (...args: any[]) => T) | () => T} constructor 
   * @returns {T}
   */
  inject: <T>(constructor: ProviderConstructor<T>): T => {
    const oldValue = get(constructor)
    if(oldValue) {
      return oldValue.instance
    }

    const config = setUse.memory.providerConfig
    let owner = {
      ownerTagSupport: config.ownerSupport
    } as TagSupport
  
    while(owner.ownerTagSupport) {
      const ownerProviders = owner.ownerTagSupport.global.providers

      const provider = ownerProviders.find(provider => {
        if(provider.constructMethod === constructor) {
          return true
        }
      })

      if(provider) {
        provider.clone = deepClone(provider.instance) // keep a copy of the latest before any change occur
        config.providers.push(provider)
        return provider.instance
      }

      owner = owner.ownerTagSupport // cause reloop
    }
    
    const msg = `Could not inject provider: ${constructor.name} ${constructor}`
    console.warn(`${msg}. Available providers`, config.providers)
    throw new Error(msg)
  }
}

setUse({ // providers
  beforeRender: (
    tagSupport: BaseTagSupport,
    ownerSupport?: TagSupport,
  ) => {
    run(tagSupport, ownerSupport)
  },
  beforeRedraw: (
    tagSupport: BaseTagSupport,
    newTagSupport: TagSupport,
  ) => {
    run(tagSupport, newTagSupport.ownerTagSupport)
  },
  afterRender: (
    tagSupport: BaseTagSupport,
    // tag: Tag
  ) => {
    const config = setUse.memory.providerConfig
    tagSupport.global.providers = [...config.providers]
    config.providers.length = 0
  }
})

function run(
  tagSupport: BaseTagSupport,
  ownerSupport?: TagSupport,
) {
  const config = setUse.memory.providerConfig  
  config.ownerSupport = ownerSupport
  
  if(tagSupport.global.providers.length) {
    config.providers.length = 0
    config.providers.push(...tagSupport.global.providers)
  }
}