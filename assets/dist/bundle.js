var e,t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},n={};function o(e,t){const n=e.templater,o=t.templater,r=n?.tag||e,s=o.tag,i=r.strings,a=t.strings||s.strings;if(i.length!==a.length)return!1;if(!i.every(((e,t)=>a[t]===e)))return!1;return function(e,t){const n=e.length===t.length;if(!n)return!1;const o=t.every(((t,n)=>{const o=e[n];if(t instanceof Function&&o instanceof Function){return!!(t.toString()===o.toString())}return!0}));if(o)return!0;return!1}(e.values||r.values,t.values||s.values)}function r(e){e.global.oldest.destroy(),s(e),e.global.context={}}function s(e){delete e.global.oldest,delete e.global.newest}function i(e,t){t.parentNode.insertBefore(e,t.nextSibling)}function a(e){return["string","number","boolean"].includes(e)}function l(e,t){s(e),e.destroy({stagger:t.removed++});const n=e.global.insertBefore;n.parentNode.removeChild(n)}function c(e){const t=e.global.insertBefore,n=e.global,o=n.placeholder;o&&(i(t,o),delete n.placeholder)}function u(t){if(null==t)return e.undefined;const n=typeof t;if(t instanceof Function)return e.function;if("object"===n){if(t instanceof Date)return e.date;if(a(n))return n;const o=t.tagJsType;if(o){if([e.tagComponent,e.templater,e.tag].includes(o))return o}if(f(t))return e.tagArray;if(b(t))return e.subject}return e.unknown}function d(t){return[e.tag,e.templater].includes(t?.tagJsType)}function p(t){return t?.tagJsType===e.tagComponent}function g(t){return t?.tagJsType===e.tag}function b(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function f(t){return t instanceof Array&&t.every((t=>[e.tag,e.templater,e.tag,e.tagComponent].includes(t?.tagJsType)))}function h(e){const t=new y;return t.subscribeWith=t=>{const n=[],o=[],r=(r,s)=>{n[s]=!0,o[s]=r;if(n.length===e.length){for(let e=n.length-1;e>=0;--e)if(!n[e])return;t(o,i)}},s=[...e],i=s.shift().subscribe((e=>r(e,0))),a=s.map(((e,t)=>e.subscribe((e=>r(e,t+1)))));return i.subscriptions=a,i},t}function m(e,t,n){const o=[...t],r=o.shift(),s=e=>{if(o.length)return m(e,o,n);n(e)};let i=s;const a=r(e,{setHandler:e=>i=e,next:s});i(a)}t.d(n,{gV:()=>En,jG:()=>Rn,l2:()=>Hn,fm:()=>yt}),function(e){e.unknown="unknown",e.tag="tag",e.templater="templater",e.tagComponent="tag-component",e.tagArray="tag-array",e.subject="subject",e.date="date",e.string="string",e.boolean="boolean",e.function="function",e[void 0]="undefined"}(e||(e={}));class y{onSubscription;methods=[];isSubject=!0;subscribers=[];subscribeWith;_value;constructor(e,t){this.onSubscription=t,this._value=e}get value(){return this._value}set value(e){this._value=e,this.set(e)}subscribe(e){const t=function(e,t){const n=y.globalSubCount$;y.globalSubCount$.set(n.value+1);const o=()=>{o.unsubscribe()};return o.callback=t,o.subscriptions=[],o.unsubscribe=()=>{!function(e,t){const n=e.findIndex((e=>e.callback===t));-1!==n&&e.splice(n,1)}(e.subscribers,t),y.globalSubCount$.set(n.value-1),o.unsubscribe=()=>o;const r=o.subscriptions;for(let e=r.length-1;e>=0;--e)r[e].unsubscribe();return o},o.add=e=>(o.subscriptions.push(e),o),o.next=e=>{t(e,o)},o}(this,e),n=this.subscribeWith;if(n){if(this.methods.length){const n=e;e=e=>{m(e,this.methods,(e=>n(e,t)))}}return n(e)}this.subscribers.push(t);const o=y.globalSubCount$.value;return y.globalSubCount$.set(o+1),this.onSubscription&&this.onSubscription(t),t}set(e){this._value=e;const t=[...this.subscribers],n=t.length;for(let o=0;o<n;++o){const n=t[o];n.callback(e,n)}}next=this.set;toPromise(){return new Promise((e=>{this.subscribe(((t,n)=>{n.unsubscribe(),e(t)}))}))}toCallback(e){return this.subscribe(((t,n)=>{n.unsubscribe(),e(t)})),this}pipe(...e){const t=new y(this._value);return t.methods=e,t.subscribeWith=e=>this.subscribe(e),t.set=e=>this.set(e),t.next=t.set,t}static all(e){return h(e.map((e=>{if(b(e))return e;return new y(e,(t=>(t.next(e),t)))})))}static globalSubCount$=new y(0)}class v extends y{constructor(e){super(e)}get value(){return this._value}set value(e){this._value=e,this.set(e)}subscribe(e){const t=super.subscribe(e);return e(this._value,t),t}}function $(){return w.memory.stateConfig.tagSupport}function w(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};w.tagUse.push(t)}w.tagUse=[],w.memory={};class S extends Error{details;constructor(e,t,n={}){super(e),this.name=S.name,this.details={...n,errorCode:t}}}class C extends S{constructor(e,t){super(e,"array-no-key-error",t),this.name=C.name}}class x extends S{constructor(e,t){super(e,"state-mismatch-error",t),this.name=x.name}}class T extends S{constructor(e,t){super(e,"sync-callback-error",t),this.name=T.name}}w.memory.stateConfig={array:[]};const k=e=>function(e){const t=e.memory,n=t.state,o=w.memory.stateConfig;o.rearray=[];const r=n?.length;if(r){for(let e=0;e<r;++e)B(n[e]);o.rearray.push(...n)}o.tagSupport=e}(e);function B(e){const t=e.callback;if(!t)return e.defaultValue;const[n,o]=function(e){const t=e(j),[n]=t,[o]=e(n);return[n,o]}(t);if(o!==j){const r='State property not used correctly. Second item in array is not setting value as expected.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n'+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(r,{state:e,callback:t,value:n,checkValue:o}),new Error(r)}return n}w({beforeRender:k,beforeRedraw:k,afterRender:e=>{const t=e.memory,n=w.memory.stateConfig,o=n.rearray;if(o.length&&o.length!==n.array.length){const t=`States lengths have changed ${o.length} !== ${n.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`,r=e.templater?.wrapper,s={oldStates:n.array,newStates:n.rearray,tagFunction:r.parentWrap.original},i=new x(t,s);throw console.warn(t,s),i}delete n.rearray,delete n.tagSupport,t.state.length=0,t.state.push(...n.array);const r=t.state;for(let e=r.length-1;e>=0;--e){const t=r[e];t.lastValue=B(t)}n.array=[]}});class j{}function D(e,t){for(let n=e.length-1;n>=0;--n){const o=e[n].get(),r=t[n].callback;r&&r(o),t[n].lastValue=o}}function N(e){const t=w.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=B(o);n=t=>[e,e=t];const r={get:()=>B(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),e}let r=(e instanceof Function?e:()=>e)();if(r instanceof Function){const e=t.array,n=t.tagSupport,o=r;r=(...t)=>{const r=n.global.newest.memory.state;D(r,e);const s=o(...t);return D(e,r),s},r.original=o}n=e=>[r,r=e];const s={get:()=>B(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),r}const A=(e,t)=>_(e,t),P=e=>e;const _=(e,t,{init:n,before:o=(()=>!0),final:r=P}={})=>{let s=N({pastResult:void 0,values:void 0});const i=s.values;if(void 0===i){if(!o(e))return s.values=e,s.pastResult;const a=(n||t)(e,i);return s.pastResult=r(a),s.values=e,s.pastResult}if(e.every(((e,t)=>e===i[t])))return s.pastResult;if(!o(e))return s.values=e,s.pastResult;const a=t(e,i);return s.pastResult=r(a),i.length=0,i.push(...e),s.pastResult};function E(e,t){return Object.defineProperty(t,"noInit",{get(){const t=e();return t.setup.init=()=>{},t}}),Object.defineProperty(t,"asSubject",{get(){const t=e(),n=(e,n)=>{const o=N((()=>$().memory.state)),r=N((()=>new v(void 0)));return _(e,((e,t)=>{const s=n(e,t);if(o.length){D(w.memory.stateConfig.array,o)}r.set(s)}),t.setup),r};return n.setup=t.setup,E((()=>n),n),n}}),Object.defineProperty(t,"truthy",{get(){const t=e();return t.setup.before=e=>e.every((e=>e)),t}}),t}function R(e,t){const n=N((()=>w.memory.stateConfig.array)),o=$();return N((()=>new y(e,t).pipe((e=>(D(o.memory.state,n),e)))))}function H(e){const t=w.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=B(o);n=t=>[e,e=t];const r={get:()=>B(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),F(e,r)}let r=(e instanceof Function?e:()=>e)();n=e=>[r,r=e];const s={get:()=>B(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),F(r,s)}function F(e,t){return n=>(t.callback=n||(t=>[e,e=t]),e)}function L(e){return O(e,new WeakMap)}function O(e,t){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,n),Array.isArray(e))for(let o=0;o<e.length;o++)n[o]=O(e[o],t);else for(const o in e)e.hasOwnProperty(o)&&(n[o]=O(e[o],t));return n}function V(e,t){return M(e,t,new WeakMap)}function M(e,t,n){return!!(e===t||(o=e,r=t,o instanceof Function&&r instanceof Function&&o.toString()===r.toString()))||(!!n.has(e)||"object"==typeof e&&"object"==typeof t&&(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():(n.set(e,0),Array.isArray(e)&&Array.isArray(t)?function(e,t,n){if(e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!M(e[o],t[o],n))return!1;return!0}(e,t,n):!Array.isArray(e)&&!Array.isArray(t)&&function(e,t,n){const o=Object.keys(e),r=Object.keys(t);if(0===o.length&&0===r.length)return!0;if(o.length!==r.length)return!1;for(const s of o){if(!r.includes(s)||!M(e[s],t[s],n))return!1}return!0}(e,t,n))));var o,r}E((()=>function(e){const t=(t,n)=>_(t,n,e);return t.setup=e,E((()=>t),t),t}({})),A),R.value=e=>{const t=N((()=>w.memory.stateConfig.array)),n=$();return N((()=>new v(e).pipe((e=>(D(n.memory.state,t),e)))))},R.all=function(e){const t=N((()=>w.memory.stateConfig.array)),n=$();return y.all(e).pipe((e=>(D(n.memory.state,t),e)))},w.memory.providerConfig={providers:[],ownerSupport:void 0};const I=e=>{const t=N((()=>({stateDiff:0,provider:void 0})));if(t.stateDiff){for(let e=t.stateDiff;e>0;--e)N(void 0);return N(void 0)}const n=N((()=>{const n=w.memory,o=n.stateConfig,r=o.array.length,s="prototype"in e?new e:e(),i=o.array.length-r,a=n.providerConfig,l={constructMethod:e,instance:s,clone:L(s),stateDiff:i};return t.provider=l,a.providers.push(l),t.stateDiff=i,s})),o=e,r=o.compareTo=o.toString();return t.provider.constructMethod.compareTo=r,n},J=e=>N((()=>{const t=w.memory.providerConfig,n=e,o=n.compareTo=n.compareTo||e.toString();let r={ownerTagSupport:t.ownerSupport};for(;r.ownerTagSupport;){const e=r.ownerTagSupport.global.providers.find((e=>{if(e.constructMethod.compareTo===o)return!0}));if(e)return e.clone=L(e.instance),t.providers.push(e),e.instance;r=r.ownerTagSupport}const s=`Could not inject provider: ${e.name} ${e}`;throw console.warn(`${s}. Available providers`,t.providers),new Error(s)}));function W(e,t){const n=w.memory.providerConfig;n.ownerSupport=t,e.global.providers.length&&(n.providers.length=0,n.providers.push(...e.global.providers))}function U(e,t){const n=Y(e,t);for(let e=n.length-1;e>=0;--e){const{tagSupport:t,renderCount:o,provider:r}=n[e];if(t.global.deleted)continue;o===t.global.renderCount&&(r.clone=L(r.instance),Z(t,!1))}}function Y(e,t,n=[]){const o=e.global,r=o.providers.find((e=>e.constructMethod.compareTo===t.constructMethod.compareTo));r&&n.push({tagSupport:e,renderCount:o.renderCount,provider:r});const s=e.childTags;for(let e=s.length-1;e>=0;--e)Y(s[e],t,n);return n}function z(e,t){const n=w.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRender(e,t)}function q(e,t){const n=w.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].afterRender(e,t);w.memory.tagClosed$.next(t)}function X(e,t){const n=w.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeDestroy(e,t)}function G(e,t,n,o){const r=e.global.renderCount;!function(e,t,n){const o=n?.ownerTagSupport,r=o||t;if(n){const t=n.memory.state;e.memory.state=[...t],e.global=n.global,function(e,t){const n=w.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRedraw(e,t)}(e,n)}else{z(e,r);w.memory.providerConfig.ownerSupport=r}}(e,o,t);let s=(0,e.templater.wrapper)(e,n);return q(e,o),s.global.renderCount>r+1?e.global.newest:(e.global.newest=s,s)}function K(e,t,n,s){const i=G(e,t,n,s);!t||o(t,i)||function(e,t,n){const o=e.global,s=o.insertBefore;r(e),t.global={...o};const i=t.global;i.insertBefore=s,i.deleted=!1,delete i.oldest,delete i.newest,delete n.tagSupport}(t,i,n);const a=t?.ownerTagSupport;return i.ownerTagSupport=s||a,i}function Q(e,t,n,r){const s=r.tagSupport,i=s.global;t.global=i;const a=i.renderCount;!function(e){const t=e.global.providers.filter((e=>!V(e.instance,e.clone)));for(let n=t.length-1;n>=0;--n){const o=t[n];U(e.getAppTagSupport(),o),o.clone=L(o.instance)}}(e);const l=i.newest;if(a!==i.renderCount)return e.updateBy(l),l;const c=K(t,l||s||i.oldest,r,n),u=i.oldest||e;return c.global.oldest=u,o(l,c)&&(r.tagSupport=c,u.updateBy(c)),c}function Z(e,t){const n=e.global,o=e.templater;if(!o.wrapper){const t=e.ownerTagSupport;return++n.renderCount,Z(t,!0)}const r=e.subject;let s,i=!1;if(t&&e&&(s=e.ownerTagSupport,s)){const t=o.props,n=e.propsConfig.latestCloned;i=!t.every(((e,t)=>V(e,n[t])))}const a=Q(e.global.oldest,e,s,r);if(s&&i){return Z(s,!0),a}return a}w({beforeRender:(e,t)=>{W(e,t)},beforeRedraw:(e,t)=>{W(e,t.ownerTagSupport)},afterRender:e=>{const t=w.memory.providerConfig;e.global.providers=[...t.providers],t.providers.length=0}}),w.memory.tagClosed$=new y(void 0,(e=>{$()||e.next()}));let ee=e=>(e,t,n,o,r,s)=>{throw new T("Callback function was called immediately in sync and must instead be call async")};const te=()=>ee,ne=ee;function oe(e){const t=w.memory.stateConfig.array;ee=n=>(...o)=>e.global.callbackMaker?re(e,n,t,...o):n(...o)}function re(e,t,n,...o){const r=e.memory.state;D(r,n);const s=t(...o);return D(n,r),Z(e,!1),s instanceof Promise&&s.finally((()=>{D(n,r),Z(e,!1)})),s}function se(e){w.memory.currentSupport=e}function ie(e){const t=w.memory.currentSupport;t.global.init||(t.global.init=e,e())}function ae(e){w.memory.destroyCurrentSupport=e}function le(e){w.memory.destroyCurrentSupport.global.destroyCallback=e}function ce(e){w.memory.childrenCurrentSupport=e}function ue(){return w.memory.childrenCurrentSupport.templater.children}w({beforeRender:e=>oe(e),beforeRedraw:e=>oe(e),afterRender:e=>{e.global.callbackMaker=!0,ee=ne}}),w({beforeRender:e=>se(e),beforeRedraw:e=>se(e)}),w({beforeRender:e=>ae(e),beforeRedraw:e=>ae(e),beforeDestroy:e=>{const t=e.global.destroyCallback;t&&t()}}),w({beforeRender:e=>ce(e),beforeRedraw:e=>ce(e)});const de="__tagvar",pe="--"+de+"--",ge=new RegExp(pe,"g");class be{strings;values;tagJsType=e.tag;memory={};templater;constructor(e,t){this.strings=e,this.values=t}key(e){return this.memory.arrayValue=e,this}children;html(e,...t){return this.children={strings:e,values:t},this}}class fe{props;tagJsType="templater";tagged;wrapper;madeChildIntoSubject=!1;tag;children=new v([]);constructor(e){this.props=e}html(e,...t){const n=new be(e,t),{childSubject:o,madeSubject:r}=function(e){if(b(e))return{childSubject:e,madeSubject:!1};const t=e;if(f(t))return{childSubject:new v(e),madeSubject:!0};const n=e;if(n)return n.memory.arrayValue=0,{childSubject:new v([n]),madeSubject:!0};return{childSubject:new v([]),madeSubject:!0}}(n);return this.children=o,this.madeChildIntoSubject=r,this}}function he(e,t,n,o){const r=t.global,s=r.renderCount,i=e.bind(n)(...o);if(!(s===r.renderCount)||r.deleted)return i instanceof Promise?i.then((()=>"promise-no-data-ever")):"no-data-ever";const a=Z(r.newest,!0);return r.newest=a,i instanceof Promise?i.then((()=>{if(r.deleted)return"promise-no-data-ever";const e=Z(r.newest,!0);return r.newest=e,"promise-no-data-ever"})):"no-data-ever"}function me(t){return t.map((t=>{const n=t;switch(u(t)){case e.tagComponent:return L(t.props);case e.tag:case e.templater:return me(n.values);case e.tagArray:return me(n)}return L(t)}))}function ye(e,t=[]){for(let n=e.length-1;n>=0;--n){const o=e[n];t.push(o),e.splice(n,1),ye(o.childTags,t)}return t}function ve(e,t){const n=e;let o=n.templater;o||(o=new fe([]),o.tag=n,n.templater=o);const r=new v(o);return r.tagSupport=new dt(o,t,r),r}function $e(e){const t=document.createTextNode(""),n=e.parentNode;return n.insertBefore(t,e),n.removeChild(e),t}function we(e,t,n){const o=e.split(".");if("style"===o[0]&&(n.style[o[1]]=t),"class"===o[0])if(o.shift(),t)for(let e=0;e<o.length;++e)n.classList.add(o[e]);else for(let e=0;e<o.length;++e)n.classList.remove(o[e])}const Se=/^\s*{__tagvar/,Ce=/}\s*$/;function xe(e){return e&&e.search(Se)>=0&&e.search(Ce)>=0}function Te(e,t,n,o,r,s){if(xe(t))return function(e,t,n,o,r,s){const i=ke(o,t);return Be(e,i,n,r,s)}(e,t,n,o,r,s);if(xe(e)){let t;const i=ke(o,e).subscribe((e=>{!function(e,t,n,o,r){if(t&&t!=e)if("string"==typeof t)n.removeAttribute(t);else if(t instanceof Object)for(const e in t)n.removeAttribute(e);if("string"==typeof e){if(!e.length)return;return void Be(e,"",n,o,r)}if(e instanceof Object)for(const t in e)Be(t,e[t],n,o,r)}(e,t,n,r,s),t=e}));return r.global.subscriptions.push(i),void n.removeAttribute(e)}return je(e)?we(e,t,n):void 0}function ke(e,t){return e[t.replace("{","").split("").reverse().join("").replace("}","").split("").reverse().join("")]}function Be(e,t,n,o,r){const s=je(e);if(t instanceof Function){const o=function(...e){return t(n,e)};n[e].action=o}if(b(t)){n.removeAttribute(e);const i=t=>{if(t instanceof Function){const e=o.templater.wrapper,n=e?.parentWrap,r=n?.oneRender;r||(t=function(e,t){if(e.isChildOverride)return e;const n=(n,o)=>he(e,t,n,o);return n.tagFunction=e,n}(t,o))}return function(e,t,n,o,r){if(e instanceof Function){const o=function(...n){return e(t,n)};return o.tagFunction=e,void(t[n]=o)}if(o)return void we(n,e,t);if(e)return void r(t,n,e);const s=[void 0,!1,null].includes(e);if(s)return void t.removeAttribute(n);r(t,n,e)}(t,n,e,s,r)},a=t.subscribe(i);o.global.subscriptions.push(a)}else r(n,e,t)}function je(e){return e.search(/^(class|style)(\.)/)>=0}function De(e,t,n){e.setAttribute(t,n)}function Ne(e,t,n){e[t]=n}function Ae(e,t,n){const o=e.getAttributeNames();let r=De;for(let s=0;s<o.length;++s){const i=o[s];"INPUT"===e.nodeName&&"value"===i&&(r=Ne);Te(i,e.getAttribute(i),e,t,n,r),r=De}}const Pe=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;function _e(e,t,n,{counts:o}){const r=t,s=r.tagSupport,i=s?.global.oldest||void 0;if(i&&i)return function(e,t,n){if(t instanceof Function){const e=t(n);return n.updateBy(e),void(t.tagSupport=e)}return n.updateBy(e),void(t.tagSupport=e)}(e,r,i);e.buildBeforeElement(n,{counts:o})}function Ee(e,t,n,o,r){if(!0!==e.tagged){const t=e.wrapper.parentWrap.original;let n=t.name||t.constructor?.name;"Function"===n&&(n=void 0);const o=n||t.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${o}\n\n`)}const s=new dt(e,o,t);let i=t.tagSupport;(s.global=i?.global||s.global).insertBefore=n;w.memory.providerConfig.ownerSupport=o;if(!i){i=function(e,t,n){const o=n.clones.map((e=>e));if((t=K(t,e.tagSupport,e,n)).global.newest=t,n.clones.length>o.length){const e=n.clones.filter((e=>!o.find((t=>t===e))));t.clones.push(...e)}return n.childTags.push(t),t}(t,i||s,o)}return _e(i,t,n,r),i}function Re(e,t,n,o){let r=o.tagSupport;r||(r=Oe(e,n,o)),o.tagSupport=r,r.ownerTagSupport=n,r.buildBeforeElement(t,{counts:{added:0,removed:0}})}function He(e,t,n){e.global.oldest=e,e.global.newest=e,e.ownerTagSupport=t,n.tagSupport=e}function Fe(e){const t=Le();return t.tag=e,e.templater=t,t}function Le(){const e={children:new v([]),props:[],isTag:!0,tagJsType:"templater",tagged:!1,madeChildIntoSubject:!1,html:()=>e};return e}function Oe(e,t,n){const o=new dt(e,t,n);return He(o,t,n),t.childTags.push(o),o}function Ve(e,t,n,o,r){const s=o.clones;let i=e.lastArray=e.lastArray||[];e.placeholder||function(e,t){if("TEMPLATE"!==e.nodeName)return void(t.placeholder=e);const n=t.placeholder=document.createTextNode(""),o=e.parentNode;o.insertBefore(n,e),o.removeChild(e)}(n,e);const a=e.placeholder;let c=0;i=e.lastArray=e.lastArray.filter(((e,n)=>{const o=t.length-1<n-c,s=t[n-c],a=e.tagSupport.templater.tag,u=s?.memory.arrayValue,d=a.memory.arrayValue,p=o||!function(e,t){if(e===t)return!0;if(e instanceof Array&&t instanceof Array&&e.length==t.length)return e.every(((e,n)=>e==t[n]));return!1}(u,d);if(p){const e=i[n];return l(e.tagSupport,r.counts),e.deleted=!0,++c,++r.counts.removed,!1}return!0}));const u=t.length;for(let e=0;e<u;++e){const n=t[e],s=i[e],l=s?.tagSupport,c=n;g(c)&&!c.templater&&Fe(c);const u=new dt(c.templater,o,new v(void 0));if(l){He(u,o,l.subject);const e=l.global;u.global=e,e.newest=u}if(!("arrayValue"in c.memory)){const e={template:u.getTemplate().string,array:t},n="Use html`...`.key(item) instead of html`...` to template an Array";console.error(n,e);throw new C(n,e)}if(i.length>e){s.tagSupport.global.oldest.updateBy(u)}else Me(a,u,e,r,i),o.childTags.push(u)}return s}function Me(e,t,n,o,r){const s={tagSupport:t,index:n};r.push(s);const i={added:o.counts.added+n,removed:o.counts.removed},a=document.createDocumentFragment(),l=document.createElement("template");a.appendChild(l),t.buildBeforeElement(l,{counts:i});e.parentNode.insertBefore(a,e)}function Ie(e,t){const n=t.parentNode,o=document.createTextNode(e);return n.insertBefore(o,t),n.removeChild(t),o}function Je(e){return[void 0,!1,null].includes(e)?"":e}function We(e,t,n){t.insertBefore=n;const o=t.clone||n;if(t.lastValue===e&&"lastValue"in t)return;t.lastValue=e;const r=Je(e),s=t.clone;if(s)return void(s.textContent=r);const i=Ie(r,o);t.clone=i}function Ue(t,n,o,r,s){switch(u(t)){case e.templater:return void Re(t,o,r,n);case e.tag:const i=t;let a=i.templater;return a||(a=Fe(i)),void Re(a,o,r,n);case e.tagArray:return Ve(n,t,o,r,s);case e.tagComponent:return void Ee(t,n,o,r,s);case e.function:const l=t;if(l.oneRender){const e=new fe([]);e.tagJsType="oneRender";const t=Oe(e,r,n);let s;const i=()=>(e.tag=s||l(),t);return e.wrapper=i,i.parentWrap=i,i.oneRender=!0,i.parentWrap.original=l,G(t,t,n,r),void Re(e,o,r,n)}}!function(e,t,n){t.lastValue=e;const o=Ie(Je(e),n);t.clone=o}(t,n,o)}const Ye=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');function ze(e,t,n){if(!(e instanceof Function))return!!V(e,t)&&4;if(!(t instanceof Function))return!1;const o=t?.original;o&&(t=o);e.original&&(e=e.original);return e.toString()===t.toString()?(n(),3):(n(),5)}function qe(e,t,n){const o=function(e,t){let n=e,o=t;if("object"==typeof e){if(!t)return 3;if(n=[...e],o=[...t||[]],!n.every(((e,t)=>{let r=o[t];if(e&&"object"==typeof e){const t={...e},n={...r||{}},o=Object.entries(t).every((([e,o])=>ze(o,n[e],(()=>{delete t[e],delete n[e]}))));return o}return ze(e,r,(()=>{n.splice(t,1),o.splice(t,1)}))})))return 6}return!1}(n.props,e.propsConfig.latestCloned);if(o)return o;const r=function(e,t){const n=e.propsConfig.lastClonedKidValues,o=t.propsConfig.lastClonedKidValues;return!n.every(((e,t)=>{const n=o[t];return e.every(((e,t)=>e===n[t]))}))&&9}(e,t);return r}function Xe(e,t){const n=function(e,t){if("object"!=typeof e||!t)return e;for(const n in e){const o=e[n];if(!(o instanceof Function))continue;e[n].toCall||(e[n]=(...t)=>e[n].toCall(...t),e[n].toCall=(...e)=>Ge(o,e,t),e[n].original=o)}return e}(d(e)?0:e,t);return n}function Ge(e,t,n){const o=$(),r=e(...t),s=()=>{const e=n.global.newest;if(o){const t=e.memory.state.every((e=>{const t=e.lastValue,n=e.get();return V(L(t),n)}));if(t)return r}const t=Z(e,!0);return e.global.newest=t,r};return o?(w.memory.tagClosed$.toCallback(s),r):s()}function Ke(e,t,n,s){let i=n.tagSupport?.global.newest,a=i.global.oldest;const l=i.templater.wrapper,c=t.templater.wrapper;let u=!1;if(l&&c){u=l.parentWrap.original===c.parentWrap.original}const d=t.templater;if(!u){return r(i.global.oldest),Ee(d,n,s,e,{counts:{added:0,removed:0}})}if(!qe(i,t,d)){return function(e,t,n){e=e.global.newest||e;const o=e.propsConfig,r=o.latestCloned,s=t.global.newest;for(let e=n.length-1;e>=0;--e){const t=n[e];if("object"!=typeof t)return;const o=r[e];if("object"!=typeof o)return;for(const e in t){if(!(t[e]instanceof Function))continue;const n=t[e];n instanceof Function&&n.toCall||(o[e].toCall=(...e)=>Ge(n,e,s))}}}(i,e,d.props),i}const p=i.global.newest,g=Z(t,!1);i=n.tagSupport;const b=g.global.oldest;if(!!!b)return Qe(g,s,i,n);if(b&&d.children.value.length){b.templater.children.set(d.children.value)}return u&&o(p,g)?(n.tagSupport=g,a.updateBy(g),g):(u&&i&&(r(i),g.global.context={}),a=void 0,a||(i=g,Qe(g,i.global.insertBefore,i,n)),i.global.newest=g,g)}function Qe(e,t,n,o){return e.buildBeforeElement(t,{counts:{added:0,removed:0}}),e.global.oldest=e,e.global.newest=e,n.global.oldest=e,n.global.newest=e,o.tagSupport=e,e}function Ze(t,n,s,p){const b=t,f=u(n);if(function(t,n,s){const p=t,g="lastValue"in p,b=p.lastValue;if(g&&b!==n){const e=typeof n;return(!a(e)||typeof b!==e)&&!(n instanceof Function&&b instanceof Function)&&(function(e,t){const n=t.clone,o=n.parentNode;o.insertBefore(e,n),o.removeChild(n),delete t.clone,delete t.lastValue}(s,p),"changed-simple-value")}const f=u(n),h=t,m=h.lastArray;if(m&&f!==e.tagArray){const e=h.placeholder;delete h.lastArray,delete h.placeholder,i(s,e);for(let e=m.length-1;e>=0;--e){const{tagSupport:t}=m[e];l(t,{added:0,removed:0})}return"array"}const y=t.tagSupport;if(y){const s=d(n);return d(t.value)&&s?!o(n,y)&&(c(y),r(y),2):f!==e.tagComponent&&(!n||!n.oneRender)&&(c(y),r(y),"different-tag")}}(t,n,p),f===e.tagComponent)return function(e,t,n,o){if(!t.tagSupport)return Ee(e,t,n,o,{counts:{added:0,removed:0}}),t;const r=new dt(e,o,t),s=t.tagSupport,i=s.global.newest;if(!i)return c(s),Ee(e,t,n,o,{counts:{added:0,removed:0}}),t;{const e=i.memory.state;r.memory.state.length=0,r.memory.state.push(...e)}return r.global=s.global,t.tagSupport=r,Ke(o,r,t,n),t}(n,b,p,s);if(b.tagSupport)return f===e.function||function(t,n,r){const s=t.tagSupport;let i=n;const a=g(n);if(a){const e=n;i=e.templater,i||(i=new fe([]),i.tag=e,e.templater=i)}const l=new dt(i,r,t);a&&(l.global=s.global);const c=n&&o(s,l);(function(t){return t?.tagJsType===e.templater})(n)&&He(l,r,t);if(c)return void s.updateBy(l);if(c){return Re(i,s.global.insertBefore,r,t)}We(n,t,t.insertBefore)}(t,n,s),b;switch(f){case e.tagArray:return Ve(t,n,p,s,{counts:{added:0,removed:0}}),t;case e.templater:return Re(n,p,s,b),b;case e.tag:const o=n;let r=o.templater;return r||(r=Le(),o.templater=r,r.tag=o),Re(r,p,s,b),b;case e.subject:return n;case e.function:return t.clone||(t.clone=$e(p)),t}return We(n,t,p),b}function et(e,t,n,o,r){const s=[];if(!e.hasAttribute("end"))return{clones:s};const i=e.getAttribute("id");if(i?.substring(0,de.length)!==de)return{clones:s};const a=t[i];return p(a.value)||f(a.value)?{clones:s,tagComponent:{variableName:i,ownerSupport:n,subject:a,insertBefore:e}}:(tt(e,a,n,o),{clones:s})}function tt(e,t,n,o){let r=!1;const s=s=>{if(r)return void Ze(t,s,n,e);Ue(s,t,e,n,{counts:{...o}}),r=!0};let i=s;const a=t.subscribe((e=>i(e)));if(e.parentNode){const n=t.clone=$e(e);i=o=>{const r=n.parentNode;r.insertBefore(e,n),r.removeChild(n),delete t.clone,i=s,s(o)}}n.global.subscriptions.push(a)}function nt(e,t,n,o){if(!e.getAttribute)return;"TEXTAREA"===e.nodeName&&function(e,t,n){const o=e.value;if(o.search(Ye)>=0){const r=o.match(/__tagvar(\d{1,4})/),s="{"+(r?r[0]:"")+"}";e.value="",e.setAttribute("text-var-value",s);const i=(t,n,o)=>e.value=o;Te("text-var-value",s,e,t,n,i)}}(e,n,o);let r=t.counts.added;if(r=function(e,t){const n=e.oninit;if(!n)return t.added;const o=n.tagFunction;if(!o)return t.added;const r=o.tagFunction;return r?(r({target:e,stagger:t.added}),++t.added):t.added}(e,t.counts)-r,e.children){const r=e.children;for(let e=r.length-1;e>=0;--e){return nt(r[e],{...t,counts:t.counts},n,o)}}}function ot(e,t,n,o){const r=n.counts,s=[],i=[];for(let a=o.length-1;a>=0;--a){const l=o[a],{clones:c,tagComponent:u}=et(l,e,t,r);if(s.push(...c),u)i.push(u);else if(l.children)for(let o=l.children.length-1;o>=0;--o){const a=l.children[o];if(rt(a)){const{tagComponent:n}=et(a,e,t,r);n&&i.push(n)}const{clones:c,tagComponents:u}=ot(e,t,n,a.children);s.push(...c),i.push(...u)}}return{clones:s,tagComponents:i}}function rt(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")}function st(e,t,n,o,r){const s=[],i=[],a=n.interpolation,l=e.children[0],c=l.content.children;if(a.keys.length){const{clones:e,tagComponents:n}=ot(t,o,r,c);s.push(...e),i.push(...n)}return Ae(l,t,o),it(c,t,o),{clones:s,tagComponents:i}}function it(e,t,n){for(let o=e.length-1;o>=0;--o){const r=e[o];Ae(r,t,n),r.children&&it(r.children,t,n)}}function at(e){const t=function(e){const t=[];return{string:e.replace(Pe,((e,n)=>{if(e.startsWith("<"))return e;const o=n.substring(1,n.length-1);return t.push(o),`<template interpolate end id="${o}"></template>`})),keys:t}}(e);return t.string=t.string.replace(ge,de),t}function lt(e,t,n,o,r){const s=function(e,t){const n=[];let o=e.children[0].content.firstChild;const r=document.createDocumentFragment();for(;o;){const e=o.nextSibling;n.push(o),r.appendChild(o),o=e}t.parentNode&&t.parentNode.insertBefore(r,t);return n}(e,t);if(!s.length)return s;for(let e=s.length-1;e>=0;--e){const t=s[e];nt(t,r,o,n),n.clones.push(t)}return s}const ct=new RegExp(de,"g");class ut{templater;subject;isApp=!0;appElement;strings;values;propsConfig;memory={state:[]};clones=[];global={context:{},providers:[],renderCount:0,deleted:!1,subscriptions:[]};hasLiveElements=!1;constructor(e,t){this.templater=e,this.subject=t;const n=e.children.value,o=e.props,r=o.map((e=>L(e)));this.propsConfig={latest:o,latestCloned:r,lastClonedKidValues:n.map((e=>me(e.values)))}}buildBeforeElement(e,t={counts:{added:0,removed:0}}){const n=this.subject,o=this.global;o.insertBefore=e,o.placeholder||function(e){const t=e.insertBefore;e.placeholder=$e(t)}(o);const r=o.placeholder;o.oldest=this,o.newest=this,n.tagSupport=this,this.hasLiveElements=!0;const s=this.update(),i=this.getTemplate(),a=document.createDocumentFragment(),l=document.createElement("template");l.innerHTML=i.string,a.appendChild(l);const{tagComponents:c}=st(a,s,i,this,{counts:t.counts});lt(a,r,this,s,t);const u=c.length;for(let e=0;e<u;++e){const n=c[e];tt(n.insertBefore,n.subject,n.ownerSupport,t.counts),lt(a,n.insertBefore,n.ownerSupport,s,t)}}getTemplate(){const e=this.templater.tag,t=this.strings||e.strings,n=this.values||e.values,o=at(t.map(((e,t)=>(e.replace(ct,pe)+(n.length>t?`{${de}${t}}`:"")).replace(/>\s*/g,">").replace(/\s*</g,"<"))).join(""));return{interpolation:o,string:o.string,strings:t,values:n,context:this.global.context||{}}}update(){return this.updateContext(this.global.context)}updateContext(t){const n=this.templater.tag,o=this.strings||n.strings,r=this.values||n.values;return o.map(((n,o)=>{if(!(r.length>o))return;const s=de+o,i=r[o];if(s in t)return function(e,t,n){const o=e[t],r=o.tagSupport;if(r&&n&&p(n)){let e=new dt(n,r.ownerTagSupport,o);p(r)&&(console.warn("👉 deprecated code is being used #shareTemplaterGlobal 👈"),function(e,t){const n=e.templater.wrapper.parentWrap.original,o=t.templater.wrapper,r=o?.parentWrap.original;if(n===r){t.global=e.global;const n=e.global.newest;if(n){const e=n.memory.state;t.memory.state.length=0,t.memory.state.push(...e)}}}(r,e))}b(n)||o.set(n)}(t,s,i);t[s]=function(t,n){switch(u(t)){case e.tagComponent:return new v(t);case e.templater:return ve(t.tag,n);case e.tag:return ve(t,n);case e.subject:return t}return new v(t)}(i,this)})),t}}class dt extends ut{templater;ownerTagSupport;subject;version;isApp=!1;childTags=[];constructor(e,t,n,o=0){super(e,n),this.templater=e,this.ownerTagSupport=t,this.subject=n,this.version=o}destroy(e={stagger:0,byParent:!1}){const t=!e.byParent,n=this.global,o=this.subject,r=e.byParent?[]:ye(this.childTags);t&&p(this.templater)&&X(this,this),this.destroySubscriptions();for(let e=r.length-1;e>=0;--e){const t=r[e],n=t.global;delete n.newest,n.deleted=!0,p(t.templater)&&X(t,t)}if("TEMPLATE"===n.insertBefore.nodeName){n.placeholder&&!("arrayValue"in this.memory)&&(e.byParent||c(this))}let s;if(this.ownerTagSupport&&(this.ownerTagSupport.childTags=this.ownerTagSupport.childTags.filter((e=>e!==this))),t){const{stagger:t,promise:n}=this.destroyClones(e);e.stagger=t,n&&(s=n)}else this.destroyClones();return delete n.placeholder,n.context={},delete n.oldest,delete n.newest,n.deleted=!0,this.childTags.length=0,this.hasLiveElements=!1,delete o.tagSupport,s=s?s.then((async()=>{const e=r.map((e=>e.destroy({stagger:0,byParent:!0})));return Promise.all(e)})):Promise.all(r.map((e=>e.destroy({stagger:0,byParent:!0})))),s.then((()=>e.stagger))}destroySubscriptions(){const e=this.global.subscriptions;for(let t=e.length-1;t>=0;--t)e[t].unsubscribe();e.length=0}destroyClones({stagger:e}={stagger:0}){const t=[...this.clones];this.clones.length=0;const n=t.map((t=>this.checkCloneRemoval(t,e))).filter((e=>e)),o=this.global.context;for(const e in o){const t=o[e].clone;t?.parentNode&&t.parentNode.removeChild(t)}return n.length?{promise:Promise.all(n),stagger:e}:{stagger:e}}checkCloneRemoval(e,t){let n;const o=e;o.ondestroy&&(n=function(e,t){const n=e.ondestroy;if(!n)return;const o=n.tagFunction;if(!o)return;const r=o.tagFunction;if(!r)return;return r({target:e,stagger:t})}(o,t));const r=()=>{const t=e.parentNode;t&&t.removeChild(e);const n=this.ownerTagSupport;n&&(n.clones=n.clones.filter((t=>t!==e)))};return n instanceof Promise?n.then(r):(r(),n)}updateBy(e){const t=e.templater.tag;this.updateConfig(t.strings,t.values)}updateConfig(e,t){this.strings=e,this.updateValues(t)}updateValues(e){return this.values=e,this.updateContext(this.global.context)}getAppTagSupport(){let e=this;for(;e.ownerTagSupport;)e=e.ownerTagSupport;return e}}const pt=[];let gt=0;function bt(t){const n=function(...t){const o=new fe(t);o.tagJsType=e.tagComponent;const r=function(e,t){const n=function(n,o){const r=n.global;++r.renderCount;const s=e.children,i=r.oldest?.templater.children.lastArray;i&&(s.lastArray=i);const a=t.original;let l=e.props,c=l.map((e=>Xe(e,n.ownerTagSupport)));const u=l.map((e=>L(e)));let d=a(...c);d instanceof Function&&(d=d()),d.templater=e,e.tag=d;const p=new dt(e,n.ownerTagSupport,o,r.renderCount);if(p.global=r,p.propsConfig={latest:l,latestCloned:u,lastClonedKidValues:p.propsConfig.lastClonedKidValues},p.memory=n.memory,e.madeChildIntoSubject){const e=s.value;for(let t=e.length-1;t>=0;--t){const n=e[t],o=n.values;for(let e=o.length-1;e>=0;--e){const t=o[e];if(!(t instanceof Function))continue;const r=n.values[e];r.isChildOverride||(n.values[e]=function(...e){const n=p.ownerTagSupport;return he(t,n,this,e)},r.isChildOverride=!0)}}}return p};return n}(o,n);return r.parentWrap||(r.parentWrap=n),o.tagged=!0,o.wrapper=r,o};return n.original=t,n.compareTo=t.toString(),function(e,t){e.isTag=!0,e.original=t}(n,t),function(e){e.tags=pt,e.setUse=w,e.tagIndex=gt++}(t),pt.push(n),n}function ft(e,...t){return new be(e,t)}bt.oneRender=(...e)=>{throw new Error("Do not call function tag.oneRender but instead set it as: `tag.oneRender = (props) => html`` `")},Object.defineProperty(bt,"oneRender",{set(e){e.oneRender=!0}});const ht=[];function mt(e,t,n){const o=ht.findIndex((e=>e.element===t));o>=0&&(ht[o].tagSupport.destroy(),ht.splice(o,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const r=function(e){let t={};const n=new v(t);t=new ut(e,n),n.set(e),n.tagSupport=t,z(t,void 0);const o=e.wrapper,r=o(t,n);return q(t,r),r}(e(n));r.appElement=t,r.isApp=!0,r.global.isApp=!0;const s=document.createElement("template");s.setAttribute("id","app-tag-"+ht.length),s.setAttribute("app-tag-detail",ht.length.toString());const i=document.createDocumentFragment();return i.appendChild(s),t.destroy=async()=>{await r.destroy();const e=r.global.insertBefore;e.parentNode.removeChild(e)},r.buildBeforeElement(s),r.global.oldest=r,r.global.newest=r,t.setUse=e.original.setUse,ht.push({element:t,tagSupport:r}),t.appendChild(i),{tagSupport:r,tags:e.original.tags}}const yt={tagElement:mt,renderWithSupport:K,renderTagSupport:Z,renderTagOnly:G},vt=bt((()=>{let e=H("a")((t=>[e,e=t])),t=H(!0)((e=>[t,t=e]));return ft`
    <input onchange=${t=>e=t.target.value} placeholder="a b or c" />
    <select id="select-sample-drop-down">
      ${["a","b","c"].map((t=>ft`
        <option value=${t} ${t==e?"selected":""}>${t} - ${t==e?"true":"false"}</option>
      `.key(t)))}
    </select>
    <hr />
    <h3>Special Attributes</h3>
    <div>
      <input type="checkbox" onchange=${e=>t=e.target.checked} ${t&&"checked"} /> - ${t?"true":"false"}
    </div>
    <div style="display: flex;flex-wrap:wrap;gap:1em">      
      <div
        style.background-color=${t?"orange":""}
        style.color=${t?"black":""}
      >style.background-color=&dollar;{'orange'}</div>
      
      <div
        class.background-orange=${!!t}
        class.text-black=${!!t}
      >class.background-orange=&dollar;{true}</div>
      
      <div class=${t?"background-orange text-black":""}
      >class=&dollar;{'background-orange text-black'}</div>
      
      <div ${{class:"text-white"+(t?" background-orange":"")}}
      >class=&dollar;{'background-orange'} but always white</div>
    </div>
    <style>
      .background-orange {background-color:orange}
      .text-black {color:black}
      .text-white {color:white}
    </style>
  `})),$t=bt((()=>{const e=N((()=>new v(0))),t=N((()=>new v(1)));let n=H(0)((e=>[n,n=e]));return++n,ft`
    <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
    <!--proof you cannot see false values -->
    <div style="font-size:0.8em">
      <fieldset>
        <legend>false test</legend>
        You should see "" here => "${!1}"
      </fieldset>
    </div>
    <div style="font-size:0.8em">
      <fieldset>
        <legend>null test</legend>
        You should see "" here => "${null}"
      </fieldset>
    </div>
    <div style="font-size:0.8em">
      <fieldset>
        <legend>undefined test</legend>
        You should see "" here => "${void 0}"
      </fieldset>
    </div>
    <!--proof you can see true booleans -->
    <div style="font-size:0.8em">
      <fieldset>
        <legend>true test</legend>
        You should see "true" here => "${!0}"
      </fieldset>
    </div>
    <!--proof you can try to use the tagVar syntax -->
    <div style="font-size:0.8em">You should see "${"{"}22${"}"}" here => "{22}"</div>
    <div style="font-size:0.8em">You should see "${"{"}__tagVar0${"}"}" here => "{__tagVar0}"</div>
    <div style="font-size:0.8em">should be a safe string no html "&lt;div&gt;hello&lt;/div&gt;" here => "${"<div>hello</div>"}"</div>
    <div style="display:flex;flex-wrap:wrap;gap;1em">
      <fieldset style="flex:1">
        <legend>value subject</legend>
        0 === ${e}
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>piped subject</legend>        
        <span id="content-subject-pipe-display0">55</span> ===
        <span id="content-subject-pipe-display1">${e.pipe((()=>55))}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest</legend>
        <span id="content-combineLatest-pipe-display0">1</span> ===
        <span id="content-combineLatest-pipe-display1">${h([e,t]).pipe((e=>e[1]))}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest piped html</legend>
        <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span> ===
        <span id="content-combineLatest-pipeHtml-display1">${h([e,t]).pipe(function(e){return(t,n)=>{n.setHandler((()=>{})),e(t).then((e=>n.next(e)))}}((e=>Promise.resolve(ft`<b>bold 77</b>`))))}</span>
      </fieldset>
    </div>
    (render count ${n})
  `})),wt=bt((()=>{let e=H(!0)((t=>[e,e=t]));return ft`
    <div style="max-height: 800px;overflow-y: scroll;">
      <table cellPadding=${5} cellSpacing=${5} border="1">
        <thead style="position: sticky;top: 0;">
          <tr>
            <th>hello</th>
            <th>hello</th>
            ${e&&ft`
              <td>hello 2 thead cell</td>
            `}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>world</td>
            <td>world</td>
            ${e&&ft`
              <td>world 2 tbody cell</td>
            `}
          </tr>
        </tbody>
      </table>
    </div>
  `})),St=bt((({renderCount:e,name:t})=>ft`<div><small>(${t} render count <span id=${t+"_render_count"}>${e}</span>)</small></div>`)),Ct=bt(((e="propsDebugMain")=>(e=H(0)((t=>[e,e=t])),t=H(0)((e=>[t,t=e])),n=H({test:33,x:"y"})((e=>[n,n=e])),o=H((()=>new Date))((e=>[o,o=e])),r=H(0)((e=>[r,r=e])),s=JSON.stringify(n,null,2))=>ft`
  <textarea id="props-debug-textarea" wrap="off"
    onchange=${e=>n=JSON.parse(e.target.value)}
    style="height:200px;font-size:0.6em;width:100%"
  >${s}</textarea>
  
  <pre>${s}</pre>
  <div><small>(renderCount:${++t})</small></div>
  
  <div>
    <button id="propsDebug-🥩-0-button"
      onclick=${()=>++e}
    >🥩 propNumber ${e}</button>
    <span id="propsDebug-🥩-0-display">${e}</span>
  </div>
  
  <fieldset>
    <legend>child</legend>
    ${kt({propNumber:e,propsJson:n,propNumberChange:t=>{e=t}})}
  </fieldset>

  <fieldset>
    <legend>sync props callback</legend>
    🥡 syncPropNumber: <span id="sync-prop-number-display">${r}</span>
    <button onclick=${()=>++r}>🥡 ++</button>
    <hr />
    ${Tt({syncPropNumber:r,propNumberChange:e=>{r=e},nothingTest:e=>e})}
  </fieldset>

  <fieldset>
    <legend>date prop</legend>
    date:${o}
    <input type="date" value=${function(e){const t=new Date(e),n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return{date:`${n}-${o}-${r}`,time:`${s}:${i}`}}(o).date} onchange=${e=>{const t=e.target.value;o=new Date(t)}} />
    <hr />
    ${xt({date:o})}
  </fieldset>
`)),xt=bt((({date:e})=>ft`date:${e}`)),Tt=bt((({syncPropNumber:e,propNumberChange:t,nothingTest:n})=>{let o=H(0)((e=>[o,o=e]));return e%2==1&&t(e+=1),ft`<!--syncPropDebug-->
    <div>
      🥡 syncPropNumber:<span id="sync-prop-child-display">${e}</span>
      <button id="sync-prop-child-button" onclick=${()=>t(++e)}>🥡 ++</button>
    </div>
    <div>
      <div>
        counter:<span id="sync-prop-counter-display">${o}</span>
      </div>
      nothingTest<span id="nothing-prop-counter-display">${n(o)}</span>
      <button id="nothing-prop-counter-button" onclick=${()=>n(++o)}>++</button>
    </div>
  `})),kt=bt((({propNumber:e,propsJson:t,propNumberChange:n})=>(o=H(0)((e=>[o,o=e])),r=H(0)((e=>[r,r=e])),s=H(e)((e=>[s,s=e])),i=A([e],(()=>s=e)),a=A([s],(()=>++r)),l=function(e){return t=>{let n=H(e)(t);return A([e],(()=>t(n=e))),t(n),n}}(e)((t=>[e,e=t])))=>ft`<!--propsDebug.js-->
  <h3>Props Json</h3>
  <textarea style="font-size:0.6em;height:200px;width:100%" wrap="off"
    onchange=${e=>{const n=JSON.parse(e.target.value);Object.assign(t,n)}}
  >${JSON.stringify(t,null,2)}</textarea>
  <pre>${JSON.stringify(t,null,2)}</pre>
  <hr />
  
  <h3>Props Number</h3>
  <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled
  >${JSON.stringify(a,null,2)}</textarea>
  
  <div>
    <button id="propsDebug-🥩-1-button" onclick=${()=>n(++s)}
    >🐄 🥩 propNumber ${s}</button>
    <span id="propsDebug-🥩-1-display">${s}</span>
  </div>

  <div>
    <button id="propsDebug-🥩-2-button" onclick=${()=>++e}
    >🐄 🥩 local set propNumber ${e}</button>
    <span id="propsDebug-🥩-2-display">${e}</span>
  </div>

  <button
    title="test of increasing render count and nothing else"
    onclick=${()=>++o}
  >renderCount ${++o}</button>
  
  <button onclick=${()=>++s}
    title="only changes number locally but if change by parent than that is the number"
  >🐄 🥩 local set myPropNumber ${s}</button>
  
  <div>
    <small>
      (propNumberChangeCount:<span id="propsDebug-🥩-change-display">${r}</span>)
    </small>
  </div>
  
  <hr />

  <h3>Fn update test</h3>
  ${Bt({propNumber:s,callback:()=>++s})}    
`)),Bt=bt((({propNumber:e,callback:t})=>{let n=H(0)((e=>[n,n=e]));return++n,ft`
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${t}
    >🐄 🥩 local & 1-parent increase ${e}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${e}</span>
    ${St({renderCount:n,name:"propFnUpdateTest"})}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `}));const jt=async({target:e,stagger:t,staggerBy:n,fxName:o="fadeInDown"})=>{e.style.opacity="0",t&&await Nt(t*n),e.style.opacity="1",e.classList.add("animate__animated","animate__"+o)},Dt=async({target:e,stagger:t,capturePosition:n=!0,fxName:o="fadeOutUp",staggerBy:r})=>{n&&function(e){e.style.zIndex=e.style.zIndex||1;const t=e.offsetTop+"px",n=e.offsetLeft+"px",o=e.clientWidth+(e.offsetWidth-e.clientWidth)+1+"px",r=e.clientHeight+(e.offsetHeight-e.clientHeight)+1+"px";setTimeout((()=>{e.style.top=t,e.style.left=n,e.style.width=o,e.style.height=r,e.style.position="absolute"}),0)}(e),t&&await Nt(t*r),e.classList.add("animate__animated","animate__"+o),await Nt(1e3),e.classList.remove("animate__animated","animate__"+o)};function Nt(e){return new Promise((t=>{setTimeout(t,e)}))}const{in:At,out:Pt}=function({fxIn:e,fxOut:t,staggerBy:n=300}){return{in:t=>jt({fxName:e,staggerBy:n,...t}),out:e=>Dt({fxName:t,staggerBy:n,capturePosition:!0,...e})}}({fxIn:"fadeInDown",fxOut:"fadeOutUp"}),_t=bt((function(){const e=N([]);let t=H(0)((e=>[t,t=e]));const n=()=>({name:"Person "+e.length,scores:"0,".repeat(0).split(",").map(((e,t)=>({frame:t+1,score:Math.floor(4*Math.random())+1})))});return++t,ft`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${Rt({players:e,getNewPlayer:n})}
    </div>

    <button id="array-test-push-item" onclick=${()=>{e.push(n())}}>push item ${e.length+1}</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n())}}>push 3 items</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n())}}>push 9 items</button>

    ${e.length>0&&ft`
      <button oninit=${At} ondestroy=${Pt}
        style="--animate-duration: .1s;"
        onclick=${()=>e.length=0}
      >remove all</button>
    `}

    ${St({renderCount:t,name:"arrayTests.ts"})}
  `})),Et=bt((({score:e,playerIndex:t})=>{let n=H(0)((e=>[n,n=e]));return++n,ft`
    frame:${e.frame}:
    <button
      id=${`score-data-${t}-${e.frame}-inside-button`}
      onclick=${()=>++e.score}
    >inner score button ++${e.score}</button>
    <span id=${`score-data-${t}-${e.frame}-inside-display`}
    >${e.score}</span>
    <button onclick=${()=>++n}>increase renderCount</button>
    ${St({renderCount:n,name:"scoreData"+e.frame})}
  `})),Rt=bt((({players:e,getNewPlayer:t})=>ft`
    <!-- playersLoop.js -->
    ${e.map(((n,o)=>ft`
    <div oninit=${At} ondestroy=${Pt}
      style="background-color:black;--animate-duration: .1s;"
    >
      <div>
        name:${n.name}
      </div>
      <div>
        index:${o}
      </div>
      
      <div style="background-color:purple;padding:.5em">
        scores:${n.scores.map(((e,t)=>ft`
        <div style="border:1px solid white;--animate-duration: .1s;"
          oninit=${At} ondestroy=${Pt}
        >
          <fieldset>
            <legend>
              <button id=${`score-data-${t}-${e.frame}-outside-button`}
                onclick=${()=>++e.score}
              >outer score button ++${e.score}</button>
              <span id=${`score-data-${t}-${e.frame}-outside-display`}
              >${e.score}</span>
            </legend>
            ${Et({score:e,playerIndex:t})}
          </fieldset>
        </div>
      `.key(e)))}</div>
      
      ${n.edit&&ft`
        <button onclick=${()=>{e.splice(o,1),n.edit=!n.edit}}>remove</button>
      `}
      ${n.edit&&ft`
        <button id=${"player-remove-promise-btn-"+o} onclick=${async()=>{n.edit=!n.edit,e.splice(o,1)}}>remove by promise</button>
      `}
      <button id=${"player-edit-btn-"+o} onclick=${()=>n.edit=!n.edit}>edit</button>
      <button onclick=${()=>{e.splice(o,0,t())}}>add before</button>
    </div>
  `.key(n)))}
    <!-- end:playersLoop.js -->
  `)),Ht=3e3,Ft=6e3,Lt=bt((()=>{let e=H(0)((t=>[e,e=t])),t=H(void 0)((e=>[t,t=e])),n=H(void 0)((e=>[n,n=e])),o=H(0)((e=>[o,o=e])),r=H(0)((e=>[r,r=e]));const s=te(),i=()=>++e,a=()=>{console.info("🟢 interval test 0 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=Ht&&(r=0)})),500),console.info("▶️ interval started"),t=setInterval(s((()=>{i()})),Ht)},l=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🛑 interval test 0 stopped")};return ie(a),le(l),++o,ft`<!--intervalDebug.js-->
    <div>interval type 1 at ${Ht}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${Ht} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${()=>{t||n?l():a()}}
      style.background-color=${t||n?"red":"green"}
    >start/stop</button>
    <button type="button" onclick=${()=>setTimeout(s((()=>{r+=200})),1e3)}>delay increase currentTime</button>
  `})),Ot=bt((()=>{let e=H(0)((t=>[e,e=t])),t=H(void 0)((e=>[t,t=e])),n=H(void 0)((e=>[n,n=e])),o=H(0)((e=>[o,o=e])),r=H(0)((e=>[r,r=e]));const s=te(),i=()=>++e;const a=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🔴 interval 1 stopped")};function l(){if(t)return a();console.info("🟢 interval test 1 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=Ft&&(r=0)})),500),t=setInterval(s((()=>{i(),console.info("slow interval ran")})),Ft)}return ie(l),le(a),++o,ft`
    <div>interval type 2 with ${Ft}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${Ft} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${l}
      style.background-color=${t?"red":"green"}
    >start/stop</button>
  `})),Vt=bt((()=>{let e=H("tagJsDebug.js")((t=>[e,e=t])),t=H(!1)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));return++n,ft`<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${St({renderCount:n,name:"tagJsDebug"})}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <fieldset style="flex:4 4 40em">
        <legend>arrays</legend>
        ${_t()}
      </fieldset>
    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${()=>t=!t}
        >hide/show</button>

        ${t&&ft`
          <div oninit=${At} ondestroy=${Pt}>
            <div>${Lt()}</div>
            <hr />
            <div>${Ot()}</div>
          </div>
        `}
      </fieldset>

      <fieldset id="props-debug" style="flex:2 2 20em">
        <legend>Props Debug</legend>
        ${Ct(void 0)}
      </fieldset>
    </div>
  `})),Mt=bt(((e="tagSwitchDebug")=>{let t=H(null)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));let o="select tag below";switch(t){case null:o="null, select tag below";break;case"":o=ft`<div id="empty-string-1"></div>`;break;case"1":o=Jt({title:"value switch"});break;case"2":o=Wt({title:"value switch"});break;case"3":o=Ut({title:"value switch"})}let r=ft`<div id="select-tag-above">select tag above</div>`;switch(t){case null:r=ft`<div id="select-tag-above">null, select tag above</div>`;break;case"":r=ft`<div id="select-tag-above">empty-string, select tag above</div>`;break;case"1":r=Jt({title:"tag switch"});break;case"2":r=Wt({title:"tag switch"});break;case"3":r=Ut({title:"tag switch"})}return++n,ft`
    <div id="selectTag-wrap">
      selectedTag: |${(null===t?"null":void 0===t&&"undefined")||""===t&&"empty-string"||t}|
    </div>
    
    <select id="tag-switch-dropdown" onchange=${function(e){t=e.target.value,"undefined"===t&&(t=void 0),"null"===t&&(t=null)}}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="" ${"string"!=typeof t||t.length?{}:{selected:!0}}>empty-string</option>
	    <option value="undefined" ${void 0===t?{selected:!0}:{}}>undefined</option>
	    <option value="null" ${null===t?{selected:!0}:{}}>null</option>
	    <option value="1" ${"1"===t?{selected:!0}:{}}>tag 1</option>
	    <option value="2" ${"2"===t?{selected:!0}:{}}>tag 2</option>
	    <option value="3" ${"3"===t?{selected:!0}:{}}>tag 3</option>
    </select>

    <div id="switch-tests-wrap" style="display:flex;flex-wrap:wrap;gap:1em;">
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 1 - string | Tag</h3>
        <div>${o}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 2 - Tag</h3>
        <div>${r}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3 - ternary (only 1 or 3 shows)</h3>
        <div>${"3"===t?Ut({title:"ternary simple"}):Jt({title:"ternary simple"})}</div>
      </div>

      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${It({selectedTag:t})}</div>
      </div>

      <div id="arraySwitching-test-wrap" style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div id="arraySwitching-wrap">${Yt({selectedTag:t})}</div>
      </div>
    </div>
    ${St({renderCount:n,name:"tagSwitchDebug"})}
  `})),It=bt((({selectedTag:e})=>ft`
    <div id="ternaryPropTest-wrap">
      ${e}:${"3"===e?Ut({title:"ternaryPropTest"}):Jt({title:"ternaryPropTest"})}
    </div>
  `)),Jt=bt((({title:e})=>{let t=H(0)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));return++n,ft`
    <div id="tag1" style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${St({renderCount:n,name:"tag1"})}
    </div>
  `})),Wt=bt((({title:e})=>{let t=H(0)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));return++n,ft`
    <div id="tag2" style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${St({renderCount:n,name:"tag1"})}
    </div>
  `})),Ut=bt((({title:e})=>{let t=H(0)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));return++n,ft`
    <div  id="tag3" style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${St({renderCount:n,name:"tag1"})}
    </div>
  `})),Yt=bt((({selectedTag:e})=>{switch(e){case void 0:return ft`its an undefined value`;case null:return ft`its a null value`;case"":return ft``;case"1":return ft`${Jt({title:`tag ${e}`})}`;case"2":return ft`${["b","c"].map((t=>ft`${Wt({title:`array ${e} ${t}`})}`.key(t)))}`;case"3":return ft`${["d","e","f"].map((t=>ft`${Ut({title:`array ${e} ${t}`})}`.key(t)))}`}return ft`nothing to show for in arrays`})),zt=bt((()=>{const e=qt();return ft`
    <fieldset>
      <legend>counter0</legend>
      ${e}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${e}
    </fieldset>
  `})),qt=()=>{let e=H(0)((t=>[e,e=t]));return ft`
    counter:<span>🪞<span id="mirror-counter-display">${e}</span></span>
    <button id="mirror-counter-button" onclick=${()=>++e}>${e}</button>
  `},Xt=bt(((e,t)=>{let n=H(0)((e=>[n,n=e])),o=H(0)((e=>[o,o=e]));return++n,ft`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div style="border:2px solid purple;">${ue()}</div>
      <div>isSubjectInstance:${b(ue())}</div>
      <div>isSubjectTagArray:${f(ue().value)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${()=>++o}>increase innerHtmlTest ${o}</button>
      <span id="innerHtmlTest-counter-display">${o}</span>
      ${St({renderCount:n,name:"innerHtmlTest"})}
    </fieldset>
  `})),Gt=bt((e=>{let t=H(0)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));return++t,ft`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${e}</legend>
      ${ue()}
      <button id="innerHtmlPropsTest-button" onclick=${()=>++n}
      >increase innerHtmlPropsTest ${n}</button>
      <span id="innerHtmlPropsTest-display">${n}</span>
      ${!1}
    </fieldset>
  `})),Kt=bt(((e,t)=>ft`
  <fieldset>
    <legend>xxxxx</legend>  
    <div>hello other world ${e} - ${t}</div>
    <div style="border:2px solid red;">***${ue()}***</div>
  </fieldset>
`)),Qt=bt(((e="childTests")=>(e=H(0)((t=>[e,e=t])),t=H(0)((e=>[t,t=e])))=>ft`
  <fieldset id="children-test" style="flex:2 2 20em">
    <legend>childTests</legend>

    <hr />
    <hr />
    <hr />
    ${Kt(1,2).html`
      <div><hr />abc-123-${Date.now()}<hr /></div>
    `}
    <hr />
    <hr />
    <hr />
    
    ${Xt({},2).html`
      <b>Field set body A</b>
      <hr />
      <button id="innerHtmlTest-childTests-button"
        onclick=${()=>++t}
      >🐮 increase childTests inside ${t}:${e}</button>
      <span id="innerHtmlTest-childTests-display">${t}</span>
      ${St({renderCount:e,name:"childTests-innerHtmlTest"})}
    `}

    ${Gt(22).html`
      <b>Field set body B</b>
      <hr />
      <button id="innerHtmlPropsTest-childTests-button"
        onclick=${()=>++t}
      >🐮 increase childTests inside ${t}</button>
      <span id="innerHtmlPropsTest-childTests-display">${t}</span>
      ${St({renderCount:e,name:"innerHtmlPropsTest child"})}
    `}

    ${function({child:e}){return ft`
    <fieldset>
      <legend>child as prop</legend>
      ${e}
    </fieldset>
  `}({child:ft`
      hello child as prop test
      <button id="child-as-prop-test-button"
        onclick=${()=>++t}
      >🐮 child as prop ${t}</button>
      <span id="child-as-prop-test-display">${t}</span>
    `})}
    
    <hr />
    
    <button id="childTests-button"
      onclick=${()=>++t}
    >🐮 increase childTests outside ${t} - ${e}</button>
    <span id="childTests-display">${t}</span>
    ${St({renderCount:e,name:"childTests"})}
  </fieldset>
`));function Zt(e){return document.querySelectorAll(e).length}function en(e){return document.querySelectorAll(e).forEach((e=>e.click()))}function tn(e){let t="";return document.querySelectorAll(e).forEach((e=>t+=e.innerHTML)),t}function nn(e){return document.getElementById(e)}function on(e){return document.getElementById(e).innerHTML}const rn=[];let sn=[],an=0;function ln(e,t){sn.push((async()=>{const n=sn;sn=[];try{console.debug("  ".repeat(an)+"↘ "+e),++an,await t(),await dn(sn),--an}catch(e){throw--an,e}finally{sn=n}}))}function cn(e,t){sn.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(" ".repeat(an)+`✅ ${e} - ${o}ms`)}catch(t){throw console.debug(" ".repeat(an)+"❌ "+e),t}}))}function un(){rn.length=0,sn.length=0}async function dn(e){for(const t of e)try{await t()}catch(e){throw console.error(`Error testing ${t.name}`),un(),e}un()}function pn(e){return{toBeDefined:()=>{if(null!=e)return;const t=`Expected ${JSON.stringify(e)} to be defined`;throw console.error(t,{expected:e}),new Error(t)},toBe:(t,n)=>{if(e===t)return;n instanceof Function&&(n=n());const o=n||`Expected ${typeof e} ${JSON.stringify(e)} to be ${typeof t} ${JSON.stringify(t)}`;throw console.error(o,{received:t,expected:e}),new Error(o)},toBeGreaterThan:(t,n)=>{const o=e;if(!isNaN(o)&&o>t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be greater than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)},toBeLessThan:(t,n)=>{const o=e;if(!isNaN(o)&&o<t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be less than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)}}}function gn(...e){const t=e.reduce(((e,t)=>{const n=document.querySelectorAll(t);return e.push(...n),e}),[]);pn(t.length).toBeGreaterThan(0,"Expected elements to be present in expectMatchedHtml() query but found none");const n=t.pop().innerHTML;t.every((t=>pn(n).toBe(t.innerHTML,(()=>`expectMatchedHtml unmatched html - queries: ${e.join(" - ")}`))))}function bn(e,t){document.querySelectorAll(e).forEach((n=>pn(n.innerHTML).toBe(t,(()=>`Expected element ${e} innerHTML to be --\x3e${t}<-- but it was --\x3e${n.innerHTML}<--`))))}function fn(e,t,n){const o=document.querySelectorAll(e),r=o.length;return n=n||`Expected ${t} elements to match query ${e} but found ${r}`,pn(r).toBe(t,n),o}function hn(...e){const[t,n]=e.shift();let o=fn(n,1),r=fn(t,1);const s=o[0].innerText;mn(r,o,{elementCountExpected:1},t,n);let i=2;e.forEach((([e,a])=>{o=fn(a,1),r=fn(e,1);let l=o[0],c=l.innerText;const u=(Number(s)+i).toString();pn(c).toBe(u,(()=>`Expected second increase provider to be increased to ${s} but got ${c}`)),mn(r,o,{elementCountExpected:1},t,n),l=o[0],c=l.innerText;const d=i+2;pn(c).toBe((Number(s)+d).toString(),(()=>`Expected ${a} innerText to be ${Number(s)+d} but instead it is ${c}`)),i+=2}))}function mn(e,t,{elementCountExpected:n}={elementCountExpected:1},o,r){pn(e.length).toBe(n,(()=>`Expected ${o} to be ${n} elements but is instead ${e.length}`)),pn(t.length).toBe(n,(()=>`Expected ${r} to be ${n} elements but is instead ${t.length}`)),e.forEach(((e,n)=>{const o=t[n];let s=Number(o?.innerText);e.click();let i=s+1;s=Number(o?.innerText),pn(i).toBe(s,(()=>`Counter test 1 of 2 expected ${r} to be value ${i} but it is ${s}`)),e.click(),s=Number(o?.innerText),++i,pn(i).toBe(s,(()=>`Counter test 2 of 2 expected ${r} to increase value to ${i} but it is ${s}`))}))}function yn(e,t,{elementCountExpected:n}={elementCountExpected:1}){return mn(document.querySelectorAll(e),document.querySelectorAll(t),{elementCountExpected:n},e,t)}async function vn(){const e=tn("#🍄-slowChangeCount"),t="0"===e;cn("no template tags",(()=>{pn(document.getElementsByTagName("template").length).toBe(0,"Expected no templates to be on document")})),cn("elements exists",(()=>{pn(nn("h1-app")).toBeDefined();const e=nn("set-main-counter-input");pn(e).toBeDefined();const t=nn("toggle-test");pn(t).toBeDefined(),pn(t.innerText).toBe("toggle test"),e.value="0",e.onkeyup({target:e})})),ln("content",(()=>{cn("basic",(()=>{gn("#content-subject-pipe-display0","#content-subject-pipe-display1"),gn("#content-combineLatest-pipe-display0","#content-combineLatest-pipe-display1")})),cn("html",(()=>{gn("#content-combineLatest-pipeHtml-display0","#content-combineLatest-pipeHtml-display1")}))})),cn("toggle test",(()=>{const e=nn("toggle-test");e.click(),pn(e.innerText).toBe("toggle test true"),e.click(),pn(e.innerText).toBe("toggle test");pn(nn("props-debug-textarea").value.replace(/\s/g,"")).toBe('{"test":33,"x":"y"}')})),ln("counters",(()=>{cn("basics",(()=>{const e=Number(tn("#counters_render_count")),n=Number(tn("#inner_counters_render_count"));fn("#conditional-counter",0),yn("#❤️-increase-counter","#❤️-counter-display"),pn(tn("#counters_render_count")).toBe((e+2).toString()),pn(tn("#inner_counters_render_count")).toBe((n+2).toString()),yn("#❤️-inner-counter","#❤️-inner-display"),pn(tn("#counters_render_count")).toBe((e+4).toString()),pn(tn("#inner_counters_render_count")).toBe((n+4).toString()),yn("#standalone-counter","#standalone-display"),pn(tn("#counters_render_count")).toBe((e+(t?6:8)).toString()),pn(tn("#inner_counters_render_count")).toBe((n+4).toString()),fn("#conditional-counter",1),yn("#conditional-counter","#conditional-display"),yn("#❤️-inner-counter","#❤️-inner-display"),t&&(pn(tn("#🪈-pipedSubject")).toBe(""),pn(tn("#🪈-pipedSubject-2")).toBe("")),en("#🥦-subject-increase-counter"),pn(tn("#🪈-pipedSubject")).toBe(tn("#🥦-subject-counter-display")),pn(tn("#🪈-pipedSubject-2")).toBe(tn("#🥦-subject-counter-display"))}))})),ln("props",(()=>{cn("test duels",(()=>{hn(["#propsDebug-🥩-0-button","#propsDebug-🥩-0-display"],["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"]),hn(["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"],["#propsOneLevelFunUpdate-🥩-button","#propsOneLevelFunUpdate-🥩-display"])})),cn("letProp",(()=>{gn("#propsDebug-🥩-0-display","#propsDebug-🥩-2-display");const e=Number(tn("#propsDebug-🥩-0-display"));en("#propsDebug-🥩-2-button"),pn(tn("#propsDebug-🥩-0-display")).toBe(e.toString()),pn(tn("#propsDebug-🥩-2-display")).toBe((e+1).toString())})),cn("basics",(()=>{const e=nn("propsOneLevelFunUpdate-🥩-display").innerHTML;pn(function(e,t=0){return document.querySelectorAll(e)[t].innerHTML}("#propsDebug-🥩-change-display")).toBe((Number(e)+1).toString());const t=nn("propsDebug-🥩-0-display").innerHTML,n=nn("propsDebug-🥩-1-display").innerHTML,o=nn("propsOneLevelFunUpdate-🥩-display").innerHTML,r=Number(t),s=Number(n),i=Number(o);pn(s).toBe(i),pn(r+2).toBe(s),nn("propsDebug-🥩-1-button").click()})),cn("props as functions",(()=>{const e=Number(on("sync-prop-number-display"));gn("#sync-prop-number-display","#sync-prop-child-display"),nn("sync-prop-child-button").click(),bn("#sync-prop-number-display",(e+2).toString()),yn("#nothing-prop-counter-button","#nothing-prop-counter-display"),bn("#sync-prop-number-display",(e+2).toString()),gn("#sync-prop-counter-display","#nothing-prop-counter-display")}))})),ln("providers",(()=>{cn("basics",(()=>{hn(["#increase-provider-🍌-0-button","#increase-provider-🍌-0-display"],["#increase-provider-🍌-1-button","#increase-provider-🍌-1-display"]),hn(["#increase-provider-upper-🌹-0-button","#increase-provider-upper-🌹-0-display"],["#increase-provider-upper-🌹-1-button","#increase-provider-upper-🌹-1-display"]),hn(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"])})),cn("inner outer debug",(()=>{hn(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"]),hn(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"]),hn(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"])}))})),ln("tagSwitching",(()=>{cn("0",(()=>{pn(Zt("#select-tag-above")).toBe(1,"Expected select-tag-above element to be defined"),pn(Zt("#tag-switch-dropdown")).toBe(1,"Expected one #tag-switch-dropdown"),pn(Zt("#tagSwitch-1-hello")).toBe(2,"Expected two #tagSwitch-1-hello elements"),pn(Zt("#tagSwitch-2-hello")).toBe(0),pn(Zt("#tagSwitch-3-hello")).toBe(0)})),cn("1",(()=>{const e=nn("tag-switch-dropdown");e.value="1",e.onchange({target:e}),fn("#tagSwitch-1-hello",5),pn(Zt("#tagSwitch-2-hello")).toBe(0),pn(Zt("#tagSwitch-3-hello")).toBe(0),pn(Zt("#select-tag-above")).toBe(0)})),cn("2",(()=>{const e=nn("tag-switch-dropdown");e.value="2",e.onchange({target:e}),fn("#tagSwitch-1-hello",2),fn("#tagSwitch-2-hello",4),pn(Zt("#tagSwitch-3-hello")).toBe(0),pn(Zt("#select-tag-above")).toBe(0)})),cn("3",(()=>{const e=nn("tag-switch-dropdown");e.value="3",e.onchange({target:e}),pn(Zt("#tagSwitch-1-hello")).toBe(0,"Expected no hello 1s"),pn(Zt("#tagSwitch-2-hello")).toBe(0),fn("#tagSwitch-3-hello",7),pn(Zt("#select-tag-above")).toBe(0)})),cn("4",(()=>{const e=nn("tag-switch-dropdown");e.value="",e.onchange({target:e}),fn("#select-tag-above",1),fn("#tag-switch-dropdown",1),fn("#tagSwitch-1-hello",2),fn("#tagSwitch-2-hello",0),fn("#tagSwitch-3-hello",0)}))})),cn("child tests",(()=>{yn("#innerHtmlPropsTest-button","#innerHtmlPropsTest-display"),yn("#innerHtmlTest-counter-button","#innerHtmlTest-counter-display"),hn(["#childTests-button","#childTests-display"],["#child-as-prop-test-button","#child-as-prop-test-display"],["#innerHtmlPropsTest-childTests-button","#innerHtmlPropsTest-childTests-display"]),hn(["#childTests-button","#childTests-display"],["#innerHtmlTest-childTests-button","#innerHtmlTest-childTests-display"])})),ln("array testing",(()=>{cn("array basics",(()=>{pn(Zt("#array-test-push-item")).toBe(1);pn(Zt("#score-data-0-1-inside-button")).toBe(0),pn(Zt("#score-data-0-1-outside-button")).toBe(0),nn("array-test-push-item").click(),pn(Zt("#score-data-0-1-inside-button")).toBe(1),pn(Zt("#score-data-0-1-outside-button")).toBe(1);const e=nn("score-data-0-1-inside-button"),t=nn("score-data-0-1-inside-display");let n=t.innerText;const o=nn("score-data-0-1-outside-button"),r=nn("score-data-0-1-outside-display"),s=r.innerText;pn(n).toBe(s),e.click(),pn(t.innerText).toBe(r.innerText),pn(n).toBe((Number(t.innerText)-1).toString()),pn(n).toBe((Number(r.innerText)-1).toString()),o.click(),pn(t.innerText).toBe(r.innerText),pn(n).toBe((Number(t.innerText)-2).toString()),pn(n).toBe((Number(r.innerText)-2).toString())})),cn("🗑️ deletes",(async()=>{var e;pn(Zt("#player-remove-promise-btn-0")).toBe(0),pn(Zt("#player-edit-btn-0")).toBe(1),await nn("player-edit-btn-0").onclick(),pn(Zt("#player-remove-promise-btn-0")).toBe(1),await nn("player-remove-promise-btn-0").onclick(),await(e=1e3,new Promise((t=>setTimeout(t,e)))),pn(Zt("#player-remove-promise-btn-0")).toBe(0),pn(Zt("#player-edit-btn-0")).toBe(0)}))})),cn("🪞 mirror testing",(()=>{fn("#mirror-counter-display",2),fn("#mirror-counter-button",2);const e=Number(on("mirror-counter-display"));nn("mirror-counter-button").click(),pn(e+1).toBe(Number(on("mirror-counter-display"))),fn("#mirror-counter-display",2),gn("#mirror-counter-display")})),cn("⌚️ watch tests",(()=>{const n=Number(on("watch-testing-num-display"));gn("#watch-testing-num-display","#🍄-slowChangeCount"),pn(tn("#🦷-truthChange")).toBe("false"),t?(pn(tn("#🍄-watchPropNumSlow")).toBe(""),pn(tn("#🦷-watchTruth")).toBe("false"),pn(tn("#🦷-watchTruthAsSub")).toBe("undefined")):(pn(tn("#🍄-watchPropNumSlow")).toBe(e),pn(Number(tn("#🦷-watchTruth"))).toBeGreaterThan(Number(e)),pn(tn("#🦷-watchTruthAsSub")).toBe(tn("#🦷-truthSubChangeCount"))),en("#watch-testing-num-button"),gn("#watch-testing-num-display","#🍄-slowChangeCount"),gn("#🍄-watchPropNumSlow","#🍄-slowChangeCount"),pn(tn("#🍄‍🟫-subjectChangeCount")).toBe((n+2).toString()),gn("#🍄‍🟫-subjectChangeCount","#🍄‍🟫-watchPropNumSubject");const o=Number(tn("#🦷-truthChangeCount"));en("#🦷-truthChange-button");let r=(o+1).toString();pn(tn("#🦷-truthChange")).toBe("true"),pn(tn("#🦷-watchTruth")).toBe(r),pn(tn("#🦷-truthChangeCount")).toBe(r),en("#🦷-truthChange-button"),r=(o+1).toString(),pn(tn("#🦷-truthChange")).toBe("false"),pn(tn("#🦷-watchTruth")).toBe(r),pn(tn("#🦷-truthChangeCount")).toBe(r),en("#🦷-truthChange-button"),r=(o+2).toString(),pn(tn("#🦷-truthChange")).toBe("true"),pn(tn("#🦷-watchTruth")).toBe(r),pn(tn("#🦷-truthChangeCount")).toBe(r),en("#🦷-truthChange-button"),en("#🦷-reset-button"),pn(tn("#🦷-watchTruthAsSub")).toBe(tn("#🦷-watchTruth"))})),cn("oneRender",(()=>{pn(tn("#oneRender_tag_ts_render_count")).toBe("1"),yn("#👍-counter-button","#👍-counter-display"),yn("#👍👍-counter-button","#👍👍-counter-display"),yn("#👍👍-counter-button","#👍👍-counter-subject-display"),pn(tn("#oneRender_tag_ts_render_count")).toBe("1")})),cn("has no templates",(()=>{pn(document.getElementsByTagName("template").length).toBe(0)}));try{const e=Date.now();await async function(){return rn.length?dn(rn):dn(sn)}();const t=Date.now()-e;return console.info(`✅ all tests passed in ${t}ms`),!0}catch(e){return console.error("❌ tests failed: "+e.message,e),!1}}ln.only=(e,t)=>{rn.push((async()=>{const n=sn;sn=[];try{console.debug("  ".repeat(an)+"↘ "+e),++an,await t(),await dn(sn),--an}catch(e){throw--an,e}finally{sn=n}}))},cn.only=(e,t)=>{rn.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(`✅ ${e} - ${o}ms`)}catch(t){throw console.debug("❌ "+e),t}}))},cn.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)};const $n=bt((({label:e,memory:t})=>{let n=H(!1)((e=>[n,n=e])),o=H(!1)((e=>[o,o=e]));return ft`
    <div style="background-color:purple;padding:.2em;flex:1"
      onmouseover=${()=>n=!0}
      onmouseout=${()=>n=!1}
    >
      mouseover - ${e}:${t.counter}:${n||"false"}
      <button onclick=${()=>++t.counter}>++counter</button>
      <a style.visibility=${o||n?"visible":"hidden"}
        onclick=${()=>o=!o}
      >⚙️&nbsp;</a>
    </div>
  `})),wn=bt((({appCounterSubject:e})=>{let t=H(0)((e=>[t,t=e])),n=H(0)((e=>[n,n=e])),o=H(0)((e=>[o,o=e])),r=H(0)((e=>[r,r=e])),s=N((()=>({counter:0})));const i=te(),a=N((()=>new y(t))),l=N((()=>new v("222"))),c=y.all([l,a]).pipe(function(e){const t=$();if(!t)throw new T("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const n=w.memory.stateConfig.array;return(...o)=>t.global.callbackMaker?re(t,e,n,...o):e(...o)}((e=>t))),u=R.all([l,a]).pipe((e=>t));ie((()=>{++r,console.info("countersDebug.ts: 👉 i should only ever run once"),a.subscribe(i((e=>t=e)))}));const d=()=>{++t,l.next("333-"+t)},p=()=>++n;++o;return ft`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${ft`
        <div>👉 Subscriptions:${y.globalSubCount$}</div>
        <button onclick=${()=>console.info("subs",y.globalSubs)}>log subs</button>
        <div>initCounter:${r}</div>
    
        <div>
          <button id="app-counter-subject-button"
            onclick=${()=>e.set((e.value||0)+1)}
          >🍒 ++app subject</button>
          <span>
            🍒 <span id="app-counter-subject-button">${e.value}</span>
          </span>
        </div>

        <div>
          <button id="standalone-counter"
            onclick=${d}
          >stand alone counter:${t}</button>
          <span>
            🥦 <span id="standalone-display">${t}</span>
          </span>
        </div>
    
        ${t>1&&ft`
          <div>
            <button id="conditional-counter"
              onclick=${d}
            >conditional counter:${t}</button>
            <span>
              🥦 <span id="conditional-display">${t}</span>
            </span>
          </div>
        `}

        <input id="set-main-counter-input"
          onkeyup=${e=>t=Number(e.target.value)||0}
        />

        <div>
          <button id="❤️-increase-counter"
            onclick=${p}
          >❤️ propCounter:${n}</button>
          <span>
            ❤️ <span id="❤️-counter-display">${n}</span>
            </span>
        </div>

        <div>
          <button id="🥦-subject-increase-counter"
            onclick=${()=>a.set(t+1)}
          >subject increase:</button>
          <span>
            🥦 <span id="🥦-subject-counter-display">${t}</span>
            🥦 <span id="subject-counter-subject-display">${a}</span>
          </span>
        </div>
      `}
    </div>

    <fieldset>
      <legend>🪈 pipedSubject 1</legend>
      <div>
        <small>
          <span id="🪈-pipedSubject">${c}</span>
        </small>
      </div>
    </fieldset>

    <fieldset>
      <legend>🪈 pipedSubject 2</legend>
      <div>
        <small>
          <span id="🪈-pipedSubject-2">${u}</span>
        </small>
      </div>
    </fieldset>

    ${ft`
      <fieldset>
        <legend>shared memory</legend>
        <div class.bold.text-blue=${!0} style="display:flex;flex-wrap:wrap;gap:.5em">
          ${$n({label:"a-a-😻",memory:s})}
          ${$n({label:"b-b-😻",memory:s})}
        </div>
        memory.counter:😻${s.counter}
        <button onclick=${()=>++s.counter}>increase 😻</button>
      </fieldset>
    `}
    
    ${ft`
      <fieldset>
        <legend>inner counter</legend>
        ${Sn({propCounter:n,increasePropCounter:p})}
      </fieldset>
    `}
    ${St({renderCount:o,name:"counters"})}
  `})),Sn=bt((({propCounter:e,increasePropCounter:t})=>{let n=H(0)((e=>[n,n=e]));return++n,ft`
    <button id="❤️-inner-counter" onclick=${t}
    >❤️ propCounter:${e}</button>
    <span>
      ❤️ <span id="❤️-inner-display">${e}</span>
    </span>
    <div>renderCount:${n}</div>
    ${St({renderCount:n,name:"inner_counters"})}
  `}));class Cn{tagDebug=0;showDialog=!1}const xn=()=>({counter:0});function Tn(){return{upper:I(kn),test:0}}function kn(){return{name:"upperTagDebugProvider",test:0}}const Bn=bt(((e="providerDebugBase")=>{I(xn);const t=I(Cn),n=I(Tn);H("props debug base");let o=H(0)((e=>[o,o=e])),r=H(0)((e=>[r,r=e]));return t.showDialog&&document.getElementById("provider_debug_dialog").showModal(),++r,ft`
    <div>
      <strong>provider.test sugar-daddy-77</strong>:${n.test}
    </div>
    <div>
      <strong>provider.upper?.test</strong>:${n.upper?.test||"?"}
    </div>
    <div>
      <strong>providerClass.tagDebug</strong>:${t.tagDebug||"?"}
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <div>
        <button id="increase-provider-🍌-0-button"
          onclick=${()=>++n.test}
        >🍌 increase provider.test ${n.test}</button>
        <span>
          🍌 <span id="increase-provider-🍌-0-display">${n.test}</span>
        </span>
      </div>
      
      <div>
        <button id="increase-provider-upper-🌹-0-button" onclick=${()=>++n.upper.test}
        >🌹 increase upper.provider.test ${n.upper.test}</button>
        <span>
          🌹 <span id="increase-provider-upper-🌹-0-display">${n.upper.test}</span>
        </span>
      </div>
      
      <div>
        <button id="increase-provider-🍀-0-button" onclick=${()=>++t.tagDebug}
        >🍀 increase provider class ${t.tagDebug}</button>
        <span>
          🍀 <span id="increase-provider-🍀-0-display">${t.tagDebug}</span>
        </span>
      </div>

      <div>
        <button id="increase-prop-🐷-0-button" onclick=${()=>++o}
        >🐷 increase propCounter ${o}</button>
        <span>
          🐷 <span id="increase-prop-🐷-0-display">${o}</span>
        </span>
      </div>

      <button onclick=${()=>t.showDialog=!0}
      >💬 toggle dialog ${t.showDialog}</button>
    </div>

    <hr />

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${Dn({propCounter:o,propCounterChange:e=>{o=e}})}
    </div>

    <hr />
    renderCount outer:<span name="render_count_outer">${r}</span>
    ${St({renderCount:r,name:"providerDebugBase"})}

    ${jn(t)}
  `})),jn=bt((e=>ft`
  <dialog id="provider_debug_dialog" style="padding:0"
    onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
    ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
    ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
    ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
    onclose=${()=>e.showDialog=!1}
  >
    <div style="padding:.25em" onmousedown="this.parentNode.draggable=true"
    >dialog title</div>
    ${e.showDialog?ft`
      <textarea wrap="off">${JSON.stringify(e,null,2)}</textarea>
    `:"no dialog"}
    <div style="padding:.25em">
      <button type="button" onclick="provider_debug_dialog.close()">🅧 close</button>
    </div>
  </dialog>
`)),Dn=bt((({propCounter:e,propCounterChange:t})=>{const n=J(xn),o=J(Tn),r=J(Cn),s=J(kn);let i=H(!1)((e=>[i,i=e])),a=H(0)((e=>[a,a=e]));const l=te(),c=N((()=>new y));return ie((()=>{console.info("providerDebug.ts: 👉 👉 i should only ever run once"),c.subscribe((e=>{l((t=>{o.test=e}))()}))})),++a,ft`<!--providerDebug.js-->
    <div>
      <button id="increase-provider-🍌-1-button" onclick=${()=>++o.test}
      >🍌 increase provider.test ${o.test}</button>
      <span>
        🍌 <span id="increase-provider-🍌-1-display">${o.test}</span>
      </span>
    </div>
    
    <div>
      <button id="increase-provider-upper-🌹-1-button" onclick=${()=>++s.test}
      >🌹 increase upper.provider.test ${s.test}</button>
      <span>
        🌹<span id="increase-provider-upper-🌹-1-display">${s.test}</span>
      </span>
    </div>

    <div>
      <button id="increase-arrow-provider-⚡️-1-button" onclick=${()=>++n.counter}
      >⚡️ increase upper.provider.test ${n.counter}</button>
      <span>
      ⚡️<span id="increase-arrow-provider-⚡️-1-display">${n.counter}</span>
      </span>
    </div>

    <div>
      <button id="subject-increase-counter"
        onclick=${()=>c.set(o.test+1)}
      >🍌 subject increase:</button>
      <span>
        🍌 <span id="subject-counter-display">${o.test}</span>
      </span>
    </div>
    
    <div>
      <button id="increase-provider-🍀-1-button" onclick=${()=>++r.tagDebug}
      >🍀 increase provider class ${r.tagDebug}</button>
      <span>
        🍀 <span id="increase-provider-🍀-1-display">${r.tagDebug}</span>
      </span>
    </div>

    <div>
      <button id="increase-prop-🐷-1-button" onclick=${()=>t(++e)}
      >🐷 increase propCounter ${e}</button>
      <span>
        🐷 <span id="increase-prop-🐷-1-display">${e}</span>
      </span>
    </div>

    <button onclick=${()=>r.showDialog=!0}
      >💬 toggle dialog ${r.showDialog}</button>

    <button onclick=${()=>i=!i}
    >${i?"hide":"show"} provider as props</button>
    
    ${i&&ft`
      <div oninit=${At} ondestroy=${Pt}>
        <hr />
        <h3>Provider as Props</h3>
        ${Nn(r)}
      </div>
    `}

    <div>
      renderCount inner:${a}
      ${St({renderCount:a,name:"providerDebugInner"})}
    </div>
  `})),Nn=bt((e=>ft`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(e,null,2)}</textarea>
  `)),An=bt((()=>(e=H(0)((t=>[e,e=t])),t=H(0)((e=>[t,t=e])),n=A([e],(()=>++t)),o=H(0)((e=>[o,o=e])),r=A.noInit([e],(()=>++o)),s=H(0)((e=>[s,s=e])),i=A.asSubject([e],(()=>++s)),a=H(!1)((e=>[a,a=e])),l=H(0)((e=>[l,l=e])),c=A.truthy([a],(()=>++l)),u=H(0)((e=>[u,u=e])),d=A.truthy.asSubject([a],(()=>(++u,a))).pipe((e=>void 0===e?"undefined":u)))=>ft`
  stateNum:<span id="watch-testing-num-display">${e}</span>
  <button id="watch-testing-num-button" type="button"
    onclick=${()=>++e}
  >++ stateNum</button>
  <div>
    <small>stateNumChangeCount:<span id="stateNumChangeCount">${t}</span></small>
  </div>
  <fieldset>
    <legend>🍄 slowChangeCount</legend> 
    <div>
      <small>
        <span id="🍄-slowChangeCount">${o}</span>
      </small>
    </div>
    <div>
      <small>
        watchPropNumSlow:<span id="🍄-watchPropNumSlow">${r}</span>
      </small>
    </div>
  </fieldset>

  <fieldset>
    <legend>🍄‍🟫 subjectChangeCount</legend>    
    <div>
      <small>
        <span id="🍄‍🟫-subjectChangeCount">${s}</span>
      </small>
    </div>
    <div>
      <small>
        (watchPropNumSubject:<span id="🍄‍🟫-watchPropNumSubject">${i}</span>)
      </small>
    </div>
  </fieldset>

  <fieldset>
    <legend>🦷 truthChange</legend>
    <div>
      <small>
        <span id="🦷-truthChange">${a?"true":"false"}</span>
      </small>
    </div>
    <fieldset>
      <legend>simple truth</legend>      
      <div>
        <small>
          watchTruth:<span id="🦷-watchTruth">${c||"false"}</span>
        </small>
      </div>
      <div>
        <small>
          (truthChangeCount:<span id="🦷-truthChangeCount">${l}</span>)
        </small>
      </div>
    </fieldset>
    <fieldset>
      <legend>truth subject</legend>      
      <div>
        <small>
        watchTruthAsSub:<span id="🦷-watchTruthAsSub">${d}</span>
        </small>
      </div>
      <div>
        <small>
          (truthSubChangeCount:<span id="🦷-truthSubChangeCount">${u}</span>)
        </small>
      </div>
    </fieldset>

    <button id="🦷-truthChange-button" type="button"
      onclick=${()=>a=!a}
    >toggle to ${a?"true":"false"}</button>
  </fieldset>`)),Pn=()=>bt.oneRender=(e=new v(0),t=H(0)((e=>[t,t=e])))=>(++t,ft`
    <span>👍<span id="👍-counter-display">${e}</span></span>
    <button type="button" id="👍-counter-button"
      onclick=${()=>{++e.value}}
    >++👍</button>
    ${St({renderCount:t,name:"oneRender_tag_ts"})}
    <hr />
    ${_n()}
  `),_n=bt((()=>(e=H(0)((t=>[e,e=t])),t=R.value(0),n=H(0)((e=>[n,n=e])))=>(++n,ft`
  <span>👍👍 sub counter-subject-display:<span id="👍👍-counter-subject-display">${t}</span></span>
  <br />
  <span>👍👍 sub counter<span id="👍👍-counter-display">${e}</span></span>
  <br />
  <button type="button" id="👍👍-counter-button"
    onclick=${()=>{++e,t.set(e)}}
  >++👍👍</button>
  ${St({renderCount:n,name:"insideMultiRender"})}
