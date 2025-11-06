import { arraysDisplay } from "./arraysDisplay.component"
import { button, dialog, div, noElement, state, tag, a, strong, sup, span } from "taggedjs"
import { FormatChange } from "./index.js"
import { EverySimpleValue } from "./dump.props"

export const dumpArray = tag(({// dumpArray
  key,
  value,
  show,
  showAll,
  showKids,
  // arrayView,
  showLevels,
  formatChange,
  allowMaximize,
  everySimpleValue,
}: {
  value: any
  showLevels: number
  key?: string
  show: boolean
  showAll?: boolean
  showKids: boolean
  // arrayView?: string
  formatChange: FormatChange
  allowMaximize?: boolean
  everySimpleValue?: EverySimpleValue
}) => {
  dumpArray.updates(x => {
    if(x[0].show != show) {
      showLower = show
    }
    if(x[0].showAll != showAll) {
      showLower = showAll
    }

    [{// dumpArray
      key,
      value,
      show,
      showAll,
      showKids,
      // arrayView,
      showLevels,
      formatChange,
      allowMaximize,
      everySimpleValue,
    }] = x
  })

  let showLower = undefined as boolean | undefined
  let arrayView = undefined as undefined | 'table'
  let maximize = false
  
  // states(get => [{showLower, arrayView, maximize}] = get({showLower, arrayView, maximize}))
  // letProp(get => [showKids] = get(showKids))
  // letProp(get => [showAll] = get(showAll))
  
  // watch.noInit([show], ([show])=> showLower = show)
  // watch.noInit([showAll], ([showAll])=> showLower = showAll)

  const maximizeId = state(() => 'maximize-dump-' + performance.now())
  const toggleMaximize = () => {
    maximize = !maximize
    if(maximize) {
      (document.getElementById(maximizeId) as any).showModal()
    }
  }
  
  const minimize = () => (document.getElementById(maximizeId) as any).close()
  const dumpBody = (showAll || showLower || showKids || (showLower==undefined && showLevels > 0))

  const getHeader = (allowMaximize?: boolean) =>
    div({class: "taggedjs-array-label"},
      a({
          style: "flex-grow:1",
          onClick: () => {
            if(showLower === undefined) {
              return showAll = showKids = showLower = !dumpBody
            }

            showAll = showKids = showLower = !showLower
          }
        },
        strong(key)
      ),
      
      sup({style: "opacity:80%;font-size:75%;padding-left:0.4em"},
        a({
            style: "text-decoration:underline;",
            'style.font-weight': _=> arrayView === 'table' ? 'bold' : '',
            onClick: () => arrayView = arrayView === 'table' ? undefined : 'table',
          },
          _=> arrayView === 'table' ? 'flex' : 'table'
        )
      ),
      
      sup(
        {style: "opacity:80%;font-size:75%;padding-left:0.4em"},
        '[', _=> value.length, ']'
      ),

      _=> allowMaximize && noElement(
        ' ',
        a({onClick: toggleMaximize},
          span({style: "width:10px;height:10px;border:1px solid white;border-top-width:3px;display:inline-block;"})
        )
      )
  )

  const displayOptions = {
    showLevels, showAll, showKids,
    formatChange,
    array: value,
    arrayView: arrayView as string,
    allowMaximize,
    everySimpleValue,
  }

  /* array displays wrap */
  const getBody = () => div({class:"taggedjs-array-body"},
    _=> arraysDisplay(displayOptions)
  )

  return noElement(
    div(
      {class:"taggedjs-array-wrap"},
      _=> getHeader(allowMaximize),
      _=> dumpBody && getBody(),
    ),

    /* maximize */
    dialog(
      {
        id: maximizeId,
        class:"dump-dialog",
        style:"padding:0",
        onmousedown:"var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()",
        ondragstart:"const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'",
        ondrag:"const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';",
        ondragend:"const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false",
      },

      div(
        {
          style:"padding:.25em",
          onmousedown:"this.parentNode.draggable=true"
        },
        _=> maximize && getHeader(false)
      ),
      
      _=> maximize &&
        div(
          {style:"text-align:left;display:flex;flex-wrap:wrap;margin:0.2em;gap:0.2em"},
          arraysDisplay({...displayOptions, allowMaximize: false})
        ),
      
      div({style:"padding:.25em"},
        button(
          {
            type:"button",
            onClick: minimize,
            style:"width:100%"
          },
          '🅧 close array',
        )
      )
    )
  )
})
