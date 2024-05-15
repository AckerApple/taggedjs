import { Tag } from './Tag.class'
import { isSubjectInstance, isTagArray, isTagClass, isTagTemplater } from '../isInstance'
import { setUse } from '../state'
import { OriginalFunction, TemplaterResult, Wrapper } from '../TemplaterResult.class'
import { runTagCallback } from '../interpolations/bindSubjectCallback.function'
import { deepClone } from '../deepFunctions'
import { TagSupport } from './TagSupport.class'
import { TagSubject } from '../subject.types'
import { alterProps } from '../alterProps.function'
import { ValueSubject } from '../subject/ValueSubject'

export type TagChildren = ValueSubject<Tag[]> & { lastArray?: Tag[] }
export type TagChildrenInput = Tag[] | Tag | TagChildren
/*
export type TagComponentArg<T extends any[]> = (
  (...args: T) => Tag | ((...args: T) => (...args: any[]) => Tag)
)
*/

type FirstArgOptional<T extends any[]> = T['length'] extends 0 ? true : false;

// export type TagComponent = TagComponentArg<[any?, TagChildren?]>
export type TagComponentBase<T extends any[]> = (
  arg: FirstArgOptional<T> extends true ? (T[0] | void) : T[0],
  // props: FirstParameter<T>,
  children?: TagChildrenInput
) => Tag

// export const tags: TagComponentBase<any>[] = []
export const tags: TagWrapper<any>[] = []
export type TagComponent = TagComponentBase<[any?, TagChildren?]> | TagComponentBase<[]>

let tagCount = 0

export type TagWrapper<T> = ((
  ...props: T[]
) => TemplaterResult) & {
  original: (...args: any[]) => any
  compareTo: string
  isTag: boolean
}

export type TagMaker = ((...args: any[]) => Tag) | ((...args: any[]) => (...args: any[]) => Tag)

/** Wraps a tag component in a state manager and always push children to last argument as an array */
// export function tag<T>(a: T): T;
export function tag<T>(
  tagComponent: T
): T & {original: Function} {
  /** function developer triggers */
  const parentWrap = (function tagWrapper(
    ...props: (T | Tag | Tag[])[]
  ): TemplaterResult {
    const templater: TemplaterResult = new TemplaterResult(props)
    
    // attach memory back to original function that contains developer display logic
    const innerTagWrap: Wrapper = getTagWrap(
      templater,
      parentWrap
    )

    if(!innerTagWrap.parentWrap) {
      innerTagWrap.parentWrap = parentWrap
    }
    
    templater.tagged = true
    templater.wrapper = innerTagWrap as Wrapper

    return templater
  }) as TagWrapper<T>// we override the function provided and pretend original is what's returned
  
  ;(parentWrap as any).original = tagComponent
  parentWrap.compareTo = (tagComponent as any).toString()

  updateResult(parentWrap, tagComponent as unknown as TagComponent)

  // group tags together and have hmr pickup
  updateComponent(tagComponent)
  tags.push(parentWrap)

  return parentWrap as unknown as (T & {original: Function})
}

export function kidsToTagArraySubject(
  children?: TagChildrenInput
): {
  childSubject: ValueSubject<Tag[]>,
  madeSubject: boolean // was converted into a subject
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
    madeSubject: true // was converted into a subject
  }
}

function updateResult(
  result: TagWrapper<any>,
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

/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
function getTagWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>
): Wrapper {
  // this function gets called by taggedjs
  const innerTagWrap = function(
    oldTagSetup: TagSupport,
    subject: TagSubject,
  ): TagSupport {
    const global = oldTagSetup.global
    ++global.renderCount
        
    const childSubject = templater.children
    const lastArray = global.oldest?.templater.children.lastArray
    if(lastArray) {
      childSubject.lastArray = lastArray
    }

    // result.original
    const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
    
    let props = templater.props
    let castedProps = props.map(props => alterProps(
      props,
      oldTagSetup.ownerTagSupport,
    ))
    const latestCloned = props.map(props => deepClone(props)) // castedProps

    // CALL ORIGINAL COMPONENT FUNCTION
    let tag = originalFunction(...castedProps)

    if(tag instanceof Function) {
      tag = tag()
    }

    tag.templater = templater
    templater.tag = tag

    const tagSupport = new TagSupport(
      templater,
      oldTagSetup.ownerTagSupport,
      subject,
      global.renderCount
    )

    tagSupport.global = global

    tagSupport.propsConfig = {
      latest: props,
      latestCloned,
      lastClonedKidValues: tagSupport.propsConfig.lastClonedKidValues,
    }

    tagSupport.memory = oldTagSetup.memory // state handover

    if( templater.madeChildIntoSubject ) {
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
            const ownerSupport = tagSupport.ownerTagSupport
            return runTagCallback(
              value, // callback
              ownerSupport,
              this, // bindTo
              args
            )
          }
          
          valuesValue.isChildOverride = true
        })
      })
    }

    return tagSupport
  }

  return innerTagWrap as Wrapper
}
