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
      _=> 22,
      span.id(`${name}_render_count`)(_=> renderCount),
      `)`
    )
  )
})
