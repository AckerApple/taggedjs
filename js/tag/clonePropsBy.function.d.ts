import { Props } from '../Props.js';
import { AnySupport } from './getSupport.function.js';
export declare function clonePropsBy(support: AnySupport, props: Props, castProps?: Props): {
    latest: Props;
    castProps: Props | undefined;
} | undefined;
