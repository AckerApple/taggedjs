export const empty = ''

export enum ImmutableTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  undefined = 'undefined',
}

export enum BasicTypes {
  function = 'function',
  date = 'date',
  unknown = 'unknown',
  object = 'object',
}


export type ValueType = [string]
type ValueTypeObject = {
  tag: ValueType
  dom: ValueType
  templater: ValueType
  tagComponent: ValueType
  tagArray: ValueType
  subject: ValueType
  tagJsSubject: ValueType
  renderOnce: ValueType
  stateRender: ValueType

  version: number
}

const version = Date.now()

/** Used as direct memory comparisons, the strings are never compared, just the array */
export const ValueTypes: ValueTypeObject = {  
  tag: ['html'], // html'' aka StringTag | DomTag
  dom: ['dom'], // compiled version of html''

  templater: ['templater'],
  tagComponent: ['tagComponent'],  
  tagArray: ['tagArray'],
  subject: ['subject'],
  tagJsSubject: ['tagJsSubject'],
  
  renderOnce: ['renderOnce'],
  stateRender: ['stateRender'],

  version,
}
