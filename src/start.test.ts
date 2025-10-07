import { it, expect } from './testing'
import { click, textContent } from './testing'
/*
it('no template tags', () => {
  const templateTags = document.getElementsByTagName('template')
  expect(templateTags.length).toBe(0) // Expected no templates to be on document
})
*/

it('basic app subject', () => {
  const current = Number(textContent('#app-counter-subject-value-display'))
  click('#app-counter-subject-button')
  const afterClick = Number(textContent('#app-counter-subject-value-display'))
  expect(current).toBe(afterClick-1, `Expected #app-counter-subject-value-display to be ${afterClick-1} but it is ${current}`)
})
