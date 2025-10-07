import { Subject, callbackMaker, onInit, tag, state, states, subscribe, h1, div, button, span, fieldset, legend, small } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"
import { activate, sectionSelector, viewChanged, ViewTypes } from "./sectionSelector.tag"
import { renderedSections } from "./renderedSections.tag"
import { autoTestingControls } from "./autoTestingControls.tag"
import { menu } from "./menu.tag"
import { hashRouterSubject, useHashRouter } from "./todo/HashRouter.function"

export default tag(() => {
  const _ = 'isolated app state'
  let renderCount = 0
  let appCounter = 0
  const appCounterSubject = new Subject(appCounter)
  let toggleValue = false

  const toggle = () => toggleValue = !toggleValue
  // callback = callbackMaker(),

  const route = hashRouterSubject().value.route.split('/')
  // const route = useHashRouter().route.split('/')
    .map(x => x.trim())
    .filter(hasLength => hasLength.length)

  let viewTypes: ViewTypes[] | undefined = undefined

  if(route.length) {
    viewTypes = route as ViewTypes[]
  }

  console.info('1️⃣ app init should only run once')

  appCounterSubject.subscribe(x => appCounter = x
    // callback(x => {
    //appCounter = x
    // }) // a let variable is expected to maintain new value over render cycles forward
  )

  ++renderCount

  return div(
    '<!--isolatedApp.js-->',
    h1({id: "app"}, '🏷️ TaggedJs - isolated'),
    div({style: "opacity:.6"}, '(no HMR)'),
    div({style: "opacity:.6"}, 'route: ', route),

    menu(),

    div(
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
          onClick: () => {
            ++appCounter
          }
        }, '🍒 ++app'),
        
        span(
          '🍒 ',
          span({id: "app-counter-display"}, appCounter)
        ),
        
        span(
          '🍒$<',
          span({id: "app-counter-subject-display"},
            subscribe(appCounterSubject)
          ),
          '>'
        ),
        
        span(
          '🍒$.value<',
          span({id: "app-counter-subject-value-display"},
            _=> appCounterSubject.value
          ),
          '>'
        ),

        button({id: "toggle-test", onClick: toggle},
          'toggle test ',
          _=> toggleValue,
          'true'
        )
      ),

      autoTestingControls(viewTypes)
    ),

    div({style: "display:flex;flex-wrap:nowrap;gap:1em;justify-content: center;"},
      renderCountDiv({name:'app', renderCount}),
      div(
        small(
          '(subscription count: ',
          subscribe(Subject.globalSubCount$),
          ')'
        )
      )
    ),

    sectionSelector(viewTypes),

    div({id: "tagDebug-fx-wrap"},
      renderedSections(appCounterSubject, viewTypes),
      renderCountDiv({renderCount, name:'isolatedApp'})
    )
  )
})

viewChanged.subscribe(({type, checkTesting}) => {
  activate(type, checkTesting)
})