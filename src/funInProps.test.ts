import { click, html } from "./testing/elmSelectors"
import { expect, it } from "./testing/expect"
import { testCounterElements } from "./testing/expect.html"

it('function in props', async () => {
  testCounterElements('#fun_in_prop1', '#fun_in_prop_display')
  testCounterElements('#fun_in_prop2', '#fun_in_prop_display')
  testCounterElements('#fun_in_prop3', '#fun_in_prop_display')
  
  expect(html('#main_wrap_state')).toBe('taggjedjs-wrapped')

  click('#toggle-fun-in-child')
  click('#fun-parent-button')
  
  // expect(html('#main_wrap_state')).toBe('nowrap')
  
  click('#toggle-fun-in-child')
  click('#fun-parent-button')

  expect(html('#main_wrap_state')).toBe('taggjedjs-wrapped')
})
