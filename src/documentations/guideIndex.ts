import { section, ul, li, a } from "taggedjs"
import { docH2 } from "./docHeading"

const tocItems = [
  { id: "project-layout", label: "🗂️ Project Layout" },
  { id: "entry-point", label: "🚪 Entry Point" },
  { id: "component-pattern", label: "🧩 Component Pattern" },
  { id: "tag-component-display", label: "🧠 Tag Component Display", level: "sub" },
  { id: "tag-component-arguments", label: "🧵 Tag Component Arguments", level: "sub" },
  { id: "tag-component-callbacks", label: "🪝 Functions for Output", level: "sub" },
  { id: "tag-component-async-callbacks", label: "⏱️ Async Callback Wrapper", level: "sub" },
  { id: "tag-component-promise", label: "⏳ tag.promise", level: "sub" },
  { id: "element-imports", label: "📦 Element Imports" },
  { id: "attributes", label: "🏷️ attributes``" },
  { id: "reactive-updates", label: "🔁 Reactive Updates" },
  { id: "react-vs-taggedjs", label: "⚖️ React vs TaggedJS", level: "sub" },
  { id: "dynamic-content", label: "✨ Dynamic Contect _=>" },
  { id: "map-loops", label: "🔂 Map Loops" },
  { id: "event-handlers", label: "🖱️ Event Handlers" },
  { id: "on-destroy", label: "🧹 onDestroy Cleanup" },
]

export function guideIndex() {
  return section({class: "toc guide-index", id: "toc"},
    docH2("toc", "Guide Index"),
    ul(
      _=> tocItems.map(item =>
        li(
          {class: item.level === "sub" ? "toc-sub" : ""},
          a({href: `#${item.id}`}, item.label)
        ).key(item.id)
      )
    )
  )
}
