import { deepClone } from '../deepFunctions.js'
import { Provider } from './providers.js'
import { renderSupport } from'../tag/render/renderSupport.function.js'
import { Support } from '../tag/Support.class.js'

export function handleProviderChanges(
  appSupport: Support,
  provider: Provider,
) {
  let hadChanged = false
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)
  for (let index = tagsWithProvider.length - 1; index >= 0; --index) {
    const {support, renderCount, provider} = tagsWithProvider[index]
    if(support.subject.global.deleted) {
      continue // i was deleted after another tag processed
    }

    const notRendered = renderCount === support.subject.global.renderCount
    if(notRendered) {
      hadChanged = true
      provider.clone = deepClone(provider.instance)
      renderSupport(
        support.subject.global.newest as Support, // support, // support.subject.global.newest as Support,
        false,
      )
      continue
    }
  }
  return hadChanged
}

/** Updates and returns memory of tag providers */
function getTagsWithProvider(
  support: Support,
  provider: Provider,
  memory: TagWithProvider[] = []
) {
  memory.push({
    support,
    renderCount: support.subject.global.renderCount,
    provider,
  })

  const childTags = provider.children
  for (let index = childTags.length - 1; index >= 0; --index) {
    memory.push({
      support: childTags[index],
      renderCount: childTags[index].subject.global.renderCount,
      provider,
    })
  }

  return memory
}

type TagWithProvider = {
  support: Support
  renderCount: number
  provider: Provider,
}
