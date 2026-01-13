import { htmlTag, section, p, pre, a } from "taggedjs"
import { docH2 } from "./docHeading"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")
const repoBaseUrl = "https://github.com/AckerApple/taggedjs/blob/gh-pages"

const onDestroyCode = `import { tag, div, button, onDestroy, host, signal } from "taggedjs"

const contentTag = tag(() => {
  onDestroy(() => {
    // closing logic here
  })

  return div("this tag will be destroyed")
})

const destroys = tag(() => (showContent: boolean) =>
div(
  "Content:", _=> showContent && contentTag(),
  button
    .onClick(() => { showContent = !showContent } )
    (_=> showContent ? "destroy" : "restore")
))
`

export function onDestroySection() {
  return section({class: "section-card", id: "on-destroy"},
    docH2("on-destroy", "🧹 onDestroy Cleanup"),
    p(
      "Use ",
      code("onDestroy"),
      " to run cleanup logic when a tag component is removed. For host elements, ",
      code("host.onDestroy"),
      " lets you attach cleanup at the element level."
    ),
    figure(
      pre(code({class: "language-ts"}, onDestroyCode)),
      figcaption(
        "Source: ",
        a({href: `${repoBaseUrl}/src/destroys.tag.ts`, target: "_blank"}, code("src/destroys.tag.ts"))
      )
    ),
    p(
      "Common uses include removing event listeners, stopping intervals, or ",
      "disposing subscriptions tied to the component lifecycle."
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
