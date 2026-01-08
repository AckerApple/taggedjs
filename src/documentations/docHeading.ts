import { htmlTag, a } from "taggedjs"

const h2 = htmlTag("h2")
const h3 = htmlTag("h3")
const span = htmlTag("span")
const cursorIcon = "🖱️"

function copyHashToClipboard(id: string) {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return
  }

  const url = new URL(window.location.href)
  url.hash = id

  if (!navigator.clipboard?.writeText) {
    return
  }

  void navigator.clipboard.writeText(url.toString())
}

function titleLink(id: string, label: string) {
  return a(
    {
      class: "doc-title-link",
      href: `#${id}`,
      onClick: () => copyHashToClipboard(id)
    },
    label,
    " ",
    span({class: "doc-title-cursor", "aria-hidden": "true"}, cursorIcon)
  )
}

export function docH2(id: string, label: string) {
  return h2({class: "doc-title"}, titleLink(id, label))
}

export function docH3(id: string, label: string) {
  return h3({class: "doc-subtitle", id}, titleLink(id, label))
}
