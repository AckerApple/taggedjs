import {div, button, a, tag} from 'taggedjs'

export const mouseOverTag = tag(({
  label, memory,
}: {
  label: string
  memory:{
    counter: number
  }
}) => {
  mouseOverTag.updates(x => [{label, memory}] = x)
  
  let mouseOverEditShow = false
  let edit = false

  return div({
      style: "background-color:purple;padding:.2em;flex:1",
      onMouseover: () => mouseOverEditShow = true,
      onMouseout: () => mouseOverEditShow = false
    },
    'mouseover - ',
    _=> label,
    ':',
    _=> memory.counter,
    ':',
    _=> mouseOverEditShow || 'false',
    button({onClick: () => ++memory.counter}, '++counter'),
    a({
      'style.visibility': (edit || mouseOverEditShow) ? 'visible' : 'hidden',
      onClick: () => edit = !edit
    }, '⚙️\u00A0')
  )
})
