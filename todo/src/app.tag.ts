import { Header } from './tags/header.tag'
import { Footer } from './tags/footer.tag'
import { Todo, todoReducer } from './reducer'
import { a, div, input, label, main, noElement, section, tag, ul } from 'taggedjs'
import { useHashRouter } from './HashRouter.function'
import { Item } from './tags/item.tag'

export const todos: Todo[] = []
const dispatch = todoReducer(todos)

export const app = () => {
  const router = useHashRouter()
  return noElement(
    _=> router.route === '/info' ? infoTag() : todosTag( router.route ),
    div({style:'text-align:center;'},
      a({href:"#/info"}, 'info'),
      '   ',
      a({href:"#/"}, 'todo app')
    )
  )
}

const infoTag = () =>
div({style:"margin:2rem;padding:2rem;background-color:white;"},
  '🚧 A work in progress to demonstrate the capabilities of TaggedJs'
)


const todosTag = tag((route: string) => {
  let isActiveRoute = route === "/active"
  let isCompletedRoute = route === "/completed"

  const getVisibleTodos = () => {
    if(isActiveRoute) return todos.filter(todo => !todo.completed)
    if(isCompletedRoute) return todos.filter(todo => todo.completed)
    return todos
  }
  const getActiveTodoCount = () => todos.filter((todo) => !todo.completed).length

  todosTag.updates(x => {
    [route] = x
    
    isActiveRoute = route === "/active"
    isCompletedRoute = route === "/completed"
    visibleTodos = getVisibleTodos()
    activeTodoCount = getActiveTodoCount()
  })

  let activeTodoCount = getActiveTodoCount()
  let visibleTodos = getVisibleTodos()

  return section({class:"todoapp"},
    Header(dispatch),
    // div('todoCount:', _=> todos.length),
    main({class:"main"},
      _=> todos.length > 0 && 
        div({class:"toggle-all-container"},
          input({
            id:"toggle-all",
            class:"toggle-all",
            type:"checkbox",
            checked: _=> activeTodoCount < 1,
            onChange: e => dispatch.toggleAll(e.target.checked),
          }),
          
          label({class:"toggle-all-label", for:"toggle-all"},
            'Toggle All Input'
          )
        ),

        ul({class:"todo-list show-priority"},
          _=> visibleTodos.map((todo, index) =>
            Item(todo, dispatch, index).key(todo.id)
          )
        )
      ),

    _=> Footer(todos.length, dispatch.removeCompleted, route, activeTodoCount)
  )
})
