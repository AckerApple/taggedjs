import { Dispatch, Todo } from '../reducer.js'
import { tag, InputElementTargetEvent, li, div, input, label, button } from 'taggedjs'

export const Item = tag((
  todo: Todo,
  dispatch: Dispatch,
  index: number,
) => {
  Item.updates(x => {
    [todo, dispatch, index] = x
  })
  
  let editing = false
  const rtn = li.class(_=> ({
      completed: todo.completed,
      editing,
    }
  ))(
    _=> {
      return !editing ?
      div.class`view`(
        _=> todo.completed && '✅',
        
        input
          .type`button`
          .onClick((e: InputElementTargetEvent) => {
            return dispatch.toggleItem(todo, index)
          }).value`toggle`,
        
        input
          .class`toggle`
          .type`checkbox`
          .checked(_=> todo.completed)
          .onChange(() => dispatch.toggleItem(todo, index)),
        
        label.attr("data-testid", "todo-item-label")
          .onDoubleClick(() => editing = !editing)
          (_=> todo.title),
          
        button
          .class`destroy`
          .onClick(() => dispatch.removeItemByIndex(index))
          ('🗑️ destroy')
      )
    : div.class`input-container`(
    input
      .id`edit-todo-input`
      .type`text`
      .attr('autofocus', true)
      .class`edit`
      .value(todo.title)
      .onBlur(() => editing = false)
      .onKeyDown((e: InputElementTargetEvent) => handleKey(e, title => {
        handleUpdate(title, todo, index, dispatch)
        editing = false
      })),
      
      label
        .class`visually-hidden`
        .for`todo-input`
        ('Edit Todo Input')
    )}
  )

  return rtn
})

function handleUpdate(
  title: string,
  todo: Todo,
  index: number,
  dispatch: Dispatch,
) {
  if (title.length === 0) {
    dispatch.removeItem(todo.id)
    return
  }

  dispatch.updateToByIndex(todo, { title }, index)
}

export function handleKey(
  e: any,
  onValid: (title: string) => any,
) {
  if (e.key === "Enter") {
    const value = e.target.value.trim()
    onValid(value)
    return true
  }
};
