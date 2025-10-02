import { describe, it, expect } from './testing'
import { byId, click, html, htmlById, keyupOn } from './testing'
import { expectElmCount, testCounterElements } from './testing'

let runs = 0

describe('💯 counters', () => {    

  // tests can be run multiple times. Only the first time will this expect below work
  const firstRun = runs === 0
  ++runs

  it('basics', () => {
    const counterInput = byId('set-main-counter-input') as HTMLInputElement
    expect(counterInput).toBeDefined()
    counterInput.value = '0'
    keyupOn(counterInput)

    const beforeRenderCount = Number(html('#counters_render_count'))
    const beforeInnerRenderCount = Number(html('#inner_counters_render_count'))

    expectElmCount('#conditional-counter', 0)

    const currentSubs = htmlById('👉-counter-sub-count')
    testCounterElements('#❤️-increase-counter', '#❤️-counter-display')
    expect(htmlById('👉-counter-sub-count')).toBe(currentSubs)

    const expectedRenderCount = html('#counters_render_count')
    // const renderToBe = (beforeRenderCount + 2).toString()
    const renderToBe = "1"
    expect(expectedRenderCount).toBe(renderToBe, `expected render count ${expectedRenderCount} to be ${renderToBe}`)
    
    // the parent changed a value passed to child as a prop
    // let toBe = (beforeInnerRenderCount + 2).toString()
    let toBe = "1"
    let renderCount = html('#inner_counters_render_count')
    expect(renderCount).toBe(toBe, `Expected renderCount ${renderCount} to be ${toBe}`) // expected number of renders to be ${toBe} not ${renderCount}

    const preInitCounter = html('#🔥-init-counter')
    expect(preInitCounter).toBe('1', `#🔥-init-counter to be 1 but it's ${preInitCounter}`)
    testCounterElements('#❤️-inner-counter', '#❤️-inner-display')

    // toBe = (beforeRenderCount + 4).toString()
    renderCount = html('#counters_render_count')
    expect(renderCount).toBe(toBe, '#counters_render_count fail') // expected number of renders to be ${toBe} not ${renderCount}
    
    // the child changed a value passed from parent as a prop
    renderCount = html('#inner_counters_render_count')
    // toBe = (beforeInnerRenderCount + 4).toString()
    expect(renderCount).toBe(toBe) // expected number of renders to be ${toBe} not ${renderCount}

    testCounterElements('#🥦-standalone-counter', '#🥦-standalone-display')

    // toBe = (beforeRenderCount + (firstRun ? 6 : 6)).toString()
    renderCount = html('#counters_render_count')
    expect(renderCount).toBe(toBe, '#counters_render_count failed') // render count check failed

    // the child was not rendered again because props did not change so value should be less
    renderCount = html('#inner_counters_render_count')
    // toBe = (beforeInnerRenderCount + 4).toString()
    expect(renderCount).toBe(toBe, '#inner_counters_render_count failed') // expected number of renders to be ${toBe} not ${renderCount}

    expectElmCount('#conditional-counter', 1)
    expectElmCount('#conditional-display', 1)
    if(firstRun) {
      expect(html('#conditional-display')).toBe('2')
    }

    renderCount = htmlById('❤️💧-shallow-display')
    testCounterElements('#conditional-counter', '#conditional-display')
    
    expect(renderCount).toBe(htmlById('❤️💧-shallow-display')) // expect shallow render not to have changed
    
    // test again after higher elements have had reruns
    testCounterElements('#❤️-inner-counter', '#❤️-inner-display')

    testCounterElements('#❤️💧-shallow-counter', '#❤️💧-shallow-display')

    speedClickCountTest('🤿-deep-counter', '🤿-deep-display', '❤️-inner-counter')
    speedClickCountTest('💧-shallow-counter', '💧-shallow-display', '❤️💧-shallow-display')
    speedClickCountTest('🪨-immutable-counter', '🪨-immutable-display', '❤️🪨-immutable-counter')
    speedClickCountTest('🚫-nowatch-counter', '🚫-nowatch-display', '❤️🚫-nowatch-counter')

    // renderCount = html('#shallow_counters_render_count')
    // toBe = (beforeInnerRenderCount + 4).toString()
    // expect(renderCount).toBe(toBe) // expected number of renders to be ${toBe} not ${renderCount}

  })

  it('counters.test piped subject', () => {
    if(firstRun) {
      const counter = html('#🥦-standalone-display')
      const pipe0 = html('#🪈-pipedSubject')
      // expect(pipe0).toBe(counter, `firstRun failure pipe0. Expected "${pipe0}" toBe empty-string aka ${counter}`)
      expect(pipe0).toBe("", `firstRun failure pipe0. Expected "${pipe0}" toBe empty-string`)

      const pipe2 = html('#🪈-pipedSubject-2')
      // expect(pipe2).toBe(counter, `firstRun failure pipe2 expected ${pipe2} to be ${counter}`)
      expect(pipe2).toBe("", `firstRun failure pipe2 expected toBe empty-string`)

      const pipe3 = html('#🪈-pipedSubject-3')
      expect(pipe3).toBe("", `firstRun failure pipe3 expected toBe empty-string`)
    }
    
    click('#🥦-subject-increase-counter')

    const pipedSubDisplay = html('#🪈-pipedSubject')
    const subjectCountDisplay = html('#🥦-standalone-display')
    expect(pipedSubDisplay).toBe(subjectCountDisplay) // Expected #🪈-pipedSubject value(${pipedSubDisplay}) to match #🥦-standalone-display value(${subjectCountDisplay})
    expect(html('#🪈-pipedSubject-2')).toBe(html('#🥦-standalone-display') )
  })
})

export const clickSpeedAmount = 600
function speedClickCountTest(
  counterQuery: string,
  displayQuery: string,
  increaseOuterCounterQuery: string,
) {
  const clickCount = htmlById(displayQuery)
  const elm = byId(counterQuery)
  const propCounterBtnElm = byId(increaseOuterCounterQuery)
  
  console.time(`⌚️ ${counterQuery}`)
  for (let index = 0; index < 600; index++) {
    elm.click()
  }
  console.timeEnd(`⌚️ ${counterQuery}`)

  console.time(`⌚️ outer ${counterQuery}`)
  for (let index = 0; index < 600; index++) {
    propCounterBtnElm.click()
  }
  console.timeEnd(`⌚️ outer ${counterQuery}`)

  const displayQueryTime = (Number(clickCount) + clickSpeedAmount).toString()
  expect(htmlById(displayQuery)).toBe(displayQueryTime) // ${displayQuery}
}
