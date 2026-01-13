import { button, span, div, strong, hr, states, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { funInPropsChild } from "./funInPropsChild.tag";
import { addArrayComponent } from "./addArrayComponent.tag";

export const main = {
  function: () => ++main.count,
  count: 0,
}

export default tag(() => (
  array = [] as string[],
  counter = 0,
  renderCount = 0,
  showChild = true,
  // somethingElse = 'a',
  myFunction = () => ++counter,

  _ = ++renderCount,
  addArrayItem = (x?: string) => {
    array = array.map(x => x)
    array.push(typeof(x) === 'string' ? x : 'push'+array.length)
  },
  deleteItem = (item: string) => array = array.filter(x => x !== item),
) =>
  div(
    button({id: "fun-parent-button", onClick: myFunction},
      '🤰 ++parent'
    ),
    span({id: "fun_in_prop_display"}, _=> counter),
    
    _=> renderCountDiv({renderCount, name:'funInProps_tag_parent'}),

    div(
      strong('🆎 main:'),
      _=> main.count
    ),

    button
      .id`toggle-fun-in-child`
      .type`button`
      .onClick(() => showChild = !showChild)
      ('toggle child'),
    
    'array length: ',
    array.length,

    button({onClick: () => addArrayItem()}, 'reset add'),

    hr,

    _=> showChild && funInPropsChild({
      myFunction, array, addArrayItem, deleteItem,
      child: {myChildFunction: myFunction}
    }, main, myFunction),

    _=> addArrayComponent(addArrayItem)
  )
)
