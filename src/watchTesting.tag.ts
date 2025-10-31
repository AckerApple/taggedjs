import { watch, tag, subscribe, div, span, button, fieldset, legend, small, getContextInCycle } from "taggedjs"

export const watchTesting = tag(() => {
  let stateNum = 0
  let stateNumChangeCount = 0
  let nothing = 0
  let slowChangeCount = 0
  let subjectChangeCount = 0
  let truthChange = false
  let truthChangeCount = 0
  let truthSubChangeCount = 0
  let watchPropNumSlow: number | undefined
  let watchTruth: number | undefined
  
  watch(() => [stateNum], () => {
    ++stateNumChangeCount
  })
  watch.noInit(() => [stateNum], () => watchPropNumSlow = ++slowChangeCount)
  watch.truthy(() => [truthChange], () => {
    watchTruth = ++truthChangeCount
    return truthChangeCount
  })



  const watchPropNumSubject = watch.asSubject(() => [stateNum], () => {
    return ++subjectChangeCount
  })

  const watchTruthAsSub = watch.truthy.asSubject(() => [truthChange], (truthChange) => {
    ++truthSubChangeCount

    return truthSubChangeCount
  })

  return div(
    'stateNum:',
    span({id: "watch-testing-num-display"}, _=> stateNum),
    button({
      id: "watch-testing-num-button",
      type: "button",
      onClick: () => ++stateNum
    }, '++stateNum'),
    button({
      id: "watch-testing-nothing-button",
      type: "button",
      onClick: () => ++nothing
    }, '++nothing'),
    div(
      small(
        'stateNumChangeCount:',
        span({id: "stateNumChangeCount"}, _=> stateNumChangeCount)
      )
    ),
    fieldset(
      legend('🍄 slowChangeCount'),
      div(
        small(
          span({id: "🍄-slowChangeCount"}, _=> slowChangeCount)
        )
      ),
      div(
        small(
          'watchPropNumSlow:',
          span({id: "🍄-watchPropNumSlow"}, _=> watchPropNumSlow)
        )
      )
    ),
    fieldset(
      legend('🍄‍🟫 subjectChangeCount'),
      div(
        small(
          span({id: "🍄‍🟫-subjectChangeCount"}, _=> subjectChangeCount)
        )
      ),
      div(
        small(
          '(watchPropNumSubject$:',
          span({id: "🍄‍🟫-watchPropNumSubject"},
            subscribe(watchPropNumSubject, x => {
              return x
            })
          ),
          ')'
        )
      )
    ),
    fieldset(
      legend('🦷 truthChange'),
      div(
        small(
          span({id: "🦷-truthChange"}, _=> truthChange ? 'true' : 'false')
        )
      ),
      fieldset(
        legend('simple truth'),
        div(
          small(
            'watchTruth:',
            span({id: "🦷-watchTruth"}, _=> watchTruth || 'false')
          )
        ),
        div(
          small(
            '(truthChangeCount:',
            span({id: "🦷-truthChangeCount"}, _=> truthChangeCount),
            ')'
          )
        )
      ),
      fieldset(
        legend('truth subject'),
        div(
          small(
            'watchTruthAsSub$:',
            span({id: "🦷-watchTruthAsSub"}, subscribe(watchTruthAsSub, x => {
              return x
            }))
          )
        ),
        div(
          small(
            '(truthSubChangeCount:',
            span({id: "🦷-truthSubChangeCount"}, _=> truthSubChangeCount),
            ')'
          )
        )
      ),
      button({
        id: "🦷-truthChange-button",
        type: "button",
        onClick: () => {
          truthChange = !truthChange
        }
      }, _=> `🦷 toggle to ${truthChange ? 'true' : 'false'}`)
    )
  )
})
