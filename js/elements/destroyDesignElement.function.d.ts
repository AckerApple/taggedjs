import { AnySupport } from '../index.js';
import { ContextItem } from '../tag/ContextItem.type.js';
export declare function destroyDesignElement(context: ContextItem, ownerSupport: AnySupport): Promise<void> | undefined;
export declare function destroyDesignByContexts(contexts: ContextItem[], ownerSupport: AnySupport, promises: Promise<any>[]): number | undefined;
