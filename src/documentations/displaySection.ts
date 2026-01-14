import { htmlTag, section, p, a } from "taggedjs"
import { docH2 } from "./docHeading"

const code = htmlTag("code")

export function displaySection() {
  return section({class: "section-card", id: "display"},
    docH2("display", "🖼️ Display"),
    p(
      "These sections cover the rendering building blocks: importing elements, ",
      "applying ",
      code("attributes``"),
      ", mapping lists, and wiring event handlers."
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
