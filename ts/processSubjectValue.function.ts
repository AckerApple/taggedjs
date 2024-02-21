import { processSubjectComponent } from "./processSubjectComponent.function.js"
import { processTagResult } from "./processTagResult.function.js"
import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from "./isInstance.js"
import { TagArraySubject, processTagArray } from "./processTagArray.js"
import { TemplaterResult } from "./templater.utils.js"
import { TagSupport } from "./TagSupport.class.js"
import { Clones } from "./Clones.type.js"
import { Tag } from "./Tag.class.js"
import { Counts, Template, updateBetweenTemplates } from "./interpolateTemplate.js"
import { TagSubject } from "./Tag.utils.js"
import { ValueSubject } from "./ValueSubject.js"

enum ValueTypes {
  tag = 'tag',
  tagArray = 'tag-array',
  tagComponent = 'tag-component',
  value = 'value',
}

function getValueType(value: any): ValueTypes {
  if(isTagComponent(value)) {
    return ValueTypes.tagComponent
  }

  if (isTagInstance(value)) {
    return ValueTypes.tag
  }

  if (isTagArray(value)) {
    return ValueTypes.tagArray
  }

  return ValueTypes.value
}

type processOptions = {
  forceElement?: boolean
  counts: Counts
}

export type ClonesAndPromise = {
  clones: Clones
  promise?: Promise<any>
}

export function processSubjectValue(
  value: any,
  result: TagArraySubject | TagSubject, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  tag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
): ClonesAndPromise {
  const valueType = getValueType(value)

  // Previously was simple value, now its a tag of some sort
  const resultTag = result as TagSubject
  const clone = resultTag.clone
  if(valueType !== ValueTypes.value && clone) {
    const parent = clone.parentNode as ParentNode
    template.removeAttribute('removedAt')
    parent.insertBefore(template, clone)
    parent.removeChild(clone)
    delete resultTag.clone
    // result.clone = template
  }
  
  switch (valueType) {
    case ValueTypes.tag:
      return {
        clones: processTag(value, result, template, tag, options)
      }
  
    case ValueTypes.tagArray:
      return {
        clones: processTagArray(result as TagArraySubject, value, template, tag, options)
      }
      
    case ValueTypes.tagComponent:
      return {
        clones: processSubjectComponent(value, result as TagSubject, template, tag, options)
      }
  }

  // *if processing WAS a tag BUT NOW its some other non-tag value
  if ( (result as TagSubject).tag ) {
    return {
      clones: [],
      promise: processWasTag(value, result, template, options),
    }
  }

  return {
    clones: processRegularValue(value, result, template, tag)
  }
}

function processRegularValue(
  value: any,
  result: any, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  tag: Tag, // owner
) {
  const before = result.clone || template // Either the template is on the doc OR its the first element we last put on doc

  // Processing of regular values
  const clone = updateBetweenTemplates(
    value,
    before, // this will be removed
  )

  result.clone = clone // remember single element put down, for future updates

  const clones: Clones = []
  const oldPos = tag.clones.indexOf(before) // is the insertBefore guide being considered one of the tags clones?
  const isOnlyGuideInClones = oldPos>=0 && !tag.clones.includes(clone)
  const exchangeGuideForClone = isOnlyGuideInClones && !before.parentNode // guide is in clones AND guide is not on the document

  if( exchangeGuideForClone ) {
    tag.clones.splice(oldPos, 1) // remove insertBefore guide from tag
    tag.clones.push(clone) // exchange guide for element actually on document
    clones.push(clone) // record the one element that in the end is on the document
  }

  return clones
}

export function processTag(
  value: any,
  result: TagSubject | TagArraySubject, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  tag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
) {
  // first time seeing this tag?
  if(!value.tagSupport) {
    value.tagSupport = new TagSupport(
      {} as TemplaterResult, // the template is provided via html`` call
      new ValueSubject([]), // no children
    )

    // asking me to render will cause my parent to render
    value.tagSupport.mutatingRender = tag.tagSupport.mutatingRender
    value.tagSupport.oldest = value.tagSupport.oldest || value
    
    tag.children.push(value as Tag)
    value.ownerTag = tag

    ;(result as any).sideTag = tag
  }

  // (result as any).template = template
  (result as any).template = template

  const clones = processTagResult(
    value,
    result, // Function will attach result.tag
    template,
    options,
  )

  return clones  
}

function processWasTag(
  value: any,
  result: any, // could be tag via result.tag,
  template: Template, // <template end interpolate /> (will be removed)
  options: processOptions, // {added:0, removed:0}
) {
  const tag: Tag = result.tag

  // put the template back
  const lastFirstChild = result.clone || template// result.tag.clones[0] // template.lastFirstChild
  // const parentNode = lastFirstChild.parentNode || template.parentNode
  
  // put the template back down
  lastFirstChild.parentNode.insertBefore(template, lastFirstChild)

  // cleanup old
  if(result.clone) {
    result.clone.parentNode.removeChild(result.clone)
  }
  delete result.tag

  const stagger = options.counts.removed
  const promise = tag.destroy({stagger}).then(animated => 
    options.counts.removed = stagger + animated
  )
  delete result.tag

  const clone = updateBetweenTemplates(
    value,
    template, // this will be removed from document inside this function
  )

  result.clone = clone

  return promise
}