import { html, onInit, tag, letProp, states, StringTag, DomTag } from "taggedjs"
import { dumpArray } from "./dumpArray.tag"
import { dumpSimple } from "./dumpSimple.tag"
import { dumpObject } from "./dumpObject.tag"
import { controlPanel } from "./controlPanel.tag"
import { DumpProps, FormatChange } from "./dump.props"

export const dump = tag(<T>({// dump tag
  key, value,
  showKids = false,
  showLevels = -1,
  showAll = false,
  format = 'flex',
  formatChange = x => format = x,
  isRootDump = true,
  onHeaderClick,
  allowMaximize,
  everySimpleValue,
}: DumpProps<T>) => {
  if(isRootDump && allowMaximize === undefined) {
    allowMaximize = true
  }
  const isObject = () => value && value instanceof Object
  const typing = value === null ? 'null' : typeof(value)
  
  let show = false
  letProp(get => [format] = get(format))
  letProp(get => [showAll] = get(showAll))
  letProp(get => [showLevels] = get(showLevels))
  let arrayView = undefined as undefined | 'table'

  states(get => [{ show, arrayView }] = get({ show, arrayView }))

  onInit(() => {
    const levelsDefined = (showLevels>=0 && showLevels)
    // detect auto levels (default) and if object lets only show 2 levels deep
    const autoShowObjectLevels = showLevels === -1 && !key && isObject()
    showLevels = levelsDefined || (autoShowObjectLevels ? 2 : 0)

    if (showLevels > 0) {
      show = true
    }
  })

  /* IF 1: undefined ELSE goto simpleTemplate */
  if([null, undefined].includes(value as any)) {
    return dumpSimple({
      key: key as string,
      value: typing,
      onHeaderClick,
      everySimpleValue,
    })
  }
  
  /* IF 2: simple value ELSE goto objectTemplate */
  if(['boolean','number','string'].includes(typing)) {
    return dumpSimple({key:key as string, value, onHeaderClick, everySimpleValue})
  }

  return getObjectTemplate({
    value,
    showKids,
    key,
    onHeaderClick,
    everySimpleValue,
    format,
    isRootDump,
    showAll,
    showAllChange: (x:boolean) => showAll = x,
    formatChange,
    show,
    showLevels,
    allowMaximize,    
  })
})

let dumpCount = 0
const getObjectTemplate = <T>({
  value,
  showKids,
  key,
  onHeaderClick,
  everySimpleValue,
  format,
  isRootDump,
  showAll,
  showAllChange,
  formatChange,
  show,
  showLevels,
  allowMaximize,
}: DumpProps<T> & {
  format: string
  show: boolean
  formatChange: FormatChange
  showAllChange: any
  showKids: boolean
  showLevels: number
}): StringTag | DomTag => {
  if(value === null) {
    if(!showKids) {
      return html``
    }

    return dumpSimple({
      key: key as string,
      value: 'null',
      onHeaderClick,
      everySimpleValue,
    })
  }

  const isArray = (!format || format==='flex') && ((value as any).push && (value as any).pop)

  return html`
    <div id=${`taggedjs-dump-${++dumpCount}`} class="taggedjs-dump">
      ${isRootDump && controlPanel({
        value,
        format,
        showAll,
        showAllChange,
        formatChange,
      })}
      ${(format==='json' && html`
        <textarea *ngIf="" disabled wrap="off" style="width:100%;height:25vh;min-height:400px;color:white;"
        >${ JSON.stringify(value, null, 2) }</textarea>
      `) || (
        (isArray && dumpArray({
          key,
          value,
          show,
          // arrayView,
          showAll,
          showKids,
          showLevels,
          formatChange,
          allowMaximize,
          everySimpleValue,
        })) ||
        dumpObject({
          key,
          show,
          // showChange: x => showChangeValue(show = x),
          showKids,
          showLevels,
          value,
          showAll,
          formatChange,
          onHeaderClick,
          allowMaximize,
          everySimpleValue,
        })
      )}
    </div>
  `
}
