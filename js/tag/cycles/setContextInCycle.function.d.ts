import { AttributeContextItem } from '../AttributeContextItem.type.js';
import { ContextItem } from '../index.js';
export declare function getContextInCycle(): AttributeContextItem | ContextItem | undefined;
/** Gets the current element associated with taggedjs document processing */
export declare function getElement(): HTMLElement;
export declare function setContextInCycle(context: ContextItem | undefined): ContextItem | undefined;
export declare function removeContextInCycle(): void;
