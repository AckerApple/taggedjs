import { it, expect } from './testing'
import { byId, htmlById } from './testing'
import { expectElmCount, expectMatchedHtml } from './testing'

it('🪞 mirror testing', () => {
  expectElmCount('#mirror-counter-display', 2)
  expectElmCount('#mirror-counter-button', 2)
  
  const counter = Number(htmlById('mirror-counter-display'))

  byId('mirror-counter-button').click()

  expect(counter + 1).toBe( Number(htmlById('mirror-counter-display')) )
  expectElmCount('#mirror-counter-display', 2)
  expectMatchedHtml('#mirror-counter-display')
})