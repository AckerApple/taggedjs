var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.d(t,{j:()=>n.IsolatedApp,f:()=>He});var n={};function r(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};r.tagUse.push(t)}function o(e,t){r.tagUse.forEach((n=>n.beforeRender(e,t)))}function s(e,t){r.tagUse.forEach((n=>n.afterRender(e,t)))}function i(e,t){r.tagUse.forEach((n=>n.beforeRedraw(e,t)))}function a(e){return l(e,new WeakMap)}function l(e,t){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,n),Array.isArray(e))for(let r=0;r<e.length;r++)n[r]=l(e[r],t);else for(const r in e)e.hasOwnProperty(r)&&(n[r]=l(e[r],t));return n}function u(e,t){return c(e,t,new WeakMap)}function c(e,t,n){if(e===t||(o=t,(r=e)instanceof Function&&o instanceof Function&&r.toString()===o.toString()))return!0;var r,o;if("object"!=typeof e||"object"!=typeof t||null===e||null===t)return!1;const s=Object.keys(e),i=Object.keys(t);if(s.length!==i.length)return!1;if(n.has(e))return!0;n.set(e,0);for(const r of s)if(!i.includes(r)||!c(e[r],t[r],n))return!1;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!c(e[r],t[r],n))return!1}else if(Array.isArray(e)||Array.isArray(t))return!1;return!0}function d(e,t){if(e===t)throw new Error("someting here");const n=e.propsConfig.latest;if(function(e,t,n){if(void 0===e&&e===n)return!1;let r=e,o=t;if("object"==typeof e){if(!t)return!0;if(r={...e},o={...t||{}},!Object.entries(r).every((([e,t])=>{let n=o[e];return!(t instanceof Function)||n instanceof Function&&(n.original&&(n=n.original),t.original&&(t=t.original),t.toString()===n.toString()&&(delete r[e],delete o[e],!0))})))return!0}return!u(t,e)}(t.propsConfig.latest,e.propsConfig.latestCloned,n))return!0;const r=function(e,t){const n=e.propsConfig.lastClonedKidValues,r=t.propsConfig.lastClonedKidValues,o=n.every(((e,t)=>{const n=r[t];return e.every(((e,t)=>e===n[t]))}));return!o}(e,t);return r}function p(e){e.tagSupport.memory.providers.filter((e=>!u(e.instance,e.clone))).forEach((t=>{!function(e,t){g(e,t).forEach((({tag:e,renderCount:t,provider:n})=>{t===e.tagSupport.memory.renderCount&&(n.clone=a(n.instance),e.tagSupport.render())}))}(e.getAppElement(),t),t.clone=a(t.instance)}))}function g(e,t,n=[]){const r=e.tagSupport.memory.providers.find((e=>e.constructMethod===t.constructMethod));return r&&n.push({tag:e,renderCount:e.tagSupport.memory.renderCount,provider:r}),e.children.forEach((e=>g(e,t,n))),n}function f(e,t,n){const r=n.memory.renderCount;if(p(e),r!==n.memory.renderCount)return!0;const o=d(e.tagSupport,t.tagSupport),s=n.templater;return n.newest=s.redraw(),t.newest=n.newest,!o}e.r(n),e.d(n,{g:()=>kt}),r.tagUse=[],r.memory={};const h=[];function m(e,t,n){const r=h.findIndex((e=>e.element===t));r>=0&&(h[r].tag.destroy(),h.splice(r,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const i=function(e){const t=e.tagSupport;o(t,void 0);const n=e.wrapper();return s(t,n),{tag:n,tagSupport:t}}(e(n)),{tag:a,tagSupport:l}=i;a.appElement=t,a.tagSupport.oldest=a,function(e,t){e.templater.redraw=()=>{const n=t,{retag:r}=e.templater.renderWithSupport(e,n,{});return t.updateByTag(r),r},e.mutatingRender=()=>(f(t,e.templater,e),t)}(a.tagSupport,a);const u=document.createElement("template");return u.setAttribute("id","app-tag-"+h.length),u.setAttribute("app-tag-detail",h.length.toString()),t.appendChild(u),a.buildBeforeElement(u),t.setUse=e.original.setUse,h.push({element:t,tag:a}),{tag:a,tags:e.original.tags}}function b(e){return!0===e?.isTemplater}function v(e){return!0===e?.isTag}function y(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function $(e){return e instanceof Array&&e.every((e=>v(e)))}class w{templater;children;propsConfig;memory={context:{},state:{newest:[]},providers:[],renderCount:0};constructor(e,t,n){this.templater=e,this.children=t;const r=C(n,e);this.propsConfig={latest:n,latestCloned:r,clonedProps:r,lastClonedKidValues:t.value.map((e=>S(e.values)))},v(n)||(this.propsConfig.latestCloned=a(r),this.propsConfig.clonedProps=this.propsConfig.latestCloned)}oldest;newest;mutatingRender(){const e='Tag function "render()" was called in sync but can only be called async';throw console.error(e,{tagSupport:this}),new Error(e)}render(){return++this.memory.renderCount,this.mutatingRender()}}function S(e){return e.map((e=>{const t=e;return v(t)?S(t.values):b(t)?a(t.tagSupport.propsConfig.latestCloned):$(t)?S(t):a(e)}))}class T{tagged;wrapper;insertBefore;newest;oldest;tagSupport;constructor(e,t){this.tagSupport=new w(this,t,e)}redraw;isTemplater=!0;renderWithSupport(e,t,n){++e.memory.renderCount;const a=t?.ownerTag||n;t?(e.propsConfig={...t.tagSupport.propsConfig},i(e,t)):(o(e,a),r.memory.providerConfig.ownerTag=a);const l=this.wrapper();return s(e,l),this.newest=l,l.ownerTag=a,e.newest=l,{remit:!0,retag:l}}}function C(e,t){const n=function(e,t){if("object"!=typeof e)return e;const n=e;return Object.entries(n).forEach((([e,r])=>{if(r instanceof Function){const o=n[e].original;return o?(n[e]=(...e)=>t(r,e),void(n[e].original=o)):(n[e]=(...e)=>t(r,e),void(n[e].original=r))}})),n}(v(e)?0:e,(function(e,n){const r=e(...n),o=t.newest?.ownerTag?.tagSupport;return o&&o.render(),r}));return n}class x{value;isSubject=!0;subscribers=[];constructor(e){this.value=e}subscribe(e){this.subscribers.push(e),E.globalSubs.push(e);const t=E.globalSubCount$;E.globalSubCount$.set(t.value+1);const n=()=>{n.unsubscribe()};return n.unsubscribe=()=>{k(this.subscribers,e),k(E.globalSubs,e),E.globalSubCount$.set(t.value-1),n.unsubscribe=()=>{}},n}set(e){this.value=e,this.subscribers.forEach((t=>{t.value=e,t(e)}))}next=this.set}function k(e,t){const n=e.indexOf(t);-1!==n&&e.splice(n,1)}const E=x;E.globalSubs=[],E.globalSubCount$=new x,E.globalSubCount$.set(0);class A extends x{value;constructor(e){super(e),this.value=e}subscribe(e){const t=super.subscribe(e);return e(this.value),t}}function B(e,t){if(e.isChildOverride)return e;const n=(n,r)=>j(e,t,n,r);return n.tagFunction=e,n}function j(e,t,n,r){const o=t.tagSupport,s=(o&&o.memory.renderCount,e.bind(n)(...r));return o.memory.renderCount,o.render(),s instanceof Promise?s.then((()=>(o.render(),"promise-no-data-ever"))):"no-data-ever"}const N=[];let P=0;function V(e){const t=function(t,n){(v(t)||$(t))&&(n=t,t=void 0);const{childSubject:r,madeSubject:o}=function(e){if(y(e))return{childSubject:e,madeSubject:!1};if($(e))return{childSubject:new A(e),madeSubject:!0};const t=e;return t?(t.arrayValue=0,{childSubject:new A([t]),madeSubject:!0}):{childSubject:new A([]),madeSubject:!0}}(n);r.isChildSubject=!0;const s=new T(t,r);function i(){const e=i.original,t=s.tagSupport,n=s.oldest;let l=t.propsConfig.latest,u=C(l,s);const c=e(u,r);t.mutatingRender===w.prototype.mutatingRender&&(t.oldest=c,t.mutatingRender=()=>{if(f(c,s,t))return c;if(c.ownerTag){const e=c.ownerTag.tagSupport.render();return c.ownerTag.tagSupport.newest=e,c}return c}),c.tagSupport=new w(s,t.children);const d=a(u);return c.tagSupport.propsConfig={latest:l,latestCloned:d,clonedProps:d,lastClonedKidValues:c.tagSupport.propsConfig.lastClonedKidValues},c.tagSupport.memory=t.memory,c.tagSupport.mutatingRender=t.mutatingRender,t.newest=c,t.propsConfig={...c.tagSupport.propsConfig},n&&(n.tagSupport.propsConfig={...c.tagSupport.propsConfig}),o&&r.value.forEach((e=>{e.values.forEach(((t,n)=>{t instanceof Function&&(e.values[n].isChildOverride||(e.values[n]=function(...e){j(t,c.ownerTag,this,e)},e.values[n].isChildOverride=!0))}))})),c}return i.original=e,s.tagged=!0,s.wrapper=i,s};return function(e,t){e.isTag=!0,e.original=t}(t,e),function(e){e.tags=N,e.setUse=r,e.tagIndex=++P}(e),N.push(e),t}function D(e,t){t.parentNode.insertBefore(e,t)}function R(e,t,n){const r=e.split(".");if("style"===r[0]&&(n.style[r[1]]=t),"class"===r[0])return r.shift(),void(t?r.forEach((e=>n.classList.add(e))):r.forEach((e=>n.classList.remove(e))))}function O(e,t,n){e.setAttribute(t,n)}function H(e,t,n){e[t]=n}function I(e,t,n){const r=e.getAttributeNames();"TEXTAREA"!==e.nodeName||r.includes("value")||_("textVarValue",e.getAttribute("textVarValue"),e,t,n,((t,n)=>e.value=n));let o=O;r.forEach((r=>{"INPUT"===e.nodeName&&"value"===r&&(o=H),_(r,e.getAttribute(r),e,t,n,o),o=O}))}function F(e){return e.search(/^(class|style)(\.)/)>=0}function _(e,t,n,r,o,s){if(W(t))return function(e,t,n,r,o,s){return L(e,z(r,t),n,o,s)}(e,t,n,r,o,s);if(W(e)){let t;const i=z(r,e).subscribe((e=>{!function(e,t,n,r,o){if(t&&t!=e&&("string"==typeof t?n.removeAttribute(t):t instanceof Object&&Object.entries(t).forEach((([e])=>n.removeAttribute(e)))),"string"!=typeof e)e instanceof Object&&Object.entries(e).forEach((([e,t])=>L(e,t,n,r,o)));else{if(!e.length)return;L(e,"",n,r,o)}}(e,t,n,o,s),t=e}));return o.cloneSubs.push(i),void n.removeAttribute(e)}return F(e)?R(e,t,n):void 0}new class{};const J=/^\s*{__tagvar/,M=/}\s*$/;function W(e){return e&&e.search(J)>=0&&e.search(M)>=0}function z(e,t){return e[t.replace("{","").split("").reverse().join("").replace("}","").split("").reverse().join("")]}function L(e,t,n,r,o){const s=F(e);if(t instanceof Function){const r=function(...e){return t(n,e)};n[e].action=r}if(y(t)){n.removeAttribute(e);const i=t=>function(e,t,n,r,o){if(e instanceof Function)return t[n]=function(...n){return e(t,n)},void(t[n].tagFunction=e);if(r)return void R(n,e,t);if(e)return void o(t,n,e);void 0===e||!1===e||null===e?t.removeAttribute(n):o(t,n,e)}(t,n,e,s,o),a=t.subscribe(i);r.cloneSubs.push(a)}else o(n,e,t)}const U=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;function q(e,t,n,{counts:r,forceElement:o}){const s=t,i=s.tag;if(i&&!o&&i.isLikeTag(e)){if(t instanceof Function){const e=t(i.tagSupport);return i.updateByTag(e),[]}return i.updateByTag(e),[]}if(!n||!n.parentNode)throw new Error("bad parent already started");const a=e.buildBeforeElement(n,{counts:r,forceElement:o});return s.tag=s.tag||e,a}function Y(e,t,n,s,a){if(!0!==e.tagged){let t=e.wrapper.original.name||e.wrapper.original.constructor?.name;"Function"===t&&(t=void 0);const n=t||e.wrapper.original.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${n}\n\n`)}const l=e;l.insertBefore=n;const u=e.tagSupport;let c=l.newest;return r.memory.providerConfig.ownerTag=s,c&&!a.forceElement||(c?i(u,l.oldest):o(u,s),c=l.renderWithSupport(u,t.tag,s).retag,l.newest=c),s.children.push(c),u.templater=c.tagSupport.templater,q(c,t,n,a)}class K extends Error{details;constructor(e,t,n={}){super(e),this.name=K.name,this.details={...n,errorCode:t}}}class X extends K{constructor(e,t){super(e,"array-no-key-error",t),this.name=X.name}}class G extends K{constructor(e,t){super(e,"state-mismatch-error",t),this.name=G.name}}function Q(e,t,n,r,o){const s=[];e.lastArray=e.lastArray||[],e.template=n;let i=0;e.lastArray=e.lastArray.filter(((n,r)=>{const s=t.length-1<r-i,a=t[r-i],l=a?.arrayValue;return!(s||!Z(l,n.tag.arrayValue))||(e.lastArray[r].tag.destroy({stagger:o.counts.removed,byParent:!1}),++i,++o.counts.removed,!1)}));const a=n||n.clone;return t.forEach(((n,i)=>{const l=e.lastArray[i],u=n.tagSupport||l?.tag.tagSupport;n.tagSupport=u||new w({},new A([])),u?u.newest=n:(n.tagSupport.mutatingRender=()=>(r.tagSupport.render(),n),r.children.push(n)),n.ownerTag=r;const c=n.arrayValue;if(c?.isArrayValueNeverSet){const e={template:n.getTemplate().string,array:t,ownerTagContent:r.lastTemplateString},o="Use html`...`.key(item) instead of html`...` to template an Array";throw console.error(o,e),new X(o,e)}if(e.lastArray.length>i)return Z(l.tag.arrayValue,n.arrayValue)?(n.tagSupport=n.tagSupport||l.tag.tagSupport,l.tag.updateByTag(n),[]):[];const d=function(e,t,n,r,o){n.lastArray.push({tag:t,index:r});const s={added:o.counts.added+r,removed:o.counts.removed},i=e;return t.buildBeforeElement(i,{counts:s,forceElement:o.forceElement})}(a,n,e,i,o);s.push(...d)})),s}function Z(e,t){return e===t||!!(e instanceof Array&&t instanceof Array&&e.length==t.length)&&e.every(((e,n)=>e==t[n]))}function ee(e,t,n){t.template=n;const r=t.clone||n;t.lastValue=e;const o=function(e,t){const n=t.parentNode;void 0!==e&&!1!==e&&null!==e||(e="");const r=document.createTextNode(e);return n.insertBefore(r,t),n.removeChild(t),r}(e,r);return t.clone=o,[]}var te;function ne(e,t,n,r,o){return e.tagSupport||(e.tagSupport=new w({},new A([])),e.tagSupport.mutatingRender=()=>{r.tagSupport.render()},e.tagSupport.oldest=e.tagSupport.oldest||e,r.children.push(e),e.ownerTag=r),t.template=n,q(e,t,n,o)}function re(e,t,n,r,o){const s=[];if(!e.hasAttribute("end"))return s;const i=e.getAttribute("id");if(i?.substring(0,pe.length)!==pe)return s;const a=t[i];let l=o.forceElement;const u=a.subscribe((t=>{a.clone&&(e=a.clone);const{clones:o}=function(e,t,n,r,o){const s=function(e){return b(e)?te.tagComponent:v(e)?te.tag:$(e)?te.tagArray:te.value}(e);switch(s){case te.tag:return{clones:ne(e,t,n,r,o)};case te.tagArray:return{clones:Q(t,e,n,r,o)};case te.tagComponent:return{clones:Y(e,t,n,r,o)}}return{clones:ee(e,t,n)}}(t,a,e,n,{counts:{added:r.added,removed:r.removed},forceElement:l});l&&(l=!1),o.push(...o)}));return n.cloneSubs.push(u),s}function oe(e,t){if(!e.getAttribute)return;let n=t.counts.added;t.forceElement||(n=function(e,t){const n=e.oninit;if(!n)return t.added;const r=n.tagFunction;if(!r)return t.added;const o=r.tagFunction;return o?(o({target:e,stagger:t.added}),++t.added):t.added}(e,t.counts)-n),e.children&&(t.counts.added,t.counts.removed,new Array(...e.children).forEach(((e,n)=>oe(e,{...t,counts:t.counts}))))}!function(e){e.tag="tag",e.tagArray="tag-array",e.tagComponent="tag-component",e.value="value"}(te||(te={}));const se=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');function ie(e,t,n,r,o){if(!o||"TEMPLATE"===e.tagName)return[];const s=r.counts,i=[],a=new Array(...o);return"TEXTAREA"===e.tagName&&ae(e),a.forEach((e=>{const o=re(e,t,n,s,r);"TEXTAREA"===e.tagName&&ae(e),i.push(...o),e.children&&new Array(...e.children).forEach(((e,o)=>{(function(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")})(e)&&re(e,t,n,s,r);const a=ie(e,t,n,r,e.children);i.push(...a)}))})),i}function ae(e){const t=e.value;if(t.search(se)>=0){const n=t.match(/__tagvar(\d{1,4})/),r="{"+(n?n[0]:"")+"}";e.value="",e.setAttribute("textVarValue",r)}}function le(e,t,n,r,o){const s=[],i=n.interpolation,a=e.children[0].content.children;if(i.keys.length){const n=ie(e,t,r,o,a);s.push(...n)}return I(e,t,r),ue(a,t,r),s}function ue(e,t,n){new Array(...e).forEach((e=>{I(e,t,n),e.children&&ue(e.children,t,n)}))}function ce(e,t,n){e.redraw=()=>{const r=t.tag,o=r?.tagSupport||e.tagSupport,{retag:s}=e.renderWithSupport(o,r,n);return t.set(e),s}}function de(e,t){delete t.tag,delete t.tagSupport,e.destroy()}const pe="__tagvar",ge="--"+pe+"--",fe=new RegExp(pe,"g"),he=new RegExp(ge,"g");class me{isArrayValueNeverSet=!0}class be{strings;values;isTag=!0;clones=[];cloneSubs=[];children=[];tagSupport;ownerTag;appElement;arrayValue=new me;constructor(e,t){this.strings=e,this.values=t}key(e){return this.arrayValue=e,this}async destroy(e={stagger:0,byParent:!1}){!!this.tagSupport&&function(e,t){r.tagUse.forEach((n=>n.beforeDestroy(e,t)))}(this.tagSupport,this),this.destroySubscriptions();const t=this.children.map((t=>t.destroy({...e,byParent:!0})));return this.children.length=0,this.ownerTag&&(this.ownerTag.children=this.ownerTag.children.filter((e=>e!==this))),e.byParent||(e.stagger=await this.destroyClones(e)),await Promise.all(t),e.stagger}destroySubscriptions(){this.cloneSubs.forEach((e=>e.unsubscribe())),this.cloneSubs.length=0}async destroyClones({stagger:e}={stagger:0}){let t=!1;const n=this.clones.reverse().map(((n,r)=>{let o;n.ondestroy&&(o=function(e,t){const n=e.ondestroy;if(!n)return;const r=n.tagFunction;if(!r)return;const o=r.tagFunction;return o?o({target:e,stagger:t}):void 0}(n,e));const s=()=>{n.parentNode?.removeChild(n);const e=this.ownerTag;e&&(e.clones=e.clones.filter((e=>e!==n)))};return o instanceof Promise?(t=!0,o.then(s)):s(),o}));return this.clones.length=0,t&&await Promise.all(n),e}updateByTag(e){this.updateConfig(e.strings,e.values),this.tagSupport.templater=e.tagSupport.templater,this.tagSupport.propsConfig={...e.tagSupport.propsConfig},this.tagSupport.newest=e}lastTemplateString=void 0;updateConfig(e,t){this.strings=e,this.updateValues(t)}getTemplate(){const e=function(e){const t=function(e){const t=[];return{string:e.replace(U,((e,n)=>{if(e.startsWith("<"))return e;const r=n.substring(1,n.length-1);return t.push(r),`<template interpolate end id="${r}"></template>`})),keys:t}}(e);return t.string=t.string.replace(he,pe),t}(this.strings.map(((e,t)=>(e.replace(fe,ge)+(this.values.length>t?`{${pe}${t}}`:"")).replace(/>\s*/g,">").replace(/\s*</g,"<"))).join(""));return this.lastTemplateString=e.string,{interpolation:e,string:e.string,strings:this.strings,values:this.values,context:this.tagSupport?.memory.context||{}}}isLikeTag(e){const{string:t}=e.getTemplate();if(!this.lastTemplateString)throw new Error("no template here");return t===this.lastTemplateString&&e.values.length===this.values.length&&!!e.values.every(((e,t)=>{const n=this.values[t];return!(e instanceof Function&&n instanceof Function)||!(e.toString()!==n.toString())}))}update(){return this.updateContext(this.tagSupport.memory.context)}updateValues(e){return this.values=e,this.updateContext(this.tagSupport.memory.context)}updateContext(e){return this.strings.map(((t,n)=>{const r=pe+n,o=this.values.length>n,l=this.values[n];if(r in e)return function(e,t,n){const r=e.value,o=e,l=e,u=o.isChildSubject,c=b(t);if(u&&(t=t.value),function(e,t){const n=e.lastArray;if(n&&!$(t))return n.forEach((({tag:e})=>e.destroy())),delete e.lastArray,1;const r=e,o=r.tag;if(o){const n=v(t);return v(e.value)&&n?!function(e,t){return!(e.strings.length!==t.strings.length||!e.strings.every(((e,n)=>t.strings[n]===e))||e.values.length!==t.values.length)}(t,o)&&(de(o,r),2):!b(t)&&(de(o,r),3)}const s=e,i="lastValue"in s,a=s.lastValue;i&&a!==t&&function(e,t){const n=t.clone,r=n.parentNode;if(n===e)throw"ok";r.insertBefore(e,n),r.removeChild(n),delete t.clone,delete t.lastValue}(s.template,s)}(e,t),c)return function(e,t,n,r){let o=n.tag;if(!o)return ce(t,n,e),void t.redraw();const s=o.tagSupport.templater.wrapper,i=t.wrapper;let l=!1;s&&i&&(l=s.original===i.original);const u=t.tagSupport.propsConfig.latest,c=o.tagSupport;if(c.propsConfig.latest=u,l){const e=r?.tagSupport;let n=e.props;if(v(e.props)||(n=a(e.props)),o&&!d(c,t.tagSupport))return}else de(o,n);ce(t,n,e),c.templater=t;const p=t.redraw();o.isLikeTag(p)||(o.destroy(),n.tagSupport=p.tagSupport,n.tag=p,c.oldest=p),c.newest=p,c.propsConfig={...t.tagSupport.propsConfig}}(n,t,l,r);const p=l.tag;if(p)!function(e,t,n,r){const o=e.tagSupport.templater.wrapper,a=n?.wrapper,l=o&&a&&o?.original===a?.original,u=n&&e.lastTemplateString===n.lastTemplateString,c=n&&n.getTemplate&&e.isLikeTag(n);u||c?ne(n,t,t.template,r,{counts:{added:0,removed:0}}):l?function(e,t,n){const r=t.tagSupport,o=r.oldest;r.newest,i(o.tagSupport,o);const a=e.wrapper();e.newest=a,r.newest=a,s(o.tagSupport,o),t.updateByTag(a),n.set(e)}(n,e,t):ee(n,t,t.template)}(p,e,t,n);else if($(t)){const r=Q(e,t,o.template||l.tag?.tagSupport.templater.insertBefore,n,{counts:{added:0,removed:0}});n.clones.push(...r)}else t instanceof Function?l.set(B(t,n)):y(t)?l.set(t.value):l.set(t)}(e[r],l,this);!function(e,t,n,r,o){if(b(t))ce(t,n[r]=new A(t),o);else if(t instanceof Function)n[r]=function(e,t){return new A(B(e,t))}(t,o);else if(e)v(t)?(t.ownerTag=o,o.children.push(t),n[r]=new A(t)):y(t)?n[r]=t:n[r]=new A(t)}(o,l,e,r,this)})),e}getAppElement(){let e=this;for(;e.ownerTag;)e=e.ownerTag;return e}rebuild(){const e=this.tagSupport.templater.insertBefore;if(!e){const e=new Error("Cannot rebuild. Previous insertBefore element is not defined on tag");throw e.tag=this,e}this.buildBeforeElement(e,{forceElement:!0,counts:{added:0,removed:0}})}buildBeforeElement(e,t={forceElement:!1,counts:{added:0,removed:0}}){this.tagSupport.templater.insertBefore=e;const n=this.update(),r=this.getTemplate(),o=document.createElement("div");o.id="tag-temp-holder",o.innerHTML=`<template id="temp-template-tag-wrap">${r.string}</template>`;const s=le(o,n,r,this,{forceElement:t.forceElement,counts:t.counts});this.clones.length=0;const i=function(e,t){const n=[];let r=e.children[0].content.firstChild;for(;r;){const e=r.nextSibling;D(r,t),n.push(r),r=e}return n}(o,e);return this.clones.push(...i),s.length&&(this.clones=this.clones.filter((e=>!s.find((t=>t===e))))),this.clones.forEach((e=>oe(e,t))),this.clones}}function ve(e,...t){return new be(e,t)}function ye(e,t){return n=>(t.callback=n||(t=>[e,e=t]),e)}r.memory.stateConfig={array:[],rearray:[]};const $e=[];function we(e){const t=e.callback;if(!t)return e.defaultValue;const n=t(Se),[r]=n,[o]=t(r);if(o!==Se){const s='State property not used correctly. Second item in array is not setting value as expected.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n'+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(s,{state:e,callback:t,oldState:n,oldValue:r,checkValue:o}),new Error(s)}return r}r({beforeRender:e=>Te(e),beforeRedraw:e=>Te(e),afterRender:e=>{const t=e.memory.state,n=r.memory.stateConfig;if(n.rearray.length&&n.rearray.length!==n.array.length){const t=`States lengths mismatched ${n.rearray.length} !== ${n.array.length}`;throw new G(t,{oldStates:n.array,newStates:n.rearray,component:e.templater?.wrapper.original})}n.rearray=[],t.newest=[...n.array],n.array=[],$e.forEach((e=>e())),$e.length=0}});class Se{}function Te(e){const t=e.memory.state,n=r.memory.stateConfig;if(n.rearray.length){const r="last array not cleared";throw console.error(r,{config:n,component:e.templater?.wrapper.original,state:t,expectedClearArray:n.rearray}),new G(r,{config:n,component:e.templater?.wrapper.original,state:t,expectedClearArray:n.rearray})}n.rearray=[],t?.newest.length&&n.rearray.push(...t.newest)}function Ce(e){const t=r.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=we(o);n=t=>[e,e=t];const r={callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),e}let s=(e instanceof Function?e:()=>e)();n=e=>[s,s=e];const i={callback:n,lastValue:s,defaultValue:s};return t.array.push(i),s}function xe(e){const t=r.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=we(o);n=t=>[e,e=t];const r={callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),ye(e,r)}let s=(e instanceof Function?e:()=>e)();n=e=>[s,s=e];const i={callback:n,lastValue:s,defaultValue:s};return t.array.push(i),ye(s,i)}function ke(e){return r.memory.providerConfig.providers.find((t=>t.constructMethod===e))}r.memory.providerConfig={providers:[],ownerTag:void 0};const Ee=e=>{const t=ke(e);if(t)return t.clone=a(t.instance),t.instance;const n=e.constructor?new e:e();return r.memory.providerConfig.providers.push({constructMethod:e,instance:n,clone:a(n)}),n},Ae=e=>{const t=ke(e);if(t)return t.instance;const n=r.memory.providerConfig;let o={ownerTag:n.ownerTag};for(;o.ownerTag;){const t=o.ownerTag.tagSupport.memory.providers.find((t=>{if(t.constructMethod===e)return!0}));if(t)return t.clone=a(t.instance),n.providers.push(t),t.instance;o=o.ownerTag}const s=`Could not inject provider: ${e.name} ${e}`;throw console.warn(`${s}. Available providers`,n.providers),new Error(s)};function Be(e,t){const n=r.memory.providerConfig;n.ownerTag=t,e.memory.providers.length&&(n.providers.length=0,n.providers.push(...e.memory.providers))}function je(e){r.memory.initCurrentSupport=e}function Ne(e){r.memory.initCurrentSupport.memory.init||(r.memory.initCurrentSupport.memory.init=e,e())}let Pe;function Ve(e){Pe.memory.destroyCallback=e}r({beforeRender:(e,t)=>{Be(e,t)},beforeRedraw:(e,t)=>{Be(e,t.ownerTag)},afterRender:e=>{const t=r.memory.providerConfig;e.memory.providers=[...t.providers],t.providers.length=0}}),r({beforeRender:e=>je(e),beforeRedraw:e=>je(e)}),r({beforeRender:e=>Pe=e,beforeRedraw:e=>Pe=e,beforeDestroy:(e,t)=>{const n=e.memory.destroyCallback;n&&n()}});let De=()=>e=>()=>{throw new Error("The real callback function was called and that should never occur")};function Re(e,t){e.forEach(((e,n)=>{const r=we(e),o=t[n].callback;o&&o(r),t[n].lastValue=r}))}function Oe(e){De=()=>{const t=r.memory.stateConfig.array;return n=>(...r)=>function(e,t,n,...r){const o=e.memory.state.newest;Re(o,n);const s=t(...r);Re(n,o),e.render(),s instanceof Promise&&s.finally((()=>{Re(n,o),e.render()}))}(e,n,t,...r)}}r({beforeRender:e=>Oe(e),beforeRedraw:e=>Oe(e)});const He={tagElement:m,redrawTag:function(e,t,n,r){return t.renderWithSupport(e,n,r)}},Ie=V((()=>{let e=xe("a")((t=>[e,e=t])),t=xe(!0)((e=>[t,t=e]));return ve`
    <input onchange=${t=>e=t.target.value} placeholder="a b or c" />
    <select id="select-sample-drop-down">
      ${["a","b","c"].map((t=>ve`
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
  `})),Fe=V((()=>{let e=xe(0)((t=>[e,e=t]));return++e,ve`
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
  `})),_e=V((()=>{let e=xe(!0)((t=>[e,e=t]));return ve`
    <div style="max-height: 800px;overflow-y: scroll;">
      <table cellPadding=${5} cellSpacing=${5} border="1">
        <thead style="position: sticky;top: 0;">
          <tr>
            <th>hello</th>
            <th>hello</th>
            ${e&&ve`
              <td>hello 2 thead cell</td>
            `}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>world</td>
            <td>world</td>
            ${e&&ve`
              <td>world 2 tbody cell</td>
            `}
          </tr>
        </tbody>
      </table>
    </div>
  `})),Je=V((({renderCount:e,name:t})=>ve`<div><small>(${t} render count ${e})</small></div>`)),Me=V((()=>{let e=xe(0)((t=>[e,e=t])),t=xe({test:33,x:"y"})((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));return++e,ve`
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
      ${We({propNumber:n,propsJson:t,propNumberChange:e=>{n=e}})}
    </fieldset>
    ${Je({renderCount:e,name:"propsDebugMain"})}
  `})),We=V((({propNumber:e,propsJson:t,propNumberChange:n})=>{let o=xe(0)((e=>[o,o=e])),s=xe(0)((e=>[s,s=e]));!function(e){const t=r.memory.stateConfig,[n]=e(void 0);e(n);const o=t.rearray[t.array.length];if(o){let r=o.watch,s=we(o);const i={callback:e,lastValue:s,watch:o.watch};return n!=r&&(i.watch=n,s=i.lastValue=n),t.array.push(i),e(s),s}const s={callback:e,lastValue:n,watch:n};t.array.push(s)}((t=>[e,e=t]));const i=function(e,t){let n=xe(void 0)((e=>[n,n=e]));return void 0===n?(t(),n=e,e):(e.every(((e,t)=>e===n[t]))||(t(),n=e),e)}([e],(()=>{++s}));return++o,ve`<!--propsDebug.js-->
    <h3>Props Json</h3>
    <textarea style="font-size:0.6em;height:200px;width:100%" wrap="off" onchange=${function(e){const n=JSON.parse(e.target.value);Object.assign(t,n)}}>${JSON.stringify(t,null,2)}</textarea>
    <pre>${JSON.stringify(t,null,2)}</pre>
    <hr />
    <h3>Props Number</h3>
    
    <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled>${JSON.stringify(i,null,2)}</textarea>
    
    <div>
      <button id="propsDebug-🥩-1-button" onclick=${()=>n(++e)}
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
    ${ze({propNumber:e,callback:()=>{++e}})}
    
    ${Je({renderCount:o,name:"propsDebug"})}
  `})),ze=V((({propNumber:e,callback:t})=>{let n=xe(0)((e=>[n,n=e]));return++n,ve`
    <button
      title="the count here and within parent increases but not in parent parent"
      onclick=${t}
    >local & 1-parent increase ${e}</button>
    ${Je({renderCount:n,name:"propFnUpdateTest"})}
  `})),Le=async({target:e,stagger:t})=>{e.style.opacity=0,t&&await qe(300*t),e.style.opacity=1,e.classList.add("animate__animated","animate__fadeInDown")},Ue=async({target:e,stagger:t,capturePosition:n=!0})=>{n&&function(e){e.style.zIndex=e.style.zIndex||1;const t=e.offsetTop+"px",n=e.offsetLeft+"px",r=e.clientWidth+(e.offsetWidth-e.clientWidth)+1+"px",o=e.clientHeight+(e.offsetHeight-e.clientHeight)+1+"px";setTimeout((()=>{e.style.top=t,e.style.left=n,e.style.width=r,e.style.height=o,e.style.position="fixed"}),0)}(e),t&&await qe(300*t),e.classList.add("animate__animated","animate__fadeOutUp"),await qe(1e3),e.classList.remove("animate__animated","animate__fadeOutUp")};function qe(e){return new Promise((t=>{setTimeout(t,e)}))}const Ye=V((function(){const e=Ce([]);let t=xe(0)((e=>[t,t=e]));const n=()=>({name:"Person "+e.length,scores:"0,".repeat(4).split(",").map(((e,t)=>({frame:t+1,score:Math.floor(4*Math.random())+1})))});return++t,ve`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${e.map(((t,r)=>ve`
        <div oninit=${Le} ondestroy=${Ue} style="background-color:black;">
          <div>
            name:${t.name}
          </div>
          <div>
            index:${r}
          </div>
          
          <div>scores:${t.scores.map(((e,t)=>ve`
            <div style="border:1px solid white;"
              oninit=${Le} ondestroy=${Ue}
            >
              ${Ke({score:e,playerIndex:t})}-
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

    ${e.length>0&&ve`
      <button oninit=${Le} ondestroy=${Ue} onclick=${()=>{e.length=0}}>remove all</button>
    `}

    ${Je({renderCount:t,name:"arrayTests.ts"})}
  `})),Ke=V((({score:e,playerIndex:t})=>{let n=xe(0)((e=>[n,n=e]));return++n,ve`
    frame:${e.frame}:
    <button
      id=${`score-data-${t}-${e.frame}-inside`}
      onclick=${()=>++e.score}
    >${e.score}</button>
    <button onclick=${()=>++n}>increase renderCount</button>
    ${Je({renderCount:n,name:"scoreData"+e.frame})}
  `})),Xe=3e3,Ge=6e3,Qe=V((()=>{let e=xe(0)((t=>[e,e=t])),t=xe(void 0)((e=>[t,t=e])),n=xe(void 0)((e=>[n,n=e])),r=xe(0)((e=>[r,r=e])),o=xe(0)((e=>[o,o=e]));const s=De(),i=()=>++e;console.log("intervalId",t);const a=()=>{console.info("interval test 0 started..."),o=0,n=setInterval(s((()=>{o+=500,o>=Xe&&(o=0,console.log("interval tick"))})),500),console.log("▶️ interval started"),t=setInterval(s((()=>{i()})),Xe)},l=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🛑 interval test 0 stopped")};return Ne(a),Ve(l),++r,ve`<!--intervalDebug.js-->
    <div>interval type 1 at ${Xe}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${r}</button>
    <input type="range" min="0" max=${Xe} step="1" value=${o} />
    <div>
      --${o}--
    </div>
    <button type="button" onclick=${()=>{t||n?l():a()}}
      style.background-color=${t||n?"red":"green"}
    >start/stop</button>
    <button type="button" onclick=${()=>setTimeout(s((()=>{o+=200})),1e3)}>delay increase currentTime</button>
  `})),Ze=V((()=>{let e=xe(0)((t=>[e,e=t])),t=xe(void 0)((e=>[t,t=e])),n=xe(void 0)((e=>[n,n=e])),r=xe(0)((e=>[r,r=e])),o=xe(0)((e=>[o,o=e]));const s=De(),i=()=>++e;function a(){if(t)return clearInterval(t),clearInterval(n),t=void 0,n=void 0,void console.info("interval 1 stopped");console.info("interval test 1 started..."),o=0,n=setInterval(s((()=>{o+=500,o>=Ge&&(o=0)})),500),t=setInterval(s((()=>{i(),console.info("slow interval ran")})),Ge)}return Ne(a),Ve(a),++r,ve`
    <div>interval type 2 with ${Ge}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${r}</button>
    <input type="range" min="0" max=${Ge} step="1" value=${o} />
    <div>
      --${o}--
    </div>
    <button type="button" onclick=${a}
      style.background-color=${t?"red":"green"}
    >start/stop</button>
  `}));function et(){return{upper:Ee(tt),test:0}}function tt(){return{name:"upperTagDebugProvider",test:0}}const nt=V((()=>{let e=xe("tagJsDebug.js")((t=>[e,e=t])),t=xe(!1)((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));return++n,ve`<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${Je({renderCount:n,name:"tagJsDebug"})}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <fieldset style="flex:2 2 20em">
        <legend>arrays</legend>
        ${Ye()}
      </fieldset>
    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${()=>t=!t}
        >hide/show</button>

        ${t&&ve`
          <div oninit=${Le} ondestroy=${Ue}>
            <div>${Qe()}</div>
            <hr />
            <div>${Ze()}</div>
          </div>
        `}
      </fieldset>

      <fieldset id="props-debug" style="flex:2 2 20em">
        <legend>Props Debug</legend>
        ${Me()}
      </fieldset>
    </div>
  `})),rt=V((()=>{let e=xe(null)((t=>[e,e=t])),t=xe(0)((e=>[t,t=e])),n="select tag below";switch(e){case"1":n=st({title:"value switch"});break;case"2":n=it({title:"value switch"});break;case"3":n=at({title:"value switch"})}let r=ve`<div id="select-tag-above">select tag above</div>`;switch(e){case"1":r=st({title:"tag switch"});break;case"2":r=it({title:"tag switch"});break;case"3":r=at({title:"tag switch"})}return++t,ve`
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
        <div>${"3"===e?at({title:"ternary simple"}):st({title:"ternary simple"})}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${ot({selectedTag:e})}</div>
      </div>
      
      <div style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div>${lt({selectedTag:e})}</div>
      </div>
    </div>
    ${!1}
  `})),ot=V((({selectedTag:e})=>ve`
  <div>${"3"===e?at({title:"ternaryPropTest"}):st({title:"ternaryPropTest"})}</div>
  `)),st=V((({title:e})=>{let t=xe(0)((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));return++n,ve`
    <div style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Je({renderCount:n,name:"tag1"})}
    </div>
  `})),it=V((({title:e})=>{let t=xe(0)((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));return++n,ve`
    <div style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Je({renderCount:n,name:"tag1"})}
    </div>
  `})),at=V((({title:e})=>{let t=xe(0)((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));return++n,ve`
    <div style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Je({renderCount:n,name:"tag1"})}
    </div>
  `})),lt=V((({selectedTag:e})=>{switch(e){case void 0:return ve`its an undefined value`;case"1":return ve`${["a"].map((t=>ve`${st({title:`array ${e} ${t}`})}`.key(t)))}`;case"2":return ve`${["b","c"].map((t=>ve`${it({title:`array ${e} ${t}`})}`.key(t)))}`;case"3":return ve`${["d","e","f"].map((t=>ve`${at({title:`array ${e} ${t}`})}`.key(t)))}`}return ve`nothing to show for in arrays`})),ut=V(((e,t)=>{let n=xe(0)((e=>[n,n=e])),r=xe(0)((e=>[r,r=e]));return++n,ve`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div>${t}</div>
      <div>isSubjectInstance:${y(t)}</div>
      <div>isSubjectTagArray:${$(t.value)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${()=>++r}>increase innerHtmlTest ${r}</button>
      <span id="innerHtmlTest-counter-display">${r}</span>
      ${Je({renderCount:n,name:"innerHtmlTest"})}
    </fieldset>
  `})),ct=V(((e,t)=>{let n=xe(0)((e=>[n,n=e])),r=xe(0)((e=>[r,r=e]));return++n,ve`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${e}</legend>
      ${t}
      <button id="innerHtmlPropsTest-button" onclick=${()=>++r}
      >increase innerHtmlPropsTest ${r}</button>
      <span id="innerHtmlPropsTest-display">${r}</span>
      ${!1}
    </fieldset>
  `})),dt=(V((({legend:e,id:t},n)=>{let r=xe(0)((e=>[r,r=e])),o=xe(0)((e=>[o,o=e]));return++r,ve`
    <fieldset id=${t} style="flex:2 2 20em">
      <legend>${e}</legend>
      ${n}
      <hr />
      <button onclick=${()=>++o}>increase childContentTest ${o}</button>
      ${Je({renderCount:r,name:"childContentTest"})}
    </fieldset>
  `})),V((()=>{let e=xe(0)((t=>[e,e=t])),t=xe(0)((e=>[t,t=e]));return++e,ve`
    <fieldset id="children-test" style="flex:2 2 20em">
      <legend>childTests</legend>
      
      ${!1}
      
      ${ut({},ve`
        <b>Field set body A</b>
        <hr />
        <button id="innerHtmlTest-childTests-button"
          onclick=${()=>++t}
        >increase childTests inside ${t}:${e}</button>
        <span id="innerHtmlTest-childTests-display">${t}</span>
        ${Je({renderCount:e,name:"childTests"})}
      `)}

      ${ct(22,ve`
        <b>Field set body B</b>
        <hr />
        <button id="innerHtmlPropsTest-childTests-button"
          onclick=${()=>++t}
        >increase childTests inside 22 ${t}</button>
        <span id="innerHtmlPropsTest-childTests-display">${t}</span>
        ${Je({renderCount:e,name:"innerHtmlPropsTest child"})}
      `)}

      ${!1}
      
      <hr />
      <button id="childTests-button"
        onclick=${()=>++t}
      >increase childTests outside ${t} - ${e}</button>
      <span id="childTests-display">${t}</span>
      ${Je({renderCount:e,name:"childTests"})}
    </fieldset>
  `}))),pt=[],gt=[];function ft(e,t){gt.push((()=>{console.debug(e),t()}))}function ht(e){e.forEach((e=>e()))}function mt(e){return{toBeDefined:()=>{if(null!=e)return;const t=`Expected ${JSON.stringify(e)} to be defined`;throw console.error(t,{expected:e}),new Error(t)},toBe:(t,n)=>{if(e===t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be ${typeof t} ${JSON.stringify(t)}`;throw console.error(r,{received:t,expected:e}),new Error(r)}}}function bt(e){return document.querySelectorAll(e).length}function vt([e,t],[n,r]){const o=document.querySelectorAll(t)[0].innerText;yt(e,t);let s=document.querySelectorAll(r)[0],i=s.innerText;const a=(Number(o)+2).toString();mt(i).toBe(a,`Expected second increase provider to be increased to ${o} but got ${i}`),yt(n,r),s=document.querySelectorAll(r)[0],i=s.innerText,mt(i).toBe((Number(o)+4).toString(),`Expected ${r} innerText to be ${Number(o)+4} but instead it is ${i}`)}function yt(e,t,{elementCountExpected:n}={elementCountExpected:1}){const r=document.querySelectorAll(e),o=document.querySelectorAll(t);mt(r.length).toBe(n,`Expected ${e} to be ${n} elements but is instead ${r.length}`),mt(o.length).toBe(n,`Expected ${t} to be ${n} elements but is instead ${o.length}`),r.forEach(((e,n)=>{const r=o[n];let s=Number(r?.innerText);e?.click();let i=s+1;s=Number(r?.innerText),mt(i).toBe(s,`Expected element(s) ${t} to be value ${i} but is instead ${s}`),e?.click(),s=Number(r?.innerText),++i,mt(i).toBe(s,`Expected element(s) ${t} to increase value to ${i} but is instead ${s}`)}))}function $t(e,t,n){const r=bt(e);n=n||`Expected ${t} elements to match query ${e} but found ${r}`,mt(r).toBe(t,n)}ft.only=(e,t)=>{pt.push((()=>{console.debug(e),t()}))};const wt=V((function(){let e=xe(0)((t=>[e,e=t])),t=xe(0)((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));return Ne((()=>{++n,console.info("tagJsDebug.js: 👉 i should only ever run once")})),++t,ve`<!--counters-->
    <div>Subscriptions:${x.globalSubCount$}</div>
    <div>initCounter:${n}</div>
    <button id="increase-counter" onclick=${()=>{++e}}>counter:${e}</button>
    <span id="counter-display">${e}</span>
    <button onclick=${()=>console.info("subs",x.globalSubs)}>log subs</button>
    ${Je({renderCount:t,name:"counters"})}
  `}));class St{tagDebug=0}const Tt=V((()=>{const e=Ee(et),t=Ee(St);xe("props debug base");let n=xe(0)((e=>[n,n=e])),r=xe(0)((e=>[r,r=e]));return++r,ve`
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
    ${Ct({propCounter:n,propCounterChange:e=>{n=e}})}
    <hr />
    renderCount outer:${r}
    ${Je({renderCount:r,name:"providerDebugBase"})}
  `})),Ct=V((({propCounter:e,propCounterChange:t})=>{const n=Ae(et),r=Ae(tt),o=Ae(St);Ce("provider debug inner test");let s=xe(!1)((e=>[s,s=e])),i=xe(0)((e=>[i,i=e]));return++i,ve`<!--providerDebug.js-->
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
    
    ${s&&ve`
      <div oninit=${Le} ondestroy=${Ue}>
        <hr />
        <h3>Provider as Props</h3>
        ${xt(o)}
      </div>
    `}

    <hr />
    renderCount inner:${i}
    ${Je({renderCount:i,name:"providerDebugInner"})}
  `})),xt=V((e=>ve`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(e,null,2)}</textarea>
  `)),kt=V((()=>{console.log("render app.js");let e=xe("app first state")((t=>[e,e=t])),t=xe(!1)((e=>[t,t=e])),n=xe(0)((e=>[n,n=e]));function r(e=!0){setTimeout((()=>{const t=function(){ft("elements exists",(()=>{mt(document.getElementById("h1-app")).toBeDefined();const e=document.getElementById("toggle-test");mt(e).toBeDefined(),mt(e?.innerText).toBe("toggle test"),e?.click(),mt(e?.innerText).toBe("toggle test true"),e?.click(),mt(e?.innerText).toBe("toggle test")})),ft("counters increase",(()=>{yt("#increase-counter","#counter-display"),yt("#increase-gateway-count","#display-gateway-count"),yt("#innerHtmlTest-counter-button","#innerHtmlTest-counter-display"),yt("#innerHtmlPropsTest-button","#innerHtmlPropsTest-display")})),ft("testDuelCounterElements",(()=>{vt(["#childTests-button","#childTests-display"],["#innerHtmlPropsTest-childTests-button","#innerHtmlPropsTest-childTests-display"]),vt(["#childTests-button","#childTests-display"],["#innerHtmlTest-childTests-button","#innerHtmlTest-childTests-display"]),vt(["#increase-provider-🍌-0-button","#increase-provider-🍌-0-display"],["#increase-provider-🍌-1-button","#increase-provider-🍌-1-display"]),vt(["#increase-provider-upper-🌹-0-button","#increase-provider-upper-🌹-0-display"],["#increase-provider-upper-🌹-1-button","#increase-provider-upper-🌹-1-display"]),vt(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"]),vt(["#propsDebug-🥩-0-button","#propsDebug-🥩-0-display"],["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"])})),ft("provider debug",(()=>{vt(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"])})),ft("tagSwitching",(()=>{mt(bt("#select-tag-above")).toBe(1,"Expected select-tag-above element to be defined"),mt(bt("#tag-switch-dropdown")).toBe(1,"Expected one #tag-switch-dropdown"),mt(bt("#tagSwitch-1-hello")).toBe(2,"Expected two #tagSwitch-1-hello elements"),mt(bt("#tagSwitch-2-hello")).toBe(0),mt(bt("#tagSwitch-3-hello")).toBe(0);const e=document.getElementById("tag-switch-dropdown");e.value="1",e.onchange({target:e}),$t("#tagSwitch-1-hello",5),mt(bt("#tagSwitch-2-hello")).toBe(0),mt(bt("#tagSwitch-3-hello")).toBe(0),mt(bt("#select-tag-above")).toBe(0),e.value="2",e.onchange({target:e}),$t("#tagSwitch-1-hello",2),$t("#tagSwitch-2-hello",4),mt(bt("#tagSwitch-3-hello")).toBe(0),mt(bt("#select-tag-above")).toBe(0),e.value="3",e.onchange({target:e}),mt(bt("#tagSwitch-1-hello")).toBe(0,"Expected no hello 1s"),mt(bt("#tagSwitch-2-hello")).toBe(0),$t("#tagSwitch-3-hello",7),mt(bt("#select-tag-above")).toBe(0),e.value="",e.onchange({target:e}),$t("#select-tag-above",1),$t("#tag-switch-dropdown",1),$t("#tagSwitch-1-hello",2),$t("#tagSwitch-2-hello",0),$t("#tagSwitch-3-hello",0)})),ft("array testing",(()=>{mt(bt("#array-test-push-item")).toBe(1),mt(bt("#score-data-0-1-inside")).toBe(0),mt(bt("#score-data-0-1-outside")).toBe(0),document.getElementById("array-test-push-item")?.click(),mt(bt("#score-data-0-1-inside")).toBe(1),mt(bt("#score-data-0-1-outside")).toBe(1);const e=document.getElementById("score-data-0-1-inside");let t=e?.innerText;const n=document.getElementById("score-data-0-1-outside"),r=n?.innerText;mt(t).toBe(r),e?.click(),mt(e?.innerText).toBe(n?.innerText),mt(t).toBe((Number(e?.innerText)-1).toString()),mt(t).toBe((Number(n?.innerText)-1).toString()),n?.click(),mt(e?.innerText).toBe(n?.innerText),mt(t).toBe((Number(e?.innerText)-2).toString()),mt(t).toBe((Number(n?.innerText)-2).toString())}));try{return pt.length?ht(pt):ht(gt),console.info("✅ all tests passed"),!0}catch(e){return console.error("❌ tests failed: "+e.message,e),!1}}();e&&(t?alert("✅ all tests passed"):alert("❌ tests failed. See console for more details"))}),3e3)}return++n,Ne((()=>{r(!1)})),ve`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${4}</h1>

    <button id="toggle-test" onclick=${()=>{t=!t}}>toggle test ${t}</button>
    <button onclick=${r}>run test</button>

    ${Je({name:"app",renderCount:n})}

    <div id="tagDebug-fx-wrap">
      ${nt()}

      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${wt()}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${Tt()}
        </fieldset>

        ${dt()}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${Ie()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${Fe()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${rt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${_e()}
        </fieldset>
      </div>            
    </div>
  `}));console.log("loading...");const Et=document.getElementsByTagName("app")[0];Et?m(kt,Et,{}):console.warn("Could not find <app> tag element");var At=t.j,Bt=t.f;export{At as IsolatedApp,Bt as hmr};