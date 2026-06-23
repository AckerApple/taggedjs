import { htmlTag, section, p, pre, a, ul, li } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const brokenDetailsCode = `import { tag, subscribe, section, div, h2, pre } from "taggedjs"

const Dashboard = tag(() =>
  section(
    subscribe.all([hardware$, rotation$], ([hardware, rotation]) => {
      const payload = { hardware, rotation }
      const card = visibleCard(payload, rotation.currentCardId)
      const parsed = parsedDataForCard(card)

      return div(
        h2(card.title),
        DetailsPanel(card, parsed)
      )
    })
  )
)

const DetailsPanel = tag((card: Card, parsed: unknown) =>
  pre(JSON.stringify(parsed, null, 2))
)
`

const fixedDetailsCode = `import { tag, subscribe, section, div, h2, pre } from "taggedjs"

const Dashboard = tag(() =>
  section(
    subscribe.all([hardware$, rotation$], ([hardware, rotation]) => {
      const payload = { hardware, rotation }
      const card = visibleCard(payload, rotation.currentCardId)

      return div(
        h2(() => card.title),
        _ => DetailsPanel(card)
      )
    })
  )
)

const DetailsPanel = tag((card: Card) => {
  let parsed = parsedDataForCard(card)

  DetailsPanel.inputs(([nextCard]) => {
    card = nextCard
    parsed = parsedDataForCard(card)
  })

  return pre(() => JSON.stringify(parsed, null, 2))
})
`

const functionChildrenCode = `const StatusBadge = tag((status: Status) => {
  StatusBadge.inputs(([nextStatus]) => status = nextStatus)

  return span
    .class(() => \`status status-\${status.kind}\`)
    (() => status.label)
})
`

const mappedKeysCode = `const CardList = tag((cards: Card[]) => {
  CardList.inputs(([nextCards]) => cards = nextCards)

  return ul(
    () => cards.map(card =>
      CardRow(card).key(card.id)
    )
  )
})

// Avoid keys that are recreated each render:
// CardRow(card).key({ id: card.id })
// CardRow(card).key([card.id])
`

export function dynamicChildContentSection() {
  return section.class`section-card`.id`dynamic-child-content`(docH2("dynamic-child-content", "Dynamic Child Content and Updating Props"), p(
      "If you are coming from React, Vue, or Svelte, the main trap is assuming ",
      "that a child tag's function re-runs whenever the parent has new values. ",
      "A TaggedJS tag sets up a stable component instance. After that, dynamic ",
      "function children, subscriptions, and input handlers are the places where ",
      "changing values are read again."
    ), p(
      "Static strings, static arrays, and objects computed during a tag render ",
      "are snapshots. If the parent later changes state, those snapshots do not ",
      "magically recompute inside an already-mounted child."
    ), docH3("dynamic-child-rules", "Rules of Thumb"), ul(
      li(
        code("subscribe(observable)"),
        " creates reactive output for one observable."
      ),
      li(
        code("subscribe.all([a$, b$], callback)"),
        " combines multiple observable values in one render callback and avoids ",
        "nested subscription confusion."
      ),
      li(
        "Function children like ",
        code("() => value"),
        " or ",
        code("(_: unknown) => value"),
        " are not just event callbacks. In output and attributes, they mark ",
        "values that must be re-evaluated on updates."
      ),
      li(
        code(".inputs(...)"),
        " is the TaggedJS equivalent of handling updated component props or ",
        "arguments. Use it when local derived variables depend on changing inputs."
      ),
      li(
        "Arrays returned from ",
        code(".map(...)"),
        " should use ",
        code(".key(stableValue)"),
        " when items can be added, removed, or reordered."
      )
    ), docH3("dynamic-child-broken", "Broken: Derived Child Data Freezes"), p(
      "This version combines two stores correctly with ",
      code("subscribe.all"),
      ", but then passes a precomputed ",
      code("parsed"),
      " object into a child that renders a static string. The child view is set ",
      "up once, so later card changes can leave the details panel showing old ",
      "JSON."
    ), figure(
      pre(code.class`language-ts`(brokenDetailsCode)),
      figcaption("The child receives snapshots and renders a static pre block")
    ), docH3("dynamic-child-fixed", "Fixed: Update Inputs and Render Dynamic Values"), p(
      "Keep the parent subscription focused on combining stores and selecting ",
      "the current card. Put child-specific derived data inside the child, then ",
      "refresh it from ",
      code(".inputs(...)"),
      " when the parent passes a new card."
    ), p(
      "The ",
      code("pre(() => JSON.stringify(parsed, null, 2))"),
      " child is dynamic. TaggedJS can call it again after ",
      code("parsed"),
      " is reassigned in the input handler."
    ), figure(
      pre(code.class`language-ts`(fixedDetailsCode)),
      figcaption("The child owns derived local data and re-reads it dynamically")
    ), docH3("dynamic-child-function-children", "Function Children Are Dynamic Rendering"), p(
      "Use function children anywhere a value must be read again: text nodes, ",
      "conditional children, mapped children, and attributes. Event handlers also ",
      "use functions, but the meaning is different: ",
      code("onClick(() => save())"),
      " handles an event, while ",
      code("span(() => label)"),
      " renders a dynamic value."
    ), figure(
      pre(code.class`language-ts`(functionChildrenCode)),
      figcaption("Dynamic text and dynamic attributes")
    ), docH3("dynamic-child-map-keys", "Stable Keys for Mapped Tags"), p(
      "When rendering a mapped array of tags, give each rendered item a stable ",
      "primitive key from the data, such as an id, slug, or persistent name. Do ",
      "not use fresh inline objects or arrays as keys because their identity ",
      "changes every render and prevents stable matching."
    ), figure(
      pre(code.class`language-ts`(mappedKeysCode)),
      figcaption("Use stable keys from item data")
    ), p(a.class`inline-link`.href`#top`("Back to top")))
}
