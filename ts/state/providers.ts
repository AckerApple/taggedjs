import { deepClone } from '../deepFunctions'
import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class'
import { setUse } from './setUse.function'
import { state } from './state.function'

export type Provider = {
  constructMethod: any
  instance: any
  clone: any
  stateDiff: number
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

type functionProvider<T> = () => T
type classProvider<T> = new (...args: any[]) => T
type Construct<T> = classProvider<T> | functionProvider<T>
type ConstructMethod<T> = Construct<T> & {
  compareTo: string
}

export const providers = {
  create: <T>(
    constructMethod: Construct<T>
  ): T => {
    const cm = constructMethod as ConstructMethod<T>
    const compareTo = cm.compareTo = cm.compareTo || cm.toString()
    const stateDiffMemory = state(() => ({stateDiff: 0, provider: undefined as any as Provider}))

    if(stateDiffMemory.stateDiff) {
      for(let x = stateDiffMemory.stateDiff; x > 0; --x){
        state(undefined)
      }
      const result = state(undefined) as T
      stateDiffMemory.provider.constructMethod.compareTo = compareTo
      return result
    }

    const result = state(() => {
      const memory = setUse.memory
      const stateConfig = memory.stateConfig
      const oldStateCount = stateConfig.array.length
      // Providers with provider requirements just need to use providers.create() and providers.inject()
      const instance: T = 'prototype' in constructMethod ? new (constructMethod as classProvider<T>)() : (constructMethod as functionProvider<T>)()
  
      const stateDiff = stateConfig.array.length - oldStateCount
      
      const config = memory.providerConfig
      const provider = {
        constructMethod,
        instance,
        clone: deepClone(instance),
        stateDiff,
      } as Provider

      stateDiffMemory.provider = provider
      config.providers.push(provider)
      stateDiffMemory.stateDiff = stateDiff

      return instance
    })

    stateDiffMemory.provider.constructMethod.compareTo = compareTo

    return result
  },
  
  /**
   * @template T
   * @param {(new (...args: any[]) => T) | () => T} constructor 
   * @returns {T}
   */
  inject: <T>(constructor: ProviderConstructor<T>): T => {
    // find once, return same every time after
    return state(() => {
      const config = setUse.memory.providerConfig
      const cm = constructor as ConstructMethod<T>
      const compareTo = cm.compareTo = cm.compareTo || constructor.toString()

      let owner = {
        ownerTagSupport: config.ownerSupport
      } as TagSupport
    
      while(owner.ownerTagSupport) {
        const ownerProviders = owner.ownerTagSupport.global.providers
  
        const provider = ownerProviders.find(provider => {
          const constructorMatch = provider.constructMethod.compareTo === compareTo
          
          if(constructorMatch) {
            return true
          }
        })
  
        if(provider) {
          provider.clone = deepClone(provider.instance) // keep a copy of the latest before any change occur
          config.providers.push(provider)
          return provider.instance
        }
  
        owner = owner.ownerTagSupport // cause reloop checking next parent
      }
      
      const msg = `Could not inject provider: ${constructor.name} ${constructor}`
      console.warn(`${msg}. Available providers`, config.providers)
      throw new Error(msg)  
    })
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
