import { deepClone, deepEqual } from '../deepFunctions.js'
import { handleProviderChanges } from './handleProviderChanges.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'

export function providersChangeCheck(
  support: Support | BaseSupport
) {
  const global = support.subject.global
  const providersWithChanges = global.providers.filter(provider => !deepEqual(provider.instance, provider.clone))
  let hadChanged = false

  // reset clones
  for (let index = providersWithChanges.length - 1; index >= 0; --index) {
    const provider = providersWithChanges[index]
    const owner = provider.owner

    if(handleProviderChanges(owner, provider)) {
      hadChanged = true
    }

    provider.clone = deepClone(provider.instance)
  }

  return hadChanged
}
