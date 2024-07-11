import { Provider } from './providers.js'
import { AnySupport, Support } from '../tag/Support.class.js'
import { safeRenderSupport } from '../alterProp.function.js'

export function handleProviderChanges(
  appSupport: Support,
  provider: Provider,
  skip: AnySupport,
) {
  let hadChanged = false
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)
  for (let index = tagsWithProvider.length - 1; index >= 0; --index) {
    const {support, renderCount, provider} = tagsWithProvider[index]
    const global = support.subject.global

    if(skip.subject.global === global) {
      continue
    }

    if(global.deleted) {
      continue // i was deleted after another tag processed
    }

    const notRendered = renderCount === global.renderCount
    const locked = global.locked
    const render = notRendered && !locked
    
    if(render) {
      hadChanged = true
      const newSupport = global.newest as Support
      // provider.clone = deepClone(provider.instance)
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
