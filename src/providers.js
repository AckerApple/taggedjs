import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"

export const config = {
  array: [],
  rearray: [],
  /** @type {Tag | undefined} */
  currentTag: undefined,
  /** @type {Tag | undefined} */
  ownerTag: undefined,
}

export const providers = {
  /**
   * @template T
   * @param {(new (...args: any[]) => T) | () => T} constructor 
   * @returns {T}
   */
  create: constructor => {
    const oldValue = config.rearray[config.array.length]
    if(oldValue) {
      config.array.push(oldValue)
      return oldValue.instance // return old value instead
    }

    // Providers with provider requirements just need to use providers.create() and providers.inject()
    const instance = constructor.constructor ? new constructor() : constructor()
    config.array.push({constructorMethod: constructor, instance, clone: deepClone(instance)})
    return instance
  },
  
  /**
   * @template T
   * @param {(new (...args: any[]) => T) | () => T} constructor 
   * @returns {T}
   */
  inject: constructor => {
    const oldValue = config.rearray[config.array.length]
    if(oldValue) {
      config.array.push(oldValue)
      return oldValue.instance // return old value instead
    }

    let owner = {ownerTag: config.ownerTag}
    while(owner.ownerTag) {
      const ownerProviders = owner.ownerTag.providers

      const provider = ownerProviders.find(provider => {
        if(provider.constructorMethod === constructor) {
          return true
        }
      })

      if(provider) {
        provider.clone = deepClone(provider.instance) // keep a copy of the latest before any change occur
        config.array.push(provider)
        return provider.instance
      }

      owner = owner.ownerTag // cause reloop
    }
    
    throw new Error(`Could not inject provider: ${constructor}`)
  }
}
