import { TagSubject, setValueRedraw } from "./Tag.utils.js"
import { TagSupport } from "./getTagSupport.js"
import { deepClone } from "./deepFunctions.js"
import { Subject } from "./Subject.js"
import { TemplateRedraw, TemplaterResult } from "./templater.utils.js"
import { isSubjectInstance, isTagComponent } from "./isInstance.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"
import { Tag } from "./Tag.class.js"
import { isTagArray, processTag } from "./processSubjectValue.function.js"
import { TagArraySubject, processTagArray } from "./processTagArray.js"

function updateExistingTagComponent(
  tag: Tag,
  tempResult: TemplateRedraw,
  existingSubject: TagSubject,
  subjectValue: any,
): void {
  const latestProps = tempResult.tagSupport.props
  let existingTag: Tag | undefined = existingSubject.tag

  // previously was something else, now a tag component
  if( !existingTag ) {
    setValueRedraw(tempResult, existingSubject, tag)
    tempResult.redraw()
    return
  }

  // tag existingTag
  const oldWrapper = existingTag.tagSupport.templater.wrapper
  const newWrapper = tempResult.wrapper
  let isSameTag = false
  
  if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.original
    const newFunction = newWrapper.original
    isSameTag = oldFunction === newFunction
  }

  const oldTagSetup = existingTag.tagSupport
  oldTagSetup.latestProps = latestProps
  oldTagSetup.latestClonedProps = tempResult.tagSupport.clonedProps

  if(!isSameTag) {
    // TODO: this may not be in use
    destroyTagMemory(existingTag, existingSubject, subjectValue)
  } else {
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
  }

  setValueRedraw(tempResult, existingSubject, tag)
  oldTagSetup.templater = tempResult
  
  const redraw = tempResult.redraw() as Tag
  existingSubject.value.tag = oldTagSetup.newest = redraw

  if(!isSameTag) {
    existingSubject.tag = redraw
    subjectValue.tagSupport = tempResult.tagSupport
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
  existing: Subject<Tag> | TemplaterResult | TagSubject | TagArraySubject,
  value: TemplaterResult | TagSupport | Function | Subject<any>,
  tag: Tag,
): void {
  const subjectValue = (existing as Subject<Tag>).value
  const ogTag: Tag = subjectValue?.tag
  const tempResult = value as TemplateRedraw
  const existingSubArray = existing as TagArraySubject
  const existingSubTag = existing as TagSubject

  // was array
  if((existing as any).lastArray) {    
    // its another tag array
    if(isTagArray(value)) {
      processTagArray(
        existing as TagArraySubject,
        value as any as Tag[],
        existingSubArray.template,
        tag,
        {counts: {
          added: 0,
          removed: 0,
        }}
      )
  
      return 
    }

    // was tag array and now something else
    ;(existing as any).lastArray.forEach(({tag}: any) => tag.destroy())
    delete (existing as any).lastArray
  }

  // handle already seen tag components
  if(isTagComponent(tempResult)) {
    return updateExistingTagComponent(
      tag,
      tempResult,
      existingSubTag as TagSubject,
      subjectValue,
    )
  }

  // was component but no longer
  const existingTag = existingSubTag.tag
  if(existingTag) {
    // its now an array
    if(isTagArray(value)) {
      destroyTagMemory(existingTag, existingSubTag, subjectValue)
      delete existingSubTag.tag
    }

    const oldWrapper = existingTag.tagSupport.templater.wrapper
    const newWrapper = (value as any)?.wrapper
    const wrapMatch = oldWrapper && newWrapper && oldWrapper?.original === newWrapper?.original
    const isSameTag = existingTag.lastTemplateString === (value as any).lastTemplateString

    console.log('existingTag', {
      lastTag: existingTag.lastTemplateString,
      value,
      isSameTag,
      // template: (existing as any).template
    })

    if(isSameTag) {
      console.log('**********')
      processTag(
        value,
        existing as TagSubject,
        (existing as any).template,
        existingTag, // tag,
        {
          counts: {
            added: 0,
            removed: 0,
          }
        }
      )
      return
    }

    if((value as any).getTemplate && existingTag.isLikeTag(value as any)) {
      console.log('got in')

      processTag(
        value,
        existing as TagSubject,
        (existing as any).template,
        existingTag,
        {
          counts: {
            added: 0,
            removed: 0,
          }
        }
      )
      return
      /*
      return updateExistingTag(
        value as TemplaterResult,
        existingTag,
        existingSubTag,
      )
      */
  
      //throw 'maybe here'
    }
    
    if(wrapMatch) {
      return updateExistingTag(
        value as TemplaterResult,
        existingTag,
        existingSubTag,
      )
    }

    if(ogTag) {
      destroyTagMemory(existingTag, existingSubTag, subjectValue)
      delete existingSubTag.tag
    }
  } else if(ogTag) {
    console.log('🍎🍎🍎🍎🍎🍎🍎🍎🍎')
    return updateExistingTag(
      value as TemplaterResult,
      ogTag,
      existingSubTag,
    )
  }

  // now its a function
  if(value instanceof Function) {
    existingSubTag.set( bindSubjectCallback(value as any, tag) )
    return
  }

  // we have been given a subject
  if(isSubjectInstance(value as Subject<any>)) {
    existingSubTag.set( (value as Subject<any>).value ) // let ValueSubject now of newest value
    return
  }
  
  existingSubTag.set(value) // let ValueSubject now of newest value

  return
}

function destroyTagMemory(
  existingTag: Tag,
  existingSubject: TagSubject,
  subjectValue: any
) {
  delete existingSubject.tag
  delete existingSubject.tagSupport
  delete subjectValue.tagSupport
  existingTag.destroy()
}