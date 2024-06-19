import { Header } from "./components/header"
import { Main } from "./components/main"
import { Footer } from "./components/footer"
import { todoReducer } from "./reducer"
import { letState, html, tag } from "taggedjs"

export const App = tag(() => (
  todos = letState([] as any[])(x => [todos, todos = x]),
  dispatch = (payload: string) => {
    todos = todoReducer(todos, payload)
  },
) => html`<!-- TODO APP -->
  todo app
    ${Header(dispatch)}
    ${Main({todos, dispatch})}
    ${Footer(todos, dispatch)}
  `
)
