import { animateDestroy, animateInit } from './animations'
import { renderCountDiv } from './renderCount.component'
import {html, set, setLet, tag} from 'taggedjs'

const frameCount = 4

export const arrayTests = tag(function ArrayTests(){/* ArrayTests */
  const players: {name: string, scores: any[]}[] = set([])
  let renderCount: number = setLet(0)(x => [renderCount, renderCount = x])

  const getNewPerson = () => ({
    name: 'Person '+players.length,
    scores: '0,'.repeat(/*frameCount*/0).split(',').map((_v, index) => ({
      frame: index + 1,
      score: Math.floor(Math.random() * 4) + 1
    }))
  })

  ++renderCount

  console.log('array test', {x: players[0]?.scores[0]?.score})

  return html`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${players.map((item,index) => html`
        <div oninit=${animateInit} ondestroy=${animateDestroy} style="background-color:black;">
          <button onclick=${() => {
            players.splice(index,1)
          }}>remove</button>

          <div>
            name:${item.name}
          </div>
          <div>
            index:${index}
          </div>
          
          <div>scores:${item.scores.map((score, playerIndex) => html`
            <div style="border:1px solid white;"
              oninit=${animateInit} ondestroy=${animateDestroy}
            >
              ${scoreData({score, playerIndex})}
              <button id=${`score-data-${playerIndex}-${score.frame}-outside`}
                onclick=${() => ++score.score}
              >outer score ++${score.score}</button>
            </div>
          `.key(score))}</div>
          
          <button onclick=${() => {
            players.splice(index,1)
          }}>remove</button>
          <button onclick=${() => {
            players.splice(index,0,getNewPerson())
          }}>add before</button>
        </div>
      `.key(item))}
    </div>

    <button id="array-test-push-item" onclick=${() => {
      players.push(getNewPerson())
    }}>push item ${players.length+1}</button>

    <button onclick=${() => {
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
    }}>push 3 items</button>

    <button onclick=${() => {
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
      players.push(getNewPerson())
    }}>push 9 items</button>

    ${players.length > 0 && html`
      <button oninit=${animateInit} ondestroy=${animateDestroy} onclick=${() => {
        players.length = 0
      }}>remove all</button>
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
  let renderCount = setLet(0)(x => [renderCount, renderCount = x])
  
  ++renderCount

  console.log('inner render', score.score)
  
  return html`
    frame:${score.frame}:
    <button
      id=${`score-data-${playerIndex}-${score.frame}-inside`}
      onclick=${() => ++score.score}
    >inner score ++${score.score}</button>
    <button onclick=${() => ++renderCount}>increase renderCount</button>
    ${renderCountDiv({renderCount, name:'scoreData' + score.frame})}
  `
})
