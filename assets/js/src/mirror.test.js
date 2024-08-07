import { byId, htmlById } from "./elmSelectors";
import { expect, it } from "./expect";
import { expectElmCount, expectMatchedHtml } from "./expect.html";
it('🪞 mirror testing', () => {
    expectElmCount('#mirror-counter-display', 2);
    expectElmCount('#mirror-counter-button', 2);
    const counter = Number(htmlById('mirror-counter-display'));
    byId('mirror-counter-button').click();
    expect(counter + 1).toBe(Number(htmlById('mirror-counter-display')));
    expectElmCount('#mirror-counter-display', 2);
    expectMatchedHtml('#mirror-counter-display');
});
//# sourceMappingURL=mirror.test.js.map