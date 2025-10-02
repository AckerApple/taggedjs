import { describe, it, expect } from './testing'
import { testStaggerBy } from "./content.tag"
import { byId, click, html, query, changeOne, textContent, count } from './testing'
import { sleep } from './testing'

// Helper function to wait for animations to complete
async function waitForAnimationsToComplete(selector: string, expectedCount: number, maxWait: number = 5000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWait) {
    const animatingCount = count(`.animate__animated${selector}`);
    if (animatingCount === expectedCount) {
      // Wait a bit more to ensure the animation state has stabilized
      await sleep(50);
      return true;
    }
    await sleep(10);
  }
  
  throw new Error(`Timeout waiting for animations to complete. Expected ${expectedCount} animating elements matching '.animate__animated${selector}', but found ${count(`.animate__animated${selector}`)}`);
}

// Helper to wait for elements to appear/disappear
async function waitForElementCount(selector: string, expectedCount: number, maxWait: number = 5000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWait) {
    const currentCount = count(selector);
    if (currentCount === expectedCount) {
      await sleep(50); // Small delay to ensure stability
      return true;
    }
    await sleep(10);
  }
  
  throw new Error(`Timeout waiting for element count. Expected ${expectedCount} elements matching '${selector}', but found ${count(selector)}`);
}

describe('📰 content', () => {
  it('spacing', () => {
    expect(html('#hello-big-dom-world')).toBe('hello <b>big</b> world')
    expect(html('#hello-big-string-world')).toBe('hello <b>big</b> world')
    expect(html('#hello-spacing-dom-world')).toBe('54 hello worlds')
  })

  it('style.', () => {
    expect(query('#style-simple-border-orange')[0].style.border).toBe('3px solid orange')
    expect(query('#style-var-border-orange')[0].style.border).toBe('3px solid orange')
    expect(query('#style-toggle-border-orange')[0].style.border).toBe('3px solid orange')
    click('#toggle-border-orange')
    expect(query('#style-toggle-border-orange')[0].style.border).toBe('3px solid green')
    click('#toggle-border-orange')
    expect(query('#style-toggle-border-orange')[0].style.border).toBe('3px solid orange')
  })

  it('style set as object', () => {
    expect(query('#style-toggle-bold')[0].style.fontWeight).toBe('')
    click('#toggle-bold')
    expect(query('#style-toggle-bold')[0].style.fontWeight).toBe('bold')
    click('#toggle-bold')
    expect(query('#style-toggle-bold')[0].style.fontWeight).toBe('')
  })

  describe('no parent element tests', () => {
    it('no immediate parent', () => {
      const element = document.getElementById('noParentTagFieldset')
  
      expect(element?.innerText).toBe('No Parent Test\ncontent1\ntest0\ncontent2\ntest1\ncontent3\ntest3\ncontent4')
    })

    it('multiple no parent - ensure dynamic content rendered in order', () => {
      const element = document.getElementById('noParentTagFieldset') as HTMLElement
      const parent = element.parentNode as HTMLElement
  
      const html = parent.innerHTML.replace(/(^(.|\n)+<hr id="noParentsTest2-start">|)/g,'').replace(/<hr id="noParentsTest2-end">(.|\n)*/g,'').trim()
      expect(html).toBe('<hr>content1<hr>test0<hr>content2<hr>test1<hr>content3<hr>test3<hr>content4<hr>')
    })
  })

  it('concat style', () => {
    byId('dynamic-border-width').value = 2
    byId('dynamic-border-color').value = 'white'
    
    changeOne('#dynamic-border-width')
    changeOne('#dynamic-border-color')
    
    expect(byId('dynamic-border-element').style.borderColor).toBe('white')
    expect(byId('dynamic-border-element').style.borderWidth).toBe('2px')

    byId('dynamic-border-width').value = 1
    byId('dynamic-border-color').value = 'blue'
    
    changeOne('#dynamic-border-width')
    changeOne('#dynamic-border-color')
    
    expect(byId('dynamic-border-element').style.borderColor).toBe('blue')
    expect(byId('dynamic-border-element').style.borderWidth).toBe('1px')
  })

  it('tagvar injections', () => {
    expect(byId('inject-tagvar-0').innerText).toBe(byId('inject-read-tagvar-0').innerText)
    expect(byId('inject-tagvar-1').innerText).toBe(byId('inject-read-tagvar-1').innerText)
    expect(byId('inject-tagvar-2').innerText).toBe(byId('inject-read-tagvar-2').innerText)
  })
/*
  it('animates', async () => {
    // Skip if running in an environment where content view isn't properly loaded
    const toggleButton = document.querySelector('#content-toggle-fx');
    if (!toggleButton) {
      console.warn('⚠️ Skipping animation test - Content view not loaded properly in test environment');
      return;
    }
    
    expect(count('[name=test-the-tester]'), 'Initial state: should have 0 test elements').toBe(0)
    
    //show
    click('#content-toggle-fx')

    // Wait for elements to appear
    await waitForElementCount('[name=test-the-tester]', 3);
    expect(count('[name=test-the-tester]')).toBe(3, 'After show click: should have 3 test elements')
    
    // Check if any elements are animating initially (could be 1, 2, or 3 depending on timing)
    const animatingCount = count('.animate__animated[name=test-the-tester]');
    expect(animatingCount).toBeGreaterThan(0, 'After show click: should have at least 1 animating element')
        
    // Wait a bit to ensure we're still mid-animation
    await sleep(testStaggerBy / 2);
    
    // almost shown - there might be more animating elements due to stagger
    expect(count('[name=test-the-tester]'), 'During animation: should still have 3 test elements').toBe(3)
    // Don't check exact animation count here as it depends on stagger timing
    expect(textContent('#outer-html-fx-test'), 'During animation: inner html should be rendered').toBe('inner html tag')

    // Wait for all animations to complete
    await waitForAnimationsToComplete('[name=test-the-tester]', 0);
   
    // completed showing
    expect(count('[name=test-the-tester]'), 'After animation complete: should have 3 test elements').toBe(3)
    expect(count('.animate__animated[name=test-the-tester]'), 'After animation complete: should have 0 animating elements').toBe(0)
    
    // hide
    click('#content-toggle-fx')

    // Check if any elements are animating (could be 1, 2, or 3 depending on timing)
    const hideAnimatingCount = count('.animate__animated[name=test-the-tester]');
    expect(hideAnimatingCount).toBeGreaterThan(0, 'After hide click: should have at least 1 animating element')
    
    // no changes to remove yet
    expect(count('[name=test-the-tester]')).toBe(3, 'After hide click: should still have 3 test elements')
    
    // Wait for all elements to disappear
    await waitForElementCount('[name=test-the-tester]', 0);
    
    // should be done disappearing
    expect(count('[name=test-the-tester]')).toBe(0, 'After hide animation: should have 0 test elements')
    expect(count('.animate__animated[name=test-the-tester]')).toBe(0, 'After hide animation: should have 0 animating elements')
  })
*/
})
