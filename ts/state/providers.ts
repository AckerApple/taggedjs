import { deepClone } from '../deepFunctions.js'
import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'
import { setUse } from'./setUse.function.js'
import { state } from'./state.function.js'

export type Provider = {
  constructMethod: any
  instance: any
  clone: any
  stateDiff: number
}

type ProviderConstructor<T> = (new (...args: any[]) => T) | (() => T)

export type ProviderConfig = {
  providers: Provider[]
  ownerSupport?: TagSupport | BaseTagSupport
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
    const stateDiffMemory = state(() => ({stateDiff: 0, provider: undefined as any as Provider}))

    // mimic how many states were called the first time
    if(stateDiffMemory.stateDiff) {
      for(let x = stateDiffMemory.stateDiff; x > 0; --x){
        state(undefined)
      }
      const result = state(undefined) as T
      // stateDiffMemory.provider.constructMethod.compareTo = compareTo
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

    const cm = constructMethod as ConstructMethod<T>
    // const compareTo = cm.compareTo = cm.compareTo || cm.toString()
    const compareTo = cm.compareTo = cm.toString()
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
    tagSupport: TagSupport | BaseTagSupport,
    ownerSupport?: TagSupport | BaseTagSupport,
  ) => {
    run(tagSupport, ownerSupport)
  },
  beforeRedraw: (
    tagSupport: TagSupport | BaseTagSupport,
    newTagSupport: TagSupport | BaseTagSupport,
  ) => {
    run(tagSupport, (newTagSupport as TagSupport).ownerTagSupport)
  },
  afterRender: (
    tagSupport: TagSupport | BaseTagSupport,
    // tag: Tag
  ) => {
    const config = setUse.memory.providerConfig
    tagSupport.global.providers = [...config.providers]
    config.providers.length = 0
  }
})

function run(
  tagSupport: TagSupport | BaseTagSupport,
  ownerSupport?: TagSupport | BaseTagSupport,
) {
  const config = setUse.memory.providerConfig  
  config.ownerSupport = ownerSupport
  
  if(tagSupport.global.providers.length) {
    config.providers.length = 0
    config.providers.push(...tagSupport.global.providers)
  }
}
