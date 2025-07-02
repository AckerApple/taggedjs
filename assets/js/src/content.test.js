// taggedjs-no-compile
import { testStaggerBy } from "./ContentDebug.tag";
import { byId, click, html, query, htmlById, changeOne, textContent, clickById, count } from "./testing/elmSelectors";
import "./testing/setup-mocha-chai"; // Sets up Mocha/Chai globals
import { expectMatchedHtml, sleep } from "./testing/expect.html";
let runs = 0;
describe('📰 content', () => {
    it.only('basic', () => {
        expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1');
        expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1');
        expect(html('#content-dom-parse-0-0')).to.equal(html('#content-dom-parse-0-1'));
        console.log('i am a running test here-----');
    });
    it('html', () => {
        expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1');
    });
    it('spacing', () => {
        expect(html('#hello-big-dom-world')).to.equal('hello <b>big</b> world');
        expect(html('#hello-big-string-world')).to.equal('hello <b>big</b> world');
        expect(html('#hello-spacing-dom-world')).to.equal('54 hello worlds');
    });
    it('style.', () => {
        expect(query('#style-simple-border-orange')[0].style.border).to.equal('3px solid orange');
        expect(query('#style-var-border-orange')[0].style.border).to.equal('3px solid orange');
        expect(query('#style-toggle-border-orange')[0].style.border).to.equal('3px solid orange');
        click('#toggle-border-orange');
        expect(query('#style-toggle-border-orange')[0].style.border).to.equal('3px solid green');
        click('#toggle-border-orange');
        expect(query('#style-toggle-border-orange')[0].style.border).to.equal('3px solid orange');
    });
    it('style set as object', () => {
        expect(query('#style-toggle-bold')[0].style.fontWeight).to.equal('');
        click('#toggle-bold');
        expect(query('#style-toggle-bold')[0].style.fontWeight).to.equal('bold');
        click('#toggle-bold');
        expect(query('#style-toggle-bold')[0].style.fontWeight).to.equal('');
    });
    describe('no parent element tests', () => {
        it('no immediate parent', () => {
            const element = document.getElementById('noParentTagFieldset');
            expect(element?.innerText).to.equal('No Parent Test\ncontent1\ntest0\ncontent2\ntest1\ncontent3\ntest3\ncontent4');
        });
        it('multiple no parent - ensure dynamic content rendered in order', () => {
            const element = document.getElementById('noParentTagFieldset');
            const parent = element.parentNode;
            const html = parent.innerHTML.replace(/(^(.|\n)+<hr id="noParentsTest2-start">|)/g, '').replace(/<hr id="noParentsTest2-end">(.|\n)*/g, '').trim();
            expect(html).to.equal('<hr>content1<hr>test0<hr>content2<hr>test1<hr>content3<hr>test3<hr>content4<hr>');
        });
    });
    it('subscribe', async () => {
        if (runs > 0) {
            console.warn('⏭️ skipped test that only passes the first time');
            return;
        }
        expect(htmlById('content-subscribe-sub0')).to.equal('');
        expect(htmlById('content-subscribe-sub0-with')).to.equal('-1');
    });
    describe('passed in subscription', () => {
        it('increase test', async () => {
            const increase = byId('passed-in-sub-increase');
            const hideShow = byId('passed-in-sub-hide-show');
            expect(htmlById('passed-in-sub-ex0')).to.equal('0||||0');
            expect(htmlById('passed-in-sub-ex1')).to.equal('1||||1');
            expect(htmlById('passed-in-sub-ex2')).to.equal('2||||2');
            increase.click();
            expect(htmlById('passed-in-sub-ex0')).to.equal(`0||||0`);
            expect(htmlById('passed-in-sub-ex1')).to.equal('1||||1');
            expect(htmlById('passed-in-sub-ex2')).to.equal('2||||2');
            hideShow.click();
            expect(htmlById('passed-in-sub-ex0')).to.equal(`0||||0`);
            expect(htmlById('passed-in-sub-ex1')).to.equal('1||||1');
            expect(htmlById('passed-in-sub-ex2')).to.equal('2||||2');
            increase.click();
            const subValue = htmlById('passed-in-output');
            expect(htmlById('passed-in-sub-ex0')).to.equal(`0||${subValue}||0`);
            expect(htmlById('passed-in-sub-ex1')).to.equal(`1||your fun number ${subValue}||1`);
            expect(htmlById('passed-in-sub-ex2')).to.equal(`2||your tag number ${subValue}||2`);
            hideShow.click();
            expect(htmlById('passed-in-sub-ex0')).to.equal('0||||0');
            expect(htmlById('passed-in-sub-ex1')).to.equal('1||||1');
            expect(htmlById('passed-in-sub-ex2')).to.equal('2||||2');
        });
    });
    it('increase runs', () => {
        ++runs;
    });
    it('concat style', () => {
        byId('dynamic-border-width').value = 2;
        byId('dynamic-border-color').value = 'white';
        changeOne('#dynamic-border-width');
        changeOne('#dynamic-border-color');
        expect(byId('dynamic-border-element').style.borderColor).to.equal('white');
        expect(byId('dynamic-border-element').style.borderWidth).to.equal('2px');
        byId('dynamic-border-width').value = 1;
        byId('dynamic-border-color').value = 'blue';
        changeOne('#dynamic-border-width');
        changeOne('#dynamic-border-color');
        expect(byId('dynamic-border-element').style.borderColor).to.equal('blue');
        expect(byId('dynamic-border-element').style.borderWidth).to.equal('1px');
    });
    it('tagvar injections', () => {
        expect(byId('inject-tagvar-0').innerText).to.equal(byId('inject-read-tagvar-0').innerText);
        expect(byId('inject-tagvar-1').innerText).to.equal(byId('inject-read-tagvar-1').innerText);
        expect(byId('inject-tagvar-2').innerText).to.equal(byId('inject-read-tagvar-2').innerText);
    });
    it('animates', async () => {
        expect(count('[name=test-the-tester]')).to.equal(0);
        //show
        click('#content-toggle-fx');
        expect(count('[name=test-the-tester]')).to.equal(3);
        expect(count('.animate__animated[name=test-the-tester]')).to.equal(1);
        await sleep(testStaggerBy / 2 + 50);
        // almost shown
        expect(count('[name=test-the-tester]')).to.equal(3);
        expect(count('.animate__animated[name=test-the-tester]')).to.equal(1);
        expect(textContent('#outer-html-fx-test')).to.equal('inner html tag');
        await sleep(100 + testStaggerBy * 3);
        // completed showing
        expect(count('[name=test-the-tester]')).to.equal(3);
        expect(count('.animate__animated[name=test-the-tester]')).to.equal(0);
        // hide
        click('#content-toggle-fx');
        // no changes to remove yet
        expect(count('[name=test-the-tester]')).to.equal(3);
        expect(count('.animate__animated[name=test-the-tester]')).to.equal(1);
        await sleep(100 + testStaggerBy * 6);
        // should be done disappearing
        expect(count('[name=test-the-tester]')).to.equal(0);
        expect(count('.animate__animated[name=test-the-tester]')).to.equal(0);
    });
    it('host', () => {
        let hostDestroyCount = Number(htmlById('hostDestroyCount'));
        // should be a number
        expect(isNaN(Number(htmlById('hostedContent')))).to.equal(false);
        clickById('hostHideShow');
        expect(Number(htmlById('hostDestroyCount'))).to.equal(hostDestroyCount + 1);
        // should NOT be a number
        expect(htmlById('hostedContent')).to.equal('');
        clickById('hostHideShow');
        // should be a number
        expect(isNaN(Number(htmlById('hostedContent')))).to.equal(false);
        // still same number
        expect(Number(htmlById('hostDestroyCount'))).to.equal(hostDestroyCount + 1);
    });
});
//# sourceMappingURL=content.test.js.map