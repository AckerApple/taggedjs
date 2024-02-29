import { processSubjectComponent } from "./processSubjectComponent.function.js"
import { processTagResult } from "./processTagResult.function.js"
import { isTagArray, isTagComponent, isTagInstance } from "./isInstance.js"
import { TagArraySubject, processTagArray } from "./processTagArray.js"
import { TemplaterResult } from "./templater.utils.js"
import { TagSupport } from "./TagSupport.class.js"
import { Clones } from "./Clones.type.js"
import { Tag } from "./Tag.class.js"
import { Counts, Template, updateBetweenTemplates } from "./interpolateTemplate.js"
import { TagSubject } from "./Tag.utils.js"
import { ValueSubject } from "./ValueSubject.js"
import { processRegularValue } from "./processRegularValue.function.js"

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
  counts: Counts // used to count stagger
}

export type ClonesAndPromise = {
  clones: Clones
  promise?: Promise<any>
}

export function processSubjectValue(
  value: any,
  result: TagArraySubject | TagSubject, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
): ClonesAndPromise {
  const valueType = getValueType(value)

  // Previously was simple value, now its a tag of some sort
  const resultTag = result as TagSubject
  const clone = resultTag.clone
  const noLongerSimpleValue = valueType !== ValueTypes.value && clone

  if(noLongerSimpleValue) {
    const parent = clone.parentNode as ParentNode
    // template.removeAttribute('removedAt')
    parent.insertBefore(template, clone)
    parent.removeChild(clone)
    delete resultTag.clone
    // result.clone = template
  }
  
  switch (valueType) {
    case ValueTypes.tag:
      return {
        clones: processTag(value, result, template, ownerTag, options)
      }
  
    case ValueTypes.tagArray:
      return {
        clones: processTagArray(result as TagArraySubject, value, template, ownerTag, options)
      }
      
    case ValueTypes.tagComponent:
      return {
        clones: processSubjectComponent(value, result as TagSubject, template, ownerTag, options)
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
    clones: processRegularValue(value, result, template, ownerTag)
  }
}

export function processTag(
  value: any,
  result: TagSubject | TagArraySubject, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
) {
  // first time seeing this tag?
  if(!value.tagSupport) {
    value.tagSupport = new TagSupport(
      {} as TemplaterResult, // the template is provided via html`` call
      new ValueSubject([]), // no children
    )

    // asking me to render will cause my parent to render
    value.tagSupport.mutatingRender = () => {
      ownerTag.tagSupport.render()
    }
    value.tagSupport.oldest = value.tagSupport.oldest || value
    
    ownerTag.children.push(value as Tag)
    value.ownerTag = ownerTag
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

  const clone = updateBetweenTemplates(
    value,
    // template // template, // this will be removed from document inside this function
    lastFirstChild,
  )

  result.clone = clone

  // cleanup old
  delete result.tag
  
  /* destroy logic */
    const stagger = options.counts.removed
    const promise = tag.destroy({stagger}).then(animated => 
      options.counts.removed = stagger + animated
    )
  /* end: destroy logic */

  return promise
}