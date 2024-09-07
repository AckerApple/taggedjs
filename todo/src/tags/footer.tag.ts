import { tag, html } from 'taggedjs'

// Performance boost to not render if props non-mutating props did not change
export const Footer = tag.immutableProps((
  todosCount: number,
  removeCompleted: Function,
  route: string,
  activeTodoCount: number,
) => html`
  <footer class="footer" data-testid="footer">
    <div>
      <span class="todo-count">${activeTodoCount} item${activeTodoCount > 1 && "s"} left!</span>
      <ul class="filters">
        <li><a class.selected=${route === "/" } href="#/">All</a></li>
        <li><a class.selected=${route === "/active" } href="#/active">Active</a></li>
        <li><a class.selected=${route === "/completed" } href="#/completed">Completed</a></li>
      </ul>
      ${(todosCount - activeTodoCount) > 0 && html`
        <button class="clear-completed" onclick=${() => removeCompleted()}>
          Clear completed
        </button>
      `}
    </div>
  </footer>
`)
