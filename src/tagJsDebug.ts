import { intervalTester0, intervalTester1 } from "./intervalDebug"
import { html, tag, letState } from "taggedjs"
import { fadeInDown, fadeOutUp } from "./animations"

export const tagDebug = tag(() => {// tagDebug.js
  let _firstState: string = letState('tagJsDebug.js')(x => [_firstState, _firstState = x])
  let showIntervals: boolean = letState(false)(x => [showIntervals, showIntervals = x])
  let renderCount: number = letState(0)(x => [renderCount, renderCount = x])

  ++renderCount

  return html`<!-- tagDebug.js -->
    <div style="display:flex;flex-wrap:wrap;gap:1em">    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${() => showIntervals = !showIntervals}
        >hide/show</button>

        ${showIntervals && html`
          <div oninit=${fadeInDown} ondestroy=${fadeOutUp}>
            <div>${intervalTester0()}</div>
            <hr />
            <div>${intervalTester1()}</div>
          </div>
        `}
      </fieldset>
    </div>
  `
})
