import { TagSubject, setValueRedraw } from "./Tag.utils.js"
import { TagSupport } from "./getTagSupport.js"
import { deepClone } from "./deepFunctions.js"
import { Subject } from "./Subject.js"
import { TemplateRedraw, TemplaterResult } from "./templater.utils.js"
import { isSubjectInstance, isTagComponent } from "./isInstance.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"
import { Tag } from "./Tag.class.js"

function updateExistingTagComponent(
  tag: Tag,
  tempResult: TemplateRedraw,
  existingSubject: TagSubject,
  subjectValue: any,
): void {
  const latestProps = tempResult.tagSupport.props
  const existingTag = existingSubject.tag

  // previously was something else, now a tag component
  if( !existingSubject.tag ) {
    setValueRedraw(tempResult, existingSubject, tag)
    tempResult.redraw()
    return
  }

  // tag existingTag
  const oldFunction = existingTag.tagSupport.templater.wrapper.original
  const newFunction = tempResult.wrapper.original
  const isSameTag = oldFunction === newFunction
  if(!isSameTag) {
    existingTag.destroy()
  }

  const oldTagSetup = existingTag.tagSupport

  oldTagSetup.latestProps = latestProps
  oldTagSetup.latestClonedProps = tempResult.tagSupport.clonedProps

  const subjectTagSupport = subjectValue?.tagSupport
  // old props may have changed, reclone first
  const oldCloneProps = deepClone( subjectTagSupport.props ) // tagSupport.clonedProps
  const oldProps = subjectTagSupport?.props // tagSupport.props

  if(existingTag) {
    const equal = oldTagSetup.hasPropChanges(oldProps, oldCloneProps, latestProps)

    if(equal) {
      return
    }
  }

  setValueRedraw(tempResult, existingSubject, tag)
  oldTagSetup.templater = tempResult
  existingSubject.value.tag = oldTagSetup.newest = tempResult.redraw()
  if(!isSameTag) {
    existingSubject.tag = existingSubject.value.tag
  }

  return
}

function updateExistingTag(
  templater: TemplaterResult,
  ogTag: Tag,
  existingSubject: TagSubject,
) {
  const tagSupport = ogTag.tagSupport
  const oldest = tagSupport.oldest as Tag
  oldest.beforeRedraw()

  const retag = templater.wrapper()
  
  // move my props onto tagSupport
  tagSupport.latestProps = retag.tagSupport.props
  tagSupport.latestClonedProps = retag.tagSupport.clonedProps
  tagSupport.memory  = retag.tagSupport.memory

  retag.setSupport( tagSupport )

  templater.newest = retag
  tagSupport.newest = retag
  oldest.afterRender()
  ogTag.updateByTag(retag)
  existingSubject.set(templater)
  
  return
}

export function updateExistingValue(
  existing: Subject<Tag> | TemplaterResult | TagSubject,
  value: TemplaterResult | TagSupport | Function | Subject<any>,
  tag: Tag,
): void {
  const subjectValue = (existing as Subject<Tag>).value
  const ogTag: Tag = subjectValue?.tag
  const tempResult = value as TemplateRedraw
  const existingSubject = existing as TagSubject

  // handle already seen tag components
  if(isTagComponent(tempResult)) {
    return updateExistingTagComponent(
      tag,
      tempResult,
      existingSubject,
      subjectValue,
    )
  }

  // handle already seen tags
  if(ogTag) {
    return updateExistingTag(
      value as TemplaterResult,
      ogTag,
      existingSubject,
    )
  }

  // now its a function
  if(value instanceof Function) {
    existingSubject.set( bindSubjectCallback(value as any, tag) )
    return
  }

  if(isSubjectInstance(value as Subject<any>)) {
    existingSubject.set( (value as Subject<any>).value ) // let ValueSubject now of newest value
    return
  }

  existingSubject.set(value) // let ValueSubject now of newest value

  return
}