import { tag, isSubjectInstance, Tag, fieldset, div, legend, span, button } from "taggedjs"
import { renderCountDiv } from "./renderCount.component"

export const innerHtmlTest = tag((
  _props: unknown,
  b:number, // TODO: remove, not in use
  children: Tag,
) => {
  let counter = 0
  let renderCount = 0

  innerHtmlTest.updates(x => [_props, b, children] = x)

  ++renderCount

  return fieldset({id: "innerHtmlTests-1"},
    legend('no props test'),
    div({style:"border:2px solid purple;"}, _=> children),
    div(_=> `isSubjectInstance:${isSubjectInstance(children)}`),
    div(_=> `isSubjectTagArray:${children instanceof Array}`),
    
    button({
      id: "innerHtmlTest-counter-button",
      onClick: () => ++counter,
    }, _=> `increase innerHtmlTest ${counter}`),

    span({id:"innerHtmlTest-counter-display"}, _=> counter),
    _=> renderCountDiv({renderCount, name: 'innerHtmlTest'}),
  )
})

export const innerHtmlPropsTest = tag((
  x: number, children: Tag,
) => {
  innerHtmlPropsTest.updates(xx => [x, children] = xx)
  let counter = 0
  let renderCount = 0

  ++renderCount

  return fieldset(
    {id: "innerHtmlTests-2"},
    legend('innerHTML Props: ', _=> x),
    _=> children,
    button(
      {
        id: "innerHtmlPropsTest-button",
        onClick: () => ++counter
      },
      '🍉 increase innerHtmlPropsTest ',
      _=> counter
    ),
    span({id: "innerHtmlPropsTest-display"}, _=> counter)
  )
})
