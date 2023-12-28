import { animateDestroy, animateInit } from "./animations.js"
import { getCallback, state, html, tag, providers, Subject, onInit } from "./taggedjs/index.js"

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

const intervalTester0 = tag(function IntervalTester0() {
  let intervalCount = state(0, x => [intervalCount, intervalCount = x])
  let intervalId = state(undefined, x => [intervalId, intervalId = x])
  let renderCounter = state(0, x => [renderCounter, renderCounter = x])
  const callback = getCallback()

  const increase = () => ++intervalCount

  const startInterval = () => {
    console.info('interval test 0 started...')
    intervalId = setInterval(callback(() => {
      increase()
    }),3000)
  }

  const stopInterval = () => {
    clearInterval(intervalId)
    intervalId = undefined
  }

  const toggle = () => {
    if(intervalId) {
      stopInterval()
      return
    }

    startInterval()
  }

  onInit(startInterval)

  ++renderCounter

  return html`
    <div>interval type 1 with 3000ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <button type="button" onclick=${toggle}
      style.background-color=${intervalId ? 'red' : 'green'}
    >start/stop</button>
  `
})

const test1interval = 6000
const intervalTester1 = tag(function intervalTester1() {
  let intervalCount = state(0, x => [intervalCount, intervalCount = x])
  let intervalId = state(undefined, x => [intervalId, intervalId = x])
  let renderCounter = state(0, x => [renderCounter, renderCounter = x])
  let currentTime = state(0, x => [currentTime, currentTime = x])
  const callback = getCallback()
  const increase = () => ++intervalCount

  function trackTime() {
    let span = 0
    currentTime = 0
    
    while(span <= 6000) {
      span = span + 500
      const mySpan = span
      setTimeout(callback(() => {
        currentTime = mySpan
      }), span)
    }

    setTimeout(callback(() => {
      currentTime = 0
    }), test1interval)
  }

  function toggleInterval() {
    console.info('interval test 1 started...')
    if(intervalId) {
      clearInterval(intervalId)
      intervalId = undefined
      return
    }

    trackTime()
    intervalId = setInterval(callback(() => {
      trackTime()

      increase()
    }),test1interval)
  }

  onInit(toggleInterval)

  ++renderCounter

  return html`
    <div>interval type 2 with 6000ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test1interval} step="1" value=${currentTime} />
    <button type="button" onclick=${toggleInterval}
      style.background-color=${intervalId ? 'red' : 'green'}
    >start/stop</button>
  `
})