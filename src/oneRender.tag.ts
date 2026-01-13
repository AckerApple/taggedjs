import { Subject, subject, tag, ValueSubjective, signal, subscribe, noElement, div, span, button, hr, fieldset, legend, br } from "taggedjs"
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
        span(
          {id:"👍-counter-display"},
          subscribe(counter, x => x)
        )
      ),
      
      button({type:"button", id:"👍-counter-button",
        onClick: () => {
          ++counter.value
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
const insideMultiRender = tag(() => {
  const counter$ = subject(0)
  const counterSignal$ = signal(0)
  
  let counter = 0
  let renderCount = 0 // state can be used but it never updates
  
  ++renderCount
  
  return noElement(
    div(
      '👍🔨 sub counter-subject-display:',
      span({id: "👍🔨-counter-subject-display"}, subscribe(counter$))
    ),
    div(
      '👍📡 signal counter:',
      span({id: "📡-signal-counter-display"}, counterSignal$)
    ),
    
    br,
    
    span(
      '👍🔨 sub counter: ',
      span({id: "👍🔨-counter-display"}, _=> counter)
    ),
    
    br,
    
    button({
      type: "button",
      id: "👍🔨-counter-button",
      onClick: () => {
        ++counter
        counter$.next(counter)
        counterSignal$.value = counter
      }
    }, '++👍👍'),
    _=> renderCountDiv({renderCount, name:'insideMultiRender'})
  )
})
