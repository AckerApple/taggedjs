import { tag, html, onInit } from "taggedjs"
import { saveScopedStorage, storage, ViewTypes } from "./sections.tag"
import { runTesting } from "./runTesting.function"

export const autoTestingControls = (
  tests?: ViewTypes[],
  runStartEndTests?: boolean,
) => tag.state = (
  _ = onInit(() => {
    if(storage.autoTest) {
      runTesting(false, tests, runStartEndTests)
    }
  })
) => html`
    auto testing <input type="checkbox" ${storage.autoTest && 'checked'} onchange=${toggleAutoTesting} />
    <button type="button" onclick=${() => runTesting(true, tests, runStartEndTests)}>run tests</button>
`

function toggleAutoTesting() {
  storage.autoTest = storage.autoTest = !storage.autoTest
  saveScopedStorage()
}
