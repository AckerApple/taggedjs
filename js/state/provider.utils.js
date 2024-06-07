import { deepClone, deepEqual } from '../deepFunctions.js';
import { renderTagSupport } from '../tag/render/renderTagSupport.function.js';
export function providersChangeCheck(tagSupport) {
    const global = tagSupport.global;
    const providersWithChanges = global.providers.filter(provider => !deepEqual(provider.instance, provider.clone));
    console.log('providersWithChanges', providersWithChanges);
    // reset clones
    for (let index = providersWithChanges.length - 1; index >= 0; --index) {
        const provider = providersWithChanges[index];
        const owner = provider.owner;
        handleProviderChanges(owner, provider);
        provider.clone = deepClone(provider.instance);
    }
}
function handleProviderChanges(appSupport, provider) {
    const tagsWithProvider = getTagsWithProvider(appSupport, provider);
    console.log('tagsWithProvider', tagsWithProvider.length);
    for (let index = tagsWithProvider.length - 1; index >= 0; --index) {
        const { tagSupport, renderCount, provider } = tagsWithProvider[index];
        if (tagSupport.global.deleted) {
            console.log('?!?!?!?!? deleted -------');
            continue; // i was deleted after another tag processed
        }
        const notRendered = renderCount === tagSupport.global.renderCount;
        console.log(' ------- notRendered', { index, notRendered });
        if (notRendered) {
            provider.clone = deepClone(provider.instance);
            renderTagSupport(tagSupport.global.newest, // tagSupport, // tagSupport.global.newest as TagSupport,
            false);
            continue;
        }
    }
}
/** Updates and returns memory of tag providers */
function getTagsWithProvider(tagSupport, provider, memory = []) {
    memory.push({
        tagSupport,
        renderCount: tagSupport.global.renderCount,
        provider,
    });
    const childTags = provider.children;
    console.log('childTags', childTags.length);
    for (let index = childTags.length - 1; index >= 0; --index) {
        memory.push({
            tagSupport: childTags[index],
            renderCount: childTags[index].global.renderCount,
            provider,
        });
    }
    return memory;
}
//# sourceMappingURL=provider.utils.js.map