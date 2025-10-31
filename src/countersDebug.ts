import { mouseOverTag } from "./mouseover.tag.js"
import { renderCountDiv } from "./renderCount.component.js"
import { states, html, tag, Subject, callbackMaker, state, ValueSubject, callback, subject, subscribe, host, div, button, span, input, fieldset, legend, small } from "taggedjs"

const loadStartTime = Date.now()

const test = tag(() => {
  return div('hello complex world')
  /*
  test.render(
    div('hello complex world')
  )

  return div('hello simple world')*/
})

export const counters = tag.immutableProps(({
  appCounterSubject
}: {
  appCounterSubject: Subject<number>
},
_ = 'countersDebug'
) => {
  return div(
    '<!--counters-->',
    test(),
    div({style:"display:flex;flex-wrap:wrap;gap:1em"},
      div(
        '👉 SubscriptionCount$:',
        span({id:"👉-counter-sub-count"},
          subscribe((Subject as any).globalSubCount$)
        )
      ),
      button({
        onClick: () => console.info('subs', (Subject as any).globalSubs)
      }, 'log subs'),

      div(
        button({
          id: "counters-app-counter-subject-button",
          onClick: () => appCounterSubject.next((appCounterSubject.value || 0) + 1)
        }, '🍒 ++app subject'),
        span(
          '🍒 ',
          span({id:"app-counters-display"}, subscribe(appCounterSubject))
        ),
        span(
          '🍒 ',
          span({id:"app-counters-subject-display"}, appCounterSubject.value)
        )
      )
    ),
    
    innerCounterContent()
  )
})

const innerCounters = tag(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  let otherCounter = 0
  let renderCount = 0
  let elmInitCount = 0
  
  ++renderCount // for debugging

  innerCounters.updates(x => {
    ;[{propCounter, increasePropCounter}] = x
  })
  
  return div(
    div.attr(host.onInit(() => {
        return ++elmInitCount
    }))
    (
      {style: "display:flex;flex-wrap:wrap;gap:1em;"},
      div({style:"border:1px dashed black;padding:1em;"},
        '🔥 elmInitCount:',
        span({id:"🔥-init-counter"}, _=> {
          return elmInitCount
        })
      ),

      div({style:"border:1px dashed black;padding:1em;"},
        button({
          id: "❤️-inner-counter",
          onClick: increasePropCounter
        }, '❤️-inner-counter propCounter:', _=> {
            return propCounter
          }),
        span(
          '❤️ ',
          span({id:"❤️-inner-display"}, _=> propCounter)
        )
      ),

      div({style:"border:1px dashed black;padding:1em;"},
        button({
          id: "🤿-deep-counter",
          onClick: () => ++otherCounter
        }, '🤿 otherCounter:', _=> otherCounter),
        span(
          '🤿 ',
          span({id:"🤿-deep-display"}, _=> otherCounter)
        )
      )
    ),
    div('renderCount:', _=> renderCount),
    _=> renderCountDiv({renderCount, name: 'inner_counters'})
  )
})

const shallowPropCounters = tag.watchProps(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  let otherCounter = 0
  let renderCount = 0
  states(get => [{otherCounter, renderCount}] = get({otherCounter, renderCount}))

  ++renderCount // for debugging

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px dashed black;padding:1em;">
        <button id="❤️💧-shallow-counter" onclick=${increasePropCounter}
        >❤️💧 propCounter:${propCounter}</button>
        <span>
          ❤️💧 <span id="❤️💧-shallow-display">${propCounter}</span>
        </span>
      </div>

      <div style="border:1px dashed black;padding:1em;">
        <button id="💧-shallow-counter" onclick=${() => ++otherCounter}
        >💧 otherCounter:${otherCounter}</button>
        <span>
          💧 <span id="💧-shallow-display">${otherCounter}</span>
        </span>
      </div>
    </div>
    
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'shallow_counters'})}
  `
})

const immutablePropCounters = tag.immutableProps(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  let otherCounter = 0
  let renderCount = 0
  states(get => [{otherCounter, renderCount}] = get({otherCounter, renderCount}))

  ++renderCount // for debugging

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px dashed black;padding:1em;">
        <button id="❤️🪨-immutable-counter" onclick=${increasePropCounter}
        >❤️🪨 propCounter:${propCounter}</button>
        <span>
          ❤️🪨 <span id="❤️🪨-immutable-display">${propCounter}</span>
        </span>
      </div>

      <div style="border:1px dashed black;padding:1em;">
        <button id="🪨-immutable-counter" onclick=${() => ++otherCounter}
        >🪨 otherCounter:${otherCounter}</button>
        <span>
        🪨 <span id="🪨-immutable-display">${otherCounter}</span>
        </span>
      </div>
    </div>
    
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'immutable_counters'})}
  `
})

