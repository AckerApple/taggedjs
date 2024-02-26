import { expect } from "./expect";
export function runTests() {
    try {
        expect(document.getElementById('h1-app')).toBeDefined();
        const toggleTest = document.getElementById('toggle-test');
        expect(toggleTest).toBeDefined();
        expect(toggleTest?.innerText).toBe('toggle test');
        toggleTest?.click();
        expect(toggleTest?.innerText).toBe('toggle test true');
        toggleTest?.click();
        expect(toggleTest?.innerText).toBe('toggle test');
        testCounterElements('#increase-counter', '#counter-display');
        testCounterElements('#increase-gateway-count', '#display-gateway-count');
        testCounterElements('#childTests-button', '#childTests-display');
        testCounterElements('#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display');
        testDuelCounterElements(['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'], ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display']);
        testDuelCounterElements(['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'], ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display']);
        testDuelCounterElements(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
        testDuelCounterElements(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
        testDuelCounterElements(['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'], ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display']);
        console.info('✅ all tests passed');
        return true;
    }
    catch (error) {
        console.error('❌ tests failed: ' + error.message, error);
        alert('❌ tests failed: ' + error.message);
        return false;
    }
}
function testDuelCounterElements([button0, display0], // button, display
[button1, display1]) {
    const display0Element = document.querySelectorAll(display0)[0];
    const ip0 = display0Element.innerText;
    testCounterElements(button0, display0);
    let display1Element = document.querySelectorAll(display1)[0];
    let ip1Check = display1Element.innerText;
    const value = (Number(ip0) + 2).toString();
    expect(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`);
    testCounterElements(button1, display1);
    display1Element = document.querySelectorAll(display1)[0];
    ip1Check = display1Element.innerText;
    expect(ip1Check).toBe((Number(ip0) + 4).toString());
}
/** increases counter by two */
function testCounterElements(counterButtonId, counterDisplayId, { elementCountExpected } = {
    elementCountExpected: 1
}) {
    // const getByIndex = (selector: string, index: number) => document.querySelectorAll(selector)[index] as unknown as HTMLElement[]
    const increaseCounters = document.querySelectorAll(counterButtonId);
    const counterDisplays = document.querySelectorAll(counterDisplayId);
    expect(increaseCounters.length).toBe(elementCountExpected, `Expected ${counterButtonId} to be ${elementCountExpected} elements but is instead ${increaseCounters.length}`);
    expect(counterDisplays.length).toBe(elementCountExpected, `Expected ${counterDisplayId} to be ${elementCountExpected} elements but is instead ${counterDisplays.length}`);
    increaseCounters.forEach((increaseCounter, index) => {
        const counterDisplay = counterDisplays[index];
        // const counterDisplay = getByIndex(index)
        let counterValue = Number(counterDisplay?.innerText);
        increaseCounter?.click();
        let oldCounterValue = counterValue + 1;
        counterValue = Number(counterDisplay?.innerText);
        expect(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to be value ${oldCounterValue} but is instead ${counterValue}`);
        increaseCounter?.click();
        expect(counterValue + 1).toBe(Number(counterDisplay?.innerText));
    });
}
//# sourceMappingURL=tests.js.map