import { fx, fxGroup } from 'taggedjs-animate-css'
import { renderCountDiv } from './renderCount.component.js'
import { arrayScoreData } from './arrayScoreData.tag.js'
import { html, state, tag, states, array, subscribe } from 'taggedjs'

type Player = {
  name: string
  edit?: boolean
  scores: any[]
}

export const arrays = tag(() => (
  players: Player[] = state([]),
  renderCount: number = 0,
  counter: number = 0,
  _ = states(get => [{counter, renderCount}] = get({counter, renderCount})),
) => {/* ArrayTests */
  const signalArray = array(['d','e','f'])
  const simpleArray = state(['a','b','c'])
  const arrayFx = state(() => fxGroup({ stagger:10, duration: '.1s' }))

  const getNewPlayer = () => ({
    name: 'Person '+players.length,
    scores: '0,'.repeat(/*frameCount*/0).split(',').map((_v, index) => ({
      frame: index + 1,
      score: Math.floor(Math.random() * 4) + 1
    }))
  })

  function addArraySignal(loopTimes: number) {
    for (let index=0; index < loopTimes; ++index) {
      signalArray[ signalArray.length ] = signalArray.length.toString()
    }
  }

  ++renderCount

  return html`<!--arrayTests.js-->
    <span>count display:<span id="arrays-counter-display">${counter}</span></span>
    <fieldset>
      <legend>
        signal array test <sup id="signal-array-count">${signalArray.length}</sup>
      </legend>
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${subscribe(signalArray, array => {
          return array.map((x, index) => html`
            <div ${arrayFx} id=${`signal-array-item-${index}`}
              style="border:1px solid black;border-radius:.2em"
            >
              index:${index} counter:<span id=${`signal-array-item-counter-display-${index}`}>${counter}</span> content:${x} length:${signalArray.length}
              <button id=${`signal-array-item-delete-btn-${index}`}
                onclick=${() => {
                  signalArray.splice(index, 1)
                }}
              >🗑️ delete me</button>
              <button type="button" onclick=${() => ++counter}>++counter ${counter}</button>
            </div>
          `.key(x))
        })}
      </div>        
      <div>        
        <button type="button" id="signal-array-increase-counter" onclick=${() => ++counter}>++counter ${counter}</button>
        <button type="button" id="push-signal-array-btn" onclick=${() => addArraySignal(1)}>add number</button>
        <button type="button" onclick=${() => addArraySignal(10)}>add 10 number</button>
        <button type="button" onclick=${() => {
          setTimeout(() => {
            signalArray[ signalArray.length ] = signalArray.length.toString()
          }, 1000)
        }}>add number by delay</button>
        <button type="button" onclick=${() => {
          setTimeout(() => {
            signalArray.length = 0
          }, 1000)
        }}>delay clear array</button>
      </div>
    </fieldset>

    <fieldset style="display:flex;flex-wrap:wrap;gap:1em">
      <legend>simple array test</legend>
      ${simpleArray.map((x, index) => html`
        <div>
          counter:${counter} index:${index} x:${x} length:${simpleArray.length}
          <button
            onclick=${() => {
              simpleArray.splice(index, 1)
            }}
          >🗑️ delete me</button>
        </div>`.key(x))}
      <div>
        <button type="button"
          onclick=${() => ++counter}
        >++counter ${counter}</button>
        <button type="button"
          onclick=${() => simpleArray[ simpleArray.length ] = simpleArray.length.toString()}
        >add number</button>
      </div>
    </fieldset>

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
      <button ${fx({duration: '.1s'})}
        onclick=${() => players.length = 0}
      >remove all</button>
    `}

    ${renderCountDiv({renderCount, name: 'arrayTests.ts'})}
  `
})

const playersDisplay = tag(({
  players, getNewPlayer,
}: {
  players: Player[]
  getNewPlayer: () => Player
}) => {
  const playersContent = players.map((player,index) =>
    getPlayerDisplay(player, index, players, getNewPlayer).key(player)
  )

  return html`
    <!-- playersLoop.js -->
    ${playersContent}
    <!-- end:playersLoop.js -->
  `
})

function getPlayerDisplay(
  player: Player,
  index: number,
  players: Player[],
  getNewPlayer: () => Player,
) {
  return html`
    <div ${fx({duration: '.1s'})}
      style="background-color:black;"
    >
      <div>
        name:${player.name}
      </div>
      <div>
        index:${index}
      </div>
      
      <div style="background-color:purple;padding:.5em">
        scores:
        ${player.scores.map((score, playerIndex) => {
          return html`
            <div class="animate__slow" ${fx()}>
              <fieldset>
                <legend>
                  <button id=${`score-data-${playerIndex}-${score.frame}-outside-button`}
                    onclick=${() => ++score.score}
                  >outer score button ++${score.score}</button>
                  <span id=${`score-data-${playerIndex}-${score.frame}-outside-display`}
                  >${score.score}</span>
                </legend>
                ${arrayScoreData({score, playerIndex})}
              </fieldset>
            </div>
          `.key(score)})
        }
      </div>
      
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
        players.splice(index,0, getNewPlayer())
      }}>add before</button>
    </div>
  `
}