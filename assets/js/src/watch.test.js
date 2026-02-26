import { describe, it, expect } from './testing';
import { click, html, htmlById } from './testing';
import { expectMatchedHtml } from './testing';
let runCount = 0;
describe('⌚️ watch tests', () => {
    const slowCount = html('#🍄-slowChangeCount');
    // tests can be run multiple times. Only the first time will this expect below work
    it('watch basic', async () => {
        const startCount = Number(htmlById('watch-testing-num-display'));
        if (runCount === 0) {
            const subjectChangeCount = html('#🍄‍🟫-subjectChangeCount');
            expect(subjectChangeCount).toBe('1', `Expected starting #🍄‍🟫-subjectChangeCount to be 1 but it is ${subjectChangeCount}`);
            expect(startCount).toBe(0, `At start #watch-testing-num-display should be 0 but it is ${startCount}`);
        }
        ++runCount;
        expectMatchedHtml('#watch-testing-num-display', '#🍄-slowChangeCount');
        // always starts at "false"
        expect(html('#🦷-truthChange')).toBe('false');
        if (runCount) {
            expect(html('#🍄-watchPropNumSlow')).toBe('');
            expect(html('#🦷-watchTruth')).toBe('false');
            expect(html('#🦷-watchTruthAsSub')).toBe('', 'Expected #🦷-watchTruthAsSub to be empty string');
        }
        else {
            const slowCount0 = html('#🍄-watchPropNumSlow');
            expect(slowCount0).toBe(slowCount, `Expected !runCount #🍄-watchPropNumSlow to be ${slowCount} instead it is ${slowCount0}`);
            expect(Number(html('#🦷-watchTruth'))).toBeGreaterThan(Number(slowCount));
            expect(html('#🦷-watchTruthAsSub')).toBe(html('#🦷-truthSubChangeCount'));
        }
        click('#watch-testing-num-button');
        expectMatchedHtml('#watch-testing-num-display', '#🍄-slowChangeCount');
        expectMatchedHtml('#🍄-watchPropNumSlow', '#🍄-slowChangeCount');
        const subjectChangeCount = html('#🍄‍🟫-subjectChangeCount');
        expect(subjectChangeCount).toBe((startCount + 2).toString(), `Expected #🍄‍🟫-subjectChangeCount to be ${startCount + 2} but it is ${subjectChangeCount}`);
        expectMatchedHtml('#🍄‍🟫-subjectChangeCount', '#🍄‍🟫-watchPropNumSubject');
        const truthStartCount = Number(html('#🦷-truthChangeCount'));
        click('#🦷-truthChange-button');
        let newCount = (truthStartCount + 1).toString();
        // its been changed to "true", that causes a change watch count increase
        const truthChangeCount = html('#🦷-truthChange');
        expect(truthChangeCount).toBe('true', `Expected #🦷-truthChange to be true but it is ${truthChangeCount}`);
        const watchTruthCount = html('#🦷-watchTruth');
        expect(watchTruthCount).toBe(newCount, `Expected #🦷-watchTruth to be ${newCount} but it is ${watchTruthCount}`);
        const changeCount0 = html('#🦷-truthChangeCount');
        expect(changeCount0).toBe(newCount, `A. Expected #🦷-truthChangeCount to be ${newCount} but it is ${changeCount0}`);
        click('#🦷-truthChange-button');
        newCount = (truthStartCount + 1).toString();
        // its been changed to back to "false", that does NOT cause a change watch count increase
        expect(html('#🦷-truthChange')).toBe('false');
        expect(html('#🦷-watchTruth')).toBe(newCount);
        const changeCount1 = html('#🦷-truthChangeCount');
        expect(changeCount1).toBe(newCount, `B. Expected #🦷-truthChangeCount to be ${newCount} but it is ${changeCount1}`);
        click('#🦷-truthChange-button');
        // its been changed to "true", that causes a change watch count increase
        newCount = (truthStartCount + 2).toString();
        const truthChange0 = html('#🦷-truthChange');
        expect(truthChange0).toBe('true', `Expected #🦷-truthChange to be true but it is ${truthChange0}`);
        expect(html('#🦷-watchTruth')).toBe(newCount);
        expect(html('#🦷-truthChangeCount')).toBe(newCount);
        click('#🦷-truthChange-button'); // reset so tests can pass every time
        click('#🦷-reset-button'); // reset so tests can pass every time
        const display = html('#🦷-watchTruth');
        const actual = html('#🦷-watchTruthAsSub');
        expect(actual).toBe(display, `Expected #🦷-watchTruth to match #🦷-watchTruthAsSub as ${display} but it is ${actual}`); // Last test expected #🦷-watchTruthAsSub ${display} but it was ${actual}
    });
});
//# sourceMappingURL=watch.test.js.map