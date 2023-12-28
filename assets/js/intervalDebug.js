import { state, html, tag, onInit, getCallback } from "./taggedjs/index.js"

export const intervalTester0 = tag(function IntervalTester0() {
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

      console.info('slow interval ran')
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
