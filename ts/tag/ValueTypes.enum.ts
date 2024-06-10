export const empty = ''

export const textNode = document.createTextNode(empty)

export enum ValueTypes {
  unknown = 'unknown',
  
  tag = 'tag', // this one might be bad
  templater = 'templater',
  tagComponent = 'tag-component',
  object = 'object',
  
  tagArray = 'tag-array',
  subject = 'subject',
  tagJsSubject = 'tagJsSubject',
  oneRender = 'oneRender',
  
  date = 'date',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  function = 'function',
  undefined = 'undefined',
}
