import { animateDestroy, animateInit } from './animations.js'
import { renderCountDiv } from './renderCount.component.js'
import {html, state, tag} from 'taggedjs'

export const arrayTests = tag(function ArrayTests(){/* ArrayTests */
  const array0: {name: string, scores: any[]}[] = state([])()
  let renderCount: number = state(0)(x => [renderCount, renderCount = x])

  const getNewPerson = () => ({
    name: 'Person '+array0.length,
    scores: '0,'.repeat(4).split(',').map((_v, index) => ({
      frame: index + 1,
      score: Math.floor(Math.random() * 4) + 1
    }))
  })

  ++renderCount

  console.log(22)

  return html`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap">
      ${array0.map((item,index) => html`
        <div oninit=${animateInit} ondestroy=${animateDestroy}>
          <div>
            name:${item.name}
          </div>
          <div>
            index:${index}
          </div>
          
          <div>scores:${item.scores.map(score => html`
            <div style="border:1px solid white;"
              oninit=${animateInit} ondestroy=${animateDestroy}
            >${scoreData(score)}</div>
          `.key(score))}</div>
          
          <button onclick=${() => {
            array0.splice(index,1)
          }}>remove</button>
          <button onclick=${() => {
            array0.splice(index,0,getNewPerson())
          }}>add before</button>
        </div>
      `)}
    </div>

    <button onclick=${() => {
      array0.push(getNewPerson())
    }}>push item ${array0.length+1}</button>

    ${array0.length && html`
      <button onclick=${() => {
        array0.length = 0
      }}>remove all</button>
    `}

    ${renderCountDiv({renderCount, name: 'arrayTests.ts'})}
  `
})


const scoreData = tag(function ScoreData(score: {score: number, frame: number}) {
  return html`${score.frame}:${score.score}`
})