import { button, div, tag } from "taggedjs"

export const arrayFunTag = tag((item, deleteItem) => {
  return div({style:"border:1px solid black;"},
    _=> item,
    button({type:"button", onClick:() => deleteItem(item)},
      'delete'
    ),
  )
})
