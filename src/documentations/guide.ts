import { tag, tagElement, div, main, a } from "taggedjs"
import { guideHeader } from "./guideHeader"
import { guideIndex } from "./guideIndex"
import { projectLayoutSection } from "./projectLayoutSection"
import { entryPointSection } from "./entryPointSection"
import { componentPatternSection } from "./componentPatternSection"
import { displaySection } from "./displaySection"
import { elementImportsSection } from "./elementImportsSection"
import { attributesSection } from "./attributesSection"
import { reactiveUpdatesSection } from "./reactiveUpdatesSection"
import { dynamicContentSection } from "./dynamicContentSection"
import { mapLoopsSection } from "./mapLoopsSection"
import { eventHandlersSection } from "./eventHandlersSection"

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
        elementImportsSection(),
        attributesSection(),
        dynamicContentSection(),
        mapLoopsSection(),
        eventHandlersSection(),
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
