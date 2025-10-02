import { outputSections } from "./renderedSections.tag"
import { storage, ViewTypes } from "./sectionSelector.tag"
// import { mochaLoaded } from "./testing/initialize-mocha-chai" // No longer needed

export async function runTests() {
  console.log('🏃 runTests: Importing tests...');

  // Always run basic and start tests
  await import('./basic.test') // not in gh-pages
  await import('./start.test.js')

  // Conditionally import tests based on checkbox states
  // Map ViewTypes to test files
  if (storage.views.includes(ViewTypes.Content)) {
    await import('./content.test')
    await import('./dumpContent.test')
  } else {
    console.log('⏭️ Skipping content tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Subscriptions)) {
    await import('./subscriptions.test')
  } else {
    console.log('⏭️ Skipping subscriptions tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Counters)) {
    await import('./counters.test')
  } else {
    console.log('⏭️ Skipping counters tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Props)) {
    await import('./props.test')
  } else {
    console.log('⏭️ Skipping props tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.TagSwitchDebug)) {
    await import('./tagSwitch.test')
  } else {
    console.log('⏭️ Skipping tagSwitch tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Arrays)) {
    await import('./arrays.test')
  } else {
    console.log('⏭️ Skipping arrays tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Mirroring)) {
    await import('./mirror.test')
  } else {
    console.log('⏭️ Skipping mirroring tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.OneRender)) {
    await import('./oneRender.test')
  } else {
    console.log('⏭️ Skipping oneRender tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.FunInPropsTag)) {
    await import('./funInProps.test')
  } else {
    console.log('⏭️ Skipping funInPropsTag tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.AttributeDebug)) {
    await import('./attributes.test')
  } else {
    console.log('⏭️ Skipping attributeDebug tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Destroys)) {
    await import('./destroys.test')
  } else {
    console.log('⏭️ Skipping destroys tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.WatchTesting)) {
    await import('./watch.test')
  } else {
    console.log('⏭️ Skipping watchTesting tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Child)) {
    await import('./child.test')
  } else {
    console.log('⏭️ Skipping child tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.ProviderDebug)) {
    await import('./providers.test')
  } else {
    console.log('⏭️ Skipping providerDebug tests (unchecked)')
  }

  if (storage.views.includes(ViewTypes.Todo)) {
    await import('./todos.test')
  } else {
    console.log('⏭️ Skipping todo tests (unchecked)')
  }

  try {
    const start = Date.now() //performance.now()
    
    // Run tests with our browser test runner
    if ((window as any).mocha) {
      // Legacy Mocha support if still available
      await new Promise((resolve, reject) => {
        (window as any).mocha.run((failures: number) => {
          if (failures > 0) {
            reject(new Error(`${failures} test(s) failed`));
          } else {
            resolve(true);
          }
        });
      });
    } else {
      // Use our custom browser test runner
      const { executeBrowserTests } = await import('./testing/testRunner');
      const success = await executeBrowserTests();
      if (!success) {
        throw new Error('Tests failed');
      }
    }
    
    const time = Date.now() - start // performance.now() - start
    console.info(`✅ all tests passed in ${time}ms`)

    // close and hide only active sections
    outputSections
      .filter(section => storage.views.includes(section.view))
      .map(section => {
        const elm = document.getElementById('section_' + section.view) as HTMLElement
        if (elm) {
          elm.click() // cause hide content
        }
      })

    return true
  } catch (error: unknown) {
    console.error('❌ tests failed: ' + (error as Error).message, error)
    return false
  }
}
