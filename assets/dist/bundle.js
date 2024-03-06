var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function n(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};n.tagUse.push(t)}function r(e,t){n.tagUse.forEach((n=>n.beforeRender(e,t)))}function o(e,t){n.tagUse.forEach((n=>n.afterRender(e,t)))}function s(e,t){n.tagUse.forEach((n=>n.beforeRedraw(e,t)))}function i(e){return a(e,new WeakMap)}function a(e,t){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,n),Array.isArray(e))for(let r=0;r<e.length;r++)n[r]=a(e[r],t);else for(const r in e)e.hasOwnProperty(r)&&(n[r]=a(e[r],t));return n}function l(e,t){return u(e,t,new WeakMap)}function u(e,t,n){if(e===t||(o=t,(r=e)instanceof Function&&o instanceof Function&&r.toString()===o.toString()))return!0;var r,o;if("object"!=typeof e||"object"!=typeof t||null===e||null===t)return!1;const s=Object.keys(e),i=Object.keys(t);if(s.length!==i.length)return!1;if(n.has(e))return!0;n.set(e,0);for(const r of s)if(!i.includes(r)||!u(e[r],t[r],n))return!1;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!u(e[r],t[r],n))return!1}else if(Array.isArray(e)||Array.isArray(t))return!1;return!0}function c(e,t){if(e===t)throw new Error("someting here");const n=e.propsConfig.latest;if(function(e,t,n){if(void 0===e&&e===n)return!1;let r=e,o=t;if("object"==typeof e){if(!t)return!0;if(r={...e},o={...t||{}},!Object.entries(r).every((([e,t])=>{let n=o[e];return!(t instanceof Function)||n instanceof Function&&(n.original&&(n=n.original),t.original&&(t=t.original),t.toString()===n.toString()&&(delete r[e],delete o[e],!0))})))return!0}return!l(t,e)}(t.propsConfig.latest,e.propsConfig.latestCloned,n))return!0;const r=function(e,t){const n=e.propsConfig.lastClonedKidValues,r=t.propsConfig.lastClonedKidValues,o=n.every(((e,t)=>{const n=r[t];return e.every(((e,t)=>e===n[t]))}));return!o}(e,t);return r}function d(e){e.tagSupport.memory.providers.filter((e=>!l(e.instance,e.clone))).forEach((t=>{!function(e,t){p(e,t).forEach((({tag:e,renderCount:t,provider:n})=>{t===e.tagSupport.memory.renderCount&&(n.clone=i(n.instance),e.tagSupport.render())}))}(e.getAppElement(),t),t.clone=i(t.instance)}))}function p(e,t,n=[]){const r=e.tagSupport.memory.providers.find((e=>e.constructMethod===t.constructMethod));return r&&n.push({tag:e,renderCount:e.tagSupport.memory.renderCount,provider:r}),e.children.forEach((e=>p(e,t,n))),n}function g(e,t,n){const r=n.memory.renderCount;if(d(e),r!==n.memory.renderCount)return!0;const o=c(e.tagSupport,t.tagSupport),s=n.templater;return n.newest=s.redraw(),t.newest=n.newest,!o}e.d(t,{gV:()=>xt,jG:()=>Ct,fm:()=>Re}),n.tagUse=[],n.memory={};const f=[];function h(e){return!0===e?.isTemplater}function m(e){return!0===e?.isTag}function b(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function v(e){return e instanceof Array&&e.every((e=>m(e)))}class y{templater;children;propsConfig;memory={context:{},state:{newest:[]},providers:[],renderCount:0};constructor(e,t,n){this.templater=e,this.children=t;const r=S(n,e);this.propsConfig={latest:n,latestCloned:r,clonedProps:r,lastClonedKidValues:t.value.map((e=>$(e.values)))},m(n)||(this.propsConfig.latestCloned=i(r),this.propsConfig.clonedProps=this.propsConfig.latestCloned)}oldest;newest;mutatingRender(){const e='Tag function "render()" was called in sync but can only be called async';throw console.error(e,{tagSupport:this}),new Error(e)}render(){return++this.memory.renderCount,this.mutatingRender()}}function $(e){return e.map((e=>{const t=e;return m(t)?$(t.values):h(t)?i(t.tagSupport.propsConfig.latestCloned):v(t)?$(t):i(e)}))}class w{tagged;wrapper;insertBefore;newest;oldest;tagSupport;constructor(e,t){this.tagSupport=new y(this,t,e)}redraw;isTemplater=!0;renderWithSupport(e,t,i){++e.memory.renderCount;const a=t?.ownerTag||i;t?(e.propsConfig={...t.tagSupport.propsConfig},s(e,t)):(r(e,a),n.memory.providerConfig.ownerTag=a);const l=this.wrapper();return o(e,l),this.newest=l,l.ownerTag=a,e.newest=l,{remit:!0,retag:l}}}function S(e,t){const n=function(e,t){if("object"!=typeof e)return e;const n=e;return Object.entries(n).forEach((([e,r])=>{if(r instanceof Function){const o=n[e].original;return o?(n[e]=(...e)=>t(r,e),void(n[e].original=o)):(n[e]=(...e)=>t(r,e),void(n[e].original=r))}})),n}(m(e)?0:e,(function(e,n){const r=e(...n),o=t.newest?.ownerTag?.tagSupport;return o&&o.render(),r}));return n}class T{value;isSubject=!0;subscribers=[];constructor(e){this.value=e}subscribe(e){this.subscribers.push(e),C.globalSubs.push(e);const t=C.globalSubCount$;C.globalSubCount$.set(t.value+1);const n=()=>{n.unsubscribe()};return n.unsubscribe=()=>{x(this.subscribers,e),x(C.globalSubs,e),C.globalSubCount$.set(t.value-1),n.unsubscribe=()=>{}},n}set(e){this.value=e,this.subscribers.forEach((t=>{t.value=e,t(e)}))}next=this.set}function x(e,t){const n=e.indexOf(t);-1!==n&&e.splice(n,1)}const C=T;C.globalSubs=[],C.globalSubCount$=new T,C.globalSubCount$.set(0);class k extends T{value;constructor(e){super(e),this.value=e}subscribe(e){const t=super.subscribe(e);return e(this.value),t}}function E(e,t){if(e.isChildOverride)return e;const n=(n,r)=>A(e,t,n,r);return n.tagFunction=e,n}function A(e,t,n,r){const o=t.tagSupport,s=(o&&o.memory.renderCount,e.bind(n)(...r));return o.memory.renderCount,o.render(),s instanceof Promise?s.then((()=>(o.render(),"promise-no-data-ever"))):"no-data-ever"}const B=[];let j=0;function N(e){const t=function(t,n){(m(t)||v(t))&&(n=t,t=void 0);const{childSubject:r,madeSubject:o}=function(e){if(b(e))return{childSubject:e,madeSubject:!1};if(v(e))return{childSubject:new k(e),madeSubject:!0};const t=e;return t?(t.arrayValue=0,{childSubject:new k([t]),madeSubject:!0}):{childSubject:new k([]),madeSubject:!0}}(n);r.isChildSubject=!0;const s=new w(t,r);function a(){const e=a.original,t=s.tagSupport,n=s.oldest;let l=t.propsConfig.latest,u=S(l,s);const c=e(u,r);t.mutatingRender===y.prototype.mutatingRender&&(t.oldest=c,t.mutatingRender=()=>{if(g(c,s,t))return c;if(c.ownerTag){const e=c.ownerTag.tagSupport.render();return c.ownerTag.tagSupport.newest=e,c}return c}),c.tagSupport=new y(s,t.children);const d=i(u);return c.tagSupport.propsConfig={latest:l,latestCloned:d,clonedProps:d,lastClonedKidValues:c.tagSupport.propsConfig.lastClonedKidValues},c.tagSupport.memory=t.memory,c.tagSupport.mutatingRender=t.mutatingRender,t.newest=c,t.propsConfig={...c.tagSupport.propsConfig},n&&(n.tagSupport.propsConfig={...c.tagSupport.propsConfig}),o&&r.value.forEach((e=>{e.values.forEach(((t,n)=>{t instanceof Function&&(e.values[n].isChildOverride||(e.values[n]=function(...e){A(t,c.ownerTag,this,e)},e.values[n].isChildOverride=!0))}))})),c}return a.original=e,s.tagged=!0,s.wrapper=a,s};return function(e,t){e.isTag=!0,e.original=t}(t,e),function(e){e.tags=B,e.setUse=n,e.tagIndex=++j}(e),B.push(e),t}function V(e,t){t.parentNode.insertBefore(e,t)}function D(e,t,n){const r=e.split(".");if("style"===r[0]&&(n.style[r[1]]=t),"class"===r[0])return r.shift(),void(t?r.forEach((e=>n.classList.add(e))):r.forEach((e=>n.classList.remove(e))))}function P(e,t,n){e.setAttribute(t,n)}function R(e,t,n){e[t]=n}function O(e,t,n){const r=e.getAttributeNames();"TEXTAREA"!==e.nodeName||r.includes("value")||F("textVarValue",e.getAttribute("textVarValue"),e,t,n,((t,n)=>e.value=n));let o=P;r.forEach((r=>{"INPUT"===e.nodeName&&"value"===r&&(o=R),F(r,e.getAttribute(r),e,t,n,o),o=P}))}function H(e){return e.search(/^(class|style)(\.)/)>=0}function F(e,t,n,r,o,s){if(J(t))return function(e,t,n,r,o,s){return z(e,W(r,t),n,o,s)}(e,t,n,r,o,s);if(J(e)){let t;const i=W(r,e).subscribe((e=>{!function(e,t,n,r,o){if(t&&t!=e&&("string"==typeof t?n.removeAttribute(t):t instanceof Object&&Object.entries(t).forEach((([e])=>n.removeAttribute(e)))),"string"!=typeof e)e instanceof Object&&Object.entries(e).forEach((([e,t])=>z(e,t,n,r,o)));else{if(!e.length)return;z(e,"",n,r,o)}}(e,t,n,o,s),t=e}));return o.cloneSubs.push(i),void n.removeAttribute(e)}return H(e)?D(e,t,n):void 0}new class{};const I=/^\s*{__tagvar/,_=/}\s*$/;function J(e){return e&&e.search(I)>=0&&e.search(_)>=0}function W(e,t){return e[t.replace("{","").split("").reverse().join("").replace("}","").split("").reverse().join("")]}function z(e,t,n,r,o){const s=H(e);if(t instanceof Function){const r=function(...e){return t(n,e)};n[e].action=r}if(b(t)){n.removeAttribute(e);const i=t=>function(e,t,n,r,o){if(e instanceof Function)return t[n]=function(...n){return e(t,n)},void(t[n].tagFunction=e);if(r)return void D(n,e,t);if(e)return void o(t,n,e);void 0===e||!1===e||null===e?t.removeAttribute(n):o(t,n,e)}(t,n,e,s,o),a=t.subscribe(i);r.cloneSubs.push(a)}else o(n,e,t)}const L=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;function M(e,t,n,{counts:r,forceElement:o}){const s=t,i=s.tag;if(i&&!o&&i.isLikeTag(e)){if(t instanceof Function){const e=t(i.tagSupport);return i.updateByTag(e),[]}return i.updateByTag(e),[]}if(!n||!n.parentNode)throw new Error("bad parent already started");const a=e.buildBeforeElement(n,{counts:r,forceElement:o});return s.tag=s.tag||e,a}function U(e,t,o,i,a){if(!0!==e.tagged){let t=e.wrapper.original.name||e.wrapper.original.constructor?.name;"Function"===t&&(t=void 0);const n=t||e.wrapper.original.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${n}\n\n`)}const l=e;l.insertBefore=o;const u=e.tagSupport;let c=l.newest;return n.memory.providerConfig.ownerTag=i,c&&!a.forceElement||(c?s(u,l.oldest):r(u,i),c=l.renderWithSupport(u,t.tag,i).retag,l.newest=c),i.children.push(c),u.templater=c.tagSupport.templater,M(c,t,o,a)}class q extends Error{details;constructor(e,t,n={}){super(e),this.name=q.name,this.details={...n,errorCode:t}}}class Y extends q{constructor(e,t){super(e,"array-no-key-error",t),this.name=Y.name}}class K extends q{constructor(e,t){super(e,"state-mismatch-error",t),this.name=K.name}}function X(e,t,n,r,o){const s=[];e.lastArray=e.lastArray||[],e.template=n;let i=0;e.lastArray=e.lastArray.filter(((n,r)=>{const s=t.length-1<r-i,a=t[r-i],l=a?.arrayValue;return!(s||!G(l,n.tag.arrayValue))||(e.lastArray[r].tag.destroy({stagger:o.counts.removed,byParent:!1}),++i,++o.counts.removed,!1)}));const a=n||n.clone;return t.forEach(((n,i)=>{const l=e.lastArray[i],u=n.tagSupport||l?.tag.tagSupport;n.tagSupport=u||new y({},new k([])),u?u.newest=n:(n.tagSupport.mutatingRender=()=>(r.tagSupport.render(),n),r.children.push(n)),n.ownerTag=r;const c=n.arrayValue;if(c?.isArrayValueNeverSet){const e={template:n.getTemplate().string,array:t,ownerTagContent:r.lastTemplateString},o="Use html`...`.key(item) instead of html`...` to template an Array";throw console.error(o,e),new Y(o,e)}if(e.lastArray.length>i)return G(l.tag.arrayValue,n.arrayValue)?(n.tagSupport=n.tagSupport||l.tag.tagSupport,l.tag.updateByTag(n),[]):[];const d=function(e,t,n,r,o){n.lastArray.push({tag:t,index:r});const s={added:o.counts.added+r,removed:o.counts.removed},i=e;return t.buildBeforeElement(i,{counts:s,forceElement:o.forceElement})}(a,n,e,i,o);s.push(...d)})),s}function G(e,t){return e===t||!!(e instanceof Array&&t instanceof Array&&e.length==t.length)&&e.every(((e,n)=>e==t[n]))}function Q(e,t,n){t.template=n;const r=t.clone||n;t.lastValue=e;const o=function(e,t){const n=t.parentNode;void 0!==e&&!1!==e&&null!==e||(e="");const r=document.createTextNode(e);return n.insertBefore(r,t),n.removeChild(t),r}(e,r);return t.clone=o,[]}var Z;function ee(e,t,n,r,o){return e.tagSupport||(e.tagSupport=new y({},new k([])),e.tagSupport.mutatingRender=()=>{r.tagSupport.render()},e.tagSupport.oldest=e.tagSupport.oldest||e,r.children.push(e),e.ownerTag=r),t.template=n,M(e,t,n,o)}function te(e,t,n,r,o){const s=[];if(!e.hasAttribute("end"))return s;const i=e.getAttribute("id");if(i?.substring(0,ce.length)!==ce)return s;const a=t[i];let l=o.forceElement;const u=a.subscribe((t=>{a.clone&&(e=a.clone);const{clones:o}=function(e,t,n,r,o){const s=function(e){return h(e)?Z.tagComponent:m(e)?Z.tag:v(e)?Z.tagArray:Z.value}(e);switch(s){case Z.tag:return{clones:ee(e,t,n,r,o)};case Z.tagArray:return{clones:X(t,e,n,r,o)};case Z.tagComponent:return{clones:U(e,t,n,r,o)}}return{clones:Q(e,t,n)}}(t,a,e,n,{counts:{added:r.added,removed:r.removed},forceElement:l});l&&(l=!1),o.push(...o)}));return n.cloneSubs.push(u),s}function ne(e,t){if(!e.getAttribute)return;let n=t.counts.added;t.forceElement||(n=function(e,t){const n=e.oninit;if(!n)return t.added;const r=n.tagFunction;if(!r)return t.added;const o=r.tagFunction;return o?(o({target:e,stagger:t.added}),++t.added):t.added}(e,t.counts)-n),e.children&&(t.counts.added,t.counts.removed,new Array(...e.children).forEach(((e,n)=>ne(e,{...t,counts:t.counts}))))}!function(e){e.tag="tag",e.tagArray="tag-array",e.tagComponent="tag-component",e.value="value"}(Z||(Z={}));const re=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');function oe(e,t,n,r,o){if(!o||"TEMPLATE"===e.tagName)return[];const s=r.counts,i=[],a=new Array(...o);return"TEXTAREA"===e.tagName&&se(e),a.forEach((e=>{const o=te(e,t,n,s,r);"TEXTAREA"===e.tagName&&se(e),i.push(...o),e.children&&new Array(...e.children).forEach(((e,o)=>{(function(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")})(e)&&te(e,t,n,s,r);const a=oe(e,t,n,r,e.children);i.push(...a)}))})),i}function se(e){const t=e.value;if(t.search(re)>=0){const n=t.match(/__tagvar(\d{1,4})/),r="{"+(n?n[0]:"")+"}";e.value="",e.setAttribute("textVarValue",r)}}function ie(e,t,n,r,o){const s=[],i=n.interpolation,a=e.children[0].content.children;if(i.keys.length){const n=oe(e,t,r,o,a);s.push(...n)}return O(e,t,r),ae(a,t,r),s}function ae(e,t,n){new Array(...e).forEach((e=>{O(e,t,n),e.children&&ae(e.children,t,n)}))}function le(e,t,n){e.redraw=()=>{const r=t.tag,o=r?.tagSupport||e.tagSupport,{retag:s}=e.renderWithSupport(o,r,n);return t.set(e),s}}function ue(e,t){delete t.tag,delete t.tagSupport,e.destroy()}const ce="__tagvar",de="--"+ce+"--",pe=new RegExp(ce,"g"),ge=new RegExp(de,"g");class fe{isArrayValueNeverSet=!0}class he{strings;values;isTag=!0;clones=[];cloneSubs=[];children=[];tagSupport;ownerTag;appElement;arrayValue=new fe;constructor(e,t){this.strings=e,this.values=t}key(e){return this.arrayValue=e,this}async destroy(e={stagger:0,byParent:!1}){!!this.tagSupport&&function(e,t){n.tagUse.forEach((n=>n.beforeDestroy(e,t)))}(this.tagSupport,this),this.destroySubscriptions();const t=this.children.map((t=>t.destroy({...e,byParent:!0})));return this.children.length=0,this.ownerTag&&(this.ownerTag.children=this.ownerTag.children.filter((e=>e!==this))),e.byParent||(e.stagger=await this.destroyClones(e)),await Promise.all(t),e.stagger}destroySubscriptions(){this.cloneSubs.forEach((e=>e.unsubscribe())),this.cloneSubs.length=0}async destroyClones({stagger:e}={stagger:0}){let t=!1;const n=this.clones.reverse().map(((n,r)=>{let o;n.ondestroy&&(o=function(e,t){const n=e.ondestroy;if(!n)return;const r=n.tagFunction;if(!r)return;const o=r.tagFunction;return o?o({target:e,stagger:t}):void 0}(n,e));const s=()=>{n.parentNode?.removeChild(n);const e=this.ownerTag;e&&(e.clones=e.clones.filter((e=>e!==n)))};return o instanceof Promise?(t=!0,o.then(s)):s(),o}));return this.clones.length=0,t&&await Promise.all(n),e}updateByTag(e){this.updateConfig(e.strings,e.values),this.tagSupport.templater=e.tagSupport.templater,this.tagSupport.propsConfig={...e.tagSupport.propsConfig},this.tagSupport.newest=e}lastTemplateString=void 0;updateConfig(e,t){this.strings=e,this.updateValues(t)}getTemplate(){const e=function(e){const t=function(e){const t=[];return{string:e.replace(L,((e,n)=>{if(e.startsWith("<"))return e;const r=n.substring(1,n.length-1);return t.push(r),`<template interpolate end id="${r}"></template>`})),keys:t}}(e);return t.string=t.string.replace(ge,ce),t}(this.strings.map(((e,t)=>(e.replace(pe,de)+(this.values.length>t?`{${ce}${t}}`:"")).replace(/>\s*/g,">").replace(/\s*</g,"<"))).join(""));return this.lastTemplateString=e.string,{interpolation:e,string:e.string,strings:this.strings,values:this.values,context:this.tagSupport?.memory.context||{}}}isLikeTag(e){const{string:t}=e.getTemplate();if(!this.lastTemplateString)throw new Error("no template here");return t===this.lastTemplateString&&e.values.length===this.values.length&&!!e.values.every(((e,t)=>{const n=this.values[t];return!(e instanceof Function&&n instanceof Function)||!(e.toString()!==n.toString())}))}update(){return this.updateContext(this.tagSupport.memory.context)}updateValues(e){return this.values=e,this.updateContext(this.tagSupport.memory.context)}updateContext(e){return this.strings.map(((t,n)=>{const r=ce+n,a=this.values.length>n,l=this.values[n];if(r in e)return function(e,t,n){const r=e.value,a=e,l=e,u=a.isChildSubject,d=h(t);if(u&&(t=t.value),function(e,t){const n=e.lastArray;if(n&&!v(t))return n.forEach((({tag:e})=>e.destroy())),delete e.lastArray,1;const r=e,o=r.tag;if(o){const n=m(t);return m(e.value)&&n?!function(e,t){return!(e.strings.length!==t.strings.length||!e.strings.every(((e,n)=>t.strings[n]===e))||e.values.length!==t.values.length)}(t,o)&&(ue(o,r),2):!h(t)&&(ue(o,r),3)}const s=e,i="lastValue"in s,a=s.lastValue;i&&a!==t&&function(e,t){const n=t.clone,r=n.parentNode;if(n===e)throw"ok";r.insertBefore(e,n),r.removeChild(n),delete t.clone,delete t.lastValue}(s.template,s)}(e,t),d)return function(e,t,n,r){let o=n.tag;if(!o)return le(t,n,e),void t.redraw();const s=o.tagSupport.templater.wrapper,a=t.wrapper;let l=!1;s&&a&&(l=s.original===a.original);const u=t.tagSupport.propsConfig.latest,d=o.tagSupport;if(d.propsConfig.latest=u,l){const e=r?.tagSupport;let n=e.props;if(m(e.props)||(n=i(e.props)),o&&!c(d,t.tagSupport))return}else ue(o,n);le(t,n,e),d.templater=t;const p=t.redraw();o.isLikeTag(p)||(o.destroy(),n.tagSupport=p.tagSupport,n.tag=p,d.oldest=p),d.newest=p,d.propsConfig={...t.tagSupport.propsConfig}}(n,t,l,r);const p=l.tag;if(p)!function(e,t,n,r){const i=e.tagSupport.templater.wrapper,a=n?.wrapper,l=i&&a&&i?.original===a?.original,u=n&&e.lastTemplateString===n.lastTemplateString,c=n&&n.getTemplate&&e.isLikeTag(n);u||c?ee(n,t,t.template,r,{counts:{added:0,removed:0}}):l?function(e,t,n){const r=t.tagSupport,i=r.oldest;r.newest,s(i.tagSupport,i);const a=e.wrapper();e.newest=a,r.newest=a,o(i.tagSupport,i),t.updateByTag(a),n.set(e)}(n,e,t):Q(n,t,t.template)}(p,e,t,n);else if(v(t)){const r=X(e,t,a.template||l.tag?.tagSupport.templater.insertBefore,n,{counts:{added:0,removed:0}});n.clones.push(...r)}else t instanceof Function?l.set(E(t,n)):b(t)?l.set(t.value):l.set(t)}(e[r],l,this);!function(e,t,n,r,o){if(h(t))le(t,n[r]=new k(t),o);else if(t instanceof Function)n[r]=function(e,t){return new k(E(e,t))}(t,o);else if(e)m(t)?(t.ownerTag=o,o.children.push(t),n[r]=new k(t)):b(t)?n[r]=t:n[r]=new k(t)}(a,l,e,r,this)})),e}getAppElement(){let e=this;for(;e.ownerTag;)e=e.ownerTag;return e}rebuild(){const e=this.tagSupport.templater.insertBefore;if(!e){const e=new Error("Cannot rebuild. Previous insertBefore element is not defined on tag");throw e.tag=this,e}this.buildBeforeElement(e,{forceElement:!0,counts:{added:0,removed:0}})}buildBeforeElement(e,t={forceElement:!1,counts:{added:0,removed:0}}){this.tagSupport.templater.insertBefore=e;const n=this.update(),r=this.getTemplate(),o=document.createElement("div");o.id="tag-temp-holder",o.innerHTML=`<template id="temp-template-tag-wrap">${r.string}</template>`;const s=ie(o,n,r,this,{forceElement:t.forceElement,counts:t.counts});this.clones.length=0;const i=function(e,t){const n=[];let r=e.children[0].content.firstChild;for(;r;){const e=r.nextSibling;V(r,t),n.push(r),r=e}return n}(o,e);return this.clones.push(...i),s.length&&(this.clones=this.clones.filter((e=>!s.find((t=>t===e))))),this.clones.forEach((e=>ne(e,t))),this.clones}}function me(e,...t){return new he(e,t)}function be(e,t){return n=>(t.callback=n||(t=>[e,e=t]),e)}n.memory.stateConfig={array:[],rearray:[]};const ve=[];function ye(e){const t=e.callback;if(!t)return e.defaultValue;const n=t($e),[r]=n,[o]=t(r);if(o!==$e){const s='State property not used correctly. Second item in array is not setting value as expected.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n'+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(s,{state:e,callback:t,oldState:n,oldValue:r,checkValue:o}),new Error(s)}return r}n({beforeRender:e=>we(e),beforeRedraw:e=>we(e),afterRender:e=>{const t=e.memory.state,r=n.memory.stateConfig;if(r.rearray.length&&r.rearray.length!==r.array.length){const t=`States lengths mismatched ${r.rearray.length} !== ${r.array.length}`;throw new K(t,{oldStates:r.array,newStates:r.rearray,component:e.templater?.wrapper.original})}r.rearray=[],t.newest=[...r.array],r.array=[],ve.forEach((e=>e())),ve.length=0}});class $e{}function we(e){const t=e.memory.state,r=n.memory.stateConfig;if(r.rearray.length){const n="last array not cleared";throw console.error(n,{config:r,component:e.templater?.wrapper.original,state:t,expectedClearArray:r.rearray}),new K(n,{config:r,component:e.templater?.wrapper.original,state:t,expectedClearArray:r.rearray})}r.rearray=[],t?.newest.length&&r.rearray.push(...t.newest)}function Se(e){const t=n.memory.stateConfig;let r;const o=t.rearray[t.array.length];if(o){let e=ye(o);r=t=>[e,e=t];const n={callback:r,lastValue:e,defaultValue:o.defaultValue};return t.array.push(n),e}let s=(e instanceof Function?e:()=>e)();r=e=>[s,s=e];const i={callback:r,lastValue:s,defaultValue:s};return t.array.push(i),s}function Te(e){const t=n.memory.stateConfig;let r;const o=t.rearray[t.array.length];if(o){let e=ye(o);r=t=>[e,e=t];const n={callback:r,lastValue:e,defaultValue:o.defaultValue};return t.array.push(n),be(e,n)}let s=(e instanceof Function?e:()=>e)();r=e=>[s,s=e];const i={callback:r,lastValue:s,defaultValue:s};return t.array.push(i),be(s,i)}function xe(e){return n.memory.providerConfig.providers.find((t=>t.constructMethod===e))}n.memory.providerConfig={providers:[],ownerTag:void 0};const Ce=e=>{const t=xe(e);if(t)return t.clone=i(t.instance),t.instance;const r=e.constructor?new e:e();return n.memory.providerConfig.providers.push({constructMethod:e,instance:r,clone:i(r)}),r},ke=e=>{const t=xe(e);if(t)return t.instance;const r=n.memory.providerConfig;let o={ownerTag:r.ownerTag};for(;o.ownerTag;){const t=o.ownerTag.tagSupport.memory.providers.find((t=>{if(t.constructMethod===e)return!0}));if(t)return t.clone=i(t.instance),r.providers.push(t),t.instance;o=o.ownerTag}const s=`Could not inject provider: ${e.name} ${e}`;throw console.warn(`${s}. Available providers`,r.providers),new Error(s)};function Ee(e,t){const r=n.memory.providerConfig;r.ownerTag=t,e.memory.providers.length&&(r.providers.length=0,r.providers.push(...e.memory.providers))}function Ae(e){n.memory.initCurrentSupport=e}function Be(e){n.memory.initCurrentSupport.memory.init||(n.memory.initCurrentSupport.memory.init=e,e())}let je;function Ne(e){je.memory.destroyCallback=e}n({beforeRender:(e,t)=>{Ee(e,t)},beforeRedraw:(e,t)=>{Ee(e,t.ownerTag)},afterRender:e=>{const t=n.memory.providerConfig;e.memory.providers=[...t.providers],t.providers.length=0}}),n({beforeRender:e=>Ae(e),beforeRedraw:e=>Ae(e)}),n({beforeRender:e=>je=e,beforeRedraw:e=>je=e,beforeDestroy:(e,t)=>{const n=e.memory.destroyCallback;n&&n()}});let Ve=()=>e=>()=>{throw new Error("The real callback function was called and that should never occur")};function De(e,t){e.forEach(((e,n)=>{const r=ye(e),o=t[n].callback;o&&o(r),t[n].lastValue=r}))}function Pe(e){Ve=()=>{const t=n.memory.stateConfig.array;return n=>(...r)=>function(e,t,n,...r){const o=e.memory.state.newest;De(o,n);const s=t(...r);De(n,o),e.render(),s instanceof Promise&&s.finally((()=>{De(n,o),e.render()}))}(e,n,t,...r)}}n({beforeRender:e=>Pe(e),beforeRedraw:e=>Pe(e)});const Re={tagElement:function(e,t,n){const s=f.findIndex((e=>e.element===t));s>=0&&(f[s].tag.destroy(),f.splice(s,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const i=function(e){const t=e.tagSupport;r(t,void 0);const n=e.wrapper();return o(t,n),{tag:n,tagSupport:t}}(e(n)),{tag:a,tagSupport:l}=i;a.appElement=t,a.tagSupport.oldest=a,function(e,t){e.templater.redraw=()=>{const n=t,{retag:r}=e.templater.renderWithSupport(e,n,{});return t.updateByTag(r),r},e.mutatingRender=()=>(g(t,e.templater,e),t)}(a.tagSupport,a);const u=document.createElement("template");return u.setAttribute("id","app-tag-"+f.length),u.setAttribute("app-tag-detail",f.length.toString()),t.appendChild(u),a.buildBeforeElement(u),t.setUse=e.original.setUse,f.push({element:t,tag:a}),{tag:a,tags:e.original.tags}},redrawTag:function(e,t,n,r){return t.renderWithSupport(e,n,r)}},Oe=N((()=>{let e=Te("a")((t=>[e,e=t])),t=Te(!0)((e=>[t,t=e]));return me`
    <input onchange=${t=>e=t.target.value} placeholder="a b or c" />
    <select id="select-sample-drop-down">
      ${["a","b","c"].map((t=>me`
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
  `})),He=N((()=>{let e=Te(0)((t=>[e,e=t]));return++e,me`
    <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
    <!--proof you cannot see false values -->
    <div style="font-size:0.8em">You should see "" here => "${!1}"</div>
    <div style="font-size:0.8em">You should see "" here => "${null}"</div>
    <div style="font-size:0.8em">You should see "" here => "${void 0}"</div>
    <!--proof you can see true booleans -->
    <div style="font-size:0.8em">You should see "true" here => "${!0}"</div>
    <!--proof you can try to use the tagVar syntax -->
    <div style="font-size:0.8em">You should see "${"{"}22${"}"}" here => "{22}"</div>
    <div style="font-size:0.8em">You should see "${"{"}__tagVar0${"}"}" here => "{__tagVar0}"</div>
    <div style="font-size:0.8em">should be a safe string no html "&lt;div&gt;hello&lt;/div&gt;" here => "${"<div>hello</div>"}"</div>
    (render count ${e})
  `})),Fe=N((()=>{let e=Te(!0)((t=>[e,e=t]));return me`
    <div style="max-height: 800px;overflow-y: scroll;">
      <table cellPadding=${5} cellSpacing=${5} border="1">
        <thead style="position: sticky;top: 0;">
          <tr>
            <th>hello</th>
            <th>hello</th>
            ${e&&me`
              <td>hello 2 thead cell</td>
            `}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>world</td>
            <td>world</td>
            ${e&&me`
              <td>world 2 tbody cell</td>
            `}
          </tr>
        </tbody>
      </table>
    </div>
  `})),Ie=N((({renderCount:e,name:t})=>me`<div><small>(${t} render count ${e})</small></div>`)),_e=N((()=>{let e=Te(0)((t=>[e,e=t])),t=Te({test:33,x:"y"})((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));return++e,me`
    <textarea wrap="off" onchange=${function(e){return t=JSON.parse(e.target.value),t}} style="height:200px;font-size:0.6em;width:100%"
    >${JSON.stringify(t,null,2)}</textarea>
    <pre>${JSON.stringify(t,null,2)}</pre>
    
    <div><small>(renderCount:${e})</small></div>
    
    <div>
      <button id="propsDebug-🥩-0-button" onclick=${()=>++n}>🥩 propNumber ${n}</button>
      <span id="propsDebug-🥩-0-display">${n}</span>
    </div>
    
    <fieldset>
      <legend>child</legend>
      ${Je({propNumber:n,propsJson:t,propNumberChange:e=>{n=e}})}
    </fieldset>
    ${Ie({renderCount:e,name:"propsDebugMain"})}
  `})),Je=N((({propNumber:e,propsJson:t,propNumberChange:r})=>{let o=Te(0)((e=>[o,o=e])),s=Te(0)((e=>[s,s=e]));!function(e){const t=n.memory.stateConfig,[r]=e(void 0);e(r);const o=t.rearray[t.array.length];if(o){let n=o.watch,s=ye(o);const i={callback:e,lastValue:s,watch:o.watch};return r!=n&&(i.watch=r,s=i.lastValue=r),t.array.push(i),e(s),s}const s={callback:e,lastValue:r,watch:r};t.array.push(s)}((t=>[e,e=t]));const i=function(e,t){let n=Te(void 0)((e=>[n,n=e]));return void 0===n?(t(),n=e,e):(e.every(((e,t)=>e===n[t]))||(t(),n=e),e)}([e],(()=>{++s}));return++o,me`<!--propsDebug.js-->
    <h3>Props Json</h3>
    <textarea style="font-size:0.6em;height:200px;width:100%" wrap="off" onchange=${function(e){const n=JSON.parse(e.target.value);Object.assign(t,n)}}>${JSON.stringify(t,null,2)}</textarea>
    <pre>${JSON.stringify(t,null,2)}</pre>
    <hr />
    <h3>Props Number</h3>
    
    <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled>${JSON.stringify(i,null,2)}</textarea>
    
    <div>
      <button id="propsDebug-🥩-1-button" onclick=${()=>r(++e)}
      >🥩 propNumber ${e}</button>
      <span id="propsDebug-🥩-1-display">${e}</span>
    </div>
    <button
      title="test of increasing render count and nothing else"
      onclick=${()=>++o}
    >renderCount ${o}</button>
    
    <button onclick=${()=>++e}
      title="only changes number locally but if change by parent than that is the number"
    >local set propNumber ${e}</button>
    
    <div><small>(propNumberChangeCount:${s})</small></div>
    
    <hr />
    <h3>Fn update test</h3>
    ${We({propNumber:e,callback:()=>{++e}})}
    
    ${Ie({renderCount:o,name:"propsDebug"})}
  `})),We=N((({propNumber:e,callback:t})=>{let n=Te(0)((e=>[n,n=e]));return++n,me`
    <button
      title="the count here and within parent increases but not in parent parent"
      onclick=${t}
    >local & 1-parent increase ${e}</button>
    ${Ie({renderCount:n,name:"propFnUpdateTest"})}
  `})),ze=async({target:e,stagger:t})=>{e.style.opacity=0,t&&await Me(300*t),e.style.opacity=1,e.classList.add("animate__animated","animate__fadeInDown")},Le=async({target:e,stagger:t,capturePosition:n=!0})=>{n&&function(e){e.style.zIndex=e.style.zIndex||1;const t=e.offsetTop+"px",n=e.offsetLeft+"px",r=e.clientWidth+(e.offsetWidth-e.clientWidth)+1+"px",o=e.clientHeight+(e.offsetHeight-e.clientHeight)+1+"px";setTimeout((()=>{e.style.top=t,e.style.left=n,e.style.width=r,e.style.height=o,e.style.position="fixed"}),0)}(e),t&&await Me(300*t),e.classList.add("animate__animated","animate__fadeOutUp"),await Me(1e3),e.classList.remove("animate__animated","animate__fadeOutUp")};function Me(e){return new Promise((t=>{setTimeout(t,e)}))}const Ue=N((function(){const e=Se([]);let t=Te(0)((e=>[t,t=e]));const n=()=>({name:"Person "+e.length,scores:"0,".repeat(4).split(",").map(((e,t)=>({frame:t+1,score:Math.floor(4*Math.random())+1})))});return++t,me`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${e.map(((t,r)=>me`
        <div oninit=${ze} ondestroy=${Le} style="background-color:black;">
          <div>
            name:${t.name}
          </div>
          <div>
            index:${r}
          </div>
          
          <div>scores:${t.scores.map(((e,t)=>me`
            <div style="border:1px solid white;"
              oninit=${ze} ondestroy=${Le}
            >
              ${qe({score:e,playerIndex:t})}-
              <button id=${`score-data-${t}-${e.frame}-outside`} onclick=${()=>++e.score}>${e.score}</button>
            </div>
          `.key(e)))}</div>
          
          <button onclick=${()=>{e.splice(r,1)}}>remove</button>
          <button onclick=${()=>{e.splice(r,0,n())}}>add before</button>
        </div>
      `.key(t)))}
    </div>

    <button id="array-test-push-item" onclick=${()=>{e.push(n())}}>push item ${e.length+1}</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n())}}>push 3 items</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n())}}>push 9 items</button>

    ${e.length>0&&me`
      <button oninit=${ze} ondestroy=${Le} onclick=${()=>{e.length=0}}>remove all</button>
    `}

    ${Ie({renderCount:t,name:"arrayTests.ts"})}
  `})),qe=N((({score:e,playerIndex:t})=>{let n=Te(0)((e=>[n,n=e]));return++n,me`
    frame:${e.frame}:
    <button
      id=${`score-data-${t}-${e.frame}-inside`}
      onclick=${()=>++e.score}
    >${e.score}</button>
    <button onclick=${()=>++n}>increase renderCount</button>
    ${Ie({renderCount:n,name:"scoreData"+e.frame})}
  `})),Ye=3e3,Ke=6e3,Xe=N((()=>{let e=Te(0)((t=>[e,e=t])),t=Te(void 0)((e=>[t,t=e])),n=Te(void 0)((e=>[n,n=e])),r=Te(0)((e=>[r,r=e])),o=Te(0)((e=>[o,o=e]));const s=Ve(),i=()=>++e;console.log("intervalId",t);const a=()=>{console.info("interval test 0 started..."),o=0,n=setInterval(s((()=>{o+=500,o>=Ye&&(o=0,console.log("interval tick"))})),500),console.log("▶️ interval started"),t=setInterval(s((()=>{i()})),Ye)},l=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🛑 interval test 0 stopped")};return Be(a),Ne(l),++r,me`<!--intervalDebug.js-->
    <div>interval type 1 at ${Ye}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${r}</button>
    <input type="range" min="0" max=${Ye} step="1" value=${o} />
    <div>
      --${o}--
    </div>
    <button type="button" onclick=${()=>{t||n?l():a()}}
      style.background-color=${t||n?"red":"green"}
    >start/stop</button>
    <button type="button" onclick=${()=>setTimeout(s((()=>{o+=200})),1e3)}>delay increase currentTime</button>
  `})),Ge=N((()=>{let e=Te(0)((t=>[e,e=t])),t=Te(void 0)((e=>[t,t=e])),n=Te(void 0)((e=>[n,n=e])),r=Te(0)((e=>[r,r=e])),o=Te(0)((e=>[o,o=e]));const s=Ve(),i=()=>++e;function a(){if(t)return clearInterval(t),clearInterval(n),t=void 0,n=void 0,void console.info("interval 1 stopped");console.info("interval test 1 started..."),o=0,n=setInterval(s((()=>{o+=500,o>=Ke&&(o=0)})),500),t=setInterval(s((()=>{i(),console.info("slow interval ran")})),Ke)}return Be(a),Ne(a),++r,me`
    <div>interval type 2 with ${Ke}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${r}</button>
    <input type="range" min="0" max=${Ke} step="1" value=${o} />
    <div>
      --${o}--
    </div>
    <button type="button" onclick=${a}
      style.background-color=${t?"red":"green"}
    >start/stop</button>
  `}));function Qe(){return{upper:Ce(Ze),test:0}}function Ze(){return{name:"upperTagDebugProvider",test:0}}const et=N((()=>{let e=Te("tagJsDebug.js")((t=>[e,e=t])),t=Te(!1)((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));return++n,me`<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${Ie({renderCount:n,name:"tagJsDebug"})}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <fieldset style="flex:2 2 20em">
        <legend>arrays</legend>
        ${Ue()}
      </fieldset>
    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${()=>t=!t}
        >hide/show</button>

        ${t&&me`
          <div oninit=${ze} ondestroy=${Le}>
            <div>${Xe()}</div>
            <hr />
            <div>${Ge()}</div>
          </div>
        `}
      </fieldset>

      <fieldset id="props-debug" style="flex:2 2 20em">
        <legend>Props Debug</legend>
        ${_e()}
      </fieldset>
    </div>
  `})),tt=N((()=>{let e=Te(null)((t=>[e,e=t])),t=Te(0)((e=>[t,t=e])),n="select tag below";switch(e){case"1":n=rt({title:"value switch"});break;case"2":n=ot({title:"value switch"});break;case"3":n=st({title:"value switch"})}let r=me`<div id="select-tag-above">select tag above</div>`;switch(e){case"1":r=rt({title:"tag switch"});break;case"2":r=ot({title:"tag switch"});break;case"3":r=st({title:"tag switch"})}return++t,me`
    <div>
      selectedTag: ${e}
    </div>
    
    <select id="tag-switch-dropdown" onchange=${function(t){e=t.target.value,"undefined"===e&&(e=void 0)}}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="undefined" ${void 0===e?{selected:!0}:{}}>undefined</option>
	    <option value="1" ${"1"===e?{selected:!0}:{}}>tag 1</option>
	    <option value="2" ${"2"===e?{selected:!0}:{}}>tag 2</option>
	    <option value="3" ${"3"===e?{selected:!0}:{}}>tag 3</option>
    </select>

    <div style="display:flex;gap:1em;">
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 1 - string | Tag</h3>
        <div>${n}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 2 - Tag</h3>
        <div>${r}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3 - ternary (only 1 or 3 shows)</h3>
        <div>${"3"===e?st({title:"ternary simple"}):rt({title:"ternary simple"})}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${nt({selectedTag:e})}</div>
      </div>
      
      <div style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div>${it({selectedTag:e})}</div>
      </div>
    </div>
    ${!1}
  `})),nt=N((({selectedTag:e})=>me`
  <div>${"3"===e?st({title:"ternaryPropTest"}):rt({title:"ternaryPropTest"})}</div>
  `)),rt=N((({title:e})=>{let t=Te(0)((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));return++n,me`
    <div style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Ie({renderCount:n,name:"tag1"})}
    </div>
  `})),ot=N((({title:e})=>{let t=Te(0)((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));return++n,me`
    <div style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Ie({renderCount:n,name:"tag1"})}
    </div>
  `})),st=N((({title:e})=>{let t=Te(0)((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));return++n,me`
    <div style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Ie({renderCount:n,name:"tag1"})}
    </div>
  `})),it=N((({selectedTag:e})=>{switch(e){case void 0:return me`its an undefined value`;case"1":return me`${["a"].map((t=>me`${rt({title:`array ${e} ${t}`})}`.key(t)))}`;case"2":return me`${["b","c"].map((t=>me`${ot({title:`array ${e} ${t}`})}`.key(t)))}`;case"3":return me`${["d","e","f"].map((t=>me`${st({title:`array ${e} ${t}`})}`.key(t)))}`}return me`nothing to show for in arrays`})),at=N(((e,t)=>{let n=Te(0)((e=>[n,n=e])),r=Te(0)((e=>[r,r=e]));return++n,me`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div>${t}</div>
      <div>isSubjectInstance:${b(t)}</div>
      <div>isSubjectTagArray:${v(t.value)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${()=>++r}>increase innerHtmlTest ${r}</button>
      <span id="innerHtmlTest-counter-display">${r}</span>
      ${Ie({renderCount:n,name:"innerHtmlTest"})}
    </fieldset>
  `})),lt=N(((e,t)=>{let n=Te(0)((e=>[n,n=e])),r=Te(0)((e=>[r,r=e]));return++n,me`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${e}</legend>
      ${t}
      <button id="innerHtmlPropsTest-button" onclick=${()=>++r}
      >increase innerHtmlPropsTest ${r}</button>
      <span id="innerHtmlPropsTest-display">${r}</span>
      ${!1}
    </fieldset>
  `})),ut=(N((({legend:e,id:t},n)=>{let r=Te(0)((e=>[r,r=e])),o=Te(0)((e=>[o,o=e]));return++r,me`
    <fieldset id=${t} style="flex:2 2 20em">
      <legend>${e}</legend>
      ${n}
      <hr />
      <button onclick=${()=>++o}>increase childContentTest ${o}</button>
      ${Ie({renderCount:r,name:"childContentTest"})}
    </fieldset>
  `})),N((()=>{let e=Te(0)((t=>[e,e=t])),t=Te(0)((e=>[t,t=e]));return++e,me`
    <fieldset id="children-test" style="flex:2 2 20em">
      <legend>childTests</legend>
      
      ${!1}
      
      ${at({},me`
        <b>Field set body A</b>
        <hr />
        <button id="innerHtmlTest-childTests-button"
          onclick=${()=>++t}
        >increase childTests inside ${t}:${e}</button>
        <span id="innerHtmlTest-childTests-display">${t}</span>
        ${Ie({renderCount:e,name:"childTests"})}
      `)}

      ${lt(22,me`
        <b>Field set body B</b>
        <hr />
        <button id="innerHtmlPropsTest-childTests-button"
          onclick=${()=>++t}
        >increase childTests inside 22 ${t}</button>
        <span id="innerHtmlPropsTest-childTests-display">${t}</span>
        ${Ie({renderCount:e,name:"innerHtmlPropsTest child"})}
      `)}

      ${!1}
      
      <hr />
      <button id="childTests-button"
        onclick=${()=>++t}
      >increase childTests outside ${t} - ${e}</button>
      <span id="childTests-display">${t}</span>
      ${Ie({renderCount:e,name:"childTests"})}
    </fieldset>
  `}))),ct=[],dt=[];function pt(e,t){dt.push((()=>{console.debug(e),t()}))}function gt(e){e.forEach((e=>e()))}function ft(e){return{toBeDefined:()=>{if(null!=e)return;const t=`Expected ${JSON.stringify(e)} to be defined`;throw console.error(t,{expected:e}),new Error(t)},toBe:(t,n)=>{if(e===t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be ${typeof t} ${JSON.stringify(t)}`;throw console.error(r,{received:t,expected:e}),new Error(r)}}}function ht(e){return document.querySelectorAll(e).length}function mt([e,t],[n,r]){const o=document.querySelectorAll(t)[0].innerText;bt(e,t);let s=document.querySelectorAll(r)[0],i=s.innerText;const a=(Number(o)+2).toString();ft(i).toBe(a,`Expected second increase provider to be increased to ${o} but got ${i}`),bt(n,r),s=document.querySelectorAll(r)[0],i=s.innerText,ft(i).toBe((Number(o)+4).toString(),`Expected ${r} innerText to be ${Number(o)+4} but instead it is ${i}`)}function bt(e,t,{elementCountExpected:n}={elementCountExpected:1}){const r=document.querySelectorAll(e),o=document.querySelectorAll(t);ft(r.length).toBe(n,`Expected ${e} to be ${n} elements but is instead ${r.length}`),ft(o.length).toBe(n,`Expected ${t} to be ${n} elements but is instead ${o.length}`),r.forEach(((e,n)=>{const r=o[n];let s=Number(r?.innerText);e?.click();let i=s+1;s=Number(r?.innerText),ft(i).toBe(s,`Expected element(s) ${t} to be value ${i} but is instead ${s}`),e?.click(),s=Number(r?.innerText),++i,ft(i).toBe(s,`Expected element(s) ${t} to increase value to ${i} but is instead ${s}`)}))}function vt(e,t,n){const r=ht(e);n=n||`Expected ${t} elements to match query ${e} but found ${r}`,ft(r).toBe(t,n)}pt.only=(e,t)=>{ct.push((()=>{console.debug(e),t()}))};const yt=N((function(){let e=Te(0)((t=>[e,e=t])),t=Te(0)((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));return Be((()=>{++n,console.info("tagJsDebug.js: 👉 i should only ever run once")})),++t,me`<!--counters-->
    <div>Subscriptions:${T.globalSubCount$}</div>
    <div>initCounter:${n}</div>
    <button id="increase-counter" onclick=${()=>{++e}}>counter:${e}</button>
    <span id="counter-display">${e}</span>
    <button onclick=${()=>console.info("subs",T.globalSubs)}>log subs</button>
    ${Ie({renderCount:t,name:"counters"})}
  `}));class $t{tagDebug=0}const wt=N((()=>{const e=Ce(Qe),t=Ce($t);Te("props debug base");let n=Te(0)((e=>[n,n=e])),r=Te(0)((e=>[r,r=e]));return++r,me`
    <div>
      <strong>testValue</strong>:${e.test}
    </div>
    <div>
      <strong>upperTest</strong>:${e.upper?.test||"?"}
    </div>
    <div>
      <strong>providerClass</strong>:${t.tagDebug||"?"}
    </div>

    <div style="display:flex;gap:1em">
      <button id="increase-provider-🍌-0-button" onclick=${()=>++e.test}
      >🍌 increase provider.test ${e.test}</button>
      <span id="increase-provider-🍌-0-display">${e.test}</span>
      
      <button id="increase-provider-upper-🌹-0-button" onclick=${()=>++e.upper.test}
      >🌹 increase upper.provider.test ${e.upper.test}</button>
      
      <span id="increase-provider-upper-🌹-0-display">${e.upper.test}</span>
      <button id="increase-provider-🍀-0-button" onclick=${()=>++t.tagDebug}
      >🍀 increase provider class ${t.tagDebug}</button>
      <span id="increase-provider-🍀-0-display">${t.tagDebug}</span>

      <button id="increase-prop-🐷-0-button" onclick=${()=>++n}
      >🐷 increase propCounter ${n}</button>
      <span id="increase-prop-🐷-0-display">${n}</span>
    </div>

    <hr />
    ${St({propCounter:n,propCounterChange:e=>{n=e}})}
    <hr />
    renderCount outer:${r}
    ${Ie({renderCount:r,name:"providerDebugBase"})}
  `})),St=N((({propCounter:e,propCounterChange:t})=>{const n=ke(Qe),r=ke(Ze),o=ke($t);Se("provider debug inner test");let s=Te(!1)((e=>[s,s=e])),i=Te(0)((e=>[i,i=e]));return++i,me`<!--providerDebug.js-->
    <button id="increase-provider-🍌-1-button" onclick=${()=>++n.test}
    >🍌 increase provider.test ${n.test}</button>
    <span id="increase-provider-🍌-1-display">${n.test}</span>
    
    <button id="increase-provider-upper-🌹-1-button" onclick=${()=>++r.test}
    >🌹 increase upper.provider.test ${r.test}</button>
        
    <span id="increase-provider-upper-🌹-1-display">${r.test}</span>
    <button id="increase-provider-🍀-1-button" onclick=${()=>++o.tagDebug}
    >🍀 increase provider class ${o.tagDebug}</button>
    <span id="increase-provider-🍀-1-display">${o.tagDebug}</span>

    <div>
      <button id="increase-prop-🐷-1-button" onclick=${()=>t(++e)}
      >🐷 increase propCounter ${e}</button>
      <span id="increase-prop-🐷-1-display">${e}</span>
    </div>

    <button onclick=${()=>s=!s}
    >${s?"hide":"show"} provider as props</button>
    
    ${s&&me`
      <div oninit=${ze} ondestroy=${Le}>
        <hr />
        <h3>Provider as Props</h3>
        ${Tt(o)}
      </div>
    `}

    <hr />
    renderCount inner:${i}
    ${Ie({renderCount:i,name:"providerDebugInner"})}
  `})),Tt=N((e=>me`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(e,null,2)}</textarea>
  `)),xt=N((()=>{console.log("render app.js");let e=Te("app first state")((t=>[e,e=t])),t=Te(!1)((e=>[t,t=e])),n=Te(0)((e=>[n,n=e]));function r(e=!0){setTimeout((()=>{const t=function(){pt("elements exists",(()=>{ft(document.getElementById("h1-app")).toBeDefined();const e=document.getElementById("toggle-test");ft(e).toBeDefined(),ft(e?.innerText).toBe("toggle test"),e?.click(),ft(e?.innerText).toBe("toggle test true"),e?.click(),ft(e?.innerText).toBe("toggle test")})),pt("counters increase",(()=>{bt("#increase-counter","#counter-display"),bt("#innerHtmlTest-counter-button","#innerHtmlTest-counter-display"),bt("#innerHtmlPropsTest-button","#innerHtmlPropsTest-display")})),pt("testDuelCounterElements",(()=>{mt(["#childTests-button","#childTests-display"],["#innerHtmlPropsTest-childTests-button","#innerHtmlPropsTest-childTests-display"]),mt(["#childTests-button","#childTests-display"],["#innerHtmlTest-childTests-button","#innerHtmlTest-childTests-display"]),mt(["#increase-provider-🍌-0-button","#increase-provider-🍌-0-display"],["#increase-provider-🍌-1-button","#increase-provider-🍌-1-display"]),mt(["#increase-provider-upper-🌹-0-button","#increase-provider-upper-🌹-0-display"],["#increase-provider-upper-🌹-1-button","#increase-provider-upper-🌹-1-display"]),mt(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"]),mt(["#propsDebug-🥩-0-button","#propsDebug-🥩-0-display"],["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"])})),pt("provider debug",(()=>{mt(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"])})),pt("tagSwitching",(()=>{ft(ht("#select-tag-above")).toBe(1,"Expected select-tag-above element to be defined"),ft(ht("#tag-switch-dropdown")).toBe(1,"Expected one #tag-switch-dropdown"),ft(ht("#tagSwitch-1-hello")).toBe(2,"Expected two #tagSwitch-1-hello elements"),ft(ht("#tagSwitch-2-hello")).toBe(0),ft(ht("#tagSwitch-3-hello")).toBe(0);const e=document.getElementById("tag-switch-dropdown");e.value="1",e.onchange({target:e}),vt("#tagSwitch-1-hello",5),ft(ht("#tagSwitch-2-hello")).toBe(0),ft(ht("#tagSwitch-3-hello")).toBe(0),ft(ht("#select-tag-above")).toBe(0),e.value="2",e.onchange({target:e}),vt("#tagSwitch-1-hello",2),vt("#tagSwitch-2-hello",4),ft(ht("#tagSwitch-3-hello")).toBe(0),ft(ht("#select-tag-above")).toBe(0),e.value="3",e.onchange({target:e}),ft(ht("#tagSwitch-1-hello")).toBe(0,"Expected no hello 1s"),ft(ht("#tagSwitch-2-hello")).toBe(0),vt("#tagSwitch-3-hello",7),ft(ht("#select-tag-above")).toBe(0),e.value="",e.onchange({target:e}),vt("#select-tag-above",1),vt("#tag-switch-dropdown",1),vt("#tagSwitch-1-hello",2),vt("#tagSwitch-2-hello",0),vt("#tagSwitch-3-hello",0)})),pt("array testing",(()=>{ft(ht("#array-test-push-item")).toBe(1),ft(ht("#score-data-0-1-inside")).toBe(0),ft(ht("#score-data-0-1-outside")).toBe(0),document.getElementById("array-test-push-item")?.click(),ft(ht("#score-data-0-1-inside")).toBe(1),ft(ht("#score-data-0-1-outside")).toBe(1);const e=document.getElementById("score-data-0-1-inside");let t=e?.innerText;const n=document.getElementById("score-data-0-1-outside"),r=n?.innerText;ft(t).toBe(r),e?.click(),ft(e?.innerText).toBe(n?.innerText),ft(t).toBe((Number(e?.innerText)-1).toString()),ft(t).toBe((Number(n?.innerText)-1).toString()),n?.click(),ft(e?.innerText).toBe(n?.innerText),ft(t).toBe((Number(e?.innerText)-2).toString()),ft(t).toBe((Number(n?.innerText)-2).toString())}));try{return ct.length?gt(ct):gt(dt),console.info("✅ all tests passed"),!0}catch(e){return console.error("❌ tests failed: "+e.message,e),!1}}();e&&(t?alert("✅ all tests passed"):alert("❌ tests failed. See console for more details"))}),3e3)}return++n,Be((()=>{r(!1)})),me`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${4}</h1>

    <button id="toggle-test" onclick=${()=>{t=!t}}>toggle test ${t}</button>
    <button onclick=${r}>run test</button>

    ${Ie({name:"app",renderCount:n})}

    <div id="tagDebug-fx-wrap">
      ${et()}

      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${yt()}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${wt()}
        </fieldset>

        ${ut()}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${Oe()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${He()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${tt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${Fe()}
        </fieldset>
      </div>            
    </div>
  `})),Ct=N((()=>(Se("isolated-app-state"),me`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${!1}

        ${!1}

        ${!1}

        <fieldset style="flex:2 2 20em">
          <legend>arrays</legend>
          ${Ue()}
        </fieldset>

        ${!1}

        ${!1}
      </div>
    </div>
  `)));console.log("*** hmr index ***");var kt=t.gV,Et=t.jG,At=t.fm;export{kt as App,Et as IsolatedApp,At as hmr};