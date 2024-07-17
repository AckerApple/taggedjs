import { handleProviderChanges } from './handleProviderChanges.function.js'
import { AnySupport } from '../tag/Support.class.js'

export function providersChangeCheck(
  support: AnySupport
): AnySupport[] {
  const global = support.subject.global
  const providersWithChanges = global.providers // .filter(provider => !deepEqual(provider.instance, provider.clone))
  const prosWithChanges = []

  // reset clones
  for (const provider of providersWithChanges) {
    const owner = provider.owner
    const hasChange = handleProviderChanges(owner, provider)
    prosWithChanges.push(...hasChange.map(x => x.support))    
  }

  return prosWithChanges
}
