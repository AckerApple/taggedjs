import { BaseSupport, Support } from './Support.class.js';
export declare function runBeforeRender(support: BaseSupport | Support, ownerSupport?: Support): void;
export declare function runAfterRender(support: BaseSupport | Support, ownerSupport?: Support | BaseSupport): void;
export declare function runBeforeRedraw(support: BaseSupport | Support, ownerSupport: Support | BaseSupport): void;
export declare function runBeforeDestroy(support: Support | BaseSupport, ownerSupport: Support | BaseSupport): void;
