import { renderCountDiv } from "./renderCount.component.js";
import { html, tag, Subject, onInit, state } from "taggedjs";
export const counters = tag(function Counters() {
    let counter = state(0)(x => [counter, counter = x]);
    let renderCount = state(0)(x => [renderCount, renderCount = x]);
    let initCounter = state(0)(x => [initCounter, initCounter = x]);
    onInit(() => {
        ++initCounter;
        console.info('tagJsDebug.js: 👉 i should only ever run once');
    });
    const increaseCounter = () => {
        ++counter;
    };
    ++renderCount; // for debugging
    return html `<!--counters-->
    <div>Subscriptions:${Subject.globalSubCount$}:${Subject.globalSubs.length}</div>
    <div>initCounter:${initCounter}</div>
    <button id="increase-counter" onclick=${increaseCounter}>counter:${counter}</button>
    <span id="counter-display">${counter}</span>
    <button onclick=${() => console.info('subs', Subject.globalSubs)}>log subs</button>
    ${renderCountDiv({ renderCount, name: 'counters' })}
  `;
});
//# sourceMappingURL=countersDebug.js.map