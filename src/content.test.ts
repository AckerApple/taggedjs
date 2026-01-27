import { describe, it, expect } from './testing'
import { byId, click, html, query, changeOne, count, textContent } from './testing'
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
    expect(html('#hello-big-string-world')).toBe('hello <b>big</b> world')
    expect(html('#hello-spacing-dom-world')).toBe('54 hello worlds')
  })

  it('style.', () => {
    const ssbo = query('#style-simple-border-orange')[0].style.border
    expect(ssbo).toBe('3px solid orange')
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
    expect(byId('dynamic-style-border').style.borderColor).toBe('white')
    expect(byId('dynamic-style-border').style.borderWidth).toBe('2px')

    byId('dynamic-border-width').value = 1
    byId('dynamic-border-color').value = 'blue'
    
    changeOne('#dynamic-border-width')
    changeOne('#dynamic-border-color')
    
    expect(byId('dynamic-border-element').style.borderColor).toBe('blue')
    expect(byId('dynamic-border-element').style.borderWidth).toBe('1px')
    expect(byId('dynamic-style-border').style.borderColor).toBe('blue')
    expect(byId('dynamic-style-border').style.borderWidth).toBe('1px')
  })

  it('tagvar injections', () => {
    expect(html('#content-dom-parse-0-0')).toBe(html('#content-dom-parse-0-1'))
    expect(byId('inject-tagvar-0').innerText).toBe(byId('inject-read-tagvar-0').innerText)
    expect(byId('inject-tagvar-1').innerText).toBe(byId('inject-read-tagvar-1').innerText)
    expect(byId('inject-tagvar-2').innerText).toBe(byId('inject-read-tagvar-2').innerText)
  })

  it('updates hook runs only on updates', () => {
    const start = textContent('#updates-count')
    click('#updates-count-bump')
    expect(textContent('#updates-count')).toBe( (Number(start) + 1).toString() )
  })

  it('inputs hook runs on init and updates', () => {
    const start = textContent('#inputs-count')
    click('#inputs-count-bump')
    expect(textContent('#inputs-count')).toBe( (Number(start) + 1).toString() )
  })
})
