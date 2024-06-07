import { byId, click, html } from "./elmSelectors"
import { describe, expect, it } from "./expect"
import { expectElmCount, testCounterElements } from "./expect.html"

describe('counters', () => {    
  const slowCount = html('#🍄-slowChangeCount')
  // tests can be run multiple times. Only the first time will this expect below work
  const firstRun = slowCount === '0'

  it('basics', () => {
    const counterInput = byId('set-main-counter-input') as HTMLInputElement
    expect(counterInput).toBeDefined()
    counterInput.value = '0'
    ;(counterInput as any).onkeyup({target: counterInput})

    const beforeRenderCount = Number(html('#counters_render_count'))
    const beforeInnerRenderCount = Number(html('#inner_counters_render_count'))

    expectElmCount('#conditional-counter', 0)

    testCounterElements('#❤️-increase-counter', '#❤️-counter-display')

    expect(html('#counters_render_count')).toBe( (beforeRenderCount + 2).toString() )
    // the parent changed a value passed to child as a prop
    expect(html('#inner_counters_render_count')).toBe( (beforeInnerRenderCount + 2).toString() )

    testCounterElements('#❤️-inner-counter', '#❤️-inner-display')

    expect(html('#counters_render_count')).toBe( (beforeRenderCount + 4).toString() )
    // the child changed a value passed from parent as a prop
    expect(html('#inner_counters_render_count')).toBe( (beforeInnerRenderCount + 4).toString() )

    testCounterElements('#standalone-counter', '#standalone-display')

    expect(html('#counters_render_count')).toBe( (beforeRenderCount + (firstRun ? 6 : 6)).toString(), 'render count check failed' )
    // the child was not rendered again because props did not change so value should be less
    expect(html('#inner_counters_render_count')).toBe( (beforeInnerRenderCount + 4).toString() )

    expectElmCount('#conditional-counter', 1)
    expectElmCount('#conditional-display', 1)
    if(firstRun) {
      expect(html('#conditional-display')).toBe('2')
    }
    testCounterElements('#conditional-counter', '#conditional-display')
    
    // test again after higher elements have had reruns
    testCounterElements('#❤️-inner-counter', '#❤️-inner-display')

    if(firstRun) {
      expect(html('#🪈-pipedSubject')).toBe('')
      expect(html('#🪈-pipedSubject-2')).toBe('')
    }
    
    click('#🥦-subject-increase-counter')

    const pipedSubDisplay = html('#🪈-pipedSubject')
    const subjectCountDisplay = html('#🥦-subject-counter-display')
    expect(pipedSubDisplay).toBe(subjectCountDisplay, `Expected #🪈-pipedSubject value(${pipedSubDisplay}) to match #🥦-subject-counter-display value(${subjectCountDisplay})`)
    expect(html('#🪈-pipedSubject-2')).toBe(html('#🥦-subject-counter-display') )
  })
})
