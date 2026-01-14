import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const mapLoopsCode = `const items = ['a', 'b', 'c']

_=> items.map((item, index) =>
  div(
    'item:', _=> item,
    ' index:', _=> index,
    button.onClick(() => items.splice(index, 1))('remove')
  ).key(item)
)
`

export function mapLoopsSection() {
  return section({class: "section-card", id: "map-loops"},
    docH2("map-loops", "🔂 Map Loops"),
    p(
      "TaggedJS uses normal JavaScript array mapping for list rendering. ",
      "Put the ",
      code("array.map"),
      " inside a ",
      code("_=>"),
      " block so the list is reactive."
    ),
    p(
      "Return a tag for each item and add ",
      code(".key(...)"),
      " when the list can be reordered or removed so TaggedJS can keep elements stable."
    ),
    figure(
      pre(code({class: "language-ts"}, mapLoopsCode)),
      figcaption("Map each item and key the result")
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
