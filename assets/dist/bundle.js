var e={893:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.yY)("array testing",(()=>{(0,r.it)("array basics",(()=>{(0,r.l_)((0,o.o5)("#array-test-push-item")).toBe(1);const e=(0,o.o5)("#score-data-0-1-inside-button");(0,r.l_)(e).toBe(0),(0,r.l_)((0,o.o5)("#score-data-0-1-outside-button")).toBe(0),(0,o.L7)("array-test-push-item").click(),(0,r.l_)((0,o.o5)("#score-data-0-1-inside-button")).toBe(1),(0,r.l_)((0,o.o5)("#score-data-0-1-outside-button")).toBe(1);const t=(0,o.L7)("score-data-0-1-inside-button"),n=(0,o.L7)("score-data-0-1-inside-display");let s=n.innerText;const i=(0,o.L7)("score-data-0-1-outside-button"),a=(0,o.L7)("score-data-0-1-outside-display"),l=a.innerText;(0,r.l_)(s).toBe(l),t.click(),(0,r.l_)(n.innerText).toBe(a.innerText),(0,r.l_)(s).toBe((Number(n.innerText)-1).toString()),(0,r.l_)(s).toBe((Number(a.innerText)-1).toString()),i.click(),(0,r.l_)(n.innerText).toBe(a.innerText),(0,r.l_)(s).toBe((Number(n.innerText)-2).toString()),(0,r.l_)(s).toBe((Number(a.innerText)-2).toString())})),(0,r.it)("🗑️ deletes",(async()=>{(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(0),(0,r.l_)((0,o.o5)("#player-edit-btn-0")).toBe(1),await(0,o.L7)("player-edit-btn-0").onclick(),(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(1);const e=await(0,o.L7)("player-remove-promise-btn-0").onclick();var t;(0,r.l_)(e).toBe("promise-no-data-ever"),await(t=1e3,new Promise((e=>setTimeout(e,t)))),(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(0),(0,r.l_)((0,o.o5)("#player-edit-btn-0")).toBe(0)}))}))},979:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.it)("elements exists",(()=>{(0,r.l_)((0,o.L7)("h1-app")).toBeDefined();const e=(0,o.L7)("toggle-test");(0,r.l_)(e).toBeDefined(),(0,r.l_)(e.innerText).toBe("toggle test")})),(0,r.it)("toggle test",(()=>{const e=(0,o.L7)("toggle-test");e.click(),(0,r.l_)(e.innerText).toBe("toggle test true"),e.click(),(0,r.l_)(e.innerText).toBe("toggle test");const t=(0,o.L7)("props-debug-textarea");(0,r.l_)(t.value.replace(/\s/g,"")).toBe('{"test":33,"x":"y"}')}))},973:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.it)("child tests",(()=>{(0,r.di)("#innerHtmlPropsTest-button","#innerHtmlPropsTest-display"),(0,r.di)("#innerHtmlTest-counter-button","#innerHtmlTest-counter-display"),(0,r.Iq)(["#childTests-button","#childTests-display"],["#child-as-prop-test-button","#child-as-prop-test-display"],["#innerHtmlPropsTest-childTests-button","#innerHtmlPropsTest-childTests-display"]),(0,r.Iq)(["#childTests-button","#childTests-display"],["#innerHtmlTest-childTests-button","#innerHtmlTest-childTests-display"])}))},888:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.yY)("content",(()=>{(0,o.it)("basic",(()=>{(0,r.Lo)("#content-subject-pipe-display0","#content-subject-pipe-display1"),(0,r.Lo)("#content-combineLatest-pipe-display0","#content-combineLatest-pipe-display1")})),(0,o.it)("html",(()=>{(0,r.Lo)("#content-combineLatest-pipeHtml-display0","#content-combineLatest-pipeHtml-display1")}))}))},977:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("counters",(()=>{const e="0"===(0,o.dy)("#🍄-slowChangeCount");(0,r.it)("basics",(()=>{const t=(0,o.L7)("set-main-counter-input");(0,r.l_)(t).toBeDefined(),t.value="0",t.onkeyup({target:t});const n=Number((0,o.dy)("#counters_render_count")),i=Number((0,o.dy)("#inner_counters_render_count"));(0,s.wG)("#conditional-counter",0);const a=(0,o._8)("👉-counter-sub-count");(0,s.di)("#❤️-increase-counter","#❤️-counter-display"),(0,r.l_)((0,o._8)("👉-counter-sub-count")).toBe(a),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+2).toString()),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+2).toString()),(0,s.di)("#❤️-inner-counter","#❤️-inner-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+4).toString()),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+4).toString()),(0,s.di)("#standalone-counter","#standalone-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+6).toString(),"render count check failed"),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+4).toString()),(0,s.wG)("#conditional-counter",1),(0,s.wG)("#conditional-display",1),e&&(0,r.l_)((0,o.dy)("#conditional-display")).toBe("2"),(0,s.di)("#conditional-counter","#conditional-display"),(0,s.di)("#❤️-inner-counter","#❤️-inner-display")})),(0,r.it)("piped subject",(()=>{e&&((0,r.l_)((0,o.dy)("#🪈-pipedSubject")).toBe(""),(0,r.l_)((0,o.dy)("#🪈-pipedSubject-2")).toBe("")),(0,o.V4)("#🥦-subject-increase-counter");const t=(0,o.dy)("#🪈-pipedSubject"),n=(0,o.dy)("#🥦-subject-counter-display");(0,r.l_)(t).toBe(n,`Expected #🪈-pipedSubject value(${t}) to match #🥦-subject-counter-display value(${n})`),(0,r.l_)((0,o.dy)("#🪈-pipedSubject-2")).toBe((0,o.dy)("#🥦-subject-counter-display"))}))}))},617:(e,t,n)=>{function o(e){return document.querySelectorAll(e).length}function r(e){return document.querySelectorAll(e)}function s(e){return r(e).forEach((e=>e.focus()))}function i(e){return[...r(e)].map((e=>e.click()))}function a(e,t=0){return r(e)[t].click()}function l(e){let t="";return r(e).forEach((e=>t+=e.innerHTML)),t}function c(e){return document.getElementById(e)}function u(e){return document.getElementById(e).innerHTML}n.d(t,{IO:()=>r,L7:()=>c,T_:()=>s,V4:()=>i,_8:()=>u,dQ:()=>a,dy:()=>l,o5:()=>o})},933:(e,t,n)=>{n.d(t,{Fr:()=>s,Iq:()=>a,Lo:()=>r,di:()=>c,wG:()=>i});var o=n(435);function r(...e){const t=e.reduce(((e,t)=>{const n=document.querySelectorAll(t);return e.push(...n),e}),[]);(0,o.l_)(t.length).toBeGreaterThan(0,"Expected elements to be present in expectMatchedHtml() query but found none");const n=t.pop().innerHTML;t.every((t=>(0,o.l_)(n).toBe(t.innerHTML,(()=>`expectMatchedHtml unmatched html - queries: ${e.join(" - ")}`))))}function s(e,t){document.querySelectorAll(e).forEach((n=>(0,o.l_)(n.innerHTML).toBe(t,(()=>`Expected element ${e} innerHTML to be --\x3e${t}<-- but it was --\x3e${n.innerHTML}<--`))))}function i(e,t,n){const r=document.querySelectorAll(e),s=r.length;return n=n||`Expected ${t} elements to match query ${e} but found ${s}`,(0,o.l_)(s).toBe(t,n),r}function a(...e){const[t,n]=e.shift();let r=i(n,1),s=i(t,1);const a=r[0].innerText;l(s,r,{elementCountExpected:1},t,n);let c=2;e.forEach((([e,u])=>{r=i(u,1),s=i(e,1);let d=r[0],p=d.innerText;const g=(Number(a)+c).toString();(0,o.l_)(p).toBe(g,(()=>`Expected second increase provider to be increased to ${a} but got ${p}`)),l(s,r,{elementCountExpected:1},t,n),d=r[0],p=d.innerText;const b=c+2;(0,o.l_)(p).toBe((Number(a)+b).toString(),(()=>`Expected ${u} innerText to be ${Number(a)+b} but instead it is ${p}`)),c+=2}))}function l(e,t,{elementCountExpected:n}={elementCountExpected:1},r,s){(0,o.l_)(e.length).toBe(n,(()=>`Expected ${r} to be ${n} elements but is instead ${e.length}`)),(0,o.l_)(t.length).toBe(n,(()=>`Expected ${s} to be ${n} elements but is instead ${t.length}`)),e.forEach(((e,t)=>{const n=document.querySelectorAll(s)[t];(0,o.l_)(document.body.contains(n)).toBe(!0,`The selected element ${s} is no longer an element on the document body before clicking ${r}`);let i=Number(n?.innerText);e.click(),(0,o.l_)(n).toBeDefined(),(0,o.l_)(document.body.contains(n)).toBe(!0,`The selected element ${s} is no longer an element on the document body after clicking ${r}`);let a=i+1;i=Number(n.innerText),(0,o.l_)(document.body.contains(n)).toBe(!0),(0,o.l_)(a).toBe(i,(()=>`Counter test 1 of 2 expected ${s} to be value ${a} but it is ${i}`)),e.click(),i=Number(n?.innerText),++a,(0,o.l_)(a).toBe(i,(()=>`Counter test 2 of 2 expected ${s} to increase value to ${a} but it is ${i}`))}))}function c(e,t,{elementCountExpected:n}={elementCountExpected:1}){return l(document.querySelectorAll(e),document.querySelectorAll(t),{elementCountExpected:n},e,t)}},435:(e,t,n)=>{n.d(t,{ht:()=>c,it:()=>a,l_:()=>d,yY:()=>i});const o=[];let r=[],s=0;function i(e,t){r.push((async()=>{const n=r;r=[];try{console.debug("  ".repeat(s)+"↘ "+e),++s,await t(),await u(r),--s}catch(e){throw--s,e}finally{r=n}}))}function a(e,t){r.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(" ".repeat(s)+`✅ ${e} - ${o}ms`)}catch(t){throw console.debug(" ".repeat(s)+"❌ "+e),t}}))}function l(){o.length=0,r.length=0}async function c(){return o.length?u(o):u(r)}async function u(e){for(const t of e)try{await t()}catch(e){throw console.error(`Error testing ${t.name}`),l(),e}l()}function d(e){return{toBeDefined:t=>{if(null!=e)return;t instanceof Function&&(t=t());const n=t||`Expected ${JSON.stringify(e)} to be defined`;throw console.error(n,{expected:e}),new Error(n)},toBe:(t,n)=>{if(e===t)return;n instanceof Function&&(n=n());const o=n||`Expected ${typeof e} ${JSON.stringify(e)} to be ${typeof t} ${JSON.stringify(t)}`;throw console.error(o,{received:t,expected:e}),new Error(o)},toBeGreaterThan:(t,n)=>{const o=e;if(!isNaN(o)&&o>t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be greater than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)},toBeLessThan:(t,n)=>{const o=e;if(!isNaN(o)&&o<t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be less than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)}}}i.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)},i.only=(e,t)=>{o.push((async()=>{const n=r;r=[];try{console.debug("  ".repeat(s)+"↘ "+e),++s,await t(),await u(r),--s}catch(e){throw--s,e}finally{r=n}}))},a.only=(e,t)=>{o.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(`✅ ${e} - ${o}ms`)}catch(t){throw console.debug("❌ "+e),t}}))},a.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)}},153:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("function in props",(()=>{(0,s.di)("#fun_in_prop1","#fun_in_prop_display"),(0,s.di)("#fun_in_prop2","#fun_in_prop_display"),(0,s.di)("#fun_in_prop3","#fun_in_prop_display"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("taggjedjs-wrapped"),(0,o.V4)("#toggle-fun-in-child"),(0,o.V4)("#fun-parent-button"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("nowrap"),(0,o.V4)("#toggle-fun-in-child"),(0,o.V4)("#fun-parent-button"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("taggjedjs-wrapped")}))},961:(e,t,n)=>{n.r(t);var o=n(435);(0,o.it)("has no templates",(()=>{(0,o.l_)(document.getElementsByTagName("template").length).toBe(0,"expected no templates on document")}))},790:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("🪞 mirror testing",(()=>{(0,s.wG)("#mirror-counter-display",2),(0,s.wG)("#mirror-counter-button",2);const e=Number((0,o._8)("mirror-counter-display"));(0,o.L7)("mirror-counter-button").click(),(0,r.l_)(e+1).toBe(Number((0,o._8)("mirror-counter-display"))),(0,s.wG)("#mirror-counter-display",2),(0,s.Lo)("#mirror-counter-display")}))},389:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("oneRender",(()=>{(0,r.l_)((0,o.dy)("#oneRender_tag_ts_render_count")).toBe("1"),(0,s.di)("#👍-counter-button","#👍-counter-display"),(0,s.di)("#👍🔨-counter-button","#👍🔨-counter-display"),(0,s.di)("#👍🔨-counter-button","#👍🔨-counter-subject-display"),(0,r.l_)((0,o.dy)("#oneRender_tag_ts_render_count")).toBe("1")}))},434:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("props",(()=>{(0,r.it)("test duels",(()=>{(0,s.Iq)(["#propsDebug-🥩-0-button","#propsDebug-🥩-0-display"],["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"])})),(0,r.it)("child prop communications",(()=>{(0,s.Iq)(["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"],["#propsOneLevelFunUpdate-🥩-button","#propsOneLevelFunUpdate-🥩-display"])})),(0,r.it)("letProp",(()=>{(0,s.Lo)("#propsDebug-🥩-0-display","#propsDebug-🥩-2-display");const e=Number((0,o.dy)("#propsDebug-🥩-0-display")),t=(0,o.IO)("#propsDebug-🥩-2-button")[0].onclick();(0,r.l_)(t).toBe("no-data-ever"),(0,r.l_)((0,o.dy)("#propsDebug-🥩-0-display")).toBe(e.toString()),(0,r.l_)((0,o.dy)("#propsDebug-🥩-2-display")).toBe((e+1).toString())})),(0,r.it)("basics",(()=>{const e=(0,o.L7)("propsOneLevelFunUpdate-🥩-display").innerHTML,t=(0,o.dy)("#propsDebug-🥩-change-display");(0,r.l_)(t).toBe((Number(e)+1).toString());const n=(0,o.L7)("propsDebug-🥩-0-display").innerHTML,s=(0,o.L7)("propsDebug-🥩-1-display").innerHTML,i=(0,o.L7)("propsOneLevelFunUpdate-🥩-display").innerHTML,a=Number(n),l=Number(s),c=Number(i);(0,r.l_)(l).toBe(c),(0,r.l_)(a+2).toBe(l),(0,o.L7)("propsDebug-🥩-1-button").click()})),(0,r.it)("props as functions",(()=>{const e=Number((0,o._8)("sync-prop-number-display"));(0,s.Lo)("#sync-prop-number-display","#sync-prop-child-display"),(0,o.L7)("sync-prop-child-button").click(),(0,s.Fr)("#sync-prop-number-display",(e+2).toString()),(0,s.di)("#nothing-prop-counter-button","#nothing-prop-counter-display"),(0,s.Fr)("#sync-prop-number-display",(e+2).toString()),(0,s.Lo)("#sync-prop-counter-display","#nothing-prop-counter-display")}))}))},110:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.yY)("providers",(()=>{(0,o.it)("basics",(()=>{(0,r.Iq)(["#increase-provider-🍌-0-button","#increase-provider-🍌-0-display"],["#increase-provider-🍌-1-button","#increase-provider-🍌-1-display"]),(0,r.Iq)(["#increase-provider-upper-🌹-0-button","#increase-provider-upper-🌹-0-display"],["#increase-provider-upper-🌹-1-button","#increase-provider-upper-🌹-1-display"]),(0,r.Iq)(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"])})),(0,o.it)("inner outer debug",(()=>{(0,r.Iq)(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"]),(0,r.Iq)(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"]),(0,r.Iq)(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"])}))}))},987:(e,t,n)=>{n.r(t);var o=n(435);(0,o.it)("no template tags",(()=>{const e=document.getElementsByTagName("template");(0,o.l_)(e.length).toBe(0,"Expected no templates to be on document")}))},735:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("tagSwitching",(()=>{(0,r.it)("0",(()=>{(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(1,"Expected select-tag-above element to be defined"),(0,r.l_)((0,o.o5)("#tag-switch-dropdown")).toBe(1,"Expected one #tag-switch-dropdown"),(0,r.l_)((0,o.o5)("#tagSwitch-1-hello")).toBe(2,"Expected two #tagSwitch-1-hello elements"),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0)})),(0,r.it)("1",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="1",e.onchange({target:e}),(0,s.wG)("#tagSwitch-1-hello",5),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("2",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="2",e.onchange({target:e}),(0,s.wG)("#tagSwitch-1-hello",2),(0,s.wG)("#tagSwitch-2-hello",4),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("3",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="3",e.onchange({target:e}),(0,r.l_)((0,o.o5)("#tagSwitch-1-hello")).toBe(0,"Expected no hello 1s"),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,s.wG)("#tagSwitch-3-hello",7),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("4",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="",e.onchange({target:e}),(0,s.wG)("#select-tag-above",1),(0,s.wG)("#tag-switch-dropdown",1),(0,s.wG)("#tagSwitch-1-hello",2),(0,s.wG)("#tagSwitch-2-hello",0),(0,s.wG)("#tagSwitch-3-hello",0)}))}))},241:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.yY)("todos",(()=>{const e=(0,o.L7)("todo-input");(0,r.it)("add one remove one",(()=>{(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0),e.value="one",e.onkeydown({key:"Enter",target:e}),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(1),(0,o.V4)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0)})),(0,r.it)("basic",(()=>{e.value="one",e.onkeydown({key:"Enter",target:e}),(0,o.V4)('input[data-testid="todo-item-toggle"]'),(0,o.V4)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0),e.value="one",e.onkeydown({key:"Enter",target:e}),e.value="two",e.onkeydown({key:"Enter",target:e});const t=(0,o.IO)('input[data-testid="todo-item-toggle"]')[1];t.click(),(0,r.l_)(t.checked).toBe(!0),e.value="three",e.onkeydown({key:"Enter",target:e}),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(3),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(2),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(1),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(0)})),(0,r.it)("editing",(()=>{e.value="one",e.onkeydown({key:"Enter",target:e});let t=new MouseEvent("dblclick",{bubbles:!0,cancelable:!0,view:window});(0,o.IO)('label[data-testid="todo-item-label"]')[0].dispatchEvent(t),(0,o.T_)('input[data-testid="text-input"]');const n=(0,o.IO)('input[data-testid="text-input"]')[1];n.value="two",n.onkeydown({key:"Enter",target:n}),(0,r.l_)((0,o.IO)('input[data-testid="text-input"]').length).toBe(1),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('label[data-testid="todo-item-label"]').length).toBe(0)}))}))},122:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("⌚️ watch tests",(()=>{const e=(0,o.dy)("#🍄-slowChangeCount"),t="0"===e;(0,r.it)("basic",(()=>{const n=Number((0,o._8)("watch-testing-num-display"));(0,s.Lo)("#watch-testing-num-display","#🍄-slowChangeCount"),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("false"),t?((0,r.l_)((0,o.dy)("#🍄-watchPropNumSlow")).toBe(""),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe("false"),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe("undefined")):((0,r.l_)((0,o.dy)("#🍄-watchPropNumSlow")).toBe(e),(0,r.l_)(Number((0,o.dy)("#🦷-watchTruth"))).toBeGreaterThan(Number(e)),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe((0,o.dy)("#🦷-truthSubChangeCount"))),(0,o.V4)("#watch-testing-num-button"),(0,s.Lo)("#watch-testing-num-display","#🍄-slowChangeCount"),(0,s.Lo)("#🍄-watchPropNumSlow","#🍄-slowChangeCount"),(0,r.l_)((0,o.dy)("#🍄‍🟫-subjectChangeCount")).toBe((n+2).toString()),(0,s.Lo)("#🍄‍🟫-subjectChangeCount","#🍄‍🟫-watchPropNumSubject");const i=Number((0,o.dy)("#🦷-truthChangeCount"));(0,o.V4)("#🦷-truthChange-button");let a=(i+1).toString();(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("true"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),a=(i+1).toString(),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("false"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),a=(i+2).toString(),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("true"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),(0,o.V4)("#🦷-reset-button"),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe((0,o.dy)("#🦷-watchTruth"))}))}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{n.d(o,{gV:()=>to,jG:()=>io,l2:()=>ao,fm:()=>It});const e="";var t;function r(e){return[t.tag,t.templater].includes(e?.tagJsType)}function s(e){return e?.tagJsType===t.tagComponent}function i(e){return e?.tagJsType===t.tag}function a(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function l(e){return e instanceof Array&&e.every((e=>[t.tag,t.templater,t.tag,t.tagComponent].includes(e?.tagJsType)))}function c(e){const t=new p;return t.subscribeWith=t=>{const n=[],o=[],r=(r,s)=>{n[s]=!0,o[s]=r;if(n.length===e.length){for(let e=n.length-1;e>=0;--e)if(!n[e])return;t(o,i)}},s=[...e],i=s.shift().subscribe((e=>r(e,0))),a=s.map(((e,t)=>e.subscribe((e=>r(e,t+1)))));return i.subscriptions=a,i},t}function u(e,t,n){const o=p.globalSubCount$;p.globalSubCount$.next(o._value+1);const r=function(){r.unsubscribe()};return r.callback=t,r.subscriptions=[],r.unsubscribe=function(){return function(e,t,n){(function(e,t){const n=e.findIndex((e=>e.callback===t));-1!==n&&e.splice(n,1)})(t,n),p.globalSubCount$.next(p.globalSubCount$._value-1),e.unsubscribe=()=>e;const o=e.subscriptions;for(let e=o.length-1;e>=0;--e)o[e].unsubscribe();return e}(r,n,t)},r.add=e=>(r.subscriptions.push(e),r),r.next=e=>{t(e,r)},r}function d(e,t,n){const o=[...t],r=o.shift(),s=e=>{if(o.length)return d(e,o,n);n(e)};let i=s;const a=r(e,{setHandler:e=>i=e,next:s});i(a)}!function(e){e.unknown="unknown",e.tag="tag",e.templater="templater",e.tagComponent="tag-component",e.object="object",e.tagArray="tag-array",e.subject="subject",e.tagJsSubject="tagJsSubject",e.oneRender="oneRender",e.date="date",e.string="string",e.number="number",e.boolean="boolean",e.function="function",e[void 0]="undefined"}(t||(t={}));class p{value;onSubscription;methods=[];isSubject=!0;subscribers=[];subscribeWith;_value;constructor(e,t){this.value=e,this.onSubscription=t,this._value=e,g(this)}subscribe(e){const t=u(0,e,this.subscribers),n=this.subscribeWith;if(n){if(this.methods.length){const n=e;e=e=>{d(e,this.methods,(e=>n(e,t)))}}return n(e)}return this.subscribers.push(t),this.onSubscription&&this.onSubscription(t),t}next(e){this._value=e,this.emit()}set=this.next;emit(){const e=this._value,t=this.subscribers;for(let n=0;n<t.length;++n){const o=t[n];o.callback(e,o)}}toPromise(){return new Promise((e=>{this.subscribe(((t,n)=>{n.unsubscribe(),e(t)}))}))}toCallback(e){const t=this.subscribe(((n,o)=>{t.unsubscribe(),e(n)}));return this}pipe(...e){const t=new p(this._value);return t.setMethods(e),t.subscribeWith=e=>this.subscribe(e),t.next=e=>this.next(e),t}setMethods(e){this.methods=e}static all(e){return c(e.map((e=>{if(a(e))return e;return new p(e,(t=>(t.next(e),t)))})))}static globalSubCount$=new p(0)}function g(e){Object.defineProperty(e,"value",{set(t){e._value=t,e.emit()},get:()=>e._value})}class b extends p{value;constructor(e){super(e),this.value=e,g(this)}subscribe(e){const t=super.subscribe(e);return e(this._value,t),t}}function f(){return h.memory.stateConfig.support}function h(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};h.tagUse.push(t)}h.tagUse=[],h.memory={};class m extends Error{details;constructor(e,t,n={}){super(e),this.name=m.name,this.details={...n,errorCode:t}}}class y extends m{constructor(e,t){super(e,"array-no-key-error",t),this.name=y.name}}class v extends m{constructor(e,t){super(e,"state-mismatch-error",t),this.name=v.name}}class $ extends m{constructor(e,t){super(e,"sync-callback-error",t),this.name=$.name}}const w='letState function incorrectly used. Second item in array is not setting expected value.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n';h.memory.stateConfig={array:[]};const x=e=>function(e){const t=e.state,n=h.memory.stateConfig;n.rearray=[];const o=t?.length;if(o){for(let e=0;e<o;++e)C(t[e]);n.rearray.push(...t)}n.support=e}(e);function C(e){const t=e.callback;if(!t)return e.defaultValue;const[n,o]=function(e){const t=e(j),[n]=t,[o]=e(n);return[n,o]}(t);if(o!==j){const r=w+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(r,{state:e,callback:t,value:n,checkValue:o}),new Error(r)}return n}h({beforeRender:x,beforeRedraw:x,afterRender:e=>{const t=e.state,n=h.memory.stateConfig,o=n.rearray;if(o.length&&o.length!==n.array.length){const t=`States lengths have changed ${o.length} !== ${n.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`,r=e.templater?.wrapper,s={oldStates:n.array,newStates:n.rearray,tagFunction:r.parentWrap.original},i=new v(t,s);throw console.warn(t,s),i}delete n.rearray,delete n.support,t.length=0,t.push(...n.array);for(let e=t.length-1;e>=0;--e){const n=t[e];n.lastValue=C(n)}n.array=[]}});class j{}function k(e,t){for(let n=e.length-1;n>=0;--n){const o=e[n].get(),r=t[n].callback;r&&r(o),t[n].lastValue=o}}function _(e){const t=h.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=C(o);n=t=>[e,e=t];const r={get:()=>C(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),e}let r=(e instanceof Function?e:()=>e)();if(r instanceof Function){const e=t.array,n=t.support,o=r;r=(...t)=>{const r=n.subject.global.newest.state;k(r,e);const s=o(...t);return k(e,r),s},r.original=o}n=e=>[r,r=e];const s={get:()=>C(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),r}const T=(e,t)=>B(e,t),S=e=>e;const B=(e,t,{init:n,before:o=(()=>!0),final:r=S}={})=>{let s=_({pastResult:void 0,values:void 0});const i=s.values;if(void 0===i){if(!o(e))return s.values=e,s.pastResult;const a=(n||t)(e,i);return s.pastResult=r(a),s.values=e,s.pastResult}if(e.every(((e,t)=>e===i[t])))return s.pastResult;if(!o(e))return s.values=e,s.pastResult;const a=t(e,i);return s.pastResult=r(a),i.length=0,i.push(...e),s.pastResult};function D(e,t){return Object.defineProperty(t,"noInit",{get(){const t=e();return t.setup.init=()=>{},t}}),Object.defineProperty(t,"asSubject",{get(){const t=e(),n=_((()=>f())),o=_((()=>new b(void 0))),r=(e,r)=>(B(e,((e,t)=>{const s=f(),i=r(e,t);if(s!==n){k(h.memory.stateConfig.array,n.state)}o.next(i)}),t.setup),o);return r.setup=t.setup,D((()=>r),r),r}}),Object.defineProperty(t,"truthy",{get(){const t=e();return t.setup.before=e=>e.every((e=>e)),t}}),t}function P(e,t){const n=_((()=>h.memory.stateConfig.array)),o=f();return _((()=>new p(e,t).pipe((e=>(k(o.state,n),e)))))}function N(e){const t=h.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=C(o);n=t=>[e,e=t];const r={get:()=>C(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),E(e,r)}let r=(e instanceof Function?e:()=>e)();n=e=>[r,r=e];const s={get:()=>C(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),E(r,s)}function E(e,t){return n=>(t.callback=n||(t=>[e,e=t]),e)}function A(e){return O(e,new WeakMap)}function O(e,n){if(null===e||typeof e!==t.object)return e;if(n.has(e))return n.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const o=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(n.set(e,o),Array.isArray(e))for(let t=0;t<e.length;t++)o[t]=O(e[t],n);else for(const t in e)e.hasOwnProperty(t)&&(o[t]=O(e[t],n));return o}function L(e,t){return I(e,t,new WeakMap)}function I(e,n,o){return!!(e===n||(r=e,s=n,r instanceof Function&&s instanceof Function&&r.toString()===s.toString()))||(!!o.has(e)||typeof e===t.object&&typeof n===t.object&&(e instanceof Date&&n instanceof Date?e.getTime()===n.getTime():(o.set(e,0),Array.isArray(e)&&Array.isArray(n)?function(e,t,n){if(e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!I(e[o],t[o],n))return!1;return!0}(e,n,o):!Array.isArray(e)&&!Array.isArray(n)&&function(e,t,n){const o=Object.keys(e),r=Object.keys(t);if(0===o.length&&0===r.length)return!0;if(o.length!==r.length)return!1;for(const s of o){if(!r.includes(s)||!I(e[s],t[s],n))return!1}return!0}(e,n,o))));var r,s}D((()=>function(e){const t=(t,n)=>B(t,n,e);return t.setup=e,D((()=>t),t),t}({})),T),P._value=e=>{const t=_((()=>h.memory.stateConfig.array)),n=f();return _((()=>new b(e).pipe((e=>(k(n.state,t),e)))))},P.all=function(e){const t=_((()=>h.memory.stateConfig.array)),n=f();return p.all(e).pipe((e=>(k(n.state,t),e)))};const R=e=>{const t=_((()=>({stateDiff:0,provider:void 0})));if(t.stateDiff){for(let e=t.stateDiff;e>0;--e)_(void 0);return _(void 0)}const n=_((()=>{const n=h.memory.stateConfig,o=n.array.length,r="prototype"in e?new e:e(),s=n.support,i=n.array.length-o,a={constructMethod:e,instance:r,clone:A(r),stateDiff:i,owner:s,children:[]};return t.provider=a,s.subject.global.providers.push(a),t.stateDiff=i,r})),o=e,r=o.compareTo=o.toString();return t.provider.constructMethod.compareTo=r,n},F=e=>_((()=>{const t=h.memory,n=e,o=n.compareTo=n.compareTo||e.toString(),r=t.stateConfig.support,s=[];let i={ownerSupport:r.ownerSupport};for(;i.ownerSupport;){const e=i.ownerSupport.subject.global.providers.find((e=>{s.push(e);if(e.constructMethod.compareTo===o)return!0}));if(e){e.clone=A(e.instance);const n=t.stateConfig.support;return n.subject.global.providers.push(e),e.children.push(n),e.instance}i=i.ownerSupport}const a=`Could not inject provider: ${e.name} ${e}`;throw console.warn(`${a}. Available providers`,s),new Error(a)}));function V(e,t){const n=e.templater,o=t.templater,r=n?.tag||e,s=o.tag,i=r.strings,a=s.strings||t.strings;if(i.length!==a.length)return!1;if(!i.every(((e,t)=>a[t].length===e.length)))return!1;return function(e,t){const n=e.length===t.length;if(!n)return!1;const o=t.every(((t,n)=>{const o=e[n];if(t instanceof Function&&o instanceof Function){return!!(t.toString()===o.toString())}return!0}));if(o)return!0;return!1}(e.values||r.values,t.values||s.values)}function H(e,t){const n=h.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRender(e,t)}function M(e,t){const n=h.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].afterRender(e,t);h.memory.tagClosed$.next(t)}function J(e,t){const n=h.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeDestroy(e,t);if(e.subject.global.deleted=!0,e.hasLiveElements=!1,t){t.subject.global.childTags=t.subject.global.childTags.filter((t=>t!==e.subject.global.oldest));const n=e.subject.global;n.providers.forEach((e=>e.children.forEach(((t,o)=>{t.subject.global===n&&e.children.splice(o,1)}))))}}function W(e,t,n,o){const r=n.global.renderCount;!function(e,t,n){const o=n?.ownerSupport,r=o||t;if(n){if(n!==e){const t=n.state;e.subject.global=n.subject.global,e.state.length=0,e.state.push(...t)}return function(e,t){const n=h.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRedraw(e,t)}(e,n)}H(e,r)}(e,o,t);let s=(0,e.templater.wrapper)(e,n,t);return M(e,o),n.global.newest=s,!t&&o&&o.subject.global.childTags.push(s),n.global.renderCount>r+1?n.global.newest:s}h.memory.tagClosed$=new p(void 0,(e=>{f()||e.next()}));const G="__tagvar",Y="--"+G+"--",q=new RegExp(Y,"g");class U{strings;values;tagJsType=t.tag;children;memory={};templater;constructor(e,t){this.strings=e,this.values=t}key(e){return this.memory.arrayValue=e,this}html(e,...t){return this.children={strings:e,values:t},this}}function z(e){e.subject.global.oldest.destroy(),e.subject.global.context={}}function X(e){return["string","number","boolean"].includes(e)}function K(e,t){e.destroy({stagger:t.removed++})}function Q(e){if(null==e)return t.undefined;const n=typeof e;if(e instanceof Function)return t.function;if(n===t.object){if(e instanceof Date)return t.date;if(X(n))return n;const o=e.tagJsType;if(o){if([t.tagComponent,t.templater,t.tag].includes(o))return o}if(l(e))return t.tagArray;if(a(e))return t.subject}return t.unknown}function Z(e){return e.map((e=>{const n=e;switch(Q(e)){case t.tagComponent:return A(e.props);case t.tag:case t.templater:return Z(n.values);case t.tagArray:return Z(n)}return A(e)}))}function ee(e,t=[]){for(let n=e.length-1;n>=0;--n){const o=e[n];t.push(o),ee(o.subject.global.childTags,t)}return t}class te{props;tagJsType=t.templater;tagged;wrapper;madeChildIntoSubject;tag;children=new b([]);arrayValue;constructor(e){this.props=e}key(e){return this.arrayValue=e,this}html(e,...t){const n=function(e,t){if(a(e))return e;if(l(e))return t.madeChildIntoSubject=!0,new b(e);const n=e;return n?(t.madeChildIntoSubject=!0,n.memory.arrayValue=0,new b([n])):(t.madeChildIntoSubject=!0,new b([]))}(new U(e,t),this);return this.children=n,this}}class ne extends b{tagJsType=t.tagJsSubject;global=oe();lastRun}function oe(){return{destroy$:new p,context:{},providers:[],renderCount:0,subscriptions:[],oldest:void 0,blocked:[],childTags:[],clones:[]}}function re(e,t){const n=e;let o=n.templater;o||(o=new te([]),o.tag=n,n.templater=o);const r=new ne(o);return r.support=new gt(o,t,r),r.global.oldest=r.support,t.subject.global.childTags.push(r.support),r}const se="style",ie="class";function ae(e,t,n){const o=e.split(".");if(o[0]===se&&(n.style[o[1]]=t),o[0]===ie)if(o.shift(),t)for(let e=0;e<o.length;++e)n.classList.add(o[e]);else for(let e=0;e<o.length;++e)n.classList.remove(o[e])}function le(e,n){let o=e,r=n;if(typeof e===t.object){if(!n)return 3;o=[...e],r=[...n||[]];if(!o.every(((e,n)=>{let s=r[n];if(e&&typeof e===t.object){const t={...e},n={...s||{}},o=Object.entries(t).every((([e,o])=>ce(o,n[e],(()=>{delete t[e],delete n[e]}))));return o}return ce(e,s,(()=>{o.splice(n,1),r.splice(n,1)}))})))return"functions-changed"}return!1}function ce(e,t,n){if(!(e instanceof Function))return!!L(e,t)&&4;if(!(t instanceof Function))return!1;const o=t?.original;o&&(t=o);e.original&&(e=e.original);return e.toString()===t.toString()?(n(),3):(n(),5)}function ue(e,t,{counts:n},o){const r=t,s=r.support,i=s?.subject.global.oldest||void 0;if(i&&i)return function(e,t,n){if(t instanceof Function){const e=t(n);return n.updateBy(e),t.support=e,e}return n.updateBy(e),t.support=e,e}(e,r,i);const a=e.buildBeforeElement(void 0,{counts:n}),l=t.global.placeholder;return l.parentNode.insertBefore(a,l),e}function de(e,t,n,o){let r=n.support;r||(r=be(e,t,n)),n.support=r,r.ownerSupport=t;const s=r.buildBeforeElement(void 0,{counts:{added:0,removed:0}}),i=n.global.placeholder;return i.parentNode.insertBefore(s,i),r}function pe(e){const t=ge();return t.tag=e,e.templater=t,t}function ge(){const e={children:new b([]),props:[],isTag:!0,tagJsType:"templater",tagged:!1,html:()=>e,key:()=>e};return e}function be(e,t,n){const o=new gt(e,t,n);return fe(o,t,n),t.subject.global.childTags.push(o),o}function fe(e,t,n){e.subject=n,n.global.oldest=e,n.global.newest=e,e.ownerSupport=t}function he(e,t,n,o,r,s){if(!0!==e.tagged){const t=e.wrapper.parentWrap.original;let n=t.name||t.constructor?.name;"Function"===n&&(n=void 0);const o=n||t.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${o}\n\n`)}const i=new gt(e,o,t);let a=t.support;fe(i,o,t);const l=i.subject.global=a?.subject.global||i.subject.global;l.oldest=i,l.insertBefore=n;if(!a){a=function(e,t,n){const o=n.subject.global,r=o.clones.map((e=>e)),s=(t=ht(t,e.support,e,n)).subject.global;if(o.clones.length>r.length){const e=o.clones.filter((e=>!r.find((t=>t===e))));s.clones.push(...e)}return t}(t,a||i,o)}const c=ue(a,t,r);return o.subject.global.childTags.push(c),a}function me(e,t,n,o){return e.map((e=>function(e,t,n,o,s){if(r(e)||!e)return e;if(!t)return e;return ye(e,t,n,o,s)}(e,t.ownerSupport,n,t,o)))}function ye(e,t,n,o,r,s,i,a=[]){if(e instanceof Function)return function(e,t,n){const o=e.toCall;if(o)return e;const r=(...e)=>r.toCall(...e);return r.toCall=(...e)=>function(e,t,n){const o=n.subject.global,r=o.newest,s=f(),i=void 0===s;s&&(s.subject.global.locked=!0);const a=e(...t);if(s){const e=s?.subject.global.blocked;if(s&&e?.length)return h.memory.tagClosed$.toCallback((()=>{let e=s;delete s.subject.global.locked,e=Te(s,s),vt(e,!1)})),a;delete s.subject.global.locked}const l=()=>{if(!1===i){const e=r.state.every((e=>{const t=e.lastValue,n=e.get();return L(A(t),n)}));if(e)return a}return vt(r,!0),a};if(i)return l();return h.memory.tagClosed$.toCallback(l),a}(r.mem.prop,e,t),r.original=e,r.mem={prop:e},Object.assign(r,e),r}(e,t);if(a.includes(e))return e;if(a.push(e),"object"!=typeof e||!e)return e;if(e instanceof Array){for(let s=e.length-1;s>=0;--s){const i=e[s];if(e[s]=ye(i,t,n,o,r+1,s,e,a),i instanceof Function){if(i.toCall)continue;ve(r+1,s,i,e,o)}}return e}for(const s in e){const i=e[s],l=ye(i,t,n,o,r+1,s,e,a),c=Object.getOwnPropertyDescriptor(e,s)?.set;if(!c&&(e[s]=l,l instanceof Function)){if(i.toCall)continue;ve(r+1,s,i,e,o)}}return e}function ve(e,t,n,o,r){if(n?.toCall)throw new Error("meg");if(e>0){const e=r.subject.global;o[t].subscription=e.destroy$.toCallback((()=>{o[t]=n}))}}function $e(e,t,n,o,r=!1){let s=n.global.newest;const i=s.templater.wrapper,a=t.templater.wrapper;let l=!1;if(i&&a){l=i.parentWrap.original===a.parentWrap.original}const c=t.templater;if(!l){z(n.global.oldest);return he(c,n,o,e,{counts:{added:0,removed:0}})}{const n=function(e,t,n){const o=le(n.props,e.propsConfig.latestCloned);if(o)return o;const r=le(e.propsConfig.latestCloned,t.propsConfig.latestCloned);if(r)return r;const s=function(e,t){const n=e.propsConfig.lastClonedKidValues,o=t.propsConfig.lastClonedKidValues;return!n.every(((e,t)=>{const n=o[t];return e.every(((e,t)=>e===n[t]))}))&&9}(e,t);return s}(s,t,c);if(!n){const n=we(t,s,e,c.props);return t.propsConfig.castProps=n,s.propsConfig.latestCloned=t.propsConfig.latestCloned,s.propsConfig.lastClonedKidValues=t.propsConfig.lastClonedKidValues,s}}const u=n.global.oldest;if(n.global.locked)return n.global.blocked.push(t),t;return function(e,t,n,o,r,s){let i=e.support;if(t&&n.children._value.length){t.templater.children.next(n.children._value)}const a=s&&V(o,r);if(a){const t=e.global.oldest;return e.support=r,t.updateBy(r),r}if(s&&i){o.subject.global.deleted||ft(o),e.global.context={}}return function(e,t){const n=e.buildBeforeElement(void 0,{counts:{added:0,removed:0}}),o=t.global.placeholder;return o.parentNode.insertBefore(n,o),t.global.oldest=e,t.global.newest=e,t.global.oldest=e,t.global.newest=e,t.support=e,e.ownerSupport.subject.global.childTags.push(e),e}(r,e)}(n,u,c,n.global.newest,vt(t,r),l)}function we(e,t,n,o,r=-1){const s=t.subject.global.newest;if(!s){const t=n.state;o.length=0;const s=me(o,e,t,r);return o.push(...s),e.propsConfig.castProps=s,o}const i=(t=s||t).propsConfig.castProps,a=[];for(let t=0;t<o.length;++t){const s=o[t],l=xe(i[t],s,e,n,r+1,t);a.push(l)}return e.propsConfig.castProps=a,a}function xe(e,t,n,o,r,s,i=[]){if(e instanceof Function){if(t.mem)return e.mem.prop=t.mem.prop,e.mem.stateArray=t.mem.stateArray,t;const n=o.subject.global.newest.state;return e.mem.prop=t,e.stateArray=n,e}if(i.includes(t))return t;if(i.push(t),"object"!=typeof t||!t)return t;if(t instanceof Array){for(let s=t.length-1;s>=0;--s){const a=t[s];t[s]=xe(e[s],a,n,o,r+1,s,i)}return t}if(void 0===e)return t;for(const s in t){const a=t[s],l=xe(e[s],a,n,o,r+1,s,i),c=Object.getOwnPropertyDescriptor(t,s)?.set;c||(t[s]=l)}return t}const Ce=!0;function je(e,t,n,o,r){const s=ke(t),i=s.subject.global.newest.state;i.length===r.length&&k(i,r);const a=e.bind(n);s.subject.global.locked=Ce;return function(e,t){if(delete e.subject.global.locked,e.subject.global.blocked.length){let n;return n=Te(e,n),_e(t,n,n.subject.global)}const n=function(e,t,n){if(n.deleted)return"no-data-ever";return vt(e,!0),_e(t,e,n)}(e.subject.global.newest,t,e.subject.global);return n}(s,a(...o))}function ke(e){if(e.templater.tagJsType===t.templater){return ke(e.ownerSupport)}return e}function _e(e,t,n){return e instanceof Promise?(t.subject.global.locked=Ce,e.then((()=>(delete t.subject.global.locked,n.deleted||(delete t.subject.global.locked,vt(n.newest,!0)),"promise-no-data-ever")))):"no-data-ever"}function Te(e,t){const n=e.subject.global.blocked;for(;n.length>0;){const o=n[0];n.splice(0,1),t=$e(o.ownerSupport,o,o.subject,o.subject.global.insertBefore,!0),e.subject.global.newest=t}return e.subject.global.blocked.length=0,t}const Se=/^\s*{__tagvar/,Be=/}\s*$/,De="ondoubleclick";function Pe(e){return e&&e.search(Se)>=0&&e.search(Be)>=0}function Ne(n,o,r,s,i,a){if(Pe(o))return function(e,t,n,o,r,s){const i=Ee(o,t);return Ae(e,i,n,r,s)}(n,o,r,s,i,a);if(Pe(n)){let o;const l=Ee(s,n).subscribe((n=>{n!==o&&(!function(n,o,r,s,i){if(o&&o!=n)if(typeof o===t.string)r.removeAttribute(o);else if(o instanceof Object)for(const e in o)r.removeAttribute(e);if(typeof n===t.string){if(!n.length)return;return void Ae(n,e,r,s,i)}if(n instanceof Object)for(const e in n)Ae(e,n[e],r,s,i)}(n,o,r,i,a),o=n)}));return i.subject.global.subscriptions.push(l),void r.removeAttribute(n)}return Le(n)?ae(n,o,r):void 0}function Ee(t,n){return t[n.replace("{",e).split(e).reverse().join(e).replace("}",e).split(e).reverse().join(e)]}function Ae(e,t,n,o,r){const s=Le(e);if(t instanceof Function){const o=function(...e){return t(n,e)};n[e].action=o}if(a(t)){let i;n.removeAttribute(e);const a=t=>t instanceof Function?function(e,t,n,o,r,s){const i=e.templater.wrapper,a=i?.parentWrap,l=a?.oneRender;l||(t=function(e,t){if(e.isChildOverride)return e;const n=t.state,o=(o,r)=>je(e,t,o,r,n);return o.tagFunction=e,o}(t,e));return Oe(t,n,o,r,s)}(o,t,n,e,s,r):i===t?i:(i=t,Oe(t,n,e,s,r)),l=t.subscribe(a);o.subject.global.subscriptions.push(l)}else r(n,e,t)}function Oe(e,t,n,o,r){if(e instanceof Function){const o=function(...n){return e(t,n)};return o.tagFunction=e,n===De&&(n="ondblclick"),void(t[n]=o)}if(o)return void ae(n,e,t);if(e)return void r(t,n,e);[void 0,!1,null].includes(e)?t.removeAttribute(n):r(t,n,e)}function Le(e){return e.search(/^(class|style)(\.)/)>=0}function Ie(e,t,n){e.setAttribute(t,n)}function Re(e,t,n){e[t]=n}const Fe="INPUT",Ve="value";function He(e,t,n){const o=e.getAttributeNames();let r=Ie;for(let s=0;s<o.length;++s){const i=o[s];e.nodeName===Fe&&i===Ve&&(r=Re);Ne(i,e.getAttribute(i),e,t,n,r),r=Ie}}const Me=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)'),Je=/__tagvar(\d{1,4})/;const We="undefined"==typeof document?function t(){return{textContent:e,cloneNode:e=>t()}}():document.createTextNode(e);function Ge(e,t,n,o,r,s){const a=o.subject.global.clones;let l=e.lastArray=e.lastArray||{array:[]};e.global.placeholder||function(e,t){const n=t.global.placeholder=We.cloneNode(!1),o=e.parentNode;o.insertBefore(n,e),o.removeChild(e)}(n,e);const c=e.global.placeholder;let u=0;l.array=l.array.filter(((e,n)=>{if(t.length-1<n-u)return Ue(l.array,n,r),++u,!1;const o=t[n-u],s=i(o);let a,c=o,d=o.templater;s?a=c.memory.arrayValue:(d=o,c=d.tag,a=d.arrayValue);const p=!function(e,t){if(e===t)return!0;if(e instanceof Array&&t instanceof Array&&e.length==t.length)return e.every(((e,n)=>e===t[n]));return!1}(a,e.support.templater.tag.memory.arrayValue);return!p||(Ue(l.array,n,r),++u,!1)}));const d=t.length;for(let e=0;e<d;++e){const n=t[e],a=l.array[e],u=a?.support,d=n,p=i(d),g=new ne(void 0);g.lastRun=l.lastRun;let b,f=d.templater;if(p?(f||(f=pe(d)),b=new gt(f,o,g)):(f=d,b=qe(f,o,g)),u){const e=u.subject,t=e.global;fe(b,o,e),b.subject.global=t,t.newest=b}else fe(b,o,g);if(!("arrayValue"in(f.tag||d).memory)){const e={template:b.getTemplate().string,array:t},n="Use html`...`.key(item) instead of html`...` to template an Array";console.error(n,e);throw new y(n,e)}if(l.array.length>e){a.support.subject.global.oldest.updateBy(b)}else Ye(c,b,e,r,l.array,s),l.lastRun=b.subject.lastRun,o.subject.global.childTags.push(b)}return a}function Ye(e,t,n,o,r,s){const i={support:t,index:n};r.push(i);const a={added:o.counts.added+n,removed:o.counts.removed};t.subject.global.placeholder=e;const l=t.buildBeforeElement(void 0,{counts:a}),c=e;c.parentNode.insertBefore(l,c)}function qe(e,t,n){const o=be(e,t,n);return W(o,o,n,t),o}function Ue(e,t,n){const o=e[t];K(o.support,n.counts),o.deleted=!0,++n.counts.removed}function ze(e,t){const n=t.parentNode,o=document.createTextNode(e);return n.insertBefore(o,t),n.removeChild(t),o}function Xe(t){return[void 0,!1,null].includes(t)?e:t}function Ke(e,t,n){t.global.insertBefore=n;const o=t.global.placeholder||n;if(t.lastValue===e&&"lastValue"in t)return;t.lastValue=e;const r=Xe(e),s=t.global.placeholder;if(s)return void(s.textContent=r);const i=ze(r,o);t.global.placeholder=i}function Qe(e,n,o,r,s,i){switch(Q(e)){case t.templater:return void de(e,r,n);case t.tag:const a=e;let l=a.templater;return l||(l=pe(a)),void de(l,r,n);case t.tagArray:return Ge(n,e,o,r,s,i);case t.tagComponent:return he(e,n,o,r,s);case t.function:const c=e;if(c.oneRender){const e=function(e,n,o){const r=new te([]);r.tagJsType=t.oneRender;const s=be(r,o,n),i=()=>(r.tag=e(),s);return r.wrapper=i,i.parentWrap=i,i.oneRender=!0,i.parentWrap.original=e,s}(c,n,r);return W(e,e,n,r),void de(e.templater,r,n)}}!function(e,t,n,o){t.lastValue=e;const r=ze(Xe(e),n);t.global.placeholder=r}(e,n,n.global.placeholder||o)}function Ze(e){const t=We.cloneNode(!1),n=e.parentNode;return n.insertBefore(t,e),n.removeChild(e),t}function et(e,n,o,s){const a=Q(n);!function(e,n,o,s){const i=e,a="lastValue"in i,l=i.lastValue;if(a&&l!==n){const e=typeof n;return(!X(e)||typeof l!==e)&&!(n instanceof Function&&l instanceof Function)&&(function(e){delete e.lastValue}(i),"changed-simple-value")}const c=e,u=c.lastArray;if(u&&s!==t.tagArray){delete c.lastArray;for(let e=u.array.length-1;e>=0;--e){const{support:t}=u.array[e];K(t,{added:0,removed:0})}return"array"}const d=e.support;if(d){const o=r(n);return r(e._value)&&o?!V(n,d)&&(z(d),2):s!==t.tagComponent&&(!n||!n.oneRender)&&(z(d),"different-tag")}}(e,n,0,a);if(a===t.tagComponent)return function(e,t,n,o){if(!t.support)return he(e,t,n,o,{counts:{added:0,removed:0}}),t;const r=new gt(e,o,t),s=t.support,i=s.subject.global.newest;if(!i)return he(e,t,n,o,{counts:{added:0,removed:0}}),t;{const e=i.state;r.state.length=0,r.state.push(...e)}return t.global=s.subject.global,t.support=r,$e(o,r,t,n),t}(n,e,s,o);if(e.support)return a===t.function||function(e,n,o){const r=e.support;let s=n;const a=i(n);if(a){const e=n;s=e.templater,s||(s=new te([]),s.tag=e,e.templater=s)}const l=new gt(s,o,e),c=n&&V(r,l);(function(e){return e?.tagJsType===t.templater})(n)&&fe(l,o,e);if(c)return void r.updateBy(l);if(c)return de(s,o,e);Ke(n,e,e.global.insertBefore)}(e,n,o),e;switch(a){case t.tagArray:return Ge(e,n,s,o,{counts:{added:0,removed:0}}),e;case t.templater:return de(n,o,e),e;case t.tag:const r=n;let i=r.templater;return i||(i=ge(),r.templater=i,i.tag=r),de(i,o,e),e;case t.subject:return n;case t.function:return e.global.placeholder||(e.global.placeholder=Ze(s)),e}return Ke(n,e,s),e}function tt(e,t,n,o,r){if(!t.hasAttribute("end"))return;const s=n[t.getAttribute("id")];s.global.insertBefore=t,function(e,t,n,o,r){let s=!1;n.global.placeholder||(n.global.placeholder=Ze(t));let i=i=>{s?et(n,i,o,t):(Qe(i,n,t,o,{counts:{...r}},a?e:void 0),s=!0)},a=!0;const l=n.subscribe((e=>i(e)));a=!1,o.subject.global.subscriptions.push(l)}(e,t,s,o,r)}function nt(t,n,o,r){if(!t.getAttribute)return;"TEXTAREA"===t.nodeName&&function(t,n,o){const r=t.value;if(r.search(Me)>=0){const s=r.match(Je),i="{"+(s?s[0]:e)+"}";t.value=e,t.setAttribute("text-var-value",i);const a=(e,n,o)=>t.value=o;Ne("text-var-value",i,t,n,o,a)}}(t,o,r);let s=n.counts.added;s=function(e,t){const n=e.oninit;if(!n)return t.added;const o=n.tagFunction;if(!o)return t.added;const r=o.tagFunction;return r?(r({target:e,stagger:t.added}),++t.added):t.added}(t,n.counts)-s;t.focus&&(t.hasAttribute("autofocus")&&t.focus(),t.hasAttribute("autoselect")&&t.select());const i=t.children;if(i)for(let e=i.length-1;e>=0;--e){nt(i[e],{...n,counts:n.counts},o,r)}}function ot(e,t,n,o,r){const s=n.counts,i=[];for(let a=o.length-1;a>=0;--a){const l=o[a];if(tt(r,l,e,t,s),l.children)for(let o=l.children.length-1;o>=0;--o){const a=l.children[o];rt(a)&&tt(r,a,e,t,s);const c=ot(e,t,n,a.children,r);i.push(...c)}}return i}function rt(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")}function st(e,t,n,o,r,s){const i=[],a=o.interpolation,l=t.content.children;if(a.keys.length){const t=ot(n,r,s,l,e);i.push(...t)}return He(t,n,r),it(l,n,r),i}function it(e,t,n){for(let o=e.length-1;o>=0;--o){const r=e[o];He(r,t,n),r.children&&it(r.children,t,n)}}const at=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;function lt(e){const t=function(e){const t=[],n=e.replace(at,((e,n)=>{if(e.startsWith("<"))return e;const o=n.substring(1,n.length-1);return t.push(o),ct+o+ut}));return{string:n,keys:t}}(e);return t.string=t.string.replace(q,G),t}const ct='<template interpolate end id="',ut='"></template>';const dt=new RegExp(G,"g");class pt{templater;subject;isApp=!0;appElement;strings;values;propsConfig;state=[];hasLiveElements=!1;constructor(e,t,n){this.templater=e,this.subject=t;const o=e.props;this.propsConfig=this.clonePropsBy(o,n)}clonePropsBy(e,t){const n=this.templater.children.value,o=e.map((e=>A(e)));return this.propsConfig={latest:e,latestCloned:o,castProps:t,lastClonedKidValues:n.map((e=>Z(e.values)))}}buildBeforeElement(e=document.createDocumentFragment(),t={counts:{added:0,removed:0}}){const n=this.subject,o=this.subject.global;o.oldest=this,o.newest=this,n.support=this,this.hasLiveElements=!0;const r=this.update(),s=this.getTemplate(),i=document.createElement("template");return i.innerHTML=s.string,st(e,i,r,s,this,{counts:t.counts}),function(e,t,n,o,r){const s=function(e,t){const n=[];let o=t.content.firstChild;for(;o;){const t=o.nextSibling;e.appendChild(o),n.push(o),o=t}return n}(e,t);if(!s.length)return s;const i=n.subject.global;for(let e=s.length-1;e>=0;--e)nt(s[e],r,o,n);i.clones.push(...s)}(e,i,this,r,t),e}getTemplate(){const t=this.templater.tag,n=this.strings||t.strings,o=this.values||t.values,r=this.subject.lastRun;if(r&&r.strings.length===n.length){const e=r.strings.every(((e,t)=>e===n[t]));if(e&&r.values.length===o.length)return r}const s=lt(n.map(((t,n)=>t.replace(dt,Y)+(o.length>n?"{"+G+n.toString()+"}":e))).join(e)),i={interpolation:s,string:s.string,strings:n,values:o};return this.subject.lastRun=i,i}update(){return this.updateContext(this.subject.global.context)}updateContext(e){const n=this.templater.tag,o=this.strings||n.strings,r=this.values||n.values;return o.forEach(((n,o)=>function(e,n,o,r){const s=e.length>n;if(!s)return;const i=G+n,l=e[n],c=i in o;if(c){if(r.subject.global.deleted){const e=l&&l.support;if(e)return e.destroy(),o}return function(e,t,n){const o=e[t];a(n)||o.next(n)}(o,i,l)}o[i]=function(e,n){switch(Q(e)){case t.tagComponent:return new ne(e);case t.templater:return re(e.tag,n);case t.tag:return re(e,n);case t.subject:return e.global=oe(),e}return new ne(e)}(l,r)}(r,o,e,this))),e}updateBy(e){const t=e.templater.tag;this.updateConfig(t.strings,t.values)}updateConfig(e,t){this.strings=e,this.updateValues(t)}updateValues(e){return this.values=e,this.updateContext(this.subject.global.context)}destroy(e={stagger:0}){const t=this.subject.global,n=e.byParent?[]:ee(this.subject.global.childTags);s(this.templater)&&(t.destroy$.next(),J(this,this)),this.destroySubscriptions();for(let e=n.length-1;e>=0;--e){const t=n[e],o=t.subject.global;delete o.newest,o.deleted=!0,s(t.templater)&&J(t,t),t.destroySubscriptions()}bt(this);const{stagger:o,promises:r}=this.smartRemoveKids(e);return e.stagger=o,r.length?Promise.all(r).then((()=>e.stagger)):e.stagger}smartRemoveKids(e={stagger:0}){const t=e.stagger,n=[],o=this.subject.global.clones;this.subject.global.childTags.forEach((t=>{let r=t.subject.global.clones[0];if(void 0===r){const{stagger:o,promises:r}=t.smartRemoveKids(e);return e.stagger=e.stagger+o,void n.push(...r)}let s=0;for(;r.parentNode&&s<5;){if(o.includes(r))return;r=r.parentNode,++s}const{stagger:i,promises:a}=t.smartRemoveKids(e);e.stagger=e.stagger+i,n.push(...a)}));const r=this.destroyClones({stagger:t}).promise;return this.subject.global.clones.length=0,this.subject.global.childTags.length=0,r&&n.unshift(r),{promises:n,stagger:e.stagger}}destroyClones(e={stagger:0}){const t=this.subject.global.clones.map((t=>this.checkCloneRemoval(t,e.stagger))).filter((e=>e));return t.length?{promise:Promise.all(t),stagger:e.stagger}:{stagger:e.stagger}}checkCloneRemoval(e,t){let n;const o=e;if(o.ondestroy&&(n=function(e,t){const n=e.ondestroy;if(!n)return;const o=n.tagFunction;if(!o)return;const r=o.tagFunction;if(!r)return;return r({target:e,stagger:t})}(o,t)),n instanceof Promise)return n.then((()=>{const t=e.parentNode;t&&t.removeChild(e)}));const r=e.parentNode;r&&r.removeChild(e);const s=this.ownerSupport;if(s){const t=s.subject.global.clones,n=t.indexOf(e);n>=0&&t.splice(n,1)}return n}destroySubscriptions(){const e=this.subject.global.subscriptions;for(let t=e.length-1;t>=0;--t)e[t].unsubscribe();e.length=0}}class gt extends pt{templater;ownerSupport;subject;version;isApp=!1;constructor(e,t,n,o,r=0){super(e,n,o),this.templater=e,this.ownerSupport=t,this.subject=n,this.version=r}getAppSupport(){let e=this;for(;e.ownerSupport;)e=e.ownerSupport;return e}}function bt(e){const t=e.subject.global;t.context={},delete t.oldest,delete t.newest;delete e.subject.support}function ft(e,t={byParent:!1,stagger:0}){const n=e.subject.global;n.deleted=!0,n.context={};const o=ee(n.childTags);e.destroySubscriptions(),o.forEach((e=>{const t=e.subject.global;delete t.newest,t.deleted=!0})),e.smartRemoveKids(),e.subject.global.clones.length=0,e.subject.global.childTags.length=0,bt(e),o.forEach((e=>ft(e,{byParent:!0,stagger:0})))}function ht(e,t,n,o){const r=t?.templater,s=r?.tag?.strings,i=W(e,t,n,o);if(!t||V(t,i)){if(t){const e=s?.length,n=i.templater.tag?.strings.length;e!==n&&ft(t)}}else!function(e,t,n){const o=t.subject.global;!function(e,t){const n=e.subject.global;n.providers.forEach((e=>{e.children.forEach(((o,r)=>{if(n.destroy$===o.subject.global.destroy$)return e.children.splice(r,1),void e.children.push(t)}))}))}(e,t),ft(e),delete o.deleted,o.oldest=t,o.newest=t,n.support=t}(t,i,n);const a=t?.ownerSupport;return i.ownerSupport=o||a,i}function mt(e,t){let n=!1;const o=function(e,t,n=[]){n.push({support:e,renderCount:e.subject.global.renderCount,provider:t});const o=t.children;for(let e=o.length-1;e>=0;--e)n.push({support:o[e],renderCount:o[e].subject.global.renderCount,provider:t});return n}(e,t);for(let e=o.length-1;e>=0;--e){const{support:t,renderCount:r,provider:s}=o[e];if(t.subject.global.deleted)continue;r===t.subject.global.renderCount&&(n=!0,s.clone=A(s.instance),vt(t.subject.global.newest,!1))}return n}function yt(e,t,n,o){const r=o.support,s=o.global;t.subject.global=s;const i=s.renderCount;!function(e){const t=e.subject.global.providers.filter((e=>!L(e.instance,e.clone)));let n=!1;for(let e=t.length-1;e>=0;--e){const o=t[e];mt(o.owner,o)&&(n=!0),o.clone=A(o.instance)}}(e);const a=s.newest;if(i!==s.renderCount)return e.subject.global.oldest.updateBy(a),a;const l=ht(t,a||r||s.oldest,o,n),c=s.oldest||e;return V(a,l)&&(o.support=l,c.updateBy(l)),l}function vt(e,t){const n=e.subject.global,o=e.templater;if(!o.wrapper){const t=e.ownerSupport;return++n.renderCount,t.subject.global.deleted?e:vt(t.subject.global.newest,!0)}if(e.subject.global.locked)return e.subject.global.blocked.push(e),e;const r=e.subject,s=e.subject.global.oldest;let i,a=!1;if(t&&e&&(i=e.ownerSupport,i)){a=!L(o.props,e.propsConfig.latestCloned)}const l=yt(s,e,i,r);if(i&&a){return vt(i.subject.global.newest,!0),l}return l}function $t(e,t,n,...o){const r=e.state;k(r,n);const s=t(...o);return k(n,r),vt(e,!1),s instanceof Promise&&s.finally((()=>{k(n,r),vt(e,!1)})),s}let wt=e=>(e,t,n,o,r,s)=>{throw new $("Callback function was called immediately in sync and must instead be call async")};const xt=()=>wt,Ct=wt;h({beforeRender:e=>kt(e),beforeRedraw:e=>kt(e),afterRender:e=>{e.subject.global.callbackMaker=!0,wt=Ct}});const jt=new $("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");function kt(e){const t=h.memory.stateConfig.array;wt=n=>(...o)=>e.subject.global.callbackMaker?$t(e,n,t,...o):n(...o)}function _t(e){_(e)}function Tt(e){_((()=>{const t=f();t?.subject.global.destroy$.toCallback(e)}))}function St(e){h.memory.childrenCurrentSupport=e}function Bt(){return h.memory.childrenCurrentSupport.templater.children}h({beforeRender:e=>St(e),beforeRedraw:e=>St(e)});const Dt=[];function Pt(e,...t){return new U(e,t)}function Nt(e,n){const o=h.memory.stateConfig.array;return(r,s,i)=>function(e,n,o,r,s,i){const a=r.subject.global;++a.renderCount;const l=n.children,c=a.oldest?.templater.children.lastArray;c&&(l.lastArray=c);const u=o.original;let d=n.props,p=r.propsConfig.castProps;const g=i?.propsConfig.castProps;g&&(r.propsConfig.castProps=g,p=we(r,i,i.ownerSupport,d));const b=p||me(d,r,e,0);let f=u(...b);f instanceof Function&&(f=f());f&&f.tagJsType===t.tag||(f=Pt`${f}`);f.templater=n,n.tag=f,f.memory.arrayValue=n.arrayValue;const m=new gt(n,r.ownerSupport,s,b,a.renderCount);m.subject.global=a,a.oldest=a.oldest||m;const y=h.memory.stateConfig.array;if(m.state.push(...y),n.madeChildIntoSubject){const e=l.value;for(let t=e.length-1;t>=0;--t){const n=e[t],o=n.values;for(let e=o.length-1;e>=0;--e){const t=o[e];if(!(t instanceof Function))continue;const r=n.values[e];r.isChildOverride||(n.values[e]=function(...e){return je(t,m.ownerSupport,this,e,m.state)},r.isChildOverride=!0)}}}return m}(o,e,n,r,s,i)}let Et=0;function At(e){const n=function(...e){const o=new te(e);o.tagJsType=t.tagComponent;const r=Nt(o,n);return r.parentWrap||(r.parentWrap=n),o.tagged=!0,o.wrapper=r,o};n.original=e,n.compareTo=e.toString();const o=e;return n.isTag=!0,n.original=o,o.tags=Dt,o.setUse=h,o.tagIndex=Et++,Dt.push(n),n}At.oneRender=(...e)=>{throw new Error("Do not call function tag.oneRender but instead set it as: `(props) => tag.oneRender = (state) => html`` `")},At.route=e=>{throw new Error("Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")},At.app=e=>{throw new Error("Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")},Object.defineProperty(At,"oneRender",{set(e){e.oneRender=!0}});const Ot=[];function Lt(e,t,n){const o=Ot.findIndex((e=>e.element===t));o>=0&&(Ot[o].support.destroy(),Ot.splice(o,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const r=e(n),s=document.createElement("template"),i=We.cloneNode(!1),a=function(e,t,n){let o={};const r=new ne(o);o=new pt(e,r),r.global.insertBefore=t,r.global.placeholder=n,r.global.oldest=r.global.oldest||o,r.next(e),r.support=o,H(o,void 0);const s=e.wrapper,i=s(o,r);return M(o,i),i}(r,s,i),l=a.subject.global;a.appElement=t,a.isApp=!0,l.isApp=!0,t.destroy=()=>{a.destroy()},l.insertBefore=i,l.placeholder=i;const c=a.buildBeforeElement(void 0);return a.subject.global.oldest=a,a.subject.global.newest=a,t.setUse=e.original.setUse,Ot.push({element:t,support:a}),t.appendChild(c),{support:a,tags:e.original.tags}}const It={tagElement:Lt,renderWithSupport:ht,renderSupport:vt,renderTagOnly:W},Rt=At((()=>{let e=N("a")((t=>[e,e=t])),t=N(!0)((e=>[t,t=e]));return Pt`
    <input onchange=${t=>e=t.target.value} placeholder="a b or c" />
    <select id="select-sample-drop-down">
      ${["a","b","c"].map((t=>Pt`
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
  `})),Ft=At((()=>{const e=_((()=>new b(0))),t=_((()=>new b(1)));let n=N(0)((e=>[n,n=e]));return++n,Pt`
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
    <div style="display:flex;flex-wrap:wrap;gap:1em">
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
        <span id="content-combineLatest-pipe-display1">${c([e,t]).pipe((e=>e[1]))}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest piped html</legend>
        <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span> ===
        <span id="content-combineLatest-pipeHtml-display1">${c([e,t]).pipe(function(e){return(t,n)=>{n.setHandler((()=>{})),e(t).then((e=>n.next(e)))}}((e=>Promise.resolve(Pt`<b>bold 77</b>`))))}</span>
      </fieldset>
    </div>
    (render count ${n})
  `})),Vt=At((()=>{let e=N(!0)((t=>[e,e=t]));return Pt`
    <div style="max-height: 800px;overflow-y: scroll;">
      <table cellPadding=${5} cellSpacing=${5} border="1">
        <thead style="position: sticky;top: 0;">
          <tr>
            <th>hello</th>
            <th>hello</th>
            ${e&&Pt`
              <td>hello 2 thead cell</td>
            `}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>world</td>
            <td>world</td>
            ${e&&Pt`
              <td>world 2 tbody cell</td>
            `}
          </tr>
        </tbody>
      </table>
    </div>
  `})),Ht=3e3,Mt=6e3,Jt=At((()=>{let e=N(0)((t=>[e,e=t])),t=N(void 0)((e=>[t,t=e])),n=N(void 0)((e=>[n,n=e])),o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e]));const s=xt(),i=()=>++e,a=()=>{console.info("🟢 interval test 0 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=Ht&&(r=0)})),500),console.info("▶️ interval started"),t=setInterval(s((()=>{i()})),Ht)},l=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🛑 interval test 0 stopped")};return _t(a),Tt(l),++o,Pt`<!--intervalDebug.js-->
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
  `})),Wt=At((()=>{let e=N(0)((t=>[e,e=t])),t=N(void 0)((e=>[t,t=e])),n=N(void 0)((e=>[n,n=e])),o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e]));const s=xt(),i=()=>++e;const a=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🔴 interval 1 stopped")};function l(){if(t)return a();console.info("🟢 interval test 1 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=Mt&&(r=0)})),500),t=setInterval(s((()=>{i(),console.info("slow interval ran")})),Mt)}return _t(l),Tt(a),++o,Pt`
    <div>interval type 2 with ${Mt}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${Mt} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${l}
      style.background-color=${t?"red":"green"}
    >start/stop</button>
  `}));const Gt=async({target:e,stagger:t,staggerBy:n,fxName:o="fadeInDown"})=>{e.style.opacity="0",t&&await qt(t*n),e.style.opacity="1",e.classList.add("animate__animated","animate__"+o)},Yt=async({target:e,stagger:t,capturePosition:n=!0,fxName:o="fadeOutUp",staggerBy:r})=>{n&&function(e){e.style.zIndex=e.style.zIndex||1;const t=e.offsetTop+"px",n=e.offsetLeft+"px",o=e.clientWidth+(e.offsetWidth-e.clientWidth)+1+"px",r=e.clientHeight+(e.offsetHeight-e.clientHeight)+1+"px";setTimeout((()=>{e.style.top=t,e.style.left=n,e.style.width=o,e.style.height=r,e.style.position="absolute"}),0)}(e),t&&await qt(t*r),e.classList.add("animate__animated","animate__"+o),await qt(1e3),e.classList.remove("animate__animated","animate__"+o)};function qt(e){return new Promise((t=>{setTimeout(t,e)}))}const{in:Ut,out:zt}=function({fxIn:e,fxOut:t,staggerBy:n=300}){return{in:t=>Gt({fxName:e,staggerBy:n,...t}),out:e=>Yt({fxName:t,staggerBy:n,capturePosition:!0,...e})}}({fxIn:"fadeInDown",fxOut:"fadeOutUp"}),Xt=At((()=>{let e=N("tagJsDebug.js")((t=>[e,e=t])),t=N(!1)((e=>[t,t=e])),n=N(0)((e=>[n,n=e]));return++n,Pt`<!-- tagDebug.js -->
    <div style="display:flex;flex-wrap:wrap;gap:1em">    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${()=>t=!t}
        >hide/show</button>

        ${t&&Pt`
          <div oninit=${Ut} ondestroy=${zt}>
            <div>${Jt()}</div>
            <hr />
            <div>${Wt()}</div>
          </div>
        `}
      </fieldset>
    </div>
  `})),Kt=At((({renderCount:e,name:t})=>Pt`<div><small>(${t} render count <span id=${t+"_render_count"}>${e}</span>)</small></div>`)),Qt=At(((e="tagSwitchDebug")=>{let t=N(null)((e=>[t,t=e])),n=N(0)((e=>[n,n=e]));let o="select tag below";switch(t){case null:o="null, select tag below";break;case"":o=Pt`<div id="empty-string-1"></div>`;break;case"1":o=en({title:"value switch"});break;case"2":o=tn({title:"value switch"});break;case"3":o=nn({title:"value switch"})}let r=Pt`<div id="select-tag-above">select tag above</div>`;switch(t){case null:r=Pt`<div id="select-tag-above">null, select tag above</div>`;break;case"":r=Pt`<div id="select-tag-above">empty-string, select tag above</div>`;break;case"1":r=en({title:"tag switch"});break;case"2":r=tn({title:"tag switch"});break;case"3":r=nn({title:"tag switch"})}return++n,Pt`
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
        <div>${"3"===t?nn({title:"ternary simple"}):en({title:"ternary simple"})}</div>
      </div>

      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${Zt({selectedTag:t})}</div>
      </div>

      <div id="arraySwitching-test-wrap" style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div id="arraySwitching-wrap">${on({selectedTag:t})}</div>
      </div>
    </div>
    ${Kt({renderCount:n,name:"tagSwitchDebug"})}
  `})),Zt=At((({selectedTag:e})=>Pt`
    <div id="ternaryPropTest-wrap">
      ${e}:${"3"===e?nn({title:"ternaryPropTest"}):en({title:"ternaryPropTest"})}
    </div>
  `)),en=At((({title:e})=>{let t=N(0)((e=>[t,t=e])),n=N(0)((e=>[n,n=e]));return++n,Pt`
    <div id="tag1" style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Kt({renderCount:n,name:"tag1"})}
    </div>
  `})),tn=At((({title:e})=>{let t=N(0)((e=>[t,t=e])),n=N(0)((e=>[n,n=e]));return++n,Pt`
    <div id="tag2" style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Kt({renderCount:n,name:"tag1"})}
    </div>
  `})),nn=At((({title:e})=>{let t=N(0)((e=>[t,t=e])),n=N(0)((e=>[n,n=e]));return++n,Pt`
    <div  id="tag3" style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Kt({renderCount:n,name:"tag1"})}
    </div>
  `})),on=At((({selectedTag:e})=>{switch(e){case void 0:return Pt`its an undefined value`;case null:return Pt`its a null value`;case"":return Pt``;case"1":return Pt`${en({title:`tag ${e}`})}`;case"2":return Pt`${["b","c"].map((t=>Pt`${tn({title:`array ${e} ${t}`})}`.key(t)))}`;case"3":return Pt`${["d","e","f"].map((t=>Pt`${nn({title:`array ${e} ${t}`})}`.key(t)))}`}return Pt`nothing to show for in arrays`})),rn=At((()=>{const e=sn();return Pt`
    <fieldset>
      <legend>counter0</legend>
      ${e}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${e}
    </fieldset>
  `})),sn=()=>{let e=N(0)((t=>[e,e=t]));return Pt`
    counter:<span>🪞<span id="mirror-counter-display">${e}</span></span>
    <button id="mirror-counter-button" onclick=${()=>++e}>${e}</button>
  `},an=At(((e,t)=>{let n=N(0)((e=>[n,n=e])),o=N(0)((e=>[o,o=e]));return++n,Pt`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div style="border:2px solid purple;">${Bt()}</div>
      <div>isSubjectInstance:${a(Bt())}</div>
      <div>isSubjectTagArray:${l(Bt().value)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${()=>++o}>increase innerHtmlTest ${o}</button>
      <span id="innerHtmlTest-counter-display">${o}</span>
      ${Kt({renderCount:n,name:"innerHtmlTest"})}
    </fieldset>
  `})),ln=At((e=>{let t=N(0)((e=>[t,t=e])),n=N(0)((e=>[n,n=e]));return++t,Pt`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${e}</legend>
      ${Bt()}
      <button id="innerHtmlPropsTest-button" onclick=${()=>++n}
      >increase innerHtmlPropsTest ${n}</button>
      <span id="innerHtmlPropsTest-display">${n}</span>
      ${!1}
    </fieldset>
  `})),cn=At(((e,t)=>Pt`
  <fieldset>
    <legend>xxxxx</legend>  
    <div>hello other world ${e} - ${t}</div>
    <div style="border:2px solid red;">***${Bt()}***</div>
  </fieldset>
`)),un=At(((e="childTests")=>(e=N(0)((t=>[e,e=t])),t=N(0)((e=>[t,t=e])))=>Pt`
  <fieldset id="children-test" style="flex:2 2 20em">
    <legend>childTests</legend>

    <hr />
    <hr />
    <hr />
    ${cn(1,2).html`
      <div><hr />abc-123-${Date.now()}<hr /></div>
    `}
    <hr />
    <hr />
    <hr />
    
    ${an({},2).html`
      <b>Field set body A</b>
      <hr />
      <button id="innerHtmlTest-childTests-button"
        onclick=${()=>++t}
      >🐮 (A) increase childTests inside ${t}:${e}</button>
      <span id="innerHtmlTest-childTests-display">${t}</span>
      ${Kt({renderCount:e,name:"childTests-innerHtmlTest"})}
    `}

    ${ln(22).html`
      <b>Field set body B</b>
      <hr />
      <button id="innerHtmlPropsTest-childTests-button"
        onclick=${()=>++t}
      >🐮 (B) increase childTests inside ${t}</button>
      <span id="innerHtmlPropsTest-childTests-display">${t}</span>
      ${Kt({renderCount:e,name:"innerHtmlPropsTest child"})}
    `}

    ${function({child:e}){return Pt`
    <fieldset>
      <legend>child as prop</legend>
      ${e}
    </fieldset>
  `}({child:Pt`
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
    ${Kt({renderCount:e,name:"childTests"})}
  </fieldset>
`));var dn=n(435);const pn=At((({label:e,memory:t})=>{let n=N(!1)((e=>[n,n=e])),o=N(!1)((e=>[o,o=e]));return Pt`
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
  `})),gn=Date.now(),bn=At((({appCounterSubject:e})=>(t=_((()=>Date.now())))=>{_("countersDebug state");let n=N(0)((e=>[n,n=e])),o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e])),s=N(0)((e=>[s,s=e])),i=_((()=>({counter:0})));const a=xt(),l=_((()=>new p(n))),c=_((()=>new b("222"))),u=p.all([c,l]).pipe(function(e){const t=f();if(!t)throw jt;const n=h.memory.stateConfig.array;return(...o)=>t.subject.global.callbackMaker?$t(t,e,n,...o):e(...o)}((e=>n))),d=P.all([c,l]).pipe((e=>n));_t((()=>{++s,console.info("countersDebug.ts: 👉 i should only ever run once"),l.subscribe(a((e=>{n=e})))}));const g=()=>{++n,c.next("333-"+n)},m=()=>++o;++r;return Pt`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${Pt`
        <div>👉 Subscriptions:<span id="👉-counter-sub-count">${p.globalSubCount$}</span></div>
        <button onclick=${()=>console.info("subs",p.globalSubs)}>log subs</button>
        <div>initCounter:${s}</div>
    
        <div>
          <button id="app-counter-subject-button"
            onclick=${()=>e.next((e.value||0)+1)}
          >🍒 ++app subject</button>
          <span>
            🍒 <span id="app-counter-subject-display">${e.value}</span>
          </span>
        </div>

        <div>
          <button id="standalone-counter"
            onclick=${g}
          >stand alone counters:${n}</button>
          <span>
            🥦 <span id="standalone-display">${n}</span>
          </span>
        </div>
    
        ${n>1&&Pt`
          <div>
            <button id="conditional-counter"
              onclick=${g}
            >conditional counter:${n}</button>
            <span>
              🥦 <span id="conditional-display">${n}</span>
            </span>
          </div>
        `}

        <input id="set-main-counter-input"
          onkeyup=${e=>n=Number(e.target.value)||0}
        />

        <div>
          <button id="❤️-increase-counter"
            onclick=${m}
          >❤️ propCounter:${o}</button>
          <span>
            ❤️ <span id="❤️-counter-display">${o}</span>
            </span>
        </div>

        <div>
          <button id="🥦-subject-increase-counter"
            onclick=${()=>l.next(n+1)}
          >subject increase:</button>
          <span>
            🥦 <span id="🥦-subject-counter-display">${n}</span>
            🥦 <span id="subject-counter-subject-display">${l}</span>
          </span>
        </div>
      `}
    </div>

    <fieldset>
      <legend>🪈 pipedSubject 1</legend>
      <div>
        <small>
          <span id="🪈-pipedSubject">${u}</span>
        </small>
      </div>
    </fieldset>

    <fieldset>
      <legend>🪈 pipedSubject 2</legend>
      <div>
        <small>
          <span id="🪈-pipedSubject-2">${d}</span>
        </small>
      </div>
    </fieldset>

    ${Pt`
      <fieldset>
        <legend>shared memory</legend>
        <div class.bold.text-blue=${!0} style="display:flex;flex-wrap:wrap;gap:.5em">
          ${pn({label:"a-a-😻",memory:i})}
          ${pn({label:"b-b-😻",memory:i})}
        </div>
        memory.counter:😻${i.counter}
        <button onclick=${()=>++i.counter}>increase 😻</button>
      </fieldset>
    `}
    
    ${Pt`
      <fieldset>
        <legend>inner counter</legend>
        ${fn({propCounter:o,increasePropCounter:m})}
      </fieldset>
    `}
    ${Kt({renderCount:r,name:"counters"})}
    <div style="font-size:0.8em;opacity:0.8">
      ⌚️ page load to display in&nbsp;<span oninit=${e=>e.target.innerText=(Date.now()-gn).toString()}>-</span>ms
    </div>
    <div style="font-size:0.8em;opacity:0.8">
      ⌚️ read in&nbsp;<span oninit=${e=>e.target.innerText=(Date.now()-t).toString()}>-</span>ms
    </div>
  `})),fn=At((({propCounter:e,increasePropCounter:t})=>{let n=N(0)((e=>[n,n=e]));return++n,Pt`
    <button id="❤️-inner-counter" onclick=${t}
    >❤️ propCounter:${e}</button>
    <span>
      ❤️ <span id="❤️-inner-display">${e}</span>
    </span>
    <div>renderCount:${n}</div>
    ${Kt({renderCount:n,name:"inner_counters"})}
  `}));class hn{constructor(){this.tagDebug=0,this.showDialog=!1}}const mn=()=>({counter:0});function yn(){return{upper:R(vn),test:0}}function vn(){return{name:"upperTagDebugProvider",test:0}}const $n=At(((e="providerDebugBase")=>{R(mn);const t=R(hn),n=R(yn);N("props debug base");let o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e]));return t.showDialog&&document.getElementById("provider_debug_dialog").showModal(),++r,Pt`
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
      ${jn({propCounter:o,propCounterChange:e=>{o=e}})}
    </div>

    <hr />
    renderCount outer:<span name="render_count_outer">${r}</span>
    ${Kt({renderCount:r,name:"providerDebugBase"})}

    ${Cn(t)}

    TODOTODOTODOTODO
    ${!1}
  `})),wn=(At((()=>(e=F(vn))=>Pt`
  <div>
    <button id="increase-provider-switch-🌹-0-button" onclick=${()=>++e.test}
    >🌹 increase switch.provider.test ${e.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-0-display">${e.test}</span>
    </span>
  </div>
  <hr />
  <div>statue:${e.test%2==0?"off":"on"}</div>
  ${wn()}
  <hr />
  ${e.test%2==0?null:xn()}
`)),At((()=>(e=F(vn))=>e.test%2==0?null:Pt`
  <div>
    <button id="increase-provider-switch-🌹-1-button" onclick=${()=>++e.test}
    >🌹 increase switch.provider.test ${e.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-1-display">${e.test}</span>
    </span>
  </div>
`))),xn=At((()=>(e=F(vn))=>Pt`
  <div>
    <button id="increase-provider-switch-🌹-2-button" onclick=${()=>++e.test}
    >🌹 increase switch.provider.test ${e.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-2-display">${e.test}</span>
    </span>
  </div>
`)),Cn=At((e=>Pt`
  <dialog id="provider_debug_dialog" style="padding:0"
    onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
    ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
    ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
    ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
    onclose=${()=>e.showDialog=!1}
  >
    <div style="padding:.25em" onmousedown="this.parentNode.draggable=true"
    >dialog title</div>
    ${e.showDialog?Pt`
      <textarea wrap="off">${JSON.stringify(e,null,2)}</textarea>
    `:"no dialog"}
    <div style="padding:.25em">
      <button type="button" onclick="provider_debug_dialog.close()">🅧 close</button>
    </div>
  </dialog>
`)),jn=At((({propCounter:e,propCounterChange:t})=>{const n=F(mn),o=F(yn),r=F(hn),s=F(vn);let i=N(!1)((e=>[i,i=e])),a=N(0)((e=>[a,a=e]));const l=xt(),c=_((()=>new p));return _t((()=>{console.info("providerDebug.ts: 👉 👉 i should only ever run once"),c.subscribe((e=>{l((t=>{o.test=e}))()}))})),++a,Pt`<!--providerDebug.js-->
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
        onclick=${()=>c.next(o.test+1)}
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
    
    ${i&&Pt`
      <div oninit=${Ut} ondestroy=${zt}>
        <hr />
        <h3>Provider as Props</h3>
        ${kn(r)}
      </div>
    `}

    <div>
      renderCount inner:${a}
      ${Kt({renderCount:a,name:"providerDebugInner"})}
    </div>
  `})),kn=At((e=>Pt`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(e,null,2)}</textarea>
  `)),_n=At((()=>(e=N(0)((t=>[e,e=t])),t=N(0)((e=>[t,t=e])),n=T([e],(()=>++t)),o=N(0)((e=>[o,o=e])),r=T.noInit([e],(()=>++o)),s=N(0)((e=>[s,s=e])),i=T.asSubject([e],(()=>++s)),a=N(!1)((e=>[a,a=e])),l=N(0)((e=>[l,l=e])),c=T.truthy([a],(()=>++l)),u=N(0)((e=>[u,u=e])),d=T.truthy.asSubject([a],(()=>(++u,a))).pipe((e=>void 0===e?"undefined":u)))=>Pt`
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
  </fieldset>`)),Tn=()=>At.oneRender=(e=new b(0),t=N(0)((e=>[t,t=e])))=>{++t;return Pt`
    ${p.all([0,"all",4]).pipe((e=>JSON.stringify(e)))}elias
    <span>👍<span id="👍-counter-display">${e}</span></span>
    <button type="button" id="👍-counter-button"
      onclick=${()=>++e.value}
    >++👍</button>
    ${Kt({renderCount:t,name:"oneRender_tag_ts"})}
    <hr />
    ${Sn()}
  `},Sn=At((()=>(e=N(0)((t=>[e,e=t])),t=P(0),n=N(0)((e=>[n,n=e])))=>(++n,Pt`
  <span>👍🔨 sub counter-subject-display:<span id="👍🔨-counter-subject-display">${t}</span></span>
  <br />
  <span>👍🔨 sub counter<span id="👍🔨-counter-display">${e}</span></span>
  <br />
  <button type="button" id="👍🔨-counter-button"
    onclick=${()=>{t.next(++e)}}
  >++👍👍</button>
  ${Kt({renderCount:n,name:"insideMultiRender"})}
`))),Bn={function:()=>++Bn.count,count:0},Dn=At((()=>(e=N([])((t=>[e,e=t])),t=N(0)((e=>[t,t=e])),n=(()=>++t),o=N(0)((e=>[o,o=e])),r=N(!0)((e=>[r,r=e])),s=N("a")((e=>[s,s=e])),i=++o,a=(t=>{e=e.map((e=>e)),e.push("string"==typeof t?t:"push"+e.length)}),l=(t=>e=e.filter((e=>e!==t))))=>Pt`
  <button id="fun-parent-button" onclick=${n}>🤰 ++parent</button>
  <span id="fun_in_prop_display">${t}</span>
  ${Kt({renderCount:o,name:"funInProps_tag_parent"})}
  <div>
    <strong>🆎 main:</strong><span id="main_wrap_state">${Bn.function.toCall?"taggjedjs-wrapped":"nowrap"}</span>:${Bn.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${()=>r=!r}>toggle child</button>
  array length: ${e.length}
  <button onclick=${a}>reset add</button>
  <hr />
  ${r&&Nn({myFunction:n,array:e,addArrayItem:a,deleteItem:l,child:{myChildFunction:n}},Bn,n)}
  ${Pn(a)}
`)),Pn=At((e=>(t=N(0)((e=>[t,t=e])),n=++t,o=(t=>{if("Enter"===t.key){const n=t.target.value.trim();e(n),t.target.value=""}}))=>Pt`
  <input type="text" onkeydown=${o} onchange=${t=>{e(t.target.value),t.target.value=""}} />
  <button type="button" onclick=${e}>add by outside</button>
  ${Kt({renderCount:t,name:"addArrayComponent"})}
`)),Nn=At(((e,t,n)=>(o=N("other")((e=>[o,o=e])),r=N(0)((e=>[r,r=e])),s=N(0)((e=>[s,s=e])),i=++s,{addArrayItem:a,myFunction:l,deleteItem:c,child:u,array:d}=e)=>Pt`
  <div>
    <strong>mainFunction:</strong>${t.function.toCall?"taggjedjs-wrapped":"nowrap"}:
    <span>${t.count}</span>
  </div>
  <div>
    <strong>childFunction:</strong>${u.myChildFunction.toCall?"taggjedjs-wrapped":"nowrap"}
  </div>
  <div>
    <strong>myFunction:</strong>${l.toCall?"taggjedjs-wrapped":"nowrap"}
  </div>

  <button id="fun_in_prop1" onclick=${l}>🤰 ++object argument</button>
  <button id="fun_in_prop2" onclick=${u.myChildFunction}>🤰 ++child.myChildFunction</button>
  <button id="fun_in_prop3" onclick=${n}>+🤰 +argument</button>
  <button onclick=${Bn.function}>🆎 ++main</button>
  <button onclick=${()=>++r}>++me</button>
  
  <div>
    child array length: ${d.length}
    ${d.map((e=>En(e,c).key(e)))}
    <button onclick=${a}>addArrayItem</button>
  </div>
  
  <div>
    counter:<span>${r}</span>
  </div>
  ${Kt({renderCount:s,name:"funInProps_tag_child"})}
`)),En=At(((e,t)=>Pt`
  <div style="border:1px solid black;">
    ${e}<button type="button" onclick=${()=>t(e)}>delete</button>
  </div>
`)),An=(e,t)=>e.length>=t;function On({onSubmit:e,placeholder:t,label:n,defaultValue:o,onBlur:r}){return Pt`
        <div class="input-container">
            <input class="new-todo" id="todo-input" type="text" data-testid="text-input" placeholder=${t} value=${o} onblur=${()=>{r&&r()}} onKeyDown=${t=>{if("Enter"===t.key){const n=t.target.value.trim();if(!An(n,2))return;e(n),t.target.value=""}}} />
            <label htmlFor="todo-input" style="visibility:hidden">
                ${n}
            </label>
        </div>
    `}const Ln="ADD_ITEM",In="UPDATE_ITEM",Rn="REMOVE_ITEM",Fn="TOGGLE_ITEM",Vn="TOGGLE_ALL",Hn="REMOVE_COMPLETED_ITEMS";const Mn=At(((e,t,n)=>{_("item");let o=N(!1)((e=>[o,o=e])),r=N(0)((e=>[r,r=e]));const{title:s,completed:i,id:a}=e,l=()=>t({type:Rn,payload:{id:a}});return++r,Pt`
        <li class=${e.completed,""} data-testid="todo-item">
            <div class="view">
                ${o?Pt`${On({onSubmit:e=>(0===e.length?l():((e,n)=>{t({type:In,payload:{id:e,title:n}})})(a,e),o=!1,"44s"),label:"Edit Todo Input",defaultValue:s,onBlur:()=>o=!1})} - ${s}`:Pt`
                    completed:${i}
                    <input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=${i} onChange=${()=>t({type:Fn,payload:{id:a}})} />
                    <label data-testid="todo-item-label" onDblClick=${()=>{o=!0}}>
                        ${s}
                    </label>
                    <button class="destroy" data-testid="todo-item-button" onClick=${l}>delete</button>
                `}
            </div>
            item render count: ${r}
        </li>
    `})),Jn=At((({todos:e,dispatch:t})=>{let n=N(0)((e=>[n,n=e]));++n;const o=T([e,""],(()=>e.filter((e=>e))));return Pt`
        <main class="main" data-testid="main">
            main renderCount: ${n} array:${o.length} of ${e.length}
            <hr />
            ${JSON.stringify(e)}
            <hr />
            ${o.length>0&&Pt`
                <div class="toggle-all-container">
                    <input class="toggle-all" type="checkbox" data-testid="toggle-all" checked=${o.every((e=>e.completed))} onChange=${e=>t({type:Vn,payload:{completed:e.target.checked}})} />
                    <label class="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            `}
            <ul class="todo-list" data-testid="todo-list">
                ${o.map(((e,n)=>Pt`
                    ${Mn(e,t,n)}
                `.key(e.id)))}
            </ul>
        </main>
    `})),Wn=At(((e,t)=>(n=e.filter((e=>!e.completed)),o=(()=>t({type:Hn})))=>0===e.length?null:Pt`
    <footer class="footer" data-testid="footer">
        <span class="todo-count">${n.length} of ${e.length} ${1===n.length?"item":"items"} left!</span>
        <ul class="filters" data-testid="footer-navigation">
            <li>
                <a class=${""} href="#/">
                    All
                </a>
            </li>
            <li>
                <a class=${""} href="#/active">
                    Active
                </a>
            </li>
            <li>
                <a class=${""} href="#/completed">
                    Completed
                </a>
            </li>
        </ul>
        <button class="clear-completed" disabled=${n.length===e.length} onClick=${o}>
            Clear completed
        </button>
    </footer>
`));function Gn(e=21){let t="",n=e;for(;n--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64*Math.random()|0];return t}const Yn=At((function(){return(e=N([])((t=>[e,e=t])),t=(t=>{e=((e,t)=>{switch(t.type){case Ln:return e.concat({id:Gn(),title:t.payload.title,completed:!1});case In:return e.map((e=>e.id===t.payload.id?{...e,title:t.payload.title}:e));case Rn:return e.filter((e=>e.id!==t.payload.id));case Fn:return e.map((e=>e.id===t.payload.id?{...e,completed:!e.completed}:e));case"REMOVE_ALL_ITEMS":return[];case Vn:return e.map((e=>e.completed!==t.payload.completed?{...e,completed:t.payload.completed}:e));case Hn:return e.filter((e=>!e.completed))}throw Error(`Unknown action: ${t.type}`)})(e,t)}))=>Pt`
        ${function(e){return Pt`
        <header class="header" data-testid="header">
            <h1>todos</h1>
            ${On({onSubmit:t=>e({type:Ln,payload:{title:t}}),label:"New Todo Input",placeholder:"What needs to be done?"})}
        </header>
    `}(t)}
        ${Jn({todos:e,dispatch:t})}
        ${Wn(e,t)}
    `})),qn=At(((e="propsDebugMain")=>(e=N(0)((t=>[e,e=t])),t=N(0)((e=>[t,t=e])),n=N(0)((e=>[n,n=e])),o=N({test:33,x:"y"})((e=>[o,o=e])),r=N((()=>new Date))((e=>[r,r=e])),s=JSON.stringify(o,null,2))=>Pt`
  <div style="display:flex;flex-wrap:wrap" id="textareawrap">
    <textarea id="props-debug-textarea" wrap="off"
      onchange=${e=>o=JSON.parse(e.target.value)}
      style="height:200px;font-size:0.6em;width:100%;max-width:400px"
    >${s}</textarea>
    
    <pre>${s}</pre>
  </div>
  <div><small>(renderCount:${++n})</small></div>
  
  <div>
    <button id="propsDebug-🥩-0-button"
      onclick=${()=>++t}
    >🥩 propNumber ${t}</button>
    <span id="propsDebug-🥩-0-display">${t}</span>
  </div>
  
  <fieldset>
    <legend>child</legend>
    ${Xn({propNumber:t,propsJson:o,propNumberChange:e=>{t=e}})}
  </fieldset>

  <fieldset>
    <legend>sync props callback</legend>
    🥡 syncPropNumber: <span id="sync-prop-number-display">${e}</span>
    <button onclick=${()=>++e}>🥡 ++</button>
    ${Kt({renderCount:n,name:"sync_props_callback"})}
    <hr />
    ${zn({syncPropNumber:e,propNumberChange:t=>e=t,parentTest:e=>e})}
  </fieldset>

  <fieldset>
    <legend>date prop</legend>
    date:${r}
    <input type="date" value=${function(e){const t=new Date(e),n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return{date:`${n}-${o}-${r}`,time:`${s}:${i}`}}(r).date} onchange=${e=>{const t=e.target.value;r=new Date(t)}} />
    <hr />
    ${Un({date:r})}
  </fieldset>
`)),Un=At((({date:e})=>Pt`date:${e}`)),zn=At((({syncPropNumber:e,propNumberChange:t,parentTest:n})=>{_("string forced");let o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e]));return++r,e%2==1&&t(e+=1),Pt`<!--syncPropDebug-->
    <div>
      🥡 child syncPropNumber:<span id="sync-prop-child-display">${e}</span>
      <button id="sync-prop-child-button"
        onclick=${()=>t(++e)}
      >🥡 ++</button>
    </div>
    <div>
      <div>
        counter:<span id="sync-prop-counter-display">${o}</span>
      </div>
      parentTest<span id="nothing-prop-counter-display">${n(o)}</span>
      <button id="nothing-prop-counter-button" onclick=${()=>{n(++o)}}>++</button>
    </div>
    ${Kt({renderCount:r,name:"child_sync_props_callback"})}
  `})),Xn=At((({propNumber:e,propsJson:t,propNumberChange:n})=>(o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e])),s=N(e)((e=>[s,s=e])),i=T([e],(()=>s=e)),a=T([s],(()=>++r)),l=function(e){return t=>{let n=N(e)(t);return T([e],(()=>t(n=e))),t(n),n}}(e)((t=>[e,e=t])))=>Pt`<!--propsDebug.js-->
  <h3>Props Json</h3>
  <textarea style="font-size:0.6em;height:200px;width:100%;;max-width:400px" wrap="off"
    onchange=${e=>{const n=JSON.parse(e.target.value);Object.assign(t,n)}}
  >${JSON.stringify(t,null,2)}</textarea>
  <pre>${JSON.stringify(t,null,2)}</pre>
  <!--
  <div style="display:flex;flex-wrap:wrap">
  </div>
  -->
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
  ${Kn({propNumber:s,callback:()=>++s})}    
`)),Kn=At((({propNumber:e,callback:t})=>{let n=N(0)((e=>[n,n=e]));return++n,Pt`
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${t}
    >🐄 🥩 local & 1-parent increase ${e}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${e}</span>
    ${Kt({renderCount:n,name:"propFnUpdateTest"})}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `}));const Qn=At((function(){const e=_([]);let t=N(0)((e=>[t,t=e]));const n=()=>({name:"Person "+e.length,scores:"0,".repeat(0).split(",").map(((e,t)=>({frame:t+1,score:Math.floor(4*Math.random())+1})))});return++t,Pt`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${eo({players:e,getNewPlayer:n})}
    </div>

    <button id="array-test-push-item" onclick=${()=>{e.push(n())}}>push item ${e.length+1}</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n())}}>push 3 items</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n())}}>push 9 items</button>

    ${e.length>0&&Pt`
      <button oninit=${Ut} ondestroy=${zt}
        style="--animate-duration: .1s;"
        onclick=${()=>e.length=0}
      >remove all</button>
    `}

    ${Kt({renderCount:t,name:"arrayTests.ts"})}
  `})),Zn=At((({score:e,playerIndex:t})=>{let n=N(0)((e=>[n,n=e]));return++n,Pt`
    frame:${e.frame}:
    <button
      id=${`score-data-${t}-${e.frame}-inside-button`}
      onclick=${()=>++e.score}
    >inner score button ++${e.score}</button>
    <span id=${`score-data-${t}-${e.frame}-inside-display`}
    >${e.score}</span>
    <button onclick=${()=>++n}>increase renderCount</button>
    ${Kt({renderCount:n,name:"scoreData"+e.frame})}
  `})),eo=At((({players:e,getNewPlayer:t})=>Pt`
    <!-- playersLoop.js -->
    ${e.map(((n,o)=>Pt`
    <div oninit=${Ut} ondestroy=${zt}
      style="background-color:black;--animate-duration: .1s;"
    >
      <div>
        name:${n.name}
      </div>
      <div>
        index:${o}
      </div>
      
      <div style="background-color:purple;padding:.5em">
        scores:${n.scores.map(((e,t)=>Pt`
        <div style="border:1px solid white;--animate-duration: .1s;"
          oninit=${Ut} ondestroy=${zt}
        >
          <fieldset>
            <legend>
              <button id=${`score-data-${t}-${e.frame}-outside-button`}
                onclick=${()=>++e.score}
              >outer score button ++${e.score}</button>
              <span id=${`score-data-${t}-${e.frame}-outside-display`}
              >${e.score}</span>
            </legend>
            ${Zn({score:e,playerIndex:t})}
          </fieldset>
        </div>
      `.key(e)))}</div>
      
      ${n.edit&&Pt`
        <button onclick=${()=>{e.splice(o,1),n.edit=!n.edit}}>remove</button>
      `}
      ${n.edit&&Pt`
        <button id=${"player-remove-promise-btn-"+o} onclick=${async()=>{n.edit=!n.edit,e.splice(o,1)}}>remove by promise</button>
      `}
      <button id=${"player-edit-btn-"+o} onclick=${()=>n.edit=!n.edit}>edit</button>
      <button onclick=${()=>{e.splice(o,0,t())}}>add before</button>
    </div>
  `.key(n)))}
    <!-- end:playersLoop.js -->
  `)),to=At((()=>{let e=N("app first state")((t=>[e,e=t])),t=N(!1)((e=>[t,t=e])),o=N(0)((e=>[o,o=e])),r=N(0)((e=>[r,r=e])),s=N(null)((e=>[s,s=e]));function i(e=!0){s=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await async function(){await Promise.resolve().then(n.bind(n,987)),await Promise.resolve().then(n.bind(n,979)),await Promise.resolve().then(n.bind(n,888)),await Promise.resolve().then(n.bind(n,977)),await Promise.resolve().then(n.bind(n,434)),await Promise.resolve().then(n.bind(n,110)),await Promise.resolve().then(n.bind(n,735)),await Promise.resolve().then(n.bind(n,973)),await Promise.resolve().then(n.bind(n,893)),await Promise.resolve().then(n.bind(n,790)),await Promise.resolve().then(n.bind(n,122)),await Promise.resolve().then(n.bind(n,389)),await Promise.resolve().then(n.bind(n,153)),await Promise.resolve().then(n.bind(n,241)),await Promise.resolve().then(n.bind(n,961));try{const e=Date.now();await(0,dn.ht)();const t=Date.now()-e;return console.info(`✅ all tests passed in ${t}ms`),!0}catch(e){return console.error("❌ tests failed: "+e.message,e),!1}}();e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),2e3)}Tt((()=>{clearTimeout(s),s=null})),++r;const a=xt(),l=_((()=>new p(o)));_t((()=>{console.info("1️⃣ app init should only run once"),i(!1),l.subscribe(a((e=>o=e)))}));return Pt`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${4}</h1>

    <button id="toggle-test" onclick=${()=>{t=!t}}>toggle test ${t}</button>
    <button onclick=${i}>run test</button>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>l.next(o+1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-display">${o}</span>
      </span>
    </div>

    ${Kt({name:"app",renderCount:r})}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${bn({appCounterSubject:l})}
        </fieldset>

        <fieldset id="counters" style="flex:2 2 20em">
          <legend>⌚️ watch testing</legend>
          ${_n()}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${$n(void 0)}
        </fieldset>

        <fieldset id="props-debug" style="flex:2 2 20em">
          <legend>Props Debug</legend>
          ${qn(void 0)}
        </fieldset>

        ${un(void 0)}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${Rt()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${Ft()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${Qt(void 0)}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>arrays</legend>
          ${Qn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Mirroring</legend>
          ${rn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${Vt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>oneRender</legend>
          ${Tn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>functions in props</legend>
          ${Dn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>todo</legend>
          ${Yn()}
        </fieldset>
      </div>

      ${Xt()}
    </div>
  `}));var no;!function(e){e.Todo="todo",e.FunInPropsTag="funInPropsTag",e.OneRender="oneRender",e.WatchTesting="watchTesting",e.Mirroring="mirroring",e.Content="content",e.Arrays="arrays",e.Counters="counters",e.TableDebug="tableDebug",e.Props="props",e.Child="child",e.TagSwitchDebug="tagSwitchDebug",e.ProviderDebug="providerDebug"}(no||(no={}));const oo=Object.values(no),ro=function(){const e=localStorage.taggedjs||JSON.stringify({autoTest:!0,views:[]});return JSON.parse(e)}();function so(){localStorage.taggedjs=JSON.stringify(ro)}const io=At((()=>{_("isolated app state");let e=N(0)((t=>[e,e=t])),t=N(0)((e=>[t,t=e])),o=N(null)((e=>[o,o=e]));const r=_((()=>new p(t))),s=xt();function i(e=!0){o=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await async function(e){await Promise.resolve().then(n.bind(n,987)),e.includes(no.Content)&&await Promise.resolve().then(n.bind(n,888)),e.includes(no.Counters)&&await Promise.resolve().then(n.bind(n,977)),e.includes(no.Props)&&await Promise.resolve().then(n.bind(n,434)),e.includes(no.ProviderDebug)&&await Promise.resolve().then(n.bind(n,110)),e.includes(no.TagSwitchDebug)&&await Promise.resolve().then(n.bind(n,735)),e.includes(no.Child)&&await Promise.resolve().then(n.bind(n,973)),e.includes(no.Arrays)&&await Promise.resolve().then(n.bind(n,893)),e.includes(no.Mirroring)&&await Promise.resolve().then(n.bind(n,790)),e.includes(no.WatchTesting)&&await Promise.resolve().then(n.bind(n,122)),e.includes(no.FunInPropsTag)&&await Promise.resolve().then(n.bind(n,153)),e.includes(no.OneRender)&&await Promise.resolve().then(n.bind(n,389)),e.includes(no.Todo)&&await Promise.resolve().then(n.bind(n,241)),await Promise.resolve().then(n.bind(n,961));try{const e=Date.now();await(0,dn.ht)();const t=Date.now()-e;return console.info(`✅ isolated tests passed in ${t}ms`),!0}catch(e){return console.error("❌ isolated tests failed: "+e.message,e),!1}}(ro.views);e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),2e3)}return _t((()=>{console.info("1️⃣ app init should only run once"),r.subscribe(s((e=>{t=e}))),ro.autoTest&&i(!1)})),++e,Pt`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>r.next(t+1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-display">${t}</span>
      </span>
      auto testing <input type="checkbox" ${ro.autoTest?"checked":null} onchange=${function(){ro.autoTest=ro.autoTest=!ro.autoTest,so()}} />
      <button type="button" onclick=${()=>i(!0)}>run tests</button>
    </div>

    <div>
      <h3>Sections</h3>
      <div style="display:flex;gap:1em;flex-wrap:wrap;margin:1em;">
        ${oo.map((e=>Pt`
          <div>
            <input type="checkbox"
              id=${"view-type-"+e} name=${"view-type-"+e}
              ${ro.views.includes(e)&&"checked"}
              onclick=${()=>function(e){ro.views.includes(e)?ro.views=ro.views.filter((t=>t!==e)):(ro.views.push(e),ro.autoTest&&i()),so()}(e)}
            />
            <label for=${"view-type-"+e}>&nbsp;${e}</label>
          </div>
        `.key(e)))}
      </div>
    </div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${ro.views.includes(no.OneRender)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>oneRender</legend>
            ${Tn()}
          </fieldset>
        `}

        ${ro.views.includes(no.Props)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${qn(void 0)}
          </fieldset>
        `}

        ${ro.views.includes(no.WatchTesting)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>watchTesting</legend>
            ${_n()}
          </fieldset>
        `}

        ${ro.views.includes(no.TableDebug)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${Vt()}
          </fieldset>
        `}

        ${ro.views.includes(no.ProviderDebug)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${$n(void 0)}
          </fieldset>
        `}

        ${ro.views.includes(no.TagSwitchDebug)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${Qt(void 0)}
          </fieldset>
        `}

        ${ro.views.includes(no.Mirroring)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${rn()}
          </fieldset>
        `}

        ${ro.views.includes(no.Arrays)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${Qn()}
          </fieldset>
        `}

        ${ro.views.includes(no.Counters)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${bn({appCounterSubject:r})}
          </fieldset>
        `}

        ${ro.views.includes(no.Content)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${Ft()}
          </fieldset>
        `}

        ${ro.views.includes(no.Child)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${un(void 0)}
          </fieldset>
        `}

        ${ro.views.includes(no.FunInPropsTag)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>funInPropsTag</legend>
            ${Dn()}
          </fieldset>
        `}

        ${ro.views.includes(no.Todo)&&Pt`
          <fieldset style="flex:2 2 20em">
            <legend>todo</legend>
            ${Yn()}
          </fieldset>
        `}

        ${!1}
      </div>
      ${Kt({renderCount:e,name:"isolatedApp"})}
    </div>
  `})),ao=()=>{console.info("attaching app to element...");const e=document.getElementsByTagName("app")[0],t=window.location.pathname.split("/").filter((e=>e)),n=t[0]?.toLowerCase();if(n&&["isolated.html","index-static.html"].includes(n)){const t=Date.now();Lt(io,e,{test:1});const n=Date.now()-t;return void console.info(`⏱️ isolated render in ${n}ms`)}const o=Date.now();Lt(to,e,{test:1});const r=Date.now()-o;console.info(`⏱️ rendered in ${r}ms`)}})();var r=o.gV,s=o.jG,i=o.l2,a=o.fm;export{r as App,s as IsolatedApp,i as app,a as hmr};
//# sourceMappingURL=bundle.js.map