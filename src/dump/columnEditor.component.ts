import { tag, div, a, input, small, strong, textarea, button, noElement } from "taggedjs"

type Formula = {
  value: any // unknown
  title: string
  stringFormula: string
}

export const columnEditor = tag(({
  name,
  array,
  included,
  columnNames,
  allColumnNames
}: {
  name: string,
  array: unknown[],
  included: boolean,
  columnNames: string[]
  allColumnNames: string[]
}) => {
  columnEditor.updates(x => [{
    name,
    array,
    included,
    columnNames,
    allColumnNames
  }] = x)

  let mouseOverEditShow = false
  let edit = false
  let editFormula = undefined as Formula | undefined
  const formulas = [] as Formula[]

  const goAll = () => {
    columnNames.length = 0
    columnNames.push(...allColumnNames)
  }

  const goOnly = () => {
    columnNames.length = 0
    columnNames.push(name)
  }

  function toggle() {
    const index = columnNames.indexOf(name)

    if(index >= 0) {
      columnNames.splice(index, 1)
      return
    }

    columnNames.push(name)
  }

  const addSumFormula = () => {
    const stringFormula = `
      array.reduce((all, item) => {
        const value = item['${name}']
        return isNaN(value) ? all : (all + value)
      }, 0)
    `
    
    formulas.push({
      title: 'sum',
      stringFormula,
      value: sandboxRunEval(stringFormula, {array})
    })
  }

  const updateFormula = (formula: Formula, newFormula: string) => {
    formula.stringFormula = newFormula
    formula.value = sandboxRunEval(newFormula, {array})
  }

  return noElement(
    a({onClick: toggle, style: "cursor:pointer;"},
      input({type: "checkbox", checked: included}),
      ' ',
      _=> name
    ),

    div({
      onMouseover: () => mouseOverEditShow = true,
      onMouseout: () => mouseOverEditShow = false
    },
      a({
        'style.visibility': _=> (edit || mouseOverEditShow) ? 'visible' : 'hidden',
        onClick: () => edit = !edit
      }, '⚙️\u00A0'),

      _=> included && columnNames.length !== allColumnNames.length ?
        a({style: "color:blue;", onClick: goAll}, small('all'))
        :
        a({style: "color:blue;", onClick: goOnly}, small('only'))
    ),

    _=> edit &&
      div({style: "width:100%;padding:0.3em;"},
        div({style: "font-size:0.7em;text-align:center;"},
          strong('Column Settings')
        ),
        div(
          _=> editFormula && noElement(
            div({style: "padding:0.3em;"},
              strong('edit formula')
            ),
            textarea({
                wrap: "off",
                onChange: (evt: any) => updateFormula(editFormula as Formula, evt.target.value)
              },
              _=> editFormula?.value
            )
          ),
          div({style: "display:flex;flex-wrap:wrap;gap:1em"},
            _=> formulas.map(formula =>
              div(
                div(
                  strong(_=> formula.title),
                  a({onClick: () => editFormula = formula}, '✏️')
                ),
                div(_=> formula.value)
              ).key(formula)
            )
          ),
          button({type: "button", onClick: addSumFormula}, 'sum')
        )
      )
  )
})

function sandboxRunEval(stringFormula: string, context: Record<string, any> = {}) {
  return sandboxEval(stringFormula, {isNaN, Math, Number, Date, ...context})
}

// execute script in private context
function sandboxEval(
  src: string,
  ctx: Record<string, any>
){
  if(!src) {
    return src
  }

  ctx = new Proxy(ctx, {has: () => true})
  let func = (new Function("with(this) { return (" + src + ")}"));
  return func.call(ctx)
}
