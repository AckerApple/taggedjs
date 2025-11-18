import { handleProviderChanges, TagWithProvider } from './handleProviderChanges.function.js'
import { AnySupport } from '../tag/index.js'

/** Called when one tag changes and we need to find other tags that will need to be rendered */
export function providersChangeCheck(
  support: AnySupport
): AnySupport[] {
  const context = support.context
  const providers = context.providers
  if( !providers ) {
    return []
  }

  const prosWithChanges = []

  // reset clones
  for (const provider of providers) {
    const owner = provider.owner
    const hasChange = handleProviderChanges(owner, provider)
    prosWithChanges.push(...hasChange.map(mapToSupport))
  }

  return prosWithChanges
}

function mapToSupport(x: TagWithProvider) {
  return x.support
}