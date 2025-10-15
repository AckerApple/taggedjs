import { footer, span, ul, li, a, button } from "taggedjs"

export const Footer = (
  todosCount: number,
  removeCompleted: Function,
  route: string,
  activeTodoCount: number,
) => {
  return footer({class: "footer", 'data-testid': "footer"},  
    span({class: "todo-count"},
      _=> activeTodoCount,
      ' item',
      _=> activeTodoCount > 1 && "s",
      ' left!'
    ),

    ul({class: "filters"},
      li(
        a({
          id: "todo-view-all-link",
          class: route === "/" ? "selected" : "",
          href: "#/"
        }, 'All')
      ),
      
      li(
        a({
          id: "todo-view-active-link",
          class: route === "/active" ? "selected" : "",
          href: "#/active"
        }, 'Active')
      ),
    
    li(
      a({
        id: "todo-view-completed-link",
        class: route === "/completed" ? "selected" : "",
        href: "#/completed",
      }, 'Completed')
    )
  ),

  _=> (todosCount - activeTodoCount) > 0 &&
    button({
      class: "clear-completed",
      onClick: () => removeCompleted(),
    }, 'Clear completed')
  )
}