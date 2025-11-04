import { div, button, span, strong, output, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { arrayFunTag } from "./arrayFun.tag";
import { main } from "./funInProps.tag";

export const funInPropsChild = tag((
  arg0: {
    array: unknown[],
    addArrayItem: (x: any) => any,
    myFunction: () => any,
    deleteItem: (x: string) => any,
    child: {myChildFunction: () => any}
  },
  mainProp: typeof main,
  myFunction3: () => any
) => {
  funInPropsChild.updates(x => [arg0, mainProp, myFunction3] = x)

  let other = 'other'
  let counter = 0
  let renderCount = 0

  ++renderCount

  const {addArrayItem, myFunction, deleteItem, child, array} = arg0

  return div(
    div(
      strong('mainFunction:'),
      _=> (mainProp.function as any).original ? 'taggjedjs-wrapped' : 'nowrap',
      ':',
      span(_=> mainProp.count)
    ),
    div(
      strong('childFunction:'),
      _=> (child.myChildFunction as any).original ? 'taggjedjs-wrapped' : 'nowrap'
    ),
    div(
      strong('myFunction:'),
      (myFunction as any).original ? 'taggjedjs-wrapped' : 'nowrap'
    ),

    button({
        id: "fun_in_prop1",
        onClick: myFunction
      },
      '🤰 ++object argument'
    ),
    button({
        id: "fun_in_prop2", 
        onClick: output(child.myChildFunction)
      },
      '🤰 ++child.myChildFunction'
    ),
    button({
        id: "fun_in_prop3",
        onClick: myFunction3
      },
      '+🤰 +argument'
    ),
    button({onClick: main.function}, '🆎 ++main'),
    button({onClick: () => ++counter}, '++me'),

    div(
      'child array length: ',
      _=> array.length,
      _=> array.map(item => arrayFunTag(item, deleteItem).key(item)),
      button({onClick: addArrayItem}, 'addArrayItem')
    ),

    div(
      'counter:',
      span(_=> counter)
    ),
    renderCountDiv({renderCount, name:'funInProps_tag_child'})
  )
})
