import { Provider } from './providers.js';
import { Support } from '../tag/Support.class.js';
export declare function handleProviderChanges(appSupport: Support, provider: Provider): TagWithProvider[];
type TagWithProvider = {
    support: Support;
    renderCount: number;
    provider: Provider;
};
export {};
