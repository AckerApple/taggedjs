import { handleProviderChanges } from './handleProviderChanges.function.js'
import { AnySupport } from '../tag/Support.class.js'
import { SupportTagGlobal } from '../tag/TemplaterResult.class.js'

export function providersChangeCheck(
  support: AnySupport
): AnySupport[] {
  const global = support.subject.global as SupportTagGlobal
  const providers = global.providers // .filter(provider => !deepEqual(provider.instance, provider.clone))

  if(!providers) {
    return []
  }

  const prosWithChanges = []

  // reset clones
  for (const provider of providers) {
    const owner = provider.owner
    const hasChange = handleProviderChanges(owner, provider)
    prosWithChanges.push(...hasChange.map(x => x.support))    
  }

  return prosWithChanges
}
