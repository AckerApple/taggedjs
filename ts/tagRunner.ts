// TODO: This should be more like `new TaggedJs().use({})`

import { BaseTagSupport, TagSupport } from './TagSupport.class'
import { setUse } from './state'
import { Subject } from './subject'

// Emits event at the end of a tag being rendered. Use tagClosed$.toPromise() to render a tag after a current tag is done rendering
export const tagClosed$ = new Subject<TagSupport>(undefined, subscription => {
  if( !isInCycle() ) {
    subscription.next() // we are not currently processing so process now
  }
})

export function isInCycle() {
  return setUse.memory.stateConfig.rearray
}

// Life cycle 1
export function runBeforeRender(
  tagSupport: BaseTagSupport,
  ownerSupport?: TagSupport,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, ownerSupport))
}

// Life cycle 2
export function runAfterRender(
  tagSupport: BaseTagSupport,
  ownerTagSupport: TagSupport,
) {
  setUse.tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, ownerTagSupport))
  tagClosed$.next(ownerTagSupport)
}

// Life cycle 3
export function runBeforeRedraw(
  tagSupport: BaseTagSupport,
  ownerTagSupport: TagSupport,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, ownerTagSupport))
}

// Life cycle 4 - end of life
export function runBeforeDestroy(
  tagSupport: BaseTagSupport,
  ownerTagSupport: TagSupport,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, ownerTagSupport))
}
