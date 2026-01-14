import { tag, tagElement, div, main, a } from "taggedjs"
import { guideHeader } from "./guideHeader"
import { guideIndex } from "./guideIndex"
import { projectLayoutSection } from "./projectLayoutSection"
import { entryPointSection } from "./entryPointSection"
import { componentPatternSection } from "./componentPatternSection"
import { displaySection } from "./displaySection"
import { reactiveUpdatesSection } from "./reactiveUpdatesSection"

const GuideApp = tag(() => [
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
      )
    )
  )
])

export function runDocs() {
  const mount = document.getElementById("docs-app")
  if(!mount) {
    return
  }

  tagElement(GuideApp, mount)
}
