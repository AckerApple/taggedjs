import { fx, fxGroup } from 'taggedjs-animate-css'
import { renderCountDiv } from './renderCount.component.js'
import { arrayScoreData } from './arrayScoreData.tag.js'
import { tag, array, subscribe, div, fieldset, legend, button, span, sup } from 'taggedjs'

type Player = {
  name: string
  edit?: boolean
  scores: any[]
}

export const arrays = tag(() => {/* ArrayTests */
  const players: Player[] = []
  let renderCount: number = 0
  let counter: number = 0
  const signalArray = array(['d','e','f'])
  const simpleArray = ['a','b','c']
  const arrayFx = fxGroup({ stagger:10, duration: '.1s' })

  const getNewPlayer = () => ({
    name: 'Person '+players.length,
    scores: '0,'.repeat(/*frameCount*/0).split(',').map((_v, index) => ({
      frame: index + 1,
      score: Math.floor(Math.random() * 4) + 1
    }))
  })

  const removePlayerByIndex = (index: number) => {
    const player = players[index]
    players.splice(index,1)
    player.edit = !player.edit
  }

  function addArraySignal(loopTimes: number) {
    for (let index=0; index < loopTimes; ++index) {
      signalArray[ signalArray.length ] = signalArray.length.toString()
    }
  }

  ++renderCount

  return div(
    span(
      'count display:',
      span({id:"arrays-counter-display"},
        _=> counter
      )
    ),

    fieldset(
      legend(
        'signal array test ',
        sup({id:"signal-array-count"},
          _=> signalArray.length
        )
      ),
      div({style:"display:flex;flex-wrap:wrap;gap:1em"},
        subscribe(signalArray, array => {
          return array.map((x, index) => {
            return div({
                attr: arrayFx,
                id: _=> `signal-array-item-${index}`,
                style: "border:1px solid black;border-radius:.2em"
              },
              
              'index:', _=> index,

              ' counter:',
              span({id:_=>`signal-array-item-counter-display-${index}`},
                _=> counter
              ),

              ' content:', _=> x,
              ' length:', _=> signalArray.length,

              button({
                id: `signal-array-item-delete-btn-${index}`,
                onClick: () => {
                  signalArray.splice(index, 1)
                }
              }, '🗑️ delete subscribe'),

              button({
                type: "button",
                onClick: () => ++counter
              }, '++counter ', _=> counter),
            ).key(x)
          })
        }),

        /** additional buttons/controls */
        div(
          button({
            type: "button",
            id: "signal-array-increase-counter",
            onClick: () => ++counter
          }, '++counter ', _=> counter),

          button({
            type: "button",
            id: "push-signal-array-btn",
            onClick: () => addArraySignal(1)
          }, 'add number'),

          button({
            type: "button",
            onClick: () => addArraySignal(10)
          }, 'add 10 number'),

          button({
            type: "button",
            onClick: () => {
              setTimeout(() => {
                signalArray[ signalArray.length ] = signalArray.length.toString()
              }, 1000)
            }
          }, 'add number by delay'),

          button({
            type: "button",
            onClick: () => {
              setTimeout(() => {
                signalArray.length = 0
              }, 1000)
            }
          }, 'delay clear array')
        )
      )
    ),

    fieldset({style:"display:flex;flex-wrap:wrap;gap:1em"},
      legend('simple array test - length:', _=> simpleArray.length),
      _=> simpleArray.map((x, index) =>
        div(
          'counter:', _=> counter,
          ' index:', _=> index,
          ' x:', _=> x,
          ' length:', _=> simpleArray.length,
          button({
            onClick: () => {
              simpleArray.splice(index, 1)
            }
          }, '🗑️ delete simple')
        ).key(x)
      ),

      div(
        button({
          type: "button",
          onClick: () => ++counter
        }, '++counter ', _=> counter),

        button({
          type: "button",
          onClick: () => simpleArray[ simpleArray.length ] = simpleArray.length.toString()
        }, 'add number')
      )
    ),

    fieldset(
      legend('game with players'),
      div({style:"display:flex;flex-wrap:wrap;gap:1em"},
        div('players count:', _=> {
          return players.length
        }),

        _=> {
          return players.map((player,index) => {
            return getPlayerDisplay(player, index, players, getNewPlayer, removePlayerByIndex).key(player.name)
          }
        )}
      ),

      button({
        id: "array-test-push-item",
        onClick: () => {
          players.push(getNewPlayer())
        }
      }, 'push item ', players.length+1),

      button({
        onClick: () => {
          players.push(getNewPlayer())
          players.push(getNewPlayer())
          players.push(getNewPlayer())
        }
      }, 'push 3 items'),

      button({onClick: () => {
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
        players.push(getNewPlayer())
      }}, 'push 9 items'),

      _=> players.length > 0 &&
          button({
            attr: fx({duration: '.1s'}),
            onClick: () => players.length = 0
          }, 'remove all'),
    ),

    _=> renderCountDiv({renderCount, name: 'arrayTests.ts'})
  )
})

const getPlayerDisplay = tag((
  player: Player,
  index: number,
  players: Player[],
  getNewPlayer: () => Player,
  removePlayerByIndex: (x: number) => any,
) => {
  getPlayerDisplay.updates(x => {
    [player, index, players, getNewPlayer, removePlayerByIndex] = x
  })

  return div({
      style: "background-color:black;",
      attr: fx({duration: '.1s'})
    },
    div(_ => `name:${player.name}`),
    div(_ => {
      return `index:${index}`
    }),
    div({style:"background-color:purple;padding:.5em"},
      'scores:',
      _ => player.scores.map((score, playerIndex) => {
        return playerScoreDisplay(playerIndex, score).key(score)
      })
    ),

    _=> player.edit && button({
      onClick: () => {
        removePlayerByIndex(index)
      }
    }, 'remove'),

    _=> player.edit && button({
      id: _=> `player-remove-promise-btn-${index}`,
      onClick: async () => {
        player.edit = !player.edit
        removePlayerByIndex(index)
        return 'player-remove-promise-btn-xx'
      }
    }, 'remove by promise'),

    button({
      id: _ => `player-edit-btn-${index}`,
      onClick: () => player.edit = !player.edit
    }, 'edit'),

    button({
      onClick: () => {
        players.splice(index,0, getNewPlayer())
      }
    }, 'add before')
  )
})

const playerScoreDisplay = tag((
  playerIndex: number,
  score: any,
) => {
  return div({
      class: "animate__slow",
      attr: fx({duration: '.1s'})
    },
    fieldset(
      legend(
        button({
          id: _=> `score-data-${playerIndex}-${score.frame}-outside-button`,
          onClick: () => ++score.score
        }, _=> `outer score button ++${score.score}`),
        span({
          id: _=> `score-data-${playerIndex}-${score.frame}-outside-display`
        }, _=> score.score)
      ),
      _=> arrayScoreData({ score, playerIndex })
    )
  )
})