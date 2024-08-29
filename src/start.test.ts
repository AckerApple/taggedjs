import { click, textContent } from "./elmSelectors"
import { expect, it } from "./expect"

/*
it('no template tags', () => {
  const templateTags = document.getElementsByTagName('template')
  expect(templateTags.length).toBe(0, 'Expected no templates to be on document')
})
*/

it('subject', () => {
  const current = textContent('#app-counter-subject-value-display')
  click('#app-counter-subject-button')
  const afterClick = textContent('#app-counter-subject-value-display')
  expect(Number(current)).toBe(Number(afterClick)-1)
})
