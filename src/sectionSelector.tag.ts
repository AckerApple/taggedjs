import { html, Subject } from "taggedjs"
import { runTesting } from "./runTesting.function"
import { outputSections } from "./renderedSections.tag"

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
  
  return html`
    <div>
      <h3>᭟ Sections</h3>
      <!-- checkbox menu -->
      <div style="display:flex;gap:1em;flex-wrap:wrap;margin:1em;">
        ${sortedViewTypes.map(({meta, type}) => html`
          <div style="flex:0 0 auto;min-width:150px;white-space:nowrap;">
            <input type="checkbox"
              id=${'view-type-' + type} name=${'view-type-' + type}
              ${storage.views.includes(type) && 'checked'}
              onclick=${() => toggleViewType(type)}
            />
            ${meta?.emoji ? meta.emoji + '&nbsp' : null}
            <label for=${'view-type-' + type}>&nbsp;${type}</label>
            &nbsp;<a href=${`isolated.html#${type}`} style="font-size:.6em;text-decoration:none;">🔗</a>
            &nbsp;<a href=${`#${type}`} style="font-size:.6em;">↗️</a>
          </div>
        `.key(type))}

        ${viewTypes.length > 1 && html`
          <div>
            <label onclick=${() => viewTypes.forEach(viewType => {
              // viewChanged.next({viewType, checkTesting: false})
              activate(viewType, false)
              saveScopedStorage()
            })}>&nbsp;all</label>
          </div>
          <div>
            <label onclick=${() => viewTypes.forEach(viewType => {
              deactivate(viewType)
              saveScopedStorage()
            })}>&nbsp;none</label>
          </div>
        `}
      </div>
    </div>
  `
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
