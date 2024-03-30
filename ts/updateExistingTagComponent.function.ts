import { TagSubject } from './Tag.utils'
import { TemplaterResult } from './TemplaterResult.class'
import { Tag } from './Tag.class'
import { hasTagSupportChanged } from './hasTagSupportChanged.function'
import { TagSupport, renderTagSupport } from './TagSupport.class'
import { processSubjectComponent } from './processSubjectComponent.function'
import { destroyTagMemory } from './destroyTag.function'
import { deepClone } from './deepFunctions'
import { State } from './set.function'

export function updateExistingTagComponent(
  ownerTag: Tag,
  tempResult: TemplaterResult,
  subject: TagSubject,
  insertBefore: Element | Text,
): void {
  let existingTag: Tag | undefined = subject.tag
  
  /*
  if(existingTag && !existingTag.hasLiveElements) {
    throw new Error('issue already began')
  }
  */
  
  const oldWrapper = existingTag.tagSupport.templater.wrapper
  const newWrapper = tempResult.wrapper
  let isSameTag = false

  if(tempResult.global.oldest && !tempResult.global.oldest.hasLiveElements) {
    throw new Error('88893434')
  }
  
  if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.original
    const newFunction = newWrapper.original
    isSameTag = oldFunction === newFunction
  }

  const oldTagSupport = existingTag.tagSupport
  const oldGlobal = oldTagSupport.templater.global
  const globalInsert = oldGlobal.insertBefore
  const oldInsertBefore = globalInsert?.parentNode ? globalInsert : insertBefore

  if(!oldInsertBefore.parentNode) {
    throw new Error('stop here no parent node update existing tag')
  }

  if(!isSameTag) {
    destroyTagMemory(oldTagSupport.templater.global.oldest as Tag, subject)
    processSubjectComponent(tempResult, subject, oldInsertBefore, ownerTag, {
      forceElement: false,
      counts: {added: 0, removed: 0},
    })
    return
  } else {
    if(!tempResult.tagSupport) {
      tempResult.tagSupport = new TagSupport(
        oldTagSupport.ownerTagSupport,
        tempResult,
        subject,
      )
    }

    const newTagSupport = tempResult.tagSupport
    const hasChanged = hasTagSupportChanged(oldTagSupport, newTagSupport, tempResult)

    console.log('hasChanged - 0', tempResult.wrapper.original)
    if(!hasChanged) {
      /*
      const stateChanged = false
      if(stateChanged) {
        const newTag = renderTagSupport(
          tempResult.tagSupport,
          false,
        )
  
        const oldTag = oldGlobal.oldest as Tag
        oldTag.updateByTag(newTag)
      }
      */

      return // its the same tag component
    }
  }

  const oldestTag = tempResult.global.oldest as Tag // oldTagSupport.oldest as Tag // existingTag
  const previous = tempResult.global.newest as Tag

  if(!previous || !oldestTag) {
    throw new Error('how no previous or oldest nor newest?')
  }

  const newTag = renderTagSupport(
    tempResult.tagSupport,
    false,
  )

  existingTag = subject.tag

  const hasOldest = newTag.tagSupport.templater.global.oldest ? true : false
  if(!hasOldest) {
    newTag.buildBeforeElement(oldInsertBefore, {
      forceElement: true,
      counts: {added: 0, removed: 0}, test: false,
    })

    newTag.tagSupport.templater.global.oldest = newTag
    newTag.tagSupport.templater.global.newest = newTag
    oldTagSupport.templater.global.oldest = newTag
    oldTagSupport.templater.global.newest = newTag

    if(!newTag.tagSupport.templater.global.oldest) {
      throw new Error('maybe 5')
    }

    subject.tag = newTag

    if(!newTag.hasLiveElements) {
      throw new Error('44444 - 5')
    }  
  
    return
  }

  // const newTag = tempResult.newest as Tag

  if(previous && !oldestTag) {
    throw new Error('bad elders')
  }

  // detect if both the function is the same and the return is the same
  const isLikeTag = isSameTag && previous.isLikeTag(newTag)

  if(previous && !oldestTag) {
    throw new Error('bad elders')
  }

  let oldest = oldTagSupport.templater.global.oldest

  if(isLikeTag) {
    if(!newTag.tagSupport.templater.global.oldest) {
      throw new Error('maybe 6')
    }

    subject.tag = newTag
    /*
    if(!newTag.hasLiveElements) {
      throw new Error('44444 - 6')
    }
    */

    oldestTag.updateByTag(newTag) // the oldest tag has element references
  } else {
    // Although function looked the same it returned a different html result
    if(isSameTag && existingTag) {
      destroyTagMemory(existingTag, subject)
      newTag.tagSupport.templater.global.context = {} // do not share previous outputs
    }
    oldest = undefined

    // ??? - new remove
    // subject.tag = newTag
  }

  if(!oldest) {
    newTag.buildBeforeElement(oldTagSupport.templater.global.insertBefore as Element, {
      forceElement: true,
      counts: {added: 0, removed: 0}, test:false,
    })

    newTag.tagSupport.templater.global.oldest = newTag
    newTag.tagSupport.templater.global.newest = newTag
    oldTagSupport.templater.global.oldest = newTag

    subject.tag = newTag
  }

  oldTagSupport.templater.global.newest = newTag
  // ???
  // oldTagSupport.propsConfig = {...tempResult.tagSupport.propsConfig}

  return
}

function checkStateChanged(state: State) {
  return !state.newest.every(state => {
    const lastValue = state.lastValue
    const nowValue = state.get()
    const matched = lastValue === nowValue

    if(matched) {
      return true
    }

    console.log('not matched', {lastValue, nowValue})
    return false
  })
}

