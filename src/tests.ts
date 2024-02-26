import { expect } from "./expect"

export function runTests() {  
  try {
    expect(document.getElementById('h1-app')).toBeDefined()
    
    const toggleTest = document.getElementById('toggle-test')
    expect(toggleTest).toBeDefined()
    expect(toggleTest?.innerText).toBe('toggle test')
    toggleTest?.click()
    expect(toggleTest?.innerText).toBe('toggle test true')
    toggleTest?.click()
    expect(toggleTest?.innerText).toBe('toggle test')

    testCounterElements('#increase-counter', '#counter-display')
    testCounterElements('#increase-gateway-count', '#display-gateway-count')
    testCounterElements('#childTests-button', '#childTests-display')
    testCounterElements('#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display')

    console.info('✅ all tests passed')
    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    alert('❌ tests failed: ' + (error as Error).message)
    return false
  }
}

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

  console.log('increaseCounters', increaseCounters)
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
    expect(counterValue + 1).toBe( Number(counterDisplay?.innerText) )
  })
}
