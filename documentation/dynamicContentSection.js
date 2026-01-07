import { htmlTag, section, h2, p, pre, a } from "../node_modules/taggedjs/js/index.js"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const dynamicCueCode = `p(_=> \
  count \
)

button({
  onClick: () => count++
}, 'increment')
`

export function dynamicContentSection() {
  return section({class: "section-card", id: "dynamic-content"},
    h2("Dynamic Contect _=>"),
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
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
