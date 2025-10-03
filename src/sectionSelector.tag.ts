import { Subject, div, h3, input, label, a, fieldset, span, legend } from "taggedjs"
import { runTesting } from "./runTesting.function"
import { outputSections } from "./renderedSections.tag"

class b {}

export enum ViewTypes {
  Basic = 'basic',
  Destroys = 'destroys',
  Todo = 'todo',
  FunInPropsTag = 'funInPropsTag',
  OneRender = 'oneRender',
  WatchTesting = 'watchTesting',
  Mirroring = 'mirroring',
  Content = 'content',
  Arrays = 'arrays',
  Counters = 'counters',
  TableDebug = 'tableDebug',
  Props = 'props',
  Child = 'child',
  TagSwitchDebug = 'tagSwitchDebug',
  ProviderDebug = 'providerDebug',
  AttributeDebug = 'attributeDebug',
  Subscriptions = 'subscriptions',
}

export const storage = getScopedStorage()

function getScopedStorage(): {
  autoTest: boolean, views: ViewTypes[]
} {
  const string = localStorage.taggedjs || JSON.stringify({autoTest: true, views: Object.values(ViewTypes)})
  return JSON.parse(string)
}

export function saveScopedStorage() {
  localStorage.taggedjs = JSON.stringify(storage)
}

const defaultViewTypes = Object.values(ViewTypes)

export const sectionSelector = (viewTypes = defaultViewTypes) => {
  // Sort viewTypes alphabetically
  const sortedViewTypes = [...viewTypes]
    .sort((a, b) => a.localeCompare(b))
    .map(type => ({
      type,
      meta: outputSections.find(s => s.view === type),
    }))

  return div(
    h3('᭟ Sections'),

    div({style:"display:flex;gap:1em;flex-wrap:wrap;margin:1em;"},
      _ => sortedViewTypes.map(({meta, type}) =>
        div({style:"flex:0 0 auto;min-width:150px;white-space:nowrap;"},
          input({
            name: _ => 'view-type-' + type,
            type: "checkbox",
            id: _ => 'view-type-' + type,
            checked: _ => storage.views.includes(type),
            onClick: () => toggleViewType(type),
          }),

          _ => meta?.emoji ? meta.emoji + ' ' : null,

          label({for: _ => 'view-type-' + type}, ' ', _ => type),

          ' ',

          a({
            href: _ => `isolated.html#${type}`,
            style: "font-size:.6em;text-decoration:none;",
          },'🔗'),

          ' ',

          a({
            href: _ => `#${type}`,
            style: "font-size:.6em;",
          },'↗️')
        ).key(type)
      ),

      _ => viewTypes.length > 1 && [
        div(
          label({
            onClick: () => viewTypes.forEach(viewType => {
              // viewChanged.next({viewType, checkTesting: false})
              activate(viewType, false)
              saveScopedStorage()
            })
          }, ' all')
        ),

        div(
          label({
            onClick: () => viewTypes.forEach(viewType => {
              deactivate(viewType)
              saveScopedStorage()
            })
          }, ' none')
        )
      ]
    )
  )
}

sectionSelector.tempNote = 'sections'

function toggleViewType(
  type: ViewTypes,
  checkTesting = true,
) {
  if(storage.views.includes(type)) {
    deactivate(type)
  } else {
    viewChanged.next({type, checkTesting})
  }

  saveScopedStorage()
}

export const viewChanged = new Subject<{type: ViewTypes, checkTesting: boolean}>()

function deactivate(
  type: ViewTypes,
) {
  (storage.views = storage.views.filter(x => x !== type))      
}

export function activate(
  type: ViewTypes,
  checkTesting = true,
) {
  storage.views.push(type)

  if(checkTesting && storage.autoTest) {
    runTesting()
  }
}
