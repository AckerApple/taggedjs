// taggedjs-no-compile

import { byId, change, triggerChangeElm, click, html, query, htmlById } from "./testing/elmSelectors"
import { expect, describe, it } from "./testing/expect"
import { expectMatchedHtml } from "./testing/expect.html"

let runs = 0

describe('📰 content', () => {
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

  it('subscribe', async () => {
    if(runs > 0) {
      console.warn('⏭️ skipped test that only passes the first time')
      return
    }
    
    expect(htmlById('content-subscribe-sub0')).toBe('')
    expect(htmlById('content-subscribe-sub0-with')).toBe('-1')
  })

  describe('passed in subscription', () => {
    it('increase test', async () => {
      const increase = byId('passed-in-sub-increase')
      const hideShow = byId('passed-in-sub-hide-show')

      expect(htmlById('passed-in-sub-ex0')).toBe('0||||0')
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')

      increase.click()

      expect(htmlById('passed-in-sub-ex0')).toBe(`0||||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')

      hideShow.click()

      expect(htmlById('passed-in-sub-ex0')).toBe(`0||||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')

      increase.click()

      const subValue = htmlById('passed-in-output')
      expect(htmlById('passed-in-sub-ex0')).toBe(`0||${subValue}||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe(`1||your fun number ${subValue}||1`)
      expect(htmlById('passed-in-sub-ex2')).toBe(`2||your tag number ${subValue}||2`)

      hideShow.click()

      expect(htmlById('passed-in-sub-ex0')).toBe('0||||0')
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')
    })
  })

  it('increase runs', () => {
    ++runs
  })
})
