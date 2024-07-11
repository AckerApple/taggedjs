import { click, html, query } from "./elmSelectors"
import { expect, describe, it } from "./expect"
import { expectMatchedHtml } from "./expect.html"

describe('content', () => {    
  it('basic', () => {
    expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1')
    expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1')
    expect(html('#content-dom-parse-0-0')).toBe(html('#content-dom-parse-0-1'))
  })

  it('html', () => {
    expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1')
  })

  it('spacing', () => {
    expect(html('#hello-big-dom-world')).toBe('hello <b>big</b> world')
    expect(html('#hello-big-string-world')).toBe('hello <b>big</b> world')
    expect(html('#hello-spacing-dom-world')).toBe('54 hello worlds')
  })

  it('style.', async () => {
    expect(query('#style-simple-border-orange')[0].style.border).toBe('3px solid orange')
    expect(query('#style-var-border-orange')[0].style.border).toBe('3px solid orange')
    expect(query('#style-toggle-border-orange')[0].style.border).toBe('3px solid orange')
    await click('#toggle-border-orange')
    expect(query('#style-toggle-border-orange')[0].style.border).toBe('3px solid green')
    await click('#toggle-border-orange')
    expect(query('#style-toggle-border-orange')[0].style.border).toBe('3px solid orange')
  })
})
