export const empty = ''

// export const textNode = document.createTextNode('')

export enum ValueTypes {
  unknown = 'unknown',
  
  tag = 'tag', // this one might be bad
  templater = 'templater',
  tagComponent = 'tag-component',
  
  tagArray = 'tag-array',
  subject = 'subject',
  tagJsSubject = 'tagJsSubject',
  
  date = 'date',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  function = 'function',
  undefined = 'undefined',
}
