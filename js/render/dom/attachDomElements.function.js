// taggedjs-no-compile
import { howToSetFirstInputValue, howToSetStandAloneAttr } from "../../interpolations/attributes/howToSetInputValue.function.js";
import { paintAppend, paintAppendElementString, paintAppends, paintBefore, paintBeforeElementString, paintCommands } from "../paint.function.js";
import { processAttribute } from "../attributes/processAttribute.function.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { attachDynamicDom } from "../../interpolations/optimizers/attachDynamicDom.function.js";
export const blankHandler = function blankHandler() {
    return undefined;
};
export function attachDomElements(nodes, values, support, counts, // used for animation stagger computing
contexts, depth, // used to know if dynamic variables live within parent owner tag/support
appendTo, insertBefore) {
    const dom = [];
    if (appendTo && insertBefore === undefined) {
        insertBefore = document.createTextNode(empty);
        paintAppends.push([paintAppend, [appendTo, insertBefore]]);
        appendTo = undefined;
    }
    for (let index = 0; index < nodes.length; ++index) {
        const node = nodes[index];
        const value = node.v;
        const isNum = !isNaN(value);
        if (isNum) {
            const index = contexts.length;
            const value = values[index];
            attachDynamicDom(value, contexts, support, counts, depth, appendTo, insertBefore);
            continue;
        }
        const newNode = {}; // DomObjectText
        dom.push(newNode);
        if (node.nn === 'text') {
            attachDomText(newNode, node, appendTo, insertBefore);
            continue;
        }
        // one single html element
        const domElement = attachDomElement(newNode, node, values, support, contexts, counts, appendTo, insertBefore);
        if (node.ch) {
            newNode.ch = attachDomElements(node.ch, values, support, counts, contexts, depth + 1, domElement, insertBefore).dom;
        }
    }
    return { dom, contexts };
}
function attachDomElement(newNode, node, values, support, contexts, counts, appendTo, insertBefore) {
    const domElement = newNode.domElement = document.createElement(node.nn);
    // attributes that may effect style, come first for performance
    if (node.at) {
        for (const attr of node.at) {
            const name = attr[0];
            const value = attr[1];
            const isSpecial = attr[2] || false;
            const howToSet = attr.length > 1 ? howToSetFirstInputValue : howToSetStandAloneAttr;
            processAttribute(values, name, domElement, support, howToSet, contexts, isSpecial, counts, value);
        }
    }
    if (appendTo) {
        paintAppends.push([paintAppend, [appendTo, domElement]]);
    }
    else {
        paintCommands.push([paintBefore, [insertBefore, domElement]]);
    }
    return domElement;
}
function attachDomText(newNode, node, owner, insertBefore) {
    const textNode = newNode;
    const string = textNode.tc = node.tc;
    if (owner) {
        paintAppends.push([paintAppendElementString, [owner, string, function afterAppenDomText(elm) {
                    textNode.domElement = elm;
                }]]);
        return;
    }
    paintCommands.push([paintBeforeElementString, [insertBefore, string, function afterInsertDomText(elm) {
                textNode.domElement = elm;
            }]]);
}
//# sourceMappingURL=attachDomElements.function.js.map