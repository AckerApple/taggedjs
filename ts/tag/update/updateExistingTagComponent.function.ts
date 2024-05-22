import { TagSubject } from '../../subject.types'
import { hasTagSupportChanged } from '../hasTagSupportChanged.function'
import { TagSupport } from '../TagSupport.class'
import { processSubjectComponent } from './processSubjectComponent.function'
import { destroyTagMemory } from '../destroyTag.function'
import { renderTagSupport } from '../render/renderTagSupport.function'
import { InsertBefore } from '../../interpolations/Clones.type'
import { callbackPropOwner } from '../../alterProps.function'
import { isLikeTags } from '../isLikeTags.function'

export function updateExistingTagComponent(
  ownerSupport: TagSupport,
  tagSupport: TagSupport, // lastest
  subject: TagSubject,
  insertBefore: InsertBefore,
): TagSupport {
  let lastSupport = subject.tagSupport?.global.newest as TagSupport // || subject.tagSupport
  let oldestTag = lastSupport.global.oldest
  
  const oldWrapper = lastSupport.templater.wrapper
  const newWrapper = tagSupport.templater.wrapper
  let isSameTag = false

  if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.parentWrap.original
    const newFunction = newWrapper.parentWrap.original

    // string compare both functions
    // isSameTag = oldFunction.compareTo === newFunction.compareTo // ???
    isSameTag = oldFunction === newFunction // ???
  }

  const templater = tagSupport.templater

  if(!isSameTag) {
    const oldestSupport = lastSupport.global.oldest as TagSupport
    destroyTagMemory(oldestSupport)
  
    return processSubjectComponent(
      templater,
      subject,
      insertBefore,
      ownerSupport,
      {
        forceElement: false,
        counts: {added: 0, removed: 0},
      }
    )
  } else {
    const hasChanged = hasTagSupportChanged(lastSupport, tagSupport, templater)    
    if(!hasChanged) {
      // if the new props are an object then implicitly since no change, the old props are an object
      const newProps = templater.props
      syncFunctionProps(
        lastSupport,
        ownerSupport,
        newProps, // resetProps,
      )

      return lastSupport // its the same tag component
    }
  }

  
  const previous = lastSupport.global.newest as TagSupport
  const newSupport = renderTagSupport(
    tagSupport,
    false,
  )

  lastSupport = subject.tagSupport as TagSupport

  const newOldest = newSupport.global.oldest
  const hasOldest = newOldest ? true : false
  if(!hasOldest) {
    return buildNewTag(
      newSupport,
      insertBefore,
      lastSupport,
      subject
    )
  }
  
  if(newOldest && templater.children.value.length) {
    const oldKidsSub = newOldest.templater.children
    oldKidsSub.set(templater.children.value)
  }

  // detect if both the function is the same and the return is the same
  const isLikeTag = isSameTag && isLikeTags(previous, newSupport)

  if(isLikeTag) {
    subject.tagSupport = newSupport
    
    ;(oldestTag as TagSupport).updateBy(newSupport) // the oldest tag has element references

    return newSupport
  } else {
    // Although function looked the same it returned a different html result
    if(isSameTag && lastSupport) {
      destroyTagMemory(lastSupport)
      newSupport.global.context = {} // do not share previous outputs
    }
    oldestTag = undefined
  }
  

  if(!oldestTag) {
    lastSupport = newSupport
    buildNewTag(
      newSupport,
      lastSupport.global.insertBefore as Element,
      lastSupport,
      subject,
    )
  }

  lastSupport.global.newest = newSupport

  return newSupport
}

function buildNewTag(
  newSupport: TagSupport,
  oldInsertBefore: Element | Text | ChildNode,
  oldTagSupport: TagSupport,
  subject: TagSubject,
) {
  newSupport.buildBeforeElement(oldInsertBefore, {
    forceElement: true,
    counts: {added: 0, removed: 0},
  })

  newSupport.global.oldest = newSupport
  newSupport.global.newest = newSupport
  oldTagSupport.global.oldest = newSupport
  oldTagSupport.global.newest = newSupport
  subject.tagSupport = newSupport

  return newSupport
}

function syncFunctionProps(
  lastSupport: TagSupport,
  ownerSupport: TagSupport,
  newPropsArray: any[],
  // oldProps: Record<string, any>,
) {
  lastSupport = lastSupport.global.newest || lastSupport as TagSupport
  const priorPropConfig = lastSupport.propsConfig
  const priorPropsArray = priorPropConfig.latestCloned
  const prevSupport = ownerSupport.global.newest as TagSupport

  newPropsArray.forEach((argPosition, index) => {
    if(typeof(argPosition) !== 'object') {
      return
    }

    const priorProps = priorPropsArray[index] as Record<string, any>

    if(typeof(priorProps) !== 'object') {
      return
    }

    Object.entries(argPosition).forEach(([name, value]) => {
      if(!(value instanceof Function)) {
        return
      }
  
      const newCallback = argPosition[name] // || value
      const original = newCallback instanceof Function && newCallback.toCall
      if(original) {
        return // already previously converted
      }
  
      // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
      priorProps[name].toCall = (...args: any[]) => {
        return callbackPropOwner(
          newCallback, // value, // newOriginal,
          args,
          prevSupport,
        )
      }
  
      return
    })
  })
}
