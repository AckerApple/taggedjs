import { BaseSupport } from './Support.class.js';
import { runAfterRender, runBeforeRender } from './tagRunner.js';
import { TagJsSubject } from './update/TagJsSubject.class.js';
const appElements = [];
/**
 *
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns
 */
export function tagElement(app, // (...args: unknown[]) => TemplaterResult,
element, props) {
    const appElmIndex = appElements.findIndex(appElm => appElm.element === element);
    if (appElmIndex >= 0) {
        appElements[appElmIndex].support.destroy();
        appElements.splice(appElmIndex, 1);
        // an element already had an app on it
        console.warn('Found and destroyed app element already rendered to element', { element });
    }
    // Create the app which returns [props, runOneTimeFunction]
    const wrapper = app(props);
    // const fragment = document.createDocumentFragment()
    const template = document.createElement('template');
    const placeholder = document.createTextNode('');
    const support = runWrapper(wrapper, template, placeholder);
    const global = support.subject.global;
    support.appElement = element;
    support.isApp = true;
    global.isApp = true;
    element.destroy = () => {
        support.destroy(); // never return anything here
    };
    global.insertBefore = placeholder // template
    ;
    global.placeholder = placeholder;
    const newFragment = support.buildBeforeElement(undefined);
    support.subject.global.oldest = support;
    support.subject.global.newest = support;
    element.setUse = app.original.setUse;
    appElements.push({ element, support });
    element.appendChild(newFragment);
    return {
        support,
        tags: app.original.tags,
    };
}
export function runWrapper(templater, insertBefore, placeholder) {
    let newSupport = {};
    // TODO: A fake subject may become a problem
    const subject = new TagJsSubject(newSupport);
    newSupport = new BaseSupport(templater, subject);
    subject.global.insertBefore = insertBefore;
    subject.global.placeholder = placeholder;
    subject.global.oldest = subject.global.oldest || newSupport;
    subject.next(templater);
    subject.support = newSupport;
    runBeforeRender(newSupport, undefined);
    // Call the apps function for our tag templater
    const wrapper = templater.wrapper;
    const support = wrapper(newSupport, subject);
    runAfterRender(newSupport, support);
    return support;
}
//# sourceMappingURL=tagElement.js.map