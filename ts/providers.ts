import { Tag } from "./Tag.class.js"
import { deepClone } from "./deepFunctions.js"
import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./setUse.function.js"

export type Provider = {
  constructMethod: any
  instance: any
  clone: any
}

// TODO: rename
setUse.memory.providerConfig = {
  providers: [] as Provider[],

  currentTagSupport: undefined as TagSupport | undefined,
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
  inject: (constructor: any) => {
    const oldValue = get(constructor)
    if(oldValue) {
      return oldValue.instance
    }

    const config = setUse.memory.providerConfig
    let owner = {
      ownerTag: config.ownerTag
    } as Tag
  
    while(owner.ownerTag) {
      const ownerProviders = owner.ownerTag.tagSupport.memory.providers

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
    tagSupport: TagSupport,
    ownerTag: Tag,
  ) => {
    run(tagSupport, ownerTag)
  },
  beforeRedraw: (
    tagSupport: TagSupport,
    tag: Tag,
  ) => {
    run(tagSupport, tag.ownerTag as Tag)
  },
  afterRender: (
    tagSupport: TagSupport,
    // tag: Tag
  ) => {
    const config = setUse.memory.providerConfig
    tagSupport.memory.providers = [...config.providers]
    config.providers.length = 0
  }
})

function run(
  tagSupport: TagSupport,
  ownerTag: Tag,
  // tag: Tag,
) {
  const config = setUse.memory.providerConfig
  config.currentTagSuport = tagSupport
  
  config.ownerTag = ownerTag
  
  if(tagSupport.memory.providers.length) {
    config.providers.length = 0
    config.providers.push(...tagSupport.memory.providers)
  }
}