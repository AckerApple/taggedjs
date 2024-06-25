import { DomTag, StringTag, TagTemplate } from './Tag.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { ValueSubject } from '../subject/ValueSubject.js'
import { setUse } from '../state/index.js'
import { ValueTypes } from './ValueTypes.enum.js'


export type TagChildren = ValueSubject<(StringTag | DomTag)[]> & { lastArray?: (StringTag | DomTag)[] }
export type TagChildrenInput = (StringTag | DomTag)[] | DomTag | StringTag | TagChildren

export type TagComponent = ((...args:  any[]) => (StringTag | DomTag)) & {
  tags?: TagWrapper<any>[]
  setUse?: typeof setUse
  tagIndex?: number
}

export const tags: TagWrapper<any>[] = []

export type Original = ((...args: any[]) => any) & {setUse: any[]}

export type TagWrapper<T> = ((
  ...props: T[]
) => TemplaterResult) & {
  original: Original
  compareTo: string
  isTag: boolean
  tagJsType?: typeof ValueTypes.oneRender | typeof ValueTypes.stateRender
  lastRuns?: {[index: number]: TagTemplate}
}

export type TagMaker = ((...args: any[]) => (StringTag | DomTag)) | ((...args: any[]) => (...args: any[]) => (StringTag | DomTag))
