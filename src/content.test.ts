import { html } from "./elmSelectors"
import { expect, describe, it } from "./expect"
import { expectMatchedHtml } from "./expect.html"

describe('content', () => {    
  it('basic', () => {
    expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1')
    expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1')
  })

  it('html', () => {
    expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1')
  })

  it('spacing', () => {
    expect(html('#hello-big-dom-world')).toBe('hello <b>big</b> world')
    expect(html('#hello-big-string-world')).toBe('hello <b>big</b> world')
  })
})
