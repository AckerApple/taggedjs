import { deepClone, deepEqual } from '../deepFunctions.js'
import { Provider } from './providers.js'
import { renderTagSupport } from'../tag/render/renderTagSupport.function.js'
import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'

export function providersChangeCheck(
  tagSupport: TagSupport | BaseTagSupport
) {
  const global = tagSupport.global
  const providersWithChanges = global.providers.filter(provider =>
    !deepEqual(provider.instance, provider.clone)
  )

  // reset clones
  for (let index = providersWithChanges.length - 1; index >= 0; --index) {
    const provider = providersWithChanges[index]
    const appSupport = (tagSupport as TagSupport).getAppTagSupport()

    handleProviderChanges(appSupport, provider)

    provider.clone = deepClone(provider.instance)
  }
}

function handleProviderChanges(
  appSupport: TagSupport,
  provider: Provider,
) {
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)

  for (let index = tagsWithProvider.length - 1; index >= 0; --index) {
    const {tagSupport, renderCount, provider} = tagsWithProvider[index]
    if(tagSupport.global.deleted) {
      continue // i was deleted after another tag processed
    }

    const notRendered = renderCount === tagSupport.global.renderCount
    if(notRendered) {
      provider.clone = deepClone(provider.instance)
      renderTagSupport(
        tagSupport.global.newest as TagSupport,
        false,
      )
      continue
    }
  }
}

/** Updates and returns memory of tag providers */
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

  const childTags = tagSupport.childTags
  for (let index = childTags.length - 1; index >= 0; --index) {
    getTagsWithProvider(
      childTags[index],
      provider,
      memory,
    )
  }

  return memory
}

type TagWithProvider = {
  tagSupport: TagSupport
  renderCount: number
  provider: Provider,
}
