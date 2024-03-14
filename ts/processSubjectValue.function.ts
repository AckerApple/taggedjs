import { processSubjectComponent } from './processSubjectComponent.function'
import { processTagResult } from './processTagResult.function'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { TagArraySubject, processTagArray } from './processTagArray'
import { TemplaterResult } from './templater.utils'
import { TagSupport } from './TagSupport.class'
import { Clones } from './Clones.type'
import { Tag } from './Tag.class'
import { Counts, Template } from './interpolateTemplate'
import { DisplaySubject, TagSubject } from './Tag.utils'
import { ValueSubject } from './ValueSubject'
import { processRegularValue } from './processRegularValue.function'
import { Callback } from './bindSubjectCallback.function'

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
      processTag(
        value,
        result as TagSubject,
        template,
        ownerTag,
        options
      )
      return []
  
    case ValueTypes.tagArray:
      return processTagArray(result as TagArraySubject, value, template, ownerTag, options)
    
    case ValueTypes.tagComponent:
      processSubjectComponent(
        value,
        result as TagSubject,
        template,
        ownerTag,
        options
      )
      return []
  }

  return processRegularValue(
    value,
    result as DisplaySubject,
    template,
  )
}

/** Could be a regular tag or a component. Both are Tag.class */
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
  }
  
  value.ownerTag = ownerTag
  result.template = template

  processTagResult(
    value,
    result, // Function will attach result.tag
    template,
    options,
  )
}
