import { intervalTester0, intervalTester1 } from "./intervalDebug";
import { html, tag, states } from "taggedjs";
import { fx } from "taggedjs-animate-css";
export const tagDebug = tag(() => {
    let _firstState = 'tagJsDebug.js';
    let showIntervals = false;
    let renderCount = 0;
    states(get => [{ _firstState, showIntervals, renderCount }] = get({ _firstState, showIntervals, renderCount }));
    ++renderCount;
    return html `<!-- tagDebug.js -->
    <div style="display:flex;flex-wrap:wrap;gap:1em">    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${() => showIntervals = !showIntervals}
        >hide/show</button>

        ${showIntervals && html `
          <div ${fx()}>
            <div>${intervalTester0()}</div>
            <hr />
            <div>${intervalTester1()}</div>
          </div>
        `}
      </fieldset>
    </div>
  `;
});
//# sourceMappingURL=tagJsDebug.js.map