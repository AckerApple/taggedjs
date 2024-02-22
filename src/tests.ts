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

    testCounterElements('increase-counter', 'counter-display')

    testCounterElements('increase-gateway-count', 'display-gateway-count')

    console.info('✅ all tests passed')
    return true
  } catch (error: unknown) {
    console.error('error', error)
    alert('❌ tests failed: ' + (error as Error).message)
    return false
  }
}

function testCounterElements(
  counterButtonId: string,
  counterDisplayId: string,
) {
  const increaseCounter = document.getElementById(counterButtonId)
  const counterDisplay = document.getElementById(counterDisplayId)
  expect(increaseCounter).toBeDefined()
  expect(counterDisplay).toBeDefined()
  let counterValue = Number(counterDisplay?.innerText)
  increaseCounter?.click()
  expect(counterValue + 1).toBe( counterValue = Number(counterDisplay?.innerText) )
  increaseCounter?.click()
  expect(counterValue + 1).toBe( Number(counterDisplay?.innerText) )
}

function expect(received: unknown) {
  return {
    toBeDefined: () => {
      if(received !== undefined && received !== null) {
        return
      }

      const message = `Expected ${JSON.stringify(received)} to be defined`
      console.error(message, {received})
      throw new Error(message)
    },
    toBe: (expected: unknown) => {
      if(received === expected) {
        return
      }

      const message = `Expected ${JSON.stringify(received)} to be ${JSON.stringify(expected)}`
      console.error(message, {received, expected})
      throw new Error(message)
    }
  }
}