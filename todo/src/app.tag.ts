import { Header } from './tags/header.tag'
import { Footer } from './tags/footer.tag'
import { Todo, todoReducer } from './reducer'
import { html } from 'taggedjs'
import { useHashRouter } from './HashRouter.function'
import { Item } from './tags/item.tag'

export const todos: Todo[] = []
const dispatch = todoReducer(todos)

export const app = () => {
  const route = useHashRouter().route
  const activeTodoCount = todos.filter((todo) => !todo.completed).length
  const visibleTodos = todos.filter((todo) => {
    if (route === "/active")return !todo.completed
    if (route === "/completed") return todo.completed;
    return true;
  })
  const todoCount = todos.length

  return html`
    <section class="todoapp">
      ${Header(dispatch)}
      ${todoCount > 0 && html`
        <main class="main">
          <div class="toggle-all-container">
            <input id="toggle-all" class="toggle-all" type="checkbox" checked=${activeTodoCount < 1} onChange=${e => dispatch.toggleAll(e.target.checked)} />
            <label class="toggle-all-label" for="toggle-all">
              Toggle All Input
            </label>
          </div>
          <ul class="todo-list show-priority">
            ${visibleTodos.map((todo, index) =>
              Item(todo, dispatch, index).key(todo.id)
            )}
          </ul>
        </main>
        ${Footer(todoCount, dispatch.removeCompleted, route, activeTodoCount)}
      `}
    </section>
  `;
}

