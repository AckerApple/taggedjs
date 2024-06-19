import { Tag, Dom } from './Tag.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { BaseSupport, Support } from './Support.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { deepEqual } from '../deepFunctions.js'

export function isLikeTags(
  support0: BaseSupport | Support | Tag, // new
  support1: Support | BaseSupport, // previous
): Boolean {
  const templater0 = support0.templater as TemplaterResult | undefined
  const templater1 = support1.templater as TemplaterResult
  
  // TODO: turn this on
  /*
  if(templater0 === templater1) {
    return true
  }
  */

  const tag0 = templater0?.tag || (support0 as Tag | Dom)
  const tag1 = templater1.tag as Tag | Dom
  if(tag0.tagJsType !== tag1.tagJsType) {
    return false
  }

  if(tag0.tagJsType === ValueTypes.dom) {
    return isLikeDomTags(
      tag0 as Dom,
      tag1 as Dom,
      support0,
      support1
    )
  }

  return isLikeStringTags(
    tag0 as Tag,
    tag1 as Tag,
    support0,
    support1
  )
}

function isLikeDomTags(
  tag0: Dom,
  tag1: Dom,
  support0: BaseSupport | Support | Tag, // new
  support1: Support | BaseSupport, // previous
) {
  const dom0 = tag0.dom
  const dom1 = tag1.dom

  if(dom0 !== dom1) {
    const equal = deepEqual(tag0.dom, tag1.dom)
    if(!equal) {
      return false
    }
  }

  const values0 = support0.values || tag0.values
  const values1 = support1.values || tag1.values
  return isLikeValueSets(values0, values1)
}

function isLikeStringTags(
  tag0: Tag,
  tag1: Tag,
  support0: BaseSupport | Support | Tag, // new
  support1: Support | BaseSupport, // previous
) {
  const strings0 = tag0.strings
  const strings1 = tag1.strings || support1.strings
  if(strings0.length !== strings1.length) {
    return false
  }

  const everyStringMatched = strings0.every((string,index) =>
    strings1[index].length === string.length // performance, just compare length of strings // TODO: Document this
    // strings1[index] === string // slower
  )
  if(!everyStringMatched) {
    return false
  }

  const values0 = support0.values || tag0.values
  const values1 = support1.values || tag1.values
  return isLikeValueSets(values0, values1)

}

export function isLikeValueSets(values0:any[], values1:any[]) {
  const valuesLengthsMatch = values0.length === values1.length
  if(!valuesLengthsMatch) {
    return false
  }

  const allVarsMatch = values1.every((value, index)=> {
    const compareTo = values0[index]
    const isFunctions = value instanceof Function && compareTo instanceof Function
    
    if(isFunctions) {
      const stringMatch = value.toString() === compareTo.toString()
      if(stringMatch) {
        return true
      }

      return false
    }

    return true // deepEqual(value, compareTo)
  })

  if(allVarsMatch) {
    return true
  }

  return false
}
