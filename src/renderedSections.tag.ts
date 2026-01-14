import { div, state, Subject, tag, a, fieldset, legend, button } from "taggedjs"
import { oneRender } from "./oneRender.tag"
import { storage, ViewTypes } from "./sectionSelector.tag"
import funInPropsTag from "./funInProps.tag"
import { todoApp } from "./todo/todos.app"
import { child } from "./childTests.tag"
import { destroys } from "./destroys.tag"
import { arrays } from "./arrays.tag"
import { tagSwitchDebug } from "./tagSwitchDebug.component"
import { mirroring } from "./mirroring.tag"
import { propsDebugMain } from "./props.tag"
import { providerDebug } from "./providers.tag"
import { counters } from "./countersDebug"
import { tableDebug } from "./tableDebug.component"
import { content } from "./content.tag"
import { watchTesting } from "./watchTesting.tag"
import { attributeDebug } from "./attributeDebug.tag"
import { basic } from "./basic.tag"
import { subscriptions } from "./subscriptions.tag"
import { asyncSection } from "./async.tag"

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
  view: ViewTypes.Async, tag: asyncSection, emoji: '⏳'
},{
  view: ViewTypes.Basic, tag: basic, emoji: '🔢'
},{
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
  view: ViewTypes.FunInPropsTag, tag: funInPropsTag, emoji: '🤡'
},{
  view: ViewTypes.AttributeDebug, tag: attributeDebug, emoji:'🏹',
},{
  view: ViewTypes.Todo, tag: todoApp, emoji: '✏️'
},{
  view: ViewTypes.Counters, tag: counters, emoji:'💯',
},{
  view: ViewTypes.Subscriptions, tag: subscriptions, emoji:'📡',
}]

export const renderedSections = tag((
  appCounterSubject: Subject<number>,
  viewTypes: ViewTypes[] = storage.views,
) => {
  const visibleSections = outputSections.filter(section => {
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
  }).sort((a, b) => {
    // Sort alphabetically by view name
    return a.view.localeCompare(b.view);
  })

  return div({style:"display:flex;flex-wrap:wrap;gap:1em"},
    _=> visibleSections.map((section) => getSection(section).key(section.view))
  )
})

const getSection = (section: OutputSection) => {
  const {emoji, view, title, output, debug} = section
  return div({style: "flex:2 2 20em"},
    a({id: view},''),
    fieldset(
      legend(emoji, ' ', title),
      div({
        id: "many-section-contents",
        'style.display': _=> section.contentHide ? 'none' : ''
      }, output),
      div({style: "display:flex;"},
        button({
          style: "flex:1;",
          id: 'section_' + section.view,
          onClick: () => section.contentHide = !section.contentHide,
          'style.background-color': _=> section.contentHide ? 'grey' : ''
        }, '👁️ hide/show')
      )
    ),
    div({style: "font-size:0.6em;text-align:right;"},
      a({href: "#top"}, '⏫')
    )
  )
}
