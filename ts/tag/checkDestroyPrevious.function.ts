import { isSimpleType, isStaticTag } from'../isInstance.js'
import { destroyArrayItem } from'./update/processTagArray.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { Support } from './Support.class.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'
import { paintRemoves } from './paint.function.js'
import { ContextItem } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'
import { destroySupport } from './destroySupport.function.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'

const tagTypes = [ValueTypes.tagComponent, ValueTypes.stateRender, ValueTypes.oneRender]

export function checkDestroyPrevious(
  subject: ContextItem, // existing.value is the old value
  newValue: unknown,
  valueType: ValueType | BasicTypes | ImmutableTypes, // new value type
) {
  const global = subject.global as SupportTagGlobal

  // was simple value but now some different type
  if(global.simpleValueElm) {
    if( isSimpleType(valueType) && global.lastValueType === valueType ) {
      return false // no need to destroy, just update display
    }

    global.deleted = true
    const elm = subject.global.simpleValueElm as Element
    paintRemoves.push(elm)
    subject.global = getNewGlobal()
    subject.global.placeholder = global.placeholder
    subject.global.lastValueType = global.nowValueType
    return 'changed-simple-value'
  }

  const lastSupport = global.newest  
  // no longer tag or component?
  if(lastSupport && !global.deleted) {
    const isValueTag = isStaticTag(newValue)
    const newTag = newValue as Support
    const oldGlobal = subject.global
    
    if(isValueTag) {
      // its a different tag now
      const likeTags = isLikeTags(newTag, lastSupport)
      if(!likeTags) {
        destroySupport(lastSupport, 0)
        subject.global = getNewGlobal()
        subject.global.placeholder = oldGlobal.placeholder
        subject.global.lastValueType = oldGlobal.nowValueType
        return 'tag-swap'
      }

      return false
    }

    const isTag = tagTypes.includes(valueType as ValueType)
    if(isTag) {
      return false // its still a tag component
    }

    // destroy old component, value is not a component
    destroySupport(lastSupport, 0)
    subject.global = getNewGlobal()
    subject.global.placeholder = oldGlobal.placeholder
    subject.global.lastValueType = oldGlobal.nowValueType
    return 'different-tag'
  }


  const wasArray = global.context
  // no longer an array
  if (wasArray && valueType !== ValueTypes.tagArray) {
    const counts = {added:0, removed:0}
    for (let index=0; index < wasArray.length; ++index) {
      destroyArrayItem(wasArray[index], counts)
    }
    
    global.deleted = true
    subject.global = getNewGlobal()
    subject.global.placeholder = global.placeholder

    return 'array'
  }

  return false
}
