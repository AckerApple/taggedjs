import { Tag } from '../tag/Tag.class'
import { deepClone, deepEqual } from '../deepFunctions'
import { Provider } from './providers'
import { renderTagSupport } from '../tag/render/renderTagSupport.function'
import { TagSupport } from '../tag/TagSupport.class'

export function providersChangeCheck(
  tagSupport: TagSupport
) {
  const global = tagSupport.global
  const providersWithChanges = global.providers.filter(provider =>
    !deepEqual(provider.instance, provider.clone)
  )

  // reset clones
  providersWithChanges.forEach(provider => {
    const appSupport = tagSupport.getAppTagSupport()

    handleProviderChanges(appSupport, provider)

    provider.clone = deepClone(provider.instance)
  })
}

function handleProviderChanges(
  appSupport: TagSupport,
  provider: Provider,
) {
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)

  tagsWithProvider.forEach(({tagSupport, renderCount, provider}) => {
    if(tagSupport.global.deleted) {
      return // i was deleted after another tag processed
    }

    const notRendered = renderCount === tagSupport.global.renderCount
    if(notRendered) {
      provider.clone = deepClone(provider.instance)
      return renderTagSupport(
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
    xProvider => xProvider.constructMethod.compareTo === provider.constructMethod.compareTo
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
