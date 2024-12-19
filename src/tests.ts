import { execute } from "./testing/expect"

export async function runTests() {
  await import('./basic.test') // not in gh-pages
  await import('./start.test.js')
  
  await import('./content.test')
  await import('./counters.test')
  await import('./props.test')
  await import('./providers.test')
  await import('./tagSwitch.test')
  await import('./child.test')
  await import('./array.test')  
  await import('./mirror.test')
  await import('./watch.test')
  await import('./oneRender.test')
  await import('./funInProps.test')
  await import('./attributes.test')
  await import('./todos.test')
  await import('./destroys.test')

  try {
    const start = Date.now() //performance.now()
    await execute()
    const time = Date.now() - start // performance.now() - start
    console.info(`✅ all tests passed in ${time}ms`)
    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}
