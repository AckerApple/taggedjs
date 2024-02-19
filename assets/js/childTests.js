import { html, state, tag } from "taggedjs";
import { innerHtmlTest } from "./innerHtmlTests.js";
import { renderCountDiv } from "./renderCount.component.js";
const childContentTest = tag(({ legend, id }, children) => {
    let renderCount = state(0)(x => [renderCount, renderCount = x]);
    let counter = state(0)(x => [counter, counter = x]);
    ++renderCount;
    return html `
    <fieldset id=${id} style="flex:2 2 20em">
      <legend>${legend}</legend>
      ${children}
      <hr />
      <button onclick=${() => ++counter}>increase childContentTest ${counter}</button>
      ${renderCountDiv(renderCount)}
    </fieldset>
  `;
});
export const childTests = tag(() => {
    let renderCount = state(0)(x => [renderCount, renderCount = x]);
    let counter = state(0)(x => [counter, counter = x]);
    ++renderCount;
    return html `
    <fieldset id="children-test" style="flex:2 2 20em">
      <legend>childTests</legend>

      ${innerHtmlTest(html `
        <b>Field set body A</b>
        <hr />
        <button onclick=${() => ++counter}>increase childTests inside ${counter}</button>
        ${renderCountDiv(renderCount)}
      `)}

      ${ /*innerHtmlPropsTest(22, html`
      <b>Field set body B</b>
      <hr />
      <button onclick=${() => ++counter}>increase childTests inside ${counter}</button>
      ${renderCountDiv(renderCount)}
    `)*/false}

      ${childContentTest({ legend: 'Inner Test', id: 'children-inner-test' }, html `
        ${ /*innerHtmlTest(html`
      <b>Field set body C</b>
    `)*/false}
        
        ${ /*innerHtmlPropsTest(33, html`
      <b>Field set body D</b>
    `)*/false}

        <hr />
        
        <button onclick=${() => ++counter}>increase childTests inside ${counter}</button>
        ${renderCountDiv(renderCount)}
      `)}
      
      <hr />
      
      <button onclick=${() => ++counter}>increase childTests outside ${counter}</button>
      ${renderCountDiv(renderCount)}
    </fieldset>
  `;
});
//# sourceMappingURL=childTests.js.map