// Test runner that works in both browser and Vitest environments
import { createExpect } from './expect'

interface Test {
  name: string
  fn: () => void | Promise<void>
  suite: string | null
}

interface Suite {
  name: string
  tests: Test[]
}

let currentSuite: string | null = null
let suites: Map<string | null, Test[]> = new Map()
let testQueue: Test[] = []

// Check if we're in Vitest environment
const isVitest = typeof (globalThis as any).vitest !== 'undefined'

// Export functions that work in both environments
export const it = isVitest 
  ? (globalThis as any).it 
  : (name: string, fn: () => void | Promise<void>) => {
      const test: Test = { name, fn, suite: currentSuite }
      testQueue.push(test)
      
      // Add to suite map
      const suiteTests = suites.get(currentSuite) || []
      suiteTests.push(test)
      suites.set(currentSuite, suiteTests)
    }

export const describe = isVitest 
  ? (globalThis as any).describe 
  : (name: string, fn: () => void) => {
      const previousSuite = currentSuite
      currentSuite = name
      suites.set(name, [])
      fn() // Execute immediately to collect tests
      currentSuite = previousSuite
    }

export const expect = isVitest 
  ? (globalThis as any).expect 
  : createExpect

// Execute tests in browser environment
export async function executeBrowserTests() {
  let passed = 0
  let failed = 0
  const failures: Array<{ test: string, suite: string | null, error: Error }> = []

  console.log(`🧪 Running ${testQueue.length} tests...\n`)

  // Group tests by suite for better output
  const testsBySuite = new Map<string | null, Test[]>()
  for (const test of testQueue) {
    const key = test.suite || null
    const suiteTests = testsBySuite.get(key) || []
    suiteTests.push(test)
    testsBySuite.set(key, suiteTests)
  }

  // Run tests grouped by suite
  for (const [suiteName, tests] of testsBySuite) {
    if (suiteName) {
      console.log(`${suiteName}`)
    }
    
    for (const test of tests) {
      const indent = suiteName ? '  ' : ''
      try {
        await test.fn()
        passed++
        console.log(`${indent}✅ ${test.name}`)
      } catch (error) {
        failed++
        failures.push({ test: test.name, suite: test.suite, error: error as Error })
        console.error(`${indent}❌ ${test.name}`)
        console.error(`${indent}   ${error}`)
      }
    }
    
    if (suiteName) {
      console.log('') // Empty line after suite
    }
  }

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`)
  
  if (failures.length > 0) {
    console.error('\n❌ Failed Tests:')
    failures.forEach(({ test, suite, error }) => {
      const fullName = suite ? `${suite} > ${test}` : test
      console.error(`\n${fullName}:`)
      console.error(error.message)
      if (error.stack) {
        // Try to extract TypeScript file references from stack
        const stackLines = error.stack.split('\n')
        stackLines.forEach(line => {
          if (line.includes('.ts:') && !line.includes('node_modules')) {
            console.error(line.trim())
          }
        })
      }
    })
  }

  // Clear queues for next run
  testQueue = []
  suites.clear()
  currentSuite = null

  return failed === 0
}