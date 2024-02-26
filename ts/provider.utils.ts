import { Tag } from "./Tag.class.js"
import { deepClone, deepEqual } from "./deepFunctions.js"
import { Provider } from "./providers.js"

export function providersChangeCheck(tag: Tag) {
  const providersWithChanges = tag.tagSupport.memory.providers.filter(provider =>
    !deepEqual(provider.instance, provider.clone)
  )

  // reset clones
  providersWithChanges.forEach(provider => {
    const appElement = tag.getAppElement()

    handleProviderChanges(appElement, provider)

    provider.clone = deepClone(provider.instance)
  })
}

function handleProviderChanges(
  appElement: Tag,
  provider: Provider,
) {
  const tagsWithProvider = getTagsWithProvider(appElement, provider)

  tagsWithProvider.forEach(({tag, renderCount, provider}) => {
    const notRendered = renderCount === tag.tagSupport.memory.renderCount
    if(notRendered) {
      provider.clone = deepClone(provider.instance)
      tag.tagSupport.render()
    }
  })
}

function getTagsWithProvider(
  tag: Tag,
  provider: Provider,
  memory: {
    tag: Tag
    renderCount: number
    provider: Provider
  }[] = []
) {
  const compare = tag.tagSupport.memory.providers

  const hasProvider = compare.find(
    xProvider => xProvider.constructMethod === provider.constructMethod
  )
  
  if(hasProvider) {
    memory.push({
      tag,
      renderCount: tag.tagSupport.memory.renderCount,
      provider: hasProvider
    })
  }

  tag.children.forEach(child => getTagsWithProvider(child, provider, memory))

  return memory
}
