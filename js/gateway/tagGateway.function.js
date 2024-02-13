import { redrawTag } from "../redrawTag.function.js";
import { tagElement } from "../tagElement.js";
const gateways = {};
const gatewayTagIds = {};
export function checkAllGateways() {
    Object.entries(gateways).forEach(([id, gateways]) => checkGateways(gateways));
}
export function checkGateways(gateways) {
    gateways.forEach(gateway => checkGateway(gateway));
}
function checkGateway(gateway) {
    const { element } = gateway;
    if (document.body.contains(element)) {
        return; // its still good, do not continue to destroy
    }
    destroyGateway(gateway);
    return false;
}
export function destroyGateway(gateway) {
    const { id, observer, tag } = gateway;
    observer.disconnect();
    tag.destroy();
    delete gateways[id];
}
export function getTagId(component) {
    const componentString = functionToHtmlId(component);
    return '__tagTemplate_' + componentString;
}
export function loadTagId(id, component) {
    gatewayTagIds[id] = component;
}
const namedTimeouts = {};
export const tagGateway = function tagGateway(component) {
    const id = getTagId(component);
    if (namedTimeouts[id]) {
        return namedTimeouts[id];
    }
    let intervalId;
    let hitCount = 0;
    const interval = 5;
    function findElements() {
        const elements = checkTagElementsById(id, component);
        if (!elements.length) {
            return elements.length;
        }
        // Element has been found, load
        if (intervalId) {
            clearInterval(intervalId);
        }
        delete namedTimeouts[id];
        return elements.length;
    }
    function findElement() {
        intervalId = setInterval(() => {
            hitCount = hitCount + interval;
            if (hitCount >= 2000) {
                clearInterval(intervalId);
                throw new Error(`TaggedJs Element ${id} not found`);
            }
            findElements();
        }, interval);
    }
    const elementCounts = findElements();
    if (elementCounts) {
        return { id };
    }
    findElement();
    namedTimeouts[id] = { id };
    return namedTimeouts[id];
};
function parsePropsString(element) {
    const propsString = element.getAttribute('props');
    if (!propsString) {
        return { element };
    }
    try {
        const props = JSON.parse(propsString);
        // props.element = element
        props.dispatchEvent = function (name, eventData) {
            const event = new CustomEvent(name, eventData);
            element.dispatchEvent(event);
        };
        return props;
    }
    catch (err) {
        console.warn('Failed to parse props on element', { element, propsString });
        throw err;
    }
}
/** adds to gateways[id].push */
function watchElement(id, targetNode, tag, component) {
    let lastTag = tag;
    const observer = new MutationObserver((mutationsList, observer) => {
        if (!checkGateway(gateway)) {
            return;
        }
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                updateTag();
            }
        }
    });
    function updateTag() {
        const templater = tag.tagSupport.templater;
        const oldProps = templater.tagSupport.props;
        templater.tagSupport.props = parsePropsString(targetNode);
        const isSameProps = JSON.stringify(oldProps) === JSON.stringify(templater.tagSupport.props);
        if (isSameProps) {
            return; // no reason to update, same props
        }
        templater.tagSupport.latestProps = templater.tagSupport.props;
        const result = redrawTag(lastTag, templater);
        // update records
        gateway.tag = lastTag = result.retag;
    }
    ;
    targetNode.updateTag = updateTag;
    loadTagId(id, component);
    const gateway = { id, tag, observer, component, element: targetNode };
    gateways[id] = gateways[id] || [];
    gateways[id].push(gateway);
    // Configure the observer to watch for changes in child nodes and attributes
    const config = { attributes: true };
    // Start observing the target node for specified changes
    observer.observe(targetNode, config);
}
function functionToHtmlId(func) {
    // Convert function to string
    let funcString = func.toString();
    // Remove spaces and replace special characters with underscores
    let cleanedString = funcString.replace(/\s+/g, '_')
        .replace(/[^\w\d]/g, '_');
    // Ensure the ID starts with a letter
    if (!/^[a-zA-Z]/.test(cleanedString)) {
        cleanedString = 'fn_' + cleanedString;
    }
    return cleanedString;
}
function checkTagElementsById(id, component) {
    const elements = document.querySelectorAll('#' + id);
    return checkTagElements(id, elements, component);
}
function checkTagElements(id, elements, component) {
    elements.forEach(element => checkElement(id, element, component));
    return elements;
}
export function checkByElement(element) {
    const id = element.getAttribute('id');
    if (!id) {
        const message = 'No matching gateway tag registered';
        console.warn(message, { id, element });
        throw new Error(message);
    }
    const gateway = gateways[id].find(({ element: elm }) => elm === element);
    if (!gateway) {
        const message = 'Gateway reg found by id but no matching element';
        console.warn(message, { id, element });
        throw new Error(message);
    }
    const component = gateway.component;
    checkElement(id, element, component);
    return gateway;
}
export function checkElement(id, element, component) {
    const updateTag = element.updateTag;
    if (updateTag) {
        updateTag();
        return;
    }
    const props = parsePropsString(element);
    try {
        const { tag } = tagElement(component, element, props);
        // watch element AND add to gateways[id].push()
        watchElement(id, element, tag, component);
    }
    catch (err) {
        console.warn('Failed to render component to element', { component, element, props });
        throw err;
    }
}
//# sourceMappingURL=tagGateway.function.js.map