import { beforeAll, afterEach, beforeEach } from 'vitest'

declare global {
  interface Window {
    app?: any
  }
}

beforeAll(async () => {
  // Wait for document to be ready
  if (document.readyState !== 'complete') {
    await new Promise(resolve => {
      window.addEventListener('load', resolve)
    })
  }

  // Load CSS files
  const cssFiles = ['animate.min.css', 'document.css']
  for (const file of cssFiles) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `/${file}`
    document.head.appendChild(link)
  }

  // Create app container
  const table = document.createElement('table')
  table.style.width = '100%'
  table.style.height = '100%'
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  td.style.textAlign = 'center'
  td.style.verticalAlign = 'middle'
  
  const appElement = document.createElement('app')
  appElement.setAttribute('tag', '')
  appElement.setAttribute('url', './assets/dist/bundle.js')
  appElement.setAttribute('name', 'App')
  
  td.appendChild(appElement)
  tr.appendChild(td)
  table.appendChild(tr)
  document.body.appendChild(table)

  // Load and run the app
  try {
    // @ts-ignore
    const module = await import('./assets/dist/bundle.js')
    if (module.run) {
      module.run()
      // Store app reference for tests
      window.app = module
    }
    // Wait for app initialization
    await new Promise(resolve => setTimeout(resolve, 100))
  } catch (error) {
    console.error('Failed to load app:', error)
  }
})

// Navigate to correct view based on test file
beforeEach(async () => {
  // Get the test file path from Vitest context
  const testFile = String((globalThis as any).__vitest_worker__?.current?.file || '')
  
  // Map test files to their required views
  const viewMap: Record<string, string> = {
    'destroys.test': 'destroys',
    'content.test': 'content',
    'counters.test': 'counters',
    'props.test': 'props',
    'providers.test': 'providerDebug',
    'tagSwitch.test': 'tagSwitchDebug',
    'child.test': 'child',
    'array.test': 'arrays',
    'mirror.test': 'mirroring',
    'watch.test': 'watchTesting',
    'funInProps.test': 'funInPropsTag',
    'attributes.test': 'attributeDebug',
    'oneRender.test': 'oneRender',
    'todos.test': 'todo',
  }
  
  // Find the matching view
  for (const [testName, view] of Object.entries(viewMap)) {
    if (testFile.includes(testName)) {
      // Navigate to the view
      window.location.hash = view
      
      // Click the section checkbox to show the view
      const checkbox = document.querySelector(`#section_${view}`) as HTMLInputElement
      if (checkbox && !checkbox.checked) {
        checkbox.click()
      }
      
      // Wait for view to render
      await new Promise(resolve => setTimeout(resolve, 500))
      break
    }
  }
})

afterEach(() => {
  // Clean up test-specific elements but keep the app running
  const testElements = document.querySelectorAll('[data-test]')
  testElements.forEach(el => el.remove())
})