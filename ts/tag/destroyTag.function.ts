import { BaseTagSupport, TagSupport } from './TagSupport.class.js'

export function destroyTagMemory(
  oldTagSupport: TagSupport | BaseTagSupport,
) {
  // must destroy oldest which is tag with elements on stage
  const oldest = oldTagSupport.global.oldest as TagSupport
  oldest.destroy()
  
  oldTagSupport.global.context = {}
}
