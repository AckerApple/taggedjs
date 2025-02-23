// taggedjs-no-compile
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js";
import { howToSetInputValue } from "../attributes/howToSetInputValue.function.js";
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js";
import { processAttribute } from "../attributes/processAttribute.function.js";
import { addOneContext } from "../../tag/index.js";
import { isSubjectInstance } from "../../isInstance.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { updateExistingValue } from "../../tag/update/updateExistingValue.function.js";
export const blankHandler = () => undefined;
const someDiv = (typeof document === 'object' && document.createElement('div')); // used for content cleaning
export function attachDomElements(nodes, values, support, counts, // used for animation stagger computing
context, depth, // used to know if dynamic variables live within parent owner tag/support
owner, insertBefore, subs = []) {
    const dom = [];
    for (const node of nodes) {
        const newNode = {}; // DomObjectText
        dom.push(newNode);
        const value = node.v;
        const isNum = !isNaN(value);
        if (isNum) {
            attachDynamicDom(values, context, owner, support, subs, counts, depth);
            continue;
        }
        if (node.nn === 'text') {
            const textNode = newNode;
            const string = textNode.tc = node.tc;
            someDiv.innerHTML = string;
            const domElement = textNode.domElement = document.createTextNode(someDiv.innerText);
            domElement.id = `tp_${context.length}_${values.length}`;
            if (owner) {
                paintAppends.push({
                    element: domElement,
                    relative: owner,
                });
            }
            else {
                paintInsertBefores.push({
                    element: domElement,
                    relative: insertBefore,
                });
            }
            continue;
        }
        const domElement = newNode.domElement = document.createElement(node.nn);
        // attributes that may effect style, come first
        if (node.at) {
            node.at.map(attr => {
                const name = attr[0];
                const value = attr[1];
                const isSpecial = attr[2] || false;
                processAttribute(values, name, domElement, support, howToSetInputValue, context, isSpecial, counts, value);
            });
        }
        if (owner) {
            paintAppends.push({
                element: domElement,
                relative: owner,
            });
        }
        else {
            paintInsertBefores.push({
                element: domElement,
                relative: insertBefore,
            });
        }
        if (node.ch) {
            newNode.ch = attachDomElements(node.ch, values, support, counts, context, depth + 1, domElement, insertBefore, subs).dom;
        }
    }
    return { subs, dom, context };
}
function attachDynamicDom(values, context, owner, support, subs, counts, // used for animation stagger computing
depth) {
    const subVal = values[context.length];
    const marker = document.createTextNode(empty);
    marker.id = `dvp_${context.length}_${values.length}`;
    const contextItem = addOneContext(subVal, context, depth > 0);
    contextItem.placeholder = marker;
    if (owner) {
        paintAppends.push({
            relative: owner,
            element: marker,
        });
    }
    else {
        paintInsertBefores.push({
            element: marker,
            relative: support.subject.placeholder,
        });
    }
    if (isSubjectInstance(subVal)) {
        subs.push({
            insertBefore: marker,
            appendTo: owner,
            subject: subVal,
            support, // ownerSupport,
            counts,
            contextItem,
        });
        contextItem.handler = blankHandler;
        return;
    }
    // how to handle value updates
    contextItem.handler = (newValue, _newValues, newSupport, newContextItem) => updateExistingValue(newContextItem, newValue, newSupport);
    const global = support.subject.global;
    global.locked = true;
    processFirstSubjectValue(subVal, contextItem, support, counts, `rvp_${context.length}_${values.length}`, owner);
    const global2 = support.subject.global;
    delete global2.locked;
    contextItem.value = subVal;
    return;
}
//# sourceMappingURL=attachDomElements.function.js.map