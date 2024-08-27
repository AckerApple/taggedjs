import { html, tag } from "taggedjs";
import { Dispatch } from "../reducer";

export const Footer = (
  todos: any,
  dispatch: Dispatch,
  route: any,
) => tag.state = (
    activeTodoCount = todos.filter((todo: any) => !todo.completed).length,
) => html`
    <footer class="footer" data-testid="footer">
        <span class="todo-count">${activeTodoCount} ${activeTodoCount === 1 ? "item" : "items"} left!</span>
        <ul class="filters">
            <li><a class.selected=${route === "/" } href="#/">All</a></li>
            <li><a class.selected=${route === "/active" } href="#/active">Active</a></li>
            <li><a class.selected=${route === "/completed" } href="#/completed">Completed</a></li>
        </ul>
        ${(todos.length - activeTodoCount) > 0 && html`
            <button class="clear-completed" onClick=${() => dispatch.removeCompleted()}>
                Clear completed
            </button>
        `}
    </footer>
`;
