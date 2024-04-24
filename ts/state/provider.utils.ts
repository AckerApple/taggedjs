import { Tag } from '../Tag.class'
import { deepClone, deepEqual } from '../deepFunctions'
import { Provider } from './providers'
import { renderTagSupport } from '../renderTagSupport.function'
import { TagSupport } from '../TagSupport.class'

export function providersChangeCheck(
  tagSupport: TagSupport
) {
  const global = tagSupport.global
  const providersWithChanges = global.providers.filter(provider =>
    !deepEqual(provider.instance, provider.clone)
  )

  // reset clones
  providersWithChanges.forEach(provider => {
    const appElement = tagSupport.getAppElement()

    handleProviderChanges(appElement, provider)

    provider.clone = deepClone(provider.instance)
  })
}

function handleProviderChanges(
  appElement: TagSupport,
  provider: Provider,
) {
  const tagsWithProvider = getTagsWithProvider(appElement, provider)

  tagsWithProvider.forEach(({tagSupport, renderCount, provider}) => {
    if(tagSupport.global.deleted) {
      return // i was deleted after another tag processed
    }

    const notRendered = renderCount === tagSupport.global.renderCount
    if(notRendered) {
      provider.clone = deepClone(provider.instance)
      renderTagSupport(
        tagSupport,
        false,
      )
    }
  })
}

function getTagsWithProvider(
  tagSupport: TagSupport,
  provider: Provider,
  memory: TagWithProvider[] = []
) {
  const global = tagSupport.global
  const compare = global.providers
  const hasProvider = compare.find(
    xProvider => xProvider.constructMethod === provider.constructMethod
  )
  
  if(hasProvider) {
    memory.push({
      tagSupport,
      renderCount: global.renderCount,
      provider: hasProvider,
    })
  }

  tagSupport.childTags.forEach(child => getTagsWithProvider(
    child,
    provider,
    memory,
  ))

  return memory
}

type TagWithProvider = {
  tagSupport: TagSupport
  renderCount: number
  provider: Provider,
}
