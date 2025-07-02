import { arraysDisplay } from "./arraysDisplay.component";
import { html, letProp, state, states, tag, watch } from "taggedjs";
export const dumpArray = tag(({ // dumpArray
key, value, show, showAll, showKids, 
// arrayView,
showLevels, formatChange, allowMaximize, everySimpleValue, }) => {
    let showLower = undefined;
    let arrayView = undefined;
    let maximize = false;
    states(get => [{ showLower, arrayView, maximize }] = get({ showLower, arrayView, maximize }));
    letProp(get => [showKids] = get(showKids));
    letProp(get => [showAll] = get(showAll));
    watch.noInit([show], ([show]) => showLower = show);
    watch.noInit([showAll], ([showAll]) => showLower = showAll);
    const maximizeId = state(() => 'maximize-dump-' + performance.now());
    const toggleMaximize = () => {
        maximize = !maximize;
        if (maximize) {
            document.getElementById(maximizeId).showModal();
        }
    };
    const minimize = () => document.getElementById(maximizeId).close();
    const dumpBody = (showAll || showLower || showKids || (showLower == undefined && showLevels > 0));
    const getHeader = (allowMaximize) => html `
    <div class="taggedjs-array-label">
      <a style="flex-grow:1" onclick=${() => {
        if (showLower === undefined) {
            return showAll = showKids = showLower = !dumpBody;
        }
        showAll = showKids = showLower = !showLower;
    }}>
        <strong>${key}</strong>
      </a>
      <sup style="opacity:80%;font-size:75%;padding-left:0.4em">
        <a style="text-decoration:underline;" style.font-weight=${arrayView === 'table' ? 'bold' : ''}
          onclick=${() => arrayView = arrayView === 'table' ? undefined : 'table'}>${arrayView === 'table' ? 'flex' : 'table'}</a>
      </sup>
      <sup style="opacity:80%;font-size:75%;padding-left:0.4em">[${value.length}]</sup>
      ${allowMaximize && html `
        &nbsp;<a onclick=${toggleMaximize}><span style="width:10px;height:10px;border:1px solid white;border-top-width:3px;display:inline-block;"></span></a>
      `}
    </div>
  `;
    const displayOptions = {
        showLevels, showAll, showKids,
        formatChange,
        array: value,
        arrayView: arrayView,
        allowMaximize,
        everySimpleValue,
    };
    const getBody = () => html `
    <!-- array displays wrap -->
    <div class="taggedjs-array-body">
      ${arraysDisplay(displayOptions)}
    </div>
  `;
    return html `<!-- array -->
    <div class="taggedjs-array-wrap">
      ${getHeader(allowMaximize)}
      ${dumpBody && getBody()}
    </div>

    <!-- maximize -->
    <dialog id=${maximizeId} class="dump-dialog" style="padding:0"
      onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
      ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
      ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
      ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
    >
      <div style="padding:.25em" onmousedown="this.parentNode.draggable=true">
        ${maximize && getHeader(false)}
      </div>
      
      ${maximize && html `
        <div style="text-align:left;display:flex;flex-wrap:wrap;margin:0.2em;gap:0.2em">
          ${arraysDisplay({ ...displayOptions, allowMaximize: false })}
        </div>
      `}

      <div style="padding:.25em">
        <button type="button" onclick=${minimize} style="width:100%">🅧 close array</button>
      </div>
    </dialog>
  `;
});
//# sourceMappingURL=dumpArray.tag.js.map