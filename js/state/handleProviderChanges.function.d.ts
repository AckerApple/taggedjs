import { AnySupport } from '../tag/Support.class.js';
import { Provider } from './providers.js';
export declare function handleProviderChanges(appSupport: AnySupport, provider: Provider): TagWithProvider[];
type TagWithProvider = {
    support: AnySupport;
    renderCount: number;
    provider: Provider;
};
export {};
