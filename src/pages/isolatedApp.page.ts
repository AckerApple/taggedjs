import { Subject, callbackMaker, h1, div, button, span, fieldset, legend, tag, state } from "taggedjs"
import { child } from "../childTests.tag.js"
import { arrays } from "../arrays.tag.js"
import { tagSwitchDebug } from "../tagSwitchDebug.component.js"
import { mirroring } from "../mirroring.tag.js"
import { propsDebugMain } from "../props.tag.js"
import { providerDebug } from "../providers.tag.js"
import { counters } from "../countersDebug.js"
import { tableDebug } from "../tableDebug.component.js"
import { content } from "../content.tag.js"
import { watchTesting } from "../watchTesting.tag.js"
import { oneRender } from "../oneRender.tag.js"
import { renderCountDiv } from "../renderCount.component.js"

type viewTypes = 'oneRender' | 'watchTesting' | 'mirroring' | 'content' | 'arrays' | 'counters' | 'tableDebug' | 'props' | 'child' | 'tagSwitchDebug' | 'providerDebug'

export default tag.route = tag(() => {
  const views: viewTypes[] = [
    'content',
    'oneRender',
  ]
  
  let renderCount = 0
  let appCounter = 0

  const appCounterSubject = state(() => new Subject(appCounter))
  const callback = callbackMaker()

  console.info('1️⃣ app init should only run once')    

  appCounterSubject.subscribe(
    callback(x => {
      appCounter = x
    })
  )

  ++renderCount

  return div(
    h1({id: "app"}, '🏷️ TaggedJs - isolated'),

    div(
      button({
        id: "app-counter-subject-button",
        onClick: () => appCounterSubject.next(appCounter + 1)
      }, '🍒 ++app subject'),
      span(
        '🍒 ',
        span({id: "app-counter-subject-display"}, _=> appCounter)
      )
    ),

    div({id: "tagDebug-fx-wrap"},
      div({style: "display:flex;flex-wrap:wrap;gap:1em"},
        _=> [
          {view:'oneRender', label:'oneRender', tag: oneRender},
          {view:'props', label:'propsDebugMain', tag: propsDebugMain},
          {view:'watchTesting', label:'watchTesting', tag: watchTesting},
          {view:'tableDebug', label:'tableDebug', tag: tableDebug},
          {view:'providerDebug', label:'providerDebug', tag: providerDebug},
          {view:'tagSwitchDebug', label:'tagSwitchDebug', tag: tagSwitchDebug},
          {view:'mirroring', label:'mirroring', tag: mirroring},
          {view:'arrays', label:'arrays', tag: arrays},
          {view:'content', label:'content', tag: content},
          {view:'child', label:'child', tag: child},
        ].map(({view, label, tag}) =>
          views.includes(view as viewTypes) && fieldset({style: "flex:2 2 20em"},
            legend(_=> label),
            _=> tag()
          ).key(view)
        ),

        _=> views.includes('counters') && fieldset({style: "flex:2 2 20em"},
          legend('counters'),
          _=> counters({appCounterSubject})
        ),
      ),
      renderCountDiv({renderCount, name:'isolatedApp'})
    )
  )
})
