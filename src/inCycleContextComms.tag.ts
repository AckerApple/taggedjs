import { tag, fieldset, legend, label, input, div, select, option, h3, span, host } from "taggedjs";
import { injectionTag } from "./injectionTesting.tag";
import { colorOptions, inCycleChild, inCycleChild2, inCycleChild3 } from "./providers.tag";

export const inCycleContextComms = tag(() => {
  let cycleColorParent = 'red'
  let cycleColorChild = 'green'
  let cycleColorChild2 = 'green'
  let hideShowCycles = false


  return fieldset({ id: "in-cycle-context-comms" },
    legend(
      label(
        input({
          type: "checkbox",
          checked: _ => !hideShowCycles,
          onChange: e => hideShowCycles = !hideShowCycles
        }),
        ' In-Cycle Context Communication'
      )
    ),

    _ => !hideShowCycles &&
      div(
        div({ id: "fieldset-body-wrap", style: "margin-bottom: 1em" },
          label(
            'Parent Color: ',
            select({
              id: "parent-color-select",
              onChange: e => cycleColorParent = e.target.value
            },
              _ => colorOptions.map(color => option({
                value: color,
                selected: _ => cycleColorParent === color
              }, color).key(color)
              )
            )
          ),

          label({ style: "margin-left: 1em" },
            'Child Color: ',
            select({
              id: "child-color-select",
              onChange: e => cycleColorChild = e.target.value
            }, _ => colorOptions.map(color => option({
              value: color,
              selected: _ => cycleColorChild === color
            }, color).key(color)
            )
            )
          ),
          label({ style: "margin-left: 1em" },
            'Child Color2: ',
            select({
              id: "child-color-select-2",
              onChange: e => cycleColorChild2 = e.target.value
            }, _ => colorOptions.map(color => option({ value: color, selected: _ => cycleColorChild2 === color }, color).key(color)
            )
            )
          )
        ),

        div({ id: "in-cycle-parent", attr: _=> inCycleParent(cycleColorParent) },
          div({ id: "in-cycle-child", attr: _=> inCycleChild(cycleColorChild) }),
          div({ id: "in-cycle-child-2" },
            'wonderful too ',
            _ => inCycleChild2(cycleColorChild2),
            span('part 2 ',
              _ => inCycleChild3(cycleColorChild2)
            )
          )
        ),

        
        div({ id: "drag-drop-wrap" },
          h3('Drag Selection Testing'),
          injectionTag,
        ),
      )
  )
})


export const inCycleParent = host((color = 'red') => {
  const element = tag.element.get()
  element.style.border = '2px solid ' + color
  element.style.display = 'flex'
  element.style.gap = '1em'
  const rtn = { color, title: 'inCycleParent' }
  return rtn
})
