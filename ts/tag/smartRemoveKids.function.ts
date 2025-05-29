import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { destroyArray } from './checkDestroyPrevious.function.js'
import { paint, paintCommands, painting, paintRemover } from '../render/paint.function.js'
import { ContextItem } from './ContextItem.type.js'
import {SupportTagGlobal } from './getTemplaterResult.function.js'

/** sets global.deleted on support and all children */
export function smartRemoveKids(
  global: SupportTagGlobal,
  allPromises: Promise<any>[]
) {
  const context = global.context as ContextItem[]
  
  // already set
  // global.deleted = true

  const destroys = global.destroys
  if( destroys ) {
    return processContextDestroys(destroys, global, allPromises)
  }

  smartRemoveByContext(context, allPromises)
  destroyClones(global)
}

const promises: any[] = []
function destroyCall(destroy: () => any) {
  const maybePromise = destroy()
  const isPromise = maybePromise instanceof Promise


  if (isPromise) {
    promises.push(maybePromise)
  }
}

// Elements that have a destroy or ondestroy attribute
function processContextDestroys(
  destroys: (() => any)[],
  global: SupportTagGlobal,
  allPromises: Promise<any>[],
) {
  promises.length = 0
  destroys.forEach(destroyCall)

  if(promises.length) {
    const lastPromise = Promise.all(promises)
      .then(() => {
        ++painting.locks
        
        // continue to remove
        smartRemoveByContext(global.context, allPromises)
        destroyClones(global)
        
        --painting.locks

        paint()
      })

    // run destroy animations
    allPromises.push(lastPromise)
    
    return
  }

  ++painting.locks

  smartRemoveByContext(global.context, allPromises)
  destroyClones(global)

  --painting.locks
  
  paint()
}

function smartRemoveByContext(
  context: ContextItem[],
  allPromises: Promise<any>[],
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
    const elm = subject.simpleValueElm as Text
    if(elm) {
      delete subject.simpleValueElm
      paintCommands.push([paintRemover, [elm]])
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
      smartRemoveKids(subGlobal, allPromises)
      continue
    }
  }
}

/** Destroy dom elements and dom space markers */
function destroyClones(
  global: SupportTagGlobal,
) {
  const htmlDomMeta = global.htmlDomMeta as DomObjectChildren
  
  // check subjects that may have clones attached to them
  htmlDomMeta.forEach(destroyClone)
}

function destroyClone(clone: DomObjectText | DomObjectElement) {
    const marker = clone.marker
    if(marker) {
      paintCommands.push([paintRemover, [marker]])
    }

    const dom = clone.domElement
    if(!dom) {
      return
    }

    paintCommands.push([paintRemover, [dom]])
}
