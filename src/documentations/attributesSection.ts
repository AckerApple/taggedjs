import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const attributesCode = `div
  .id\`identifier\`
  .style\`border:1px solid black;\`
  ("attributes shorthand")

const border = "border:2px solid blue;"

div
  .id\`identifier\`
  .style(_=> border)
  ("dynamic style")
`

export function attributesSection() {
  return section({class: "section-card", id: "attributes"},
    docH2("attributes", "🏷️ attributes``"),
    p(
      "TaggedJS supports a shorthand attribute syntax using tagged template calls. ",
      "You can set attributes with concise chains like ",
      code("div.id`identifier`.style`border:1px solid black;`"),
      " to keep the markup compact."
    ),
    p(
      "For dynamic values, switch to a function call. The ",
      code(".style(_=> border)"),
      " form keeps the same chain, but marks the style as reactive so it updates ",
      "when the value changes."
    ),
    figure(
      pre(code({class: "language-ts"}, attributesCode)),
      figcaption("Shorthand attributes with static and dynamic styles")
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
