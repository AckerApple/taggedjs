import { TagSubject, setValueRedraw } from "./Tag.utils.js"
import { deepClone } from "./deepFunctions.js"
import { TemplateRedraw } from "./templater.utils.js"
import { isTagInstance } from "./isInstance.js"
import { Tag } from "./Tag.class.js"
import { destroyTagMemory } from "./updateExistingValue.function.js"
import { hasTagSupportChanged } from "./hasTagSupportChanged.function.js"

export function updateExistingTagComponent(
  tag: Tag,
  tempResult: TemplateRedraw,
  existingSubject: TagSubject,
  subjectValue: any,
): void {
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

  const latestProps = tempResult.tagSupport.propsConfig.latest
  const oldTagSetup = existingTag.tagSupport
  oldTagSetup.propsConfig.latest = latestProps

  if(!isSameTag) {
    // TODO: this may not be in use
    destroyTagMemory(existingTag, existingSubject)
  } else {
    const subjectTagSupport = subjectValue?.tagSupport
    // old props may have changed, reclone first

    let oldCloneProps = subjectTagSupport.props

    // if the new props are NOT HTML children, then clone the props for later render cycle comparing
    if(!isTagInstance(subjectTagSupport.props)) {
      oldCloneProps = deepClone( subjectTagSupport.props )
    }

    if(existingTag) {
      const newTagSupport = tempResult.tagSupport
      const hasChanged = hasTagSupportChanged(oldTagSetup, newTagSupport)
      if(!hasChanged) {
        return
      }
    }
  }

  setValueRedraw(tempResult, existingSubject, tag)

  oldTagSetup.templater = tempResult
  
  const redraw = tempResult.redraw() as Tag

  existingSubject.value.tag = oldTagSetup.newest = redraw
  // oldTagSetup.propsConfig.latestCloned = tempResult.tagSupport.propsConfig.clonedProps
  oldTagSetup.propsConfig = {...tempResult.tagSupport.propsConfig}

  if(!isSameTag) {
    existingSubject.tag = redraw
    // SAFE: It's a new tagSupport and should overwrite
    existingSubject.tagSupport = tempResult.tagSupport
    // ???
    // subjectValue.tagSupport = tempResult.tagSupport
  }

  return
}
