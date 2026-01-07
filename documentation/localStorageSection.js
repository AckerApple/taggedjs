import { htmlTag, section, h2, p, pre, a } from "../node_modules/taggedjs/js/index.js"

const figure = htmlTag("figure")
const figcaption = htmlTag("figcaption")
const code = htmlTag("code")

const localStorageCode = `function getScopedStorage(): {
  autoTest: boolean, views: ViewTypes[]
} {
  const string = localStorage.taggedjs || JSON.stringify({autoTest: true, views: Object.values(ViewTypes)})
  return JSON.parse(string)
}

export function saveScopedStorage() {
  localStorage.taggedjs = JSON.stringify(storage)
}
`

export function localStorageSection() {
  return section({class: "section-card", id: "local-storage"},
    h2("Local Storage"),
    p(
      "The app uses local storage to persist view selections. The code below shows ",
      "how the stored values are parsed and saved."
    ),
    figure(
      pre(code({class: "language-ts"}, localStorageCode)),
      figcaption("Source: ", code("src/sectionSelector.tag.ts"))
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
