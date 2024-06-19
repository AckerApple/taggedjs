import { textNode } from "../../tag/textNode.js";
import { processAttribute } from "../processAttribute.function.js";
import { subscribeToTemplate } from "../subscribeToTemplate.function.js";
export function attachDomElement(nodes, scope, support, fragment, counts, // used for animation stagger computing
owner) {
    nodes.forEach((node, index) => {
        const marker = node.marker = textNode.cloneNode(false);
        // marker.textContent = `_<${index}>_`
        const subject = node.value;
        if (subject) {
            owner.appendChild(marker);
            subject.global.placeholder = marker;
            subscribeToTemplate(owner, marker, subject, support, // ownerSupport,
            counts);
            return;
        }
        if (node.nodeName === 'text') {
            const string = node.textContent;
            // parse things like &nbsp;
            const text = new DOMParser().parseFromString(string, 'text/html');
            const openingSpace = string.replace(/(^\s+)?.+/g, '$1');
            const newString = openingSpace + text.documentElement.textContent;
            owner.appendChild(marker);
            node.domElement = document.createTextNode(newString);
            owner.appendChild(node.domElement);
            return;
        }
        node = node;
        const domElement = node.domElement = document.createElement(node.nodeName);
        owner.appendChild(domElement);
        owner.appendChild(marker);
        if (node.attributes) {
            node.attributes.forEach(attr => {
                processAttribute(attr, domElement, scope, support);
            });
        }
        if (node.children) {
            attachDomElement(node.children, scope, support, fragment, counts, domElement);
        }
    });
    return nodes;
}
//# sourceMappingURL=metaAttachDomElements.function.js.map