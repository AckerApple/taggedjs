import { section, h2, p, ul, li, a } from "../node_modules/taggedjs/js/index.js"

const tocItems = [
  { id: "project-layout", label: "Project Layout" },
  { id: "entry-point", label: "Entry Point" },
  { id: "component-pattern", label: "Component Pattern" },
  { id: "element-imports", label: "Element Imports" },
  { id: "attributes", label: "attributes``" },
  { id: "reactive-updates", label: "Reactive Updates" },
  { id: "dynamic-content", label: "Dynamic Contect _=>" },
  { id: "event-handlers", label: "Event Handlers" },
  { id: "menu-routing", label: "Menu And Routing" }
]

export function guideIndex() {
  return section({class: "toc guide-index", id: "toc"},
    h2("Guide Index"),
    ul(
      _=> tocItems.map(item =>
        li(
          a({href: `#${item.id}`}, item.label)
        ).key(item.id)
      )
    )
  )
}
