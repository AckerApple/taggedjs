import { html, tag } from "taggedjs"
import { FormatChange, dump } from "./index"
import { EverySimpleValue } from "./dump.props"

export const arrayDisplay = tag(({
  array, showLevels,
  showAll, showKids,
  columnNames,
  formatChange,
  toggleColumnDialog,
  allowMaximize,
  everySimpleValue,
}: {
  array: any[]
  showLevels: number
  showAll?: boolean
  showKids: boolean
  columnNames: string[]
  formatChange: FormatChange
  toggleColumnDialog: () => any
  allowMaximize?: boolean,
  everySimpleValue?: EverySimpleValue,
}) => {
  return html`
    ${array.map((
      item: any,
      index: number
    ) => {
      const value = paramValueKeys(item, columnNames)
      return html`${dump({
        value,
        showLevels,
        showAll,
        showKids:showAll || showKids,
        isRootDump:false,
        formatChange,
        onHeaderClick: toggleColumnDialog,
        allowMaximize,
        everySimpleValue,
      })}`.key(index)
    })}
  `
})

function paramValueKeys(
  inputObject: Record<string, any> | string,
  keysArray: string[]
) {
  if(['string','number','boolean'].includes(typeof(inputObject))) {
    return inputObject
  }

  if(Array.isArray(inputObject)) {
    return inputObject
  }

  return filterObjectByKeys(inputObject as Record<string, any>, keysArray)
}

function filterObjectByKeys(
  inputObject: Record<string, any>,
  keysArray: string[]
) {
  const filteredObject: Record<string, any> = {}

  keysArray.forEach(key => {
    if (inputObject.hasOwnProperty(key) || key in inputObject) {
      filteredObject[key] = inputObject[key]
    }
  })

  return filteredObject
}
