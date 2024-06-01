import { fadeInDown, fadeOutUp } from './animations.js'
import { renderCountDiv } from './renderCount.component.js'
import {html, state, letState, tag} from 'taggedjs'

const frameCount = 4
type Player = {
  name: string
  edit?: boolean
  scores: any[]
}

export const arrayTests = tag(function ArrayTests(){/* ArrayTests */
  const players: Player[] = state([])
  let renderCount: number = letState(0)(x => [renderCount, renderCount = x])

  const getNewPlayer = () => ({
    name: 'Person '+players.length,
    scores: '0,'.repeat(/*frameCount*/0).split(',').map((_v, index) => ({
      frame: index + 1,
      score: Math.floor(Math.random() * 4) + 1
    }))
  })

  ++renderCount

  return html`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${playersDisplay({players, getNewPlayer})}
    </div>

    <button id="array-test-push-item" onclick=${() => {
      players.push(getNewPlayer())
    }}>push item ${players.length+1}</button>

    <button onclick=${() => {
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
    }}>push 3 items</button>

    <button onclick=${() => {
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
      players.push(getNewPlayer())
    }}>push 9 items</button>

    ${players.length > 0 && html`
      <button oninit=${fadeInDown} ondestroy=${fadeOutUp}
        style="--animate-duration: .1s;"
        onclick=${() => players.length = 0}
      >remove all</button>
    `}

    ${renderCountDiv({renderCount, name: 'arrayTests.ts'})}
  `
})

const scoreData = tag((
  {score, playerIndex}: {
    playerIndex: number
    score:{score: number, frame: number}
  }
) => {
  let renderCount = letState(0)(x => [renderCount, renderCount = x])
  
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

const playersDisplay = tag(({
  players, getNewPlayer,
}: {
  players: Player[]
  getNewPlayer: () => Player
}) => {
  const playersContent = players.map((player,index) => html`
    <div oninit=${fadeInDown} ondestroy=${fadeOutUp}
      style="background-color:black;--animate-duration: .1s;"
    >
      <div>
        name:${player.name}
      </div>
      <div>
        index:${index}
      </div>
      
      <div style="background-color:purple;padding:.5em">
        scores:${player.scores.map((score, playerIndex) => html`
        <div style="border:1px solid white;--animate-duration: .1s;"
          oninit=${fadeInDown} ondestroy=${fadeOutUp}
        >
          <fieldset>
            <legend>
              <button id=${`score-data-${playerIndex}-${score.frame}-outside-button`}
                onclick=${() => ++score.score}
              >outer score button ++${score.score}</button>
              <span id=${`score-data-${playerIndex}-${score.frame}-outside-display`}
              >${score.score}</span>
            </legend>
            ${scoreData({score, playerIndex})}
          </fieldset>
        </div>
      `.key(score))}</div>
      
      ${player.edit && html`
        <button onclick=${() => {
          players.splice(index,1);
          player.edit = !player.edit
        }}>remove</button>
      `}
      ${player.edit && html`
        <button id=${'player-remove-promise-btn-' + index} onclick=${async () => {
          player.edit = !player.edit
          players.splice(index,1);
        }}>remove by promise</button>
      `}
      <button id=${'player-edit-btn-' + index} onclick=${() => player.edit = !player.edit}>edit</button>
      <button onclick=${() => {
        players.splice(index,0,getNewPlayer())
      }}>add before</button>
    </div>
  `.key(player))

  return html`
    <!-- playersLoop.js -->
    ${playersContent}
    <!-- end:playersLoop.js -->
  `
})