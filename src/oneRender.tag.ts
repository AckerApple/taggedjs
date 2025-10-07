import { html, states, Subject, subject, tag, ValueSubjective, signal, subscribe, noElement, div, span, button, hr, fieldset, legend } from "taggedjs"
import { renderCountDiv } from "./renderCount.component.js"

let outsideCount = 0

/** this tag renders only once */
export const oneRender = tag(() => {
  const counter = new ValueSubjective(0)
  let renderCount = 0
  
  ++renderCount
  ++outsideCount

  const x = Subject.all([0, 'all', 4])

  if(outsideCount > 1) {
    throw new Error('issue started!')
  }
  
  return noElement(
    subscribe(x.pipe(x => JSON.stringify(x))),
    
    div(
      span('👍',
        span({id:"👍-counter-display"}, subscribe(counter, x => x)
        )
      ),
      
      button({type:"button", id:"👍-counter-button",
        onClick: () => {
          ++counter.value
          counter.next(counter.value)
          console.log('counter.value',{
            value: counter.value,
            counter,
          })
        }
      }, '++👍')
    ),

    _=> renderCountDiv({renderCount, name:'oneRender_tag_ts'}),

    hr,

    fieldset(
      legend('insideMultiRender'),
      _=> insideMultiRender(),
    )
  )

})

/** this tag renders on every event but should not cause parent to re-render */
const insideMultiRender = tag(() => (
  counter$ = subject(0),
  counterSignal$ = signal(0),
  
  counter = 0,
  renderCount = 0, // state can be used but it never updates
  _ = states(get => [{renderCount, counter}] = get({renderCount, counter})),
) => {
  ++renderCount
  return html`
  <div>👍🔨 sub counter-subject-display:<span id="👍🔨-counter-subject-display">${subscribe(counter$)}</span></div>
  <div>👍📡 signal counter:<span id="📡-signal-counter-display">${counterSignal$}</span></div>
  <br />
  <span>👍🔨 sub counter<span id="👍🔨-counter-display">${counter}</span></span>
  <br />
  <button type="button" id="👍🔨-counter-button"
    onclick=${() => {
      ++counter
      counter$.next(counter)
      counterSignal$.value = counter
    }}
  >++👍👍</button>
  ${renderCountDiv({renderCount, name:'insideMultiRender'})}
`
})
