import { htmlTag, p, pre, a } from "taggedjs"
import { docH3 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

const eventHandlersCode = `export const clicker = tag(() => {
  let counter = 0

  return button.onClick(() => counter++)(_=> \`Increment Counter: \${counter}\`)
})
`

export function eventHandlersSection() {
  return [
    docH3("event-handlers", "🖱️ Event Handlers"),
    p(
      "Event handlers use method chaining like ",
      code("button.onClick(...)"),
      ". The code in ",
      code("src/basic.tag.ts"),
      " shows the standard pattern."
    ),
    figure(
      pre(code({class: "language-ts"}, eventHandlersCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/basic.tag.ts`, target: "_blank"}, code("src/basic.tag.ts"))
      )
    ),
  ]
}
