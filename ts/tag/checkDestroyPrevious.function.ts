import { DisplaySubject, TagSubject } from '../subject.types.js'
import { isSimpleType, isStaticTag } from'../isInstance.js'
import { InterpolateSubject } from './update/processFirstSubject.utils.js'
import { TagArraySubject } from'./update/processTagArray.js'
import { isLikeTags } from'./isLikeTags.function.js'
import { Counts } from'../interpolations/interpolateTemplate.js'
import { destroyTagMemory } from'./destroyTag.function.js'
import { Support } from './Support.class.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'

const tagTypes = [ValueTypes.tagComponent, ValueTypes.stateRender, ValueTypes.oneRender]

export function checkDestroyPrevious(
  subject: InterpolateSubject, // existing.value is the old value
  newValue: unknown,
  valueType: ValueType | BasicTypes | ImmutableTypes, // new value type
) {
  const displaySubject = subject as DisplaySubject
  const hasLastValue = 'lastValue' in displaySubject
  const lastValue = displaySubject.lastValue // TODO: we maybe able to use displaySubject.value and remove concept of lastValue

  // was simple value but now something bigger
  if(hasLastValue && lastValue !== newValue) {
    // below is faster than using getValueType
    const newType = typeof(newValue)
    if( isSimpleType(newType) && typeof(lastValue) === newType ) {
      return false
    }

    if(newValue instanceof Function && (lastValue as any) instanceof Function) {
      return false
    }

    destroySimpleValue(displaySubject)
    return 'changed-simple-value'
  }

  const arraySubject = subject as TagArraySubject
  const wasArray = arraySubject.lastArray
  
  // no longer an array
  if (wasArray && valueType !== ValueTypes.tagArray) {
    delete arraySubject.lastArray
    
    for (let index = wasArray.array.length - 1; index >= 0; --index) {
      const {support} = wasArray.array[index]
      destroyArrayTag(support, {added:0, removed:0})
    }

    return 'array'
  }

  const tagSubject = subject as TagSubject
  const global = subject.global
  const lastSupport = tagSubject.support
  
  // no longer tag or component?
  if(lastSupport && !global.deleted) {
    const isValueTag = isStaticTag(newValue)
    // ??? recently changed
    // const isSubjectTag = isStaticTag(subject._value)
    const isSubjectTag = isStaticTag(newValue)
    const newTag = newValue as Support
    
    if(isSubjectTag && isValueTag) {
      // its a different tag now
      const likeTags = isLikeTags(newTag, lastSupport)
      if(!likeTags) {
        destroyTagMemory(lastSupport)
        delete subject.global.deleted
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
    delete subject.global.deleted // prevent replacing tag from thinking it was deleted
    return 'different-tag'
  }

  return false
}

export function destroyArrayTag(
  support: Support,
  counts: Counts,
) {
  const global = support.subject.global
  const placeholder = global.placeholder as Text
  const parentNode = placeholder.parentNode as ParentNode
  parentNode.removeChild(placeholder)

  delete global.placeholder

  support.destroy({
    stagger: counts.removed++,
  })
}

function destroySimpleValue(
  subject: DisplaySubject,
) {
  delete subject.lastValue
  const elm = subject.global.simpleValueElm as Element
  const parentNode = elm.parentNode as ParentNode
  parentNode.removeChild(elm)
  delete subject.global.simpleValueElm
}
