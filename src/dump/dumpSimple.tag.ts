import { Tag, tag, div, a } from "taggedjs"
import { OnHeaderClick } from "./index"
import { copyText } from "./copyText.function"
import { EverySimpleValue, SimpleValue } from "./dump.props"

export const dumpSimple = tag(({
  key, value, onHeaderClick, everySimpleValue
}: {
  key: string | undefined
  value: any
  onHeaderClick?: OnHeaderClick,
  everySimpleValue?: EverySimpleValue,
}) => {
  dumpSimple.updates(x => [{key, value, onHeaderClick, everySimpleValue}] = x)
  const isLinkValue = value.search && (value.slice(0,8)==='https://' || value.slice(0,7)==='http://')

  // const result = everySimpleValue && everySimpleValue(value, key)
  let displayValue: SimpleValue | Tag

  if(everySimpleValue) {
    displayValue = simpleValue({value, everySimpleValue})
  } else {
    displayValue = isLinkValue ? linkValue(value) : simpleValue({value})
  }
  
  return div(
    {style: "font-size:75%;flex:1 1 10em;color:#111111"},
    _=> key && div({
      class: "taggedjs-simple-label",
      style: _=> ({cursor: onHeaderClick ? "pointer" : ""}),
      onClick: onHeaderClick
    }, key),
    _=> displayValue
  )
})

const simpleValue = tag(({value, everySimpleValue}: {
  value: string | undefined | null | boolean,
  everySimpleValue?: EverySimpleValue,
}) => {
  simpleValue.updates(x => [{value, everySimpleValue}] = x)
  
  const isLikeNull = [undefined,null,'null'].includes(value as null | undefined)
  const number = value as unknown as number
  const isLargeNumber = !isNaN(number) && number > 1000000000
  const title = !isLargeNumber ? '' : getLargeNumberTitle(number)
  let downTime = 0
  
  const startMouseDown = () => {
    downTime = Date.now()
  }

  const markMouseUp = (event: Event) => {
    if(Date.now() - downTime > 300) {
      event.preventDefault()
      event.stopPropagation()
      return true // a manual drag copy is taking place
    }

    copyText(value as string) // a regular click took place
  }

  let displayValue = value

  if(everySimpleValue) {
    displayValue = everySimpleValue(value) as any
  }

  displayValue = displayValue === null && 'null' || displayValue === false && 'false' || displayValue === undefined && 'undefined' || displayValue

  return div({
    class: "hover-bg-warning active-bg-energized",
    onMousedown: startMouseDown,
    onMouseup: markMouseUp,
    style: _=> ({
      cursor: "pointer",
      "background-color": isLikeNull ? 'rgba(0,0,0,.5)' : '',
      color: (value === true && '#28a54c') ||
        (value === false && '#e42112') ||
        isLikeNull && 'white' || ''
    }),
    title
  }, _=> displayValue)
})

function getLargeNumberTitle(number: number) {
  return number > 946702800000 ?
  'Milliseconds > Unix epoch:\n' + (new Date(number).toLocaleString()) :
  'Seconds > Unix epoch:\n' + (new Date(number*1000).toLocaleString())
}

const linkValue = tag((value: string) => {
  linkValue.updates(x => [value] = x)
  
  return a({
    onClick: () => copyText(value),
    href: _=> value,
    target: "_blank",
    class: "hover-bg-warning active-bg-energized",
    title: "tap to copy"
  }, _=> value)
})