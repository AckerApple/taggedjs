import { htmlTag, section, h2, p, pre, a } from "taggedjs"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const eventHandlersCode = `button({
  onClick: () => counter++
}, 'Increment Counter')
`

export function eventHandlersSection() {
  return section({class: "section-card", id: "event-handlers"},
    h2("Event Handlers"),
    p(
      "Event handlers use camelCase attributes like ",
      code("onClick"),
      ". The code in ",
      code("src/basic.tag.ts"),
      " shows the standard pattern."
    ),
    figure(
      pre(code({class: "language-ts"}, eventHandlersCode)),
      figcaption("Source: ", code("src/basic.tag.ts"))
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
