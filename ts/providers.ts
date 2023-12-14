import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"

export type Provider = {
  constructMethod: any
  instance: any
  clone: any
}

export const config = {
  providers: [] as Provider[],

  currentTag: undefined as Tag | undefined,
  ownerTag: undefined as Tag | undefined,
}

function get(constructMethod: Function) {
  return config.providers.find(provider => provider.constructMethod === constructMethod)
}

export const providers = {
  /**
   * @template T
   * @param {(new (...args: any[]) => T) | () => T} constructor 
   * @returns {T}
   */
  create: (constructMethod: any) => {
    const existing = get(constructMethod)
    if(existing) {
      existing.clone = deepClone(existing.instance)
      return existing.instance
    }

    // Providers with provider requirements just need to use providers.create() and providers.inject()
    const instance = constructMethod.constructor ? new constructMethod() : constructMethod()
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
  inject: (constructor: any) => {
    const oldValue = get(constructor)
    if(oldValue) {
      return oldValue.instance
    }

    let owner = {
      ownerTag: config.ownerTag
    } as Tag
    while(owner.ownerTag) {
      const ownerProviders = owner.ownerTag.providers

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

      owner = owner.ownerTag // cause reloop
    }
    
    const msg = `Could not inject provider: ${constructor}`
    console.warn(`${msg}. Available providers`, config.providers)
    throw new Error(msg)
  }
}
