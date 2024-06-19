import { Tag, Dom } from './Tag.class.js';
import { ValueSubject } from '../subject/index.js';
import { kidsToTagArraySubject } from './kidsToTagArraySubject.function.js';
import { ValueTypes } from './ValueTypes.enum.js';
export class TemplaterResult {
    props;
    tagJsType = ValueTypes.templater;
    tagged;
    wrapper;
    madeChildIntoSubject;
    tag;
    children = new ValueSubject([]);
    arrayValue; // used for tag components used in arrays
    constructor(props) {
        this.props = props;
        this.html.dom = this.dom.bind(this);
    }
    key(arrayValue) {
        this.arrayValue = arrayValue;
        return this;
    }
    /** children */
    html(strings, ...values) {
        const children = new Tag(strings, values);
        const childSubject = kidsToTagArraySubject(children, this);
        this.children = childSubject;
        return this;
    }
    /** children */
    dom(strings, ...values) {
        const children = new Dom(strings, values);
        const childSubject = kidsToTagArraySubject(children, this);
        this.children = childSubject;
        return this;
    }
}
//# sourceMappingURL=TemplaterResult.class.js.map