import { subscribeWith, tag, ValueSubject, combineLatest, willPromise, subscribe, Subject, host, fieldset, legend, span, button, div, noElement, strong, select, option, b } from "taggedjs";
import { startWith } from "rxjs";
export const subscriptions = tag(() => {
    const sub0 = new Subject();
    const sub1 = new ValueSubject(3);
    const subArray = new ValueSubject(['a', 'b', 'c']);
    const vs0 = new ValueSubject(0);
    const vs1 = new ValueSubject(1);
    return div(fieldset(legend('Subscribe()'), div.style `display:flex;flex-wrap:wrap;gap:1em;font-size:0.8em`(div({ style: "display:flex;flex-wrap:wrap;gap:1em" }, fieldset({ style: "flex-grow:1" }, legend('subscribe'), '0 === ', span({ id: "content-subscribe-sub0" }, subscribe(sub0))), fieldset({ style: "flex-grow:1" }, legend('subscribe map'), '0 === ', span({ id: "content-subscribe-sub-map" }, subscribe(subArray, array => array.map(x => noElement('👉', strong(x), '👈').key(x))))), fieldset({ style: "flex-grow:1" }, legend('subscribe select'), select(option({ value: "" }, 'select option'), subscribe(subArray, array => {
        return array.map(x => option({ value: x }, x).key(x));
    }))), fieldset({ style: "flex-grow:1" }, legend('subscribe with default'), '0 === ', span({ id: "content-subscribe-sub0-with" }, subscribeWith(sub0, -1))), fieldset({ style: "flex-grow:1" }, legend('value subject'), '0 === ', subscribe(vs0)), fieldset({ style: "flex-grow:1" }, legend('piped subject'), span({ id: "content-subject-pipe-display0" }, '55'), '\u00A0===\u00A0', span({ id: "content-subject-pipe-display1" }, subscribe(vs0, () => 55))), testHost, fieldset({ style: "flex-grow:1" }, legend('combineLatest'), span({ id: "content-combineLatest-pipe-display0" }, '1'), '\u00A0===\u00A0', span({ id: "content-combineLatest-pipe-display1" }, subscribe(combineLatest([vs0, vs1]).pipe(x => x[1])))), fieldset({ style: "flex-grow:1" }, legend('combineLatest piped html'), span({ id: "content-combineLatest-pipeHtml-display0" }, b('bold 77')), '\u00A0===\u00A0', span({ id: "content-combineLatest-pipeHtml-display1" }, subscribe(combineLatest([vs0, vs1]).pipe(willPromise(x => Promise.resolve(b('bold 77'))))))))), span('onOffValue:', span.id `passed-in-sub-hideShow-value`(_ => onOff)), div(strong('test 0'), div.id `passed-in-sub-ex0`('0||', _ => onOff && subscribe(sub0), '||0')), div(strong('test 1'), div.id `passed-in-sub-ex1`('1||', _ => onOff && subscribe(sub0, numberFun), '||1')), div.id `passed-in-sub-ex2`('2||', _ => onOff && subscribe(sub0, numberTag), '||2'), div.id `passed-in-sub-ex3`('3||', subscribe(sub1, numberTag), '||3'), div.id `passed-in-sub-ex4`('4||', subscribe(ob, numberTag), '||4'), div.id `passed-in-sub-ex4`('5||', subscribe(ob.pipe(startWith(33)), numberTag), '||5'), div.id `passed-in-sub-ex4`('6||', subscribe(ob.pipe(startWith(undefined)), (x) => numberTag(x)), '||6'), div.id `passed-in-sub-ex4`('7||', subscribe(ob, (x) => numberTag(x)), '||7')));
});
const numberFun = (x) => {
    return `your fun number ${x}`;
};
const numberTag = tag((x) => {
    numberTag.updates(y => [x] = y);
    return noElement(_ => `your tag number ${x}`);
});
const testHost = tag(() => {
    let hideShow = true;
    let destroyCount = 0;
    let clickCounter = 0;
    return fieldset.style `flex-grow:1`(legend('host'), _ => hideShow && noElement(span({
        id: "hostedContent",
        attr: host(() => tag.element.get().innerHTML = Date.now().toString(), {
            onDestroy: () => {
                ++destroyCount;
            },
        })
    }), button({
        type: "button",
        onClick: () => ++clickCounter
    }, 'clickCounter:', _ => clickCounter)), button({
        id: "hostHideShow",
        onClick: () => hideShow = !hideShow
    }, 'hide/show'), div('destroyCount: ', span({ id: "hostDestroyCount" }, _ => destroyCount)));
});
//# sourceMappingURL=subscriptions.tag.js.map