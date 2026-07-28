import { br, strong, p, pre, code, figcaption, figure, ul, li } from "taggedjs"
import { docH3 } from "./docHeading"

const mapLoopsCode = `type User = {
  id: number
  name: string
}

const UserList = tag((users: User[]) =>
  ul(
    () => users.map(user =>
      UserRow(user).key(user.id)
    )
  )
)
`

const unshiftCode = `const TodoList = tag(() => {
  const todos = [
    { id: 1, title: 'Keep this row mounted' }
  ]
  let nextId = 2

  return section(
    button.onClick(() => {
      todos.unshift({
        id: nextId++,
        title: 'New first row'
      })
    })('Add first'),

    ul(() => todos.map(todo =>
      TodoRow(todo).key(todo.id)
    ))
  )
})

// The row keyed 1 keeps the same DOM node and TodoRow instance.
// The new row is inserted before it.
`

const nullablePositionCode = `return section(() => [
  HeaderRow().key('header'),
  showDraft ? DraftRow().key('draft') : null,
  FooterRow().key('footer')
])

// null and undefined both represent valid empty positions.
// The keyed footer is retained when the draft appears or disappears.
`

const unsafeIndexCode = `// Unsafe when users can move, be inserted, or be removed:
users.map((user, index) =>
  UserRow(user).key(index)
)

// Safe: identity follows the user, not the current position:
users.map(user =>
  UserRow(user).key(user.id)
)
`

export function mapLoopsSection() {
  return [
    docH3("map-loops", "🔂 Arrays - Map Looping"),
    p(
      "TaggedJS uses normal JavaScript array mapping for list rendering. Put the ",
      code("array.map"),
      " inside a dynamic ",
      code("() =>"),
      " or ",
      code("_ =>"),
      " child so the list is evaluated when its reactive data changes."
    ),
    figure(
      figcaption(strong("Key each mapped child with stable data")),
      pre(code.class`language-ts`(mapLoopsCode)),
    ),

    docH3("array-identity", "Array Identity"),
    p(
      "Every rendered array position needs an identity. Without an explicit key, ",
      "TaggedJS uses the item's current array position. ",
      code("null"),
      " and ",
      code("undefined"),
      " are valid empty positions; they do not invalidate the array or the keyed ",
      "items around them."
    ),
    p(
      "Use ",
      code(".key(stableValue)"),
      " when an item may move because another item is inserted, removed, ",
      "unshifted, or reordered. The key belongs to the rendered child, so derive ",
      "it from persistent item data such as an id or slug. Keys can be falsy: ",
      code("0"),
      " and ",
      code('""'),
      " are valid keys."
    ),
    p(
      "An element ID currently also acts as its array key, but ",
      code(".key(...)"),
      " is the clearest explicit API for list identity. Do not create an object ",
      "or array inline for a key, such as ",
      code(".key({ id: user.id })"),
      " or ",
      code(".key([user.id])"),
      ": JavaScript compares those by reference, and a new reference on every ",
      "render cannot match the previous child."
    ),

    docH3("keyed-dom-preservation", "What a Retained Key Preserves"),
    p(
      "When the same key remains in the next array, TaggedJS retains that child's ",
      "existing DOM node and component instance instead of destroying and ",
      "recreating them. Newly inserted or unshifted children are placed relative ",
      "to those retained keyed children."
    ),
    p("That preservation matters for:"),
    ul(
      li("component-local state;"),
      li("focus, text selection, and native input state;"),
      li("in-progress animations;"),
      li("subscriptions and lifecycle hooks;"),
      li(
        "imperative third-party DOM integrations, such as a Stripe Element mounted ",
        "inside the retained child."
      ),
    ),
    figure(
      figcaption(strong("Unshift without remounting existing rows")),
      pre(code.class`language-ts`(unshiftCode)),
    ),

    docH3("nullable-array-positions", "Nullable and Empty Positions"),
    figure(
      figcaption(strong("A conditional empty position between keyed children")),
      pre(code.class`language-ts`(nullablePositionCode)),
    ),

    docH3("array-index-keys", "Why an Array Index Is Unsafe"),
    p(
      "An index describes where an item is now, not which item it is. After an ",
      "unshift or reorder, the same index refers to different data, so local state, ",
      "focus, or an imperative DOM widget can become associated with the wrong ",
      "row. An index is only suitable when positions themselves are the identity ",
      "and items will never move."
    ),
    figure(
      figcaption(strong("Key movable data by its stable identity")),
      pre(code.class`language-ts`(unsafeIndexCode)),
    ),

    br,
  ]
}
