import { KeyFunction } from './index.js'
import { Tag } from './Tag.type.js'
import { TagValues } from './html.js'

export type StringTag = Tag & {  
  children?: {
    strings: string[] | TemplateStringsArray
    values: TagValues
  }

  strings: string[]
  values: unknown[]
  key: KeyFunction

  html: (
    strings: string[] | TemplateStringsArray,
    values: TagValues,
  ) => StringTag
}
