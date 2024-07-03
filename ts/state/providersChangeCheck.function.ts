import { deepClone, deepEqual } from '../deepFunctions.js'
import { handleProviderChanges } from './handleProviderChanges.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'

export function providersChangeCheck(
  support: Support | BaseSupport
) {
  const global = support.subject.global
  // const providersWithChanges = global.providers.filter(provider => !deepEqual(provider.instance, provider.clone))
  const providersWithChanges = global.providers // .filter(provider => !deepEqual(provider.instance, provider.clone))
  let hadChanged = false

  // reset clones
  for (const provider of providersWithChanges) {
    const owner = provider.owner

    if(handleProviderChanges(owner, provider)) {
      hadChanged = true
    }

    // provider.clone = deepClone(provider.instance)
  }

  return hadChanged
}
