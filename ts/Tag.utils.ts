import { TagSupport } from "./getTagSupport.js"
import { ValueSubject } from "./ValueSubject.js"
import { TemplaterResult } from "./tag.js"
import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { redrawTag } from "./redrawTag.function.js"
import { runBeforeRender } from "./tagRunner.js"

export type TagSubject = Subject & {tagSupport: TagSupport, tag: Tag}

export function getSubjectFunction(
  value: any,
  tag: Tag,
) {
  return new ValueSubject(bindSubjectFunction(value, tag))
}

/**
 * @param {*} value 
 * @param {Tag} tag 
 * @returns 
 */
export function bindSubjectFunction(
  value: (...args: any[]) => any,
  tag: Tag,
) {
  function subjectFunction(
    element: Element,
    args: any[]
  ) {
    const renderCount = tag.tagSupport.renderCount

    const method = value.bind(element)
    const callbackResult = method(...args)

    if(renderCount !== tag.tagSupport.renderCount) {
      return // already rendered
    }

    tag.tagSupport.render()
    
    if(callbackResult instanceof Promise) {
      callbackResult.then(() => {
        tag.tagSupport.render()
      })
    }

    return callbackResult
  }

  subjectFunction.tagFunction = value

  return subjectFunction
}

type ExistingValue = {
  tagSupport: TagSupport
  tag: Tag
}

/**
 * 
 * @param {*} templater 
 * @param {ExistingValue} existing 
 * @param {Tag} ownerTag 
 */
export function setValueRedraw(
  templater: TemplaterResult, // latest tag function to call for rendering
  existing: TagSubject,
  ownerTag: Tag,
) {
  // redraw does not communicate to parent
  templater.redraw = (
    force?: boolean // forces redraw on children
  ) => {
    // Find previous variables
    const existingTag: Tag | undefined = existing.tag
    const {remit, retag} = redrawTag(existingTag, templater, ownerTag)
    existing.tagSupport = retag.tagSupport

    if(!remit) {
      return
    }

    existing.set(templater)

    if(force) {
      const context = existingTag.tagSupport.memory.context
      Object.values(context).forEach((item: any) => {
        if(!item.value?.isTemplater) {
          return
        }

        runBeforeRender(item.tag.tagSupport, item.tag)
        item.tag.beforeRedraw()
    
        item.value.redraw()
      })
    }

    return retag
  }
}

export function elementDestroyCheck(
  nextSibling: Element & {ondestroy?: () => any},
  stagger: number,
) {
  const onDestroyDoubleWrap = nextSibling.ondestroy // nextSibling.getAttribute('onDestroy')
  if(!onDestroyDoubleWrap) {
    return
  }

  const onDestroyWrap = (onDestroyDoubleWrap as any).tagFunction
  if(!onDestroyWrap) {
    return
  }

  const onDestroy = onDestroyWrap.tagFunction
  if(!onDestroy) {
    return
  }

  const event = {target: nextSibling, stagger}
  return onDestroy(event)
}
