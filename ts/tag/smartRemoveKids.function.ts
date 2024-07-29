import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { elementDestroyCheck } from './elementDestroyCheck.function.js'
import { paint, paintRemoves } from './paint.function.js'
import { AnySupport } from './Support.class.js'
import { ContextItem } from './Tag.class.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'

/** sets global.deleted on support and all children */
export function smartRemoveKids(
  support: AnySupport,
  promises: Promise<any>[],
  stagger: number,
) {
  const startStagger = stagger
  const subject = support.subject
  const thisGlobal = subject.global as SupportTagGlobal
  const htmlDomMeta = thisGlobal.htmlDomMeta as DomObjectChildren
  const context = thisGlobal.context as ContextItem[]

  for (const subject of context) {
    const global = subject.global as SupportTagGlobal
    if(global.deleted) {
      continue
    }

    const oldest = global.oldest
    if(oldest) {
      const clones = global.htmlDomMeta as DomObjectChildren
      const cloneOne = clones[0]  
      
      // check and see if child content lives within content of mine
      let count = 0
      if(cloneOne) {
        let domOne = cloneOne.domElement
        let doContinue = false
        while(domOne && domOne.parentNode && count < 5) {
          if(htmlDomMeta.find(x => x.domElement === domOne.parentNode)) {
            doContinue = true
            break // no need to delete, they live within me
          }
  
          domOne = domOne.parentNode as HTMLElement | Text
          ++count
        }

        if(doContinue) {
          continue
        }
      }

      // recurse
      stagger = stagger + smartRemoveKids(oldest, promises, stagger)
    }

    // regular values, no placeholders
    const elm = subject.simpleValueElm
    if(elm) {
      delete subject.simpleValueElm    
      paintRemoves.push(elm)
    }

    global.deleted = true
  }
  
  destroyClones(htmlDomMeta, startStagger, promises)
  
  thisGlobal.deleted = true
  
  return stagger
}

function destroyClones(
  oldClones: DomObjectChildren,
  stagger: number,
  promises: Promise<any>[]
) {
  // check subjects that may have clones attached to them
  const newPromises = oldClones.map(clone => {
    const marker = clone.marker
    if(marker) {
      paintRemoves.push(marker)
    }

    const dom = clone.domElement
    if(!dom) {
      return
    }
  
    return checkCloneRemoval(dom, stagger)
  }).filter(x => x) // only return promises

  if(newPromises.length) {
    promises.push(Promise.all(newPromises))
    return stagger
  }

  return stagger
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
