// Functions in here are attached as ContextItem.checkValueChange

import { processUpdateRegularValue, RegularValue } from './update/processRegularValue.function.js'
import { Support, SupportContextItem } from './Support.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroyArrayItem } from'./update/processTagArray.js'
import { destroySupport } from './destroySupport.function.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'
import { isArray, isStaticTag } from'../isInstance.js'
import { isLikeTags } from'./isLikeTags.function.js'
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
  delete subject.lastArray
  
  for (let index=0; index < lastArray.length; ++index) {
    destroyArrayItem(lastArray[index], counts)
  }
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

export function checkTagValueChange(
  newValue: unknown,
  subject: SupportContextItem,
) {
  const global = subject.global as SupportTagGlobal
  const lastSupport = global?.newest
  const isValueTag = isStaticTag(newValue)
  const newTag = newValue as Support
  
  if(isValueTag) {
    // its a different tag now
    const likeTags = isLikeTags(newTag, lastSupport)
    if(!likeTags) {
      destroySupport(lastSupport, 0)
      getNewGlobal(subject) as SupportTagGlobal
      return 7 // 'tag-swap'
    }

    return false
  }

  const isTag = (newValue as any)?.tagJsType
  if(isTag) {
    return false // its still a tag component
  }

  // destroy old component, value is not a component
  destroySupport(lastSupport, 0)
  delete (subject as ContextItem).global
  subject.renderCount = 0
   
  return 8 // 'no-longer-tag'
}
