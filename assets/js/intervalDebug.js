import { state, html, tag, onInit, getCallback, onDestroy } from "./taggedjs/index.js"

const test0interval = 3000
const test1interval = 6000

export const intervalTester0 = tag(function IntervalTester0() {
  let intervalCount = state(0, x => [intervalCount, intervalCount = x])
  let intervalId = state(undefined, x => [intervalId, intervalId = x])
  let renderCounter = state(0, x => [renderCounter, renderCounter = x])
  let currentTime = state(0, x => [currentTime, currentTime = x])
  const callback = getCallback()

  const increase = () => ++intervalCount

  const startInterval = () => {
    console.info('interval test 0 started...')
    trackTime()
    intervalId = setInterval(callback(() => {
      trackTime()
      increase()
    }),test0interval)
  }

  const stopInterval = () => {
    clearInterval(intervalId)
    intervalId = undefined
    console.info('interval 0 stopped')
  }

  function trackTime() {
    let span = 0
    currentTime = 0
    
    while(span < test0interval) {
      span = span + 500
      const mySpan = span
      setTimeout(callback(() => {
        currentTime = mySpan
      }), span)
    }

    setTimeout(callback(() => {
      currentTime = 0
    }), test0interval)
  }

  const toggle = () => {
    if(intervalId) {
      stopInterval()
      return
    }

    startInterval()
  }

  onInit(startInterval)
  onDestroy(stopInterval)

  ++renderCounter

  return html`<!--intervalDebug.js-->
    <div>interval type 1 with ${test0interval}ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test0interval} step="1" value=${currentTime} />
    <button type="button" onclick=${toggle}
      style.background-color=${intervalId ? 'red' : 'green'}
    >start/stop</button>
  `
})

export const intervalTester1 = tag(function intervalTester1() {
  let intervalCount = state(0, x => [intervalCount, intervalCount = x])
  let intervalId = state(undefined, x => [intervalId, intervalId = x])
  let renderCounter = state(0, x => [renderCounter, renderCounter = x])
  let currentTime = state(0, x => [currentTime, currentTime = x])
  const callback = getCallback()
  const increase = () => ++intervalCount

  function trackTime() {
    let span = 0
    currentTime = 0
    
    while(span < test1interval) {
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

  const destroy = () => {
    clearInterval(intervalId)
    intervalId = undefined
    console.info('interval 1 stopped')
  }

  function toggleInterval() {
    if(intervalId) {
      return destroy()
    }

    console.info('interval test 1 started...')
    trackTime()
    intervalId = setInterval(callback(() => {
      trackTime()

      increase()

      console.info('slow interval ran')
    }),test1interval)
  }

  onInit(toggleInterval)
  onDestroy(toggleInterval)

  ++renderCounter

  return html`
    <div>interval type 2 with ${test1interval}ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test1interval} step="1" value=${currentTime} />
    <button type="button" onclick=${toggleInterval}
      style.background-color=${intervalId ? 'red' : 'green'}
    >start/stop</button>
  `
})
