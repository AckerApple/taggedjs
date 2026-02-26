import { tag, fieldset, legend, div, noElement, b, hr, button, span } from "taggedjs";
import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests.js";
import { renderCountDiv } from "./renderCount.component.js";
const test22 = tag((a, b, children) => {
    test22.updates(x => [a, b, children] = x);
    const xx = div('hello other world', _ => a, ' - ', _ => b);
    return fieldset(legend('xxxxx'), xx, div.style `border:2px solid red;`('***', _ => children, '***'));
});
const noTagTest = (innerHTML) => {
    // noTagTest.updates(x => [innerHTML] = x)
    return fieldset(legend('noTagTest'), '11---', _ => innerHTML, '+++22');
};
export const child = tag((_ = 'childTests') => {
    let renderCount = 0;
    let counter = 0;
    ++renderCount;
    return fieldset.id `children-test`.style `flex:2 2 20em`(legend('childTests'), hr, hr, hr, _ => test22(1, 2, div(hr, 'abc-123-', _ => Date.now(), hr)), hr, hr, hr, _ => innerHtmlTest({}, 2, noElement(b('Field set body A'), hr, button({
        id: "innerHtmlTest-childTests-button",
        onClick: () => ++counter
    }, '🐮 (A) increase childTests inside ', _ => counter, ':', _ => renderCount), span({ id: "innerHtmlTest-childTests-display" }, _ => counter), _ => renderCountDiv({ renderCount, name: 'childTests-innerHtmlTest' }))), noTagTest(noElement(b('Field set body C'), hr, button({
        id: "innerHtmlTest-childTests-button-c",
        onClick: () => ++counter
    }, _ => `🐮🐮 (C) increase childTests inside ${counter}:${renderCount}`), span({ id: "innerHtmlTest-childTests-display-c" }, _ => counter), _ => renderCountDiv({ renderCount, name: 'childTests-innerHtmlTest-c' }))), _ => innerHtmlPropsTest(22, noElement(b('Field set body B'), hr, button({
        id: "innerHtmlPropsTest-childTests-button",
        onClick: () => ++counter
    }, '🐮🐮🐮 (B) increase childTests inside ', _ => counter), span({ id: "innerHtmlPropsTest-childTests-display" }, _ => counter), _ => renderCountDiv({ renderCount, name: 'innerHtmlPropsTest child' }))), _ => childAsPropTest({ child: noElement('hello child as prop test', button({
            id: "child-as-prop-test-button",
            onClick: () => ++counter
        }, '🐮🐮🐮🐄 child as prop ', _ => counter), span({ id: "child-as-prop-test-display" }, _ => counter)) }), hr, button({
        id: "childTests-button",
        onClick: () => ++counter
    }, '🐮🐮🐄🐄 increase childTests outside ', _ => counter, ' - ', _ => renderCount), span({ id: "childTests-display" }, _ => counter), _ => renderCountDiv({ renderCount, name: 'childTests' }));
});
//# sourceMappingURL=childTests.tag.js.map