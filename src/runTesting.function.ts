import { storage, ViewTypes } from "./sectionSelector.tag"
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
  const run = async () => {
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

  }

  console.info('⏳ test wait started')
  // testTimeout = setTimeout(run, waitFor) as any // cause delay to be separate from renders
  requestAnimationFrame(() => {
    run()
  })
  // run()
}
