import { htmlTag, section, h2, p, pre, a } from "taggedjs"

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

export function entryPointSection() {
  return section({class: "section-card", id: "entry-point"},
    h2("🚪 Entry Point"),
    p(
      "To start a TaggedJS app, place a custom element in your HTML and mount the ",
      "component with ",
      code("tagElement"),
      ". The mount call connects your component to that element and triggers the ",
      "first render."
    ),
    p(
      "This is the minimal setup: an HTML document, a root element, and a module ",
      "script that defines a ",
      code("tag"),
      " component and mounts it."
    ),
    figure(
      pre(code({class: "language-html"}, entryPointCode)),
      figcaption("Minimal TaggedJS app bootstrap")
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
