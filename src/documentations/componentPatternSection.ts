import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2, docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

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

const componentCallCode = `return div(
  _=> boltTag(counter)
)`

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
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/basic.tag.ts`, target: "_blank"}, code("src/basic.tag.ts"))
      )
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
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/basic.tag.ts`, target: "_blank"}, code("src/basic.tag.ts"))
      )
    ),
    docH3("tag-component-outputs", "🧠 Tag Component Outputs"),
    p(
      "When you pass arguments to a tag component, render it inside a ",
      code("_=>"),
      " block so TaggedJS treats argument changes as updates."
    ),
    p(
      "This keeps the tag mounted and lets ",
      code(".updates(...)"),
      " receive new arguments without recreating the component."
    ),
    figure(
      pre(code({class: "language-ts"}, componentCallCode)),
      figcaption("Render tag components inside a dynamic output")
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
