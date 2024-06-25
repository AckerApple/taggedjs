import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";
import { html, letState, state, tag } from "taggedjs";

export const Item = (
  todo: any,
  dispatch: any,
) => tag.state = (
  _ = state('item'), // helpful when debugging states
  editing = letState(false)(x => [editing, editing = x]),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
) => {
  const { title, completed, id } = todo

  const toggleItem = () => dispatch({ type: TOGGLE_ITEM, payload: { id } })
  const removeItem = () => dispatch({ type: REMOVE_ITEM, payload: { id } })
  const updateItem = (id: string, title: string) => dispatch({ type: UPDATE_ITEM, payload: { id, title } })

  const handleDoubleClick = () => {
    editing = true
  }

  const handleBlur = () => editing = false

  const handleUpdate = (title: string) => {
    if (title.length === 0)
      removeItem()
    else
      updateItem(id, title)

    editing = false
  }

  ++renderCount

  return html`
    <li class.completed=${todo.completed}
      style="border:1px solid orange;"
    >
      <div class="view">
        editing:${editing ? 'true' : 'false'}

        <div style.display=${editing ? 'none' : 'block'}>
          <input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=${completed} onChange=${toggleItem} />
          <label data-testid="todo-item-label" onDoubleClick=${handleDoubleClick}>
              ${title}
          </label>
          <button class="destroy" data-testid="todo-item-button" onClick=${removeItem}>x</button>
        </div>
        
        <div style.display=${editing ? 'block' : 'none'}>
          <input class="new-todo" id="todo-input" type="text"
            data-testid="text-input" autofocus
            value=${title}
            onblur=${handleBlur}
            onKeyUp=${e => handleKeyUp(e,handleUpdate)}
          />
          <label class="visually-hidden" htmlFor="todo-input">
            Edit Todo Input
          </label>
        </div>

        <button class="destroy" onClick=${() => editing = !editing}
        >edit</button>
      </div>
      item render count: ${renderCount}
    </li>
  `
}

export const hasValidMin = (value: any, min: number) => {
  return value.length >= min;
};

export const handleKeyUp = (e: any, onSubmit: (title: string) => any) => {
  if (e.key === "Enter") {
      const value = e.target.value.trim();

      if (!hasValidMin(value, 2))
          return;

      onSubmit(value);
      e.target.value = "";
  }
};
