import { html, setLet, tag, isSubjectInstance, isTagArray } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
export const innerHtmlTest = tag((_props, children) => {
    let renderCount = setLet(0)(x => [renderCount, renderCount = x]);
    let counter = setLet(0)(x => [counter, counter = x]);
    ++renderCount;
    console.log('----- innerHtmlTest renderCount -----', { renderCount, counter });
    return html `<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div>${children}</div>
      <div>isSubjectInstance:${isSubjectInstance(children)}</div>
      <div>isSubjectTagArray:${isTagArray(children.value)}</div>
      <button onclick=${() => ++counter}>increase innerHtmlTest ${counter}</button>
      ${renderCountDiv({ renderCount, name: 'innerHtmlTest' })}
    </fieldset>
  `;
});
export const innerHtmlPropsTest = tag((x, children) => {
    let renderCount = setLet(0)(x => [renderCount, renderCount = x]);
    let counter = setLet(0)(x => [counter, counter = x]);
    ++renderCount;
    return html `<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${x}</legend>
      ${children}
      <button onclick=${() => ++counter}>increase innerHtmlPropsTest ${counter}</button>
      ${ /*renderCountDiv(renderCount)*/false}
    </fieldset>
  `;
});
//# sourceMappingURL=innerHtmlTests.js.map