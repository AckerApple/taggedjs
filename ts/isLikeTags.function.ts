import { Tag } from "./Tag.class"
import { deepEqual } from "./deepFunctions"

export function isLikeTags(tag0: Tag, tag1: Tag): Boolean {
  if(tag0.strings.length !== tag1.strings.length) {
    return false
  }

  const everyStringMatched = tag0.strings.every((string,index) => tag1.strings[index] === string)
  if(!everyStringMatched) {
    return false
  }

  const valuesLengthsMatch = tag0.values.length === tag1.values.length
  if(!valuesLengthsMatch) {
    return false
  }

  /*
  const valuesMatch = deepEqual(tag0.values, tag1.values)
  if(!valuesMatch) {
    return false
  }
  */

  return true
}