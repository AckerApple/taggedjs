import { outputSections } from "./renderedSections.tag"
import { mochaLoaded } from "./testing/initialize-mocha-chai"

export async function runTests() {
  console.log('🏃 runTests: Waiting for Mocha to load...');
  await mochaLoaded;
  console.log('✅ runTests: Mocha loaded, importing tests...');
  
  await import('./basic.test') // not in gh-pages
  await import('./start.test.js')

  // cannot be dynamic file names, must be hand typed out
  await import('./content.test')
  await import('./dumpContent.test')
  await import('./counters.test')
  await import('./props.test')
  await import('./tagSwitch.test')
  await import('./array.test')  
  await import('./mirror.test')
  await import('./oneRender.test')
  await import('./funInProps.test')
  await import('./attributes.test')
  await import('./destroys.test')
  
  await import('./watch.test')
  await import('./child.test')
  await import('./providers.test')
  await import('./todos.test')

  try {
    const start = Date.now() //performance.now()
    
    // Run Mocha tests
    await new Promise((resolve, reject) => {
      (window as any).mocha.run((failures: number) => {
        if (failures > 0) {
          reject(new Error(`${failures} test(s) failed`));
        } else {
          resolve(true);
        }
      });
    });
    
    const time = Date.now() - start // performance.now() - start
    console.info(`✅ all tests passed in ${time}ms`)

    // close and hide all sections
    outputSections.map(section => {
      const elm = document.getElementById('section_' + section.view) as HTMLElement
      elm.click() // cause hide content
    })

    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}
