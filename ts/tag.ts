import { Tag } from './Tag.class'
import { isSubjectInstance, isTagArray, isTagClass, isTagTemplater } from './isInstance'
import { setUse } from './state'
import { TemplaterResult, Wrapper } from './TemplaterResult.class'
import { runTagCallback } from './interpolations/bindSubjectCallback.function'
import { deepClone } from './deepFunctions'
import { TagSupport } from './TagSupport.class'
import { TagSubject } from './subject.types'
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
): TagComponentBase<T> {
  /** function developer triggers */
  const result = (function tagWrapper(
    props?: T | Tag | Tag[],
    children?: TagChildrenInput
  ): TemplaterResult {
    // is the props argument actually children?
    const isPropTag = isTagClass(props) || isTagTemplater(props) || isTagArray(props)    
    
    if(isPropTag) {
      children = props as Tag | Tag[] | TagChildren
      props = undefined
    }

    const { childSubject, madeSubject } = kidsToTagArraySubject(children)
    ;(childSubject as any).isChildSubject = true

    const templater: TemplaterResult = new TemplaterResult(props, childSubject)
    
    // attach memory back to original function that contains developer display logic
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

  // fake the return as being (props?, children?) => TemplaterResult
  return result as unknown as TagComponentBase<T>
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

/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
function getTagWrap(
  templater: TemplaterResult,
  madeSubject: boolean
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

    const originalFunction = (innerTagWrap as any).original as unknown as TagComponent
    
    let props = templater.props
    let castedProps = alterProps(
      props,
      oldTagSetup.ownerTagSupport,
    )
    const clonedProps = deepClone(props) // castedProps

    // CALL ORIGINAL COMPONENT FUNCTION
    const tag = originalFunction(castedProps, childSubject)

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
      latestCloned: clonedProps,
      lastClonedKidValues: tagSupport.propsConfig.lastClonedKidValues,
    }

    tagSupport.memory = oldTagSetup.memory // state handover

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
            const ownerSupport = tagSupport.ownerTagSupport
            runTagCallback(
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
