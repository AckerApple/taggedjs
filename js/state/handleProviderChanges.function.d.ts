import { AnySupport } from '../tag/index.js';
import { Provider } from './providers.js';
export declare function handleProviderChanges(appSupport: AnySupport, provider: Provider): TagWithProvider[];
export type TagWithProvider = {
    support: AnySupport;
    renderCount: number;
    provider: Provider;
};
