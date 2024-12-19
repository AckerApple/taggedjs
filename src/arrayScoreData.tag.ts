import { renderCountDiv } from './renderCount.component.js'
import {html, states, tag} from 'taggedjs'

export const arrayScoreData = tag((
  {score, playerIndex}: {
    playerIndex: number
    score:{score: number, frame: number}
  }
) => {
  let renderCount = 0

  states(get => [renderCount] = get(renderCount))
  
  ++renderCount

  return html`
    frame:${score.frame}:
    <button
      id=${`score-data-${playerIndex}-${score.frame}-inside-button`}
      onclick=${() => ++score.score}
    >inner score button ++${score.score}</button>
    <span id=${`score-data-${playerIndex}-${score.frame}-inside-display`}
    >${score.score}</span>
    <button onclick=${() => ++renderCount}>increase renderCount</button>
    ${renderCountDiv({renderCount, name:'scoreData' + score.frame})}
  `
})
