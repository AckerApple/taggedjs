import { Header } from './tags/header.tag'
import { Footer } from './tags/footer.tag'
import { Todo, todoReducer } from './reducer'
import { div, html, input, label, main, section, tag, ul } from 'taggedjs'
import { useHashRouter } from './HashRouter.function'
import { Item } from './tags/item.tag'

export const todos: Todo[] = []
const dispatch = todoReducer(todos)

export const app = () => {
  const route = useHashRouter().route
  return html`
    ${route === '/info' ? infoTag() : todosTag(route)}
    <a href="#/info">info</a>
    &nbsp;&nbsp;&nbsp;
    <a href="#/">todo app</a>
  `
}

const infoTag = () => html`
  <div style="margin:2rem;padding:2rem;background-color:white;">
    🚧 A work in progress to demonstrate the capabilities of TaggedJs
  </div>
`

const todosTag = tag((route: string) => {
  todosTag.updates(x => [route] = x)

  let activeTodoCount = todos.filter((todo) => !todo.completed).length
  let isActiveRoute = route === "/active"
  let isCompletedRoute = route === "/completed"
  let visibleTodos = isActiveRoute && todos.filter(todo => !todo.completed) || isCompletedRoute && todos.filter(todo => todo.completed) || todos
  let todoCount = todos.length

  return section({class:"todoapp"},
    Header(dispatch),
    _=> todoCount > 0 && 
      main({class:"main"},
        div({class:"toggle-all-container"},
          input({
            id:"toggle-all",
            class:"toggle-all",
            type:"checkbox",
            checked: _=> activeTodoCount < 1,
            onChange: e => dispatch.toggleAll(e.target.checked)
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

    _=> Footer(todoCount, dispatch.removeCompleted, route, activeTodoCount)
  )
})
