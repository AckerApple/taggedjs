import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { destroyArray } from './checkDestroyPrevious.function.js'
import { addPaintRemover } from '../render/paint.function.js'
import { ContextItem } from './ContextItem.type.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { AnySupport } from './index.js'

/** sets global.deleted on support and all children */
export function smartRemoveKids(
  global: SupportTagGlobal,
  allPromises: Promise<any>[]
) {
  const context = global.contexts as ContextItem[]

  smartRemoveByContext(context, allPromises)
  destroyClones(global)
}

function smartRemoveByContext(
  context: ContextItem[],
  allPromises: Promise<any>[],
) {
  for (const subject of context) {
    if( subject.locked ) {
      continue
    }

    if(subject.withinOwnerElement) {
      const tagJsVar = subject.tagJsVar as TagJsVar
      if( tagJsVar && tagJsVar.tagJsType === 'host' ) {
        const newest = (subject as any).supportOwner as AnySupport
        tagJsVar.delete(subject, newest)
      }

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
      addPaintRemover(elm)
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
  for (let index = htmlDomMeta.length - 1; index >= 0; --index) {
	  const clone = htmlDomMeta[index]
    destroyClone(clone)
    htmlDomMeta.splice(index, 1)
  }
}

function destroyClone(
  clone: DomObjectText | DomObjectElement
) {
    const marker = clone.marker
    if(marker) {
      addPaintRemover(marker)
    }

    const dom = clone.domElement
    if(!dom) {
      return
    }

    addPaintRemover(dom)
}
