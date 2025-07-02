import { getInnerHTML, html, states, tag } from "taggedjs";
import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests.js";
import { renderCountDiv } from "./renderCount.component.js";
const test22 = tag((a, b, children) => html `
  <fieldset>
    <legend>xxxxx</legend>  
    <div>hello other world ${a} - ${b}</div>
    <div style="border:2px solid red;">***${children}***</div>
  </fieldset>
`);
const noTagTest = () => {
    const innerHTML = getInnerHTML();
    return html `
    <fieldset>
      <legend>noTagTest</legend>
      ${11}---${innerHTML}+++${22}
    </fieldset>
  `.acceptInnerHTML(innerHTML);
};
export const child = tag((_ = 'childTests') => (renderCount = 0, counter = 0, _ = states(get => [{ renderCount, counter }] = get({ renderCount, counter })), __ = ++renderCount) => html `
  <fieldset id="children-test" style="flex:2 2 20em">
    <legend>childTests</legend>

    <hr />
    <hr />
    <hr />
    ${test22(1, 2, html `
      <div><hr />abc-123-${Date.now()}<hr /></div>
    `)}
    <hr />
    <hr />
    <hr />
    
    ${innerHtmlTest({}, 2, html `
      <b>Field set body A</b>
      <hr />
      <button id="innerHtmlTest-childTests-button"
        onclick=${() => ++counter}
      >🐮 (A) increase childTests inside ${counter}:${renderCount}</button>
      <span id="innerHtmlTest-childTests-display">${counter}</span>
      ${renderCountDiv({ renderCount, name: 'childTests-innerHtmlTest' })}
    `)}
    
    ${noTagTest().innerHTML = html `
      <b>Field set body C</b>
      <hr />
      <button id="innerHtmlTest-childTests-button-c"
        onclick=${() => ++counter}
      >🐮 (C) increase childTests inside ${counter}:${renderCount}</button>
      <span id="innerHtmlTest-childTests-display-c">${counter}</span>
      ${renderCountDiv({ renderCount, name: 'childTests-innerHtmlTest-c' })}
    `}

    ${innerHtmlPropsTest(22, html `
      <b>Field set body B</b>
      <hr />
      <button id="innerHtmlPropsTest-childTests-button"
        onclick=${() => ++counter}
      >🐮 (B) increase childTests inside ${counter}</button>
      <span id="innerHtmlPropsTest-childTests-display">${counter}</span>
      ${renderCountDiv({ renderCount, name: 'innerHtmlPropsTest child' })}
    `)}

    ${childAsPropTest({ child: html `
      hello child as prop test
      <button id="child-as-prop-test-button"
        onclick=${() => ++counter}
      >🐮 child as prop ${counter}</button>
      <span id="child-as-prop-test-display">${counter}</span>
    ` })}
    
    <hr />
    
    <button id="childTests-button"
      onclick=${() => ++counter}
    >🐮 increase childTests outside ${counter} - ${renderCount}</button>
    <span id="childTests-display">${counter}</span>

    ${renderCountDiv({ renderCount, name: 'childTests' })}
  </fieldset>
`);
function childAsPropTest({ child }) {
    return html `
    <fieldset>
      <legend>child as prop</legend>
      ${child}
    </fieldset>
  `;
}
//# sourceMappingURL=childTests.tag.js.map