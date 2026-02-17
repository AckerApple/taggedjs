import { htmlTag, p, pre, span } from "taggedjs"
import { docH3 } from "./docHeading"

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

const mapLoopsUserIdCode = `const users = [
  { id: 101, name: 'Ada' },
  { id: 102, name: 'Grace' },
  { id: 103, name: 'Linus' }
]

_=> users.map(user =>
  div(
    span('name: ', _=> user.name)
  ).key(user.id)
)
`

export function mapLoopsSection() {
  return [
    docH3("map-loops", "🔂 Map Loops"),
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
    figure(
      pre(code({class: "language-ts"}, mapLoopsUserIdCode)),
      figcaption("Use a stable id as the loop key")
    ),
  ]
}
