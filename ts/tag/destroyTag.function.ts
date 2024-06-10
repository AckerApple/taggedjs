import { BaseSupport, Support } from './Support.class.js'

export function destroyTagMemory(
  oldSupport: Support | BaseSupport,
) {
  // must destroy oldest which is tag with elements on stage
  const oldest = oldSupport.subject.global.oldest as Support
  oldest.destroy()
  
  oldSupport.subject.global.context = {}
}