const noWatchPropCounters = tag(({
  propCounter,
  increasePropCounter,
}: {
  propCounter: number,
  increasePropCounter: () => void
}) => {
  let otherCounter = 0
  let renderCount = 0
  let noWatchPropCounters = 'noWatchPropCounters' // just a name to pickup

  states(get => [{otherCounter, renderCount, noWatchPropCounters}] = get({otherCounter, renderCount, noWatchPropCounters}))

  ++renderCount // for debugging

  return html`
    <div style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px dashed black;padding:1em;">
        <button id="❤️🚫-nowatch-counter" onclick=${increasePropCounter}
        >❤️🚫 propCounter:${propCounter}</button>
        <span>
          ❤️🚫 <span id="❤️🚫-nowatch-display">${propCounter}</span>
        </span>
      </div>

      <div style="border:1px dashed black;padding:1em;">
        <button id="🚫-nowatch-counter" onclick=${() => ++otherCounter}
        >🚫 otherCounter:${otherCounter}</button>
        <span>
        🚫 <span id="🚫-nowatch-display">${otherCounter}</span>
        </span>
      </div>
    </div>
    
    <div>renderCount:${renderCount}</div>
    ${renderCountDiv({renderCount, name: 'nowatch_counters'})}
  `
})

export const innerCounterContent = tag(() => {
  let statesRenderCount = 0
  let statesRenderCount2 = 0  
  let counter = 0  
  let counter2 = 0  
  let renderCount = 0
  let propCounter = 0  
  let initCounter = 0

  let callbacks = callbackMaker()
  let callbackTo = callback(z => {
    counter2 = z as number
  })


  let increasePropCounter = () => {
    ++propCounter
  }

  let immutableProps = {propCounter, increasePropCounter}

  let callbackTestSub = new Subject(counter)
  let callbackTestSub2 = new Subject(0)
  let callbackTestSub3 = new Subject()
  let pipedSubject0 = new ValueSubject('222')

  // State as a callback only needed so pipedSubject1 has the latest value
  let increaseCounter = () => {
    ++counter
    pipedSubject0.next('333-' + counter)
  }

  let pipedSubject1 = Subject.all([pipedSubject0, callbackTestSub])
  let pipedSubject2 = subject.all([pipedSubject0, callbackTestSub])
  let pipedSubject3 = subject.all([pipedSubject0, callbackTestSub, callbackTestSub3])
  let memory = {counter: 0}
  // create an object that remains the same
  let readStartTime = Date.now()

  ++initCounter
  console.info('countersDebug.ts: 👉 i should only ever run once')

  const sub0 = callbackTestSub.subscribe(
    callbacks(y => {
      counter = y
    })
  )

  const sub1 = callbackTestSub.subscribe(callbackTo)

  tag.onDestroy(() => {
    sub0.unsubscribe()
    sub1.unsubscribe()
  })

  if(immutableProps.propCounter !== propCounter) {
    immutableProps = {propCounter, increasePropCounter}
  }

  ++renderCount // for debugging

  return div(
    div('initCounter:', _=> initCounter),
    
    div(
      '😱 statesRenderCount:', _=> statesRenderCount,
      button({
        type: "button",
        onClick: () => {
          ++statesRenderCount
        }
      }, '😱 ++statesRenderCount')
    ),

    div(
      '😱😱 statesRenderCount2:', _=> statesRenderCount2,
      button({
        type: "button",
        onClick: () => {
          ++statesRenderCount2
        },
      }, '😱😱 ++statesRenderCount2')
    ),

    div({style:"display:flex;flex-wrap:wrap;gap:1em"},
      input({
        id: "set-main-counter-input",
        placeholder: "input counter value",
        onKeyup: e => (counter = Number(e.target.value) || 0)
      }),

      div(
        button({
          id: "❤️-increase-counter",
          onClick: increasePropCounter
        }, '❤️ propCounter:', _=> propCounter),
        span(
          '❤️ ',
          span({id:"❤️-counter-display"}, _=> propCounter)
        )
      ),
    
      div(
        button({
          id: "🥦-standalone-counter",
          onClick: increaseCounter,
        },'🥦 stand alone counters'),
        span(
          '🥦 ',
          span({id:"🥦-standalone-display"}, _=> counter)
        )
      ),
    
      _=> counter > 1 && div(
        button({
          id: "conditional-counter",
          onClick: increaseCounter,
        }, 'conditional counter:', _=> counter)),
        
        span(
          '🥦 ',
          span({id:"conditional-display"}, _=> counter),
        )
    ),
    
    div(
      button({
        id: "🥦-subject-increase-counter",
        onClick: () => callbackTestSub.next(counter + 1)
      }, '++subject<>'),
      span(
        '🥦<',
        span({id:"subject-counter-subject-display"},
          subscribe(callbackTestSub)
        ),
        '>'
      )
    ),

    div(
      button({
        id: "🥦-subject-increase-async-counter",
        onClick: () => {
          setTimeout(() => {
            callbackTestSub2.next(callbackTestSub2.value as number + 1)
          }, 10)
        }
      }, '🔀 🥦 ++subject<>'),
      span(
        '🔀 🥦<',
        span({id:"subject-async-counter-subject-display"},
          subscribe(callbackTestSub2)
        ),
        '>'
      )
    ),
  
    fieldset(
      legend('🪈 pipedSubject 1'),
      div(
        small(
          span({id:"🪈-pipedSubject"},
            subscribe(pipedSubject1, () => counter)
          )
        )
      )
    ),

    fieldset(
      legend('🪈 pipedSubject 2'),
      div(
        small(
          span({id:"🪈-pipedSubject-2"},
            subscribe(pipedSubject2, () => counter)
          )
        )
      )
    ),

    fieldset(
      legend('🪈 pipedSubject 3'),
      div(
        small(
          span({id:"🪈-pipedSubject-3"}, subscribe(pipedSubject3, (a) => {
            return 'hello world'
          }))
        )
      )
    ),

    fieldset(
      legend('shared memory'),
      div({
          class: { bold: true, 'text-blue': true },
          style: "display:flex;flex-wrap:wrap;gap:.5em"
        },
        _=> mouseOverTag({label: 'a-a-😻', memory}),
        _=> mouseOverTag({label: 'b-b-😻', memory})
      ),
      'memory.counter:😻', _=> memory.counter,
      button({onClick: () => ++memory.counter}, 'increase 😻')
    ),
    
    fieldset(
      legend('inner counter'),
      _=> innerCounters({propCounter, increasePropCounter})
    ),

    fieldset(
      legend('shallow props'),
      _=> shallowPropCounters({propCounter, increasePropCounter})
    ),

    fieldset(
      legend('immutable props'),
      _=> immutablePropCounters(immutableProps)
    ),

    fieldset(
      legend('nowatch props'),
      _=> noWatchPropCounters({propCounter, increasePropCounter})
    ),

    div({style:"font-size:0.8em;opacity:0.8"},
      '⌚️ page load to display in\u00A0',
      span.attr(
        host.onInit((element) => element.innerText = (Date.now()-loadStartTime).toString())
      )('-'),
      'ms'
    ),
    div({style:"font-size:0.8em;opacity:0.8"},
      '⌚️ read in\u00A0',
      span.attr(
        host.onInit((element) => element.innerText = (Date.now()-readStartTime).toString())
      )('-'),
      'ms'
    ),

    _=> renderCountDiv({renderCount, name: 'counters'}),
  )
})
