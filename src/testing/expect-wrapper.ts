// Wrapper to provide unified expect interface for both Vitest and browser environments
import { createExpect } from './expect'
import type { ExpectStatic } from 'vitest'

// Check if we're in Vitest environment
const isVitest = typeof (globalThis as any).vitest !== 'undefined'
const vitestExpect = isVitest ? (globalThis as any).expect as ExpectStatic : null

// Define interfaces for our matchers
interface Matchers<T> {
  toBe(expected: T, message?: string | (() => string)): void
  toBeDefined(): void
  toBeUndefined(): void
  toBeGreaterThan(expected: number): void
  toHaveLength(expected: number): void
  not: {
    toBe(expected: T): void
  }
  to: {
    be: {
      greaterThan(expected: number): void
    }
  }
}

interface MessageMatchers<T> extends Matchers<T> {
  // Inherits all methods from Matchers
}

interface ExpectFunction {
  <T>(actual: T): Matchers<T>
  <T>(actual: T, message: string): MessageMatchers<T>
}

// Create a unified expect function that supports both syntaxes
export function createUnifiedExpect(): ExpectFunction {
  if (isVitest && vitestExpect) {
    // In Vitest, create a wrapper that supports custom messages
    return function expect<T>(actual: T, message?: string) {
      if (message !== undefined) {
        // Return an object that captures the message and provides matchers
        const matchers = vitestExpect(actual)
        return {
          toBe(expected: T) {
            try {
              matchers.toBe(expected)
            } catch (error) {
              // If test fails, throw error with custom message
              throw new Error(message)
            }
          },
          toBeDefined() {
            try {
              matchers.toBeDefined()
            } catch (error) {
              throw new Error(message)
            }
          },
          toBeUndefined() {
            try {
              matchers.toBeUndefined()
            } catch (error) {
              throw new Error(message)
            }
          },
          toBeGreaterThan(expected: number) {
            try {
              matchers.toBeGreaterThan(expected)
            } catch (error) {
              throw new Error(message)
            }
          },
          toHaveLength(expected: number) {
            try {
              matchers.toHaveLength(expected)
            } catch (error) {
              throw new Error(message)
            }
          },
          not: {
            toBe(expected: T) {
              try {
                matchers.not.toBe(expected)
              } catch (error) {
                throw new Error(message)
              }
            }
          },
          to: {
            be: {
              greaterThan: (expected: number) => {
                try {
                  matchers.toBeGreaterThan(expected)
                } catch (error) {
                  throw new Error(message)
                }
              }
            }
          }
        } as any
      }
      
      // Standard Vitest expect with additional properties
      const matchers = vitestExpect(actual)
      return {
        ...matchers,
        // Support chai-style syntax
        to: {
          be: {
            greaterThan: (expected: number) => {
              return vitestExpect(actual).toBeGreaterThan(expected)
            }
          }
        },
        // Support custom message in toBe
        toBe: (expected: T) => {
          return matchers.toBe(expected)
        }
      }
    }
  } else {
    // In browser, use our custom implementation with extended syntax
    return function expect<T>(actual: T, message?: string) {
      if (message !== undefined) {
        // Return an object that captures the message and provides all matchers
        const matchers = createExpect(actual)
        return {
          toBe(expected: T) {
            matchers.toBe(expected, message)
          },
          toBeDefined() {
            matchers.toBeDefined()
          },
          toBeUndefined() {
            matchers.toBeUndefined()
          },
          toBeGreaterThan(expected: number) {
            matchers.toBeGreaterThan(expected)
          },
          toHaveLength(expected: number) {
            matchers.toHaveLength(expected)
          },
          not: {
            toBe(expected: T) {
              matchers.not.toBe(expected)
            }
          },
          to: {
            be: {
              greaterThan: (expected: number) => {
                matchers.toBeGreaterThan(expected)
              }
            }
          }
        } as any
      }
      
      const matchers = createExpect(actual)
      return {
        ...matchers,
        // Support chai-style syntax
        to: {
          be: {
            greaterThan: (expected: number) => {
              matchers.toBeGreaterThan(expected)
            }
          }
        }
      }
    }
  }
}

export const expect = createUnifiedExpect()