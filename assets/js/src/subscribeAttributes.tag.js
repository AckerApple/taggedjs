import { tag, Subject, ValueSubject, subscribeWith, subscribe, span, div, button, fieldset, legend } from "taggedjs";
export const subscribeAttributes = tag(() => {
    const subColor$ = new Subject();
    const subColorPurpleOrange$ = new ValueSubject('purple');
    const subColorGreenYellow$ = new ValueSubject('green');
    let shouldHideAttributes = false;
    const attributeContent = () => {
        if (shouldHideAttributes)
            return '';
        return div.style `display:flex;flex-wrap:wrap;gap:1em;font-size:0.8em`.id `subscribe-attributes-wrap`(div({ style: "display:flex;flex-wrap:wrap;gap:1em" }, fieldset({ style: "flex-grow:1" }, legend('subscribe special attribute'), span({
            id: "subscribe-style-dot-bg-color-changer",
            style: subscribeWith(subColor$, 'red', (subColor) => {
                return { backgroundColor: subColor };
            })
        }, 'background color changer')), fieldset({ style: "flex-grow:1" }, legend('subscribe style attribute'), span({
            id: "subscribe-style-bg-color",
            style: subscribeWith(subColor$, 'red', subColor => {
                return `background-color:${subColor}`;
            })
        }, 'subscribe bg color')), fieldset({ style: "flex-grow:1" }, legend('sometimes subscribe style attribute'), span({
            id: "multiple-subscribe-bg-color",
            style: () => {
                return (subColor$.value === 'blue' &&
                    subscribe(subColorPurpleOrange$, subColor => {
                        return 'background-color:' + subColor;
                    }))
                    ||
                        (subColor$.value === 'red' &&
                            subscribe(subColorGreenYellow$, subColor => {
                                return 'background-color:' + subColor;
                            }))
                    ||
                        'background-color:pink;';
            }
        }, 'multiple subscribe bg color'))));
        const currentColor = subColor$.value;
        subColor$.next(currentColor === 'red' ? 'blue' : 'red');
    };
}, `Toggle Color (`, subscribe(subColor$), ')'), button;
({
    id: 'toggle-attributes-btn',
    type: 'button',
    onClick: () => {
        shouldHideAttributes = !shouldHideAttributes;
    }
},
    () => {
        return shouldHideAttributes ? 'Show' : 'Hide';
    }, ' Attributes'), button({
    onClick: () => subColor$.next(''),
    id: "clear-color-btn",
    type: 'button'
}, `Clear Color`), `subscriptions: `, span({ id: 'subscriptions-count' }, subscribeWith(Subject.globalSubCount$, Subject.globalSubCount$.value));
//# sourceMappingURL=subscribeAttributes.tag.js.map