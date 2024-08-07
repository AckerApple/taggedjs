import { click, html } from "./elmSelectors";
import { expect, it } from "./expect";
import { testCounterElements } from "./expect.html";
it('function in props', async () => {
    testCounterElements('#fun_in_prop1', '#fun_in_prop_display');
    testCounterElements('#fun_in_prop2', '#fun_in_prop_display');
    testCounterElements('#fun_in_prop3', '#fun_in_prop_display');
    expect(html('#main_wrap_state')).toBe('taggjedjs-wrapped');
    click('#toggle-fun-in-child');
    click('#fun-parent-button');
    // expect(html('#main_wrap_state')).toBe('nowrap')
    click('#toggle-fun-in-child');
    click('#fun-parent-button');
    expect(html('#main_wrap_state')).toBe('taggjedjs-wrapped');
});
//# sourceMappingURL=funInProps.test.js.map