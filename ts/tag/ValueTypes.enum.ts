export const empty = ''

export enum BasicTypes {
  unknown = 'unknown',
  object = 'object',
  date = 'date',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  function = 'function',
  undefined = 'undefined',
}


export type ValueType = [string]
type ValueTypeObject = {[name: string]: ValueType}

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
