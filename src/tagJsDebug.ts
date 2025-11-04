import { intervalTester0, intervalTester1 } from "./intervalDebug"
import { tag, div, fieldset, legend, button, hr } from "taggedjs"
import { fx } from "taggedjs-animate-css"

export const tagDebug = tag(() => {// tagDebug.js
  let _firstState: string = 'tagJsDebug.js'
  let showIntervals: boolean = false
  let renderCount: number = 0

  ++renderCount

  return div({style: "display:flex;flex-wrap:wrap;gap:1em"},
    fieldset({id: "debug-intervals", style: "flex:2 2 20em"},
      legend('Interval Testing'),

      button({
        onClick: () => showIntervals = !showIntervals
      }, 'hide/show'),

      _=> showIntervals && div({attr: fx()},
        div(intervalTester0()),
        hr,
        div(intervalTester1())
      )
    )
  )
})
