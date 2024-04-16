import { Tag } from '../Tag.class'
import { deepClone, deepEqual } from '../deepFunctions'
import { Provider } from './providers'
import { renderTagSupport } from '../renderTagSupport.function'

export function providersChangeCheck(tag: Tag) {
  const global = tag.tagSupport.templater.global
  const providersWithChanges = global.providers.filter(provider =>
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
    if(tag.tagSupport.templater.global.deleted) {
      return // i was deleted after another tag processed
    }

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
  memory: TagWithProvider[] = []
) {
  const global = tag.tagSupport.templater.global
  const compare = global.providers
  const hasProvider = compare.find(
    xProvider => xProvider.constructMethod === provider.constructMethod
  )
  
  if(hasProvider) {
    memory.push({
      tag,
      renderCount: global.renderCount,
      provider: hasProvider,
    })
  }

  tag.childTags.forEach(child => getTagsWithProvider(
    child,
    provider,
    memory,
  ))

  memory.forEach(({tag}) => {
    if(tag.tagSupport.templater.global.deleted) {
      throw new Error('do not get here - 0')
    }
  })

  return memory
}

type TagWithProvider = {
  tag: Tag
  renderCount: number
  provider: Provider,
}
