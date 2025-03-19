// Functions in here are attached as ContextItem.checkValueChange

import { processUpdateRegularValue, RegularValue } from './update/processRegularValue.function.js'
import { destroyArrayItem } from'./update/processTagArray.js'
import { isArray } from'../isInstance.js'
import { paintRemoves } from './paint.function.js'
import { BasicTypes } from './ValueTypes.enum.js'
import { ContextItem } from './Context.types.js'

export function checkArrayValueChange(
  newValue: unknown,
  subject: ContextItem,
) {  
  // no longer an array?
  if (!isArray(newValue)) {
    const lastArray = subject.lastArray as unknown[]
    destroyArray(subject, lastArray)

    return 9 // 'array'
  }

  return false
}

export function destroyArray(
  subject: ContextItem,
  lastArray: any[]
) {
  const counts = {added:0, removed:0}
  
  for (let index=0; index < lastArray.length; ++index) {
    destroyArrayItem(lastArray[index], counts)
  }
  
  delete subject.lastArray
}

export function checkSimpleValueChange(
  newValue: unknown,
  subject: ContextItem,
) {
  const isBadValue = newValue === null || newValue === undefined
  if(isBadValue || !(typeof(newValue) === BasicTypes.object)) {
    // This will cause all other values to render
    processUpdateRegularValue(
      newValue as RegularValue,
      subject,
    )

    return -1  // no need to destroy, just update display
  }

  const elm = subject.simpleValueElm as Element
  delete subject.simpleValueElm
  paintRemoves.push(elm)
  
  return 6 // 'changed-simple-value'
}
