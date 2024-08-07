import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { todoReducer } from "./reducer.js";
import { html, tag, key } from "taggedjs";
import { useHashRouter } from "./HashRouter.function.js";
import { Item } from "./components/item.js";
const todos = [];
const dispatch = todoReducer(todos);
export const App = () => tag.state = (route = useHashRouter().route, toggleAll = (e) => dispatch.toggleAll(e.target.checked), visibleTodos = todos.filter((todo) => {
    if (route === "/active")
        return !todo.completed;
    if (route === "/completed")
        return todo.completed;
    return todo;
})) => html `
    ${Header(dispatch)}
    start***
    ${todos.length > 0 && html `
        <main class="main">
            <div class="toggle-all-container">
                <input class="toggle-all" type="checkbox" checked=${visibleTodos.every((todo) => todo.completed)} onChange=${toggleAll} />
                <label class="toggle-all-label" htmlFor="toggle-all">
                    Toggle All Input
                </label>
            </div>
            <ul class="todo-list show-priority">
                ${visibleTodos.map((todo, index) => key(todo.id).html = Item(todo, dispatch, index))}
            </ul>
        </main>
        ${Footer(todos, dispatch, route)}
    `}
    ***end
`;
//# sourceMappingURL=todos.app.js.map