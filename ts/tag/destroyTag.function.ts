import { destroySupport } from './destroySupport.function.js'
import { BaseSupport, Support } from './Support.class.js'

export function destroyTagMemory(
  oldSupport: Support | BaseSupport,
) {
  const subject = oldSupport.subject
  const global = subject.global
  const oldest = global.oldest as Support
  destroySupport(oldest)
}
