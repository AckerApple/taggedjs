import { columnEditor } from "./columnEditor.component";
import { html, state, states, tag, watch } from "taggedjs";
import { arrayTable } from "./arrayTable.component";
import { arrayDisplay } from "./arrayDisplay.tag";
export const arraysDisplay = tag(({ showLevels, showAll, showKids, array, arrayView, formatChange, allowMaximize, everySimpleValue, }) => {
    // used to display list of all possible columns
    const allColumnNames = watch([array, array.length], () => array.length ? getAllKeys(array) : []);
    // an editable list of column names
    let columnNames = undefined;
    const defaultColumnNames = watch([allColumnNames], () => [...allColumnNames]);
    let showColumnDialog = false;
    const uniqueId = state(() => 'columnDialog' + performance.now());
    states(get => [{ columnNames, showColumnDialog }] = get({ columnNames, showColumnDialog }));
    watch.noInit([defaultColumnNames.length], () => {
        if (!columnNames) {
            columnNames = defaultColumnNames;
        }
    });
    const toggleColumnDialog = () => {
        showColumnDialog = !showColumnDialog;
        const element = document.getElementById(uniqueId);
        if (showColumnDialog) {
            element.showModal();
        }
        else {
            element.close(); // <- element has onclose event that is called slow
        }
    };
    const arrayTag = arrayView === 'table' ? arrayTable({
        showAll, showKids,
        array, toggleColumnDialog,
        columnNames: columnNames || allColumnNames,
        formatChange, everySimpleValue,
    }) : arrayDisplay({
        array, showLevels, showAll, showKids,
        formatChange,
        columnNames: columnNames || allColumnNames,
        toggleColumnDialog,
        allowMaximize, everySimpleValue
    });
    return html `
    ${arrayTag}

    <dialog id=${uniqueId} class="dump-dialog" style="padding:0"
      onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
      ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
      ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
      ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
    >
      <div
        style="padding:.25em;background-color:#666;color:white;"
        onmousedown="this.parentNode.draggable=true"
      >Column Modifier</div>
      <div style="padding:.25em">
        ${allColumnNames.map(name => {
        const included = columnNames === undefined || columnNames.includes(name);
        return html `
            <div
              style="display:flex;justify-content: space-between;flex-wrap:wrap"
              class="hover-bg-warning"
            >
              ${columnEditor({
            name,
            array,
            included,
            columnNames: columnNames || defaultColumnNames,
            allColumnNames,
        })}
            </div>
          `.key(name);
    })}
        <button style="width:100%" type="button" onclick=${toggleColumnDialog}>🅧 close</button>
      </div>
    </dialog>
  `;
});
export function getAllKeys(array) {
    return array.reduce((all, x) => {
        if (x && typeof (x) === 'object') {
            if (Array.isArray(x)) {
                return all;
            }
            Object.keys(x).forEach((x) => {
                if (all.includes(x)) {
                    return; // already have it
                }
                all.push(x);
            });
        }
        return all;
    }, []);
}
//# sourceMappingURL=arraysDisplay.component.js.map