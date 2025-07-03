import { describe, it } from './testing'
import { testCounterElements, testDuelCounterElements } from './testing'

describe('child tests', () => {
  it('child tests', () => {
    testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display')
    testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display')    
  })
  
  it('a', () => {
    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display'],
    )
  })

  it('b', () => {
    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#child-as-prop-test-button', '#child-as-prop-test-display']
    )
    testCounterElements('#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display')
  })

  it('c', () => {
    testDuelCounterElements(
      ['#childTests-button', '#childTests-display'],
      ['#innerHtmlTest-childTests-button-c', '#innerHtmlTest-childTests-display-c'],
    )
  })
})
