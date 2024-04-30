import { expect } from "./expect"

export function expectMatchedHtml(
  ...queries: string[]
) {
  const elements = queries.reduce((all, query) => {
      const elements = document.querySelectorAll(query)
      all.push(...elements)
      return all
    }, [] as Element[]
  )

  expect(elements.length).toBeGreaterThan(0)

  const lastElm = elements.pop() as Element
  const lastHtml = lastElm.innerHTML
  elements.every(elm =>
    expect(lastHtml).toBe(elm.innerHTML)
  )
}

export function expectHTML(
  query: string,
  innerHTML: string
) {
  const elements = document.querySelectorAll(query)
  elements.forEach(element =>
    expect(element.innerHTML).toBe(innerHTML, `Expected element ${query} innerHTML to be -->${innerHTML}<-- but it was -->${element.innerHTML}<--`)
  )
}

export function expectElmCount(
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

export function testDuelCounterElements(
  ... sets: [string, string][]
  // [button0, display0]: [string, string], // button, display
  // [button1, display1]: [string, string], // button, display
) {
  const [button0, display0] = sets.shift() as [string, string]
  let query = expectElmCount(display0, 1)
  const display0Element = query[0] as HTMLElement
  const ip0 = display0Element.innerText
  testCounterElements(button0, display0)
  
  let increase = 2
  sets.forEach(([button1, display1]) => {    
    query = expectElmCount(display1, 1)
    let display1Element = query[0] as HTMLElement
    let ip1Check = display1Element.innerText
    const value = (Number(ip0) + increase).toString()
    expect(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`)
   
    testCounterElements(button1, display1)
    
    query = expectElmCount(display1, 1)
    display1Element = query[0] as HTMLElement
    ip1Check = display1Element.innerText
    const secondIncrease = increase + 2
    expect(ip1Check).toBe((Number(ip0) + secondIncrease).toString(), `Expected ${display1} innerText to be ${Number(ip0) + secondIncrease} but instead it is ${ip1Check}`)

    increase = increase + 2
  })
}

/** increases counter by two */
export function testCounterElements(
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
