import { htmlTag, section, h2, p, a } from "taggedjs"

const code = htmlTag("code")

export function projectLayoutSection() {
  return section({class: "section-card", id: "project-layout"},
    h2("🗂️ Project Layout"),
    p(
      "The gh-pages branch is a full app. Source code lives in ",
      code("src/"),
      ", the runtime entry is in ",
      code("src/index.ts"),
      ", and the main view assembly lives in ",
      code("src/app.tag.ts"),
      " plus the menu in ",
      code("src/menu.tag.ts"),
      "."
    ),
    p(
      "Use the ",
      code("documentation/"),
      " folder for doc pages, styles, and future guides. Keep documentation separate ",
      "from app runtime code so it remains focused and easy to host."
    ),
    p(a({class: "inline-link", href: "#top"}, "Back to top"))
  )
}
