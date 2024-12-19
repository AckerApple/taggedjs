import { ValueSubject } from '../subject/index.js'
import { DomTag, StringTag } from './getDomTag.function.js'

export class RouteQuery {
  get(_name: string): string | undefined {
    return 'todo'
  }
}

export type RouteProps = {
  param: string
  paramSubject: ValueSubject<string>
  query: RouteQuery
}

export type ToTag = ((...props: any[]) => StateToTag | StringTag | DomTag | null) & {
  arrayValue?: unknown
}

export type StateToTag = () => StringTag | DomTag | null // Warn: do not data type arguments, let them be inferred
export type RouteTag = (extraProps?: Record<string, any>) => StringTag | DomTag
