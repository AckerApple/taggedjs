import { childTests } from "./childTests";
import { Subject, callbackMaker, html, onInit, letState, tag, state } from "taggedjs";
import { arrayTests } from "./arrayTests";
import { tagSwitchDebug } from "./tagSwitchDebug.component";
import { mirroring } from "./mirroring.tag";
import { propsDebugMain } from "./PropsDebug.tag";
import { providerDebugBase } from "./providerDebug";
import { counters } from "./countersDebug";
import { tableDebug } from "./tableDebug.component";
import { contentDebug } from "./ContentDebug.component";
import { watchTesting } from "./watchTesting.tag";
import { oneRender } from "./oneRender.tag";
import { renderCountDiv } from "./renderCount.component";
import funInPropsTag from "./funInProps.tag";
import { App as todo } from "./todo/todos.app";
import { activate, saveScopedStorage, sections, storage, viewChanged, ViewTypes } from "./sections.tag";
import { runTesting } from "./runTesting.function";
export default () => tag.state = (_ = state('isolated app state'), renderCount = letState(0)(x => [renderCount, renderCount = x]), appCounter = letState(0)(x => [appCounter, appCounter = x]), appCounterSubject = state(() => new Subject(appCounter)), toggleValue = letState(false)(x => [toggleValue, toggleValue = x]), toggle = () => toggleValue = !toggleValue, callback = callbackMaker()) => {
    onInit(() => {
        console.info('1️⃣ app init should only run once');
        appCounterSubject.subscribe(callback(x => appCounter = x) // a let variable is expected to maintain new value over render cycles forward
        );
        if (storage.autoTest) {
            runTesting(false);
        }
    });
    function toggleAutoTesting() {
        storage.autoTest = storage.autoTest = !storage.autoTest;
        saveScopedStorage();
    }
    ++renderCount;
    const outputSections = [{
            title: 'oneRender',
            output: oneRender(),
            view: ViewTypes.OneRender,
        }];
    return html `<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <fieldset>
        <legend>direct app tests</legend>        
        <button id="app-counter-subject-button"
          onclick=${() => appCounterSubject.next(appCounter + 1)}
        >🍒 ++app subject</button>
        <button id="app-counter-button" onclick=${() => ++appCounter}>🍒 ++app</button>
        <span>
          🍒 <span id="app-counter-display">${appCounter}</span>
        </span>
        <span>
          🍒$&lt;<span id="app-counter-subject-display">${appCounterSubject}</span>&gt;
        </span>
        <span>
          🍒$.value&lt;<span id="app-counter-subject-value-display">${appCounterSubject.value}</span>&gt;
        </span>
        <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
      </fieldset>  

      auto testing <input type="checkbox" ${storage.autoTest ? 'checked' : null}
        onchange=${toggleAutoTesting}
      />
      <button type="button" onclick=${() => runTesting(true)}>run tests</button>
    </div>

    ${renderCountDiv({ name: 'app', renderCount })}

    ${sections()}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${outputSections.map(({ view, title, output }) => storage.views.includes(view) && html `
          <fieldset style="flex:2 2 20em">
            <legend>${title}</legend>
            ${output}
          </fieldset>
        `)}

        ${storage.views.includes(ViewTypes.Props) && html `
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${propsDebugMain()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.WatchTesting) && html `
          <fieldset style="flex:2 2 20em">
            <legend>watchTesting</legend>
            ${watchTesting()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.TableDebug) && html `
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${tableDebug()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.ProviderDebug) && html `
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${providerDebugBase(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.TagSwitchDebug) && html `
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${tagSwitchDebug(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Mirroring) && html `
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${mirroring()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Arrays) && html `
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${arrayTests()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Counters) && html `
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${counters({ appCounterSubject })}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Content) && html `
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${contentDebug()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Child) && html `
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${childTests(undefined)}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.FunInPropsTag) && html `
          <fieldset style="flex:2 2 20em">
            <legend>funInPropsTag</legend>
            ${funInPropsTag()}
          </fieldset>
        `}

        ${storage.views.includes(ViewTypes.Todo) && html `
          <fieldset style="flex:2 2 20em">
            <legend>todo</legend>
            ${todo()}
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
};
viewChanged.subscribe(({ type, checkTesting }) => {
    activate(type, checkTesting);
});
//# sourceMappingURL=isolatedApp.js.map