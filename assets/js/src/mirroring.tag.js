import { html, tag, states } from "taggedjs";
export const mirroring = tag(() => {
    const tag = tagCounter();
    return html `
    <fieldset>
      <legend>counter0</legend>
      ${tag}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${tag}
    </fieldset>
  `;
});
const tagCounter = () => {
    let counter = 0;
    states(get => [counter] = get(counter));
    return html `
    counter:<span>🪞<span id="mirror-counter-display">${counter}</span></span>
    <button id="mirror-counter-button" onclick=${() => ++counter}>${counter}</button>
  `;
};
//# sourceMappingURL=mirroring.tag.js.map