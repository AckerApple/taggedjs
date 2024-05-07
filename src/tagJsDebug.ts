import { propsDebugMain } from "./PropsDebug.component"
import { arrayTests } from "./arrayTests"
import { intervalTester0, intervalTester1 } from "./intervalDebug"
import { html, tag, providers, letState } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"
import { fadeInDown, fadeOutUp } from "./animations"

export function tagDebugProvider() {
  const upper = providers.create( upperTagDebugProvider )
  return {
    upper,
    test: 0
  }
}

export function upperTagDebugProvider() {
  return {
    name: 'upperTagDebugProvider',
    test: 0
  }
}

export const tagDebug = tag(() => {// tagDebug.js
  let _firstState: string = letState('tagJsDebug.js')(x => [_firstState, _firstState = x])
  let showIntervals: boolean = letState(false)(x => [showIntervals, showIntervals = x])
  let renderCount: number = letState(0)(x => [renderCount, renderCount = x])

  ++renderCount

  return html`<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${renderCountDiv({renderCount, name: 'tagJsDebug'})}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <fieldset style="flex:4 4 40em">
        <legend>arrays</legend>
        ${arrayTests()}
      </fieldset>
    
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

      <fieldset id="props-debug" style="flex:2 2 20em">
        <legend>Props Debug</legend>
        ${propsDebugMain(undefined)}
      </fieldset>
    </div>
  `
})
