import { storage } from "./sections.tag"
import { runTests } from "./isolatedApp.test"

let testTimeout = null
export function runTesting(manual = true) {
  const waitFor = 2000

  testTimeout = setTimeout(async () => {
    console.debug('🏃 Running tests...')
    const result = await runTests(storage.views)

    if(!manual) {
      return
    }

    if(result) {
      alert('✅ all app tests passed')
      return
    }

    alert('❌ tests failed. See console for more details')

  }, waitFor) as any // cause delay to be separate from renders
}
