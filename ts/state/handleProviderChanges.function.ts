import { deepClone } from '../deepFunctions.js'
import { Provider } from './providers.js'
import { renderSupport } from'../tag/render/renderSupport.function.js'
import { Support } from '../tag/Support.class.js'
import { safeRenderSupport } from '../alterProp.function.js'

export function handleProviderChanges(
  appSupport: Support,
  provider: Provider,
) {
  let hadChanged = false
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)
  for (let index = tagsWithProvider.length - 1; index >= 0; --index) {
    const {support, renderCount, provider} = tagsWithProvider[index]
    const global = support.subject.global
    if(global.deleted) {
      continue // i was deleted after another tag processed
    }

    const notRendered = renderCount === global.renderCount
    const locked = global.locked
    if(notRendered && !locked) {
      hadChanged = true
      const newSupport = global.newest as Support
      // provider.clone = deepClone(provider.instance)
      /*
      renderSupport(
        newSupport,
        false,
      )
      */
      safeRenderSupport(newSupport, newSupport.ownerSupport as Support)
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
