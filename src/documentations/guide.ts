import { tag, tagElement, div, main, a } from "taggedjs"
import { guideHeader } from "./guideHeader"
import { guideIndex } from "./guideIndex"
import { projectLayoutSection } from "./projectLayoutSection"
import { entryPointSection } from "./entryPointSection"
import { componentPatternSection } from "./componentPatternSection"
import { displaySection } from "./displaySection"
import { reactiveUpdatesSection } from "./reactiveUpdatesSection"
import { subscriptionsSection } from "./subscriptionsSection"

export const GuideApp = tag(() => [
  guideHeader(),

  main(
    a({id: "top"}),
    div({class: "guide-layout"},
      guideIndex(),
      div({class: "guide-content"},
        projectLayoutSection(),
        entryPointSection(),
        componentPatternSection(),
        displaySection(),
        reactiveUpdatesSection(),
        subscriptionsSection(),
      )
    )
  )
])

export function runDocs() {
  const mount = document.getElementById("docs-app")
  if(!mount) {
    return
  }

  mount.innerHTML = ""
  tagElement(GuideApp, mount)
}
