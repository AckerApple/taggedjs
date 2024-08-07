import { callback, onDestroy, state } from "taggedjs";
const getHash = () => window.location.hash.substring(1) || '/';
const HashRouter = () => {
    const memory = { route: getHash() };
    const onHashChange = callback(() => memory.route = getHash());
    window.addEventListener('hashchange', onHashChange);
    return { memory, onHashChange };
};
export const useHashRouter = () => {
    const { memory, onHashChange } = state(() => HashRouter());
    onDestroy(() => window.removeEventListener('hashchange', onHashChange));
    return memory;
};
//# sourceMappingURL=HashRouter.function.js.map