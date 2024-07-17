import { Provider } from './providers.js'
import { Support } from '../tag/Support.class.js'

export function handleProviderChanges(
  appSupport: Support,
  provider: Provider,
): TagWithProvider[] {
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)

  return tagsWithProvider
}

/** Updates and returns memory of tag providers */
function getTagsWithProvider(
  support: Support,
  provider: Provider,
  memory: TagWithProvider[] = []
): TagWithProvider[] {
  memory.push({
    support,
    renderCount: support.subject.global.renderCount,
    provider,
  })

  const childTags = provider.children
  for (let index = childTags.length - 1; index >= 0; --index) {
    const child = childTags[index]
    memory.push({
      support: child,
      renderCount: child.subject.global.renderCount,
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
