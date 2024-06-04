import { ValueSubject } from '../subject/index.js'
import { Tag } from './Tag.class.js'

export class RouteQuery {
  get(name: string): string | undefined {
    return 'todo'
  }
}

export type RouteProps = {
  param: string
  paramSubject: ValueSubject<string>
  query: RouteQuery
}

export type ToTag = (...props: any[]) => StateToTag | Tag | null
export type StateToTag = () => Tag | null // Warn: do not data type arguments, let them be inferred
export type RouteTag = (extraProps?: Record<string, any>) => Tag
