// taggedjs-no-compile
import { isSubjectInstance } from "../../isInstance.js";
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { processAttribute } from "../attributes/processAttribute.function.js";
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js";
import { howToSetInputValue } from "../attributes/howToSetInputValue.function.js";
import { getNewGlobal } from "../../tag/index.js";
// ??? TODO: This could be done within exchangeParsedForValues to reduce loops
export function attachDomElement(nodes, values, support, counts, // used for animation stagger computing
owner, subs = [], context = []) {
    const x = document.createElement('div');
    const dom = [];
    for (const node of nodes) {
        const newNode = {}; // DomObjectText
        dom.push(newNode);
        const value = node.v;
        const isNum = !isNaN(value);
        const subVal = values[context.length];
        if (isNum) {
            const marker = document.createTextNode(empty);
            const global = getNewGlobal();
            const contextItem = {
                global
            };
            context.push(contextItem);
            global.placeholder = marker;
            if (owner) {
                paintAppends.push({
                    relative: owner,
                    element: marker,
                });
            }
            else {
                paintInsertBefores.push({
                    element: marker,
                    relative: support.subject.global.placeholder,
                });
            }
            // newNode.marker = marker
            // delete newNode.marker // delete so that the marker is not destroyed with tag
            if (isSubjectInstance(subVal)) {
                subs.push({
                    // fragment: owner,
                    insertBefore: marker,
                    appendTo: owner,
                    subject: subVal,
                    support, // ownerSupport,
                    counts,
                    contextItem,
                });
                continue;
            }
            processFirstSubjectValue(subVal, contextItem, support, counts, owner);
            continue;
        }
        if (node.nn === 'text') {
            const textNode = newNode;
            const string = textNode.tc = node.tc;
            x.innerHTML = string;
            const domElement = textNode.domElement = document.createTextNode(x.innerText);
            if (owner) {
                paintAppends.push({
                    element: domElement,
                    relative: owner,
                });
            }
            continue;
        }
        const domElement = newNode.domElement = document.createElement(node.nn);
        // attributes that may effect style, come first
        if (node.at) {
            node.at.map(attr => processAttribute(attr[0], // name
            domElement, support, howToSetInputValue, context, attr[1], // value
            attr[2]));
        }
        if (owner) {
            paintAppends.push({
                element: domElement,
                relative: owner,
            });
        }
        if (node.ch) {
            newNode.ch = attachDomElement(node.ch, values, support, counts, domElement, subs, context).dom;
        }
    }
    return { subs, dom, context };
}
//# sourceMappingURL=metaAttachDomElements.function.js.map