import { TagSubject } from './Tag.utils'
import { TemplaterResult } from './TemplaterResult.class'
import { Tag } from './Tag.class'
import { hasTagSupportChanged } from './hasTagSupportChanged.function'
import { destroyTagMemory } from './checkDestroyPrevious.function'
import { TagSupport, renderTagSupport } from './TagSupport.class'
import { processSubjectComponent } from './processSubjectComponent.function'
import { State } from './set.function'

export function updateExistingTagComponent(
  ownerTag: Tag,
  tempResult: TemplaterResult,
  subject: TagSubject,
  insertBefore: Element | Text,
): void {
  let existingTag: Tag | undefined = subject.tag
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
    // const subjectTagSupport = existingTag.tagSupport
    // old props may have changed, reclone first
    
    /*
    const newProps = subjectTagSupport.propsConfig.latest
    let oldCloneProps = subjectTagSupport.propsConfig.clonedProps
    // if the new props are NOT HTML children, then clone the props for later render cycle comparing
    if(!isTagInstance(newProps)) {
      oldCloneProps = deepClone( newProps )
    }
    */

    if(!tempResult.tagSupport) {
      tempResult.tagSupport = new TagSupport(
        oldTagSupport.ownerTagSupport,
        tempResult,
        subject,
      )
    }


    const newTagSupport = tempResult.tagSupport

    /*
    const hasStateChanged = checkStateChanged(oldTagSupport.memory.state)
    if(hasStateChanged) {
      console.log('support changed!!!!')
    }
    */
    // const hasChanged = hasStateChanged || hasTagSupportChanged(oldTagSupport, newTagSupport, tempResult)
    const hasChanged = hasTagSupportChanged(oldTagSupport, newTagSupport, tempResult)
    if(!hasChanged) {
      console.log('!hasChanged', {
        original: tempResult.wrapper.original,
        old: oldTagSupport.propsConfig.latest,
        new: newTagSupport.propsConfig.latest,
        tempProps: tempResult.props,
        equal: oldTagSupport.propsConfig.latest == newTagSupport.propsConfig.latest,
        state: newTagSupport.memory.state.newest,
        oldState: oldTagSupport.memory.state.newest,
      })

      const newTag = renderTagSupport(
        tempResult.tagSupport,
        false,
      )

      const oldTag = oldGlobal.oldest as Tag
      oldTag.updateByTag(newTag)
    
      return // its the same tag component
    }
  }

  // setValueRedraw(tempResult, subject, ownerTag)

  // ???
  // oldTagSupport.templater = tempResult
    
  const oldestTag = tempResult.global.oldest as Tag // oldTagSupport.oldest as Tag // existingTag
  const previous = tempResult.global.newest as Tag

  if(!previous || !oldestTag) {
    throw new Error('how?')
  }

  console.log('updateExistingTagComponent.function.ts - start', {
    original: tempResult.wrapper.original,
    props: tempResult.props,
    oldProps: subject.tag.tagSupport.templater.props,
    oldestProps: subject.tag.tagSupport.templater.global.oldest?.tagSupport.templater.props,
    
    previousState: previous.tagSupport.memory.state.newest,
    newestState: tempResult.tagSupport.memory.state.newest,
    olderState: tempResult.tagSupport.subject.tag.tagSupport.memory.state.newest,
  })
  const newTag = renderTagSupport(
    tempResult.tagSupport,
    false,
  )

  const hasOldest = newTag.tagSupport.templater.global.oldest ? true : false

  console.log('updateExistingTagComponent.function.ts - done', {
    original: tempResult.wrapper.original,
    props: tempResult.props,
    oldProps: subject.tag.tagSupport.templater.props,
    oldestProps: subject.tag.tagSupport.templater.global.oldest?.tagSupport.templater.props,
    hasOldest,
  })

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

    oldTagSupport.templater.global.newest = newTag
    // ???
    // oldTagSupport.propsConfig = {...tempResult.tagSupport.propsConfig}
  
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

  if(isLikeTag) {
    if(!newTag.tagSupport.templater.global.oldest) {
      throw new Error('maybe 6')
    }

    subject.tag = newTag
    // existingTag.updateByTag(newTag)
    oldestTag.updateByTag(newTag) // the oldest tag has element references
  } else {
    // Although function looked the same it returned a different html result
    if(isSameTag) {
      destroyTagMemory(existingTag, subject)
    }

    // oldTagSupport.oldest = newTag
    if(!newTag.tagSupport.templater.global.oldest) {
      throw new Error('maybe 7')
    }

    subject.tag = newTag
  }

  if(!oldTagSupport.templater.global.oldest) {
    newTag.buildBeforeElement(oldTagSupport.templater.global.insertBefore as Element, {
      forceElement: true,
      counts: {added: 0, removed: 0}, test:false,
    })

    newTag.tagSupport.templater.global.oldest = newTag
    oldTagSupport.templater.global.oldest = newTag
    newTag.tagSupport.templater.global.newest = newTag
    oldTagSupport.templater.global.newest = newTag

    if(!newTag.tagSupport.templater.global.oldest) {
      throw new Error('maybe 8')
    }

    subject.tag = newTag

    if(!newTag.hasLiveElements) {
      throw new Error('55555')
    }
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

    return false
  })
}