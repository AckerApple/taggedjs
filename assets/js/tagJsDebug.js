import { propsDebug } from "./PropsDebug.component.js"
import { animateDestroy, animateInit } from "./animations.js"
import { counters } from "./countersDebug.js"
import { arrayTests } from "./arrayTests.js"
import { intervalTester0, intervalTester1 } from "./intervalDebug.js"
import { TagDebugProvider, providerDebug } from "./providerDebug.js"
import { state, html, tag, providers } from "./taggedjs/index.js"
import { gatewayDebug } from "./gatewayDebug.component.js"

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

export const tagDebug = tag(function TagDebug() {// tagDebug.js
  let _firstState = state('tagJsDebug.js', x => [_firstState, _firstState = x])
  let showIntervals = state(false, x => [showIntervals, showIntervals = x])
  let propsTest = state({test:33, x:'y'}, x => [propsTest, propsTest = x])
  let renderCount = state(0, x => [renderCount, renderCount = x])

  function propsTestChanged(event) {
    propsTest = JSON.parse(event.target.value)
    return propsTest
  }

  ++renderCount

  return html`<!-- tagDebug.js -->
      <fieldset id="counters" style="flex:2 2 20em">
        <legend>counters</legend>
        ${counters()}
      </fieldset>

      <fieldset style="flex:2 2 20em">
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
          <div oninit=${animateInit} ondestroy=${animateDestroy}>
            <div>${intervalTester0()}</div>
            <hr />
            <div>${intervalTester1()}</div>
          </div>
        `}
      </fieldset>

      <fieldset id="props-debug" style="flex:2 2 20em">
        <legend>Props Debug</legend>
        <textarea wrap="off" onchange=${propsTestChanged}
        >${ JSON.stringify(propsTest, null, 2) }</textarea>
        <pre>${ JSON.stringify(propsTest, null, 2) }</pre>
        <div><small>(renderCount:${renderCount})</small></div>
        <hr />
        ${propsDebug(propsTest)}
      </fieldset>

      <fieldset id="provider-debug" style="flex:2 2 20em">
        <legend>Provider Debug</legend>
        ${providerDebug0()}
      </fieldset>


      <fieldset id="content-debug" style="flex:2 2 20em">
        <legend>#tagGateway</legend>
        ${gatewayDebug()}
      </fieldset>
  `
})

const providerDebug0 = tag(function() {
  const provider = providers.create( tagDebugProvider )
  const providerClass = providers.create( TagDebugProvider )

  return html`
    <div>
      <strong>testValue</strong>:${provider.test}
    </div>
    <div>
      <strong>upperTest</strong>:${provider.upper?.test | '?'}
    </div>
    <div>
      <strong>providerClass</strong>:${providerClass.tagDebug | '?'}
    </div>
    <button id="increase-provider" onclick=${() => ++provider.test}
    >increase provider.test ${provider.test}</button>

    <button onclick=${() => ++provider.upper.test}
    >increase upper.provider.test ${provider.upper.test}</button>

    <button onclick=${() => ++providerClass.tagDebug}
    >increase provider class ${providerClass.tagDebug}</button>

    <hr />
    ${providerDebug()}
  `
})
