import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { DestroyOptions } from './destroy.support.js'
import { elementDestroyCheck } from './elementDestroyCheck.function.js'
import { paint, paintRemoves } from './paint.function.js'
import { AnySupport } from './Support.class.js'

export function smartRemoveKids(
  support: AnySupport,
  promises: Promise<any>[],
  options: DestroyOptions = {
    stagger: 0,
  },
) {
  const startStagger = options.stagger
  const thisGlobal = support.subject.global
  const htmlDomMeta = thisGlobal.htmlDomMeta as DomObjectChildren
      
  thisGlobal.context.forEach(subject => {
    const global = subject.global
    const oldest = global.oldest
    
    if(oldest) {
      const clones = global.htmlDomMeta as DomObjectChildren
      const cloneOne = clones[0]  
      
      // check and see if child content lives within content of mine
      let count = 0
      if(cloneOne) {
        let domOne = cloneOne.domElement
        while(domOne && domOne.parentNode && count < 5) {
          if(htmlDomMeta.find(x => x.domElement === domOne.parentNode)) {
            return // no need to delete, they live within me
          }
  
          domOne = domOne.parentNode as HTMLElement | Text
          ++count
        }
      }

      // recurse
      options.stagger = options.stagger + smartRemoveKids(oldest, promises, options)
    }

    // regular values, no placeholders
    const elm = global.simpleValueElm
    if(elm) {
      delete global.simpleValueElm
      paintRemoves.push(elm)
      return
    }
  })
  
  destroyClones(htmlDomMeta, {stagger: startStagger}, promises)
  
  thisGlobal.htmlDomMeta = []
  thisGlobal.childTags = []
  
  return options.stagger
}

function destroyClones(
  oldClones: DomObjectChildren,
  options: DestroyOptions = {
    stagger: 0,
  },
  promises: Promise<any>[]
) {
  // check subjects that may have clones attached to them
  const newPromises = oldClones.map(clone => {
    const marker = clone.marker
    if(marker) {
      paintRemoves.push(marker)
    }

    if(!clone.domElement) {
      return
    }

    return checkCloneRemoval(clone.domElement, options.stagger)
  }).filter(x => x) // only return promises

  if(newPromises.length) {
    promises.push(Promise.all(newPromises))
    return options.stagger
  }

  return options.stagger
}

/** Reviews elements for the presences of ondestroy */
function checkCloneRemoval(
  clone: Element | Text | ChildNode,
  stagger: number,
) {
  const customElm = clone as any
  if( customElm.ondestroy ) {
    const promise = elementDestroyCheck(customElm, stagger)

    if(promise instanceof Promise) {
      return promise.then(() => {
        paintRemoves.push(clone)
        paint()
      })
    }
  }

  paintRemoves.push(clone)
}
