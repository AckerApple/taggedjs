import { br, strong, p, pre, code, figcaption, figure } from "taggedjs"
import { docH3 } from "./docHeading"

const mapLoopsCode = `import { div, tag } from "taggedjs"

const arrayTag = tag(() => {
  const items = ['a', 'b', 'c']
  
  return div(
    items.map((item, index) =>
      div(\`hello world item \${index}\`).key(item)
    )
  )
})
`

const mapLoopsUserIdCode = `const users = [
  { id: 101, name: 'Ada' },
  { id: 102, name: 'Grace' },
  { id: 103, name: 'Linus' }
]

_=> users.map(user =>
  div.id(_=> \`user-\${user.id}\`)(
    span('name: ', _=> user.name)
  )
)
`

export function mapLoopsSection() {
  return [
    docH3("map-loops", "🔂 Arrays - Map Looping"),
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
      " when the list can be reordered or removed so TaggedJS can keep elements stable. ",
      "Alternatively, if the first rendered element has an id like ",
      code("div.id`x-${x.id}`"),
      ", that id can act as the array value identifier."
    ),
    figure(
      figcaption(strong("Map each item and key the result")),
      pre(code.class`language-ts`(mapLoopsCode)),
    ),

    br,
    
    figure(
      figcaption(strong("Use a stable id as the loop key")),
      pre(code.class`language-ts`(mapLoopsUserIdCode)),
    ),
  ]
}
