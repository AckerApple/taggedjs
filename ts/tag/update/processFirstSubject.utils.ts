import { isTagArray, isTagClass, isTagTemplater } from '../../isInstance'
import { TagArraySubject } from './processTagArray'
import { TemplaterResult } from '../../TemplaterResult.class'
import { Clones } from '../../interpolations/Clones.type'
import { Counts, Template } from '../../interpolations/interpolateTemplate'
import { DisplaySubject, TagSubject } from '../../subject.types'
import { ValueSubject } from '../../subject/ValueSubject'
import { RegularValue } from './processRegularValue.function'
import { Callback } from '../../interpolations/bindSubjectCallback.function'
import { Tag } from '../Tag.class'
import { Subject } from '../../subject'
import { isSimpleType } from '../checkDestroyPrevious.function'

export enum ValueTypes {
  tag = 'tag',
  templater = 'templater',
  tagArray = 'tag-array',
  tagComponent = 'tag-component',
  value = 'value',
  
  date = 'date',
  string = 'string',
  boolean = 'boolean',
  function = 'function',
  undefined = 'undefined',
}

export function getValueType(value: any): ValueTypes {
  if(value === undefined || value === null) {
    return ValueTypes.undefined
  }

  const type = typeof(value)
  if(isSimpleType(type) || type === 'function') {
    return type as ValueTypes
  }

  if(value instanceof Date) {
    return ValueTypes.date
  }

  if (isTagTemplater(value)) {
    return ValueTypes.templater
  }

  if (isTagClass(value)) {
    return ValueTypes.tag
  }

  if (isTagArray(value)) {
    return ValueTypes.tagArray
  }

  return ValueTypes.tagComponent
}

export type processOptions = {
  forceElement?: boolean
  counts: Counts // used to count stagger
}

export type ClonesAndPromise = {
  clones: Clones
  // promise?: Promise<any>
}

export type InterpolateSubject = (ValueSubject<undefined> | TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>) & {
  clone?: Element | Text | Template
}

// what can be put down with ${}
export type TemplateValue = Tag | TemplaterResult | (Tag | TemplaterResult)[] | RegularValue | Subject<any> | Callback
// export type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag
