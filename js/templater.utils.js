import { isTagInstance } from './isInstance';
import { runAfterRender, runBeforeRedraw, runBeforeRender } from './tagRunner';
import { setUse } from './setUse.function';
export class TemplaterResult {
    props;
    children;
    tagged;
    wrapper;
    global = {
        context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
        providers: [],
        /** Indicator of re-rending. Saves from double rending something already rendered */
        renderCount: 0,
    };
    tagSupport;
    constructor(props, children) {
        this.props = props;
        this.children = children;
    }
    redraw;
    isTemplater = true;
    renderWithSupport(tagSupport, existingTag, ownerTag) {
        const wrapTagSupport = tagSupport; // this.tagSupport
        // this.tagSupport = wrapTagSupport
        /* BEFORE RENDER */
        // signify to other operations that a rendering has occurred so they do not need to render again
        // ++wrapTagSupport.memory.renderCount
        const runtimeOwnerTag = existingTag?.ownerTag || ownerTag;
        if (existingTag) {
            runBeforeRedraw(wrapTagSupport, existingTag);
        }
        else {
            if (!wrapTagSupport) {
                throw new Error('63521');
            }
            // first time render
            runBeforeRender(wrapTagSupport, runtimeOwnerTag);
            // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
            const providers = setUse.memory.providerConfig;
            providers.ownerTag = runtimeOwnerTag;
        }
        /* END: BEFORE RENDER */
        const retag = this.wrapper(wrapTagSupport);
        /* AFTER */
        runAfterRender(wrapTagSupport, retag);
        retag.ownerTag = runtimeOwnerTag;
        wrapTagSupport.templater.global.newest = retag;
        if (this.global.oldest && !this.global.oldest.hasLiveElements) {
            throw new Error('56513540');
        }
        if (wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
            throw new Error('5555 - 10');
        }
        // new maybe not needed
        // this.oldest = this.oldest || retag
        // wrapTagSupport.oldest = wrapTagSupport.oldest || retag
        return { remit: true, retag };
    }
}
/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(props, templater) {
    function callback(toCall, callWith) {
        const renderCount = templater.global.renderCount;
        const callbackResult = toCall(...callWith);
        const tag = templater.global.newest;
        let tagSupport = tag?.tagSupport.ownerTagSupport;
        if (tagSupport) {
            tagSupport = templater.global.newest?.tagSupport || templater.global.oldest?.tagSupport || tagSupport;
        }
        if (templater.global.renderCount > renderCount) {
            throw new Error('already rendered');
        }
        const ownerTag = tag?.ownerTag;
        if (ownerTag) {
            const newestOwner = ownerTag.tagSupport.templater.global.newest;
            newestOwner.tagSupport.render();
            return;
        }
        console.log('alter prop reder', {
            original: tagSupport.templater.wrapper.original,
            ownerTag: tag?.ownerTag,
        });
        const newTag = tagSupport.render(); // call owner to render
        if (!templater.global.oldest) {
            throw new Error('lklk');
        }
        templater.global.newest = newTag;
        // templater.global.oldest = templater.global.oldest || newTag
        return callbackResult;
    }
    const isPropTag = isTagInstance(props);
    const watchProps = isPropTag ? 0 : props;
    const newProps = resetFunctionProps(watchProps, callback);
    return newProps;
}
function resetFunctionProps(props, callback) {
    if (typeof (props) !== 'object') {
        return props;
    }
    const newProps = props;
    // BELOW: Do not clone because if first argument is object, the memory ref back is lost
    // const newProps = {...props} 
    Object.entries(newProps).forEach(([name, value]) => {
        if (value instanceof Function) {
            const original = newProps[name].original;
            if (original) {
                return; // already previously converted
            }
            newProps[name] = (...args) => {
                return callback(value, args);
            };
            newProps[name].original = value;
            return;
        }
    });
    return newProps;
}
//# sourceMappingURL=templater.utils.js.map