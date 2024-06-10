import { html } from "./elmSelectors"
import { expect, it } from "./expect"
import { testCounterElements } from "./expect.html"

it('oneRender', () => {
  expect(html('#oneRender_tag_ts_render_count')).toBe('1')

  testCounterElements('#👍-counter-button', '#👍-counter-display')
  testCounterElements('#👍🔨-counter-button', '#👍🔨-counter-display')
  testCounterElements('#👍🔨-counter-button', '#👍🔨-counter-subject-display')

  expect(html('#oneRender_tag_ts_render_count')).toBe('1')
})
