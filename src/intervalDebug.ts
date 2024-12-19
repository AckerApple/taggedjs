import { html, tag, onInit, callbackMaker, onDestroy, states } from "taggedjs"

const test0interval = 3000
const test1interval = 6000

export const intervalTester0 = tag(() => {
  let intervalCount: number = 0
  let intervalId: any = undefined
  let intervalId2: any = undefined
  let renderCounter: number = 0
  let currentTime: number = 0

  states(get => [{
    intervalCount,intervalId,intervalId2,renderCounter,currentTime,
  }] = get({
    intervalCount,intervalId,intervalId2,renderCounter,currentTime,
  }))
  
  const callback = callbackMaker()
  const increase = () => ++intervalCount

  const startInterval = () => {
    console.info('🟢 interval test 0 started...')
    trackTime()

    intervalId = setInterval(callback(() => {
      increase()
    }),test0interval)
  }

  const stopInterval = () => {
    clearInterval(intervalId)
    clearInterval(intervalId2)
    intervalId = undefined
    intervalId2 = undefined
    console.info('🛑 interval test 0 stopped')
  }

  function trackTime() {
    currentTime = 0
    
    intervalId2 = setInterval(callback(() => {
      currentTime = currentTime + 500

      if(currentTime >= test0interval) {
        currentTime = 0
      }      
    }), 500)

    console.info('▶️ interval started')
  }

  const toggle = () => {
    if(intervalId || intervalId2) {
      stopInterval()
      return
    }

    startInterval()
  }

  const delayIncrease = () => setTimeout(callback(() => {
    currentTime = currentTime + 200
  }), 1000);

  onInit(startInterval)
  onDestroy(stopInterval)

  ++renderCounter

  return html`<!--intervalDebug.js-->
    <div>interval type 1 at ${test0interval}ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test0interval} step="1" value=${currentTime} />
    <div>
      --${currentTime}--
    </div>
    <button type="button" onclick=${toggle}
      style.background-color=${intervalId || intervalId2 ? 'red' : 'green'}
    >start/stop</button>
    <button type="button" onclick=${delayIncrease}>delay increase currentTime</button>
  `
})

export const intervalTester1 = tag(() => {  
  let intervalCount: number = 0
  let intervalId: any = undefined
  let intervalId2: any = undefined
  let renderCounter: number = 0
  let currentTime: number = 0

  states(get => [{
    intervalCount,intervalId,intervalId2,renderCounter,currentTime
  }] = get({
    intervalCount,intervalId,intervalId2,renderCounter,currentTime
  }))
  
  const callback = callbackMaker()
  const increase = () => ++intervalCount

  function trackTime() {
    currentTime = 0
    
    intervalId2 = setInterval(callback(() => {
      currentTime = currentTime + 500

      if(currentTime >= test1interval) {
        currentTime = 0
      }
    }), 500)
  }

  const destroy = () => {
    clearInterval(intervalId)
    clearInterval(intervalId2)
    intervalId = undefined
    intervalId2 = undefined
    console.info('🔴 interval 1 stopped')
  }

  function toggleInterval() {
    if(intervalId) {
      return destroy()
    }

    console.info('🟢 interval test 1 started...')
    trackTime()
    intervalId = setInterval(callback(() => {
      increase()
      console.info('slow interval ran')
    }),test1interval)
  }

  onInit(toggleInterval)
  onDestroy(destroy)

  ++renderCounter

  return html`
    <div>interval type 2 with ${test1interval}ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test1interval} step="1" value=${currentTime} />
    <div>
      --${currentTime}--
    </div>
    <button type="button" onclick=${toggleInterval}
      style.background-color=${intervalId ? 'red' : 'green'}
    >start/stop</button>
  `
})
