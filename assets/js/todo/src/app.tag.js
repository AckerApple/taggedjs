import { Header } from './tags/header.tag';
import { Footer } from './tags/footer.tag';
import { todoReducer } from './reducer';
import { html, tag } from 'taggedjs';
import { useHashRouter } from './HashRouter.function';
import { Item } from './tags/item.tag';
export const todos = [];
const dispatch = todoReducer(todos);
export const app = () => {
    const route = useHashRouter().route;
    return html `
    ${route === '/info' ? infoTag() : todosTag(route)}
    <a href="#/info">info</a>
    &nbsp;&nbsp;&nbsp;
    <a href="#/">todo app</a>
  `;
};
const infoTag = () => html `
  <div style="margin:2rem;padding:2rem;background-color:white;">
    🚧 A work in progress to demonstrate the capabilities of TaggedJs
  </div>
`;
const todosTag = (route) => tag.use = (activeTodoCount = todos.filter((todo) => !todo.completed).length, isActiveRoute = route === "/active", isCompletedRoute = route === "/completed", visibleTodos = isActiveRoute && todos.filter(todo => !todo.completed) ||
    isCompletedRoute && todos.filter(todo => todo.completed) || todos, todoCount = todos.length) => html `
  <section class="todoapp">
    ${Header(dispatch)}
    ${todoCount > 0 && html `
      <main class="main">
        <div class="toggle-all-container">
          <input id="toggle-all" class="toggle-all" type="checkbox" checked=${activeTodoCount < 1} onChange=${e => dispatch.toggleAll(e.target.checked)} />
          <label class="toggle-all-label" for="toggle-all">
            Toggle All Input
          </label>
        </div>
        <ul class="todo-list show-priority">
          ${visibleTodos.map((todo, index) => Item(todo, dispatch, index).key(todo.id))}
        </ul>
      </main>
      ${Footer(todoCount, dispatch.removeCompleted, route, activeTodoCount)}
    `}
  </section>
`;
//# sourceMappingURL=app.tag.js.map