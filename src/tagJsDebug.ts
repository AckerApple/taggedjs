import { propsDebugMain } from "./PropsDebug.component.js"
import { animateDestroy, animateInit } from "./animations.js"
import { counters } from "./countersDebug.js"
import { arrayTests } from "./arrayTests.js"
import { intervalTester0, intervalTester1 } from "./intervalDebug.js"
import { TagDebugProvider, providerDebug } from "./providerDebug.js"
import { html, tag, providers, setLet } from "taggedjs"
import { gatewayDebug } from "./gatewayDebug.component.js"
import { renderCountDiv } from "./renderCount.component.js"

export function tagDebugProvider() {
  const upper = providers.create( upperTagDebugProvider as any )
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

export const tagDebug = tag(() => {// tagDebug.js
  console.log('render tagDebug.js')
  let _firstState: string = setLet('tagJsDebug.js')(x => [_firstState, _firstState = x])
  let showIntervals: boolean = setLet(false)(x => [showIntervals, showIntervals = x])
  let renderCount: number = setLet(0)(x => [renderCount, renderCount = x])

  ++renderCount

  return html`<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${renderCountDiv({renderCount, name: 'tagJsDebug'})}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
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
        ${propsDebugMain()}
      </fieldset>

      <fieldset id="provider-debug" style="flex:2 2 20em">
        <legend>Provider Debug</legend>
        ${providerDebug0()}
      </fieldset>


      <fieldset id="content-debug" style="flex:2 2 20em">
        <legend>#tagGateway</legend>
        ${gatewayDebug()}
      </fieldset>
    </div>
  `
})

const providerDebug0 = tag(function() {
  const provider = providers.create( tagDebugProvider as any ) as any
  const providerClass = providers.create( TagDebugProvider as any ) as any

  return html`
    <div>
      <strong>testValue</strong>:${provider.test}
    </div>
    <div>
      <strong>upperTest</strong>:${provider.upper?.test || '?'}
    </div>
    <div>
      <strong>providerClass</strong>:${providerClass.tagDebug || '?'}
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
