import { html, Subject, subject, tag, states, ValueSubjective, signal, subscribe } from "taggedjs";
import { renderCountDiv } from "./renderCount.component.js";
/** this tag renders only once */
export const oneRender = () => tag.renderOnce = (counter = new ValueSubjective(0), renderCount = 0) => {
    ++renderCount;
    const x = Subject.all([0, 'all', 4]);
    return html `
    ${subscribe(x.pipe(x => JSON.stringify(x)))}
    <div>
      <span>👍<span id="👍-counter-display">${subscribe(counter)}</span></span>
      <button type="button" id="👍-counter-button"
        onclick=${() => ++counter.value}
      >++👍</button>
    </div>
    ${renderCountDiv({ renderCount, name: 'oneRender_tag_ts' })}
    <hr />
    <fieldset>
      <legend>insideMultiRender</legend>
      ${insideMultiRender()}
    </fieldset>
  `;
};
/** this tag renders on every event but should not cause parent to re-render */
const insideMultiRender = tag(() => (counter$ = subject(0), counterSignal$ = signal(0), counter = 0, renderCount = 0, // state can be used but it never updates
_ = states(get => [{ renderCount, counter }] = get({ renderCount, counter }))) => {
    ++renderCount;
    return html `
  <div>👍🔨 sub counter-subject-display:<span id="👍🔨-counter-subject-display">${subscribe(counter$)}</span></div>
  <div>👍📡 signal counter:<span id="📡-signal-counter-display">${counterSignal$}</span></div>
  <br />
  <span>👍🔨 sub counter<span id="👍🔨-counter-display">${counter}</span></span>
  <br />
  <button type="button" id="👍🔨-counter-button"
    onclick=${() => {
        ++counter;
        counter$.next(counter);
        counterSignal$.value = counter;
    }}
  >++👍👍</button>
  ${renderCountDiv({ renderCount, name: 'insideMultiRender' })}
`;
});
//# sourceMappingURL=oneRender.tag.js.map