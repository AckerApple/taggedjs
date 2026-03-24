import { painting } from './paint.function.js';
/** Function that kicks off actually putting tags down as HTML elements */
export function buildBeforeElement(support, appendTo, insertBefore) {
    const subject = support.context;
    // TODO this is only needed for components and not basic tags
    subject.state = subject.state || {};
    const stateMeta = subject.state;
    stateMeta.oldest = support;
    stateMeta.newest = support;
    subject.state.older = subject.state.newer;
    ++painting.locks;
    const result = ''; /*attachHtmlDomMeta(
      support,
      support.context,
      appendTo,
      insertBefore,
    )*/
    subject.htmlDomMeta = result.dom;
    --painting.locks;
    // return fragment
    return result;
}
//# sourceMappingURL=buildBeforeElement.function.js.map