import { isSimpleType, isStaticTag } from'../isInstance.js'
import { destroyArrayItem, TagArraySubject } from'./update/processTagArray.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { destroyTagMemory } from'./destroyTag.function.js'
import { Support } from './Support.class.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'
import { paintRemoves } from './paint.function.js'
import { ContextItem } from './Tag.class.js'

const tagTypes = [ValueTypes.tagComponent, ValueTypes.stateRender, ValueTypes.oneRender]

export function checkDestroyPrevious(
  subject: ContextItem, // existing.value is the old value
  newValue: unknown,
  valueType: ValueType | BasicTypes | ImmutableTypes, // new value type
) {
  // const hasLastValue = 'lastValue' in subject.global

  // was simple value but now some different type
  if(subject.global.simpleValueElm) {
    const lastValue = subject.global.lastValue // TODO: we maybe able to use displaySubject.value and remove concept of lastValue

    // below is faster than using getValueType
    if( isSimpleType(valueType) && typeof(lastValue) === valueType ) {
      return false // no need to destroy, just update display
    }

    /*
    // ??? recently removed
    if(newValue instanceof Function && (lastValue as any) instanceof Function) {
      return false
    }
    */

    destroySimpleValue(subject)
    subject.global.renderCount = 0
    return 'changed-simple-value'
  }

  const arraySubject = subject as TagArraySubject
  const wasArray = arraySubject.lastArray
  
  // no longer an array
  if (wasArray && valueType !== ValueTypes.tagArray) {
    delete arraySubject.lastArray
    const counts = {added:0, removed:0}
    for (let index=0; index < wasArray.array.length; ++index) {
      destroyArrayItem(wasArray.array, index, counts)
    }
    subject.global.renderCount = 0
    return 'array'
  }

  const global = subject.global
  const lastSupport = global.newest
  
  // no longer tag or component?
  if(lastSupport && !global.deleted) {
    const isValueTag = isStaticTag(newValue)
    const isSubjectTag = isStaticTag(newValue)
    const newTag = newValue as Support
    
    if(isSubjectTag && isValueTag) {
      // its a different tag now
      const likeTags = isLikeTags(newTag, lastSupport)
      if(!likeTags) {
        destroyTagMemory(lastSupport)
        delete subject.global.deleted
        subject.global.renderCount = 0
        return 'tag-swap'
      }

      return false
    }

    const isTag = tagTypes.includes(valueType as ValueType)
    if(isTag) {
      return false // its still a tag component
    }

    // destroy old component, value is not a component
    destroyTagMemory(lastSupport)
    subject.global.renderCount = 0
    delete subject.global.deleted // prevent replacing tag from thinking it was deleted
    return 'different-tag'
  }

  return false
}

function destroySimpleValue(
  subject: ContextItem,
) {
  delete subject.global.lastValue
  const elm = subject.global.simpleValueElm as Element
  paintRemoves.push(elm)
  delete subject.global.simpleValueElm
}
