import { htmlTag, section, p, pre, a, ul, li } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const entryPointCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>TaggedJS App</title>
  </head>
  <body>
    <app id="app-root"></app>

    <script type="module">
      import { tag, tagElement, div, h1 } from "taggedjs"

      const App = tag(() =>
        div(
          h1("Hello TaggedJS")
        )
      )

      tagElement(App, document.getElementById("app-root"))
    </script>
  </body>
</html>
`

const badRemountCode = `const render = () => {
  root.replaceChildren()
  tagElement(App, root)
}

input.onInput(event => {
  state.name = event.target.value
  render()
})
`

const goodSubscribeCode = `const state$ = array([{ name: "" }])

const App = tag(() =>
  subscribe(state$, ([state]) =>
    input
      .value(_ => state.name)
      .onInput(event => {
        state$[0] = { ...state, name: event.target.value }
      })()
  )
)

tagElement(App, root)
`

export function entryPointSection() {
  return section.class`section-card`.id`entry-point`(docH2("entry-point", "🚪 Entry Point"), p(
      "To start a TaggedJS app, place a custom element in your HTML and mount the ",
      "component with ",
      code("tagElement"),
      ". The mount call connects your component to that element and triggers the ",
      "first render."
    ), p(
      "This is the minimal setup: an HTML document, a root element, and a module ",
      "script that defines a ",
      code("tag"),
      " component and mounts it."
    ), figure(
      pre(code.class`language-html`(entryPointCode)),
      figcaption("Minimal TaggedJS app bootstrap")
    ), docH3("mount-once-tag-element-updates", "Mount once; do not call tagElement for updates"), p(
      code("tagElement(App, root)"),
      " is a bootstrap/mount operation for a root element. One root element should get one ",
      code("tagElement"),
      " call."
    ), p(
      "Do not call ",
      code("tagElement"),
      " repeatedly on the same DOM element from event handlers, input handlers, async callbacks, or custom ",
      code("render()"),
      " functions. Do not use ",
      code("root.replaceChildren(); tagElement(App, root)"),
      " as an update strategy."
    ), p(
      "Repeated calls destroy and recreate the mounted tree, lose component lifecycle/state, cause unnecessary redraws, and trigger the runtime warning: ",
      code("\"tagElement called multiple times for the same element\""),
      "."
    ), p(
      "For UI updates, use tag-local variables with dynamic ",
      code("_=>"),
      " blocks, output/callback patterns, signals/array state, ",
      code("subscribe(...)"),
      ", ",
      code("tag.promise"),
      ", or ",
      code("callback(...)"),
      " for async/event updates."
    ), p(
      "If static SSR markup must be replaced on startup, that is a one-time bootstrap exception, not an application update pattern."
    ), figure(
      pre(code.class`language-ts`(badRemountCode)),
      figcaption("Bad: manually remounting the root as an update strategy")
    ), figure(
      pre(code.class`language-ts`(goodSubscribeCode)),
      figcaption("Good: update array state and let subscribe refresh the UI")
    ), ul(
      li("One root element gets one ", code("tagElement"), " call."),
      li("Updates happen inside TaggedJS, not by remounting the root."),
      li(
        "If you see the multiple ",
        code("tagElement"),
        " warning, look for manual render functions or event handlers calling ",
        code("tagElement"),
        "."
      )
    ), p(a.class`inline-link`.href`#top`("Back to top")))
}
