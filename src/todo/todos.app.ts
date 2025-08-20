import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { Todo, todoReducer } from "./reducer.js";
import { html, InputElementTargetEvent } from "taggedjs";
import { useHashRouter } from "./HashRouter.function.js";
import { Item } from "./components/item.js";

export const todos: Todo[] = []
const dispatch = todoReducer(todos)

export const todoApp = () => {
    const route = useHashRouter().route
    const activeTodoCount = todos.filter((todo) => !todo.completed).length
    const isActiveRoute = route === "/active"
    const isCompletedRoute = route === "/completed"
    const visibleTodos = isActiveRoute && todos.filter(todo => !todo.completed) ||
        isCompletedRoute && todos.filter(todo => todo.completed) || todos

    const todoCount = todos.length

    const newMap = visibleTodos.map((todo, index) => {
      return Item(todo, dispatch, index).key(todo.id)
    })

    return html`
        ${/*autoTestingControls([ViewTypes.Todo], false)*/false}
        ${Header(dispatch)}
        ${todoCount > 0 && html`
            <main class="main">
                <div class="toggle-all-container">
                    <input
                        id="toggle-all"
                        class="toggle-all"
                        type="checkbox"
                        checked=${activeTodoCount < 1 ? 1 : 0}
                        onChange=${(e: InputElementTargetEvent) => dispatch.toggleAll(e.target.checked)}
                    />
                    <label class="toggle-all-label" for="toggle-all">
                        Toggle All Input
                    </label>
                </div>
                <ul class="todo-list show-priority">
                    ${newMap}
                </ul>
            </main>
            ${Footer(todoCount, dispatch.removeCompleted, route, activeTodoCount)}
        `}
    `;
}
