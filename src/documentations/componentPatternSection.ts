import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const componentPatternCode = `export const basic = tag(() => {
  let counter = 0
  let renderCount = 0
  let showDiv = true

  renderCount++

  return div(
    h2('Basic Component'),
    
    p(_=> \`Counter: \${counter}\`),
    p(_=> \`Render Count: \${renderCount}\`),
    
    button({
      onClick: () => counter++
    }, 'Increment Counter'),

    button({
      onClick: () => showDiv = !showDiv
    }, _=> \`Toggle Div (\${showDiv ? 'Hide' : 'Show'})\`),

    _=> showDiv && boltTag(counter),
  )
})
`

const componentArgsCode = `const boltTag = tag((parentCounter: number) => {
  boltTag.updates(args => [parentCounter] = args)

  return div(
    div(_=> \`parent counter: \${parentCounter}\`)
  )
})
`

export function componentPatternSection() {
  return section({class: "section-card", id: "component-pattern"},
    docH2("component-pattern", "🧩 Component Pattern"),
    p(
      "Components are created by calling ",
      code("tag"),
      " and returning mock element functions like ",
      code("div"),
      ", ",
      code("button"),
      ", and ",
      code("p"),
      ". A minimal component example already lives in ",
      code("src/basic.tag.ts"),
      "."
    ),
    figure(
      pre(code({class: "language-ts"}, componentPatternCode)),
      figcaption("Source: ", code("src/basic.tag.ts"))
    ),
    docH3("tag-component-arguments", "🧵 Tag Component Arguments"),
    p(
      "Tag components receive arguments like normal functions, but you must opt in ",
      "to argument updates when those values change. Call ",
      code(".updates(...)"),
      " inside the tag to re-assign the latest arguments in the same order they ",
      "were passed."
    ),
    p(
      "This keeps local variables in sync with the parent without re-running the ",
      "entire tag function."
    ),
    figure(
      pre(code({class: "language-ts"}, componentArgsCode)),
      figcaption("Source: ", code("src/basic.tag.ts"))
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
