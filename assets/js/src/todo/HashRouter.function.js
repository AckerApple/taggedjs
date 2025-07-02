import { callback, onDestroy, state } from "taggedjs";
const getHash = () => window.location.hash.substring(1) || '/';
/** only should run once */
const HashRouter = (onHashChange) => {
    const listener = () => onHashChange(getHash());
    window.addEventListener('hashchange', listener);
    return listener;
};
/** Hook into browser window hash changes and cause state to render after change */
export const useHashRouter = () => {
    const memory = state(() => ({
        route: getHash(),
        location: window.location,
    }));
    // What to run on change and signify a state change will occur. Only first instance is used below in listener
    const onHashChange = callback((route) => memory.route = getHash());
    // runs function call only once
    const listener = state(() => {
        return HashRouter(onHashChange);
    });
    onDestroy(() => window.removeEventListener('hashchange', listener));
    return memory;
};
//# sourceMappingURL=HashRouter.function.js.map