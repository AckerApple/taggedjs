import { div, button, input, tag, callbackMaker, onDestroy } from "taggedjs"

const test0interval = 3000
const test1interval = 6000

export const intervalTester0 = tag(() => {
  let intervalCount: number = 0
  let intervalId: any = undefined
  let intervalId2: any = undefined
  let renderCounter: number = 0
  let currentTime: number = 0
  
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

  startInterval()
  onDestroy(stopInterval)

  ++renderCounter

  return div(
    div(
      'interval type 1 at ',
      _=> test0interval, 'ms'
    ),
    'intervalId: ',
    _=> intervalId,
    button({
        type: "button",
        onClick: increase
      },
      _=> intervalCount,
      ':',
      _=> renderCounter
    ),
    input({
      type: "range",
      min: "0",
      max: _=> test0interval,
      step: "1",
      value: _=> currentTime,
    }),
    div(
      '--',
      _=> currentTime,
      '--'
    ),
    button({
      type: "button",
      onClick: toggle,
      'style.background-color': intervalId || intervalId2 ? 'red' : 'green'
    }, 'start/stop'),
    button({
        type: "button",
        onClick: delayIncrease
      },
      'delay increase currentTime'
    )
  )
})

export const intervalTester1 = tag(() => {  
  let intervalCount: number = 0
  let intervalId: any = undefined
  let intervalId2: any = undefined
  let renderCounter: number = 0
  let currentTime: number = 0

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

  toggleInterval()
  onDestroy(destroy)

  ++renderCounter

  return div(
    div('interval type 2 with ', _=> test1interval, 'ms'),
    'intervalId: ',
    _=> intervalId,
    button({
        type: "button",
        onClick: increase
      },
      _=> intervalCount,
      ':',
      _=> renderCounter
    ),
    input({
      type: "range",
      min: "0",
      max: _=> test1interval,
      step: "1",
      value: _=> currentTime
    }),
    
    div(
      '--',
      _=> currentTime,
      '--'
    ),
    
    button({
        type: "button",
        onClick: toggleInterval,
        'style.background-color': _=> intervalId ? 'red' : 'green'
      },
      'start/stop'
    )
  )
})
