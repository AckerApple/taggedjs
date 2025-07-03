// Test runner that works in both browser and Vitest environments
import { createExpect } from './expect'

let testQueue: Array<{ name: string, fn: () => void | Promise<void> }> = []
let suiteQueue: Array<{ name: string, fn: () => void }> = []

// Check if we're in Vitest environment
const isVitest = typeof (globalThis as any).vitest !== 'undefined'

// Export functions that work in both environments
export const it = isVitest 
  ? (globalThis as any).it 
  : (name: string, fn: () => void | Promise<void>) => {
      testQueue.push({ name, fn })
    }

export const describe = isVitest 
  ? (globalThis as any).describe 
  : (name: string, fn: () => void) => {
      suiteQueue.push({ name, fn })
      fn() // Execute immediately to collect tests
    }

export const expect = isVitest 
  ? (globalThis as any).expect 
  : createExpect

// Execute tests in browser environment
export async function executeBrowserTests() {
  let passed = 0
  let failed = 0
  const failures: Array<{ test: string, error: Error }> = []

  console.log(`🧪 Running ${testQueue.length} tests...`)

  for (const test of testQueue) {
    try {
      await test.fn()
      passed++
      console.log(`✅ ${test.name}`)
    } catch (error) {
      failed++
      failures.push({ test: test.name, error: error as Error })
      console.error(`❌ ${test.name}`)
      console.error(error)
    }
  }

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`)
  
  if (failures.length > 0) {
    console.error('\n❌ Failed Tests:')
    failures.forEach(({ test, error }) => {
      console.error(`\n${test}:`)
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
  suiteQueue = []

  return failed === 0
}