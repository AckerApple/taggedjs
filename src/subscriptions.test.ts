import { describe, it, expect } from './testing'
// taggedjs-no-compile

import { byId, click, html, htmlById, expectMatchedHtml, clickById } from './testing'

describe('📰 subscriptions', () => {
  it('basic', () => {
    expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1')
    expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1')
  })

  it('html', () => {
    expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1')
  })

  it('subscribe', async () => {
    expect(htmlById('content-subscribe-sub0')).toBe('')
    expect(htmlById('content-subscribe-sub0-with')).toBe('-1')
  })

  describe('passed in subscription', () => {
    it('increase subscription', async () => {
      const increase = byId('passed-in-sub-increase')
      const hideShow = byId('passed-in-sub-hide-show')
      const hideShowValue = byId('passed-in-sub-hideShow-value')

      expect(hideShowValue.textContent).toBe('')
      expect(htmlById('passed-in-sub-ex0')).toBe('0||||0')
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1', 'failed before increase')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')

      increase.click()

      expect(htmlById('passed-in-sub-ex0')).toBe(`0||||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1', 'failed first increase')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')

      hideShow.click() // hide
      
      let subValue = htmlById('passed-in-output')
      expect(hideShowValue.textContent).toBe('true')
      expect(htmlById('passed-in-sub-ex0')).toBe(`0||||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe(`1||your fun number ${subValue}||1`, 'failed after hide')
      expect(htmlById('passed-in-sub-ex2')).toBe(`2||your tag number ${subValue}||2`)

      increase.click() // show

      subValue = htmlById('passed-in-output')
      expect(htmlById('passed-in-sub-ex0')).toBe(`0||${subValue}||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe(`1||your fun number ${subValue}||1`, 'failed third increase')
      expect(htmlById('passed-in-sub-ex2')).toBe(`2||your tag number ${subValue}||2`)

      hideShow.click()

      expect(htmlById('passed-in-sub-ex0')).toBe('0||||0')
      expect(htmlById('passed-in-sub-ex1')).toBe('1||||1', 'failed closing')
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')
    })
  })

  it('host', () => {
    let hostDestroyCount = Number(htmlById('hostDestroyCount'))

    // should be a number
    expect(isNaN(Number(htmlById('hostedContent')))).toBe(false)

    clickById('hostHideShow')

    expect( Number(htmlById('hostDestroyCount')) ).toBe(hostDestroyCount + 1)

    // should NOT be a number
    expect(htmlById('hostedContent')).toBe('')

    clickById('hostHideShow')

    // should be a number
    expect(isNaN(Number(htmlById('hostedContent')))).toBe(false)
    
    // still same number
    expect( Number(htmlById('hostDestroyCount')) ).toBe(hostDestroyCount + 1)
  })

  it('basic', () => {
    expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1')
    expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1')
    expect(html('#content-dom-parse-0-0')).toBe(html('#content-dom-parse-0-1'))
  })

  it('html', () => {
    expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1')
  })
})