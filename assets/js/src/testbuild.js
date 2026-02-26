import { RouteQuery, ValueSubject, ValueTypes, oneRenderToSupport, reRenderTag, getNewGlobal, getBaseSupport, valueToTagJsVar, Subject } from 'taggedjs';
import App from './pages/app.js';
import isolatedApp from './pages/isolatedApp.page.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const run = () => {
    const param = '';
    const routeProps = {
        param,
        paramSubject: new ValueSubject(param),
        query: new RouteQuery(),
    };
    const routeTag = (extraProps) => {
        const allProps = Object.assign({}, routeProps);
        Object.assign({}, extraProps);
        return isolatedApp(allProps); // ()
    };
    return App(routeTag);
};
const templater = run();
const html = templaterToHtml(templater, undefined);
const fileSavePath = './pages/isolatedApp.page.html';
const fullFileSavePath = path.join(__dirname, fileSavePath);
fs.writeFileSync(fullFileSavePath, html);
console.debug(`💾 wrote ${fileSavePath}`);
function templaterToSupport(templater, parentContext) {
    const context = {
        renderCount: 0,
        updateCount: 0,
        varCounter: 0,
        valueIndex: 0,
        destroy$: new Subject(),
        render$: new Subject(),
        value: templater,
        tagJsVar: valueToTagJsVar(templater),
        global: undefined, // populated below in getNewGlobal
        parentContext,
        withinOwnerElement: false,
        contexts: [],
        state: {},
    };
    getNewGlobal(context);
    templater.props = templater.props || [];
    const support = getBaseSupport(templater, context);
    readySupport(support, context);
    return support;
}
function readySupport(support, subject) {
    const global = subject.global;
    subject.state.newest = support;
    subject.state.oldest = support;
    // renderTagOnly(support, support, subject)
    reRenderTag(support, support, subject);
    // buildSupportContext(support)
    return support;
}
function templaterToHtml(templater, parentContext) {
    const support = templaterToSupport(templater, parentContext);
    const context = support.context.contexts;
    const tag = support.templater.tag; // TODO: most likely do not want strings below
    const template = tag.strings; // support.getTemplate()
    const strings = new Array(...template); // clone
    const values = Object.values(context);
    values.reverse().forEach((subject, index) => {
        processValue(subject.value, strings, values.length - 1 - index, support, subject);
    });
    return strings.join('');
}
function processValue(value, strings, index, support, subject) {
    if (value instanceof Object && value.tagJsType) {
        switch (value.tagJsType) {
            case ValueTypes.tagComponent:
                const tagString = templaterToHtml(value, support.context);
                strings.splice(index + 1, 0, tagString);
                break;
            case ValueTypes.renderOnce:
                const tSupport = oneRenderToSupport(value, subject, support);
                readySupport(tSupport, subject);
                const fnString = templaterToHtml(tSupport.templater, support.context);
                strings.splice(index + 1, 0, fnString);
                break;
            case ValueTypes.templater:
            case ValueTypes.tag:
                const tag = value.tag; // ??? TODO
                const subStrings = new Array(...tag.strings); // .reverse()
                const string = subStrings.map((x, index) => {
                    const value = tag.values[index];
                    const valueIndex = tag.strings.length - 1 - index;
                    x + processValue(value, [], valueIndex, support, {
                        updateCount: 0,
                        value,
                        valueIndex,
                        global: getNewGlobal(subject),
                        parentContext: support.context,
                        tagJsVar: valueToTagJsVar(value),
                        destroy$: new Subject(),
                        render$: new Subject(),
                        withinOwnerElement: subject?.withinOwnerElement || false,
                    });
                }).join('');
                strings.splice(index + 1, 0, string);
                break;
        }
    }
    else {
        if (value instanceof Function) {
            strings.splice(index + 1, 0, '"' + value.toString() + '"');
        }
        else {
            if ([undefined, null].includes(value)) {
                value = '';
            }
            strings.splice(index + 1, 0, value.toString());
        }
    }
    return strings;
}
//# sourceMappingURL=testbuild.js.map