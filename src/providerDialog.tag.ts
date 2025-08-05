import { html, tag } from "taggedjs"
import { TagDebugProvider } from './providers.tag'

export const dialog = tag((providerClass: TagDebugProvider) => html`
  <dialog id="provider_debug_dialog" style="padding:0"
    onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
    ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
    ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
    ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
    onclose=${() => providerClass.showDialog = false}
  >
    <div style="padding:.25em" onmousedown="this.parentNode.draggable=true"
    >dialog title</div>
    ${providerClass.showDialog ? html`
      <textarea wrap="off">${JSON.stringify(providerClass, null, 2)}</textarea>
    ` : 'no dialog'}
    <div style="padding:.25em">
      <button type="button" onclick="provider_debug_dialog.close()">🅧 close</button>
    </div>
  </dialog>
`)
