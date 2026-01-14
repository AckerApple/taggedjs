import { htmlTag, p, pre } from "taggedjs"
import { docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const dynamicCueCode = `const counter = tag(() => [
  p(_=> \ count ),
  button.onClick(() => count++), 'increment')
])
`

export function dynamicContentSection() {
  return [
    docH3("dynamic-content", "✨ Dynamic Content _=>"),
    p(
      "The ",
      code("_=>"),
      " prefix is a visual cue that the content is dynamic and will re-evaluate ",
      "when values change. It is meant to stand out from ",
      code("() =>"),
      ", which you will usually see in event handlers like ",
      code("onClick"),
      "."
    ),
    figure(
      pre(code({class: "language-ts"}, dynamicCueCode)),
      figcaption("Dynamic content cue vs event handler")
    ),
  ]
}
