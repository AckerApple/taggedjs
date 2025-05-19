import { html, state, Subject, tag } from "taggedjs"
import { oneRender } from "./oneRender.tag"
import { storage, ViewTypes } from "./sectionSelector.tag"
import funInPropsTag from "./funInProps.tag"
import { todoApp } from "./todo/todos.app"
import { child } from "./childTests"
import { destroys } from "./destroys.tag"
import { arrays } from "./arrayTests"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { mirroring } from "./mirroring.tag"
import { propsDebugMain } from "./PropsDebug.tag"
import { providerDebug } from "./providerDebug"
import { counters } from "./countersDebug"
import { tableDebug } from "./tableDebug.component"
import { content } from "./ContentDebug.tag"
import { watchTesting } from "./watchTesting.tag"
import { attributeDebug } from "./attributeDebug.tag"

type OutputSection = {
  view: ViewTypes
  title?: string
  output?: any
  emoji?: string
  
  debug?: boolean
  testFile?: string
  contentHide?: boolean
}

export const outputSections: (OutputSection & {tag: any})[] = [{
  view: ViewTypes.OneRender, tag: oneRender, emoji: '1️⃣'
},{
  view: ViewTypes.Props, tag: propsDebugMain, emoji:'🧳',
},{
  view: ViewTypes.WatchTesting, tag: watchTesting, emoji:'⌚️',
},{
  view: ViewTypes.TableDebug, tag: tableDebug,
},{
  view: ViewTypes.ProviderDebug, tag: providerDebug,
},{
  view: ViewTypes.TagSwitchDebug, tag: tagSwitchDebug, emoji:'🔀',
},{
  view: ViewTypes.Mirroring, tag: mirroring, emoji:'🪞',
},{
  view: ViewTypes.Arrays, tag: arrays, emoji:'⠇',
},{
  view: ViewTypes.Content, tag: content, emoji:'📰',
  debug: true,
},{
  view: ViewTypes.Child, tag: child, emoji:'👶',
},{
  view: ViewTypes.Destroys, tag: destroys, emoji:'🗑️',
},{
  view: ViewTypes.FunInPropsTag, tag: funInPropsTag,
},{
  view: ViewTypes.AttributeDebug, tag: attributeDebug, emoji:'🏹',
},{
  view: ViewTypes.Todo, tag: tag(todoApp),
},{
  view: ViewTypes.Counters, tag: counters, emoji:'💯',
}]

export const renderedSections = tag((
  appCounterSubject: Subject<number>,
  viewTypes: ViewTypes[] = storage.views,
) => {
  const visibleSections = state(() => outputSections.filter(section => {
    if(viewTypes.includes(section.view)) {
      return true
    }

  }).map(({view, title, emoji, tag, ...extra}) => {
    return {
      title: title || view,
      output: view === ViewTypes.Counters ? tag({ appCounterSubject }) : tag(),
      view,
      emoji,
      ...extra,
    }
  }))

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${visibleSections.map((section) => getSection(section).key(section.view))}
    </div>
  `
})

const getSection = (section: OutputSection) => {
  const {emoji, view, title, output, debug} = section
  return html`
    <div style="flex:2 2 20em">
      <a id=${view}><!-- ⚓️ --></a>
      <fieldset>
        <legend>${emoji} ${title}</legend>
        <div style.display=${section.contentHide ? 'none' : ''}>
          ${output}
        </div>
        <div style="display:flex;">
          <button style="flex:1;"
            id=${'section_' + section.view}
            onclick=${() => section.contentHide = !section.contentHide}
            style.background-color=${section.contentHide ? 'grey' : ''}
          >👁️ hide/show - ${section.contentHide? 'true' : 'false'}</button>
        </div>
      </fieldset>
      <div style="font-size:0.6em;text-align:right;">
        <a href="#top">⏫</a>
      </div>
    </div>
  `
}