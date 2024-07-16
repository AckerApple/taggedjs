import { Provider } from './providers.js'
import { AnySupport, Support } from '../tag/Support.class.js'
import { safeRenderSupport, safeRenderSupportTwo } from '../alterProp.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'

export function handleProviderChanges(
  appSupport: Support,
  provider: Provider,
  skip: AnySupport,
): TagWithProvider[] {
  let hadChanged = false
  const tagsWithProvider = getTagsWithProvider(appSupport, provider)

  return tagsWithProvider

  /*
  const unlocked = tagsWithProvider.filter(x => x.provider.locked === undefined)
  const supports = unlocked.map(x => {
    x.provider.locked = true
    return x.support
  })
  */

  // renderTagUpdateArray(supports, false)

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
      safeRenderSupportTwo(newSupport, newSupport.ownerSupport as Support)
      continue
    }
  }

  //unlocked.forEach(unlocked => delete unlocked.provider.locked)

  //return hadChanged
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
