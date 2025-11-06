/* TODO: Not sure this file is even in use */
import { tag, footer, p, div, span, ul, li, a, button } from 'taggedjs'

// Performance boost to not render if props non-mutating props did not change
export const Footer = (
  todosCount: number,
  removeCompleted: Function,
  route: string,
  activeTodoCount: number,
) => {
  return footer({class: "footer", 'data-testid': "footer"},
    p('Double-click to edit a todo'),
    div(
      span({class: "todo-count"},
        _=> activeTodoCount,
        ' item',
        _=> activeTodoCount > 1 && "s",
        ' left!'
      ),
      ul({class: "filters"},
        li(
          a({class: _=> route === "/" ? "selected" : "", href: "#/"},
            'All'
          )),
        li(
          a({class: _=> route === "/active" ? "selected" : "", href: "#/active"},
            'Active'
          )),
        li(
          a({class: _=> route === "/completed" ? "selected" : "", href: "#/completed"},
            'Completed'
          ))
      ),
      _=> (todosCount - activeTodoCount) > 0 &&
        button({
          class: "clear-completed",
          onClick: () => removeCompleted()
        }, 'Clear completed')
    )
  )
}