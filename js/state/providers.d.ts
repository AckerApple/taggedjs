import { AnySupport } from '../tag/index.js';
export type Provider = {
    constructMethod: any;
    instance: any;
    stateDiff: number;
    owner: AnySupport;
    children: AnySupport[];
};
type ProviderConstructor<T> = (new (...args: any[]) => T) | (() => T);
type functionProvider<T> = () => T;
type classProvider<T> = new (...args: any[]) => T;
type Construct<T> = classProvider<T> | functionProvider<T>;
export declare const providers: {
    create: <T>(constructMethod: Construct<T>) => T;
    /**
     * @template T
     * @param {(new (...args: any[]) => T) | () => T} constructor
     * @returns {T}
     */
    inject: typeof providerInject;
};
declare function providerInject<T>(constructor: ProviderConstructor<T>): T;
export {};
