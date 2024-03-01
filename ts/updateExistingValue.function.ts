import { DisplaySubject, TagSubject } from "./Tag.utils.js"
import { TagSupport } from "./TagSupport.class.js"
import { Subject } from "./Subject.js"
import { TemplateRedraw, TemplaterResult } from "./templater.utils.js"
import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from "./isInstance.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"
import { Tag } from "./Tag.class.js"
import { destroySimpleValue, processTag } from "./processSubjectValue.function.js"
import { TagArraySubject, processTagArray } from "./processTagArray.js"
import { updateExistingTagComponent } from "./updateExistingTagComponent.function.js"
import { updateExistingTag } from "./updateExistingTag.function.js"
import { processRegularValue } from "./processRegularValue.function.js"

type ExistingSubject = Subject<Tag> | TemplaterResult | TagSubject | TagArraySubject | DisplaySubject

function checkDestroyPrevious(
  existing: ExistingSubject,
  value: TemplaterResult | Tag[] | TagSupport | Function | Subject<any>,
) {
  const existingSubArray = existing as TagArraySubject
  const wasArray = existingSubArray.lastArray
  
  // no longer an array
  if (wasArray && !isTagArray(value)) {
    wasArray.forEach(({tag}) => tag.destroy())
    delete (existing as any).lastArray  
    return true
  }

  const existingTagSubject = existing as TagSubject
  const existingTag = existingTagSubject.tag
  const isValueTagComponent = isTagComponent(value)
  const isSimpleValue = !(isValueTagComponent || isTagArray(value) || isTagInstance(value))
  
  // no longer tag or component?
  if(existingTag) {
    // no longer a component
    if(isTagComponent(existingTag) && !isValueTagComponent) {
      destroyTagMemory(existingTag, existingTagSubject)
      return true
    }
  
    // no longer a tag
    if(!isTagInstance(value)) {
      destroyTagMemory(existingTag, existingTagSubject)
      return true
    }

    return false // was tag and still is tag
  }

  const displaySubject = existing as DisplaySubject
  const clone = displaySubject.clone
  // was simple value but now something bigger
  if(clone && !isSimpleValue) {
    destroySimpleValue(displaySubject.template, displaySubject)
    return true
  }

  return false
}

export function updateExistingValue(
  existing: ExistingSubject,
  value: TemplaterResult | Tag[] | TagSupport | Function | Subject<any>,
  ownerTag: Tag,
): void {
  const subjectValue = (existing as Subject<Tag>).value
  const tempResult = value as TemplateRedraw
  const existingSubArray = existing as TagArraySubject
  const existingSubTag = existing as TagSubject
  const isChildSubject = existingSubArray.isChildSubject

  const wasDestroyed = checkDestroyPrevious(existing, value)

  console.log('wasDestroyed', {wasDestroyed, isChildSubject, value})

  // If we are working with tag component 2nd argument children, the value has to be digged
  if(isChildSubject) {
    value = (value as any).value // A subject contains the value
  }

  // was component but no longer
  const existingTag = existingSubTag.tag
  if(existingTag) {
    handleStillTag(
      existingTag as Tag,
      existing as TagSubject | TagArraySubject,
      value,
      ownerTag
    )

    return
  }

  // its another tag array
  if(isTagArray(value)) {
    const insertBefore = existingSubArray.template || existingSubTag.tag?.insertBefore
    processTagArray(
      existing as TagArraySubject,
      value as any as Tag[],
      insertBefore,
      ownerTag,
      {counts: {
        added: 0,
        removed: 0,
      }}
    )

    return 
  }

  // handle already seen tag components
  if(isTagComponent(tempResult)) {
    return updateExistingTagComponent(
      ownerTag,
      tempResult,
      existingSubTag as TagSubject,
      subjectValue,
    )
  }

  // now its a function
  if(value instanceof Function) {
    existingSubTag.set( bindSubjectCallback(value as any, ownerTag) )
    return
  }

  // we have been given a subject
  if(isSubjectInstance(value)) {
    existingSubTag.set( (value as Subject<any>).value ) // let ValueSubject now of newest value
    return
  }
  
  existingSubTag.set(value) // let ValueSubject now of newest value

  return
}

function handleStillTag(
  existingTag: Tag,
  existing: ExistingSubject,
  value: TemplaterResult | Tag[] | TagSupport | Function | Subject<any>,
  ownerTag: Tag,
) {
  const oldWrapper = existingTag.tagSupport.templater.wrapper
  const newWrapper = (value as any)?.wrapper
  const wrapMatch = oldWrapper && newWrapper && oldWrapper?.original === newWrapper?.original

  // TODO: We shouldn't need both of these
  const isSameTag = value && existingTag.lastTemplateString === (value as any).lastTemplateString
  const isSameTag2 = value && (value as any).getTemplate && existingTag.isLikeTag(value as any)

  if(isSameTag || isSameTag2) {
    return processTag(
      value,
      existing as TagSubject,
      (existing as any).template,
      ownerTag,// existingTag, // tag,
      {
        counts: {
          added: 0,
          removed: 0,
        }
      }
    )
  }
  
  if(wrapMatch) {
    return updateExistingTag(
      value as TemplaterResult,
      existingTag,
      existing as TagSubject,
    )
  }

  const subject = existing as DisplaySubject
  return processRegularValue(value, subject, subject.template, ownerTag)
}

export function destroyTagMemory(
  existingTag: Tag,
  existingSubject: TagSubject,
) {
  delete (existingSubject as any).tag
  delete (existingSubject as any).tagSupport
  // delete subjectValue.tagSupport
  existingTag.destroy()
}
