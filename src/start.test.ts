import { byId } from "./elmSelectors"
import { expect, it } from "./expect"

it('no template tags', () => {
  const templateTags = document.getElementsByTagName('template')
  expect(templateTags.length).toBe(0, 'Expected no templates to be on document')
})
