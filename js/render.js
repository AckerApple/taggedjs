export function buildClones(temporary, insertBefore) {
    const clones = [];
    const template = temporary.children[0];
    let nextSibling = template.content.firstChild;
    const fragment = document.createDocumentFragment();
    while (nextSibling) {
        const nextNextSibling = nextSibling.nextSibling;
        fragment.appendChild(nextSibling);
        // ??? new
        /*
        if(nextSibling.nodeName === 'TEMPLATE') {
          const hasAttribute = (nextSibling as any).hasAttribute
          if(hasAttribute && (nextSibling as any).hasAttribute('interpolate')) {
            nextSibling = nextNextSibling
            continue // we don't record position keepers
          }
        }
        */
        clones.push(nextSibling);
        nextSibling = nextNextSibling;
    }
    // swap out our template for an empty-string placeholder
    /*
    if(insertBefore.parentNode) {
      const parentNode = insertBefore.parentNode as ParentNode
      parentNode.insertBefore(fragment, insertBefore)
    }
    */
    return clones;
}
//# sourceMappingURL=render.js.map