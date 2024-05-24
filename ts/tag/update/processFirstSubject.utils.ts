import { isSubjectInstance, isTagArray } from '../../isInstance'
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
  
  tag = 'tag', // this one might be bad
  templater = 'templater',
  tagComponent = 'tag-component',
  
  tagArray = 'tag-array',
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

  const type = typeof(value)
  
  if(value instanceof Function) {
    return ValueTypes.function
  }
  
  if(type === 'object') {
    if(value instanceof Date) {
      return ValueTypes.date
    }
  
    if(isSimpleType(type)) {
      return type as ValueTypes
    }


    const tagJsType = value.tagJsType
    if(tagJsType) {
      const included = [
        ValueTypes.tagComponent,
        ValueTypes.templater,
        ValueTypes.tag,
      ].includes(tagJsType)
  
      if(included) {
        return tagJsType
      }
    }

    if (isTagArray(value)) {
      return ValueTypes.tagArray
    }
  
    if(isSubjectInstance(value)) {
      return ValueTypes.subject
    }
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
