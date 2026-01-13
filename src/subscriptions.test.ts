import { describe, it, expect } from './testing'
// taggedjs-no-compile

import { byId, htmlById, expectMatchedHtml, clickById } from './testing'

describe('📰 subscriptions', () => {
  it('sub basic', () => {
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
      expect(hideShowValue.textContent).toBe('true', `Expected #passed-in-output to be 'true' but it is ${hideShowValue.textContent}`)
      expect(htmlById('passed-in-sub-ex0')).toBe(`0||||0`)

      const zeros = '0||||0'
      const ones = '1||||1'

      const _ex1Html = htmlById('passed-in-sub-ex1')
      const expectedEx1Html = `1||your fun number ${subValue}||1`
      expect(_ex1Html).toBe(expectedEx1Html, `failed after hide expected #passed-in-sub-ex1 to be ${expectedEx1Html} but its ${_ex1Html}`)
      expect(htmlById('passed-in-sub-ex2')).toBe(`2||your tag number ${subValue}||2`)

      increase.click() // show

      subValue = htmlById('passed-in-output')
      expect(htmlById('passed-in-sub-ex0')).toBe(`0||${subValue}||0`)
      expect(htmlById('passed-in-sub-ex1')).toBe(`1||your fun number ${subValue}||1`, 'failed third increase')
      expect(htmlById('passed-in-sub-ex2')).toBe(`2||your tag number ${subValue}||2`)

      hideShow.click()

      const ex0Html = htmlById('passed-in-sub-ex0')
      expect(ex0Html).toBe(zeros, `Lest click check expected #passed-in-sub-ex0 to be ${zeros} but it is ${ex0Html}`)
      
      const ex1Html = htmlById('passed-in-sub-ex1')
      expect(ex1Html).toBe(ones, `Failed closing expected #passed-in-sub-ex1 ${ex1Html} to be ${ones} but it is ${ex1Html}`)
      expect(htmlById('passed-in-sub-ex2')).toBe('2||||2')
    })
  })

  it('subscriptions host', () => {
    let hostDestroyCount = Number(htmlById('hostDestroyCount'))

    // should be a number
    expect(isNaN(Number(htmlById('hostedContent')))).toBe(false, 'hostedContent html not as expected')

    clickById('hostHideShow')

    const dCount = Number(htmlById('hostDestroyCount'))
    expect( dCount ).toBe(
      hostDestroyCount + 1,
      `host destroy count expected ${dCount} to be ${hostDestroyCount + 1}`
    )

    // should NOT be a number
    expect(htmlById('hostedContent')).toBe('')

    clickById('hostHideShow')

    // should be a number
    expect(isNaN(Number(htmlById('hostedContent')))).toBe(false, 'hostedContent check 2 not right')
    
    // still same number
    expect( Number(htmlById('hostDestroyCount')) ).toBe(hostDestroyCount + 1, 'host destroy mismatch 2')
  })

  it('subscribe basic', () => {
    expectMatchedHtml('#content-subject-pipe-display0', '#content-subject-pipe-display1')
    expectMatchedHtml('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1')
  })

  it('html', () => {
    expectMatchedHtml('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1')
  })
})