import { expect } from './index';
import { html } from "./elmSelectors";
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function expectElmCount(query, count, message) {
    const elements = document.querySelectorAll(query);
    const found = elements.length;
    message = message || `Expected ${count} elements to match query ${query} but found ${found}`;
    expect(found).toBe(count, message);
    return elements;
}
export function expectMatchedHtml(...queries) {
    let firstElmString;
    const elements = queries.reduce((all, query, queryIndex) => {
        const elements = document.querySelectorAll(query);
        all.push(...elements);
        elements.forEach((elm, index) => {
            firstElmString = firstElmString = elm.innerHTML;
            expect(elm.innerHTML).toBe(firstElmString, `Expected ${query}[${index}] expected to have html: ${firstElmString} but it is ${elm.innerHTML}`);
        });
        return all;
    }, []);
    if (elements.length === 0) {
        throw new Error(`Expected elements to be present in expectMatchedHtml() query but found none`);
    }
}
export function expectHTML(selector, expectedHtml, message) {
    const expectValue = html(selector);
    expect(expectValue).toBe(expectedHtml, message || `Expected ${selector} html to be "${expectedHtml}" but instead it is "${expectValue}"`);
}
function testCounterSelectedElements(counterButtons, counterDisplays, { elementCountExpected } = {
    elementCountExpected: 1
}, counterButtonSelect, counterDisplaySelect, testQuantifier = 0) {
    expect(counterButtons.length).toBe(elementCountExpected, `Expected ${counterButtonSelect} to be ${elementCountExpected} elements but is instead ${counterButtons.length}`);
    expect(counterDisplays.length).toBe(elementCountExpected, `Expected ${counterDisplaySelect} to be ${elementCountExpected} elements but is instead ${counterDisplays.length}`);
    counterButtons.forEach((increaseCounter, index) => {
        const counterDisplay = document.querySelectorAll(counterDisplaySelect)[index]; // counterDisplays[index]
        expect(document.body.contains(counterDisplay)).toBe(true, `The selected element ${counterDisplaySelect} is no longer an element on the document body BEFORE clicking ${counterButtonSelect}`);
        let counterValue = Number(counterDisplay?.innerText);
        expect(typeof increaseCounter.click).toBe('function');
        // will increase by one
        increaseCounter.click();
        expect(counterDisplay).toBeDefined();
        expect(document.body.contains(counterDisplay)).toBe(true, `The selected element ${counterDisplaySelect} is no longer an element on the document body AFTER clicking ${counterButtonSelect}`);
        let newCounterValue = counterValue + 1;
        counterValue = Number(counterDisplay.innerText);
        expect(document.body.contains(counterDisplay)).toBe(true);
        expect(newCounterValue).toBe(counterValue, `After click ${counterButtonSelect}, counter test ${testQuantifier + 1} of ${testQuantifier + 2} expected ${counterDisplaySelect} to be value ${newCounterValue} but it is ${counterValue}`);
        // will increase by one
        increaseCounter.click();
        counterValue = Number(counterDisplay?.innerText);
        ++newCounterValue;
        expect(newCounterValue).toBe(counterValue, `Counter test ${testQuantifier + 2} of ${testQuantifier + 2} expected ${counterDisplaySelect} to increase value to ${newCounterValue} but it is ${counterValue}`);
    });
}
/** increases counter by two */
export function testCounterElements(counterButtonSelect, counterDisplaySelect, { elementCountExpected } = {
    elementCountExpected: 1
}) {
    const increaseCounters = document.querySelectorAll(counterButtonSelect);
    const counterDisplays = document.querySelectorAll(counterDisplaySelect);
    return testCounterSelectedElements(increaseCounters, counterDisplays, { elementCountExpected }, counterButtonSelect, counterDisplaySelect);
}
export function testDuelCounterElements(...sets
// [button0, display0]: [string, string], // button, display
// [button1, display1]: [string, string], // button, display
) {
    const [button0, display0] = sets.shift();
    let query = expectElmCount(display0, 1);
    let buttonQuery = expectElmCount(button0, 1);
    const display0Element = query[0];
    const ip0 = display0Element.innerText;
    testCounterSelectedElements(buttonQuery, query, { elementCountExpected: 1 }, button0, display0);
    let increase = 2;
    sets.forEach(([button1, display1], index) => {
        query = expectElmCount(display1, 1);
        buttonQuery = expectElmCount(button1, 1);
        let display1Element = query[0];
        let ip1Check = display1Element.innerText;
        const value = (Number(ip0) + increase).toString();
        expect(ip1Check).toBe(value, () => `Expected second ${display1} increase provider to be increased to ${ip0} but got ${ip1Check}`);
        testCounterSelectedElements(buttonQuery, query, { elementCountExpected: 1 }, button0, display0, index + 2);
        display1Element = query[0];
        ip1Check = display1Element.innerText;
        const secondIncrease = increase + 2;
        expect(ip1Check).toBe((Number(ip0) + secondIncrease).toString(), () => `Expected ${display1} innerText to be ${Number(ip0) + secondIncrease} but instead it is ${ip1Check}`);
        increase = increase + 2;
    });
}
//# sourceMappingURL=expect.html.js.map