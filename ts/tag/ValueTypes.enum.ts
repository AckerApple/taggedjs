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


export type ValueType = string // [string]
type ValueTypeObject = {
  tag: string
  dom: string
  templater: string
  tagComponent: string
  tagArray: string
  // subject: string
  // tagJsSubject: string
  renderOnce: string
  stateRender: string
  version: number
  
  subscribe: string,
  signal: string,
  host: string,
}

const version = Date.now()

/** Used as direct memory comparisons, the strings are never compared, just the array */
export const ValueTypes: ValueTypeObject = {  
  tag: 'html', // html'' aka StringTag | DomTag
  dom: 'dom', // compiled version of html''

  templater: 'templater',
  tagComponent: 'tagComponent', 
  tagArray: 'tagArray',

  host: 'host',
  subscribe: 'subscribe',
  signal: 'signal',
  
  renderOnce: 'renderOnce',
  stateRender: 'stateRender',

  version,
}
