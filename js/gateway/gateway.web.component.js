import { checkByElement, destroyGateway } from "./tagGateway.function.js";
/** <tag-element id="" props="json-string" />
 * For Angular @NgModule({schemas: [CUSTOM_ELEMENTS_SCHEMA]}) is required
 */
export class TagElement extends HTMLElement {
    gateway;
    inlineBlock;
    constructor() {
        super();
        console.log('loading');
        this.gateway = checkByElement(this);
        this.inlineBlock = document.createElement('div');
        this.inlineBlock.style.display = 'inline-block';
        this.parentNode?.insertBefore(this.inlineBlock, this);
        console.log('loaded');
    }
    disconnectedCallback() {
        if (this.inlineBlock.parentNode) {
            this.inlineBlock.parentNode.removeChild(this.inlineBlock);
        }
        destroyGateway(this.gateway);
    }
}
/** Call me one time */
export function initWebComponents() {
    customElements.define('tag-element', TagElement);
}
//# sourceMappingURL=gateway.web.component.js.map