// Browser-compatible expect implementation
export function createExpect(actual: any) {
  // Capture the stack trace at the point of expect() call
  const stack = new Error().stack || ''
  const callerLine = stack.split('\n')[3] || '' // Get the line that called expect()
  
  return {
    toBe(expected: any, message?: string | (() => string)) {
      if (actual !== expected) {
        const errorMessage = typeof message === 'function' ? message() : message
        const fullMessage = errorMessage 
          ? errorMessage 
          : `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`
        const error = new Error(fullMessage)
        error.stack = fullMessage + '\n' + callerLine + (error.stack ? '\n' + error.stack : '')
        throw error
      }
    },
    toBeDefined() {
      if (actual === undefined) {
        throw new Error(`Expected value to be defined but got undefined`)
      }
    },
    toBeUndefined() {
      if (actual !== undefined) {
        throw new Error(`Expected value to be undefined but got ${JSON.stringify(actual)}`)
      }
    },
    toBeGreaterThan(expected: number) {
      if (!(actual > expected)) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`)
      }
    },
    toHaveLength(expected: number) {
      if (actual.length !== expected) {
        throw new Error(`Expected length ${expected} but got ${actual.length}`)
      }
    },
    not: {
      toBe(expected: any) {
        if (actual === expected) {
          throw new Error(`Expected ${JSON.stringify(actual)} not to be ${JSON.stringify(expected)}`)
        }
      }
    }
  }
}