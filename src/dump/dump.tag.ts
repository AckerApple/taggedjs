import { tag, textarea, div, noElement } from "taggedjs"
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
  let show = false

  dump.updates(x => {
    [{
      key, value,
      showKids = showKids,
      showLevels = showLevels,
      showAll = showAll,
      format = format,
      formatChange = formatChange,
      isRootDump = isRootDump,
      onHeaderClick = onHeaderClick,
      allowMaximize = allowMaximize,
      everySimpleValue = everySimpleValue,
    }] = x as [DumpProps<any>]

    checkShowLevels()
  })
  // letProp(get => [format] = get(format))
  // letProp(get => [showAll] = get(showAll))
  // letProp(get => [showLevels] = get(showLevels))
  let arrayView = undefined as undefined | 'table'

  const getIsObject = () => value && value instanceof Object
  
  // detect auto levels (default) and if object lets only show 2 levels deep
  const autoShowObjectLevels = () => showLevels === -1 && !key && getIsObject()
  function checkShowLevels() {
    const levelsDefined = (showLevels>=0 && showLevels)
    showLevels = levelsDefined || (autoShowObjectLevels() ? 2 : 0)
  
    if (showLevels > 0) {
      show = true
    }
  }

  return noElement(()=> {
    checkShowLevels()

    if(isRootDump && allowMaximize === undefined) {
      allowMaximize = true
    }

    const typing = value === null ? 'null' : typeof(value)

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
})

let dumpCount = 0
const getObjectTemplate = tag(<T>({
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
}): any => {
  getObjectTemplate.updates(x => {
    [{
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
    }] = x as any
  })
  
  const isArray = Array.isArray(value) // (!format || format==='flex') && ((value as any).push && (value as any).pop)

  const getArrayDump = () => {
    return dumpArray({
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
      })
  }

  const getObjectDump = () => {
    return dumpObject({
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
  }

  const getJsonDump = () => textarea({
    attr:'disabled',
    wrap:"off",
    style:"width:100%;height:25vh;min-height:400px;color:white;background-color:black;",
  }, _=> JSON.stringify(value, null, 2))

  return noElement(_=> {
    if(value === null) {
      if(!showKids) {
        return 'no kids' as any
      }

      return dumpSimple({
        key: key as string,
        value: 'null',
        onHeaderClick,
        everySimpleValue,
      })
    }

    return div(
      {id:`taggedjs-dump-${++dumpCount}`, class:"taggedjs-dump"},
      _=> isRootDump && controlPanel({
        value,
        format,
        showAll,
        showAllChange,
        formatChange,
      }),
      _=> (format==='json' && getJsonDump()) || (isArray ? getArrayDump() : getObjectDump()),
    )
  })
})
