import { animateDestroy, animateInit } from "./animations.js"
import { intervalTester0, intervalTester1 } from "./intervalDebug.js"
import { state, html, tag, providers, Subject, onInit } from "./taggedjs/index.js"

function tagDebugProvider() {
  const upper = providers.create( upperTagDebugProvider )
  return {
    upper,
    test: 1
  }
}

function upperTagDebugProvider() {
  return {
    name: 'upperTagDebugProvider',
    test: 2
  }
}

export const tagDebug = tag(function tagDebug() {
  // tagDebug.js
  let showIntervals = state(true, x => [showIntervals, showIntervals = x])
  let renderCount = state(0, x => [renderCount, renderCount = x])
  let counter = state(0, x => [counter, counter = x])
  let initCounter = state(0, x => [initCounter, initCounter = x])

  const provider = providers.create( tagDebugProvider )

  onInit(() => {
    ++initCounter
    console.info('👉 i should only ever run once')
  })

  const increaseCounter = () => {
    ++counter
  }

  ++renderCount // for debugging

  return html`
    <!-- tagDebug.js -->
    <div style="padding:1em;background:rgba(0,0,0,.5)" oninit=${animateInit} ondestroy=${animateDestroy}>
      <div>Subscriptions:${Subject.globalSubCount}:${Subject.globalSubs.length}</div>
      <div>renderCount:${renderCount}</div>
      <div>initCounter:${initCounter}</div>
      <button onclick=${increaseCounter}>counter:${counter}</button>
      <button onclick=${() => console.info('subs', Subject.globalSubs)}>log subs</button>

      <br /><br />

      <fieldset>
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

      <fieldset>
        <legend>Provider Debug: ${provider.test}:${provider.upper?.test | '?'}</legend>
        ${providerDebug()}
      </fieldset>

      <br />

      <fieldset>
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

const providerDebug = tag(function ProviderDebug() {
  const provider = providers.inject( tagDebugProvider )
  const upperProvider = providers.inject( upperTagDebugProvider )

  let renderCount = state(0, x => [renderCount, renderCount = x])

  ++renderCount

  return html`
    <button onclick=${() => ++provider.test}
    >increase provider.test ${provider.test}</button>
    
    <button onclick=${() => console.info('render count', renderCount)}>render counter: ${renderCount}</button>
    
    <button onclick=${() => ++upperProvider.test}
    >increase upper.provider.test ${upperProvider.test}</button>
  `
})
