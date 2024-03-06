import { execute, expect, it } from "./expect"

export function runTests() {  
  it('elements exists', () => {
    expect(document.getElementById('h1-app')).toBeDefined()
    const toggleTest = document.getElementById('toggle-test')
    expect(toggleTest).toBeDefined()
    expect(toggleTest?.innerText).toBe('toggle test')
    toggleTest?.click()
    expect(toggleTest?.innerText).toBe('toggle test true')
    toggleTest?.click()
    expect(toggleTest?.innerText).toBe('toggle test')
  })

  it('counters increase', () => {
    testCounterElements('#increase-counter', '#counter-display')
    // testCounterElements('#increase-gateway-count', '#display-gateway-count')
      
    testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display')
    testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display')
  })

  it('testDuelCounterElements', () => {
    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display'],
    )

    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display'],
    )

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

    testDuelCounterElements(
      ['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'],
      ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
    )
  })
  
  it('provider debug', () => {
    testDuelCounterElements(
      ['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'],
      ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display'],
    )
  })

  it('tagSwitching', () => {
    expect(elementCount('#select-tag-above')).toBe(1, 'Expected select-tag-above element to be defined')
    expect(elementCount('#tag-switch-dropdown')).toBe(1, 'Expected one #tag-switch-dropdown')
    expect(elementCount('#tagSwitch-1-hello')).toBe(2, 'Expected two #tagSwitch-1-hello elements')
    expect(elementCount('#tagSwitch-2-hello')).toBe(0)
    expect(elementCount('#tagSwitch-3-hello')).toBe(0)

    const dropdown = document.getElementById('tag-switch-dropdown') as HTMLSelectElement
    dropdown.value = "1"

    ;(dropdown as any).onchange({target:dropdown})
    
    expectElementCount('#tagSwitch-1-hello', 5)
    expect(elementCount('#tagSwitch-2-hello')).toBe(0)
    expect(elementCount('#tagSwitch-3-hello')).toBe(0)
    expect(elementCount('#select-tag-above')).toBe(0)

    dropdown.value = "2"
    ;(dropdown as any).onchange({target:dropdown})

    expectElementCount('#tagSwitch-1-hello', 2)
    expectElementCount('#tagSwitch-2-hello', 4)
    expect(elementCount('#tagSwitch-3-hello')).toBe(0)
    expect(elementCount('#select-tag-above')).toBe(0)

    dropdown.value = "3"
    ;(dropdown as any).onchange({target:dropdown})

    expect(elementCount('#tagSwitch-1-hello')).toBe(0,'Expected no hello 1s')
    expect(elementCount('#tagSwitch-2-hello')).toBe(0)
    expectElementCount('#tagSwitch-3-hello', 7)
    expect(elementCount('#select-tag-above')).toBe(0)

    dropdown.value = ""
    ;(dropdown as any).onchange({target:dropdown})

    expectElementCount('#select-tag-above',1)
    expectElementCount('#tag-switch-dropdown',1)
    expectElementCount('#tagSwitch-1-hello',2)
    expectElementCount('#tagSwitch-2-hello',0)
    expectElementCount('#tagSwitch-3-hello',0)
  })

  it('array testing', () => {
    expect(elementCount('#array-test-push-item')).toBe(1)
    expect(elementCount('#score-data-0-1-inside')).toBe(0)
    expect(elementCount('#score-data-0-1-outside')).toBe(0)
    document.getElementById('array-test-push-item')?.click()
    expect(elementCount('#score-data-0-1-inside')).toBe(1)
    expect(elementCount('#score-data-0-1-outside')).toBe(1)
    
    const insideElm = document.getElementById('score-data-0-1-inside')
    let indexValue = insideElm?.innerText
    const outsideElm = document.getElementById('score-data-0-1-outside')
    const outsideValue = outsideElm?.innerText
    expect(indexValue).toBe(outsideValue)

    insideElm?.click()
    expect(insideElm?.innerText).toBe(outsideElm?.innerText)
    expect(indexValue).toBe((Number(insideElm?.innerText) - 1).toString())
    expect(indexValue).toBe((Number(outsideElm?.innerText) - 1).toString())

    outsideElm?.click()
    expect(insideElm?.innerText).toBe(outsideElm?.innerText)
    expect(indexValue).toBe((Number(insideElm?.innerText) - 2).toString())
    expect(indexValue).toBe((Number(outsideElm?.innerText) - 2).toString())

  })  

  try {
    execute()
    console.info('✅ all tests passed')
    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}

function elementCount(selector: string) {
  return document.querySelectorAll(selector).length
}

function testDuelCounterElements(
  [button0, display0]: [string, string], // button, display
  [button1, display1]: [string, string], // button, display
) {
  const display0Element = document.querySelectorAll(display0)[0] as HTMLElement
  const ip0 = display0Element.innerText
  testCounterElements(button0, display0)
  
  let display1Element = document.querySelectorAll(display1)[0] as HTMLElement
  let ip1Check = display1Element.innerText
  const value = (Number(ip0) + 2).toString()
  expect(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`)
 
  testCounterElements(button1, display1)
  
  display1Element = document.querySelectorAll(display1)[0] as HTMLElement
  ip1Check = display1Element.innerText
  expect(ip1Check).toBe((Number(ip0) + 4).toString(), `Expected ${display1} innerText to be ${Number(ip0) + 4} but instead it is ${ip1Check}`)
}

/** increases counter by two */
function testCounterElements(
  counterButtonId: string,
  counterDisplayId: string,
  {elementCountExpected} = {
    elementCountExpected: 1
  }
) {
  // const getByIndex = (selector: string, index: number) => document.querySelectorAll(selector)[index] as unknown as HTMLElement[]
  const increaseCounters = document.querySelectorAll(counterButtonId) as unknown as HTMLElement[]
  const counterDisplays = document.querySelectorAll(counterDisplayId) as unknown as HTMLElement[]

  expect(increaseCounters.length).toBe(elementCountExpected, `Expected ${counterButtonId} to be ${elementCountExpected} elements but is instead ${increaseCounters.length}`)
  expect(counterDisplays.length).toBe(elementCountExpected, `Expected ${counterDisplayId} to be ${elementCountExpected} elements but is instead ${counterDisplays.length}`)

  increaseCounters.forEach((increaseCounter, index) => {
    const counterDisplay = counterDisplays[index]
    // const counterDisplay = getByIndex(index)
    
    let counterValue = Number(counterDisplay?.innerText)
    increaseCounter?.click()

    let oldCounterValue = counterValue + 1
    counterValue = Number(counterDisplay?.innerText)
    expect(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to be value ${oldCounterValue} but is instead ${counterValue}`)
    increaseCounter?.click()

    counterValue = Number(counterDisplay?.innerText)
    ++oldCounterValue
    expect(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to increase value to ${oldCounterValue} but is instead ${counterValue}`)
  })
}

function expectElementCount(
  query: string,
  count: number,
  message?: string
) {
  const found = elementCount(query)

  message = message || `Expected ${count} elements to match query ${query} but found ${found}`

  expect(found).toBe(count, message)
}
