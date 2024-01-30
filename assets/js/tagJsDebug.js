import { animateDestroy, animateInit } from "./animations.js"
import { counters } from "./countersDebug.js"
import { intervalTester0, intervalTester1 } from "./intervalDebug.js"
import { providerDebug } from "./providerDebug.js"
import { state, html, tag, providers, Subject, onInit } from "./taggedjs/index.js"

export function tagDebugProvider() {
  const upper = providers.create( upperTagDebugProvider )
  return {
    upper,
    test: 1
  }
}

export function upperTagDebugProvider() {
  return {
    name: 'upperTagDebugProvider',
    test: 2
  }
}

export const tagDebug = tag(function tagDebug() {
  // tagDebug.js
  let showIntervals = state(false, x => [showIntervals, showIntervals = x])

  const provider = providers.create( tagDebugProvider )

  return html`<!-- tagDebug.js -->
    <div id="tagDebug-fx-wrap" style="padding:1em;background:rgba(0,0,0,.5)" oninit=${animateInit} ondestroy=${animateDestroy}>
      <h2 id="tagDebugCounters">counters**</h2>
      ${counters()}

      <br /><br />

      <fieldset id="debug-intervals">
        <legend>
          interval testing
          <button
            onclick=${() => showIntervals = !showIntervals}
          >hide/show</button>
        </legend>

        ${showIntervals && html`
          <div oninit=${animateInit} ondestroy=${animateDestroy}>
            <div>${intervalTester0()}</div>
            <hr />
            <div>${intervalTester1()}</div>
          </div>
        `}
      </fieldset>
            
      <br /><br />

      <fieldset id="provider-debug">
        <legend>Provider Debug: ${provider.test}:${provider.upper?.test | '?'}</legend>
        ${providerDebug()}
      </fieldset>

      <br />

      <fieldset id="content-debug">
        <legend>Content Debug: ${provider.test}</legend>        
        <div>
          <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
          <!--proof you cannot see false values -->
          <div style="font-size:0.8em">You should see "" here => "${false}"</div>
          <div style="font-size:0.8em">You should see "" here => "${null}"</div>
          <div style="font-size:0.8em">You should see "" here => "${undefined}"</div>
          <!--proof you can see true booleans -->
          <div style="font-size:0.8em">You should see "true" here => "${true}"</div>
          <!--proof you can try to use the tagVar syntax -->
          <div style="font-size:0.8em">You should see "${'{'}22${'}'}" here => "{22}"</div>
          <div style="font-size:0.8em">You should see "${'{'}__tagVar0${'}'}" here => "{__tagVar0}"</div>
        </div>
      </fieldset>
    </div>
  `
})
