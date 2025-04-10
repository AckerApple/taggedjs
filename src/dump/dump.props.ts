import { Tag } from "taggedjs"

type ShowChange = (show: boolean) => any
export type OnHeaderClick = () => any
export type FormatChange = (format: 'json' | 'flex') => unknown

export type SimpleValue = boolean | number | string | undefined | null

export type DumpProps<T> = {
  value: T
  key?: string // dump a key within the provided value
  show?: boolean // hide entire results
  showKids?: boolean // force children to be shown by true value
  showLevels?: number // unfolded shown levels of depth. Default is auto decide

  format?: 'json' | 'flex' // do not pass in, used to detect when first dump
  formatChange?: FormatChange
  
  isRootDump?: boolean // do not pass in, used to detect when first dump
  
  showChange?: ShowChange
  onHeaderClick?: () => any
  showAll?: boolean
  allowMaximize?: boolean

  everySimpleValue?: EverySimpleValue
}

export type EverySimpleValue = (value: SimpleValue, key?: string) => SimpleValue | Tag