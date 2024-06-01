import { byId, click, elmCount, html, htmlById, queryOneInnerHTML } from "./elmSelectors"
import { describe, execute, expect, it } from "./expect"
import { expectElmCount, expectHTML, expectMatchedHtml, testCounterElements, testDuelCounterElements } from "./expect.html"

export async function runTests() {
  const slowCount = html('#🍄-slowChangeCount')
  // tests can be run multiple times. Only the first time will this expect below work
  const firstRun = slowCount === '0'

  it('no template tags', () => {
    const templateTags = document.getElementsByTagName('template')
    expect(templateTags.length).toBe(0, 'Expected no templates to be on document')
  })
  
  it('elements exists', () => {
    expect(byId('h1-app')).toBeDefined()
    const counterInput = byId('set-main-counter-input') as HTMLInputElement
    expect(counterInput).toBeDefined()
    const toggleTest = byId('toggle-test')
    expect(toggleTest).toBeDefined()
    expect(toggleTest.innerText).toBe('toggle test')
    
    counterInput.value = '0'
    ;(counterInput as any).onkeyup({target: counterInput})
  })

  describe('content', () => {    
    it('basic', () => {
      expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1')
      expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1')
    })

    it('html', () => {
      expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1')
    })
  })

  it('toggle test', () => {
    const toggleTest = byId('toggle-test')
    toggleTest.click()
    expect(toggleTest.innerText).toBe('toggle test true')
    toggleTest.click()
    expect(toggleTest.innerText).toBe('toggle test')
    
    const propsTextarea = byId('props-debug-textarea') as HTMLTextAreaElement
    expect(propsTextarea.value.replace(/\s/g,'')).toBe(`{"test":33,"x":"y"}`)
  })

  describe('counters', () => {    
    it('basics', () => {
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

      expect(html('#counters_render_count')).toBe( (beforeRenderCount + (firstRun ? 6 : 8)).toString() )
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

      expect(html('#🪈-pipedSubject')).toBe( html('#🥦-subject-counter-display') )
      expect(html('#🪈-pipedSubject-2')).toBe( html('#🥦-subject-counter-display') )
    })
  })

  describe('props', () => {    
    it('test duels', () => {
      testDuelCounterElements(
        ['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'],
        ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
      )
  
      testDuelCounterElements(
        ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
        ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display'],
      )
    })

    it('letProp', () => {
      // local and outside currently match
      expectMatchedHtml('#propsDebug-🥩-0-display', '#propsDebug-🥩-2-display')
      const propCounter = Number(html('#propsDebug-🥩-0-display'))
      
      click('#propsDebug-🥩-2-button')

      // outer should not have changed
      expect(html('#propsDebug-🥩-0-display')).toBe( propCounter.toString() )
      expect(html('#propsDebug-🥩-2-display')).toBe( (propCounter + 1).toString() )      
    })

    it('basics', () => {
      // the number of times the watch counted a change happens to match that increase counter
      const funUpdateValue = byId('propsOneLevelFunUpdate-🥩-display').innerHTML
      const changed = queryOneInnerHTML('#propsDebug-🥩-change-display')
      
      // test that watch runs onInit
      expect(changed).toBe( (Number(funUpdateValue) + 1).toString() )
  
      const ownerHTML = byId('propsDebug-🥩-0-display').innerHTML
      const parentHTML = byId('propsDebug-🥩-1-display').innerHTML
      const childHTML = byId('propsOneLevelFunUpdate-🥩-display').innerHTML
  
      const ownerNum = Number(ownerHTML)
      const parentNum = Number(parentHTML)
      const childNum = Number(childHTML)
  
      expect(parentNum).toBe(childNum)
      expect(ownerNum + 2).toBe(parentNum) // testing of setProp() doesn't change owner

      byId('propsDebug-🥩-1-button').click()
    })

    it('props as functions', () => {
      const syncCounter = Number( htmlById('sync-prop-number-display') )
      // const syncCounter = Number( htmlById('sync-prop-child-display') )
      expectMatchedHtml('#sync-prop-number-display', '#sync-prop-child-display')

      byId('sync-prop-child-button').click()

      expectHTML('#sync-prop-number-display', (syncCounter + 2).toString())
      testCounterElements('#nothing-prop-counter-button', '#nothing-prop-counter-display')
      expectHTML('#sync-prop-number-display', (syncCounter + 2).toString())
      expectMatchedHtml('#sync-prop-counter-display', '#nothing-prop-counter-display')
      
    })
  })

  describe('providers', () => {
    it('basics', () => {
      testDuelCounterElements(
        ['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'],
        ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display'],
      )
  
      testDuelCounterElements(
        ['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'],
        ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display'],
      )
  
      testDuelCounterElements(
        ['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'],
        ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display'],
      )
    })
  
    it('inner outer debug', () => {
      testDuelCounterElements(
        ['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'],
        ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display'],
      )
  
      // change a counter in the parent element
      testDuelCounterElements(
        ['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'],
        ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display'],
      )
  
      // now ensure that this inner tag still operates correctly even though parent just rendered but i did not from that change
      testDuelCounterElements(
        ['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'],
        ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display'],
      )
    })
  })  

  describe('tagSwitching', () => {
    it('0', () => {
      expect(elmCount('#select-tag-above')).toBe(1, 'Expected select-tag-above element to be defined')
      expect(elmCount('#tag-switch-dropdown')).toBe(1, 'Expected one #tag-switch-dropdown')
      expect(elmCount('#tagSwitch-1-hello')).toBe(2, 'Expected two #tagSwitch-1-hello elements')
      expect(elmCount('#tagSwitch-2-hello')).toBe(0)
      expect(elmCount('#tagSwitch-3-hello')).toBe(0)
    })
  
    it('1', () => {
      const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
      dropdown.value = "1"
  
      ;(dropdown as any).onchange({target:dropdown})
      expectElmCount('#tagSwitch-1-hello', 5)
      expect(elmCount('#tagSwitch-2-hello')).toBe(0)
      expect(elmCount('#tagSwitch-3-hello')).toBe(0)
      expect(elmCount('#select-tag-above')).toBe(0)
    })
  
    it('2', () => {
      const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
  
      dropdown.value = "2"
      ;(dropdown as any).onchange({target:dropdown})
  
      expectElmCount('#tagSwitch-1-hello', 2)
      expectElmCount('#tagSwitch-2-hello', 4)
      expect(elmCount('#tagSwitch-3-hello')).toBe(0)
      expect(elmCount('#select-tag-above')).toBe(0)
    })
  
    it('3', () => {
      const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
      dropdown.value = "3"
      ;(dropdown as any).onchange({target:dropdown})
  
      expect(elmCount('#tagSwitch-1-hello')).toBe(0,'Expected no hello 1s')
      expect(elmCount('#tagSwitch-2-hello')).toBe(0)
      expectElmCount('#tagSwitch-3-hello', 7)
      expect(elmCount('#select-tag-above')).toBe(0)
    })
  
    it('4', () => {  
      const dropdown = byId('tag-switch-dropdown') as HTMLSelectElement
      dropdown.value = ""
      ;(dropdown as any).onchange({target:dropdown})
  
      expectElmCount('#select-tag-above',1)
      expectElmCount('#tag-switch-dropdown',1)
      expectElmCount('#tagSwitch-1-hello',2)
      expectElmCount('#tagSwitch-2-hello',0)
      expectElmCount('#tagSwitch-3-hello',0)
    })
  })

  it('child tests', () => {
    testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display')
    testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display')
    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#child-as-prop-test-button', '#child-as-prop-test-display'],
      ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display'],
    )

    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display'],
    )
  })

  describe('array testing', () => {
    it('array basics', () => {
      expect(elmCount('#array-test-push-item')).toBe(1)
      const insideCount = elmCount('#score-data-0-1-inside-button')
      expect(insideCount).toBe(0)
      expect(elmCount('#score-data-0-1-outside-button')).toBe(0)
      byId('array-test-push-item').click()
      expect(elmCount('#score-data-0-1-inside-button')).toBe(1)
      expect(elmCount('#score-data-0-1-outside-button')).toBe(1)
      
      const insideElm = byId('score-data-0-1-inside-button')
      const insideDisplay = byId('score-data-0-1-inside-display')
      let indexValue = insideDisplay.innerText
      const outsideElm = byId('score-data-0-1-outside-button')
      const outsideDisplay = byId('score-data-0-1-outside-display')
      const outsideValue = outsideDisplay.innerText
      expect(indexValue).toBe(outsideValue)
  
      insideElm.click()
      expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
      expect(indexValue).toBe((Number(insideDisplay.innerText) - 1).toString())
      expect(indexValue).toBe((Number(outsideDisplay.innerText) - 1).toString())
  
      outsideElm.click()
      expect(insideDisplay.innerText).toBe(outsideDisplay.innerText)
      expect(indexValue).toBe((Number(insideDisplay.innerText) - 2).toString())
      expect(indexValue).toBe((Number(outsideDisplay.innerText) - 2).toString())
    })

    it('🗑️ deletes', async () => {
      expect(elmCount('#player-remove-promise-btn-0')).toBe(0)
      expect(elmCount('#player-edit-btn-0')).toBe(1)

      await (byId('player-edit-btn-0') as any).onclick()

      expect(elmCount('#player-remove-promise-btn-0')).toBe(1)

      await (byId('player-remove-promise-btn-0') as any).onclick()
      await delay(1000) // animation

      expect(elmCount('#player-remove-promise-btn-0')).toBe(0)
      expect(elmCount('#player-edit-btn-0')).toBe(0)
    })
  })

  it('🪞 mirror testing', () => {
    expectElmCount('#mirror-counter-display', 2)
    expectElmCount('#mirror-counter-button', 2)
    
    const counter = Number(htmlById('mirror-counter-display'))

    byId('mirror-counter-button').click()

    expect(counter + 1).toBe( Number(htmlById('mirror-counter-display')) )
    expectElmCount('#mirror-counter-display', 2)
    expectMatchedHtml('#mirror-counter-display')
  })  

  it('⌚️ watch tests', () => {
    const startCount = Number(htmlById('watch-testing-num-display'))

    expectMatchedHtml('#watch-testing-num-display', '#🍄-slowChangeCount')
    
    // always starts at "false"
    expect(html('#🦷-truthChange')).toBe('false')
        
    if(firstRun) {
      expect(html('#🍄-watchPropNumSlow')).toBe('')
      expect(html('#🦷-watchTruth')).toBe('false')
      expect(html('#🦷-watchTruthAsSub')).toBe('undefined')
    } else {
      expect(html('#🍄-watchPropNumSlow')).toBe( slowCount )
      expect( Number(html('#🦷-watchTruth')) ).toBeGreaterThan( Number(slowCount) )
      expect(html('#🦷-watchTruthAsSub')).toBe( html('#🦷-truthSubChangeCount') )
    }

    click('#watch-testing-num-button')
    
    expectMatchedHtml('#watch-testing-num-display', '#🍄-slowChangeCount')
    expectMatchedHtml('#🍄-watchPropNumSlow', '#🍄-slowChangeCount')
    
    expect(html('#🍄‍🟫-subjectChangeCount')).toBe( (startCount + 2).toString() )
    expectMatchedHtml('#🍄‍🟫-subjectChangeCount', '#🍄‍🟫-watchPropNumSubject')
    
    const truthStartCount = Number(html('#🦷-truthChangeCount'))

    click('#🦷-truthChange-button')

    let newCount = (truthStartCount + 1).toString()
    // its been changed to "true", that causes a change watch count increase
    expect(html('#🦷-truthChange')).toBe('true')
    expect(html('#🦷-watchTruth')).toBe( newCount )
    expect(html('#🦷-truthChangeCount')).toBe( newCount )

    click('#🦷-truthChange-button')

    newCount = (truthStartCount + 1).toString()
    // its been changed to back to "false", that does NOT cause a change watch count increase
    expect(html('#🦷-truthChange')).toBe('false')
    expect(html('#🦷-watchTruth')).toBe(newCount)
    expect(html('#🦷-truthChangeCount')).toBe( newCount )

    click('#🦷-truthChange-button')

    // its been changed to "true", that causes a change watch count increase
    newCount = (truthStartCount + 2).toString()
    expect(html('#🦷-truthChange')).toBe('true')
    expect(html('#🦷-watchTruth')).toBe(newCount)
    expect(html('#🦷-truthChangeCount')).toBe( newCount )

    click('#🦷-truthChange-button') // reset so tests can pass every time
    click('#🦷-reset-button') // reset so tests can pass every time

    expect(html('#🦷-watchTruthAsSub')).toBe(html('#🦷-watchTruth'))
  })

  it('oneRender', () => {
    expect(html('#oneRender_tag_ts_render_count')).toBe('1')

    testCounterElements('#👍-counter-button', '#👍-counter-display')
    testCounterElements('#👍👍-counter-button', '#👍👍-counter-display')
    testCounterElements('#👍👍-counter-button', '#👍👍-counter-subject-display')

    expect(html('#oneRender_tag_ts_render_count')).toBe('1')
  })

  it('function in props', () => {
    testCounterElements('#fun_in_prop1', '#fun_in_prop_display')
    testCounterElements('#fun_in_prop2', '#fun_in_prop_display')
    testCounterElements('#fun_in_prop3', '#fun_in_prop_display')
    
    expect(html('#main_wrap_state')).toBe('taggjedjs-wrapped')

    click('#toggle-fun-in-child')
    click('#fun-parent-button')
    expect(html('#main_wrap_state')).toBe('nowrap')
    click('#toggle-fun-in-child')
    click('#fun-parent-button')
    expect(html('#main_wrap_state')).toBe('taggjedjs-wrapped')
  })

  it('has no templates', () => {
    expect(document.getElementsByTagName('template').length).toBe(0)
  })

  try {
    const start = Date.now() //performance.now()
    await execute()
    const time = Date.now() - start // performance.now() - start
    console.info(`✅ all tests passed in ${time}ms`)
    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}

function delay(time: number) {
  return new Promise((res) => setTimeout(res, time))
}
