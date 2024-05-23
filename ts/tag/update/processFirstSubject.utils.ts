import { isSubjectInstance, isTagArray, isTagClass, isTagComponent, isTagTemplater } from '../../isInstance'
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
  unknown = 'unknown',
  tag = 'tag',
  templater = 'templater',
  tagArray = 'tag-array',
  tagComponent = 'tag-component',
  subject = 'subject',
  
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

  if(value instanceof Date) {
    return ValueTypes.date
  }

  if(value instanceof Function) {
    return ValueTypes.function
  }

  const type = typeof(value)
  if(isSimpleType(type)) {
    return type as ValueTypes
  }

  if(isTagComponent(value)) {
    return ValueTypes.tagComponent
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

  if(isSubjectInstance(value)) {
    return ValueTypes.subject
  }

  return ValueTypes.unknown
}

export type processOptions = {
  counts: Counts // used to count stagger
}

export type ClonesAndPromise = {
  clones: Clones
}

export type InterpolateSubject = (ValueSubject<undefined> | TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>) & {
  clone?: Element | Text | Template
}

// what can be put down with ${}
export type TemplateValue = Tag | TemplaterResult | (Tag | TemplaterResult)[] | RegularValue | Subject<any> | Callback
