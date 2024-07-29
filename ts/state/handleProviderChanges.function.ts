import { Provider } from './providers.js'
import { Support } from '../tag/Support.class.js'
import { TagGlobal } from '../tag/index.js'

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
  const global = support.subject.global as TagGlobal
  memory.push({
    support,
    renderCount: global.renderCount,
    provider,
  })

  const childTags = provider.children
  for (let index = childTags.length - 1; index >= 0; --index) {
    const child = childTags[index]
    const cGlobal = child.subject.global as TagGlobal
    memory.push({
      support: child,
      renderCount: cGlobal.renderCount,
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
