import { isSimpleType, isStaticTag } from'../isInstance.js'
import { destroyArrayItem } from'./update/processTagArray.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { Support } from './Support.class.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'
import { paintRemoves } from './paint.function.js'
import { ContextItem } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroySupport } from './destroySupport.function.js'
import { SupportTagGlobal, TagGlobal } from './TemplaterResult.class.js'

export function checkDestroyPrevious(
  subject: ContextItem, // existing.value is the old value
  newValue: unknown,
) {
  const global = subject.global as SupportTagGlobal
  const isArray = newValue instanceof Array

  // was simple value but now some different type
  if(subject.simpleValueElm) {
   if([null,undefined].includes(newValue as any) || !(isArray || newValue instanceof Object)) {
     return false  // no need to destroy, just update display
   }

    global.deleted = true
    const elm = subject.simpleValueElm as Element
    delete subject.simpleValueElm
    paintRemoves.push(elm)
    subject.global = getNewGlobal()
    return 6 // 'changed-simple-value'
  }

  const lastSupport = global.newest  
  // no longer tag or component?
  if(lastSupport && !global.deleted) {
    const isValueTag = isStaticTag(newValue)
    const newTag = newValue as Support
    const oldGlobal = subject.global as TagGlobal
    
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
    subject.global = getNewGlobal()
    return 8 // 'different-tag'
  }

  const wasArray = global.context
  // no longer an array
  if (wasArray && !isArray) {
    const counts = {added:0, removed:0}
    for (let index=0; index < wasArray.length; ++index) {
      destroyArrayItem(wasArray[index], counts)
    }
    
    global.deleted = true
    subject.global = getNewGlobal()

    return 'array'
  }

  return false
}
