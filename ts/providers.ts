import { Tag } from './Tag.class'
import { deepClone } from './deepFunctions'
import { BaseTagSupport } from './TagSupport.class'
import { setUse } from './setUse.function'

export type Provider = {
  constructMethod: any
  instance: any
  clone: any
}

type ProviderConstructor<T> = (new (...args: any[]) => T) | (() => T)

// TODO: rename
setUse.memory.providerConfig = {
  providers: [] as Provider[],

  //currentTagSupport: undefined as TagSupport | undefined,
  ownerTag: undefined as Tag | undefined,
}

function get(constructMethod: Function) {
  const config = setUse.memory.providerConfig
  const providers: Provider[] = config.providers
  return providers.find(provider => provider.constructMethod === constructMethod)
}

type functionProvider = <T>() => T
type classProvider = new <T>(...args: any[]) => T

export const providers = {
  create: <T>(
    constructMethod: classProvider | functionProvider
  ): T => {
    const existing = get(constructMethod)
    if(existing) {
      existing.clone = deepClone(existing.instance)
      return existing.instance
    }

    // Providers with provider requirements just need to use providers.create() and providers.inject()
    const instance: T = constructMethod.constructor ? new (constructMethod as classProvider)() : (constructMethod as functionProvider)()
    
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
      ownerTag: config.ownerTag
    } as Tag
  
    while(owner.ownerTag) {
      const ownerProviders = owner.ownerTag.tagSupport.templater.global.providers

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
    
    const msg = `Could not inject provider: ${constructor.name} ${constructor}`
    console.warn(`${msg}. Available providers`, config.providers)
    throw new Error(msg)
  }
}

setUse({ // providers
  beforeRender: (
    tagSupport: BaseTagSupport,
    ownerTag: Tag,
  ) => {
    run(tagSupport, ownerTag)
  },
  beforeRedraw: (
    tagSupport: BaseTagSupport,
    tag: Tag,
  ) => {
    run(tagSupport, tag.ownerTag as Tag)
  },
  afterRender: (
    tagSupport: BaseTagSupport,
    // tag: Tag
  ) => {
    const config = setUse.memory.providerConfig
    tagSupport.templater.global.providers = [...config.providers]
    config.providers.length = 0
  }
})

function run(
  tagSupport: BaseTagSupport,
  ownerTag: Tag,
  // tag: Tag,
) {
  const config = setUse.memory.providerConfig
  // config.currentTagSupport = tagSupport
  
  config.ownerTag = ownerTag
  
  if(tagSupport.templater.global.providers.length) {
    config.providers.length = 0
    config.providers.push(...tagSupport.templater.global.providers)
  }
}