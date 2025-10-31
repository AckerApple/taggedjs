import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { Todo, todoReducer } from "./reducer.js";
import { InputElementTargetEvent, noElement, div, main, input, label, ul, tag } from "taggedjs";
import { hashRouterSubject, useHashRouter } from "./HashRouter.function.js";
import { Item } from "./components/item.js";

export const todos: Todo[] = []
const dispatch = todoReducer(todos)

export const todoApp = tag(() => {
  console.log('todos.app.ts')
  const router = useHashRouter()
  
  const activeTodoCount = () => {
    const newActiveCount = todos.filter((todo) => todo.completed !== true).length
    return newActiveCount
  }
  const isActiveRoute = () => router.route === "/active"
  const isCompletedRoute = () => router.route === "/completed"

  const getVisibleTodos = () => {
    return isActiveRoute() && todos.filter(todo => !todo.completed) ||
    isCompletedRoute() && todos.filter(todo => todo.completed) || todos
  }

  return noElement(
    Header(dispatch),
    'route: ', _=> router.route,
    
    _=> todos.length > 0 && (() => noElement(
      main({class: "main"},
        div({class: "toggle-all-container"},
          input({
            id: "toggle-all",
            class: "toggle-all",
            type: "checkbox",
            checked: _=> activeTodoCount() < 1 ? 1 : 0,
            onChange: (e: InputElementTargetEvent) => dispatch.toggleAll(e.target.checked)
          }),
          label({class: "toggle-all-label", for: "toggle-all"},
            'Toggle All Input'
          )
        ),
        
        ul({class: "todo-list show-priority"},
          // 👉 loop todos
          _=> getVisibleTodos().map((todo, index) => {
            return Item(todo, dispatch, index).key(todo.id)
          })
        )
      ),
      
      _=> {
        return Footer(
        todos.length,
        dispatch.removeCompleted,
        router.route,
        activeTodoCount(),
      )}
    ))
  )
})
