var e={893:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.yY)("array testing",(()=>{(0,r.it)("array basics",(()=>{(0,r.l_)((0,o.o5)("#array-test-push-item")).toBe(1);const e=(0,o.o5)("#score-data-0-1-inside-button");(0,r.l_)(e).toBe(0),(0,r.l_)((0,o.o5)("#score-data-0-1-outside-button")).toBe(0),(0,o.L7)("array-test-push-item").click(),(0,r.l_)((0,o.o5)("#score-data-0-1-inside-button")).toBe(1),(0,r.l_)((0,o.o5)("#score-data-0-1-outside-button")).toBe(1);const t=(0,o.L7)("score-data-0-1-inside-button"),n=(0,o.L7)("score-data-0-1-inside-display");let s=n.innerText;const i=(0,o.L7)("score-data-0-1-outside-button"),a=(0,o.L7)("score-data-0-1-outside-display"),l=a.innerText;(0,r.l_)(s).toBe(l),t.click(),(0,r.l_)(n.innerText).toBe(a.innerText),(0,r.l_)(s).toBe((Number(n.innerText)-1).toString()),(0,r.l_)(s).toBe((Number(a.innerText)-1).toString()),i.click(),(0,r.l_)(n.innerText).toBe(a.innerText),(0,r.l_)(s).toBe((Number(n.innerText)-2).toString()),(0,r.l_)(s).toBe((Number(a.innerText)-2).toString())})),(0,r.it)("🗑️ deletes",(async()=>{(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(0),(0,r.l_)((0,o.o5)("#player-edit-btn-0")).toBe(1),await(0,o.L7)("player-edit-btn-0").onclick(),(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(1);const e=await(0,o.L7)("player-remove-promise-btn-0").onclick();var t;(0,r.l_)(e).toBe("promise-no-data-ever"),await(t=1e3,new Promise((e=>setTimeout(e,t)))),(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(0),(0,r.l_)((0,o.o5)("#player-edit-btn-0")).toBe(0)}))}))},979:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.it)("elements exists",(()=>{(0,r.l_)((0,o.L7)("h1-app")).toBeDefined();const e=(0,o.L7)("toggle-test");(0,r.l_)(e).toBeDefined(),(0,r.l_)(e.innerText).toBe("toggle test")})),(0,r.it)("toggle test",(()=>{const e=(0,o.L7)("toggle-test");e.click(),(0,r.l_)(e.innerText).toBe("toggle test true"),e.click(),(0,r.l_)(e.innerText).toBe("toggle test");const t=(0,o.L7)("props-debug-textarea");(0,r.l_)(t.value.replace(/\s/g,"")).toBe('{"test":33,"x":"y"}')}))},973:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.it)("child tests",(()=>{(0,r.di)("#innerHtmlPropsTest-button","#innerHtmlPropsTest-display"),(0,r.di)("#innerHtmlTest-counter-button","#innerHtmlTest-counter-display"),(0,r.Iq)(["#childTests-button","#childTests-display"],["#child-as-prop-test-button","#child-as-prop-test-display"],["#innerHtmlPropsTest-childTests-button","#innerHtmlPropsTest-childTests-display"]),(0,r.Iq)(["#childTests-button","#childTests-display"],["#innerHtmlTest-childTests-button","#innerHtmlTest-childTests-display"])}))},888:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.yY)("content",(()=>{(0,o.it)("basic",(()=>{(0,r.Lo)("#content-subject-pipe-display0","#content-subject-pipe-display1"),(0,r.Lo)("#content-combineLatest-pipe-display0","#content-combineLatest-pipe-display1")})),(0,o.it)("html",(()=>{(0,r.Lo)("#content-combineLatest-pipeHtml-display0","#content-combineLatest-pipeHtml-display1")}))}))},977:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("counters",(()=>{const e="0"===(0,o.dy)("#🍄-slowChangeCount");(0,r.it)("basics",(()=>{const t=(0,o.L7)("set-main-counter-input");(0,r.l_)(t).toBeDefined(),t.value="0",t.onkeyup({target:t});const n=Number((0,o.dy)("#counters_render_count")),i=Number((0,o.dy)("#inner_counters_render_count"));(0,s.wG)("#conditional-counter",0),(0,s.di)("#❤️-increase-counter","#❤️-counter-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+2).toString()),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+2).toString()),(0,s.di)("#❤️-inner-counter","#❤️-inner-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+4).toString()),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+4).toString()),(0,s.di)("#standalone-counter","#standalone-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+6).toString(),"render count check failed"),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+4).toString()),(0,s.wG)("#conditional-counter",1),(0,s.wG)("#conditional-display",1),e&&(0,r.l_)((0,o.dy)("#conditional-display")).toBe("2"),(0,s.di)("#conditional-counter","#conditional-display"),(0,s.di)("#❤️-inner-counter","#❤️-inner-display"),e&&((0,r.l_)((0,o.dy)("#🪈-pipedSubject")).toBe(""),(0,r.l_)((0,o.dy)("#🪈-pipedSubject-2")).toBe("")),(0,o.V4)("#🥦-subject-increase-counter");const a=(0,o.dy)("#🪈-pipedSubject"),l=(0,o.dy)("#🥦-subject-counter-display");(0,r.l_)(a).toBe(l,`Expected #🪈-pipedSubject value(${a}) to match #🥦-subject-counter-display value(${l})`),(0,r.l_)((0,o.dy)("#🪈-pipedSubject-2")).toBe((0,o.dy)("#🥦-subject-counter-display"))}))}))},617:(e,t,n)=>{function o(e){return document.querySelectorAll(e).length}function r(e){return document.querySelectorAll(e)}function s(e){return r(e).forEach((e=>e.focus()))}function i(e){return[...r(e)].map((e=>e.click()))}function a(e,t=0){return r(e)[t].click()}function l(e){let t="";return r(e).forEach((e=>t+=e.innerHTML)),t}function c(e){return document.getElementById(e)}function u(e){return document.getElementById(e).innerHTML}n.d(t,{IO:()=>r,L7:()=>c,T_:()=>s,V4:()=>i,_8:()=>u,dQ:()=>a,dy:()=>l,o5:()=>o})},933:(e,t,n)=>{n.d(t,{Fr:()=>s,Iq:()=>a,Lo:()=>r,di:()=>c,wG:()=>i});var o=n(435);function r(...e){const t=e.reduce(((e,t)=>{const n=document.querySelectorAll(t);return e.push(...n),e}),[]);(0,o.l_)(t.length).toBeGreaterThan(0,"Expected elements to be present in expectMatchedHtml() query but found none");const n=t.pop().innerHTML;t.every((t=>(0,o.l_)(n).toBe(t.innerHTML,(()=>`expectMatchedHtml unmatched html - queries: ${e.join(" - ")}`))))}function s(e,t){document.querySelectorAll(e).forEach((n=>(0,o.l_)(n.innerHTML).toBe(t,(()=>`Expected element ${e} innerHTML to be --\x3e${t}<-- but it was --\x3e${n.innerHTML}<--`))))}function i(e,t,n){const r=document.querySelectorAll(e),s=r.length;return n=n||`Expected ${t} elements to match query ${e} but found ${s}`,(0,o.l_)(s).toBe(t,n),r}function a(...e){const[t,n]=e.shift();let r=i(n,1),s=i(t,1);const a=r[0].innerText;l(s,r,{elementCountExpected:1},t,n);let c=2;e.forEach((([e,u])=>{r=i(u,1),s=i(e,1);let d=r[0],p=d.innerText;const g=(Number(a)+c).toString();(0,o.l_)(p).toBe(g,(()=>`Expected second increase provider to be increased to ${a} but got ${p}`)),l(s,r,{elementCountExpected:1},t,n),d=r[0],p=d.innerText;const b=c+2;(0,o.l_)(p).toBe((Number(a)+b).toString(),(()=>`Expected ${u} innerText to be ${Number(a)+b} but instead it is ${p}`)),c+=2}))}function l(e,t,{elementCountExpected:n}={elementCountExpected:1},r,s){(0,o.l_)(e.length).toBe(n,(()=>`Expected ${r} to be ${n} elements but is instead ${e.length}`)),(0,o.l_)(t.length).toBe(n,(()=>`Expected ${s} to be ${n} elements but is instead ${t.length}`)),e.forEach(((e,t)=>{const n=document.querySelectorAll(s)[t];(0,o.l_)(document.body.contains(n)).toBe(!0,`The selected element ${s} is no longer an element on the document body before clicking ${r}`);let i=Number(n?.innerText);e.click(),(0,o.l_)(n).toBeDefined(),(0,o.l_)(document.body.contains(n)).toBe(!0,`The selected element ${s} is no longer an element on the document body after clicking ${r}`);let a=i+1;i=Number(n.innerText),(0,o.l_)(document.body.contains(n)).toBe(!0),(0,o.l_)(a).toBe(i,(()=>`Counter test 1 of 2 expected ${s} to be value ${a} but it is ${i}`)),e.click(),i=Number(n?.innerText),++a,(0,o.l_)(a).toBe(i,(()=>`Counter test 2 of 2 expected ${s} to increase value to ${a} but it is ${i}`))}))}function c(e,t,{elementCountExpected:n}={elementCountExpected:1}){return l(document.querySelectorAll(e),document.querySelectorAll(t),{elementCountExpected:n},e,t)}},435:(e,t,n)=>{n.d(t,{ht:()=>c,it:()=>a,l_:()=>d,yY:()=>i});const o=[];let r=[],s=0;function i(e,t){r.push((async()=>{const n=r;r=[];try{console.debug("  ".repeat(s)+"↘ "+e),++s,await t(),await u(r),--s}catch(e){throw--s,e}finally{r=n}}))}function a(e,t){r.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(" ".repeat(s)+`✅ ${e} - ${o}ms`)}catch(t){throw console.debug(" ".repeat(s)+"❌ "+e),t}}))}function l(){o.length=0,r.length=0}async function c(){return o.length?u(o):u(r)}async function u(e){for(const t of e)try{await t()}catch(e){throw console.error(`Error testing ${t.name}`),l(),e}l()}function d(e){return{toBeDefined:t=>{if(null!=e)return;t instanceof Function&&(t=t());const n=t||`Expected ${JSON.stringify(e)} to be defined`;throw console.error(n,{expected:e}),new Error(n)},toBe:(t,n)=>{if(e===t)return;n instanceof Function&&(n=n());const o=n||`Expected ${typeof e} ${JSON.stringify(e)} to be ${typeof t} ${JSON.stringify(t)}`;throw console.error(o,{received:t,expected:e}),new Error(o)},toBeGreaterThan:(t,n)=>{const o=e;if(!isNaN(o)&&o>t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be greater than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)},toBeLessThan:(t,n)=>{const o=e;if(!isNaN(o)&&o<t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be less than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)}}}i.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)},i.only=(e,t)=>{o.push((async()=>{const n=r;r=[];try{console.debug("  ".repeat(s)+"↘ "+e),++s,await t(),await u(r),--s}catch(e){throw--s,e}finally{r=n}}))},a.only=(e,t)=>{o.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(`✅ ${e} - ${o}ms`)}catch(t){throw console.debug("❌ "+e),t}}))},a.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)}},153:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("function in props",(()=>{(0,s.di)("#fun_in_prop1","#fun_in_prop_display"),(0,s.di)("#fun_in_prop2","#fun_in_prop_display"),(0,s.di)("#fun_in_prop3","#fun_in_prop_display"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("taggjedjs-wrapped"),(0,o.V4)("#toggle-fun-in-child"),(0,o.V4)("#fun-parent-button"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("nowrap"),(0,o.V4)("#toggle-fun-in-child"),(0,o.V4)("#fun-parent-button"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("taggjedjs-wrapped")}))},961:(e,t,n)=>{n.r(t);var o=n(435);(0,o.it)("has no templates",(()=>{(0,o.l_)(document.getElementsByTagName("template").length).toBe(0,"expected no templates on document")}))},790:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("🪞 mirror testing",(()=>{(0,s.wG)("#mirror-counter-display",2),(0,s.wG)("#mirror-counter-button",2);const e=Number((0,o._8)("mirror-counter-display"));(0,o.L7)("mirror-counter-button").click(),(0,r.l_)(e+1).toBe(Number((0,o._8)("mirror-counter-display"))),(0,s.wG)("#mirror-counter-display",2),(0,s.Lo)("#mirror-counter-display")}))},389:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("oneRender",(()=>{(0,r.l_)((0,o.dy)("#oneRender_tag_ts_render_count")).toBe("1"),(0,s.di)("#👍-counter-button","#👍-counter-display"),(0,s.di)("#👍🔨-counter-button","#👍🔨-counter-display"),(0,s.di)("#👍🔨-counter-button","#👍🔨-counter-subject-display"),(0,r.l_)((0,o.dy)("#oneRender_tag_ts_render_count")).toBe("1")}))},434:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("props",(()=>{(0,r.it)("test duels",(()=>{(0,s.Iq)(["#propsDebug-🥩-0-button","#propsDebug-🥩-0-display"],["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"])})),(0,r.it)("child prop communications",(()=>{(0,s.Iq)(["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"],["#propsOneLevelFunUpdate-🥩-button","#propsOneLevelFunUpdate-🥩-display"])})),(0,r.it)("letProp",(()=>{(0,s.Lo)("#propsDebug-🥩-0-display","#propsDebug-🥩-2-display");const e=Number((0,o.dy)("#propsDebug-🥩-0-display")),t=(0,o.IO)("#propsDebug-🥩-2-button")[0].onclick();(0,r.l_)(t).toBe("no-data-ever"),(0,r.l_)((0,o.dy)("#propsDebug-🥩-0-display")).toBe(e.toString()),(0,r.l_)((0,o.dy)("#propsDebug-🥩-2-display")).toBe((e+1).toString())})),(0,r.it)("basics",(()=>{const e=(0,o.L7)("propsOneLevelFunUpdate-🥩-display").innerHTML,t=(0,o.dy)("#propsDebug-🥩-change-display");(0,r.l_)(t).toBe((Number(e)+1).toString());const n=(0,o.L7)("propsDebug-🥩-0-display").innerHTML,s=(0,o.L7)("propsDebug-🥩-1-display").innerHTML,i=(0,o.L7)("propsOneLevelFunUpdate-🥩-display").innerHTML,a=Number(n),l=Number(s),c=Number(i);(0,r.l_)(l).toBe(c),(0,r.l_)(a+2).toBe(l),(0,o.L7)("propsDebug-🥩-1-button").click()})),(0,r.it)("props as functions",(()=>{const e=Number((0,o._8)("sync-prop-number-display"));(0,s.Lo)("#sync-prop-number-display","#sync-prop-child-display"),(0,o.L7)("sync-prop-child-button").click(),(0,s.Fr)("#sync-prop-number-display",(e+2).toString()),(0,s.di)("#nothing-prop-counter-button","#nothing-prop-counter-display"),(0,s.Fr)("#sync-prop-number-display",(e+2).toString()),(0,s.Lo)("#sync-prop-counter-display","#nothing-prop-counter-display")}))}))},110:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.yY)("providers",(()=>{(0,o.it)("basics",(()=>{(0,r.Iq)(["#increase-provider-🍌-0-button","#increase-provider-🍌-0-display"],["#increase-provider-🍌-1-button","#increase-provider-🍌-1-display"]),(0,r.Iq)(["#increase-provider-upper-🌹-0-button","#increase-provider-upper-🌹-0-display"],["#increase-provider-upper-🌹-1-button","#increase-provider-upper-🌹-1-display"]),(0,r.Iq)(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"])})),(0,o.it)("inner outer debug",(()=>{(0,r.Iq)(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"]),(0,r.Iq)(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"]),(0,r.Iq)(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"])}))}))},987:(e,t,n)=>{n.r(t);var o=n(435);(0,o.it)("no template tags",(()=>{const e=document.getElementsByTagName("template");(0,o.l_)(e.length).toBe(0,"Expected no templates to be on document")}))},735:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("tagSwitching",(()=>{(0,r.it)("0",(()=>{(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(1,"Expected select-tag-above element to be defined"),(0,r.l_)((0,o.o5)("#tag-switch-dropdown")).toBe(1,"Expected one #tag-switch-dropdown"),(0,r.l_)((0,o.o5)("#tagSwitch-1-hello")).toBe(2,"Expected two #tagSwitch-1-hello elements"),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0)})),(0,r.it)("1",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="1",e.onchange({target:e}),(0,s.wG)("#tagSwitch-1-hello",5),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("2",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="2",e.onchange({target:e}),(0,s.wG)("#tagSwitch-1-hello",2),(0,s.wG)("#tagSwitch-2-hello",4),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("3",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="3",e.onchange({target:e}),(0,r.l_)((0,o.o5)("#tagSwitch-1-hello")).toBe(0,"Expected no hello 1s"),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,s.wG)("#tagSwitch-3-hello",7),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("4",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="",e.onchange({target:e}),(0,s.wG)("#select-tag-above",1),(0,s.wG)("#tag-switch-dropdown",1),(0,s.wG)("#tagSwitch-1-hello",2),(0,s.wG)("#tagSwitch-2-hello",0),(0,s.wG)("#tagSwitch-3-hello",0)}))}))},241:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.yY)("todos",(()=>{const e=(0,o.L7)("todo-input");(0,r.it)("add one remove one",(()=>{(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0),e.value="one",e.onkeydown({key:"Enter",target:e}),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(1),(0,o.V4)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0)})),(0,r.it)("basic",(()=>{e.value="one",e.onkeydown({key:"Enter",target:e}),(0,o.V4)('input[data-testid="todo-item-toggle"]'),(0,o.V4)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0),e.value="one",e.onkeydown({key:"Enter",target:e}),e.value="two",e.onkeydown({key:"Enter",target:e});const t=(0,o.IO)('input[data-testid="todo-item-toggle"]')[1];t.click(),(0,r.l_)(t.checked).toBe(!0),e.value="three",e.onkeydown({key:"Enter",target:e}),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(3),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(2),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(1),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(0)})),(0,r.it)("editing",(()=>{e.value="one",e.onkeydown({key:"Enter",target:e});let t=new MouseEvent("dblclick",{bubbles:!0,cancelable:!0,view:window});(0,o.IO)('label[data-testid="todo-item-label"]')[0].dispatchEvent(t),(0,o.T_)('input[data-testid="text-input"]');const n=(0,o.IO)('input[data-testid="text-input"]')[1];n.value="two",n.onkeydown({key:"Enter",target:n}),(0,r.l_)((0,o.IO)('input[data-testid="text-input"]').length).toBe(1),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('label[data-testid="todo-item-label"]').length).toBe(0)}))}))},122:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("⌚️ watch tests",(()=>{const e=(0,o.dy)("#🍄-slowChangeCount"),t="0"===e;(0,r.it)("basic",(()=>{const n=Number((0,o._8)("watch-testing-num-display"));(0,s.Lo)("#watch-testing-num-display","#🍄-slowChangeCount"),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("false"),t?((0,r.l_)((0,o.dy)("#🍄-watchPropNumSlow")).toBe(""),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe("false"),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe("undefined")):((0,r.l_)((0,o.dy)("#🍄-watchPropNumSlow")).toBe(e),(0,r.l_)(Number((0,o.dy)("#🦷-watchTruth"))).toBeGreaterThan(Number(e)),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe((0,o.dy)("#🦷-truthSubChangeCount"))),(0,o.V4)("#watch-testing-num-button"),(0,s.Lo)("#watch-testing-num-display","#🍄-slowChangeCount"),(0,s.Lo)("#🍄-watchPropNumSlow","#🍄-slowChangeCount"),(0,r.l_)((0,o.dy)("#🍄‍🟫-subjectChangeCount")).toBe((n+2).toString()),(0,s.Lo)("#🍄‍🟫-subjectChangeCount","#🍄‍🟫-watchPropNumSubject");const i=Number((0,o.dy)("#🦷-truthChangeCount"));(0,o.V4)("#🦷-truthChange-button");let a=(i+1).toString();(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("true"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),a=(i+1).toString(),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("false"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),a=(i+2).toString(),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("true"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),(0,o.V4)("#🦷-reset-button"),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe((0,o.dy)("#🦷-watchTruth"))}))}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{var e;function t(t){return[e.tag,e.templater].includes(t?.tagJsType)}function r(t){return t?.tagJsType===e.tagComponent}function s(t){return t?.tagJsType===e.tag}function i(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function a(t){return t instanceof Array&&t.every((t=>[e.tag,e.templater,e.tag,e.tagComponent].includes(t?.tagJsType)))}function l(e){const t=new u;return t.subscribeWith=t=>{const n=[],o=[],r=(r,s)=>{n[s]=!0,o[s]=r;if(n.length===e.length){for(let e=n.length-1;e>=0;--e)if(!n[e])return;t(o,i)}},s=[...e],i=s.shift().subscribe((e=>r(e,0))),a=s.map(((e,t)=>e.subscribe((e=>r(e,t+1)))));return i.subscriptions=a,i},t}function c(e,t,n){const o=[...t],r=o.shift(),s=e=>{if(o.length)return c(e,o,n);n(e)};let i=s;const a=r(e,{setHandler:e=>i=e,next:s});i(a)}n.d(o,{gV:()=>Vn,jG:()=>Gn,l2:()=>Yn,fm:()=>xt}),function(e){e.unknown="unknown",e.tag="tag",e.templater="templater",e.tagComponent="tag-component",e.tagArray="tag-array",e.subject="subject",e.tagJsSubject="tagJsSubject",e.date="date",e.string="string",e.boolean="boolean",e.function="function",e[void 0]="undefined"}(e||(e={}));class u{value;onSubscription;methods=[];isSubject=!0;subscribers=[];subscribeWith;_value;set;constructor(e,t){this.value=e,this.onSubscription=t,this._value=e,d(this)}subscribe(e){const t=function(e,t,n){const o=u.globalSubCount$;u.globalSubCount$.next(o._value+1);const r=()=>{r.unsubscribe()};return r.callback=t,r.subscriptions=[],r.unsubscribe=()=>{!function(e,t){const n=e.findIndex((e=>e.callback===t));-1!==n&&e.splice(n,1)}(n,t),u.globalSubCount$.next(o._value-1),r.unsubscribe=()=>r;const e=r.subscriptions;for(let t=e.length-1;t>=0;--t)e[t].unsubscribe();return r},r.add=e=>(r.subscriptions.push(e),r),r.next=e=>{t(e,r)},r}(0,e,this.subscribers),n=this.subscribeWith;if(n){if(this.methods.length){const n=e;e=e=>{c(e,this.methods,(e=>n(e,t)))}}return n(e)}return this.subscribers.push(t),this.onSubscription&&this.onSubscription(t),t}next(e){this._value=e,this.emit()}emit(){const e=this._value,t=[...this.subscribers],n=t.length;for(let o=0;o<n;++o){const n=t[o];n.callback(e,n)}}toPromise(){return new Promise((e=>{this.subscribe(((t,n)=>{n.unsubscribe(),e(t)}))}))}toCallback(e){const t=this.subscribe(((n,o)=>{t.unsubscribe(),e(n)}));return this}pipe(...e){const t=new u(this._value);return t.setMethods(e),t.subscribeWith=e=>this.subscribe(e),t.next=e=>this.next(e),t}setMethods(e){this.methods=e}static all(e){return l(e.map((e=>{if(i(e))return e;return new u(e,(t=>(t.next(e),t)))})))}static globalSubCount$=new u(0)}function d(e){Object.defineProperty(e,"value",{set(t){e._value=t,e.emit()},get:()=>e._value}),Object.defineProperty(e,"set",{set:t=>e.next(t),get:()=>t=>e.next(t)})}class p extends u{value;constructor(e){super(e),this.value=e,d(this)}subscribe(e){const t=super.subscribe(e);return e(this._value,t),t}}function g(){return b.memory.stateConfig.support}function b(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};b.tagUse.push(t)}b.tagUse=[],b.memory={};class f extends Error{details;constructor(e,t,n={}){super(e),this.name=f.name,this.details={...n,errorCode:t}}}class h extends f{constructor(e,t){super(e,"array-no-key-error",t),this.name=h.name}}class y extends f{constructor(e,t){super(e,"state-mismatch-error",t),this.name=y.name}}class m extends f{constructor(e,t){super(e,"sync-callback-error",t),this.name=m.name}}b.memory.stateConfig={array:[]};const v=e=>function(e){const t=e.state,n=b.memory.stateConfig;n.rearray=[];const o=t?.length;if(o){for(let e=0;e<o;++e)$(t[e]);n.rearray.push(...t)}n.support=e}(e);function $(e){const t=e.callback;if(!t)return e.defaultValue;const[n,o]=function(e){const t=e(w),[n]=t,[o]=e(n);return[n,o]}(t);if(o!==w){const r='letState function incorrectly used. Second item in array is not setting expected value.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n'+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(r,{state:e,callback:t,value:n,checkValue:o}),new Error(r)}return n}b({beforeRender:v,beforeRedraw:v,afterRender:e=>{const t=e.state,n=b.memory.stateConfig,o=n.rearray;if(o.length&&o.length!==n.array.length){const t=`States lengths have changed ${o.length} !== ${n.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`,r=e.templater?.wrapper,s={oldStates:n.array,newStates:n.rearray,tagFunction:r.parentWrap.original},i=new y(t,s);throw console.warn(t,s),i}delete n.rearray,delete n.support,t.length=0,t.push(...n.array);for(let e=t.length-1;e>=0;--e){const n=t[e];n.lastValue=$(n)}n.array=[]}});class w{}function x(e,t){for(let n=e.length-1;n>=0;--n){const o=e[n].get(),r=t[n].callback;r&&r(o),t[n].lastValue=o}}function C(e){const t=b.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=$(o);n=t=>[e,e=t];const r={get:()=>$(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),e}let r=(e instanceof Function?e:()=>e)();if(r instanceof Function){const e=t.array,n=t.support,o=r;r=(...t)=>{const r=n.subject.global.newest.state;x(r,e);const s=o(...t);return x(e,r),s},r.original=o}n=e=>[r,r=e];const s={get:()=>$(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),r}const k=(e,t)=>_(e,t),T=e=>e;const _=(e,t,{init:n,before:o=(()=>!0),final:r=T}={})=>{let s=C({pastResult:void 0,values:void 0});const i=s.values;if(void 0===i){if(!o(e))return s.values=e,s.pastResult;const a=(n||t)(e,i);return s.pastResult=r(a),s.values=e,s.pastResult}if(e.every(((e,t)=>e===i[t])))return s.pastResult;if(!o(e))return s.values=e,s.pastResult;const a=t(e,i);return s.pastResult=r(a),i.length=0,i.push(...e),s.pastResult};function j(e,t){return Object.defineProperty(t,"noInit",{get(){const t=e();return t.setup.init=()=>{},t}}),Object.defineProperty(t,"asSubject",{get(){const t=e(),n=C((()=>g())),o=C((()=>new p(void 0))),r=(e,r)=>(_(e,((e,t)=>{const s=g(),i=r(e,t);if(s!==n){x(b.memory.stateConfig.array,n.state)}o.next(i)}),t.setup),o);return r.setup=t.setup,j((()=>r),r),r}}),Object.defineProperty(t,"truthy",{get(){const t=e();return t.setup.before=e=>e.every((e=>e)),t}}),t}function S(e,t){const n=C((()=>b.memory.stateConfig.array)),o=g();return C((()=>new u(e,t).pipe((e=>(x(o.state,n),e)))))}function B(e){const t=b.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=$(o);n=t=>[e,e=t];const r={get:()=>$(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),D(e,r)}let r=(e instanceof Function?e:()=>e)();n=e=>[r,r=e];const s={get:()=>$(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),D(r,s)}function D(e,t){return n=>(t.callback=n||(t=>[e,e=t]),e)}function P(e){return E(e,new WeakMap)}function E(e,t){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,n),Array.isArray(e))for(let o=0;o<e.length;o++)n[o]=E(e[o],t);else for(const o in e)e.hasOwnProperty(o)&&(n[o]=E(e[o],t));return n}function N(e,t){return A(e,t,new WeakMap)}function A(e,t,n){return!!(e===t||(o=e,r=t,o instanceof Function&&r instanceof Function&&o.toString()===r.toString()))||(!!n.has(e)||"object"==typeof e&&"object"==typeof t&&(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():(n.set(e,0),Array.isArray(e)&&Array.isArray(t)?function(e,t,n){if(e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!A(e[o],t[o],n))return!1;return!0}(e,t,n):!Array.isArray(e)&&!Array.isArray(t)&&function(e,t,n){const o=Object.keys(e),r=Object.keys(t);if(0===o.length&&0===r.length)return!0;if(o.length!==r.length)return!1;for(const s of o){if(!r.includes(s)||!A(e[s],t[s],n))return!1}return!0}(e,t,n))));var o,r}j((()=>function(e){const t=(t,n)=>_(t,n,e);return t.setup=e,j((()=>t),t),t}({})),k),S._value=e=>{const t=C((()=>b.memory.stateConfig.array)),n=g();return C((()=>new p(e).pipe((e=>(x(n.state,t),e)))))},S.all=function(e){const t=C((()=>b.memory.stateConfig.array)),n=g();return u.all(e).pipe((e=>(x(n.state,t),e)))};const O=e=>{const t=C((()=>({stateDiff:0,provider:void 0})));if(t.stateDiff){for(let e=t.stateDiff;e>0;--e)C(void 0);return C(void 0)}const n=C((()=>{const n=b.memory.stateConfig,o=n.array.length,r="prototype"in e?new e:e(),s=n.support,i=n.array.length-o,a={constructMethod:e,instance:r,clone:P(r),stateDiff:i,owner:s,children:[]};return t.provider=a,s.subject.global.providers.push(a),t.stateDiff=i,r})),o=e,r=o.compareTo=o.toString();return t.provider.constructMethod.compareTo=r,n},L=e=>C((()=>{const t=b.memory,n=e,o=n.compareTo=n.compareTo||e.toString(),r=t.stateConfig.support,s=[];let i={ownerSupport:r.ownerSupport};for(;i.ownerSupport;){const e=i.ownerSupport.subject.global.providers.find((e=>{s.push(e);if(e.constructMethod.compareTo===o)return!0}));if(e){e.clone=P(e.instance);const n=t.stateConfig.support;return n.subject.global.providers.push(e),e.children.push(n),e.instance}i=i.ownerSupport}const a=`Could not inject provider: ${e.name} ${e}`;throw console.warn(`${a}. Available providers`,s),new Error(a)}));function I(e,t){const n=e.templater,o=t.templater,r=n?.tag||e,s=o.tag,i=r.strings,a=s.strings||t.strings;if(i.length!==a.length)return!1;if(!i.every(((e,t)=>a[t].length===e.length)))return!1;return function(e,t){const n=e.length===t.length;if(!n)return!1;const o=t.every(((t,n)=>{const o=e[n];if(t instanceof Function&&o instanceof Function){return!!(t.toString()===o.toString())}return!0}));if(o)return!0;return!1}(e.values||r.values,t.values||s.values)}function R(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRender(e,t)}function F(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].afterRender(e,t);b.memory.tagClosed$.next(t)}function V(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeDestroy(e,t);if(e.subject.global.deleted=!0,e.hasLiveElements=!1,t){t.subject.global.childTags=t.subject.global.childTags.filter((t=>t!==e.subject.global.oldest));const n=e.subject.global;n.providers.forEach((e=>e.children.forEach(((t,o)=>{t.subject.global===n&&e.children.splice(o,1)}))))}}function H(e,t,n,o){const r=n.global.renderCount;!function(e,t,n){const o=n?.ownerSupport,r=o||t;if(n){if(n!==e){const t=n.state;e.subject.global=n.subject.global,e.state.length=0,e.state.push(...t)}return function(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRedraw(e,t)}(e,n)}R(e,r)}(e,o,t);let s=(0,e.templater.wrapper)(e,n);return F(e,o),n.global.newest=s,!t&&o&&o.subject.global.childTags.push(s),n.global.renderCount>r+1?n.global.newest:s}b.memory.tagClosed$=new u(void 0,(e=>{g()||e.next()}));const M="__tagvar",J="--"+M+"--",W=new RegExp(J,"g");class G{strings;values;tagJsType=e.tag;memory={};templater;constructor(e,t){this.strings=e,this.values=t}key(e){return this.memory.arrayValue=e,this}children;html(e,...t){return this.children={strings:e,values:t},this}}function Y(e){e.subject.global.oldest.destroy(),e.subject.global.context={}}function q(e){return["string","number","boolean"].includes(e)}function U(e,t){e.destroy({stagger:t.removed++})}function z(t){if(null==t)return e.undefined;const n=typeof t;if(t instanceof Function)return e.function;if("object"===n){if(t instanceof Date)return e.date;if(q(n))return n;const o=t.tagJsType;if(o){if([e.tagComponent,e.templater,e.tag].includes(o))return o}if(a(t))return e.tagArray;if(i(t))return e.subject}return e.unknown}function X(t){return t.map((t=>{const n=t;switch(z(t)){case e.tagComponent:return P(t.props);case e.tag:case e.templater:return X(n.values);case e.tagArray:return X(n)}return P(t)}))}function K(e,t=[]){for(let n=e.length-1;n>=0;--n){const o=e[n];t.push(o),e.splice(n,1),K(o.subject.global.childTags,t)}return t}class Q{props;tagJsType="templater";tagged;wrapper;madeChildIntoSubject;tag;children=new p([]);arrayValue;constructor(e){this.props=e}key(e){return this.arrayValue=e,this}html(e,...t){const n=function(e,t){if(i(e))return e;if(a(e))return t.madeChildIntoSubject=!0,new p(e);const n=e;return n?(t.madeChildIntoSubject=!0,n.memory.arrayValue=0,new p([n])):(t.madeChildIntoSubject=!0,new p([]))}(new G(e,t),this);return this.children=n,this}}class Z extends p{tagJsType=e.tagJsSubject;global=ee();lastRun}function ee(){return{destroy$:new u,context:{},providers:[],renderCount:0,subscriptions:[],oldest:void 0,blocked:[],childTags:[],clones:[]}}function te(e,t){const n=e;let o=n.templater;o||(o=new Q([]),o.tag=n,n.templater=o);const r=new Z(o);return r.support=new Ze(o,t,r),r.global.oldest=r.support,t.subject.global.childTags.push(r.support),r}function ne(e,t,n){const o=e.split(".");if("style"===o[0]&&(n.style[o[1]]=t),"class"===o[0])if(o.shift(),t)for(let e=0;e<o.length;++e)n.classList.add(o[e]);else for(let e=0;e<o.length;++e)n.classList.remove(o[e])}function oe(e,t){let n=e,o=t;if("object"==typeof e){if(!t)return 3;n=[...e],o=[...t||[]];if(!n.every(((e,t)=>{let r=o[t];if(e&&"object"==typeof e){const t={...e},n={...r||{}},o=Object.entries(t).every((([e,o])=>re(o,n[e],(()=>{delete t[e],delete n[e]}))));return o}return re(e,r,(()=>{n.splice(t,1),o.splice(t,1)}))})))return 6}return!1}function re(e,t,n){if(!(e instanceof Function))return!!N(e,t)&&4;if(!(t instanceof Function))return!1;const o=t?.original;o&&(t=o);e.original&&(e=e.original);return e.toString()===t.toString()?(n(),3):(n(),5)}function se(e,t,{counts:n},o){const r=t,s=r.support,i=s?.subject.global.oldest||void 0;if(i&&i)return function(e,t,n){if(t instanceof Function){const e=t(n);return n.updateBy(e),t.support=e,e}return n.updateBy(e),t.support=e,e}(e,r,i);const a=e.buildBeforeElement(o,{counts:n}),l=t.global.placeholder;return l.parentNode.insertBefore(a,l),e}function ie(e,t,n,o){let r=n.support;r||(r=ce(e,t,n)),n.support=r,r.ownerSupport=t;const s=r.buildBeforeElement(void 0,{counts:{added:0,removed:0}});if(o)o.appendChild(s);else{const e=n.global.placeholder;e.parentNode.insertBefore(s,e)}return r}function ae(e){const t=le();return t.tag=e,e.templater=t,t}function le(){const e={children:new p([]),props:[],isTag:!0,tagJsType:"templater",tagged:!1,html:()=>e,key:()=>e};return e}function ce(e,t,n){const o=new Ze(e,t,n);return ue(o,t,n),t.subject.global.childTags.push(o),o}function ue(e,t,n){e.subject=n,n.global.oldest=e,n.global.newest=e,e.ownerSupport=t}function de(e,t,n,o,r,s){if(!0!==e.tagged){const t=e.wrapper.parentWrap.original;let n=t.name||t.constructor?.name;"Function"===n&&(n=void 0);const o=n||t.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${o}\n\n`)}const i=new Ze(e,o,t);let a=t.support;ue(i,o,t);const l=i.subject.global=a?.subject.global||i.subject.global;l.oldest=i,l.insertBefore=n;if(!a){a=function(e,t,n){const o=n.subject.global,r=o.clones.map((e=>e)),s=(t=nt(t,e.support,e,n)).subject.global;if(o.clones.length>r.length){const e=o.clones.filter((e=>!r.find((t=>t===e))));s.clones.push(...e)}return t}(t,a||i,o)}const c=se(a,t,r,s);return o.subject.global.childTags.push(c),a}function pe(e,n,o){return e.map((e=>function(e,n,o,r){if(t(e)||!e)return e;if(!n)return e;return ge(e,n,o,r)}(e,n.ownerSupport,o,n)))}function ge(e,t,n,o,r,s,i=[]){if(e instanceof Function)return function(e,t,n,o,r,s){const i=e.toCall;if(i)return e;const a=(...e)=>a.toCall(...e);return a.toCall=(...e)=>function(e,t,n){const o=n.subject.global.newest,r=void 0===g(),s=e(...t),i=()=>{if(!1===r){const e=o.state.every((e=>{const t=e.lastValue,n=e.get();return N(P(t),n)}));if(e)return s}return st(o,!0),s};if(r)return i();return b.memory.tagClosed$.toCallback(i),s}(a.prop,e,t),a.original=e,a.prop=e,a.stateArray=n,Object.assign(a,e),a}(e,t,n);if(i.includes(e))return e;if(i.push(e),"object"!=typeof e||!e)return e;if(e instanceof Array){for(let r=e.length-1;r>=0;--r){const s=e[r];if(e[r]=ge(s,t,n,o,r,e,i),s instanceof Function){if(s.toCall)continue;be(r,s,e,o)}}return e}for(const r in e){const s=e[r],a=ge(s,t,n,o,r,e,i),l=Object.getOwnPropertyDescriptor(e,r)?.set;if(!l&&(e[r]=a,a instanceof Function)){if(s.toCall)continue;be(r,s,e,o)}}return e}function be(e,t,n,o){t?.toCall||o.subject.global.destroy$.toCallback((()=>n[e]=t))}function fe(e,t,n,o,r=!1){let s=n.global.newest;const i=s.templater.wrapper,a=t.templater.wrapper;let l=!1;if(i&&a){l=i.parentWrap.original===a.parentWrap.original}const c=t.templater;if(!l){Y(n.global.oldest);return de(c,n,o,e,{counts:{added:0,removed:0}})}{const n=function(e,t,n){const o=oe(n.props,e.propsConfig.latestCloned);if(o)return o;const r=oe(e.propsConfig.latestCloned,t.propsConfig.latestCloned);if(r)return r;const s=function(e,t){const n=e.propsConfig.lastClonedKidValues,o=t.propsConfig.lastClonedKidValues;return!n.every(((e,t)=>{const n=o[t];return e.every(((e,t)=>e===n[t]))}))&&9}(e,t);return s}(s,t,c);if(!n){const n=function(e,t,n,o){const r=t.subject.global.newest;if(!r){const t=n.state;o.length=0;const r=pe(o,e,t);return o.push(...r),e.propsConfig.castProps=r,o}t=r||t;const s=t.propsConfig,i=s.castProps,a=[];for(let t=o.length-1;t>=0;--t){const r=o[t],s=he(i[t],r,e,n);a.push(s)}return e.propsConfig.castProps=a,a}(t,s,e,c.props);return t.propsConfig.castProps=n,s.propsConfig.latestCloned=t.propsConfig.latestCloned,s.propsConfig.lastClonedKidValues=t.propsConfig.lastClonedKidValues,s}}const u=n.global.oldest;if(n.global.locked)return n.global.blocked.push(t),t;return function(e,t,n,o,r,s){let i=e.support;if(t&&n.children._value.length){t.templater.children.next(n.children._value)}const a=s&&I(o,r);if(a){const t=e.global.oldest;return e.support=r,t.updateBy(r),r}if(s&&i){o.subject.global.deleted||tt(o),e.global.context={}}return function(e,t){const n=e.buildBeforeElement(void 0,{counts:{added:0,removed:0}}),o=t.global.placeholder;return o.parentNode.insertBefore(n,o),t.global.oldest=e,t.global.newest=e,t.global.oldest=e,t.global.newest=e,t.support=e,e.ownerSupport.subject.global.childTags.push(e),e}(r,e)}(n,u,c,n.global.newest,st(t,r),l)}function he(e,t,n,o,r=[]){if(e instanceof Function){if(t.toCall)return e.toCall=t.toCall,t;const n=o.subject.global.newest.state;return e.prop=t,e.stateArray=n,e}if(r.includes(t))return t;if(r.push(t),"object"!=typeof t||!t)return t;if(t instanceof Array){for(let s=t.length-1;s>=0;--s){const i=t[s];t[s]=he(e[s],i,n,o,r)}return t}if(void 0===e)return t;for(const s in t){const i=t[s],a=he(e[s],i,n,o,r),l=Object.getOwnPropertyDescriptor(t,s)?.set;l||(t[s]=a)}return t}const ye=!0;function me(e,t,n,o){const r=ve(t),s=e.bind(n);r.subject.global.locked=ye;return function(e,t){if(delete e.subject.global.locked,e.subject.global.blocked.length){let n;return e.subject.global.blocked.forEach((t=>{const o=t;n=fe(o.ownerSupport,o,o.subject,o.subject.global.insertBefore,!0),e.subject.global.newest=n,e.subject.global.blocked.splice(0,1)})),e.subject.global.blocked.length=0,$e(t,n,n.subject.global)}const n=function(e,t,n){if(n.deleted)return"no-data-ever";return st(e,!0),$e(t,e,n)}(e.subject.global.newest,t,e.subject.global);return n}(r,s(...o))}function ve(t){if(t.templater.tagJsType===e.templater){return ve(t.ownerSupport)}return t}function $e(e,t,n){return e instanceof Promise?(t.subject.global.locked=ye,e.then((()=>(delete t.subject.global.locked,n.deleted||(delete t.subject.global.locked,st(n.newest,!0)),"promise-no-data-ever")))):"no-data-ever"}const we=/^\s*{__tagvar/,xe=/}\s*$/;function Ce(e){return e&&e.search(we)>=0&&e.search(xe)>=0}function ke(e,t,n,o,r,s){if(Ce(t))return function(e,t,n,o,r,s){const i=Te(o,t);return _e(e,i,n,r,s)}(e,t,n,o,r,s);if(Ce(e)){let t;const i=Te(o,e).subscribe((e=>{e!==t&&(!function(e,t,n,o,r){if(t&&t!=e)if("string"==typeof t)n.removeAttribute(t);else if(t instanceof Object)for(const e in t)n.removeAttribute(e);if("string"==typeof e){if(!e.length)return;return void _e(e,"",n,o,r)}if(e instanceof Object)for(const t in e)_e(t,e[t],n,o,r)}(e,t,n,r,s),t=e)}));return r.subject.global.subscriptions.push(i),void n.removeAttribute(e)}return Se(e)?ne(e,t,n):void 0}function Te(e,t){return e[t.replace("{","").split("").reverse().join("").replace("}","").split("").reverse().join("")]}function _e(e,t,n,o,r){const s=Se(e);if(t instanceof Function){const o=function(...e){return t(n,e)};n[e].action=o}if(i(t)){let i;n.removeAttribute(e);const a=t=>t instanceof Function?function(e,t,n,o,r,s){const i=e.templater.wrapper,a=i?.parentWrap,l=a?.oneRender;l||(t=function(e,t){if(e.isChildOverride)return e;b.memory.stateConfig;const n=(n,o)=>me(e,t,n,o);return n.tagFunction=e,n}(t,e));return je(t,n,o,r,s)}(o,t,n,e,s,r):i===t?i:(i=t,je(t,n,e,s,r)),l=t.subscribe(a);o.subject.global.subscriptions.push(l)}else r(n,e,t)}function je(e,t,n,o,r){if(e instanceof Function){const o=function(...n){return e(t,n)};return o.tagFunction=e,"ondoubleclick"===n&&(n="ondblclick"),void(t[n]=o)}if(o)return void ne(n,e,t);if(e)return void r(t,n,e);[void 0,!1,null].includes(e)?t.removeAttribute(n):r(t,n,e)}function Se(e){return e.search(/^(class|style)(\.)/)>=0}function Be(e,t,n){e.setAttribute(t,n)}function De(e,t,n){e[t]=n}function Pe(e,t,n){const o=e.getAttributeNames();let r=Be;for(let s=0;s<o.length;++s){const i=o[s];"INPUT"===e.nodeName&&"value"===i&&(r=De);ke(i,e.getAttribute(i),e,t,n,r),r=Be}}const Ee=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;const Ne=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');function Ae(e,t,n,o,r,i){const a=o.subject.global.clones;let l=e.lastArray=e.lastArray||{array:[]};e.global.placeholder||function(e,t){const n=t.global.placeholder=document.createTextNode(""),o=e.parentNode;o.insertBefore(n,e),o.removeChild(e)}(n,e);const c=e.global.placeholder;let u=0;l.array=l.array.filter(((e,n)=>{if(t.length-1<n-u)return Ie(l.array,n,r),++u,!1;const o=t[n-u],i=s(o);let a,c=o,d=o.templater;i?a=c.memory.arrayValue:(d=o,c=d.tag,a=d.arrayValue);const p=!function(e,t){if(e===t)return!0;if(e instanceof Array&&t instanceof Array&&e.length==t.length)return e.every(((e,n)=>e===t[n]));return!1}(a,e.support.templater.tag.memory.arrayValue);return!p||(Ie(l.array,n,r),++u,!1)}));const d=t.length;for(let e=0;e<d;++e){const n=t[e],a=l.array[e],u=a?.support,d=n,p=s(d),g=new Z(void 0);g.lastRun=l.lastRun;let b,f=d.templater;if(p?(f||(f=ae(d)),b=new Ze(f,o,g)):(f=d,b=Le(f,o,g)),u){const e=u.subject,t=e.global;ue(b,o,e),b.subject.global=t,t.newest=b}else ue(b,o,g);if(!("arrayValue"in(f.tag||d).memory)){const e={template:b.getTemplate().string,array:t},n="Use html`...`.key(item) instead of html`...` to template an Array";console.error(n,e);throw new h(n,e)}if(l.array.length>e){a.support.subject.global.oldest.updateBy(b)}else Oe(c,b,e,r,l.array,i),l.lastRun=b.subject.lastRun,o.subject.global.childTags.push(b)}return a}function Oe(e,t,n,o,r,s){const i={support:t,index:n};r.push(i);const a={added:o.counts.added+n,removed:o.counts.removed};t.subject.global.placeholder=e;const l=t.buildBeforeElement(void 0,{counts:a});if(s)s.appendChild(l);else{const t=e;t.parentNode.insertBefore(l,t)}}function Le(e,t,n){const o=ce(e,t,n);return H(o,o,n,t),o}function Ie(e,t,n){const o=e[t];U(o.support,n.counts),o.deleted=!0,++n.counts.removed}function Re(e,t){const n=t.parentNode,o=document.createTextNode(e);return n.insertBefore(o,t),n.removeChild(t),o}function Fe(e){return[void 0,!1,null].includes(e)?"":e}function Ve(e,t,n){t.global.insertBefore=n;const o=t.global.placeholder||n;if(t.lastValue===e&&"lastValue"in t)return;t.lastValue=e;const r=Fe(e),s=t.global.placeholder;if(s)return void(s.textContent=r);const i=Re(r,o);t.global.placeholder=i}function He(t,n,o,r,s,i){switch(z(t)){case e.templater:return void ie(t,r,n,i);case e.tag:const a=t;let l=a.templater;return l||(l=ae(a)),void ie(l,r,n,i);case e.tagArray:return Ae(n,t,o,r,s,i);case e.tagComponent:return de(t,n,o,r,s,i);case e.function:const c=t;if(c.oneRender){const e=function(e,t,n){const o=new Q([]);o.tagJsType="oneRender";const r=ce(o,n,t),s=()=>(o.tag=e(),r);return o.wrapper=s,s.parentWrap=s,s.oneRender=!0,s.parentWrap.original=e,r}(c,n,r);return H(e,e,n,r),void ie(e.templater,r,n,i)}}!function(e,t,n){t.lastValue=e;const o=Re(Fe(e),n);t.global.placeholder=o}(t,n,n.global.placeholder||o)}function Me(e){const t=document.createTextNode(""),n=e.parentNode;return n.insertBefore(t,e),n.removeChild(e),t}function Je(n,o,r,i){const a=z(o);if(function(n,o,r,s){const i=n,a="lastValue"in i,l=i.lastValue;if(a&&l!==o){const e=typeof o;return(!q(e)||typeof l!==e)&&!(o instanceof Function&&l instanceof Function)&&(function(e){delete e.lastValue}(i),"changed-simple-value")}const c=n,u=c.lastArray;if(u&&s!==e.tagArray){delete c.lastArray;for(let e=u.array.length-1;e>=0;--e){const{support:t}=u.array[e];U(t,{added:0,removed:0})}return"array"}const d=n.support;if(d){const r=t(o);return t(n._value)&&r?!I(o,d)&&(Y(d),2):s!==e.tagComponent&&(!o||!o.oneRender)&&(Y(d),"different-tag")}}(n,o,0,a),a===e.tagComponent)return function(e,t,n,o){if(!t.support)return de(e,t,n,o,{counts:{added:0,removed:0}}),t;const r=new Ze(e,o,t),s=t.support,i=s.subject.global.newest;if(!i)return de(e,t,n,o,{counts:{added:0,removed:0}}),t;{const e=i.state;r.state.length=0,r.state.push(...e)}return t.global=s.subject.global,t.support=r,fe(o,r,t,n),t}(o,n,i,r);if(n.support)return a===e.function||function(t,n,o){const r=t.support;let i=n;const a=s(n);if(a){const e=n;i=e.templater,i||(i=new Q([]),i.tag=e,e.templater=i)}const l=new Ze(i,o,t),c=n&&I(r,l);(function(t){return t?.tagJsType===e.templater})(n)&&ue(l,o,t);if(c)return void r.updateBy(l);if(c)return ie(i,o,t);Ve(n,t,t.global.insertBefore)}(n,o,r),n;switch(a){case e.tagArray:return Ae(n,o,i,r,{counts:{added:0,removed:0}}),n;case e.templater:return ie(o,r,n),n;case e.tag:const t=o;let s=t.templater;return s||(s=le(),t.templater=s,s.tag=t),ie(s,r,n),n;case e.subject:return o;case e.function:return n.global.placeholder||(n.global.placeholder=Me(i)),n}return Ve(o,n,i),n}function We(e,t,n,o,r){if(!t.hasAttribute("end"))return;const s=n[t.getAttribute("id")];s.global.insertBefore=t,function(e,t,n,o,r){let s=!1;n.global.placeholder||(n.global.placeholder=Me(t));let i=i=>{s?Je(n,i,o,t):(He(i,n,t,o,{counts:{...r}},a?e:void 0),s=!0)},a=!0;const l=n.subscribe((e=>i(e)));a=!1,o.subject.global.subscriptions.push(l)}(e,t,s,o,r)}function Ge(e,t,n,o){if(!e.getAttribute)return;"TEXTAREA"===e.nodeName&&function(e,t,n){const o=e.value;if(o.search(Ne)>=0){const r=o.match(/__tagvar(\d{1,4})/),s="{"+(r?r[0]:"")+"}";e.value="",e.setAttribute("text-var-value",s);const i=(t,n,o)=>e.value=o;ke("text-var-value",s,e,t,n,i)}}(e,n,o);let r=t.counts.added;r=function(e,t){const n=e.oninit;if(!n)return t.added;const o=n.tagFunction;if(!o)return t.added;const r=o.tagFunction;return r?(r({target:e,stagger:t.added}),++t.added):t.added}(e,t.counts)-r;e.focus&&(e.hasAttribute("autofocus")&&e.focus(),e.hasAttribute("autoselect")&&e.select());const s=e.children;if(s)for(let e=s.length-1;e>=0;--e){Ge(s[e],{...t,counts:t.counts},n,o)}}function Ye(e,t,n,o,r){const s=n.counts,i=[];for(let a=o.length-1;a>=0;--a){const l=o[a];if(We(r,l,e,t,s),l.children)for(let o=l.children.length-1;o>=0;--o){const a=l.children[o];qe(a)&&We(r,a,e,t,s);const c=Ye(e,t,n,a.children,r);i.push(...c)}}return i}function qe(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")}function Ue(e,t,n,o,r,s){const i=[],a=o.interpolation,l=t.content.children;if(a.keys.length){const t=Ye(n,r,s,l,e);i.push(...t)}return Pe(t,n,r),ze(l,n,r),i}function ze(e,t,n){for(let o=e.length-1;o>=0;--o){const r=e[o];Pe(r,t,n),r.children&&ze(r.children,t,n)}}function Xe(e){const t=function(e){const t=[];return{string:e.replace(Ee,((e,n)=>{if(e.startsWith("<"))return e;const o=n.substring(1,n.length-1);return t.push(o),`<template interpolate end id="${o}"></template>`})),keys:t}}(e);return t.string=t.string.replace(W,M),t}const Ke=new RegExp(M,"g");class Qe{templater;subject;isApp=!0;appElement;strings;values;propsConfig;state=[];hasLiveElements=!1;constructor(e,t,n){this.templater=e,this.subject=t;const o=e.props;this.propsConfig=this.clonePropsBy(o,n)}clonePropsBy(e,t){const n=this.templater.children.value,o=e.map((e=>P(e)));return this.propsConfig={latest:e,latestCloned:o,castProps:t,lastClonedKidValues:n.map((e=>X(e.values)))}}buildBeforeElement(e=document.createDocumentFragment(),t={counts:{added:0,removed:0}}){const n=this.subject,o=this.subject.global;o.oldest=this,o.newest=this,n.support=this,this.hasLiveElements=!0;const r=this.update(),s=this.getTemplate(),i=document.createElement("template");return i.innerHTML=s.string,Ue(e,i,r,s,this,{counts:t.counts}),function(e,t,n,o,r){const s=function(e,t){const n=[];let o=t.content.firstChild;for(;o;){const t=o.nextSibling;e.appendChild(o),n.push(o),o=t}return n}(e,t);if(!s.length)return s;const i=n.subject.global;for(let e=s.length-1;e>=0;--e)Ge(s[e],r,o,n);i.clones.push(...s)}(e,i,this,r,t),e}getTemplate(){const e=this.templater.tag,t=this.strings||e.strings,n=this.values||e.values,o=this.subject.lastRun;if(o&&o.strings.length===t.length){const e=o.strings.every(((e,n)=>e===t[n]));if(e&&o.values.length===n.length)return o}const r=Xe(t.map(((e,t)=>e.replace(Ke,J)+(n.length>t?`{${M}${t}}`:""))).join("")),s={interpolation:r,string:r.string,strings:t,values:n};return this.subject.lastRun=s,s}update(){return this.updateContext(this.subject.global.context)}updateContext(t){const n=this.templater.tag,o=this.strings||n.strings,r=this.values||n.values;return o.forEach(((n,o)=>{if(!(r.length>o))return;const s=M+o,a=r[o];if(s in t){if(this.subject.global.deleted){const e=a&&a.support;if(e)return e.destroy(),t}return function(e,t,n){const o=e[t];i(n)||o.next(n)}(t,s,a)}t[s]=function(t,n){switch(z(t)){case e.tagComponent:return new Z(t);case e.templater:return te(t.tag,n);case e.tag:return te(t,n);case e.subject:return t.global=ee(),t}return new Z(t)}(a,this)})),t}updateBy(e){const t=e.templater.tag;this.updateConfig(t.strings,t.values)}updateConfig(e,t){this.strings=e,this.updateValues(t)}updateValues(e){return this.values=e,this.updateContext(this.subject.global.context)}destroy(e={stagger:0}){const t=this.subject.global,n=e.byParent?[]:K(this.subject.global.childTags);r(this.templater)&&(t.destroy$.next(),V(this,this)),this.destroySubscriptions();for(let e=n.length-1;e>=0;--e){const t=n[e],o=t.subject.global;delete o.newest,o.deleted=!0,r(t.templater)&&V(t,t),t.destroySubscriptions(),et(this)}let o;et(this);const{stagger:s,promise:i}=this.destroyClones(e);return e.stagger=s,i&&(o=i),o?o.then((async()=>{const e=n.map((e=>e.destroyClones()));return Promise.all(e)})).then((()=>e.stagger)):(n.forEach((e=>e.destroyClones())),e.stagger)}destroyClones({stagger:e}={stagger:0}){const t=this.subject.global.clones.map((t=>this.checkCloneRemoval(t,e))).filter((e=>e));return this.subject.global.clones.length=0,t.length?{promise:Promise.all(t),stagger:e}:{stagger:e}}checkCloneRemoval(e,t){let n;const o=e;if(o.ondestroy&&(n=function(e,t){const n=e.ondestroy;if(!n)return;const o=n.tagFunction;if(!o)return;const r=o.tagFunction;if(!r)return;return r({target:e,stagger:t})}(o,t)),n instanceof Promise)return n.then((()=>{const t=e.parentNode;t&&t.removeChild(e)}));const r=e.parentNode;return r&&r.removeChild(e),n}destroySubscriptions(){const e=this.subject.global.subscriptions;for(let t=e.length-1;t>=0;--t)e[t].unsubscribe();e.length=0}}class Ze extends Qe{templater;ownerSupport;subject;version;isApp=!1;constructor(e,t,n,o,r=0){super(e,n,o),this.templater=e,this.ownerSupport=t,this.subject=n,this.version=r}getAppSupport(){let e=this;for(;e.ownerSupport;)e=e.ownerSupport;return e}}function et(e){const t=e.subject.global;t.context={},delete t.oldest,delete t.newest,e.subject.global.childTags.length=0;delete e.subject.support}function tt(e,t={byParent:!1,stagger:0}){const n=e.subject.global;n.deleted=!0,n.context={};const o=K(n.childTags);e.destroySubscriptions(),o.forEach((e=>{const t=e.subject.global;delete t.newest,t.deleted=!0})),et(e),e.destroyClones(),o.forEach((e=>tt(e,{byParent:!0,stagger:0})))}function nt(e,t,n,o){const r=t?.templater,s=r?.tag?.strings,i=H(e,t,n,o);if(!t||I(t,i)){if(t){const e=s?.length,n=i.templater.tag?.strings.length;e!==n&&tt(t)}}else!function(e,t,n){const o=t.subject.global;!function(e,t){const n=e.subject.global;n.providers.forEach((e=>{e.children.forEach(((o,r)=>{if(n.destroy$===o.subject.global.destroy$)return e.children.splice(r,1),void e.children.push(t)}))}))}(e,t),tt(e),delete o.deleted,o.oldest=t,o.newest=t,n.support=t}(t,i,n);const a=t?.ownerSupport;return i.ownerSupport=o||a,i}function ot(e,t){let n=!1;const o=function(e,t,n=[]){n.push({support:e,renderCount:e.subject.global.renderCount,provider:t});const o=t.children;for(let e=o.length-1;e>=0;--e)n.push({support:o[e],renderCount:o[e].subject.global.renderCount,provider:t});return n}(e,t);for(let e=o.length-1;e>=0;--e){const{support:t,renderCount:r,provider:s}=o[e];if(t.subject.global.deleted)continue;r===t.subject.global.renderCount&&(n=!0,s.clone=P(s.instance),st(t.subject.global.newest,!1))}return n}function rt(e,t,n,o){const r=o.support,s=r.subject.global;t.subject.global=s;const i=s.renderCount;!function(e){const t=e.subject.global.providers.filter((e=>!N(e.instance,e.clone)));let n=!1;for(let e=t.length-1;e>=0;--e){const o=t[e];ot(o.owner,o)&&(n=!0),o.clone=P(o.instance)}}(e);const a=s.newest;if(i!==s.renderCount)return e.subject.global.oldest.updateBy(a),a;const l=nt(t,a||r||s.oldest,o,n),c=s.oldest||e;return I(a,l)&&(o.support=l,c.updateBy(l)),l}function st(e,t){const n=e.subject.global,o=e.templater;if(!o.wrapper){const t=e.ownerSupport;return++n.renderCount,t.subject.global.deleted?e:st(t.subject.global.newest,!0)}if(e.subject.global.locked)return e.subject.global.blocked.push(e),e;const r=e.subject,s=e.subject.global.oldest;let i,a=!1;if(t&&e&&(i=e.ownerSupport,i)){a=!N(o.props,e.propsConfig.latestCloned)}const l=rt(s,e,i,r);if(i&&a){return st(i.subject.global.newest,!0),l}return l}function it(e,t,n,...o){const r=e.state;x(r,n);const s=t(...o);return x(n,r),st(e,!1),s instanceof Promise&&s.finally((()=>{x(n,r),st(e,!1)})),s}let at=e=>(e,t,n,o,r,s)=>{throw new m("Callback function was called immediately in sync and must instead be call async")};const lt=()=>at,ct=at;function ut(e){const t=b.memory.stateConfig.array;at=n=>(...o)=>e.subject.global.callbackMaker?it(e,n,t,...o):n(...o)}function dt(e){C(e)}function pt(e){C((()=>{const t=g();t?.subject.global.destroy$.toCallback(e)}))}function gt(e){b.memory.childrenCurrentSupport=e}function bt(){return b.memory.childrenCurrentSupport.templater.children}b({beforeRender:e=>ut(e),beforeRedraw:e=>ut(e),afterRender:e=>{e.subject.global.callbackMaker=!0,at=ct}}),b({beforeRender:e=>gt(e),beforeRedraw:e=>gt(e)});const ft=[];function ht(e,...t){return new G(e,t)}function yt(t,n){const o=b.memory.stateConfig.array;return(r,s)=>function(t,n,o,r,s){const i=r.subject.global;++i.renderCount;const a=n.children,l=i.oldest?.templater.children.lastArray;l&&(a.lastArray=l);const c=o.original;let u=n.props;const d=r.propsConfig.castProps,p=d||pe(u,r,t);let g=c(...p);g instanceof Function&&(g=g());g&&g.tagJsType===e.tag||(g=ht`${g}`);g.templater=n,n.tag=g,g.memory.arrayValue=n.arrayValue;const f=new Ze(n,r.ownerSupport,s,p,i.renderCount);f.subject.global=i,i.oldest=i.oldest||f;const h=b.memory.stateConfig.array;if(f.state.push(...h),n.madeChildIntoSubject){const e=a.value;for(let t=e.length-1;t>=0;--t){const n=e[t],o=n.values;for(let e=o.length-1;e>=0;--e){const t=o[e];if(!(t instanceof Function))continue;const r=n.values[e];r.isChildOverride||(n.values[e]=function(...e){return me(t,f.ownerSupport,this,e)},r.isChildOverride=!0)}}}return f}(o,t,n,r,s)}let mt=0;function vt(t){const n=function(...t){const o=new Q(t);o.tagJsType=e.tagComponent;const r=yt(o,n);return r.parentWrap||(r.parentWrap=n),o.tagged=!0,o.wrapper=r,o};n.original=t,n.compareTo=t.toString();const o=t;return n.isTag=!0,n.original=o,o.tags=ft,o.setUse=b,o.tagIndex=mt++,ft.push(n),n}vt.oneRender=(...e)=>{throw new Error("Do not call function tag.oneRender but instead set it as: `(props) => tag.oneRender = (state) => html`` `")},vt.route=e=>{throw new Error("Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")},vt.app=e=>{throw new Error("Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")},Object.defineProperty(vt,"oneRender",{set(e){e.oneRender=!0}});const $t=[];function wt(e,t,n){const o=$t.findIndex((e=>e.element===t));o>=0&&($t[o].support.destroy(),$t.splice(o,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const r=e(n),s=document.createElement("template"),i=document.createTextNode(""),a=function(e,t,n){let o={};const r=new Z(o);o=new Qe(e,r),r.global.insertBefore=t,r.global.placeholder=n,r.global.oldest=r.global.oldest||o,r.next(e),r.support=o,R(o,void 0);const s=e.wrapper,i=s(o,r);return F(o,i),i}(r,s,i),l=a.subject.global;a.appElement=t,a.isApp=!0,l.isApp=!0,t.destroy=()=>{a.destroy()},l.insertBefore=i,l.placeholder=i;const c=a.buildBeforeElement(void 0);return a.subject.global.oldest=a,a.subject.global.newest=a,t.setUse=e.original.setUse,$t.push({element:t,support:a}),t.appendChild(c),{support:a,tags:e.original.tags}}const xt={tagElement:wt,renderWithSupport:nt,renderSupport:st,renderTagOnly:H},Ct=vt((()=>{let e=B("a")((t=>[e,e=t])),t=B(!0)((e=>[t,t=e]));return ht`
    <input onchange=${t=>e=t.target.value} placeholder="a b or c" />
    <select id="select-sample-drop-down">
      ${["a","b","c"].map((t=>ht`
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
  `})),kt=vt((()=>{const e=C((()=>new p(0))),t=C((()=>new p(1)));let n=B(0)((e=>[n,n=e]));return++n,ht`
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
        <span id="content-combineLatest-pipe-display1">${l([e,t]).pipe((e=>e[1]))}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest piped html</legend>
        <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span> ===
        <span id="content-combineLatest-pipeHtml-display1">${l([e,t]).pipe(function(e){return(t,n)=>{n.setHandler((()=>{})),e(t).then((e=>n.next(e)))}}((e=>Promise.resolve(ht`<b>bold 77</b>`))))}</span>
      </fieldset>
    </div>
    (render count ${n})
  `})),Tt=vt((()=>{let e=B(!0)((t=>[e,e=t]));return ht`
    <div style="max-height: 800px;overflow-y: scroll;">
      <table cellPadding=${5} cellSpacing=${5} border="1">
        <thead style="position: sticky;top: 0;">
          <tr>
            <th>hello</th>
            <th>hello</th>
            ${e&&ht`
              <td>hello 2 thead cell</td>
            `}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>world</td>
            <td>world</td>
            ${e&&ht`
              <td>world 2 tbody cell</td>
            `}
          </tr>
        </tbody>
      </table>
    </div>
  `})),_t=3e3,jt=6e3,St=vt((()=>{let e=B(0)((t=>[e,e=t])),t=B(void 0)((e=>[t,t=e])),n=B(void 0)((e=>[n,n=e])),o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e]));const s=lt(),i=()=>++e,a=()=>{console.info("🟢 interval test 0 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=_t&&(r=0)})),500),console.info("▶️ interval started"),t=setInterval(s((()=>{i()})),_t)},l=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🛑 interval test 0 stopped")};return dt(a),pt(l),++o,ht`<!--intervalDebug.js-->
    <div>interval type 1 at ${_t}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${_t} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${()=>{t||n?l():a()}}
      style.background-color=${t||n?"red":"green"}
    >start/stop</button>
    <button type="button" onclick=${()=>setTimeout(s((()=>{r+=200})),1e3)}>delay increase currentTime</button>
  `})),Bt=vt((()=>{let e=B(0)((t=>[e,e=t])),t=B(void 0)((e=>[t,t=e])),n=B(void 0)((e=>[n,n=e])),o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e]));const s=lt(),i=()=>++e;const a=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🔴 interval 1 stopped")};function l(){if(t)return a();console.info("🟢 interval test 1 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=jt&&(r=0)})),500),t=setInterval(s((()=>{i(),console.info("slow interval ran")})),jt)}return dt(l),pt(a),++o,ht`
    <div>interval type 2 with ${jt}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${jt} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${l}
      style.background-color=${t?"red":"green"}
    >start/stop</button>
  `}));const Dt=async({target:e,stagger:t,staggerBy:n,fxName:o="fadeInDown"})=>{e.style.opacity="0",t&&await Et(t*n),e.style.opacity="1",e.classList.add("animate__animated","animate__"+o)},Pt=async({target:e,stagger:t,capturePosition:n=!0,fxName:o="fadeOutUp",staggerBy:r})=>{n&&function(e){e.style.zIndex=e.style.zIndex||1;const t=e.offsetTop+"px",n=e.offsetLeft+"px",o=e.clientWidth+(e.offsetWidth-e.clientWidth)+1+"px",r=e.clientHeight+(e.offsetHeight-e.clientHeight)+1+"px";setTimeout((()=>{e.style.top=t,e.style.left=n,e.style.width=o,e.style.height=r,e.style.position="absolute"}),0)}(e),t&&await Et(t*r),e.classList.add("animate__animated","animate__"+o),await Et(1e3),e.classList.remove("animate__animated","animate__"+o)};function Et(e){return new Promise((t=>{setTimeout(t,e)}))}const{in:Nt,out:At}=function({fxIn:e,fxOut:t,staggerBy:n=300}){return{in:t=>Dt({fxName:e,staggerBy:n,...t}),out:e=>Pt({fxName:t,staggerBy:n,capturePosition:!0,...e})}}({fxIn:"fadeInDown",fxOut:"fadeOutUp"}),Ot=vt((()=>{let e=B("tagJsDebug.js")((t=>[e,e=t])),t=B(!1)((e=>[t,t=e])),n=B(0)((e=>[n,n=e]));return++n,ht`<!-- tagDebug.js -->
    <div style="display:flex;flex-wrap:wrap;gap:1em">    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${()=>t=!t}
        >hide/show</button>

        ${t&&ht`
          <div oninit=${Nt} ondestroy=${At}>
            <div>${St()}</div>
            <hr />
            <div>${Bt()}</div>
          </div>
        `}
      </fieldset>
    </div>
  `})),Lt=vt((({renderCount:e,name:t})=>ht`<div><small>(${t} render count <span id=${t+"_render_count"}>${e}</span>)</small></div>`)),It=vt(((e="tagSwitchDebug")=>{let t=B(null)((e=>[t,t=e])),n=B(0)((e=>[n,n=e]));let o="select tag below";switch(t){case null:o="null, select tag below";break;case"":o=ht`<div id="empty-string-1"></div>`;break;case"1":o=Ft({title:"value switch"});break;case"2":o=Vt({title:"value switch"});break;case"3":o=Ht({title:"value switch"})}let r=ht`<div id="select-tag-above">select tag above</div>`;switch(t){case null:r=ht`<div id="select-tag-above">null, select tag above</div>`;break;case"":r=ht`<div id="select-tag-above">empty-string, select tag above</div>`;break;case"1":r=Ft({title:"tag switch"});break;case"2":r=Vt({title:"tag switch"});break;case"3":r=Ht({title:"tag switch"})}return++n,ht`
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
        <div>${"3"===t?Ht({title:"ternary simple"}):Ft({title:"ternary simple"})}</div>
      </div>

      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${Rt({selectedTag:t})}</div>
      </div>

      <div id="arraySwitching-test-wrap" style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div id="arraySwitching-wrap">${Mt({selectedTag:t})}</div>
      </div>
    </div>
    ${Lt({renderCount:n,name:"tagSwitchDebug"})}
  `})),Rt=vt((({selectedTag:e})=>ht`
    <div id="ternaryPropTest-wrap">
      ${e}:${"3"===e?Ht({title:"ternaryPropTest"}):Ft({title:"ternaryPropTest"})}
    </div>
  `)),Ft=vt((({title:e})=>{let t=B(0)((e=>[t,t=e])),n=B(0)((e=>[n,n=e]));return++n,ht`
    <div id="tag1" style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Lt({renderCount:n,name:"tag1"})}
    </div>
  `})),Vt=vt((({title:e})=>{let t=B(0)((e=>[t,t=e])),n=B(0)((e=>[n,n=e]));return++n,ht`
    <div id="tag2" style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Lt({renderCount:n,name:"tag1"})}
    </div>
  `})),Ht=vt((({title:e})=>{let t=B(0)((e=>[t,t=e])),n=B(0)((e=>[n,n=e]));return++n,ht`
    <div  id="tag3" style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Lt({renderCount:n,name:"tag1"})}
    </div>
  `})),Mt=vt((({selectedTag:e})=>{switch(e){case void 0:return ht`its an undefined value`;case null:return ht`its a null value`;case"":return ht``;case"1":return ht`${Ft({title:`tag ${e}`})}`;case"2":return ht`${["b","c"].map((t=>ht`${Vt({title:`array ${e} ${t}`})}`.key(t)))}`;case"3":return ht`${["d","e","f"].map((t=>ht`${Ht({title:`array ${e} ${t}`})}`.key(t)))}`}return ht`nothing to show for in arrays`})),Jt=vt((()=>{const e=Wt();return ht`
    <fieldset>
      <legend>counter0</legend>
      ${e}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${e}
    </fieldset>
  `})),Wt=()=>{let e=B(0)((t=>[e,e=t]));return ht`
    counter:<span>🪞<span id="mirror-counter-display">${e}</span></span>
    <button id="mirror-counter-button" onclick=${()=>++e}>${e}</button>
  `},Gt=vt(((e,t)=>{let n=B(0)((e=>[n,n=e])),o=B(0)((e=>[o,o=e]));return++n,ht`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div style="border:2px solid purple;">${bt()}</div>
      <div>isSubjectInstance:${i(bt())}</div>
      <div>isSubjectTagArray:${a(bt().value)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${()=>++o}>increase innerHtmlTest ${o}</button>
      <span id="innerHtmlTest-counter-display">${o}</span>
      ${Lt({renderCount:n,name:"innerHtmlTest"})}
    </fieldset>
  `})),Yt=vt((e=>{let t=B(0)((e=>[t,t=e])),n=B(0)((e=>[n,n=e]));return++t,ht`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${e}</legend>
      ${bt()}
      <button id="innerHtmlPropsTest-button" onclick=${()=>++n}
      >increase innerHtmlPropsTest ${n}</button>
      <span id="innerHtmlPropsTest-display">${n}</span>
      ${!1}
    </fieldset>
  `})),qt=vt(((e,t)=>ht`
  <fieldset>
    <legend>xxxxx</legend>  
    <div>hello other world ${e} - ${t}</div>
    <div style="border:2px solid red;">***${bt()}***</div>
  </fieldset>
`)),Ut=vt(((e="childTests")=>(e=B(0)((t=>[e,e=t])),t=B(0)((e=>[t,t=e])))=>ht`
  <fieldset id="children-test" style="flex:2 2 20em">
    <legend>childTests</legend>

    <hr />
    <hr />
    <hr />
    ${qt(1,2).html`
      <div><hr />abc-123-${Date.now()}<hr /></div>
    `}
    <hr />
    <hr />
    <hr />
    
    ${Gt({},2).html`
      <b>Field set body A</b>
      <hr />
      <button id="innerHtmlTest-childTests-button"
        onclick=${()=>++t}
      >🐮 (A) increase childTests inside ${t}:${e}</button>
      <span id="innerHtmlTest-childTests-display">${t}</span>
      ${Lt({renderCount:e,name:"childTests-innerHtmlTest"})}
    `}

    ${Yt(22).html`
      <b>Field set body B</b>
      <hr />
      <button id="innerHtmlPropsTest-childTests-button"
        onclick=${()=>++t}
      >🐮 (B) increase childTests inside ${t}</button>
      <span id="innerHtmlPropsTest-childTests-display">${t}</span>
      ${Lt({renderCount:e,name:"innerHtmlPropsTest child"})}
    `}

    ${function({child:e}){return ht`
    <fieldset>
      <legend>child as prop</legend>
      ${e}
    </fieldset>
  `}({child:ht`
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
    ${Lt({renderCount:e,name:"childTests"})}
  </fieldset>
`));var zt=n(435);const Xt=vt((({label:e,memory:t})=>{let n=B(!1)((e=>[n,n=e])),o=B(!1)((e=>[o,o=e]));return ht`
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
  `})),Kt=Date.now(),Qt=vt((({appCounterSubject:e})=>(t=C((()=>Date.now())))=>{C("countersDebug state");let n=B(0)((e=>[n,n=e])),o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e])),s=B(0)((e=>[s,s=e])),i=C((()=>({counter:0})));const a=lt(),l=C((()=>new u(n))),c=C((()=>new p("222")));u.all([c,l]).pipe(function(e){const t=g();if(!t)throw new m("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const n=b.memory.stateConfig.array;return(...o)=>t.subject.global.callbackMaker?it(t,e,n,...o):e(...o)}((e=>n))),S.all([c,l]).pipe((e=>n));dt((()=>{++s,console.info("countersDebug.ts: 👉 i should only ever run once"),l.subscribe(a((e=>n=e)))}));const d=()=>{++n,c.next("333-"+n)},f=()=>++o;++r;return ht`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${ht`
        <div>👉 Subscriptions:${u.globalSubCount$}</div>
        <button onclick=${()=>console.info("subs",u.globalSubs)}>log subs</button>
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
            onclick=${d}
          >stand alone counters:${n}</button>
          <span>
            🥦 <span id="standalone-display">${n}</span>
          </span>
        </div>
    
        ${n>1&&ht`
          <div>
            <button id="conditional-counter"
              onclick=${d}
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
            onclick=${f}
          >❤️ propCounter:${o}</button>
          <span>
            ❤️ <span id="❤️-counter-display">${o}</span>
            </span>
        </div>

        ${!1}
      `}
    </div>

    ${!1}

    ${ht`
      <fieldset>
        <legend>shared memory</legend>
        <div class.bold.text-blue=${!0} style="display:flex;flex-wrap:wrap;gap:.5em">
          ${Xt({label:"a-a-😻",memory:i})}
          ${Xt({label:"b-b-😻",memory:i})}
        </div>
        memory.counter:😻${i.counter}
        <button onclick=${()=>++i.counter}>increase 😻</button>
      </fieldset>
    `}
    
    ${ht`
      <fieldset>
        <legend>inner counter</legend>
        ${Zt({propCounter:o,increasePropCounter:f})}
      </fieldset>
    `}
    ${Lt({renderCount:r,name:"counters"})}
    <div style="font-size:0.8em;opacity:0.8">
      ⌚️ page load to display in&nbsp;<span oninit=${e=>e.target.innerText=(Date.now()-Kt).toString()}>-</span>ms
    </div>
    <div style="font-size:0.8em;opacity:0.8">
      ⌚️ read in&nbsp;<span oninit=${e=>e.target.innerText=(Date.now()-t).toString()}>-</span>ms
    </div>
  `})),Zt=vt((({propCounter:e,increasePropCounter:t})=>{let n=B(0)((e=>[n,n=e]));return++n,ht`
    <button id="❤️-inner-counter" onclick=${t}
    >❤️ propCounter:${e}</button>
    <span>
      ❤️ <span id="❤️-inner-display">${e}</span>
    </span>
    <div>renderCount:${n}</div>
    ${Lt({renderCount:n,name:"inner_counters"})}
  `}));class en{constructor(){this.tagDebug=0,this.showDialog=!1}}const tn=()=>({counter:0});function nn(){return{upper:O(on),test:0}}function on(){return{name:"upperTagDebugProvider",test:0}}const rn=vt(((e="providerDebugBase")=>{O(tn);const t=O(en),n=O(nn);B("props debug base");let o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e]));return t.showDialog&&document.getElementById("provider_debug_dialog").showModal(),++r,ht`
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
      ${cn({propCounter:o,propCounterChange:e=>{o=e}})}
    </div>

    <hr />
    renderCount outer:<span name="render_count_outer">${r}</span>
    ${Lt({renderCount:r,name:"providerDebugBase"})}

    ${ln(t)}

    TODOTODOTODOTODO
    ${!1}
  `})),sn=(vt((()=>(e=L(on))=>ht`
  <div>
    <button id="increase-provider-switch-🌹-0-button" onclick=${()=>++e.test}
    >🌹 increase switch.provider.test ${e.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-0-display">${e.test}</span>
    </span>
  </div>
  <hr />
  <div>statue:${e.test%2==0?"off":"on"}</div>
  ${sn()}
  <hr />
  ${e.test%2==0?null:an()}
`)),vt((()=>(e=L(on))=>e.test%2==0?null:ht`
  <div>
    <button id="increase-provider-switch-🌹-1-button" onclick=${()=>++e.test}
    >🌹 increase switch.provider.test ${e.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-1-display">${e.test}</span>
    </span>
  </div>
`))),an=vt((()=>(e=L(on))=>ht`
  <div>
    <button id="increase-provider-switch-🌹-2-button" onclick=${()=>++e.test}
    >🌹 increase switch.provider.test ${e.test}</button>
    <span>
      🌹<span id="increase-provider-switch-🌹-2-display">${e.test}</span>
    </span>
  </div>
`)),ln=vt((e=>ht`
  <dialog id="provider_debug_dialog" style="padding:0"
    onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
    ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
    ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
    ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
    onclose=${()=>e.showDialog=!1}
  >
    <div style="padding:.25em" onmousedown="this.parentNode.draggable=true"
    >dialog title</div>
    ${e.showDialog?ht`
      <textarea wrap="off">${JSON.stringify(e,null,2)}</textarea>
    `:"no dialog"}
    <div style="padding:.25em">
      <button type="button" onclick="provider_debug_dialog.close()">🅧 close</button>
    </div>
  </dialog>
`)),cn=vt((({propCounter:e,propCounterChange:t})=>{const n=L(tn),o=L(nn),r=L(en),s=L(on);let i=B(!1)((e=>[i,i=e])),a=B(0)((e=>[a,a=e]));const l=lt(),c=C((()=>new u));return dt((()=>{console.info("providerDebug.ts: 👉 👉 i should only ever run once"),c.subscribe((e=>{l((t=>{o.test=e}))()}))})),++a,ht`<!--providerDebug.js-->
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
        onclick=${()=>c.set=o.test+1}
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
    
    ${i&&ht`
      <div oninit=${Nt} ondestroy=${At}>
        <hr />
        <h3>Provider as Props</h3>
        ${un(r)}
      </div>
    `}

    <div>
      renderCount inner:${a}
      ${Lt({renderCount:a,name:"providerDebugInner"})}
    </div>
  `})),un=vt((e=>ht`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(e,null,2)}</textarea>
  `)),dn=vt((()=>(e=B(0)((t=>[e,e=t])),t=B(0)((e=>[t,t=e])),n=k([e],(()=>++t)),o=B(0)((e=>[o,o=e])),r=k.noInit([e],(()=>++o)),s=B(0)((e=>[s,s=e])),i=k.asSubject([e],(()=>++s)),a=B(!1)((e=>[a,a=e])),l=B(0)((e=>[l,l=e])),c=k.truthy([a],(()=>++l)),u=B(0)((e=>[u,u=e])),d=k.truthy.asSubject([a],(()=>(++u,a))).pipe((e=>void 0===e?"undefined":u)))=>ht`
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
  </fieldset>`)),pn=()=>vt.oneRender=(e=new p(0),t=B(0)((e=>[t,t=e])))=>{++t;return ht`
    ${u.all([0,"all",4]).pipe((e=>JSON.stringify(e)))}elias
    <span>👍<span id="👍-counter-display">${e}</span></span>
    <button type="button" id="👍-counter-button"
      onclick=${()=>++e.value}
    >++👍</button>
    ${Lt({renderCount:t,name:"oneRender_tag_ts"})}
    <hr />
    ${gn()}
  `},gn=vt((()=>(e=B(0)((t=>[e,e=t])),t=S(0),n=B(0)((e=>[n,n=e])))=>(++n,ht`
  <span>👍🔨 sub counter-subject-display:<span id="👍🔨-counter-subject-display">${t}</span></span>
  <br />
  <span>👍🔨 sub counter<span id="👍🔨-counter-display">${e}</span></span>
  <br />
  <button type="button" id="👍🔨-counter-button"
    onclick=${()=>{t.next(++e)}}
  >++👍👍</button>
  ${Lt({renderCount:n,name:"insideMultiRender"})}
`))),bn={function:()=>++bn.count,count:0},fn=vt((()=>(e=B([])((t=>[e,e=t])),t=B(0)((e=>[t,t=e])),n=(()=>++t),o=B(0)((e=>[o,o=e])),r=B(!0)((e=>[r,r=e])),s=B("a")((e=>[s,s=e])),i=++o,a=(t=>{e=e.map((e=>e)),e.push("string"==typeof t?t:"push"+e.length)}),l=(t=>e=e.filter((e=>e!==t))))=>ht`
  <button id="fun-parent-button" onclick=${n}>++parent</button><span id="fun_in_prop_display">${t}</span>
  ${Lt({renderCount:o,name:"funInProps_tag_parent"})}
  <div>
    <strong>main:</strong><span id="main_wrap_state">${bn.function.toCall?"taggjedjs-wrapped":"nowrap"}</span>:${bn.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${()=>r=!r}>toggle child</button>
  array length: ${e.length}
  <button onclick=${a}>reset add</button>
  <hr />
  ${r&&yn({myFunction:n,array:e,addArrayItem:a,deleteItem:l,child:{myChildFunction:n}},bn,n)}
  ${hn(a)}
`)),hn=vt((e=>(t=B(0)((e=>[t,t=e])),n=++t,o=(t=>{if("Enter"===t.key){const n=t.target.value.trim();e(n),t.target.value=""}}))=>ht`
  <input type="text" onkeydown=${o} onchange=${t=>{e(t.target.value),t.target.value=""}} />
  <button type="button" onclick=${e}>add by outside</button>
  ${Lt({renderCount:t,name:"addArrayComponent"})}
`)),yn=vt((({addArrayItem:e,myFunction:t,deleteItem:n,child:o,array:r},s,i)=>(a=B("other")((e=>[a,a=e])),l=B(0)((e=>[l,l=e])),c=B(0)((e=>[c,c=e])),u=++c)=>ht`
  <div>
    <strong>mainFunction:</strong>${s.function.toCall?"taggjedjs-wrapped":"nowrap"}:
    <span>${s.count}</span>
  </div>
  <div>
    <strong>childFunction:</strong>${o.myChildFunction.toCall?"taggjedjs-wrapped":"nowrap"}
  </div>
  <div>
    <strong>myFunction:</strong>${t.toCall?"taggjedjs-wrapped":"nowrap"}
  </div>

  <button id="fun_in_prop1" onclick=${t}>++object argument</button>
  <button id="fun_in_prop2" onclick=${o.myChildFunction}>++child.myChildFunction</button>
  <button id="fun_in_prop3" onclick=${i}>++argument</button>
  <button onclick=${bn.function}>++main</button>
  <button onclick=${()=>++l}>++me</button>
  
  <div>
    child array length: ${r.length}
    ${r.map((e=>mn(e,n).key(e)))}
    <button onclick=${e}>addArrayItem</button>
  </div>
  
  <div>
    counter:<span>${l}</span>
  </div>
  ${Lt({renderCount:c,name:"funInProps_tag_child"})}
`)),mn=vt(((e,t)=>ht`
  <div style="border:1px solid black;">
    ${e}<button type="button" onclick=${()=>t(e)}>delete</button>
  </div>
`)),vn=(e,t)=>e.length>=t;function $n({onSubmit:e,placeholder:t,label:n,defaultValue:o,onBlur:r}){return ht`
        <div class="input-container">
            <input class="new-todo" id="todo-input" type="text" data-testid="text-input" placeholder=${t} value=${o} onblur=${()=>{r&&r()}} onKeyDown=${t=>{if("Enter"===t.key){const n=t.target.value.trim();if(!vn(n,2))return;e(n),t.target.value=""}}} />
            <label htmlFor="todo-input" style="visibility:hidden">
                ${n}
            </label>
        </div>
    `}const wn="ADD_ITEM",xn="UPDATE_ITEM",Cn="REMOVE_ITEM",kn="TOGGLE_ITEM",Tn="TOGGLE_ALL",_n="REMOVE_COMPLETED_ITEMS";const jn=vt(((e,t,n)=>{C("item");let o=B(!1)((e=>[o,o=e])),r=B(0)((e=>[r,r=e]));const{title:s,completed:i,id:a}=e,l=()=>t({type:Cn,payload:{id:a}});return++r,ht`
        <li class=${e.completed,""} data-testid="todo-item">
            <div class="view">
                ${o?ht`${$n({onSubmit:e=>(0===e.length?l():((e,n)=>{t({type:xn,payload:{id:e,title:n}})})(a,e),o=!1,"44s"),label:"Edit Todo Input",defaultValue:s,onBlur:()=>o=!1})} - ${s}`:ht`
                    completed:${i}
                    <input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=${i} onChange=${()=>t({type:kn,payload:{id:a}})} />
                    <label data-testid="todo-item-label" onDblClick=${()=>{o=!0}}>
                        ${s}
                    </label>
                    <button class="destroy" data-testid="todo-item-button" onClick=${l}>delete</button>
                `}
            </div>
            item render count: ${r}
        </li>
    `})),Sn=vt((({todos:e,dispatch:t})=>{let n=B(0)((e=>[n,n=e]));++n;const o=k([e,""],(()=>e.filter((e=>e))));return ht`
        <main class="main" data-testid="main">
            main renderCount: ${n} array:${o.length} of ${e.length}
            <hr />
            ${JSON.stringify(e)}
            <hr />
            ${o.length>0&&ht`
                <div class="toggle-all-container">
                    <input class="toggle-all" type="checkbox" data-testid="toggle-all" checked=${o.every((e=>e.completed))} onChange=${e=>t({type:Tn,payload:{completed:e.target.checked}})} />
                    <label class="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            `}
            <ul class="todo-list" data-testid="todo-list">
                ${o.map(((e,n)=>ht`
                    ${jn(e,t,n)}
                `.key(e.id)))}
            </ul>
        </main>
    `})),Bn=vt(((e,t)=>(n=e.filter((e=>!e.completed)),o=(()=>t({type:_n})))=>0===e.length?null:ht`
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
`));function Dn(e=21){let t="",n=e;for(;n--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64*Math.random()|0];return t}const Pn=vt((function(){return(e=B([])((t=>[e,e=t])),t=(t=>{e=((e,t)=>{switch(t.type){case wn:return e.concat({id:Dn(),title:t.payload.title,completed:!1});case xn:return e.map((e=>e.id===t.payload.id?{...e,title:t.payload.title}:e));case Cn:return e.filter((e=>e.id!==t.payload.id));case kn:return e.map((e=>e.id===t.payload.id?{...e,completed:!e.completed}:e));case"REMOVE_ALL_ITEMS":return[];case Tn:return e.map((e=>e.completed!==t.payload.completed?{...e,completed:t.payload.completed}:e));case _n:return e.filter((e=>!e.completed))}throw Error(`Unknown action: ${t.type}`)})(e,t)}))=>ht`
        ${function(e){return ht`
        <header class="header" data-testid="header">
            <h1>todos</h1>
            ${$n({onSubmit:t=>e({type:wn,payload:{title:t}}),label:"New Todo Input",placeholder:"What needs to be done?"})}
        </header>
    `}(t)}
        ${Sn({todos:e,dispatch:t})}
        ${Bn(e,t)}
    `})),En=vt(((e="propsDebugMain")=>(e=B(0)((t=>[e,e=t])),t=B(0)((e=>[t,t=e])),n=B(0)((e=>[n,n=e])),o=B({test:33,x:"y"})((e=>[o,o=e])),r=B((()=>new Date))((e=>[r,r=e])),s=JSON.stringify(o,null,2))=>ht`
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
    ${On({propNumber:t,propsJson:o,propNumberChange:e=>{t=e}})}
  </fieldset>

  <fieldset>
    <legend>sync props callback</legend>
    🥡 syncPropNumber: <span id="sync-prop-number-display">${e}</span>
    <button onclick=${()=>++e}>🥡 ++</button>
    ${Lt({renderCount:n,name:"sync_props_callback"})}
    <hr />
    ${An({syncPropNumber:e,propNumberChange:t=>e=t,parentTest:e=>e})}
  </fieldset>

  <fieldset>
    <legend>date prop</legend>
    date:${r}
    <input type="date" value=${function(e){const t=new Date(e),n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return{date:`${n}-${o}-${r}`,time:`${s}:${i}`}}(r).date} onchange=${e=>{const t=e.target.value;r=new Date(t)}} />
    <hr />
    ${Nn({date:r})}
  </fieldset>
`)),Nn=vt((({date:e})=>ht`date:${e}`)),An=vt((({syncPropNumber:e,propNumberChange:t,parentTest:n})=>{C("string forced");let o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e]));return++r,e%2==1&&t(e+=1),ht`<!--syncPropDebug-->
    <div>
      🥡 child syncPropNumber:<span id="sync-prop-child-display">${e}</span>
      <button id="sync-prop-child-button" onclick=${()=>t(++e)}>🥡 ++</button>
    </div>
    <div>
      <div>
        counter:<span id="sync-prop-counter-display">${o}</span>
      </div>
      parentTest<span id="nothing-prop-counter-display">${n(o)}</span>
      <button id="nothing-prop-counter-button" onclick=${()=>n(++o)}>++</button>
    </div>
    ${Lt({renderCount:r,name:"child_sync_props_callback"})}
  `})),On=vt((({propNumber:e,propsJson:t,propNumberChange:n})=>(o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e])),s=B(e)((e=>[s,s=e])),i=k([e],(()=>s=e)),a=k([s],(()=>++r)),l=function(e){return t=>{let n=B(e)(t);return k([e],(()=>t(n=e))),t(n),n}}(e)((t=>[e,e=t])))=>ht`<!--propsDebug.js-->
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
  ${Ln({propNumber:s,callback:()=>++s})}    
`)),Ln=vt((({propNumber:e,callback:t})=>{let n=B(0)((e=>[n,n=e]));return++n,ht`
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${t}
    >🐄 🥩 local & 1-parent increase ${e}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${e}</span>
    ${Lt({renderCount:n,name:"propFnUpdateTest"})}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `}));const In=vt((function(){const e=C([]);let t=B(0)((e=>[t,t=e]));const n=()=>({name:"Person "+e.length,scores:"0,".repeat(0).split(",").map(((e,t)=>({frame:t+1,score:Math.floor(4*Math.random())+1})))});return++t,ht`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${Fn({players:e,getNewPlayer:n})}
    </div>

    <button id="array-test-push-item" onclick=${()=>{e.push(n())}}>push item ${e.length+1}</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n())}}>push 3 items</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n())}}>push 9 items</button>

    ${e.length>0&&ht`
      <button oninit=${Nt} ondestroy=${At}
        style="--animate-duration: .1s;"
        onclick=${()=>e.length=0}
      >remove all</button>
    `}

    ${Lt({renderCount:t,name:"arrayTests.ts"})}
  `})),Rn=vt((({score:e,playerIndex:t})=>{let n=B(0)((e=>[n,n=e]));return++n,ht`
    frame:${e.frame}:
    <button
      id=${`score-data-${t}-${e.frame}-inside-button`}
      onclick=${()=>++e.score}
    >inner score button ++${e.score}</button>
    <span id=${`score-data-${t}-${e.frame}-inside-display`}
    >${e.score}</span>
    <button onclick=${()=>++n}>increase renderCount</button>
    ${Lt({renderCount:n,name:"scoreData"+e.frame})}
  `})),Fn=vt((({players:e,getNewPlayer:t})=>ht`
    <!-- playersLoop.js -->
    ${e.map(((n,o)=>ht`
    <div oninit=${Nt} ondestroy=${At}
      style="background-color:black;--animate-duration: .1s;"
    >
      <div>
        name:${n.name}
      </div>
      <div>
        index:${o}
      </div>
      
      <div style="background-color:purple;padding:.5em">
        scores:${n.scores.map(((e,t)=>ht`
        <div style="border:1px solid white;--animate-duration: .1s;"
          oninit=${Nt} ondestroy=${At}
        >
          <fieldset>
            <legend>
              <button id=${`score-data-${t}-${e.frame}-outside-button`}
                onclick=${()=>++e.score}
              >outer score button ++${e.score}</button>
              <span id=${`score-data-${t}-${e.frame}-outside-display`}
              >${e.score}</span>
            </legend>
            ${Rn({score:e,playerIndex:t})}
          </fieldset>
        </div>
      `.key(e)))}</div>
      
      ${n.edit&&ht`
        <button onclick=${()=>{e.splice(o,1),n.edit=!n.edit}}>remove</button>
      `}
      ${n.edit&&ht`
        <button id=${"player-remove-promise-btn-"+o} onclick=${async()=>{n.edit=!n.edit,e.splice(o,1)}}>remove by promise</button>
      `}
      <button id=${"player-edit-btn-"+o} onclick=${()=>n.edit=!n.edit}>edit</button>
      <button onclick=${()=>{e.splice(o,0,t())}}>add before</button>
    </div>
  `.key(n)))}
    <!-- end:playersLoop.js -->
  `)),Vn=vt((()=>{let e=B("app first state")((t=>[e,e=t])),t=B(!1)((e=>[t,t=e])),o=B(0)((e=>[o,o=e])),r=B(0)((e=>[r,r=e])),s=B(null)((e=>[s,s=e]));function i(e=!0){s=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await async function(){await Promise.resolve().then(n.bind(n,987)),await Promise.resolve().then(n.bind(n,979)),await Promise.resolve().then(n.bind(n,888)),await Promise.resolve().then(n.bind(n,977)),await Promise.resolve().then(n.bind(n,434)),await Promise.resolve().then(n.bind(n,110)),await Promise.resolve().then(n.bind(n,735)),await Promise.resolve().then(n.bind(n,973)),await Promise.resolve().then(n.bind(n,893)),await Promise.resolve().then(n.bind(n,790)),await Promise.resolve().then(n.bind(n,122)),await Promise.resolve().then(n.bind(n,389)),await Promise.resolve().then(n.bind(n,153)),await Promise.resolve().then(n.bind(n,241)),await Promise.resolve().then(n.bind(n,961));try{const e=Date.now();await(0,zt.ht)();const t=Date.now()-e;return console.info(`✅ all tests passed in ${t}ms`),!0}catch(e){return console.error("❌ tests failed: "+e.message,e),!1}}();e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),2e3)}pt((()=>{clearTimeout(s),s=null})),++r;const a=lt(),l=C((()=>new u(o)));dt((()=>{console.info("1️⃣ app init should only run once"),i(!1),l.subscribe(a((e=>o=e)))}));return ht`<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${4}</h1>

    <button id="toggle-test" onclick=${()=>{t=!t}}>toggle test ${t}</button>
    <button onclick=${i}>run test</button>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>l.set=o+1}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-display">${o}</span>
      </span>
    </div>

    ${Lt({name:"app",renderCount:r})}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${Qt({appCounterSubject:l})}
        </fieldset>

        <fieldset id="counters" style="flex:2 2 20em">
          <legend>⌚️ watch testing</legend>
          ${dn()}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${rn(void 0)}
        </fieldset>

        <fieldset id="props-debug" style="flex:2 2 20em">
          <legend>Props Debug</legend>
          ${En(void 0)}
        </fieldset>

        ${Ut(void 0)}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${Ct()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${kt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${It(void 0)}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>arrays</legend>
          ${In()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Mirroring</legend>
          ${Jt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${Tt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>oneRender</legend>
          ${pn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>functions in props</legend>
          ${fn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>todo</legend>
          ${Pn()}
        </fieldset>
      </div>

      ${Ot()}
    </div>
  `}));var Hn;!function(e){e.Todo="todo",e.FunInPropsTag="funInPropsTag",e.OneRender="oneRender",e.WatchTesting="watchTesting",e.Mirroring="mirroring",e.Content="content",e.Arrays="arrays",e.Counters="counters",e.TableDebug="tableDebug",e.Props="props",e.Child="child",e.TagSwitchDebug="tagSwitchDebug",e.ProviderDebug="providerDebug"}(Hn||(Hn={}));const Mn=Object.values(Hn),Jn=function(){const e=localStorage.taggedjs||JSON.stringify({autoTest:!0,views:[]});return JSON.parse(e)}();function Wn(){localStorage.taggedjs=JSON.stringify(Jn)}const Gn=vt((()=>{C("isolated app state");let e=B(0)((t=>[e,e=t])),t=B(0)((e=>[t,t=e])),o=B(null)((e=>[o,o=e]));const r=C((()=>new u(t))),s=lt();function i(e=!0){o=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await async function(e){await Promise.resolve().then(n.bind(n,987)),e.includes(Hn.Content)&&await Promise.resolve().then(n.bind(n,888)),e.includes(Hn.Counters)&&await Promise.resolve().then(n.bind(n,977)),e.includes(Hn.Props)&&await Promise.resolve().then(n.bind(n,434)),e.includes(Hn.ProviderDebug)&&await Promise.resolve().then(n.bind(n,110)),e.includes(Hn.TagSwitchDebug)&&await Promise.resolve().then(n.bind(n,735)),e.includes(Hn.Child)&&await Promise.resolve().then(n.bind(n,973)),e.includes(Hn.Arrays)&&await Promise.resolve().then(n.bind(n,893)),e.includes(Hn.Mirroring)&&await Promise.resolve().then(n.bind(n,790)),e.includes(Hn.WatchTesting)&&await Promise.resolve().then(n.bind(n,122)),e.includes(Hn.FunInPropsTag)&&await Promise.resolve().then(n.bind(n,153)),e.includes(Hn.OneRender)&&await Promise.resolve().then(n.bind(n,389)),e.includes(Hn.Todo)&&await Promise.resolve().then(n.bind(n,241)),await Promise.resolve().then(n.bind(n,961));try{const e=Date.now();await(0,zt.ht)();const t=Date.now()-e;return console.info(`✅ isolated tests passed in ${t}ms`),!0}catch(e){return console.error("❌ isolated tests failed: "+e.message,e),!1}}(Jn.views);e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),2e3)}return dt((()=>{console.info("1️⃣ app init should only run once"),r.subscribe(s((e=>{t=e}))),Jn.autoTest&&i(!1)})),++e,ht`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>r.set=t+1}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-display">${t}</span>
      </span>
      auto testing <input type="checkbox" ${Jn.autoTest?"checked":null} onchange=${function(){Jn.autoTest=Jn.autoTest=!Jn.autoTest,Wn()}} />
      <button type="button" onclick=${()=>i(!0)}>run tests</button>
    </div>

    <div>
      <h3>Sections</h3>
      <div style="display:flex;gap:1em;flex-wrap:wrap;margin:1em;">
        ${Mn.map((e=>ht`
          <div>
            <input type="checkbox"
              id=${"view-type-"+e} name=${"view-type-"+e}
              ${Jn.views.includes(e)&&"checked"}
              onclick=${()=>function(e){Jn.views.includes(e)?Jn.views=Jn.views.filter((t=>t!==e)):(Jn.views.push(e),Jn.autoTest&&i()),Wn()}(e)}
            />
            <label for=${"view-type-"+e}>&nbsp;${e}</label>
          </div>
        `.key(e)))}
      </div>
    </div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${Jn.views.includes(Hn.OneRender)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>oneRender</legend>
            ${pn()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Props)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${En(void 0)}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.WatchTesting)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>watchTesting</legend>
            ${dn()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.TableDebug)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${Tt()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.ProviderDebug)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${rn(void 0)}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.TagSwitchDebug)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${It(void 0)}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Mirroring)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${Jt()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Arrays)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${In()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Counters)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${Qt({appCounterSubject:r})}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Content)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${kt()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Child)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${Ut(void 0)}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.FunInPropsTag)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>funInPropsTag</legend>
            ${fn()}
          </fieldset>
        `}

        ${Jn.views.includes(Hn.Todo)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>todo</legend>
            ${Pn()}
          </fieldset>
        `}

        ${!1}
      </div>
      ${Lt({renderCount:e,name:"isolatedApp"})}
    </div>
  `})),Yn=()=>{console.info("attaching app to element...");const e=document.getElementsByTagName("app")[0],t=window.location.pathname.split("/").filter((e=>e)),n=t[0]?.toLowerCase();if(n&&["isolated.html","index-static.html"].includes(n)){const t=Date.now();wt(Gn,e,{test:1});const n=Date.now()-t;return void console.info(`⏱️ isolated render in ${n}ms`)}const o=Date.now();wt(Vn,e,{test:1});const r=Date.now()-o;console.info(`⏱️ rendered in ${r}ms`)}})();var r=o.gV,s=o.jG,i=o.l2,a=o.fm;export{r as App,s as IsolatedApp,i as app,a as hmr};
//# sourceMappingURL=bundle.js.map