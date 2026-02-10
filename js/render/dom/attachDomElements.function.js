// taggedjs-no-compile
import { paintAppend, paintAppendElementString, paintAppends, paintBeforeElementString, paintCommands } from "../paint.function.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { attachDynamicDom } from "../../interpolations/optimizers/attachDynamicDom.function.js";
import { attachDomElement } from "./attachDomElement.function.js";
import { Subject } from "../../subject/Subject.class.js";
import { isFunction } from "../../index.js";
export function attachDomElements(nodes, values, support, parentContext, depth, // used to know if dynamic variables live within parent owner tag/support
appendTo, insertBefore) {
    const context = support.context;
    const contexts = context.contexts;
    parentContext = context;
    // const contexts = parentContext.contexts
    const dom = [];
    if (appendTo && insertBefore === undefined) {
        insertBefore = document.createTextNode(empty);
        paintAppends.push([paintAppend, [appendTo, insertBefore]]);
        appendTo = undefined;
    }
    // loop map of elements that need to be put down on document
    for (let index = 0; index < nodes.length; ++index) {
        const node = nodes[index];
        const v = node.v;
        const isNum = !isNaN(v);
        if (isNum) {
            // const valueIndex = context.varCounter // contexts.length
            // const valueIndex = (parentContext as SupportContextItem).varCounter // contexts.length
            const valueIndex = Number(v); // (parentContext as SupportContextItem).varCounter // contexts.length
            const realValue = values[valueIndex];
            const isSkipFun = isFunction(realValue) && realValue.tagJsType === undefined;
            if (isSkipFun) {
                ++parentContext.varCounter;
                // TODO: I dont think we ever get in here?
                continue;
            }
            const contextItem = attachDynamicDom(realValue, contexts, support, parentContext, depth, appendTo, insertBefore);
            contextItem.valueIndex = valueIndex;
            continue;
        }
        const newNode = {}; // DomObjectText
        dom.push(newNode);
        if (node.nn === 'text') {
            attachDomText(newNode, node, appendTo, insertBefore);
            continue;
        }
        const domElement = newNode.domElement = document.createElement(node.nn);
        // Create parent context for attributes first
        const newParentContext = {
            updateCount: 0,
            isAttrs: true,
            target: domElement,
            parentContext,
            contexts: [],
            destroy$: new Subject(),
            render$: new Subject(),
            // paintCommands: [],
            tagJsVar: {
                tagJsType: 'new-parent-context'
            },
            valueIndex: -1,
            withinOwnerElement: true,
        };
        newParentContext.varCounter = 0;
        // one single html element. This is where attribute processing takes place
        attachDomElement(domElement, node, values, support, newParentContext, appendTo, insertBefore);
        // Update parent context with element and attribute contexts
        newParentContext.target = domElement;
        if (node.ch) {
            newNode.ch = attachDomElements(node.ch, values, support, newParentContext, 
            // contexts,
            depth + 1, domElement, insertBefore).dom;
        }
    }
    return { dom, contexts };
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