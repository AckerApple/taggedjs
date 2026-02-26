import { tag, noElement, button, span, small, div, textarea, pre, fieldset, legend, hr, input, h3, output } from "taggedjs";
import { renderCountDiv } from "./renderCount.component.js";
import statePropDebugTag from "./statePropDebug.tag.js";
let counting = 0;
export const propsDebugMain = tag((_ = 'propsDebugMain') => {
    let syncPropNumber = 0;
    let propNumber = 0;
    let renderCount = 0;
    let propsJson = { test: 33, x: 'y' };
    let date = new Date();
    let json = JSON.stringify(propsJson, null, 2);
    let statePropDisplay = true;
    return div(div.style `display:flex;flex-wrap:wrap`.id `textareawrap`(textarea({
        id: "props-debug-textarea",
        wrap: "off",
        onChange: (event) => propsJson = JSON.parse(event.target.value),
        style: "height:200px;font-size:0.6em;width:100%;max-width:400px"
    }, _ => json), pre(json)), div(button.id `propsDebug-🥩-0-button`.onClick(() => {
        ++propNumber;
    })('🥩 propNumber ', _ => propNumber), span.id `propsDebug-🥩-0-display`(_ => propNumber)), fieldset(legend('child'), _ => propsDebug({
        propNumber,
        propsJson,
        propNumberChange: x => {
            propNumber = x;
        }
    })), fieldset(legend('sync props callback'), '🥡 syncPropNumber: ', span.id `sync-prop-number-display`(_ => syncPropNumber), button.onClick(() => ++syncPropNumber)('🥡 ++'), _ => renderCountDiv({ renderCount, name: 'sync_props_callback' }), hr, _ => syncPropDebug({
        syncPropNumber,
        propNumberChange: x => syncPropNumber = x,
        parentTest: x => {
            return x;
        }, // causes no change, however the tag did ++counter to itself which should render
    })), fieldset(legend('state prop'), _ => statePropDisplay && statePropDebugTag(propNumber, 'child innerHtml 👶'), hr, button.onClick(() => statePropDisplay = !statePropDisplay)('hide/show')), fieldset(legend('date prop'), 'date:', _ => date, input.type `date`.value(_ => timestampToValues(date).date).onChange((event) => {
        const newDateString = event.target.value;
        date = new Date(newDateString);
    })(), hr, _ => propDateDebug({ date })));
});
const propDateDebug = ({ date }) => 'date:' + date;
/** Tests calling a property that is a function immediately which should cause rendering */
const syncPropDebug = tag(({ syncPropNumber, propNumberChange, parentTest, }) => {
    propNumberChange = output(propNumberChange);
    // parentTest = output(parentTest)
    syncPropDebug.updates(x => {
        [{
                syncPropNumber,
                propNumberChange,
                parentTest,
            }] = x;
        propNumberChange = output(propNumberChange);
        // parentTest = output(parentTest)
    });
    let counter = 0;
    let renderCount = 0;
    ++renderCount;
    if (syncPropNumber % 2 === 1) {
        propNumberChange(syncPropNumber = syncPropNumber + 1);
    }
    return div(div('🥡 child syncPropNumber:', span.id `sync-prop-child-display`(_ => syncPropNumber), button.id `sync-prop-child-button`.onClick(() => propNumberChange(++syncPropNumber))('🥡 ++')), div(div('counter:', span.id `sync-prop-counter-display`(_ => counter)), 'parentTest', span.id `nothing-prop-counter-display`(_ => {
        return parentTest(counter);
    }), button.id `nothing-prop-counter-button`.onClick(() => {
        parentTest(++counter);
    })('++')), _ => renderCountDiv({ renderCount, name: 'child_sync_props_callback' }));
});
/** child */
const propsDebug = tag(({ propNumber, propsJson, propNumberChange, }) => {
    propNumberChange = output(propNumberChange);
    propsDebug.updates(x => {
        const newProp = x[0].propNumber;
        const parentChanged = newProp !== controlPropNumber;
        if (parentChanged) {
            controlPropNumber = newProp;
            ++propNumberChangeCount;
        }
        const prePropnumber = propNumber;
        propNumber = parentChanged ? newProp : propNumber;
        [{
                propsJson,
                propNumberChange,
            }] = x;
        propNumberChange = output(propNumberChange);
    });
    let propNumberChangeCount = 0;
    let controlPropNumber = propNumber;
    return noElement(h3('Props Json'), textarea.style `font-size:0.6em;height:200px;width:100%;;max-width:400px`.wrap `off`.onChange((event) => {
        const value = JSON.parse(event.target.value);
        Object.assign(propsJson, value);
    })(_ => JSON.stringify(propsJson, null, 2)), pre(_ => JSON.stringify(propsJson, null, 2)), hr, h3('Props Number'), textarea.style `font-size:0.6em;height:200px;width:100%;color:white;`.wrap `off`.attr `disabled`(_ => JSON.stringify(propNumberChangeCount, null, 2)), div(button.id `propsDebug-🥩-1-button`.onClick(() => propNumberChange(++propNumber))('🐄 🥩 my propNumber ', _ => controlPropNumber), span.id `propsDebug-🥩-1-display`(_ => controlPropNumber)), div(button.id `propsDebugLet-🥩-2-button`.onClick(() => {
        ++propNumber;
    })('🐄 🥩 local letProp propNumber ', _ => propNumber), span.id `propsDebug-🥩-let-prop-display`(_ => propNumber)), div(small('(propNumberChangeCount:', span.id `propsDebug-🥩-change-count-display`(_ => propNumberChangeCount), ')')), hr, h3('Fn update test'), _ => propFnUpdateTest({
        propNumber,
        callback: () => {
            propNumberChange(++propNumber);
        }
    }));
});
const propFnUpdateTest = tag(({ propNumber, // passed as myPropNumber
callback, }) => {
    callback = output(callback);
    propFnUpdateTest.updates(x => {
        [{ propNumber, callback }] = x;
        callback = output(callback);
    });
    let renderCount = 0;
    ++renderCount;
    return noElement(button.id `propsOneLevelFunUpdate-🥩-button`.onClick(callback)('🐄 🥩 local & 1-parent increase', _ => propNumber), span.id `propsOneLevelFunUpdate-🥩-display`(_ => propNumber), _ => renderCountDiv({ renderCount, name: 'propFnUpdateTest' }), small.style `opacity:.5`('the count here and within parent increases but not in parent parent'));
});
function timestampToValues(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`
    };
}
//# sourceMappingURL=props.tag.js.map