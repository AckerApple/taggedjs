import { it, expect } from './testing';
import { html } from './testing';
import { testCounterElements } from './testing';
it('oneRender', () => {
    expect(html('#oneRender_tag_ts_render_count')).toBe('1');
    testCounterElements('#👍-counter-button', '#👍-counter-display');
    testCounterElements('#👍🔨-counter-button', '#👍🔨-counter-display');
    testCounterElements('#👍🔨-counter-button', '#👍🔨-counter-subject-display');
    testCounterElements('#👍🔨-counter-button', '#📡-signal-counter-display');
    expect(html('#oneRender_tag_ts_render_count')).toBe('1');
});
//# sourceMappingURL=oneRender.test.js.map