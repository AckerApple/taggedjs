import { button, span, div, strong, hr, states, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { funInPropsChild } from "./funInPropsChild.tag";
import { addArrayComponent } from "./addArrayComponent.tag";

export const main = {
  function: () => ++main.count,
  count: 0,
}

export default tag(() => {
  let array = [] as string[]
  let counter = 0
  let renderCount = 0
  let showChild = true
  // somethingElse = 'a',
  const myFunction = () => ++counter

  ++renderCount
  
  const addArrayItem = (x?: string) => {
    array = array.map(x => x)
    array.push(typeof(x) === 'string' ? x : 'push'+array.length)
  }

  const deleteItem = (item: string) => array = array.filter(x => x !== item)

  return div(
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
})
