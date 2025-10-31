import { tag, dialog, div, textarea, button, getContextInCycle } from "taggedjs"
import { TagDebugProvider } from './providers.tag'
import { HTMLDialogElement } from "happy-dom"

export const providerDialog = (
  providerClass: TagDebugProvider, // Expected not to change
) => {
  return dialog({
    id: "provider_debug_dialog",
    style: "padding:0",
    onmousedown: "var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()",
    ondragstart: "const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'",
    ondrag: "const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';",
    ondragend: "const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false",
    
    onClose: () => {
      providerClass.showDialog = false
      console.log('close call made?', {
        providerClass,
        showDialog: providerClass.showDialog,
      })
      return true
    }
  },
    div(
      {style:"padding:.25em", onmousedown:"this.parentNode.draggable=true"},
      'dialog title',
      _=> {
        const result = providerClass.showDialog ? textarea({wrap:"off"}, _=> JSON.stringify(providerClass, null, 2)) : 'no dialog'
        return result
      }
    ),
    div({style:"padding:.25em"},
      button({
        type:"button",
        onClick: () => {
          const dialog = document.getElementById('provider_debug_dialog') as any as HTMLDialogElement
          dialog.close()
        }
      }, '🅧 close')
    )
  )
}
