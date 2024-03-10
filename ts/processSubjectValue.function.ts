import { processSubjectComponent } from "./processSubjectComponent.function.js"
import { processTagResult } from "./processTagResult.function.js"
import { isTagArray, isTagComponent, isTagInstance } from "./isInstance.js"
import { TagArraySubject, processTagArray } from "./processTagArray.js"
import { TemplaterResult } from "./templater.utils.js"
import { TagSupport } from "./TagSupport.class.js"
import { Clones } from "./Clones.type.js"
import { Tag } from "./Tag.class.js"
import { Counts, Template } from "./interpolateTemplate.js"
import { DisplaySubject, TagSubject } from "./Tag.utils.js"
import { ValueSubject } from "./ValueSubject.js"
import { processRegularValue } from "./processRegularValue.function.js"
import { Callback } from "./bindSubjectCallback.function.js"

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
  // promise?: Promise<any>
}

export type InterpolateSubject = TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>

export function processSubjectValue(
  value: any,
  result: InterpolateSubject, // could be tag via result.tag
  template: Element | Text | Template, // <template end interpolate /> (will be removed)
  ownerTag: Tag, // owner
  options: processOptions, // {added:0, removed:0}
): Clones {
  const valueType = getValueType(value)
  
  switch (valueType) {
    case ValueTypes.tag:
      return processTag(
          value,
          result as TagSubject,
          template,
          ownerTag,
          options
        )
  
    case ValueTypes.tagArray:
      const clones = processTagArray(result as TagArraySubject, value, template, ownerTag, options)
      return clones
      
    case ValueTypes.tagComponent:
      return processSubjectComponent(
          value,
          result as TagSubject,
          template,
          ownerTag,
          options
        )
  }

  return processRegularValue(
    value,
    result as DisplaySubject,
    template,
  )
}

export function processTag(
  value: any,
  result: TagSubject, // could be tag via result.tag
  template: Element | Text | Template, // <template end interpolate /> (will be removed)
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
  
  result.template = template

  const clones = processTagResult(
    value,
    result, // Function will attach result.tag
    template,
    options,
  )

  return clones  
}

export function destroySimpleValue(
  template: Element | Text | Template,
  subject: DisplaySubject,
) {
  const clone = subject.clone as Element
  const parent = clone.parentNode as ParentNode

  // put the template back down
  parent.insertBefore(template, clone)
  parent.removeChild(clone)
  
  delete subject.clone
  delete subject.lastValue
}
