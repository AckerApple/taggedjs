import { Tag } from './Tag.class'
import { isSubjectInstance, isTagArray, isTagInstance } from './isInstance'
import { setUse } from './state'
import { TemplaterResult, Wrapper } from './TemplaterResult.class'
import { runTagCallback } from './bindSubjectCallback.function'
import { deepClone } from './deepFunctions'
import { TagSupport } from './TagSupport.class'
import { TagSubject } from './Tag.utils'
import { alterProps } from './alterProps.function'
import { ValueSubject } from './subject/ValueSubject'

export type TagChildren = ValueSubject<Tag[]> & { lastArray?: Tag[] }
export type TagChildrenInput = Tag[] | Tag | TagChildren
export type TagComponentArg<T extends any[]> = (...args: T) => Tag;
type FirstArgOptional<T extends any[]> = T['length'] extends 0 ? true : false;

// export type TagComponent = TagComponentArg<[any?, TagChildren?]>
export type TagComponentBase<T extends any[]> = (
  arg: FirstArgOptional<T> extends true ? (T[0] | void) : T[0],
  // props: FirstParameter<T>,
  children?: TagChildrenInput
) => Tag

export const tags: TagComponentBase<any>[] = []
export type TagComponent = TagComponentBase<[any?, TagChildren?]> | TagComponentBase<[]>

let tagCount = 0

/** Wraps a tag component in a state manager and always push children to last argument as an array */
// export function tag<T>(a: T): T;
export function tag<T extends any[]>(
  tagComponent: TagComponentArg<T>
): (TagComponentBase<T>) {
  const result = (function tagWrapper(
    props?: T | Tag | Tag[],
    children?: TagChildrenInput
  ) {
    const isPropTag = isTagInstance(props) || isTagArray(props)    
    
    if(isPropTag) {
      children = props as Tag | Tag[] | TagChildren
      props = undefined
    }

    const { childSubject, madeSubject } = kidsToTagArraySubject(children)
    ;(childSubject as any).isChildSubject = true

    const templater: TemplaterResult = new TemplaterResult(props, childSubject)
    const innerTagWrap: Wrapper = getTagWrap(
      templater,
      madeSubject,
    )

    innerTagWrap.original = tagComponent
    
    templater.tagged = true    
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  }) // we override the function provided and pretend original is what's returned

  updateResult(result, tagComponent as unknown as TagComponent)

  // group tags together and have hmr pickup
  updateComponent(tagComponent)
  tags.push(tagComponent as unknown as TagComponent)

  return result as any
}

function kidsToTagArraySubject(
  children?: TagChildrenInput
): {
  childSubject: ValueSubject<Tag[]>,
  madeSubject: boolean
} {
  if(isSubjectInstance(children)) {
    return {childSubject: children as ValueSubject<Tag[]>, madeSubject: false}
  }
  
  const kidArray = children as Tag[]
  if(isTagArray(kidArray)) {
    return {childSubject: new ValueSubject(children as Tag[]), madeSubject: true}
  }

  const kid = children as Tag
  if(kid) {
    kid.memory.arrayValue = 0
    return {childSubject: new ValueSubject([kid]), madeSubject: true}
  }

  return {
    childSubject: new ValueSubject<Tag[]>([]),
    madeSubject: true
  }
}

function updateResult(
  result: any,
  tagComponent: TagComponent
) {
  result.isTag = true
  result.original = tagComponent
}

function updateComponent(
  tagComponent: any
) {
  tagComponent.tags = tags
  tagComponent.setUse = setUse
  tagComponent.tagIndex = tagCount++ // needed for things like HMR
}

/** creates/returns a function that when called then calls the original component function */
function getTagWrap(
  templater: TemplaterResult,
  madeSubject: boolean
): Wrapper {
  const innerTagWrap = function(
    oldTagSetup: TagSupport,
    subject: TagSubject,
  ) {
    const global = oldTagSetup.templater.global
    global.newestTemplater = templater
    ++global.renderCount
    
    templater.global = global
    
    const childSubject = templater.children
    const lastArray = global.oldest?.tagSupport.templater.children.lastArray
    if(lastArray) {
      childSubject.lastArray = lastArray
    }

    const originalFunction = (innerTagWrap as any).original as unknown as TagComponent
    // const oldTagSetup = templater.tagSupport

    const oldest = templater.global.oldest

    if(oldest && !oldest.hasLiveElements) {
      throw new Error('issue already 22')
    }

    let props = templater.props
    const ownerTagSupport = oldTagSetup.ownerTagSupport
    const oldTemplater = ownerTagSupport?.templater
    const oldLatest = oldTemplater?.global.newest
    const newestOwnerTemplater = oldLatest?.tagSupport.templater

    if(oldLatest && !newestOwnerTemplater) {
      throw new Error('what to do here?')
    }

    let castedProps = alterProps(
      props,
      newestOwnerTemplater as TemplaterResult,
      oldTagSetup.ownerTagSupport,
    )
    const clonedProps = deepClone(props) // castedProps

    // CALL ORIGINAL COMPONENT FUNCTION
    const tag = originalFunction(castedProps, childSubject)

    tag.version = global.renderCount
    tag.tagSupport = new TagSupport(
      oldTagSetup.ownerTagSupport,
      templater,
      subject,
    )

    tag.tagSupport.propsConfig = {
      latest: props, // castedProps
      latestCloned: clonedProps,
      clonedProps: clonedProps,
      lastClonedKidValues: tag.tagSupport.propsConfig.lastClonedKidValues,
    }

    tag.tagSupport.memory = oldTagSetup.memory // state handover

    if(madeSubject) {
      childSubject.value.forEach(kid => {
        kid.values.forEach((value, index) => {            
          if(!(value instanceof Function)) {
            return
          }

          const valuesValue = kid.values[index]
          
          if(valuesValue.isChildOverride) {
            return // already overwritten
          }

          // all functions need to report to me
          kid.values[index] = function(...args: unknown[]) {
            const ownerTag = tag.ownerTag as Tag
            runTagCallback(
              value, // callback
              ownerTag,
              this, // bindTo
              args
            )
          }
          
          valuesValue.isChildOverride = true
        })
      })
    }

    return tag
  }

  return innerTagWrap as Wrapper
}
