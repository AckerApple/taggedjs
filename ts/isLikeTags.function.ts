import { Tag } from "./Tag.class"
import { TagSupport } from "./TagSupport.class"
import { TemplaterResult } from "./TemplaterResult.class"

export function isLikeTags(
  tagSupport0: TagSupport | Tag, // new
  tagSupport1: TagSupport, // previous
): Boolean {
  const templater0 = tagSupport0.templater as TemplaterResult | undefined
  const templater1 = tagSupport1.templater as TemplaterResult
  
  const tag0 = templater0?.tag || (tagSupport0 as Tag)
  const tag1 = templater1.tag as Tag

  const strings0 = tag0.strings
  const strings1 = tagSupport1.strings || tag1.strings
  if(strings0.length !== strings1.length) {
    return false
  }

  const everyStringMatched = strings0.every((string,index) => strings1[index] === string)
  if(!everyStringMatched) {
    return false
  }

  const values0 = tagSupport0.values || tag0.values
  const values1 = tagSupport1.values || tag1.values
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
