import { storage, ViewTypes } from "./sectionSelector.tag"
import { runIsolatedTests } from "./isolatedApp.test"
// import { enableMocha } from "./testing/expect" // No longer needed with dual test system

let testTimeout: NodeJS.Timeout | null = null

// Alternative test runner that uses Mocha/Chai
export function runTestingWithMocha(
  manual = true,
  tests?: ViewTypes[],
  runStartEndTests?: boolean
) {
  // Mocha/Chai integration no longer needed with dual test system
  // enableMocha();
  
  if(testTimeout !== null) {
    clearTimeout(testTimeout)
    console.debug(`🏃 Cleared previous testing to start again...`)
  }
  
  const waitFor = 2000
  testTimeout = setTimeout(async () => {
    tests = tests || storage.views
    console.debug(`🏃 Prepare test suites with Mocha/Chai...`)
    const result = await runIsolatedTests(tests, runStartEndTests)

    if(!manual) {
      return
    }

    if(result) {
      alert('✅ all app tests passed (Mocha/Chai)')
      return
    }

    alert('❌ tests failed. See console for more details')

  }, waitFor) as any
}