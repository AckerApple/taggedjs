type Test = () => unknown
const onlyTests: Test[] = []
let tests: Test[] = []
let tab = 0

export function describe(label: string, run: () => any) {
  tests.push(() => {
    const oldTests = tests
    tests = []
    
    try {
      console.debug('  '.repeat(tab) + '👉 ' + label)
      
      ++tab
      run()
      runTests(tests)
      
      --tab
    } catch (error) {
      --tab
      // console.debug(' '.repeat(tab) + '❌ ' + label)
      throw error
    } finally {
      tests = oldTests
    }
  })
}

describe.only = (label: string, run: () => any) => {
  onlyTests.push(() => {
    const oldTests = tests
    tests = []
    
    try {
      console.debug('  '.repeat(tab) + '👉 ' + label)
      
      ++tab
      
      run()
      runTests(tests)
      
      --tab
    } catch (error) {
      --tab
      // console.debug(' '.repeat(tab) + '❌ ' + label)
      throw error
    } finally {
      tests = oldTests
    }
  })
}

export function it(label: string, run: () => any) {
  tests.push(() => {
    try {
      run()
      console.debug(' '.repeat(tab) + '✅ ' + label)
    } catch (error) {
      console.debug(' '.repeat(tab) + '❌ ' + label)
      throw error
    }
  })
}

it.only = (label: string, run: () => any) => {
  onlyTests.push(() => {
    try {
      run()
      console.debug('✅ ' + label)
    } catch (error) {
      console.debug('❌ ' + label)
      throw error
    }
  })
}

export function execute() {
  if(onlyTests.length) {
    return runTests(onlyTests)
  }
  
  return runTests(tests)
}

function runTests(tests: Test[]) {
  tests.forEach(test => {    
    try {
      test()
    } catch (err) {
      console.error(`Error testing ${test.name}`)
      throw err
    }
  })
}

export function expect(expected: unknown) {
  return {
    toBeDefined: () => {
      if(expected !== undefined && expected !== null) {
        return
      }

      const message = `Expected ${JSON.stringify(expected)} to be defined`
      console.error(message, {expected})
      throw new Error(message)
    },
    toBe: (received: unknown, customMessage?: string) => {
      if(expected === received) {
        return
      }

      const message = customMessage || `Expected ${typeof(expected)} ${JSON.stringify(expected)} to be ${typeof(received)} ${JSON.stringify(received)}`
      console.error(message, {received, expected})
      throw new Error(message)
    }
  }
}