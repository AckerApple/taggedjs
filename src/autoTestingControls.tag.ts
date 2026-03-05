import { tag, input, button, div } from "taggedjs"
import { saveScopedStorage, storage, ViewTypes } from "./sectionSelector.tag"
import { runTesting } from "./runTesting.function"

export const autoTestingControls = tag((
  tests?: ViewTypes[],
  runStartEndTests?: boolean,
) => {
  if(storage.autoTest) {
    tag.onInit(() => {
      console.log('running after dom ready, right?')
      runTesting(false, tests, runStartEndTests)
    })
  }

  return div(
    'auto testing ',
  
    input
      .type`checkbox`
      .onChange(toggleAutoTesting)
      .checked(_=> {
        console.log('checked')
        return storage.autoTest}),
    
    button
      .type`button`
      .onClick(() => runTesting(true, tests, runStartEndTests))
      ('run tests')
  )
})

function toggleAutoTesting() {
  storage.autoTest = storage.autoTest = !storage.autoTest
  saveScopedStorage()
}
