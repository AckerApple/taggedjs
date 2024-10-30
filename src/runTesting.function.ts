import { storage, ViewTypes } from "./sections.tag"
import { runIsolatedTests } from "./isolatedApp.test"

let testTimeout: NodeJS.Timeout | null = null
export function runTesting(
  manual = true,
  tests?: ViewTypes[],
  runStartEndTests?: boolean
) {
  if(testTimeout !== null) {
    clearTimeout(testTimeout)
    console.debug(`🏃 Cleared previous testing to start again...`)
  }
  
  const waitFor = 2000
  testTimeout = setTimeout(async () => {
    tests = tests || storage.views
    console.debug(`🏃 Prepare test suites...`)
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