`))),En=bt((()=>{let e=H("app first state")((t=>[e,e=t])),t=H(!1)((e=>[t,t=e])),n=H(0)((e=>[n,n=e])),o=H(0)((e=>[o,o=e])),r=H(null)((e=>[r,r=e]));function s(e=!0){r=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await vn();e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),1e3)}le((()=>{clearTimeout(r),r=null})),++o;const i=te(),a=N((()=>new y(n)));ie((()=>{console.info("1️⃣ app init should only run once"),s(!1),a.subscribe(i((e=>n=e)))}));return ft`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${4}</h1>

    <button id="toggle-test" onclick=${()=>{t=!t}}>toggle test ${t}</button>
    <button onclick=${s}>run test</button>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>a.set(n+1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-button">${n}</span>
      </span>
    </div>

    ${St({name:"app",renderCount:o})}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${wn({appCounterSubject:a})}
        </fieldset>

        <fieldset id="counters" style="flex:2 2 20em">
          <legend>⌚️ watch testing</legend>
          ${An()}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${Bn(void 0)}
        </fieldset>

        ${Qt(void 0)}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${vt()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${$t()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${Mt(void 0)}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Mirroring</legend>
          ${zt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${wt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>oneRender</legend>
          ${Pn()}
        </fieldset>
      </div>

      ${Vt()}
    </div>
  `})),Rn=bt((()=>{const e=["content","oneRender"];let t=H(0)((e=>[t,t=e])),n=H(0)((e=>[n,n=e]));const o=N((()=>new y(n))),r=te();return ie((()=>{console.info("1️⃣ app init should only run once"),o.subscribe(r((e=>{n=e})))})),++t,ft`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>o.set(n+1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-button">${n}</span>
      </span>
    </div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${e.includes("oneRender")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>oneRender</legend>
            ${Pn()}
          </fieldset>
        `}

        ${e.includes("props")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${Ct(void 0)}
          </fieldset>
        `}

        ${e.includes("watchTesting")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>watchTesting</legend>
            ${An()}
          </fieldset>
        `}

        ${e.includes("tableDebug")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${wt()}
          </fieldset>
        `}

        ${e.includes("providerDebug")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${Bn(void 0)}
          </fieldset>
        `}

        ${e.includes("tagSwitchDebug")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${Mt(void 0)}
          </fieldset>
        `}

        ${e.includes("mirroring")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${zt()}
          </fieldset>
        `}

        ${e.includes("arrays")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${_t()}
          </fieldset>
        `}

        ${e.includes("counters")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${wn({appCounterSubject:o})}
          </fieldset>
        `}

        ${e.includes("content")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${$t()}
          </fieldset>
        `}

        ${e.includes("child")&&ft`
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${Qt(void 0)}
          </fieldset>
        `}

        ${!1}
      </div>
      ${St({renderCount:t,name:"isolatedApp"})}
    </div>
  `})),Hn=()=>{console.info("attaching app to element...");const e=document.getElementsByTagName("app")[0],t=window.location.pathname.split("/").filter((e=>e)),n=t[0]?.toLowerCase();if(n&&["isolated.html","index-static.html"].includes(n)){const t=Date.now();mt(Rn,e,{test:1});const n=Date.now()-t;return void console.info(`⏱️ isolated render in ${n}ms`)}const o=Date.now();mt(En,e,{test:1});const r=Date.now()-o;console.info(`⏱️ rendered in ${r}ms`)};var Fn=n.gV,Ln=n.jG,On=n.l2,Vn=n.fm;export{Fn as App,Ln as IsolatedApp,On as app,Vn as hmr};
//# sourceMappingURL=bundle.js.map