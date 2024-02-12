export function buildClones(temporary, insertBefore) {
    const clones = [];
    const template = temporary.children[0];
    let nextSibling = template.content.firstChild;
    while (nextSibling) {
        const nextNextSibling = nextSibling.nextSibling;
        buildSibling(nextSibling, insertBefore);
        clones.push(nextSibling);
        nextSibling = nextNextSibling;
    }
    return clones;
}
function buildSibling(nextSibling, insertBefore) {
    const parentNode = insertBefore.parentNode;
    console.log('insertBefore.parentNode', {
        parentNode: insertBefore.parentNode,
        parentNodeName: insertBefore.parentNode?.nodeName,
        insertBefore: insertBefore.nodeName,
        nextSiblingName: nextSibling.nodeName,
        nextSibling,
        data: nextSibling.textContent,
    });
    parentNode.insertBefore(nextSibling, insertBefore);
}
//# sourceMappingURL=render.js.map