import { click, html, htmlById } from "./testing/elmSelectors"
import { describe, expect, it } from "./testing/expect"
import { expectMatchedHtml } from "./testing/expect.html"

describe('⌚️ watch tests', () => {
  const slowCount = html('#🍄-slowChangeCount')
  // tests can be run multiple times. Only the first time will this expect below work
  const firstRun = slowCount === '0'

  it('basic', async () => {
    const startCount = Number(htmlById('watch-testing-num-display'))

    expectMatchedHtml('#watch-testing-num-display', '#🍄-slowChangeCount')
    
    // always starts at "false"
    expect(html('#🦷-truthChange')).toBe('false')
        
    if(firstRun) {
      expect(html('#🍄-watchPropNumSlow')).toBe('')
      expect(html('#🦷-watchTruth')).toBe('false')
      expect(html('#🦷-watchTruthAsSub')).toBe('undefined')
    } else {
      expect(html('#🍄-watchPropNumSlow')).toBe( slowCount )
      expect( Number(html('#🦷-watchTruth')) ).toBeGreaterThan( Number(slowCount) )
      expect(html('#🦷-watchTruthAsSub')).toBe( html('#🦷-truthSubChangeCount') )
    }

    click('#watch-testing-num-button')
    
    expectMatchedHtml('#watch-testing-num-display', '#🍄-slowChangeCount')
    expectMatchedHtml('#🍄-watchPropNumSlow', '#🍄-slowChangeCount')
    
    expect(html('#🍄‍🟫-subjectChangeCount')).toBe( (startCount + 2).toString() )
    expectMatchedHtml('#🍄‍🟫-subjectChangeCount', '#🍄‍🟫-watchPropNumSubject')
    
    const truthStartCount = Number(html('#🦷-truthChangeCount'))

    click('#🦷-truthChange-button')

    let newCount = (truthStartCount + 1).toString()
    // its been changed to "true", that causes a change watch count increase
    expect(html('#🦷-truthChange')).toBe('true')
    expect(html('#🦷-watchTruth')).toBe( newCount )
    expect(html('#🦷-truthChangeCount')).toBe( newCount )

    click('#🦷-truthChange-button')

    newCount = (truthStartCount + 1).toString()
    // its been changed to back to "false", that does NOT cause a change watch count increase
    expect(html('#🦷-truthChange')).toBe('false')
    expect(html('#🦷-watchTruth')).toBe(newCount)
    expect(html('#🦷-truthChangeCount')).toBe( newCount )

    click('#🦷-truthChange-button')

    // its been changed to "true", that causes a change watch count increase
    newCount = (truthStartCount + 2).toString()
    expect(html('#🦷-truthChange')).toBe('true')
    expect(html('#🦷-watchTruth')).toBe(newCount)
    expect(html('#🦷-truthChangeCount')).toBe( newCount )

    click('#🦷-truthChange-button') // reset so tests can pass every time
    click('#🦷-reset-button') // reset so tests can pass every time

    const display = html('#🦷-watchTruth')
    const actual = html('#🦷-watchTruthAsSub')
    expect(actual).toBe(display, `Last test expected #🦷-watchTruthAsSub ${display} but it was ${actual}`)
  })
})
