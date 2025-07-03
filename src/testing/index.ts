// Re-export test functions that work in both environments
// This allows tests to work in both Vitest and browser environments

// Import browser test runner
import * as browserRunner from './testRunner'

// Create environment-aware exports
const isVitest = typeof (globalThis as any).vitest !== 'undefined'

export const it = isVitest 
  ? (globalThis as any).it 
  : browserRunner.it

export const describe = isVitest 
  ? (globalThis as any).describe 
  : browserRunner.describe

export const expect = isVitest 
  ? (globalThis as any).expect 
  : browserRunner.expect

export const beforeEach = isVitest 
  ? (globalThis as any).beforeEach 
  : (() => { /* no-op in browser */ })

export const afterEach = isVitest 
  ? (globalThis as any).afterEach 
  : (() => { /* no-op in browser */ })

// Re-export all DOM utilities
export * from './elmSelectors'
export * from './expect.html'