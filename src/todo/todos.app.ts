import { Header } from "./components/header.js"
import { Footer } from "./components/footer.js"
import { Todo, todoReducer } from "./reducer.js"
import { tag } from "taggedjs"
import { useHashRouter } from "./HashRouter.function.js"
import { Main } from "./main.js"

export const todos: Todo[] = []
export const dispatch = todoReducer(todos)

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

  return [
    Header(dispatch),
    'route: ', () => router.route,
    
    ()=> todos.length > 0 && [
      () => Main(activeTodoCount(), getVisibleTodos()),
      
      () => {
        return Footer(
        todos.length,
        dispatch.removeCompleted,
        router.route,
        activeTodoCount(),
      )}
    ]
  ]
})

