import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const importsCode = `import { div, span, button } from "taggedjs"

export const example = tag(() =>
  div(
    span("Hello"),
    button({onClick: () => alert("Hi")}, "Click")
  )
)
`

export function elementImportsSection() {
  return section({class: "section-card", id: "element-imports"},
    docH2("element-imports", "📦 Element Imports"),
    p(
      "TaggedJS exposes HTML elements as functions you can import directly. ",
      "This keeps your render output explicit, avoids string-based templates, ",
      "and makes composition feel like regular JavaScript."
    ),
    p(
      "Benefits include clear dependency lists, easy refactors, and better editor ",
      "autocomplete because each element is a real import instead of a string tag."
    ),
    figure(
      pre(code({class: "language-ts"}, importsCode)),
      figcaption("Import only the elements you use")
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
