import { button, span, div, fieldset, legend, small, a, tag, state, Subject, callbackMaker, onDestroy, onInit, states, subscribe } from "taggedjs"
import { renderedSections } from "./renderedSections.tag"
import { renderCountDiv } from "./renderCount.component"
import { sectionSelector } from "./sectionSelector.tag"
import { tagDebug } from "./tagJsDebug"
import { runTests } from "./tests"

export const homePage = tag(() => {
  let showSections = true
  let appCounter = 0
  let toggleValue = false
  let testTimeout: any = null
  let appCounterSubject = new Subject<number>(appCounter)
  let renderCount = 0
  let testEmoji = '🟦'
  const toggle = () => {
    toggleValue = !toggleValue
  }

  const callbacks = callbackMaker()
  const onTestComplete = callbacks(success => testEmoji = success ? '✅' : '❌')

  // if I am destroyed before my test runs, prevent test from running
  onDestroy(function appOnDestroy() {
    clearTimeout(testTimeout as any)
    testTimeout = null
  })

  console.info('1️⃣ app init should only run once')

  fireTesting(false, onTestComplete)

  appCounterSubject.subscribe(
    callbacks(x => appCounter = x)
  )

  function fireTesting(
    manual = true,
    onComplete: (success: boolean) => any = () => undefined,
  ) {
    testEmoji = '🟦'
    const waitFor = 2000
    testTimeout = setTimeout(async () => {
      console.debug('🏃 🏃‍♀️ 🏃‍♂️ Running tests... 🏃‍♂️‍➡️ 🏃‍♀️‍➡️ 🏃‍➡️x')
      const result = await runTests()

      onComplete(result)

      if(!manual) {
        return
      }

      if(result) {
        alert('✅ all app tests passed')
        return
      }

      alert('❌ tests failed. See console for more details')
    }, waitFor) as any // cause delay to be separate from renders
  }

  ++renderCount

  return div(
    button({
      onClick: () => fireTesting(true, onTestComplete)
    }, 'run tests ', testEmoji),

    fieldset(
      legend('direct app tests'),
      button({
        id: "app-counter-subject-button",
        onClick: () => {
          appCounterSubject.next(appCounter + 1)
        }
      }, '🍒 ++app subject'),
      button({
        id: "app-counter-button",
        onClick: () => ++appCounter
      }, '🍒 ++app'),
      span(
        '🍒 ',
        span({id: "app-counter-display"}, _=> appCounter)
      ),
      span(
        '🍒$<',
        span({id: "app-counter-subject-display"}, _=> subscribe(appCounterSubject)),
        '>'
      ),
      span(
        '🍒$.value<',
        span({id: "app-counter-subject-value-display"}, _=> appCounterSubject.value),
        '>'
      ),
      button({
        id: "toggle-test",
        onClick: () => toggle()
      }, 'toggle test ', _=> toggleValue)
    ),

    div({style: "display:flex;flex-wrap:nowrap;gap:1em;justify-content: center;"},
      _=> renderCountDiv({name:'app', renderCount}),
      div(
        small(
          '(subscription count: ',
          subscribe(Subject.globalSubCount$),
          ')'
        )
      )
    ),

    a({name: "top", id: "top"}),

    sectionSelector(),

    div({id: "tagDebug-fx-wrap"},
      button({
        onClick: () => showSections = !showSections
      }, 'toggle sections'),

      _=> showSections && renderedSections(appCounterSubject),

      tagDebug(),
    )
  )
})