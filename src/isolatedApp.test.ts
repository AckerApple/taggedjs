import { execute } from "./testing/expect"
import { ViewTypes } from "./sectionSelector.tag"

export async function runIsolatedTests(
  views: ViewTypes[],
  runStartEndTests = true,
) {
  let testCount = 0

  if(runStartEndTests) {
    await import('./start.test.js')
    ++testCount
  }

  if(views.includes(ViewTypes.Content)) {
    await import('./content.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Counters)) {
    await import('./counters.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Props)) {
    await import('./props.test')
    ++testCount
  }

  if(views.includes(ViewTypes.ProviderDebug)) {
    await import('./providers.test')
    ++testCount
  }

  if(views.includes(ViewTypes.TagSwitchDebug)) {
    await import('./tagSwitch.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Child)) {
    await import('./child.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Arrays)) {
    await import('./array.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Mirroring)) {
    await import('./mirror.test')
    ++testCount
  }

  if(views.includes(ViewTypes.WatchTesting)) {
    await import('./watch.test')
    ++testCount
  }

  if(views.includes(ViewTypes.FunInPropsTag)) {
    await import('./funInProps.test')
    ++testCount
  }

  if(views.includes(ViewTypes.AttributeDebug)) {
    await import('./attributes.test')
    ++testCount
  }

  if(views.includes(ViewTypes.OneRender)) {
    await import('./oneRender.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Todo)) {
    await import('./todos.test')
    ++testCount
  }

  if(views.includes(ViewTypes.Destroys)) {
    await import('./destroys.test')
    ++testCount
  }

  console.debug(`🏃 Running ${testCount} test suites...`)

  try {
    const start = Date.now() //performance.now()
    await execute()
    const time = Date.now() - start // performance.now() - start
    console.info(`✅ tests passed in ${time}ms`)
    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}
