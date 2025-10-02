import { div, small, span, tag } from "taggedjs"

export const renderCountDiv = tag((
  {renderCount, name}: {
    renderCount: number
    name: string
  }
) => {
  renderCountDiv.inputs(x =>
    [{renderCount, name}] = x
  )

  return div(
    small(
      `(${name} render count`,
      span.id(`${name}_render_count`)
        (_=> renderCount),
      `)`
    )
  )
})
