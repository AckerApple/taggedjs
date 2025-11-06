import { div, table, thead, tbody, tr, th, td, tag } from "taggedjs"
import { FormatChange, dump } from "./index"
import { EverySimpleValue } from "./dump.props"

export const arrayTable = tag(({
  array,
  // showLevels,
  showAll,
  showKids,
  toggleColumnDialog,
  columnNames,
  formatChange,
  allowMaximize,
  everySimpleValue,
}: {
  array: any[]
  // showLevels: number
  showAll?: boolean
  showKids: boolean
  toggleColumnDialog: any
  columnNames: string[],
  formatChange: FormatChange,
  allowMaximize?: boolean,
  everySimpleValue?: EverySimpleValue
}) => {
  arrayTable.updates(x => [{
    array,
    // showLevels,
    showAll,
    showKids,
    toggleColumnDialog,
    columnNames,
    formatChange,
    allowMaximize,
    everySimpleValue,
  }] = x)

  return div({style: "max-height: 800px;max-width:100vw;overflow: scroll;"},
    table({cellPadding: "2", cellSpacing: "2", border: "0"},
      _=> array.length &&
        thead({style: "position: sticky;top: 0;font-size: 0.8em;"},
        tr(
          _=> columnNames.map(key => th({
            'style.cursor': _=> toggleColumnDialog && 'pointer',
            onClick: toggleColumnDialog
          }, _=> key).key(key))
        )
      ),
      tbody(
        _=> array.map(row => tr(
          columnNames.map(name =>
            td(
              _=> dump({
                value: row[name],
                showLevels: 0,
                showAll,
                showKids: showAll || showKids,
                isRootDump: false,
                formatChange,
                allowMaximize,
              })
            ).key(row[name])
          )
        ).key(row))
      )
    )
  )
})
