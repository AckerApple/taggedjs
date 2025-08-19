import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { destroyArray } from './destroyArrayContext.function.js'
import { addPaintRemover } from '../render/paint.function.js'
import { ContextItem } from './ContextItem.type.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { AnySupport, SupportContextItem } from './index.js'

/** sets global.deleted on support and all children */
export function smartRemoveKids(
  context: SupportContextItem,
  allPromises: Promise<any>[]
) {
  const global: SupportTagGlobal = context.global
  const subContexts = context.contexts

  smartRemoveByContext(subContexts, allPromises)
  destroyClones(global)
}

function smartRemoveByContext(
  contexts: ContextItem[],
  allPromises: Promise<any>[],
) {
  for (const context of contexts) {
    /*
    if( context.locked ) {
      continue
    }
*/
    if(context.withinOwnerElement) {
      const tagJsVar = context.tagJsVar as TagJsVar
      if( tagJsVar && tagJsVar.tagJsType === 'host' ) {
        const newest = (context as any).supportOwner as AnySupport
        tagJsVar.delete(context, newest)
      }

      continue // i live within my owner variable. I will be deleted with owner
    }

    const lastArray = context.lastArray
    if(lastArray) {
      destroyArray(context, lastArray)
      continue
    }

    // regular values, no placeholders
    const elm = context.simpleValueElm as Text
    if(elm) {
      delete context.simpleValueElm
      addPaintRemover(elm)
      continue
    }

    const subGlobal = context.global as SupportTagGlobal
    if(subGlobal === undefined) {
      continue // context
    }

    /*
    if(subGlobal.deleted === true) {
      continue // already deleted
    }
    */

    subGlobal.deleted = true
    const oldest = (context as SupportContextItem).state?.oldest
    if(oldest) {
      smartRemoveKids(context as SupportContextItem, allPromises)
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

    addPaintRemover(dom, 'destroyClone')
}
