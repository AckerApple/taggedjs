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
  oneRender: ValueType
  stateRender: ValueType
}

export const ValueTypes: ValueTypeObject = {  
  tag: ['html'], // html'' aka StringTag | DomTag
  dom: ['dom'], // compiled version of html''

  templater: ['templater'],
  tagComponent: ['tag-component'],  
  tagArray: ['tag-array'],
  subject: ['subject'],
  tagJsSubject: ['tagJsSubject'],
  
  oneRender: ['oneRender'],
  stateRender: ['stateRender'],
}
