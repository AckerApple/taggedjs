import { div, table, thead, tbody, tr, th, td, tag } from "taggedjs"

export const tableDebug = tag(() => {
  let showCell: boolean = true

  return div({style: "max-height: 800px;overflow-y: scroll;"},
    table({cellPadding: 5, cellSpacing: 5, border: "1"},
      thead({style: "position: sticky;top: 0;"},
        tr(
          th('hello'),
          th('hello'),
          _=> showCell && td('hello 2 thead cell')
        )
      ),
      tbody(
        tr(
          td('world'),
          td('world'),
          _=> showCell && td('world 2 tbody cell')
        )
      )
    )
  )
})
