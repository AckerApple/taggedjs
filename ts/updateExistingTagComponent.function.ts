import { TagSubject, setValueRedraw } from './Tag.utils'
import { deepClone } from './deepFunctions'
import { TemplateRedraw } from './templater.utils'
import { isTagInstance } from './isInstance'
import { Tag } from './Tag.class'
import { hasTagSupportChanged } from './hasTagSupportChanged.function'
import { destroyTagMemory } from './checkDestroyPrevious.function'
import { isLikeTags } from './isLikeTags.function'

export function updateExistingTagComponent(
  ownerTag: Tag,
  tempResult: TemplateRedraw,
  existingSubject: TagSubject,
): void {
  let existingTag: Tag | undefined = existingSubject.tag
  
  //const template = existingSubject.template
  const insertBefore = existingTag.tagSupport.templater.insertBefore

  // tag existingTag
  const oldWrapper = existingTag.tagSupport.templater.wrapper
  const newWrapper = tempResult.wrapper
  let isSameTag = false
  
  if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.original
    const newFunction = newWrapper.original
    isSameTag = oldFunction === newFunction
  }

  const latestProps = tempResult.tagSupport.propsConfig.latest
  const oldTagSetup = existingTag.tagSupport
  oldTagSetup.propsConfig.latest = latestProps

  if(!isSameTag) {
    destroyTagMemory(existingTag, existingSubject)
  } else {
    const subjectTagSupport = existingTag.tagSupport
    // old props may have changed, reclone first

    let oldCloneProps = subjectTagSupport.propsConfig.clonedProps
    const newProps = subjectTagSupport.propsConfig.latest

    // if the new props are NOT HTML children, then clone the props for later render cycle comparing
    if(!isTagInstance(newProps)) {
      oldCloneProps = deepClone( newProps )
    }

    const newTagSupport = tempResult.tagSupport
    const hasChanged = hasTagSupportChanged(oldTagSetup, newTagSupport)
    if(!hasChanged) {
      return // its the same tag component
    }
  }

  setValueRedraw(tempResult, existingSubject, ownerTag)

  oldTagSetup.templater = tempResult
  
  const newTag = tempResult.redraw() as Tag
  // detect if both the function is the same and the return is the same
  const isLikeTag = isSameTag && existingTag.isLikeTag(newTag)

  if(isLikeTag) {
    existingTag.updateByTag(newTag)
  } else {
    existingSubject.tagSupport = newTag.tagSupport
    existingSubject.tag = newTag    
    oldTagSetup.oldest = newTag
    
    // Although function looked the same it returned a different html result
    if(isSameTag) {
      existingTag.destroy()
    }
  }
  
  oldTagSetup.newest = newTag
  oldTagSetup.propsConfig = {...tempResult.tagSupport.propsConfig}

  return
}
