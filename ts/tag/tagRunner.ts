import { BaseSupport, Support } from './Support.class.js'
import { setUse } from'../state/index.js'
import { Subject } from'../subject/index.js'
import { getSupportInCycle } from'./getSupportInCycle.function.js'

// Emits event at the end of a tag being rendered. Use tagClosed$.toPromise() to render a tag after a current tag is done rendering
setUse.memory.tagClosed$ = new Subject<Support>(undefined, subscription => {
  if( !getSupportInCycle() ) {
    subscription.next() // we are not currently processing so process now
  }
})

// Life cycle 1
export function runBeforeRender(
  support: BaseSupport | Support,
  ownerSupport?: Support,
) {
  const tagUse = setUse.tagUse
  const length = tagUse.length
  for (let index=0; index < length; ++index) {
    tagUse[index].beforeRender(support, ownerSupport)
  }
}

// Life cycle 2
export function runAfterRender(
  support: BaseSupport | Support,
  ownerSupport?: Support | BaseSupport,
) {
  const tagUse = setUse.tagUse
  const length = tagUse.length
  for (let index=0; index < length; ++index) {
    tagUse[index].afterRender(support, ownerSupport)
  }

  setUse.memory.tagClosed$.next(ownerSupport)
}

// Life cycle 3
export function runBeforeRedraw(
  support: BaseSupport | Support,
  ownerSupport: Support | BaseSupport,
) {
  const tagUse = setUse.tagUse
  const length = tagUse.length
  for (let index=0; index < length; ++index) {
    tagUse[index].beforeRedraw(support, ownerSupport)
  }
}

// Life cycle 4 - end of life
export function runBeforeDestroy(
  support: Support | BaseSupport,
  ownerSupport: Support | BaseSupport,
) {
  const tagUse = setUse.tagUse
  const length = tagUse.length
  for (let index=0; index < length; ++index) {
    tagUse[index].beforeDestroy(support as BaseSupport, ownerSupport as Support)
  }

  support.subject.global.deleted = true
  support.hasLiveElements = false

  // remove me from my parents
  if(ownerSupport) {
    ownerSupport.subject.global.childTags = ownerSupport.subject.global.childTags.filter(child => child !== support.subject.global.oldest as unknown as Support)

    const global = support.subject.global
    global.providers.forEach(provider => provider.children.forEach((child, index) => {
      if(child.subject.global === global) {
        provider.children.splice(index, 1)
      }
    }))
  }
}
