import { it } from "./expect"
import { testCounterElements, testDuelCounterElements } from "./expect.html"

it('child tests', () => {
  testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display')
  testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display')
  testDuelCounterElements(
    ['#childTests-button', '#childTests-display'],
    ['#child-as-prop-test-button', '#child-as-prop-test-display'],
    ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display'],
  )

  testDuelCounterElements(
    ['#childTests-button', '#childTests-display'],
    ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display'],
  )
})
