import { htmlTag, section, h2, p, pre, a } from "taggedjs"

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

export function componentPatternSection() {
  return section({class: "section-card", id: "component-pattern"},
    h2("Component Pattern"),
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
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
