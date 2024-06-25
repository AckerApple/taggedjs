const classnames = (x: any) => ''


import { REMOVE_COMPLETED_ITEMS } from "../constants";
import { html, state, tag } from "taggedjs";

const route = '' as string// TODO
// const { pathname: route } = useLocation();
// prettier-ignore
// TODO: we should be able to do null here instead of html``

export const Footer = (
  todos: any,
  dispatch: any,
) => tag.state = (
  _ = state('footer.ts'),
  activeTodos = todos.filter((todo: any) => !todo.completed),
  removeCompleted = () => dispatch({ type: REMOVE_COMPLETED_ITEMS }),
) => todos.length === 0 ? null : html`
  <footer class="footer" data-testid="footer">
    <span class="todo-count">${activeTodos.length} of ${todos.length} ${activeTodos.length === 1 ? "item" : "items"} left!</span>
    <button class="clear-completed" disabled=${activeTodos.length === todos.length} onClick=${removeCompleted}>
      Clear completed
    </button>
  </footer>
`
