import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { destroyArray } from './destroyArrayContext.function.js'
import { addPaintRemover } from '../render/paint.function.js'
import { ContextItem } from './ContextItem.type.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { AnySupport, SupportContextItem } from './index.js'
import { destroyHtmlDomMeta } from './destroyHtmlDomMeta.function.js'

/** sets global.deleted on support and all children */
export function smartRemoveKids(
  context: SupportContextItem,
  allPromises: Promise<any>[]
) {
  const subContexts = context.contexts

  smartRemoveByContext(subContexts, allPromises)
  destroyContextHtml(context)
}

export function destroyContextHtml(context: ContextItem) {
  destroyHtmlDomMeta(context.htmlDomMeta as DomObjectChildren)
}

function smartRemoveByContext(
  contexts: ContextItem[],
  allPromises: Promise<any>[],
) {
  for (const context of contexts) {
    if(context.withinOwnerElement) {
      const tagJsVar = context.tagJsVar as TagJsVar
      
      if( tagJsVar && tagJsVar.tagJsType === 'host' ) {
        const newest = (context as any).supportOwner as AnySupport
        tagJsVar.destroy(context, newest)
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

    subGlobal.deleted = true
    const oldest = (context as SupportContextItem).state?.oldest
    if(oldest) {
      smartRemoveKids(context as SupportContextItem, allPromises)
      continue
    }
  }
}
