import { storage, ViewTypes } from "./sections.tag"
import { runIsolatedTests } from "./isolatedApp.test"

let testTimeout = null
export function runTesting(
  manual = true,
  tests?: ViewTypes[],
  runStartEndTests?: boolean
) {
  const waitFor = 2000

  testTimeout = setTimeout(async () => {
    tests = tests || storage.views
    console.debug(`🏃 Running ${tests.length} test suites...`)
    const result = await runIsolatedTests(tests, runStartEndTests)

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
