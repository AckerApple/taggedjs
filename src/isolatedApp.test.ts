import { execute } from "./expect"
import { ViewTypes } from "./sections.tag"

export async function runTests(
  views: ViewTypes[]
) {
  await import('./start.test')

  if(views.includes(ViewTypes.Content)) {
    await import('./content.test')
  }

  if(views.includes(ViewTypes.Counters)) {
    await import('./counters.test')
  }

  if(views.includes(ViewTypes.Props)) {
    await import('./props.test')
  }

  if(views.includes(ViewTypes.ProviderDebug)) {
    await import('./providers.test')
  }

  if(views.includes(ViewTypes.TagSwitchDebug)) {
    await import('./tagSwitch.test')
  }

  if(views.includes(ViewTypes.Child)) {
    await import('./child.test')
  }

  if(views.includes(ViewTypes.Arrays)) {
    await import('./array.test')
  }

  if(views.includes(ViewTypes.Mirroring)) {
    await import('./mirror.test')
  }

  if(views.includes(ViewTypes.WatchTesting)) {
    await import('./watch.test')
  }

  if(views.includes(ViewTypes.FunInPropsTag)) {
    await import('./funInProps.test')
  }

  if(views.includes(ViewTypes.OneRender)) {
    await import('./oneRender.test')
  }

  if(views.includes(ViewTypes.Todo)) {
    await import('./todos.test')
  }

  await import('./last.test')

  try {
    const start = Date.now() //performance.now()
    await execute()
    const time = Date.now() - start // performance.now() - start
    console.info(`✅ isolated tests passed in ${time}ms`)
    return true
  } catch (error: unknown) {
    console.error('❌ isolated tests failed: ' + (error as Error).message, error)
    return false
  }
}
