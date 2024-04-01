import { Tag } from './Tag.class'
import { deepClone, deepEqual } from './deepFunctions'
import { Provider } from './providers'
import { renderTagSupport } from './renderTagSupport.function'

export function providersChangeCheck(tag: Tag) {
  const providersWithChanges = tag.tagSupport.templater.global.providers.filter(provider =>
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
    const notRendered = renderCount === tag.tagSupport.templater.global.renderCount
    if(notRendered) {
      provider.clone = deepClone(provider.instance)
      renderTagSupport(
        tag.tagSupport,
        false,
      )
    }
  })
}

function getTagsWithProvider(
  tag: Tag,
  provider: Provider,
  memory: {
    tag: Tag
    renderCount: number
    provider: Provider,
  }[] = []
) {
  const compare = tag.tagSupport.templater.global.providers

  const hasProvider = compare.find(
    xProvider => xProvider.constructMethod === provider.constructMethod
  )
  
  if(hasProvider) {
    memory.push({
      tag,
      renderCount: tag.tagSupport.templater.global.renderCount,
      provider: hasProvider,
    })
  }

  tag.childTags.forEach(child => getTagsWithProvider(
    child,
    provider,
    memory,
  ))

  return memory
}
