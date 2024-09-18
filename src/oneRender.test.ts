import { html } from "./testing/elmSelectors"
import { expect, it } from "./testing/expect"
import { testCounterElements } from "./testing/expect.html"

it('oneRender', () => {
  expect(html('#oneRender_tag_ts_render_count')).toBe('1')

  testCounterElements('#👍-counter-button', '#👍-counter-display')
  testCounterElements('#👍🔨-counter-button', '#👍🔨-counter-display')
  testCounterElements('#👍🔨-counter-button', '#👍🔨-counter-subject-display')

  expect(html('#oneRender_tag_ts_render_count')).toBe('1')
})
