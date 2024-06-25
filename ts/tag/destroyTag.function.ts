import { BaseSupport, Support } from './Support.class.js'

export function destroyTagMemory(
  oldSupport: Support | BaseSupport,
) {
  const global = oldSupport.subject.global
  const oldest = global.oldest as Support
  oldest.destroy()
}
