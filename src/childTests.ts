import { Tag, html, letState, tag } from "taggedjs"
import { innerHtmlPropsTest, innerHtmlTest } from "./innerHtmlTests"
import { renderCountDiv } from "./renderCount.component"

export const childTests = tag((_ = 'childTests') => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let counter = letState(0)(x => [counter, counter = x])

  ++renderCount

  return html`
    <fieldset id="children-test" style="flex:2 2 20em">
      <legend>childTests</legend>
      
      ${/*renderCountDiv(renderCount)}- ${renderCount*/false}
      
      ${innerHtmlTest({}, html`
        <b>Field set body A</b>
        <hr />
        <button id="innerHtmlTest-childTests-button"
          onclick=${() => ++counter}
        >🐮 increase childTests inside ${counter}:${renderCount}</button>
        <span id="innerHtmlTest-childTests-display">${counter}</span>
        ${renderCountDiv({renderCount, name: 'childTests-innerHtmlTest'})}
      `)}

      ${innerHtmlPropsTest(22, html`
        <b>Field set body B</b>
        <hr />
        <button id="innerHtmlPropsTest-childTests-button"
          onclick=${() => ++counter}
        >🐮 increase childTests inside ${counter}</button>
        <span id="innerHtmlPropsTest-childTests-display">${counter}</span>
        ${renderCountDiv({renderCount, name: 'innerHtmlPropsTest child'})}
      `)}

      ${childAsPropTest({child: html`
        hello child as prop test
        <button id="child-as-prop-test-button"
          onclick=${() => ++counter}
        >🐮 child as prop ${counter}</button>
        <span id="child-as-prop-test-display">${counter}</span>
      `})}

      ${/*childContentTest({legend: 'Inner Test', id:'children-inner-test'}, html`
        ${innerHtmlTest(html`
          <b>Field set body C</b>
        `)}
        
        ${innerHtmlPropsTest(33, html`
          <b>Field set body D</b>
        `)}

        <hr />
        
        <button onclick=${() => ++counter}>increase childTests inside ${counter}</button>
        ${renderCountDiv(renderCount)}
      `)*/false}
      
      <hr />
      <button id="childTests-button"
        onclick=${() => ++counter}
      >🐮 increase childTests outside ${counter} - ${renderCount}</button>
      <span id="childTests-display">${counter}</span>
      ${renderCountDiv({renderCount, name:'childTests'})}
    </fieldset>
  `
})

const childContentTest = tag((
  {legend, id}:  {legend: string, id: string},
  children?: Tag[],
) => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  let counter = letState(0)(x => [counter, counter = x])

  ++renderCount
  
  return html`
    <fieldset id=${id} style="flex:2 2 20em">
      <legend>${legend}</legend>
      ${children}
      <hr />
      <button onclick=${() => ++counter}>increase childContentTest ${counter}</button>
      ${renderCountDiv({renderCount, name: 'childContentTest'})}
    </fieldset>
  `
})

function childAsPropTest({child}: {child:Tag}) {
  return html`
    <fieldset>
      <legend>child as prop</legend>
      ${child}
    </fieldset>
  `
}