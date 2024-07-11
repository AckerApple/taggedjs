import { deepClone, deepEqual } from '../deepFunctions.js'
import { handleProviderChanges } from './handleProviderChanges.function.js'
import { AnySupport, BaseSupport, Support } from '../tag/Support.class.js'

export function providersChangeCheck(
  support: AnySupport
) {
  const global = support.subject.global
  // const providersWithChanges = global.providers.filter(provider => !deepEqual(provider.instance, provider.clone))
  const providersWithChanges = global.providers // .filter(provider => !deepEqual(provider.instance, provider.clone))
  let hadChanged = false

  // reset clones
  for (const provider of providersWithChanges) {
    const owner = provider.owner
    const hasChange = handleProviderChanges(owner, provider, support)
    
    if(hasChange) {
      hadChanged = true
    }

    // provider.clone = deepClone(provider.instance)
  }

  return hadChanged
}
