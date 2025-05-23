import type { StringTag } from './StringTag.type.js'
import type { Tag } from './Tag.type.js'
import type { DomTag } from './DomTag.type.js'
import { AnySupport } from './AnySupport.type.js'
import { TemplaterResult } from './getTemplaterResult.function.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'

export function isLikeTags(
  support0: AnySupport | StringTag, // new
  support1: AnySupport, // previous
): boolean {
  const templater0 = support0.templater as TemplaterResult | undefined
  const templater1 = support1.templater as TemplaterResult

  const tag0 = templater0?.tag || (support0 as StringTag | DomTag)
  const tag1 = templater1.tag as undefined | StringTag | DomTag // || (support1 as any)

  if(templater0?.tagJsType === ValueTypes.stateRender) {
    return (templater0 as any).dom === (templater1 as any).dom
  }

  switch (tag0.tagJsType) {
    case ValueTypes.dom: {
      if(tag1?.tagJsType !== ValueTypes.dom) {
        return false // tag0 is not even same type
      }
  
      return isLikeDomTags(
        tag0 as DomTag,
        tag1 as DomTag,
      )
    }

    case ValueTypes.tag: {
      const like = isLikeStringTags(
        tag0 as StringTag,
        tag1 as StringTag,
        support0,
        support1
      )
      
      return like
    }
  }

  throw new Error(`unknown tagJsType of ${tag0.tagJsType}`)
}

// used when compiler was used
export function isLikeDomTags(
  tag0: DomTag,
  tag1: DomTag,
) {
  const domMeta0 = tag0.dom
  const domMeta1 = tag1.dom
  return domMeta0 === domMeta1
}

// used for no compiling
function isLikeStringTags(
  tag0: StringTag,
  tag1: StringTag,
  support0: AnySupport | Tag, // new
  support1: AnySupport, // previous
) {
  const strings0 = tag0.strings
  const strings1 = tag1.strings
  if(strings0.length !== strings1.length) {
    return false
  }

  const everyStringMatched = strings0.every((string,index) =>
    strings1[index].length === string.length // performance, just compare length of strings // TODO: Document this
  )
  if(!everyStringMatched) {
    return false
  }

  const values0 = (support0.templater as any).values || tag0.values
  const values1 = (support1.templater as any).values || tag1.values
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
