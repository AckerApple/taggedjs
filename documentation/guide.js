import { tag, tagElement, div, main, a } from "../node_modules/taggedjs/js/index.js"
import { guideHeader } from "./guideHeader.js"
import { guideIndex } from "./guideIndex.js"
import { projectLayoutSection } from "./projectLayoutSection.js"
import { entryPointSection } from "./entryPointSection.js"
import { componentPatternSection } from "./componentPatternSection.js"
import { elementImportsSection } from "./elementImportsSection.js"
import { attributesSection } from "./attributesSection.js"
import { reactiveUpdatesSection } from "./reactiveUpdatesSection.js"
import { dynamicContentSection } from "./dynamicContentSection.js"
import { eventHandlersSection } from "./eventHandlersSection.js"
import { menuRoutingSection } from "./menuRoutingSection.js"

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
        elementImportsSection(),
        attributesSection(),
        reactiveUpdatesSection(),
        dynamicContentSection(),
        eventHandlersSection(),
        menuRoutingSection()
      )
    )
  )
])

tagElement(GuideApp, document.getElementById("docs-app"))
