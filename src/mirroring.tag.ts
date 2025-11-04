import { html, tag, states, fieldset, noElement, legend, span, button } from "taggedjs"

export const mirroring = tag(() => {
  const tag = tagCounter()

  return noElement(
    fieldset(
      legend('counter0'),
      _=> tag
    ),
    fieldset(
      legend('counter1'),
      _=> tag
    )
  )
})


const tagCounter = () => {
  let counter = 0

  return noElement(
    'counter:',
    span('🪞',
      span({id:"mirror-counter-display"}, _=> counter)
    ),
    button({
        id:"mirror-counter-button",
        onClick: () => ++counter,
      },
      _=> counter
    )
  )
}
