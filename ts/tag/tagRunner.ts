import { AnySupport, BaseSupport, Support } from './Support.class.js'
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
  support: AnySupport,
  ownerSupport?: AnySupport,
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
  runBeforeChildDestroy(support, ownerSupport)

  // remove me from my parents
  if(ownerSupport) {
    const global = support.subject.global
    const providers = global.providers
    if(providers) {
      providers.forEach(provider => provider.children.forEach((child, index) => {
        if(child.subject.global === global) {
          provider.children.splice(index, 1)
        }
      }))
    }
  }
}

// Life cycle 5 - end of life for child
export function runBeforeChildDestroy(
  support: Support | BaseSupport,
  ownerSupport: Support | BaseSupport,
) {
  support.subject.global.deleted = true

  const tagUse = setUse.tagUse
  const length = tagUse.length
  for (let index=0; index < length; ++index) {
    tagUse[index].beforeDestroy(support as BaseSupport, ownerSupport as Support)
  }

}
