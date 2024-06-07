import { TagSubject } from '../../subject.types.js'
import { hasTagSupportChanged } from'../hasTagSupportChanged.function.js'
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { processSubjectComponent } from'./processSubjectComponent.function.js'
import { destroyTagMemory } from'../destroyTag.function.js'
import { renderTagSupport } from'../render/renderTagSupport.function.js'
import { InsertBefore } from'../../interpolations/InsertBefore.type.js'
import { castProps } from'../../alterProp.function.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { Props } from '../../Props.js'
import { TemplaterResult } from '../TemplaterResult.class.js'

export function updateExistingTagComponent(
  ownerSupport: TagSupport,
  tagSupport: TagSupport, // lastest
  subject: TagSubject,
  insertBefore: InsertBefore,
  renderUp = false,
): TagSupport | BaseTagSupport {
  let lastSupport = subject.tagSupport?.global.newest as BaseTagSupport | TagSupport
  
  const oldWrapper = lastSupport.templater.wrapper
  const newWrapper = tagSupport.templater.wrapper
  let isSameTag = false

  if(oldWrapper && newWrapper) {
    const oldFunction = oldWrapper.parentWrap.original
    const newFunction = newWrapper.parentWrap.original

    // string compare both functions
    isSameTag = oldFunction === newFunction
  }

  const templater = tagSupport.templater

  if(!isSameTag) {
    const oldestSupport = lastSupport.global.oldest as TagSupport
    destroyTagMemory(oldestSupport)
  
    const newSupport = processSubjectComponent(
      templater,
      subject,
      insertBefore,
      ownerSupport,
      {
        counts: {added: 0, removed: 0},
      }
    )

    return newSupport
  } else {
    const hasChanged = hasTagSupportChanged(
      lastSupport as unknown as BaseTagSupport,
      tagSupport as unknown as BaseTagSupport,
      templater
    )
    // everyhing has matched, no display needs updating.
    if(!hasChanged) {
      const newProps = templater.props

      // update function refs to use latest references
      const castedProps = syncFunctionProps(
        tagSupport,
        lastSupport as TagSupport,
        ownerSupport,
        newProps,
      )

      // When new tagSupport actually makes call to real function, use these pre casted props
      tagSupport.propsConfig.castProps = castedProps
      
      // update support to think it has different cloned props
      lastSupport.propsConfig.latestCloned = tagSupport.propsConfig.latestCloned
      lastSupport.propsConfig.lastClonedKidValues = tagSupport.propsConfig.lastClonedKidValues

      return lastSupport // its the same tag component
    }
  }

  const oldest = lastSupport.global.oldest

  if(tagSupport.global.locked) {
    tagSupport.global.blocked.push(tagSupport)
  
    return tagSupport
  }

  const previous = lastSupport.global.newest as TagSupport
  const newSupport = renderTagSupport(
    tagSupport,
    renderUp,
  )

  return afterTagRender(subject, oldest, templater, previous, newSupport, isSameTag)
}

function afterTagRender(
  subject: TagSubject,
  oldest: BaseTagSupport | TagSupport,
  templater: TemplaterResult,
  previous: TagSupport,
  newSupport: TagSupport,
  isSameTag: boolean,
) {
  let lastSupport = subject.tagSupport

  // const oldest = newSupport.global.oldest
  /*
  const hasOldest = oldest ? true : false
  if(!hasOldest) {
    return buildNewTag(
      newSupport,
      insertBefore,
      lastSupport,
      subject
    )
  }
  */

  if(oldest && templater.children._value.length) {
    const oldKidsSub = oldest.templater.children
    oldKidsSub.next(templater.children._value)
  }

  // detect if both the function is the same and the return is the same
  const isLikeTag = isSameTag && isLikeTags(previous, newSupport)

  if(isLikeTag) {
    const oldestTag = lastSupport.global.oldest
    subject.tagSupport = newSupport as TagSupport
    oldestTag.updateBy(newSupport)
    return newSupport
  }

  // Although function looked the same it returned a different html result
  if(isSameTag && lastSupport) {
    if(!previous.global.deleted) {
      destroyTagMemory(previous)
    }
    /*
    const insertBefore = (previous.global.insertBefore as any)
    if(insertBefore.parentNode) {
      insertBefore.parentNode.removeChild(insertBefore)
    }
    */
    newSupport.global.context = {} // do not share previous outputs
    // delete newSupport.global.deleted
  }

  return buildNewTag(
    newSupport,
    newSupport.global.insertBefore as Element,
    newSupport,
    subject,
  )
}

