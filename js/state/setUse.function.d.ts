import { BaseSupport, Support } from '../tag/Support.class.js';
import { Config } from './state.utils.js';
interface TagUse {
    beforeRender: (support: BaseSupport | Support, ownerTag?: Support | BaseSupport) => void;
    beforeRedraw: (support: BaseSupport | Support, tag: Support | BaseSupport) => void;
    afterRender: (support: BaseSupport | Support, ownerSupport?: Support | BaseSupport) => void;
    beforeDestroy: (support: BaseSupport | Support, tag: Support | BaseSupport) => void;
}
export type UseOptions = {
    beforeRender?: (support: Support | BaseSupport, ownerTag?: Support | BaseSupport) => void;
    beforeRedraw?: (support: BaseSupport | Support, tag: Support | BaseSupport) => void;
    afterRender?: (support: BaseSupport | Support, ownerSupport?: Support | BaseSupport) => void;
    beforeDestroy?: (support: BaseSupport | Support, tag: Support | BaseSupport) => void;
};
export declare function setUse(use: UseOptions): void;
export declare namespace setUse {
    var tagUse: TagUse[];
    var memory: UseMemory;
}
type UseMemory = (Record<string, any> & {
    stateConfig: Config;
    currentSupport: Support;
});
export {};
