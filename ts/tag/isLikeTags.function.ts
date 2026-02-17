import type { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport, SupportContextItem, TagJsComponent } from './index.js'
import { TemplaterResult } from './getTemplaterResult.function.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'

export function isLikeTags(
  newSupport: AnySupport | StringTag, // new
  oldSupport: AnySupport, // previous
): boolean {
  const isLike = isLikeBaseTags(newSupport, oldSupport)

  // is this perhaps an outerHTML compare?      
  if(!isLike && oldSupport.templater.tag?._innerHTML) {
    if( isLikeBaseTags((newSupport as any).outerHTML, oldSupport) ) {
      return true
    }
  }

  return isLike
}

/** @deprecated */
function isLikeBaseTags(
    newSupport: AnySupport | StringTag, // new
    oldSupport: AnySupport, // previous
  ): boolean {
  const templater0 = newSupport.templater as TemplaterResult | undefined
  const templater1 = oldSupport.templater as TemplaterResult

  const newTag = templater0?.tag || (newSupport as StringTag | DomTag)
  const oldTag = templater1.tag as undefined | StringTag | DomTag // || (oldSupport as any)

  if(templater0?.tagJsType === ValueTypes.stateRender) {
    return (templater0 as any).dom === (templater1 as any).dom
  }

  if(
    !oldTag &&
    !(newTag as any as SupportContextItem).returnValue
  ) {
    return true
  }

  if(!(newTag as any as SupportContextItem).returnValue) {
    return false
  }

  throw new Error(`unknown tagJsType of ${newTag.tagJsType}`)
}

export function isLikeValueSets(values0:any[], values1:any[]) {
  const valuesLengthsMatch = values0.length === values1.length
  if(!valuesLengthsMatch) {
    return false
  }

  const allVarsMatch = values1.every(function isEveryValueAlike(value, index) {
    const compareTo = values0[index]
    const isFunctions = typeof(value) === BasicTypes.function && typeof(compareTo) === BasicTypes.function
    
    if(isFunctions) {
      const stringMatch = value.toString() === compareTo.toString()
      if(stringMatch) {
        return true
      }

      return false
    }

    return true
  })

  if(allVarsMatch) {
    return true
  }

  return false
}
