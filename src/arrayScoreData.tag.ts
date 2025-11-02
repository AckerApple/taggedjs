import { renderCountDiv } from './renderCount.component.js'
import {div, button, span, tag} from 'taggedjs'

export const arrayScoreData = tag((
  {score, playerIndex}: {
    playerIndex: number
    score:{score: number, frame: number}
  }
) => {
  arrayScoreData.updates(x => [{score, playerIndex}] = x)

  let renderCount = 0
  
  ++renderCount

  return div(
    'frame:',
    _=> score.frame,
    ':',
    button({
      id: _=> `score-data-${playerIndex}-${score.frame}-inside-button`,
      onClick: () => ++score.score
    },
      'inner score button ++',
      _=> score.score
    ),
    span({
      id: _=> `score-data-${playerIndex}-${score.frame}-inside-display`
    }, _=> score.score),
    button({
      onClick: () => ++renderCount},
      'increase renderCount'
    ),
    _=> renderCountDiv({renderCount, name: 'scoreData' + score.frame})
  )
})
