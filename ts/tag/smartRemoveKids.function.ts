import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { destroyArray } from './checkDestroyPrevious.function.js'
import { paint, paintRemoves } from './paint.function.js'
import { AnySupport } from './Support.class.js'
import { ContextItem } from './Context.types.js'
import {SupportTagGlobal } from './TemplaterResult.class.js'

/** sets global.deleted on support and all children */
export function smartRemoveKids(
  support: AnySupport,
) {
  const subject = support.subject
  const global = subject.global as SupportTagGlobal
  const htmlDomMeta = global.htmlDomMeta as DomObjectChildren
  const context = global.context as ContextItem[]
  global.deleted = true

  const destroys = global.destroys
  if( destroys ) {
    const promises: any[] = []

    destroys.forEach(destroy => {
      const maybePromise = destroy()
      const isPromise = maybePromise instanceof Promise

      
      if( isPromise ) {
        promises.push(maybePromise)
      }
    })

    // run destroy animations
    Promise.all(promises)
      .then(() => {
        // continue to remove as planned
        smartRemoveByContext(context)
        destroyClones(htmlDomMeta)
        paint()
      })

    return
  }

  smartRemoveByContext(context)
  destroyClones(htmlDomMeta)
}

function smartRemoveByContext(
  context: ContextItem[],
) {
  for (const subject of context) {
    if(subject.withinOwnerElement) {
      continue // i live within my owner variable. I will be deleted with owner
    }

    const lastArray = subject.lastArray
    if(lastArray) {
      destroyArray(subject, lastArray)
      continue
    }

    // regular values, no placeholders
    const elm = subject.simpleValueElm
    if(elm) {
      delete subject.simpleValueElm    
      paintRemoves.push(elm)
      continue
    }


    const subGlobal = subject.global as SupportTagGlobal
    if(subGlobal === undefined) {
      continue // subject
    }

    if(subGlobal.deleted === true) {
      continue // already deleted
    }

    subGlobal.deleted = true
    const oldest = subGlobal.oldest
    if(oldest) {
      smartRemoveKids(oldest)
      continue
    }
  }
}

function destroyClones(
  oldClones: DomObjectChildren,
) {
  // check subjects that may have clones attached to them
  oldClones.forEach(clone => {
    const marker = clone.marker
    if(marker) {
      paintRemoves.push(marker)
    }

    const dom = clone.domElement
    if(!dom) {
      return
    }
  
    paintRemoves.push(dom)
  })
}
