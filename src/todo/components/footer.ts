import { tag, html } from "taggedjs";
import { Dispatch } from "../reducer";

export const Footer = tag.immutableProps((
  todosCount: number,
  removeCompleted: Function,
  route: string,
  activeTodoCount: number,
) => html`
    <footer class="footer" data-testid="footer">
        <span class="todo-count">${activeTodoCount} item${activeTodoCount > 1 && "s"} left!</span>
        <ul class="filters">
            <li><a id="todo-view-all-link" class.selected=${route === "/" } href="#/">All</a></li>
            <li><a id="todo-view-active-link" class.selected=${route === "/active" } href="#/active">Active</a></li>
            <li><a id="todo-view-completed-link" class.selected=${route === "/completed" } href="#/completed">Completed</a></li>
        </ul>
        ${(todosCount - activeTodoCount) > 0 && html`
            <button class="clear-completed" onclick=${() => removeCompleted()}>
                Clear completed
            </button>
        `}
    </footer>
`)