import { Tag } from "./Tag.class.js"
import { isSubjectInstance, isTagArray, isTagInstance } from "./isInstance.js"
import { setUse } from "./setUse.function.js"
import { TemplaterResult, Wrapper, alterProps } from "./templater.utils.js"
import { ValueSubject } from "./ValueSubject.js"
import { runTagCallback } from "./bindSubjectCallback.function.js"
import { deepClone } from "./deepFunctions.js"
import { TagSupport } from "./TagSupport.class.js"
import { renderExistingTag } from "./renderExistingTag.function.js"

export type TagChildren = ValueSubject<Tag[]>
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


/** Wraps a tag component in a state manager and always push children to last argument as any array */
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

    const innerTagWrap:Wrapper = (oldTagSetup) => {
      const originalFunction = innerTagWrap.original as unknown as TagComponent
      // const oldTagSetup = templater.tagSupport

      const oldest = templater.oldest

      let props = oldTagSetup.propsConfig.latest
      let castedProps = alterProps(props, templater)
      
      // CALL ORIGINAL COMPONENT FUNCTION
      const tag = originalFunction(castedProps, childSubject)

      if(oldTagSetup.mutatingRender === TagSupport.prototype.mutatingRender) {
        oldTagSetup.oldest = tag
        templater.oldest = tag
        // tag.tagSupport = oldTagSetup

        oldTagSetup.mutatingRender = () => {
          const exit = renderExistingTag(templater.oldest as Tag, templater, oldTagSetup)

          if(exit) {
            return tag
          }
          
          // Have owner re-render
          if(tag.ownerTag) {
            const newest = tag.ownerTag.tagSupport.render()
            // TODO: Next line most likely not needed
            tag.ownerTag.tagSupport.newest = newest
            return tag
          }
      
          return tag
        }
      }

      tag.tagSupport = new TagSupport(templater, oldTagSetup.children)

      const clonedProps = deepClone(castedProps) // castedProps
      tag.tagSupport.propsConfig = {
        latest: props, // castedProps
        latestCloned: clonedProps,
        clonedProps: clonedProps,
        lastClonedKidValues: tag.tagSupport.propsConfig.lastClonedKidValues,
      }

      tag.tagSupport.memory = oldTagSetup.memory
      // ???
      // tag.tagSupport.memory = {...oldTagSetup.memory}
      // tag.tagSupport.memory.context = {...oldTagSetup.memory.context}
      tag.tagSupport.mutatingRender = oldTagSetup.mutatingRender
      oldTagSetup.newest = tag

      oldTagSetup.propsConfig = {...tag.tagSupport.propsConfig}
      if(oldest) {
        oldest.tagSupport.propsConfig = {...tag.tagSupport.propsConfig}
      }

      if(madeSubject) {
        childSubject.value.forEach(kid => {
          kid.values.forEach((value, index) => {            
            if(!(value instanceof Function)) {
              return
            }
            
            if(kid.values[index].isChildOverride) {
              return // already overwritten
            }
            
            // all functions need to report to me
            kid.values[index] = function(...args: unknown[]) {
              runTagCallback(value, tag.ownerTag as Tag, this, args)
              // runTagCallback(value, tag, this, args)
            }
            
            kid.values[index].isChildOverride = true
          })
        })
      }

      return tag
    }

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
    kid.arrayValue = 0
    return {childSubject: new ValueSubject([kid]), madeSubject: true}
  }

  return {childSubject: new ValueSubject([]), madeSubject: true}
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
class NoPropsGiven {}
const noPropsGiven = new NoPropsGiven()
