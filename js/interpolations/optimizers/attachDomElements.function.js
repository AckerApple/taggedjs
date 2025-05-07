// taggedjs-no-compile
import { howToSetFirstInputValue } from "../attributes/howToSetInputValue.function.js";
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js";
import { processAttribute } from "../attributes/processAttribute.function.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { attachDynamicDom } from "./attachDynamicDom.function.js";
export const blankHandler = () => undefined;
const someDiv = (typeof document === 'object' && document.createElement('div')); // used for content cleaning
export function attachDomElements(nodes, values, support, counts, // used for animation stagger computing
context, depth, // used to know if dynamic variables live within parent owner tag/support
appendTo, insertBefore) {
    const dom = [];
    if (appendTo && insertBefore === undefined) {
        insertBefore = document.createTextNode(empty);
        paintAppends.push({
            element: insertBefore,
            relative: appendTo,
        });
        appendTo = undefined;
    }
    for (let index = 0; index < nodes.length; ++index) {
        const node = nodes[index];
        const value = node.v;
        const isNum = !isNaN(value);
        if (isNum) {
            const index = context.length;
            const value = values[index];
            attachDynamicDom(value, context, support, counts, depth, appendTo, insertBefore);
            continue;
        }
        const newNode = {}; // DomObjectText
        dom.push(newNode);
        if (node.nn === 'text') {
            attachDomText(newNode, node, appendTo, insertBefore);
            continue;
        }
        // one single html element
        const domElement = attachDomElement(newNode, node, values, support, context, counts, appendTo, insertBefore);
        if (node.ch) {
            newNode.ch = attachDomElements(node.ch, values, support, counts, context, depth + 1, domElement, insertBefore).dom;
        }
    }
    return { dom, context };
}
function attachDomElement(newNode, node, values, support, context, counts, appendTo, insertBefore) {
    const domElement = newNode.domElement = document.createElement(node.nn);
    // attributes that may effect style, come first for performance
    if (node.at) {
        node.at.forEach(attr => {
            const name = attr[0];
            const value = attr[1];
            const isSpecial = attr[2] || false;
            processAttribute(values, name, domElement, support, 
            // howToSetInputValue, // maybe more performant for updates but not first renders
            howToSetFirstInputValue, context, isSpecial, counts, value);
        });
    }
    if (appendTo) {
        paintAppends.push({
            element: domElement,
            relative: appendTo,
        });
    }
    else {
        paintInsertBefores.push({
            element: domElement,
            relative: insertBefore,
        });
    }
    return domElement;
}
function attachDomText(newNode, node, owner, insertBefore) {
    const textNode = newNode;
    const string = textNode.tc = node.tc;
    someDiv.innerHTML = string;
    const domElement = textNode.domElement = document.createTextNode(someDiv.innerText);
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
}
//# sourceMappingURL=attachDomElements.function.js.map