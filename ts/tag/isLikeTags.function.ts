import type { StringTag } from './StringTag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport, TagJsComponent } from './index.js'
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

  switch (newTag.tagJsType) {
    case ValueTypes.dom: {
      if(oldTag?.tagJsType !== ValueTypes.dom) {
        return false // newTag is not even same type
      }
  
      return isLikeDomTags(
        newTag as DomTag,
        oldTag as DomTag,
      )
    }

    case ValueTypes.tag: {
      const like = isLikeStringTags(
        newTag as StringTag,
        oldTag as StringTag,
        newSupport,
        oldSupport
      )
      
      return like
    }
  }

  throw new Error(`unknown tagJsType of ${newTag.tagJsType}`)
}

// used when compiler was used
export function isLikeDomTags(
  newTag: DomTag,
  oldTag: DomTag,
) {
  const domMeta0 = newTag.dom
  const domMeta1 = oldTag.dom
  return domMeta0 === domMeta1
}

// used for no compiling
function isLikeStringTags(
  newTag: StringTag,
  oldTag: StringTag,
  newSupport: AnySupport | TagJsComponent<any>, // new
  oldSupport: AnySupport, // previous
) {
  const strings0 = newTag.strings
  const strings1 = oldTag.strings
  if(strings0.length !== strings1.length) {
    return false
  }

  const everyStringMatched = strings0.every((string: string, index: number) =>
    strings1[index].length === string.length // performance, just compare length of strings // TODO: Document this
  )
  if(!everyStringMatched) {
    return false
  }

  const values0 = (newSupport.templater as any).values || newTag.values
  const values1 = (oldSupport.templater as any).values || oldTag.values
  return isLikeValueSets(values0, values1)

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
