import { section, ul, li, a } from "taggedjs"
import { docH2 } from "./docHeading"

const tocItems = [
  { id: "project-layout", label: "🗂️ Project Layout" },
  { id: "entry-point", label: "🚪 Entry Point" },
  { id: "component-pattern", label: "🧩 Component Pattern" },
  { id: "tag-component-arguments", label: "🧵 Tag Component Arguments", level: "sub" },
  { id: "element-imports", label: "📦 Element Imports" },
  { id: "attributes", label: "🏷️ attributes``" },
  { id: "reactive-updates", label: "🔁 Reactive Updates" },
  { id: "react-vs-taggedjs", label: "⚖️ React vs TaggedJS", level: "sub" },
  { id: "dynamic-content", label: "✨ Dynamic Contect _=>" },
  { id: "map-loops", label: "🔂 Map Loops" },
  { id: "event-handlers", label: "🖱️ Event Handlers" },
  { id: "menu-routing", label: "🧭 Menu And Routing" }
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
