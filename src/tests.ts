import { byId, elmCount, htmlById, queryOneInnerHTML } from "./elmSelectors"
import { describe, execute, expect, it } from "./expect"
import { expectElmCount, expectHTML, expectMatchedHtml, testCounterElements, testDuelCounterElements } from "./expect.html"

export async function runTests() {
  it('no template tags', () => {
    const templateTags = document.getElementsByTagName('template')
    expect(templateTags.length).toBe(0, 'Expected no templates to be on document')
  })
  
  it('elements exists', () => {
    expect(document.getElementById('h1-app')).toBeDefined()
    const toggleTest = document.getElementById('toggle-test')
    expect(toggleTest).toBeDefined()
    expect(toggleTest?.innerText).toBe('toggle test')
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
    expect(toggleTest?.innerText).toBe('toggle test true')
    toggleTest.click()
    expect(toggleTest?.innerText).toBe('toggle test')
    
    const propsTextarea = document.getElementById('props-debug-textarea') as HTMLTextAreaElement
    expect(propsTextarea.value.replace(/\s/g,'')).toBe(`{"test":33,"x":"y"}`)
  })

  it('basic increase counter', () => {
    expectElmCount('#conditional-counter', 0)
    testCounterElements('#❤️-increase-counter', '#❤️-counter-display')
    testCounterElements('#❤️-inner-counter', '#❤️-inner-display')
    testCounterElements('#standalone-counter', '#standalone-display')
    expectElmCount('#conditional-counter', 1)
    testCounterElements('#conditional-counter', '#conditional-display')
    
    // test again after higher elements have had reruns
    testCounterElements('#❤️-inner-counter', '#❤️-inner-display')
  })

  describe('props', () => {    
    it('basics', () => {
      testDuelCounterElements(
        ['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'],
        ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
      )
  
      testDuelCounterElements(
        ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
        ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display'],
      )
  
      // the number of times the watch counted a change happens to match that increase counter
      const funUpdateValue = byId('propsOneLevelFunUpdate-🥩-display').innerHTML
      expect(queryOneInnerHTML('#propsDebug-🥩-change-display')).toBe( funUpdateValue )
  
      const ownerHTML = document.querySelectorAll('#propsDebug-🥩-0-display')[0].innerHTML
      const parentHTML = document.querySelectorAll('#propsDebug-🥩-1-display')[0].innerHTML
      const childHTML = document.querySelectorAll('#propsOneLevelFunUpdate-🥩-display')[0].innerHTML
  
      const ownerNum = Number(ownerHTML)
      const parentNum = Number(parentHTML)
      const childNum = Number(childHTML)
  
      expect(parentNum).toBe(childNum)
      expect(ownerNum + 2).toBe(parentNum) // testing of setProp() doesn't change owner
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

  it('providers', async () => {
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

  it('provider debug', () => {
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
      document.getElementById('array-test-push-item')?.click()
      expect(elmCount('#score-data-0-1-inside-button')).toBe(1)
      expect(elmCount('#score-data-0-1-outside-button')).toBe(1)
      
      const insideElm = document.getElementById('score-data-0-1-inside-button')
      const insideDisplay = document.getElementById('score-data-0-1-inside-display')
      let indexValue = insideDisplay?.innerText
      const outsideElm = document.getElementById('score-data-0-1-outside-button')
      const outsideDisplay = document.getElementById('score-data-0-1-outside-display')
      const outsideValue = outsideDisplay?.innerText
      expect(indexValue).toBe(outsideValue)
  
      insideElm?.click()
      expect(insideDisplay?.innerText).toBe(outsideDisplay?.innerText)
      expect(indexValue).toBe((Number(insideDisplay?.innerText) - 1).toString())
      expect(indexValue).toBe((Number(outsideDisplay?.innerText) - 1).toString())
  
      outsideElm?.click()
      expect(insideDisplay?.innerText).toBe(outsideDisplay?.innerText)
      expect(indexValue).toBe((Number(insideDisplay?.innerText) - 2).toString())
      expect(indexValue).toBe((Number(outsideDisplay?.innerText) - 2).toString())
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

  it('🪞 mirror testing', async () => {
    expectElmCount('#mirror-counter-display', 2)
    expectElmCount('#mirror-counter-button', 2)
    
    const counter = Number(htmlById('mirror-counter-display'))

    byId('mirror-counter-button').click()

    expect(counter + 1).toBe( Number(htmlById('mirror-counter-display')) )
    expectElmCount('#mirror-counter-display', 2)
    expectMatchedHtml('#mirror-counter-display')
  })  

  it('has no templates', () => {
    expect(document.getElementsByTagName('template').length).toBe(0)
  })

  try {
    await execute()
    console.info('✅ all tests passed')
    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}

function delay(time: number) {
  return new Promise((res) => setTimeout(res, time))
}
