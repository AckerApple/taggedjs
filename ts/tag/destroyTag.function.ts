import { BaseTagSupport, TagSupport } from './TagSupport.class.js'

export function destroyTagMemory(
  oldTagSupport: TagSupport | BaseTagSupport,
) {
  // must destroy oldest which is tag with elements on stage
  const oldest = oldTagSupport.global.oldest as TagSupport
  oldest.destroy()

  destroyTagSupportPast(oldTagSupport)
  
  oldTagSupport.global.context = {}
}

export function destroyTagSupportPast(oldTagSupport: TagSupport | BaseTagSupport) {
  delete (oldTagSupport.global as any).oldest // TODO: This appears redundant of oldest.destroy() which clears global already
  delete oldTagSupport.global.newest
}
