import { BaseSupport, Support } from './Support.class.js'

export function destroyTagMemory(
  oldSupport: Support | BaseSupport,
) {
  const global = oldSupport.subject.global
  // must destroy oldest which is tag with elements on stage
  const oldest = global.oldest as Support
  oldest.destroy()
  
  oldSupport.subject.global.context = []
}
