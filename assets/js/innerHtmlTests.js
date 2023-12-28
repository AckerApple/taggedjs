import { html, tag, Tag } from "./taggedjs/index.js"

/**
 * @param {Tag} children 
 */
export const innerHtmlTest = tag(function InnerHtmlTest(
  _props, children
) {
  return html`
    <fieldset>
      <legend>innerHTML test</legend>
      ${children}
    </fieldset>
  `
})

/**
 * @param {number} x
 * @param {Tag} children 
 */
export const innerHtmlPropsTest = tag(function innerHtmlPropsTest(
  x, children
) {
  return html`
    <fieldset>
      <legend>innerHTML Props: ${x}</legend>
      ${children}
    </fieldset>
  `
})
