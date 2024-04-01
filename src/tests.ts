import { execute, expect, it } from "./expect"

export function runTests() {  
  it('elements exists', () => {
    expect(document.getElementById('h1-app')).toBeDefined()
    const toggleTest = document.getElementById('toggle-test')
    expect(toggleTest).toBeDefined()
    expect(toggleTest?.innerText).toBe('toggle test')
  })

  it('toggle test', () => {
    const toggleTest = document.getElementById('toggle-test')
    toggleTest?.click()
    expect(toggleTest?.innerText).toBe('toggle test true')
    toggleTest?.click()
    expect(toggleTest?.innerText).toBe('toggle test')
    
    const propsTextarea = document.getElementById('props-debug-textarea') as HTMLTextAreaElement
    expect(propsTextarea.value.replace(/\s/g,'')).toBe(`{"test":33,"x":"y"}`)
  })

  it('basic increase counter', () => {
    expectElementCount('#conditional-counter', 0)
    testCounterElements('#increase-counter', '#counter-display')
    testCounterElements('#standalone-counter', '#standalone-display')
    expectElementCount('#conditional-counter', 1)
    testCounterElements('#conditional-counter', '#conditional-display')
  })

  it('props testing', () => {
    testDuelCounterElements(
      ['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'],
      ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
    )

    testDuelCounterElements(
      ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'],
      ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display'],
    )

    expect(queryOneInnerHTML('#propsDebug-🥩-change-display')).toBe('9')

    const ownerHTML = document.querySelectorAll('#propsDebug-🥩-0-display')[0].innerHTML
    const parentHTML = document.querySelectorAll('#propsDebug-🥩-1-display')[0].innerHTML
    const childHTML = document.querySelectorAll('#propsOneLevelFunUpdate-🥩-display')[0].innerHTML

    const ownerNum = Number(ownerHTML)
    const parentNum = Number(parentHTML)
    const childNum = Number(childHTML)

    expect(parentNum).toBe(childNum)
    expect(ownerNum + 2).toBe(parentNum) // testing of setProp() doesn't change owner
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
    expect(elementCount('#score-data-0-1-inside-button')).toBe(0)
    expect(elementCount('#score-data-0-1-outside-button')).toBe(0)
    document.getElementById('array-test-push-item')?.click()
    expect(elementCount('#score-data-0-1-inside-button')).toBe(1)
    expect(elementCount('#score-data-0-1-outside-button')).toBe(1)
    
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

  it('child tests', () => {
    testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display')
    testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display')
    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display'],
    )

    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display'],
    )
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
  let query = expectElementCount(display0, 1)
  const display0Element = query[0] as HTMLElement
  const ip0 = display0Element.innerText
  testCounterElements(button0, display0)
  
  query = expectElementCount(display1, 1)
  let display1Element = query[0] as HTMLElement
  let ip1Check = display1Element.innerText
  const value = (Number(ip0) + 2).toString()
  expect(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`)
 
  testCounterElements(button1, display1)
  
  query = expectElementCount(display1, 1)
  display1Element = query[0] as HTMLElement
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
//  const found = elementCount(query)
  const elements = document.querySelectorAll(query)
  const found = elements.length

  message = message || `Expected ${count} elements to match query ${query} but found ${found}`

  expect(found).toBe(count, message)

  return elements
}

function queryOneInnerHTML(
  query: string,
  pos = 0
) {
  return document.querySelectorAll(query)[pos].innerHTML
}