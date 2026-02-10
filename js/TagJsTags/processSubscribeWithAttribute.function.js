import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js";
export function processSubscribeWithAttribute(name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element, _tagJsVar, // its the same as the value
contextItem, ownerSupport) {
    const { subContext } = processSubscribeAttribute(name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
    element, value, contextItem, ownerSupport);
    if (!subContext.hasEmitted) {
        emitSubScriptionAsIs(value, subContext);
    }
}
export function emitSubScriptionAsIs(value, subContext) {
    const TagJsTag = subContext.tagJsVar;
    const onOutput = TagJsTag.onOutput; // value.onOutput
    const observables = value.Observables;
    let obValue = observables[0]?.value || value.withDefault;
    // subContext.hasEmitted = true
    // subContext.lastValues[0] = obValue
    if (value.callback) {
        obValue = value.callback(obValue);
    }
    onOutput(obValue, true, subContext);
}
//# sourceMappingURL=processSubscribeWithAttribute.function.js.map