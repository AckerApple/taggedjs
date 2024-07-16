import { Header } from "./components/header"
import { Main } from "./components/main"
import { Footer } from "./components/footer"
import { todoReducer } from "./reducer"
import { letState, html, tag, state } from "taggedjs"

let renderCount = 0
export const App = () => tag.state = (
  _ = state('todos.app.ts'),
  // myCount = renderCount,
  todos = letState([] as any[])(x => {
    // console.log('get in', myCount)
    return [todos, todos = x]
  }),
  dispatch = (payload: string) => {
    // const wasLen = todos.length
    todos = todoReducer(todos, payload)
    /*
    if(todos.length === 0 && wasLen) {
      console.log(' ------ cleared -----', myCount)
    }
    */
    return todos
  },
  // __ = console.log('todos', {len:todos.length, renderCount}),
) => html`<!-- TODO APP -->
  todo app
  ${Header(dispatch)}
  ${todos.length > 0 && html`
    ${Main({todos, dispatch})}
    ${Footer(todos, dispatch)}
  `}

  app renderCount: ${++renderCount}
`