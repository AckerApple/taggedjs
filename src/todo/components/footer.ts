const classnames = (x: any) => ''


import { REMOVE_COMPLETED_ITEMS } from "../constants";
import { html, tag } from "taggedjs";

const route = '' as string// TODO
// const { pathname: route } = useLocation();
// prettier-ignore
// TODO: we should be able to do null here instead of html``

export const Footer = tag((
    todos, dispatch
) => (
    activeTodos = todos.filter((todo: any) => !todo.completed),
    removeCompleted = () => dispatch({ type: REMOVE_COMPLETED_ITEMS }),
) => todos.length === 0 ? null : html`
    <footer class="footer" data-testid="footer">
        <span class="todo-count">${activeTodos.length} of ${todos.length} ${activeTodos.length === 1 ? "item" : "items"} left!</span>
        <ul class="filters" data-testid="footer-navigation">
            <li>
                <a class=${classnames({ selected: route === "/" })} href="#/">
                    All
                </a>
            </li>
            <li>
                <a class=${classnames({ selected: route === "/active" })} href="#/active">
                    Active
                </a>
            </li>
            <li>
                <a class=${classnames({ selected: route === "/completed" })} href="#/completed">
                    Completed
                </a>
            </li>
        </ul>
        <button class="clear-completed" disabled=${activeTodos.length === todos.length} onClick=${removeCompleted}>
            Clear completed
        </button>
    </footer>
`)
