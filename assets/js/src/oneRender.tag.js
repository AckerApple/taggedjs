import { html, letState, Subject, subject, tag, ValueSubjective } from "taggedjs";
import { renderCountDiv } from "./renderCount.component.js";
/** this tag renders only once */
export const oneRender = () => tag.renderOnce = (counter = new ValueSubjective(0), renderCount = letState(0)(x => [renderCount, renderCount = x])) => {
    ++renderCount;
    const x = Subject.all([0, 'all', 4]);
    return html `
    <div>-start-</div>
    ${x.pipe(x => JSON.stringify(x))}elias
    <div>
      <span>👍<span id="👍-counter-display">${counter}</span></span>
      <button type="button" id="👍-counter-button"
        onclick=${() => ++counter.value}
      >++👍</button>
    </div>
    ${renderCountDiv({ renderCount, name: 'oneRender_tag_ts' })}
    <hr />
    ${insideMultiRender()}
  `;
};
/** this tag renders on every event but should not cause parent to re-render */
const insideMultiRender = tag(() => (counter = letState(0)(x => [counter, counter = x]), counter$ = subject(0), renderCount = letState(0)(x => [renderCount, renderCount = x])) => {
    ++renderCount;
    return html `
  <span>👍🔨 sub counter-subject-display:<span id="👍🔨-counter-subject-display">${counter$}</span></span>
  <br />
  <span>👍🔨 sub counter<span id="👍🔨-counter-display">${counter}</span></span>
  <br />
  <button type="button" id="👍🔨-counter-button"
    onclick=${() => {
        counter$.next(++counter);
    }}
  >++👍👍</button>
  ${renderCountDiv({ renderCount, name: 'insideMultiRender' })}
`;
});
//# sourceMappingURL=oneRender.tag.js.map