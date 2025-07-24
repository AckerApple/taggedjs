import { it, expect } from './testing'
import { click, textContent } from './testing'
/*
it('no template tags', () => {
  const templateTags = document.getElementsByTagName('template')
  expect(templateTags.length).toBe(0) // Expected no templates to be on document
})
*/

it('basic app subject', () => {
  const current = textContent('#app-counter-subject-value-display')
  click('#app-counter-subject-button')
  const afterClick = textContent('#app-counter-subject-value-display')
  expect(Number(current)).toBe(Number(afterClick)-1)
})
