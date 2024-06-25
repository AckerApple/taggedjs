import { Item } from "./item";

import { TOGGLE_ALL } from "../constants";
import { html, letState, state, tag, watch } from "taggedjs";

type Todo = {
  completed: boolean
  id: string
}

export const Main = ({
  todos, dispatch
}: {
  todos: Todo[],
  dispatch: any,
}) => tag.state = (
  _ = state('main.ts'),
  renderCount = letState(0)(x => [renderCount, renderCount = x]),
  mode = letState('all')(x => [mode, mode = x]),
) => {
  const toggleAll = (e: any) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } })
  ++renderCount
  const visibleTodos: Todo[] = watch([todos, mode],
    () => {
      return todos.filter(todo => {
      if (mode === "/active")
        return !todo.completed

      if (mode === "/completed")
        return todo.completed

      return todo
    })},
  );

  return html`
    <main class="main" data-testid="main">
      main renderCount: ${renderCount} array:${visibleTodos.length} of ${todos.length}
      ${visibleTodos.length > 0 && html`
        <div class="toggle-all-container">
          <input class="toggle-all" type="checkbox" data-testid="toggle-all" checked=${visibleTodos.every((todo: any) => todo.completed)} onChange=${toggleAll} />
          <label class="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      `}
      <ul class="todo-list" data-testid="todo-list">
        ${visibleTodos.map(todo => tag.key(todo.id).html = Item(todo, dispatch))}
      </ul>
      <button style.font-weight="mode = 'all'" onclick=${() => mode = 'all'}>all</button>
      <button style.font-weight="mode = '/active'" onclick=${() => mode = '/active'}>active</button>
      <button style.font-weight="mode = '/completed'" onclick=${() => mode = '/completed'}>completed</button>
    </main>
  `
}
