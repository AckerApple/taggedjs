import { clonePropsBy } from './props/clonePropsBy.function.js';
import { Subject } from '../subject/Subject.class.js';
/** used only for apps, otherwise use Support */
export function getBaseSupport(templater, subject, castedProps) {
    const baseSupport = {
        templater,
        subject,
        castedProps,
        appSupport: undefined,
    };
    // baseSupport.appSupport = baseSupport
    const global = subject.global;
    global.blocked = [];
    global.destroy$ = new Subject();
    return baseSupport;
}
/** Sets support states to empty array and clones props */
export function upgradeBaseToSupport(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
support, appSupport, castedProps) {
    // ;(support as AnySupport).state = []
    // ;(support as AnySupport).states = []
    support.appSupport = appSupport;
    const props = templater.props; // natural props
    if (props) {
        support.propsConfig = clonePropsBy(support, props, castedProps);
    }
    return support;
}
export function createHtmlSupport(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport, appSupport, subject, castedProps) {
    const support = {
        templater,
        subject,
        castedProps,
        appSupport: undefined,
    };
    support.ownerSupport = ownerSupport;
    support.appSupport = appSupport;
    return support;
}
//# sourceMappingURL=createHtmlSupport.function.js.map