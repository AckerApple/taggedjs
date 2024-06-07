import { Item } from "./item";

import { TOGGLE_ALL } from "../constants";
import { html, letState, tag, watch } from "taggedjs";

const route = '' as string // active or completed

export const Main = tag(({todos, dispatch}) => {
    let renderCount = letState(0)(x => [renderCount, renderCount = x])
    const toggleAll = (e: any) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } })
    ++renderCount
    const visibleTodos = watch([todos, route],
        () => {
            return todos.filter((todo: any) => {
            if (route === "/active")
                return !todo.completed;

            if (route === "/completed")
                return todo.completed;

            return todo;
        })},
    );

    return html`
        <main class="main" data-testid="main">
            main renderCount: ${renderCount} array:${visibleTodos.length} of ${todos.length}
            <hr />
            ${JSON.stringify(todos)}
            <hr />
            ${visibleTodos.length > 0 && html`
                <div class="toggle-all-container">
                    <input class="toggle-all" type="checkbox" data-testid="toggle-all" checked=${visibleTodos.every((todo: any) => todo.completed)} onChange=${toggleAll} />
                    <label class="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            `}
            <ul class="todo-list" data-testid="todo-list">
                ${visibleTodos.map((todo: any, index: number) => html`
                    ${Item(todo, dispatch, index)}
                `.key(todo.id))}
            </ul>
        </main>
    `;
})
