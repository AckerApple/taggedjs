import { byId, click, html, htmlById } from "./elmSelectors"
import { execute, expect, it } from "./expect"
import { expectElmCount, expectMatchedHtml, testCounterElements, testDuelCounterElements } from "./expect.html"

export async function runTests() {
  const slowCount = html('#🍄-slowChangeCount')
  // tests can be run multiple times. Only the first time will this expect below work
  const firstRun = slowCount === '0'

  it('no template tags', () => {
    const templateTags = document.getElementsByTagName('template')
    expect(templateTags.length).toBe(0, 'Expected no templates to be on document')
  })
  
  it('elements exists', () => {
    expect(byId('h1-app')).toBeDefined()
    const toggleTest = byId('toggle-test')
    expect(toggleTest).toBeDefined()
    expect(toggleTest.innerText).toBe('toggle test')    
  })

  it('toggle test', () => {
    const toggleTest = byId('toggle-test')
    toggleTest.click()
    expect(toggleTest.innerText).toBe('toggle test true')
    toggleTest.click()
    expect(toggleTest.innerText).toBe('toggle test')
    
    const propsTextarea = byId('props-debug-textarea') as HTMLTextAreaElement
    expect(propsTextarea.value.replace(/\s/g,'')).toBe(`{"test":33,"x":"y"}`)
  })

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
  await import('./todos.test')

  it('has no templates', () => {
    expect(document.getElementsByTagName('template').length).toBe(0, 'expected no templates on document')
  })

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
