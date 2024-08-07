import { isStaticTag } from'../isInstance.js'
import { destroyArrayItem } from'./update/processTagArray.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { Support } from './Support.class.js'
import { paintRemoves } from './paint.function.js'
import { ContextItem } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroySupport } from './destroySupport.function.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'
import { processNewRegularValue, processUpdateRegularValue, RegularValue } from './update/processRegularValue.function.js'

export function checkDestroyPrevious(
  subject: ContextItem, // existing.value is the old value
  newValue: unknown,
) {
  const isArray = newValue instanceof Array

  // was simple value but now some different type
  if(subject.simpleValueElm) {
   if([null,undefined].includes(newValue as any) || !(isArray || newValue instanceof Object)) {
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
/*
    processNewRegularValue(
      newValue as RegularValue,
      subject,
    )
*/
    return 6 // 'changed-simple-value'
  }

  const global = subject.global as SupportTagGlobal
  const lastSupport = global?.newest  
  // no longer tag or component?
  if(lastSupport && !global.deleted) {
    const isValueTag = isStaticTag(newValue)
    const newTag = newValue as Support
    
    if(isValueTag) {
      // its a different tag now
      const likeTags = isLikeTags(newTag, lastSupport)
      if(!likeTags) {
        destroySupport(lastSupport, 0)
        subject.global = getNewGlobal()
        return 7 // 'tag-swap'
      }

      return false
    }

    const isTag = newValue && 'tagJsType' in (newValue as any)
    if(isTag) {
      return false // its still a tag component
    }

    // destroy old component, value is not a component
    destroySupport(lastSupport, 0)
    delete subject.global
    return 8 // 'different-tag'
  }

  const lastArray = subject.lastArray
  // no longer an array
  if (lastArray && !isArray) {
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
  // global.deleted = true
  delete subject.lastArray
  
  for (let index=0; index < lastArray.length; ++index) {
    destroyArrayItem(lastArray[index], counts)
  }
}
