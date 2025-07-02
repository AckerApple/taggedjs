import { Subject, callbackMaker, html, onInit, tag, state, states } from "taggedjs";
import { child } from "../childTests.tag.js";
import { arrays } from "../arrayTests.js";
import { tagSwitchDebug } from "../tagSwitchDebug.component.js";
import { mirroring } from "../mirroring.tag.js";
import { propsDebugMain } from "../PropsDebug.tag.js";
import { providerDebug } from "../providerDebug.js";
import { counters } from "../countersDebug.js";
import { tableDebug } from "../tableDebug.component.js";
import { content } from "../ContentDebug.tag.js";
import { watchTesting } from "../watchTesting.tag.js";
import { oneRender } from "../oneRender.tag.js";
import { renderCountDiv } from "../renderCount.component.js";
export default tag.route = tag(() => () => {
    const views = [
        'content',
        'oneRender',
    ];
    let renderCount = 0;
    let appCounter = 0;
    states(get => [{ renderCount, appCounter }] = get({ renderCount, appCounter }));
    const appCounterSubject = state(() => new Subject(appCounter));
    const callback = callbackMaker();
    onInit(() => {
        console.info('1️⃣ app init should only run once');
        appCounterSubject.subscribe(callback(x => {
            appCounter = x;
        }));
    });
    ++renderCount;
    return html `<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <button id="app-counter-subject-button"
        onclick=${() => appCounterSubject.next(appCounter + 1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-display">${appCounter}</span>
      </span>
    </div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${[
        { view: 'oneRender', label: 'oneRender', tag: oneRender },
        { view: 'props', label: 'propsDebugMain', tag: propsDebugMain },
        { view: 'watchTesting', label: 'watchTesting', tag: watchTesting },
        { view: 'tableDebug', label: 'tableDebug', tag: tableDebug },
        { view: 'providerDebug', label: 'providerDebug', tag: providerDebug },
        { view: 'tagSwitchDebug', label: 'tagSwitchDebug', tag: tagSwitchDebug },
        { view: 'mirroring', label: 'mirroring', tag: mirroring },
        { view: 'arrays', label: 'arrays', tag: arrays },
        { view: 'content', label: 'content', tag: content },
        { view: 'child', label: 'child', tag: child },
    ].map(({ view, label, tag }) => views.includes(view) && html `
            <fieldset style="flex:2 2 20em">
              <legend>${label}</legend>
              ${tag()}
            </fieldset>
          `.key(view))}

        ${views.includes('counters') && html `
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${counters({ appCounterSubject })}
          </fieldset>
        `}

        ${ /*
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ template.string }</textarea>
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
      */false}
      </div>
      ${renderCountDiv({ renderCount, name: 'isolatedApp' })}
    </div>
  `;
});
//# sourceMappingURL=isolatedApp.page.js.map