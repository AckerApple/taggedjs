import { Header } from "./components/header.js"
import { Footer } from "./components/footer.js"
import { Todo, todoReducer } from "./reducer.js"
import { array, arrayWatch, tag } from "taggedjs"
import { useHashRouter } from "./HashRouter.function.js"
import { Main } from "./main.js"

export const todoApp = tag(() => {
  console.log('todos.app.ts')

  const router = useHashRouter()

  const getVisibleTodos = () => {
    const isActiveRoute = router.route === "/active"
    const isCompletedRoute = router.route === "/completed"

    return isActiveRoute && todos.filter(todo => !todo.completed) ||
    isCompletedRoute && todos.filter(todo => todo.completed) || todos
  }
    
  const getActiveTodoCount = () => {
    const newActiveCount = todos.filter((todo) => todo.completed !== true).length
    return newActiveCount
  }
  
  const todos = arrayWatch([] as Todo[], todos => {
    visibleTodos = getVisibleTodos()
    activeTodoCount = getActiveTodoCount()
  })

  let visibleTodos = getVisibleTodos()
  let activeTodoCount = getActiveTodoCount()

  const dispatch = todoReducer(todos)

  let updates = 0

  return [
    Header(dispatch),
    'route: ', () => router.route,
    ' update-counter: ', () => {
      return ++updates
    },
    
    () => todos.length > 0 && [
      () => Main(activeTodoCount, visibleTodos, dispatch),
      
      () => {
        return Footer(
          todos.length,
          dispatch.removeCompleted,
          router.route,
          activeTodoCount,
        )
      }
    ]
  ]
})

