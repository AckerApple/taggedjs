import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { AnySupport } from '../tag/index.js'
import { SupportTagGlobal } from '../tag/getTemplaterResult.function.js'
import { setUseMemory } from'./setUseMemory.object.js'
import { state } from'./state.function.js'

export type Provider = {
  constructMethod: any
  instance: any
  stateDiff: number
  owner: AnySupport // create at
  children: AnySupport[] // injected into
}

type ProviderConstructor<T> = (new (...args: any[]) => T) | (() => T)

type functionProvider<T> = () => T
type classProvider<T> = new (...args: any[]) => T
type Construct<T> = classProvider<T> | functionProvider<T>
type ConstructMethod<T> = Construct<T> & {
  compareTo: string
}

function getBlankDiffMemory() {
  return {stateDiff: 0, provider: undefined as any as Provider}
}

export const providers = {
  create: <T>(
    constructMethod: Construct<T>
  ): T => {
    const stateDiffMemory = state(getBlankDiffMemory)

    // mimic how many states were called the first time
    if(stateDiffMemory.stateDiff) {
      let x = stateDiffMemory.stateDiff
      while(x--){
        state(undefined)
      }
      const result = state(undefined) as T
      return result
    }

    const result = state(() => {
      const stateConfig = setUseMemory.stateConfig
      const oldStateCount = stateConfig.state.length
      // Providers with provider requirements just need to use providers.create() and providers.inject()
      const instance: T = constructMethod.prototype ? new (constructMethod as classProvider<T>)() : (constructMethod as functionProvider<T>)()
  
      const support = stateConfig.support as AnySupport
      const stateDiff = stateConfig.state.length - oldStateCount
      
      const provider: Provider = {
        constructMethod,
        instance,
        stateDiff,
        owner: support,
        children: [],
      }

      stateDiffMemory.provider = provider
      const context = support.context
      // const global = context.global as SupportTagGlobal
      const providers = context.providers = context.providers || []
      providers.push(provider)
      stateDiffMemory.stateDiff = stateDiff

      return instance
    })

    const cm = constructMethod as ConstructMethod<T>
    const compareTo = cm.compareTo = cm.toString()
    stateDiffMemory.provider.constructMethod.compareTo = compareTo

    return result
  },
  
  /**
   * @template T
   * @param {(new (...args: any[]) => T) | () => T} constructor 
   * @returns {T}
   */
  inject: providerInject
}

function providerInject<T>(constructor: ProviderConstructor<T>): T {
  // find once, return same every time after
  return state(function providerInjectState() {
    // const memory = setUse.memory
    const cm = constructor as ConstructMethod<T>
    const compareTo = cm.compareTo = cm.compareTo || constructor.toString()
    const support =  getSupportInCycle() as AnySupport // memory.stateConfig.support as AnySupport
    const providers: Provider[] = []

    let owner = {
      ownerSupport: support.ownerSupport
    } as AnySupport
  
    while(owner.ownerSupport) {
      const context = owner.ownerSupport.context
      // const ownGlobal = context.global as SupportTagGlobal
      const ownerProviders = context.providers

      if(!ownerProviders) {
        owner = owner.ownerSupport as AnySupport // cause reloop checking next parent
        continue
      }

      const provider = ownerProviders.find(provider => {
        providers.push(provider as Provider)
        const constructorMatch = provider.constructMethod.compareTo === compareTo
        
        if(constructorMatch) {
          return true
        }
      })

      if(provider) {
        const context = support.context
        const providers = context.providers = context.providers || []
        providers.push(provider)
        provider.children.push(support)
        return provider.instance
      }

      owner = owner.ownerSupport as AnySupport // cause reloop checking next parent
    }
    
    const msg = `Could not inject provider: ${constructor.name} ${constructor}`
    console.warn(`${msg}. Available providers`, providers)
    throw new Error(msg)  
  })
}
