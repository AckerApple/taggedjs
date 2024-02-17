import { html, tag } from "taggedjs";
export const innerHtmlTest = tag((children) => {
    return html `<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>innerHTML test</legend>
      ${children}
    </fieldset>
  `;
});
export const innerHtmlPropsTest = tag(function innerHtmlPropsTest(
/** @type {number} */
x, 
/** @type {Tag[]} */
children) {
    return html `<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${x}</legend>
      ${children}
    </fieldset>
  `;
});
//# sourceMappingURL=innerHtmlTests.js.map