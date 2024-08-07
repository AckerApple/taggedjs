import { describe, it } from "./expect";
import { testDuelCounterElements } from "./expect.html";
describe('providers', () => {
    it('basics', () => {
        testDuelCounterElements(['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'], ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display']);
        testDuelCounterElements(['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'], ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display']);
        testDuelCounterElements(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
    });
    it('inner outer debug', () => {
        testDuelCounterElements(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
        // change a counter in the parent element
        testDuelCounterElements(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
        // now ensure that this inner tag still operates correctly even though parent just rendered but i did not from that change
        testDuelCounterElements(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
    });
});
//# sourceMappingURL=providers.test.js.map