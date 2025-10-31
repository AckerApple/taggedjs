import { div, small, span, tag } from "taggedjs"

export const renderCountDiv = tag((
  {renderCount, name}: {
    renderCount: number
    name: string
  }
) => {
  let partialRenderCount = 0
  
  renderCountDiv.updates(x =>
    [{renderCount, name}] = x
  )

  return div(
    small(
      `(${name} render count`,
        span({id:`${name}_render_count`},_=> renderCount),
      `)`,
      `(${name} partial render count`,
        span(_=> ++partialRenderCount),
      `)`
    )
  )
})
