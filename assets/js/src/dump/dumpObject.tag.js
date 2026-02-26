import { a, button, dialog, div, noElement, span, strong, sup, tag } from "taggedjs";
import { dump } from "./index";
export const dumpObject = tag(({ // dumpObject
key, showKids, show, showLevels, value, showAll, onHeaderClick, formatChange, allowMaximize, everySimpleValue, }) => {
    dumpObject.updates(x => {
        if (x[0].show != show) {
            showLower = show;
        }
        if (x[0].showAll != showAll) {
            showLower = showAll;
        }
        [{
                key, showKids,
                show,
                showLevels,
                value,
                showAll,
                onHeaderClick,
                formatChange,
                allowMaximize,
                everySimpleValue,
            }] = x;
    });
    let showLower = undefined;
    let maximize = false;
    const maximizeId = 'maximize-dump-' + performance.now();
    // states(get => [{showLower, maximize}] = get({showLower, maximize}))
    // letProp(get => [showKids] = get(showKids))
    //  watch.noInit([show], ([show]) => showLower = show)
    //  watch.noInit([showAll], ([showAll]) => showLower = showAll)
    const continueDump = () => !key || showKids || showLower || (showLower === undefined && showLevels > 0);
    const toggleMaximize = () => {
        maximize = !maximize;
        if (maximize) {
            document.getElementById(maximizeId).showModal();
        }
    };
    const minimize = () => document.getElementById(maximizeId).close();
    const getHead = (allowMaximize) => {
        return div.class `taggedjs-object-label`.style(_ => showLower ? 'border-bottom-width:1px;border-bottom-style:solid;border-color:black;' : '')(a({
            onClick: () => {
                if (showLower === undefined) {
                    return showAll = showKids = showLower = !(showAll || showKids || showLower);
                }
                showKids = showLower = !showLower;
            }
        }, strong(_ => key), sup({ style: "opacity:80%;font-size:75%;padding-left:0.4em" }, '{', _ => Object.keys(value).length, '}')), _ => allowMaximize && noElement(' ', a({ onClick: toggleMaximize }, span({
            style: "width:10px;height:10px;border:1px solid white;border-top-width:3px;display:inline-block;"
        }))));
        y;
    };
}).map(([key, value]) => 
/* recurse */
div({
    class: "taggedjs-object",
    style: _ => !value || typeof (value) !== 'object' ? 'flex: 1 1 10em;' : 'flex-grow:1;'
}, _ => dump({
    value,
    key,
    show: showLower,
    showAll,
    showLevels: showLevels - 1,
    showKids: showAll || showKids,
    isRootDump: false,
    formatChange,
    onHeaderClick,
    allowMaximize,
    everySimpleValue,
})).key(key)), aggedjs;
-object - wrap;
"},;
_ => key && getHead(allowMaximize),
    _ => continueDump() && getDumpBody(allowMaximize),
    /* maximize */
    dialog({
        id: _ => maximizeId,
        class: "dump-dialog",
        style: "padding:0",
        onmousedown: "var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()",
        ondragstart: "const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'",
        ondrag: "const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';",
        ondragend: "const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false",
    }, div({
        style: "padding:.25em",
        onMousedown: "this.parentNode.draggable=true"
    }, _ => maximize && getHead(false)), _ => maximize && getDumpBody(false), div({ style: "padding:.25em" }, button({
        type: "button",
        onClick: minimize,
        style: "width:100%",
    }, '🅧 close object')));
//# sourceMappingURL=dumpObject.tag.js.map