function buildNewTag(
  newSupport: TagSupport,
  oldInsertBefore: Element | Text | ChildNode,
  oldTagSupport: BaseTagSupport | TagSupport,
  subject: TagSubject,
) {
  newSupport.buildBeforeElement(oldInsertBefore, {
    counts: {added: 0, removed: 0},
  })

  newSupport.global.oldest = newSupport
  newSupport.global.newest = newSupport
  oldTagSupport.global.oldest = newSupport
  oldTagSupport.global.newest = newSupport
  
  subject.tagSupport = newSupport
  subject.tagSupport.ownerTagSupport.global.childTags.push(newSupport)

  return newSupport
}

function syncFunctionProps(
  newSupport: TagSupport,
  lastSupport: TagSupport,
  ownerSupport: BaseTagSupport | TagSupport,
  newPropsArray: any[], // templater.props
): Props {
  const newest = lastSupport.global.newest as TagSupport

  if(!newest) {
    // const state = ownerSupport.global.oldest.memory.state
    const state = ownerSupport.memory.state
    newPropsArray.length = 0
    const castedProps = castProps(newPropsArray, newSupport, state)
    newPropsArray.push( ...castedProps )
    newSupport.propsConfig.castProps = castedProps
    return newPropsArray
  }

  lastSupport = newest || lastSupport as TagSupport

  const priorPropConfig = lastSupport.propsConfig
  const priorPropsArray = priorPropConfig.castProps as Props

  const newArray = []
  for (let index = newPropsArray.length - 1; index >= 0; --index) {
    const prop = newPropsArray[index]
    const priorProp = priorPropsArray[index]

    const newValue = syncPriorPropFunction(
      priorProp, prop, newSupport, ownerSupport,
    )

    newArray.push(newValue)
  }

  newSupport.propsConfig.castProps = newArray

  return newArray
}

function syncPriorPropFunction(
  priorProp: any,
  prop: any,
  newSupport: BaseTagSupport | TagSupport,
  ownerSupport: BaseTagSupport | TagSupport,
  seen: any[] = [],
) {
  if(priorProp instanceof Function) {
    // the prop i am receiving, is already being monitored/controlled by another parent
    if(prop.toCall) {
      priorProp.toCall = prop.toCall
      return prop
    }
    
    const ownerGlobal = ownerSupport.global
    const oldOwnerState = (ownerGlobal.newest as TagSupport).memory.state

    priorProp.prop = prop
    priorProp.stateArray = oldOwnerState

    return priorProp
  }

  // prevent infinite recursion
  if(seen.includes(prop)) {
    return prop
  }
  seen.push(prop)

  if(typeof(prop)!=='object' || !prop) {
    return prop // no children to crawl through
  }

  if(prop instanceof Array) {
    for (let index = prop.length - 1; index >= 0; --index) {
      const x = prop[index]
      prop[index] = syncPriorPropFunction(
        priorProp[index], x, newSupport, ownerSupport, seen,
      )
    }

    return prop
  }

  if(priorProp === undefined) {
    return prop
  }

  for(const name in prop){
    const subValue = (prop as any)[name]
    const result = syncPriorPropFunction(
      priorProp[name], subValue, newSupport, ownerSupport, seen,
    )
    
    const hasSetter = Object.getOwnPropertyDescriptor(prop, name)?.set
    if(hasSetter) {
      continue
    }

    prop[name] = result
  }
  
  return prop

}

export function moveProviders(
  lastSupport: TagSupport,
  newSupport: TagSupport,
) {
  const destroy$ = lastSupport.global.destroy$
  lastSupport.global.providers.forEach(provider => {
    provider.children.forEach((child, index) => {
      const wasSameGlobals = lastSupport.global.destroy$ === child.global.destroy$
      if(wasSameGlobals) {
        provider.children.splice(index, 1)
        provider.children.push(newSupport)
        return
      }
    })
  })
}
