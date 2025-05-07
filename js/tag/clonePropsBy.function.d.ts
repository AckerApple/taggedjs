import { Props } from '../Props.js';
import { AnySupport } from './AnySupport.type.js';
export declare function clonePropsBy(support: AnySupport, props: Props, castProps?: Props): {
    latest: Props;
    castProps: Props | undefined;
} | undefined;
