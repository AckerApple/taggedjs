import { TagSupport, getTagSupport } from "./getTagSupport.js"
import { config as providers } from "./providers.js"
import { ValueSubject } from "./ValueSubject.js"
import { runBeforeRender } from "./tagRunner.js"
import { TemplaterResult } from "./tag.js"
import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"

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
  templater.redraw = () => {
    // Find previous variables
    const existingTag: Tag | undefined = existing.tag
    const tagSupport = existingTag?.tagSupport || getTagSupport(ownerTag.tagSupport.depth, templater) // this.tagSupport

    // signify to other operations that a rendering has occurred so they do not need to render again
    ++tagSupport.renderCount

    existing.tagSupport = tagSupport
    // const self = this as any
    const self = templater
    tagSupport.mutatingRender = tagSupport.mutatingRender || existing.tagSupport?.mutatingRender || (/* TODO: we might be able to remove this last OR */(self as any).tagSupport.mutatingRender)
    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag
    runBeforeRender(tagSupport, tagSupport.oldest)

    if(tagSupport.oldest) {
      tagSupport.oldest.beforeRedraw()
    } else {
      providers.ownerTag = runtimeOwnerTag
    }

    const {remit, retag} = templater.renderWithSupport(
      tagSupport,
      runtimeOwnerTag,
      existingTag
    )

    if(!remit) {
      return
    }

    existing.set(templater)

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
