var e={893:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.yY)("array testing",(()=>{(0,r.it)("array basics",(()=>{(0,r.l_)((0,o.o5)("#array-test-push-item")).toBe(1);const e=(0,o.o5)("#score-data-0-1-inside-button");(0,r.l_)(e).toBe(0),(0,r.l_)((0,o.o5)("#score-data-0-1-outside-button")).toBe(0),(0,o.L7)("array-test-push-item").click(),(0,r.l_)((0,o.o5)("#score-data-0-1-inside-button")).toBe(1),(0,r.l_)((0,o.o5)("#score-data-0-1-outside-button")).toBe(1);const t=(0,o.L7)("score-data-0-1-inside-button"),n=(0,o.L7)("score-data-0-1-inside-display");let s=n.innerText;const i=(0,o.L7)("score-data-0-1-outside-button"),a=(0,o.L7)("score-data-0-1-outside-display"),l=a.innerText;(0,r.l_)(s).toBe(l),t.click(),(0,r.l_)(n.innerText).toBe(a.innerText),(0,r.l_)(s).toBe((Number(n.innerText)-1).toString()),(0,r.l_)(s).toBe((Number(a.innerText)-1).toString()),i.click(),(0,r.l_)(n.innerText).toBe(a.innerText),(0,r.l_)(s).toBe((Number(n.innerText)-2).toString()),(0,r.l_)(s).toBe((Number(a.innerText)-2).toString())})),(0,r.it)("🗑️ deletes",(async()=>{var e;(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(0),(0,r.l_)((0,o.o5)("#player-edit-btn-0")).toBe(1),await(0,o.L7)("player-edit-btn-0").onclick(),(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(1),await(0,o.L7)("player-remove-promise-btn-0").onclick(),await(e=1e3,new Promise((t=>setTimeout(t,e)))),(0,r.l_)((0,o.o5)("#player-remove-promise-btn-0")).toBe(0),(0,r.l_)((0,o.o5)("#player-edit-btn-0")).toBe(0)}))}))},973:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.it)("child tests",(()=>{(0,r.di)("#innerHtmlPropsTest-button","#innerHtmlPropsTest-display"),(0,r.di)("#innerHtmlTest-counter-button","#innerHtmlTest-counter-display"),(0,r.Iq)(["#childTests-button","#childTests-display"],["#child-as-prop-test-button","#child-as-prop-test-display"],["#innerHtmlPropsTest-childTests-button","#innerHtmlPropsTest-childTests-display"]),(0,r.Iq)(["#childTests-button","#childTests-display"],["#innerHtmlTest-childTests-button","#innerHtmlTest-childTests-display"])}))},888:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.yY)("content",(()=>{(0,o.it)("basic",(()=>{(0,r.Lo)("#content-subject-pipe-display0","#content-subject-pipe-display1"),(0,r.Lo)("#content-combineLatest-pipe-display0","#content-combineLatest-pipe-display1")})),(0,o.it)("html",(()=>{(0,r.Lo)("#content-combineLatest-pipeHtml-display0","#content-combineLatest-pipeHtml-display1")}))}))},977:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("counters",(()=>{const e="0"===(0,o.dy)("#🍄-slowChangeCount");(0,r.it)("basics",(()=>{const t=(0,o.L7)("set-main-counter-input");(0,r.l_)(t).toBeDefined(),t.value="0",t.onkeyup({target:t});const n=Number((0,o.dy)("#counters_render_count")),i=Number((0,o.dy)("#inner_counters_render_count"));(0,s.wG)("#conditional-counter",0),(0,s.di)("#❤️-increase-counter","#❤️-counter-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+2).toString()),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+2).toString()),(0,s.di)("#❤️-inner-counter","#❤️-inner-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+4).toString()),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+4).toString()),(0,s.di)("#standalone-counter","#standalone-display"),(0,r.l_)((0,o.dy)("#counters_render_count")).toBe((n+6).toString(),"render count check failed"),(0,r.l_)((0,o.dy)("#inner_counters_render_count")).toBe((i+4).toString()),(0,s.wG)("#conditional-counter",1),(0,s.wG)("#conditional-display",1),e&&(0,r.l_)((0,o.dy)("#conditional-display")).toBe("2"),(0,s.di)("#conditional-counter","#conditional-display"),(0,s.di)("#❤️-inner-counter","#❤️-inner-display"),e&&((0,r.l_)((0,o.dy)("#🪈-pipedSubject")).toBe(""),(0,r.l_)((0,o.dy)("#🪈-pipedSubject-2")).toBe("")),(0,o.V4)("#🥦-subject-increase-counter");const a=(0,o.dy)("#🪈-pipedSubject"),l=(0,o.dy)("#🥦-subject-counter-display");(0,r.l_)(a).toBe(l,`Expected #🪈-pipedSubject value(${a}) to match #🥦-subject-counter-display value(${l})`),(0,r.l_)((0,o.dy)("#🪈-pipedSubject-2")).toBe((0,o.dy)("#🥦-subject-counter-display"))}))}))},617:(e,t,n)=>{function o(e){return document.querySelectorAll(e).length}function r(e){return document.querySelectorAll(e)}function s(e){return r(e).forEach((e=>e.focus()))}function i(e){return r(e).forEach((e=>e.click()))}function a(e,t=0){return r(e)[t].click()}function l(e){let t="";return r(e).forEach((e=>t+=e.innerHTML)),t}function d(e){return document.getElementById(e)}function c(e){return document.getElementById(e).innerHTML}n.d(t,{IO:()=>r,L7:()=>d,T_:()=>s,V4:()=>i,_8:()=>c,dQ:()=>a,dy:()=>l,o5:()=>o})},933:(e,t,n)=>{n.d(t,{Fr:()=>s,Iq:()=>a,Lo:()=>r,di:()=>d,wG:()=>i});var o=n(435);function r(...e){const t=e.reduce(((e,t)=>{const n=document.querySelectorAll(t);return e.push(...n),e}),[]);(0,o.l_)(t.length).toBeGreaterThan(0,"Expected elements to be present in expectMatchedHtml() query but found none");const n=t.pop().innerHTML;t.every((t=>(0,o.l_)(n).toBe(t.innerHTML,(()=>`expectMatchedHtml unmatched html - queries: ${e.join(" - ")}`))))}function s(e,t){document.querySelectorAll(e).forEach((n=>(0,o.l_)(n.innerHTML).toBe(t,(()=>`Expected element ${e} innerHTML to be --\x3e${t}<-- but it was --\x3e${n.innerHTML}<--`))))}function i(e,t,n){const r=document.querySelectorAll(e),s=r.length;return n=n||`Expected ${t} elements to match query ${e} but found ${s}`,(0,o.l_)(s).toBe(t,n),r}function a(...e){const[t,n]=e.shift();let r=i(n,1),s=i(t,1);const a=r[0].innerText;l(s,r,{elementCountExpected:1},t,n);let d=2;e.forEach((([e,c])=>{r=i(c,1),s=i(e,1);let u=r[0],p=u.innerText;const g=(Number(a)+d).toString();(0,o.l_)(p).toBe(g,(()=>`Expected second increase provider to be increased to ${a} but got ${p}`)),l(s,r,{elementCountExpected:1},t,n),u=r[0],p=u.innerText;const b=d+2;(0,o.l_)(p).toBe((Number(a)+b).toString(),(()=>`Expected ${c} innerText to be ${Number(a)+b} but instead it is ${p}`)),d+=2}))}function l(e,t,{elementCountExpected:n}={elementCountExpected:1},r,s){(0,o.l_)(e.length).toBe(n,(()=>`Expected ${r} to be ${n} elements but is instead ${e.length}`)),(0,o.l_)(t.length).toBe(n,(()=>`Expected ${s} to be ${n} elements but is instead ${t.length}`)),e.forEach(((e,t)=>{const n=document.querySelectorAll(s)[t];(0,o.l_)(document.body.contains(n)).toBe(!0,`The selected element ${s} is no longer an element on the document body before clicking ${r}`);let i=Number(n?.innerText);e.click(),(0,o.l_)(n).toBeDefined(),(0,o.l_)(document.body.contains(n)).toBe(!0,`The selected element ${s} is no longer an element on the document body after clicking ${r}`);let a=i+1;i=Number(n.innerText),(0,o.l_)(document.body.contains(n)).toBe(!0),(0,o.l_)(a).toBe(i,(()=>`Counter test 1 of 2 expected ${s} to be value ${a} but it is ${i}`)),e.click(),i=Number(n?.innerText),++a,(0,o.l_)(a).toBe(i,(()=>`Counter test 2 of 2 expected ${s} to increase value to ${a} but it is ${i}`))}))}function d(e,t,{elementCountExpected:n}={elementCountExpected:1}){return l(document.querySelectorAll(e),document.querySelectorAll(t),{elementCountExpected:n},e,t)}},435:(e,t,n)=>{n.d(t,{ht:()=>d,it:()=>a,l_:()=>u,yY:()=>i});const o=[];let r=[],s=0;function i(e,t){r.push((async()=>{const n=r;r=[];try{console.debug("  ".repeat(s)+"↘ "+e),++s,await t(),await c(r),--s}catch(e){throw--s,e}finally{r=n}}))}function a(e,t){r.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(" ".repeat(s)+`✅ ${e} - ${o}ms`)}catch(t){throw console.debug(" ".repeat(s)+"❌ "+e),t}}))}function l(){o.length=0,r.length=0}async function d(){return o.length?c(o):c(r)}async function c(e){for(const t of e)try{await t()}catch(e){throw console.error(`Error testing ${t.name}`),l(),e}l()}function u(e){return{toBeDefined:t=>{if(null!=e)return;t instanceof Function&&(t=t());const n=t||`Expected ${JSON.stringify(e)} to be defined`;throw console.error(n,{expected:e}),new Error(n)},toBe:(t,n)=>{if(e===t)return;n instanceof Function&&(n=n());const o=n||`Expected ${typeof e} ${JSON.stringify(e)} to be ${typeof t} ${JSON.stringify(t)}`;throw console.error(o,{received:t,expected:e}),new Error(o)},toBeGreaterThan:(t,n)=>{const o=e;if(!isNaN(o)&&o>t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be greater than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)},toBeLessThan:(t,n)=>{const o=e;if(!isNaN(o)&&o<t)return;const r=n||`Expected ${typeof e} ${JSON.stringify(e)} to be less than amount`;throw console.error(r,{amount:t,expected:e}),new Error(r)}}}i.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)},i.only=(e,t)=>{o.push((async()=>{const n=r;r=[];try{console.debug("  ".repeat(s)+"↘ "+e),++s,await t(),await c(r),--s}catch(e){throw--s,e}finally{r=n}}))},a.only=(e,t)=>{o.push((async()=>{try{const n=Date.now();await t();const o=Date.now()-n;console.debug(`✅ ${e} - ${o}ms`)}catch(t){throw console.debug("❌ "+e),t}}))},a.skip=(e,t)=>{console.debug("⏭️ Skipped "+e)}},153:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("function in props",(()=>{(0,s.di)("#fun_in_prop1","#fun_in_prop_display"),(0,s.di)("#fun_in_prop2","#fun_in_prop_display"),(0,s.di)("#fun_in_prop3","#fun_in_prop_display"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("taggjedjs-wrapped"),(0,o.V4)("#toggle-fun-in-child"),(0,o.V4)("#fun-parent-button"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("nowrap"),(0,o.V4)("#toggle-fun-in-child"),(0,o.V4)("#fun-parent-button"),(0,r.l_)((0,o.dy)("#main_wrap_state")).toBe("taggjedjs-wrapped")}))},790:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("🪞 mirror testing",(()=>{(0,s.wG)("#mirror-counter-display",2),(0,s.wG)("#mirror-counter-button",2);const e=Number((0,o._8)("mirror-counter-display"));(0,o.L7)("mirror-counter-button").click(),(0,r.l_)(e+1).toBe(Number((0,o._8)("mirror-counter-display"))),(0,s.wG)("#mirror-counter-display",2),(0,s.Lo)("#mirror-counter-display")}))},389:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.it)("oneRender",(()=>{(0,r.l_)((0,o.dy)("#oneRender_tag_ts_render_count")).toBe("1"),(0,s.di)("#👍-counter-button","#👍-counter-display"),(0,s.di)("#👍👍-counter-button","#👍👍-counter-display"),(0,s.di)("#👍👍-counter-button","#👍👍-counter-subject-display"),(0,r.l_)((0,o.dy)("#oneRender_tag_ts_render_count")).toBe("1")}))},434:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("props",(()=>{(0,r.it)("test duels",(()=>{(0,s.Iq)(["#propsDebug-🥩-0-button","#propsDebug-🥩-0-display"],["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"])})),(0,r.it)("child prop communications",(()=>{(0,s.Iq)(["#propsDebug-🥩-1-button","#propsDebug-🥩-1-display"],["#propsOneLevelFunUpdate-🥩-button","#propsOneLevelFunUpdate-🥩-display"])})),(0,r.it)("letProp",(()=>{(0,s.Lo)("#propsDebug-🥩-0-display","#propsDebug-🥩-2-display");const e=Number((0,o.dy)("#propsDebug-🥩-0-display"));(0,o.V4)("#propsDebug-🥩-2-button"),(0,r.l_)((0,o.dy)("#propsDebug-🥩-0-display")).toBe(e.toString()),(0,r.l_)((0,o.dy)("#propsDebug-🥩-2-display")).toBe((e+1).toString())})),(0,r.it)("basics",(()=>{const e=(0,o.L7)("propsOneLevelFunUpdate-🥩-display").innerHTML,t=(0,o.dy)("#propsDebug-🥩-change-display");(0,r.l_)(t).toBe((Number(e)+1).toString());const n=(0,o.L7)("propsDebug-🥩-0-display").innerHTML,s=(0,o.L7)("propsDebug-🥩-1-display").innerHTML,i=(0,o.L7)("propsOneLevelFunUpdate-🥩-display").innerHTML,a=Number(n),l=Number(s),d=Number(i);(0,r.l_)(l).toBe(d),(0,r.l_)(a+2).toBe(l),(0,o.L7)("propsDebug-🥩-1-button").click()})),(0,r.it)("props as functions",(()=>{const e=Number((0,o._8)("sync-prop-number-display"));(0,s.Lo)("#sync-prop-number-display","#sync-prop-child-display"),(0,o.L7)("sync-prop-child-button").click(),(0,s.Fr)("#sync-prop-number-display",(e+2).toString()),(0,s.di)("#nothing-prop-counter-button","#nothing-prop-counter-display"),(0,s.Fr)("#sync-prop-number-display",(e+2).toString()),(0,s.Lo)("#sync-prop-counter-display","#nothing-prop-counter-display")}))}))},110:(e,t,n)=>{n.r(t);var o=n(435),r=n(933);(0,o.yY)("providers",(()=>{(0,o.it)("basics",(()=>{(0,r.Iq)(["#increase-provider-🍌-0-button","#increase-provider-🍌-0-display"],["#increase-provider-🍌-1-button","#increase-provider-🍌-1-display"]),(0,r.Iq)(["#increase-provider-upper-🌹-0-button","#increase-provider-upper-🌹-0-display"],["#increase-provider-upper-🌹-1-button","#increase-provider-upper-🌹-1-display"]),(0,r.Iq)(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"])})),(0,o.it)("inner outer debug",(()=>{(0,r.Iq)(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"]),(0,r.Iq)(["#increase-provider-🍀-0-button","#increase-provider-🍀-0-display"],["#increase-provider-🍀-1-button","#increase-provider-🍀-1-display"]),(0,r.Iq)(["#increase-prop-🐷-0-button","#increase-prop-🐷-0-display"],["#increase-prop-🐷-1-button","#increase-prop-🐷-1-display"])}))}))},735:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("tagSwitching",(()=>{(0,r.it)("0",(()=>{(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(1,"Expected select-tag-above element to be defined"),(0,r.l_)((0,o.o5)("#tag-switch-dropdown")).toBe(1,"Expected one #tag-switch-dropdown"),(0,r.l_)((0,o.o5)("#tagSwitch-1-hello")).toBe(2,"Expected two #tagSwitch-1-hello elements"),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0)})),(0,r.it)("1",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="1",e.onchange({target:e}),(0,s.wG)("#tagSwitch-1-hello",5),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("2",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="2",e.onchange({target:e}),(0,s.wG)("#tagSwitch-1-hello",2),(0,s.wG)("#tagSwitch-2-hello",4),(0,r.l_)((0,o.o5)("#tagSwitch-3-hello")).toBe(0),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("3",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="3",e.onchange({target:e}),(0,r.l_)((0,o.o5)("#tagSwitch-1-hello")).toBe(0,"Expected no hello 1s"),(0,r.l_)((0,o.o5)("#tagSwitch-2-hello")).toBe(0),(0,s.wG)("#tagSwitch-3-hello",7),(0,r.l_)((0,o.o5)("#select-tag-above")).toBe(0)})),(0,r.it)("4",(()=>{const e=(0,o.L7)("tag-switch-dropdown");e.value="",e.onchange({target:e}),(0,s.wG)("#select-tag-above",1),(0,s.wG)("#tag-switch-dropdown",1),(0,s.wG)("#tagSwitch-1-hello",2),(0,s.wG)("#tagSwitch-2-hello",0),(0,s.wG)("#tagSwitch-3-hello",0)}))}))},241:(e,t,n)=>{n.r(t);var o=n(617),r=n(435);(0,r.yY)("todos",(()=>{const e=(0,o.L7)("todo-input");(0,r.it)("add one remove one",(()=>{(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0),e.value="one",e.onkeydown({key:"Enter",target:e}),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(1),(0,o.V4)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0)})),(0,r.it)("basic",(()=>{e.value="one",e.onkeydown({key:"Enter",target:e}),(0,o.V4)('input[data-testid="todo-item-toggle"]'),(0,o.V4)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('button[data-testid="todo-item-button"]').length).toBe(0),e.value="one",e.onkeydown({key:"Enter",target:e}),e.value="two",e.onkeydown({key:"Enter",target:e});const t=(0,o.IO)('input[data-testid="todo-item-toggle"]')[1];t.click(),(0,r.l_)(t.checked).toBe(!0),e.value="three",e.onkeydown({key:"Enter",target:e}),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(3),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(2),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(1),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('input[data-testid="todo-item-toggle"]').length).toBe(0)})),(0,r.it)("editing",(()=>{e.value="one",e.onkeydown({key:"Enter",target:e});let t=new MouseEvent("dblclick",{bubbles:!0,cancelable:!0,view:window});(0,o.IO)('label[data-testid="todo-item-label"]')[0].dispatchEvent(t),(0,o.T_)('input[data-testid="text-input"]');const n=(0,o.IO)('input[data-testid="text-input"]')[1];n.value="two",n.onkeydown({key:"Enter",target:n}),(0,r.l_)((0,o.IO)('input[data-testid="text-input"]').length).toBe(1),(0,o.dQ)('button[data-testid="todo-item-button"]'),(0,r.l_)((0,o.IO)('label[data-testid="todo-item-label"]').length).toBe(0)}))}))},122:(e,t,n)=>{n.r(t);var o=n(617),r=n(435),s=n(933);(0,r.yY)("⌚️ watch tests",(()=>{const e=(0,o.dy)("#🍄-slowChangeCount"),t="0"===e;(0,r.it)("basic",(()=>{const n=Number((0,o._8)("watch-testing-num-display"));(0,s.Lo)("#watch-testing-num-display","#🍄-slowChangeCount"),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("false"),t?((0,r.l_)((0,o.dy)("#🍄-watchPropNumSlow")).toBe(""),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe("false"),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe("undefined")):((0,r.l_)((0,o.dy)("#🍄-watchPropNumSlow")).toBe(e),(0,r.l_)(Number((0,o.dy)("#🦷-watchTruth"))).toBeGreaterThan(Number(e)),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe((0,o.dy)("#🦷-truthSubChangeCount"))),(0,o.V4)("#watch-testing-num-button"),(0,s.Lo)("#watch-testing-num-display","#🍄-slowChangeCount"),(0,s.Lo)("#🍄-watchPropNumSlow","#🍄-slowChangeCount"),(0,r.l_)((0,o.dy)("#🍄‍🟫-subjectChangeCount")).toBe((n+2).toString()),(0,s.Lo)("#🍄‍🟫-subjectChangeCount","#🍄‍🟫-watchPropNumSubject");const i=Number((0,o.dy)("#🦷-truthChangeCount"));(0,o.V4)("#🦷-truthChange-button");let a=(i+1).toString();(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("true"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),a=(i+1).toString(),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("false"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),a=(i+2).toString(),(0,r.l_)((0,o.dy)("#🦷-truthChange")).toBe("true"),(0,r.l_)((0,o.dy)("#🦷-watchTruth")).toBe(a),(0,r.l_)((0,o.dy)("#🦷-truthChangeCount")).toBe(a),(0,o.V4)("#🦷-truthChange-button"),(0,o.V4)("#🦷-reset-button"),(0,r.l_)((0,o.dy)("#🦷-watchTruthAsSub")).toBe((0,o.dy)("#🦷-watchTruth"))}))}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{var e;function t(t){return[e.tag,e.templater].includes(t?.tagJsType)}function r(t){return t?.tagJsType===e.tagComponent}function s(t){return t?.tagJsType===e.tag}function i(e){return!(!0!==e?.isSubject&&!e?.subscribe)}function a(t){return t instanceof Array&&t.every((t=>[e.tag,e.templater,e.tag,e.tagComponent].includes(t?.tagJsType)))}function l(e){const t=new c;return t.subscribeWith=t=>{const n=[],o=[],r=(r,s)=>{n[s]=!0,o[s]=r;if(n.length===e.length){for(let e=n.length-1;e>=0;--e)if(!n[e])return;t(o,i)}},s=[...e],i=s.shift().subscribe((e=>r(e,0))),a=s.map(((e,t)=>e.subscribe((e=>r(e,t+1)))));return i.subscriptions=a,i},t}function d(e,t,n){const o=[...t],r=o.shift(),s=e=>{if(o.length)return d(e,o,n);n(e)};let i=s;const a=r(e,{setHandler:e=>i=e,next:s});i(a)}n.d(o,{gV:()=>Vn,jG:()=>Wn,l2:()=>Gn,fm:()=>wt}),function(e){e.unknown="unknown",e.tag="tag",e.templater="templater",e.tagComponent="tag-component",e.tagArray="tag-array",e.subject="subject",e.date="date",e.string="string",e.boolean="boolean",e.function="function",e[void 0]="undefined"}(e||(e={}));class c{value;onSubscription;methods=[];isSubject=!0;subscribers=[];subscribeWith;_value;set;constructor(e,t){this.value=e,this.onSubscription=t,this._value=e,u(this)}subscribe(e){const t=function(e,t,n){const o=c.globalSubCount$;c.globalSubCount$.next(o._value+1);const r=()=>{r.unsubscribe()};return r.callback=t,r.subscriptions=[],r.unsubscribe=()=>{!function(e,t){const n=e.findIndex((e=>e.callback===t));-1!==n&&e.splice(n,1)}(n,t),c.globalSubCount$.next(o._value-1),r.unsubscribe=()=>r;const e=r.subscriptions;for(let t=e.length-1;t>=0;--t)e[t].unsubscribe();return r},r.add=e=>(r.subscriptions.push(e),r),r.next=e=>{t(e,r)},r}(0,e,this.subscribers),n=this.subscribeWith;if(n){if(this.methods.length){const n=e;e=e=>{d(e,this.methods,(e=>n(e,t)))}}return n(e)}return this.subscribers.push(t),this.onSubscription&&this.onSubscription(t),t}next(e){this._value=e,this.emit()}emit(){const e=this._value,t=[...this.subscribers],n=t.length;for(let o=0;o<n;++o){const n=t[o];n.callback(e,n)}}toPromise(){return new Promise((e=>{this.subscribe(((t,n)=>{n.unsubscribe(),e(t)}))}))}toCallback(e){const t=this.subscribe(((n,o)=>{t.unsubscribe(),e(n)}));return this}pipe(...e){const t=new c(this._value);return t.setMethods(e),t.subscribeWith=e=>this.subscribe(e),t.next=e=>this.next(e),t}setMethods(e){this.methods=e}static all(e){return l(e.map((e=>{if(i(e))return e;return new c(e,(t=>(t.next(e),t)))})))}static globalSubCount$=new c(0)}function u(e){Object.defineProperty(e,"value",{set(t){e._value=t,e.emit()},get:()=>e._value}),Object.defineProperty(e,"set",{set:t=>e.next(t),get:()=>t=>e.next(t)})}class p extends c{value;constructor(e){super(e),this.value=e,u(this)}subscribe(e){const t=super.subscribe(e);return e(this._value,t),t}}function g(){return b.memory.stateConfig.tagSupport}function b(e){const t={beforeRender:e.beforeRender||(()=>{}),beforeRedraw:e.beforeRedraw||(()=>{}),afterRender:e.afterRender||(()=>{}),beforeDestroy:e.beforeDestroy||(()=>{})};b.tagUse.push(t)}b.tagUse=[],b.memory={};class f extends Error{details;constructor(e,t,n={}){super(e),this.name=f.name,this.details={...n,errorCode:t}}}class h extends f{constructor(e,t){super(e,"array-no-key-error",t),this.name=h.name}}class m extends f{constructor(e,t){super(e,"state-mismatch-error",t),this.name=m.name}}class y extends f{constructor(e,t){super(e,"sync-callback-error",t),this.name=y.name}}b.memory.stateConfig={array:[]};const v=e=>function(e){const t=e.memory,n=t.state,o=b.memory.stateConfig;o.rearray=[];const r=n?.length;if(r){for(let e=0;e<r;++e)$(n[e]);o.rearray.push(...n)}o.tagSupport=e}(e);function $(e){const t=e.callback;if(!t)return e.defaultValue;const[n,o]=function(e){const t=e(w),[n]=t,[o]=e(n);return[n,o]}(t);if(o!==w){const r='letState function incorrectly used. Second item in array is not setting expected value.\n\nFor "let" state use `let name = state(default)(x => [name, name = x])`\n\nFor "const" state use `const name = state(default)()`\n\nProblem state:\n'+(t?t.toString():JSON.stringify(e))+"\n";throw console.error(r,{state:e,callback:t,value:n,checkValue:o}),new Error(r)}return n}b({beforeRender:v,beforeRedraw:v,afterRender:e=>{const t=e.memory,n=b.memory.stateConfig,o=n.rearray;if(o.length&&o.length!==n.array.length){const t=`States lengths have changed ${o.length} !== ${n.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`,r=e.templater?.wrapper,s={oldStates:n.array,newStates:n.rearray,tagFunction:r.parentWrap.original},i=new m(t,s);throw console.warn(t,s),i}delete n.rearray,delete n.tagSupport,t.state.length=0,t.state.push(...n.array);const r=t.state;for(let e=r.length-1;e>=0;--e){const t=r[e];t.lastValue=$(t)}n.array=[]}});class w{}function C(e,t){for(let n=e.length-1;n>=0;--n){const o=e[n].get(),r=t[n].callback;r&&r(o),t[n].lastValue=o}}function x(e){const t=b.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=$(o);n=t=>[e,e=t];const r={get:()=>$(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),e}let r=(e instanceof Function?e:()=>e)();if(r instanceof Function){const e=t.array,n=t.tagSupport,o=r;r=(...t)=>{const r=n.global.newest.memory.state;C(r,e);const s=o(...t);return C(e,r),s},r.original=o}n=e=>[r,r=e];const s={get:()=>$(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),r}const T=(e,t)=>k(e,t),S=e=>e;const k=(e,t,{init:n,before:o=(()=>!0),final:r=S}={})=>{let s=x({pastResult:void 0,values:void 0});const i=s.values;if(void 0===i){if(!o(e))return s.values=e,s.pastResult;const a=(n||t)(e,i);return s.pastResult=r(a),s.values=e,s.pastResult}if(e.every(((e,t)=>e===i[t])))return s.pastResult;if(!o(e))return s.values=e,s.pastResult;const a=t(e,i);return s.pastResult=r(a),i.length=0,i.push(...e),s.pastResult};function _(e,t){return Object.defineProperty(t,"noInit",{get(){const t=e();return t.setup.init=()=>{},t}}),Object.defineProperty(t,"asSubject",{get(){const t=e(),n=x((()=>g())),o=x((()=>new p(void 0))),r=(e,r)=>(k(e,((e,t)=>{const s=g(),i=r(e,t);if(s!==n){C(b.memory.stateConfig.array,n.memory.state)}o.next(i)}),t.setup),o);return r.setup=t.setup,_((()=>r),r),r}}),Object.defineProperty(t,"truthy",{get(){const t=e();return t.setup.before=e=>e.every((e=>e)),t}}),t}function B(e,t){const n=x((()=>b.memory.stateConfig.array)),o=g();return x((()=>new c(e,t).pipe((e=>(C(o.memory.state,n),e)))))}function D(e){const t=b.memory.stateConfig;let n;const o=t.rearray[t.array.length];if(o){let e=$(o);n=t=>[e,e=t];const r={get:()=>$(r),callback:n,lastValue:e,defaultValue:o.defaultValue};return t.array.push(r),j(e,r)}let r=(e instanceof Function?e:()=>e)();n=e=>[r,r=e];const s={get:()=>$(s),callback:n,lastValue:r,defaultValue:r};return t.array.push(s),j(r,s)}function j(e,t){return n=>(t.callback=n||(t=>[e,e=t]),e)}function P(e){return N(e,new WeakMap)}function N(e,t){if(null===e||"object"!=typeof e)return e;if(t.has(e))return t.get(e);if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));if(t.set(e,n),Array.isArray(e))for(let o=0;o<e.length;o++)n[o]=N(e[o],t);else for(const o in e)e.hasOwnProperty(o)&&(n[o]=N(e[o],t));return n}function E(e,t){return A(e,t,new WeakMap)}function A(e,t,n){return!!(e===t||(o=e,r=t,o instanceof Function&&r instanceof Function&&o.toString()===r.toString()))||(!!n.has(e)||"object"==typeof e&&"object"==typeof t&&(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():(n.set(e,0),Array.isArray(e)&&Array.isArray(t)?function(e,t,n){if(e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!A(e[o],t[o],n))return!1;return!0}(e,t,n):!Array.isArray(e)&&!Array.isArray(t)&&function(e,t,n){const o=Object.keys(e),r=Object.keys(t);if(0===o.length&&0===r.length)return!0;if(o.length!==r.length)return!1;for(const s of o){if(!r.includes(s)||!A(e[s],t[s],n))return!1}return!0}(e,t,n))));var o,r}_((()=>function(e){const t=(t,n)=>k(t,n,e);return t.setup=e,_((()=>t),t),t}({})),T),B._value=e=>{const t=x((()=>b.memory.stateConfig.array)),n=g();return x((()=>new p(e).pipe((e=>(C(n.memory.state,t),e)))))},B.all=function(e){const t=x((()=>b.memory.stateConfig.array)),n=g();return c.all(e).pipe((e=>(C(n.memory.state,t),e)))};const L=e=>{const t=x((()=>({stateDiff:0,provider:void 0})));if(t.stateDiff){for(let e=t.stateDiff;e>0;--e)x(void 0);return x(void 0)}const n=x((()=>{const n=b.memory.stateConfig,o=n.array.length,r="prototype"in e?new e:e(),s=n.tagSupport,i=n.array.length-o,a={constructMethod:e,instance:r,clone:P(r),stateDiff:i,owner:s,children:[]};return t.provider=a,s.global.providers.push(a),t.stateDiff=i,r})),o=e,r=o.compareTo=o.toString();return t.provider.constructMethod.compareTo=r,n},O=e=>x((()=>{const t=b.memory,n=e,o=n.compareTo=n.compareTo||e.toString(),r=t.stateConfig.tagSupport,s=[];let i={ownerTagSupport:r.ownerTagSupport};for(;i.ownerTagSupport;){const e=i.ownerTagSupport.global.providers.find((e=>{s.push(e);if(e.constructMethod.compareTo===o)return!0}));if(e){e.clone=P(e.instance);const n=t.stateConfig.tagSupport;return n.global.providers.push(e),e.children.push(n),e.instance}i=i.ownerTagSupport}const a=`Could not inject provider: ${e.name} ${e}`;throw console.warn(`${a}. Available providers`,s),new Error(a)}));function I(e,t){const n=e.templater,o=t.templater,r=n?.tag||e,s=o.tag,i=r.strings,a=t.strings||s.strings;if(i.length!==a.length)return!1;if(!i.every(((e,t)=>a[t]===e)))return!1;return function(e,t){const n=e.length===t.length;if(!n)return!1;const o=t.every(((t,n)=>{const o=e[n];if(t instanceof Function&&o instanceof Function){return!!(t.toString()===o.toString())}return!0}));if(o)return!0;return!1}(e.values||r.values,t.values||s.values)}function F(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRender(e,t)}function V(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].afterRender(e,t);b.memory.tagClosed$.next(t)}function R(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeDestroy(e,t);if(e.global.deleted=!0,e.hasLiveElements=!1,t){t.global.childTags=t.global.childTags.filter((t=>t!==e.global.oldest));const n=e.global;n.providers.forEach((e=>e.children.forEach(((t,o)=>{t.global===n&&e.children.splice(o,1)}))))}}function M(e,t,n,o){const r=e.global.renderCount;!function(e,t,n){const o=n?.ownerTagSupport,r=o||t;if(n){if(n!==e){const t=n.memory.state,o=e.memory;e.global=n.global,o.state.length=0,o.state.push(...t)}return function(e,t){const n=b.tagUse,o=n.length;for(let r=0;r<o;++r)n[r].beforeRedraw(e,t)}(e,n)}F(e,r)}(e,o,t);let s=(0,e.templater.wrapper)(e,n);return V(e,o),e.global.newest=s,!t&&o&&o.global.childTags.push(s),s.global.renderCount>r+1?e.global.newest:s}function H(e){e.global.oldest.destroy(),e.global.context={}}function J(e,t){let n=e,o=t;if("object"==typeof e){if(!t)return 3;n=[...e],o=[...t||[]];if(!n.every(((e,t)=>{let r=o[t];if(e&&"object"==typeof e){const t={...e},n={...r||{}},o=Object.entries(t).every((([e,o])=>W(o,n[e],(()=>{delete t[e],delete n[e]}))));return o}return W(e,r,(()=>{n.splice(t,1),o.splice(t,1)}))})))return 6}return!1}function W(e,t,n){if(!(e instanceof Function))return!!E(e,t)&&4;if(!(t instanceof Function))return!1;const o=t?.original;o&&(t=o);e.original&&(e=e.original);return e.toString()===t.toString()?(n(),3):(n(),5)}function G(e,t,n,{counts:o}){const r=t,s=r.tagSupport,i=s?.global.oldest||void 0;return i&&i?function(e,t,n){if(t instanceof Function){const e=t(n);return n.updateBy(e),t.tagSupport=e,e}return n.updateBy(e),t.tagSupport=e,e}(e,r,i):(e.buildBeforeElement(n,{counts:o}),e)}b.memory.tagClosed$=new c(void 0,(e=>{g()||e.next()}));const Y="__tagvar",q="--"+Y+"--",U=new RegExp(q,"g");class z{strings;values;tagJsType=e.tag;memory={};templater;constructor(e,t){this.strings=e,this.values=t}key(e){return this.memory.arrayValue=e,this}children;html(e,...t){return this.children={strings:e,values:t},this}}function X(e,t){t.parentNode.insertBefore(e,t.nextSibling)}function K(e){return["string","number","boolean"].includes(e)}function Q(e,t){e.destroy({stagger:t.removed++});const n=e.global.insertBefore;n.parentNode.removeChild(n)}function Z(e){const t=e.global.insertBefore,n=e.global,o=n.placeholder;o&&(X(t,o),delete n.placeholder)}function ee(t){if(null==t)return e.undefined;const n=typeof t;if(t instanceof Function)return e.function;if("object"===n){if(t instanceof Date)return e.date;if(K(n))return n;const o=t.tagJsType;if(o){if([e.tagComponent,e.templater,e.tag].includes(o))return o}if(a(t))return e.tagArray;if(i(t))return e.subject}return e.unknown}function te(t){return t.map((t=>{const n=t;switch(ee(t)){case e.tagComponent:return P(t.props);case e.tag:case e.templater:return te(n.values);case e.tagArray:return te(n)}return P(t)}))}function ne(e,t=[]){for(let n=e.length-1;n>=0;--n){const o=e[n];t.push(o),e.splice(n,1),ne(o.global.childTags,t)}return t}class oe{props;tagJsType="templater";tagged;wrapper;madeChildIntoSubject;tag;children=new p([]);arrayValue;constructor(e){this.props=e}key(e){return this.arrayValue=e,this}html(e,...t){const n=function(e,t){if(i(e))return e;if(a(e))return t.madeChildIntoSubject=!0,new p(e);const n=e;return n?(t.madeChildIntoSubject=!0,n.memory.arrayValue=0,new p([n])):(t.madeChildIntoSubject=!0,new p([]))}(new z(e,t),this);return this.children=n,this}}function re(e,t){const n=e;let o=n.templater;o||(o=new oe([]),o.tag=n,n.templater=o);const r=new p(o);return r.tagSupport=new ze(o,t,r),t.global.childTags.push(r.tagSupport),r}function se(e){const t=document.createTextNode(""),n=e.parentNode;return n.insertBefore(t,e),n.removeChild(e),t}function ie(e,t,n){const o=e.split(".");if("style"===o[0]&&(n.style[o[1]]=t),"class"===o[0])if(o.shift(),t)for(let e=0;e<o.length;++e)n.classList.add(o[e]);else for(let e=0;e<o.length;++e)n.classList.remove(o[e])}const ae=!0;function le(e,t,n,o){const r=de(t),s=e.bind(n);r.global.locked=ae;return function(e,t){if(delete e.global.locked,e.global.blocked.length){let n;return e.global.blocked.forEach((t=>{const o=t;n=et(o.ownerTagSupport,o,o.subject,o.global.insertBefore,!0),e.global.newest=n,e.global.blocked.splice(0,1)})),e.global.blocked.length=0,ce(t,n,n.global)}const n=function(e,t,n){if(n.deleted)return"no-data-ever";return st(e,!0),ce(t,e,n)}(e.global.newest,t,e.global);return n}(r,s(...o))}function de(t){if(t.templater.tagJsType===e.templater){return de(t.ownerTagSupport)}return t}function ce(e,t,n){return e instanceof Promise?(t.global.locked=ae,e.then((()=>(delete t.global.locked,n.deleted||(delete t.global.locked,st(n.newest,!0)),"promise-no-data-ever")))):"no-data-ever"}const ue=/^\s*{__tagvar/,pe=/}\s*$/;function ge(e){return e&&e.search(ue)>=0&&e.search(pe)>=0}function be(e,t,n,o,r,s){if(ge(t))return function(e,t,n,o,r,s){const i=fe(o,t);return he(e,i,n,r,s)}(e,t,n,o,r,s);if(ge(e)){let t;const i=fe(o,e).subscribe((e=>{e!==t&&(!function(e,t,n,o,r){if(t&&t!=e)if("string"==typeof t)n.removeAttribute(t);else if(t instanceof Object)for(const e in t)n.removeAttribute(e);if("string"==typeof e){if(!e.length)return;return void he(e,"",n,o,r)}if(e instanceof Object)for(const t in e)he(t,e[t],n,o,r)}(e,t,n,r,s),t=e)}));return r.global.subscriptions.push(i),void n.removeAttribute(e)}return ye(e)?ie(e,t,n):void 0}function fe(e,t){return e[t.replace("{","").split("").reverse().join("").replace("}","").split("").reverse().join("")]}function he(e,t,n,o,r){const s=ye(e);if(t instanceof Function){const o=function(...e){return t(n,e)};n[e].action=o}if(i(t)){let i;n.removeAttribute(e);const a=t=>t instanceof Function?function(e,t,n,o,r,s){const i=e.templater.wrapper,a=i?.parentWrap,l=a?.oneRender;l||(t=function(e,t){if(e.isChildOverride)return e;b.memory.stateConfig;const n=(n,o)=>le(e,t,n,o);return n.tagFunction=e,n}(t,e));return me(t,n,o,r,s)}(o,t,n,e,s,r):i===t?i:(i=t,me(t,n,e,s,r)),l=t.subscribe(a);o.global.subscriptions.push(l)}else r(n,e,t)}function me(e,t,n,o,r){if(e instanceof Function){const o=function(...n){return e(t,n)};return o.tagFunction=e,"ondoubleclick"===n&&(n="ondblclick"),void(t[n]=o)}if(o)return void ie(n,e,t);if(e)return void r(t,n,e);[void 0,!1,null].includes(e)?t.removeAttribute(n):r(t,n,e)}function ye(e){return e.search(/^(class|style)(\.)/)>=0}function ve(e,t,n){e.setAttribute(t,n)}function $e(e,t,n){e[t]=n}function we(e,t,n){const o=e.getAttributeNames();let r=ve;for(let s=0;s<o.length;++s){const i=o[s];"INPUT"===e.nodeName&&"value"===i&&(r=$e);be(i,e.getAttribute(i),e,t,n,r),r=ve}}const Ce=/(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;function xe(e,t,n,o){let r=o.tagSupport;return r||(r=ke(e,n,o)),o.tagSupport=r,r.ownerTagSupport=n,r.buildBeforeElement(t,{counts:{added:0,removed:0}}),r}function Te(e){const t=Se();return t.tag=e,e.templater=t,t}function Se(){const e={children:new p([]),props:[],isTag:!0,tagJsType:"templater",tagged:!1,html:()=>e,key:()=>e};return e}function ke(e,t,n){const o=new ze(e,t,n);return _e(o,t,n),t.global.childTags.push(o),o}function _e(e,t,n){e.global.oldest=e,e.global.newest=e,e.ownerTagSupport=t,n.tagSupport=e}function Be(e,t,n,o,r){const i=o.clones;let a=e.lastArray=e.lastArray||[];e.placeholder||function(e,t){if("TEMPLATE"!==e.nodeName)return void(t.placeholder=e);const n=t.placeholder=document.createTextNode(""),o=e.parentNode;o.insertBefore(n,e),o.removeChild(e)}(n,e);const l=e.placeholder;let d=0;a=e.lastArray=e.lastArray.filter(((e,n)=>{if(t.length-1<n-d)return Pe(a,n,r),++d,!1;const o=t[n-d],i=s(o);let l,c=o,u=o.templater;i?l=c.memory.arrayValue:(u=o,c=u.tag,l=u.arrayValue);const p=!function(e,t){if(e===t)return!0;if(e instanceof Array&&t instanceof Array&&e.length==t.length)return e.every(((e,n)=>e==t[n]));return!1}(l,e.tagSupport.templater.tag.memory.arrayValue);return!p||(Pe(a,n,r),++d,!1)}));const c=t.length;for(let e=0;e<c;++e){const n=t[e],i=a[e],d=i?.tagSupport,c=n,u=s(c),g=new p(void 0);let b,f=c.templater;if(u?(f||(f=Te(c)),b=new ze(f,o,g)):(f=c,b=je(f,o,g)),d){_e(b,o,d.subject);const e=d.global;b.global=e,e.newest=b}if(!("arrayValue"in(f.tag||c).memory)){const e={template:b.getTemplate().string,array:t},n="Use html`...`.key(item) instead of html`...` to template an Array";console.error(n,e);throw new h(n,e)}if(a.length>e){i.tagSupport.global.oldest.updateBy(b)}else De(l,b,e,r,a),o.global.childTags.push(b)}return i}function De(e,t,n,o,r){const s={tagSupport:t,index:n};r.push(s);const i={added:o.counts.added+n,removed:o.counts.removed},a=document.createDocumentFragment(),l=document.createElement("template");a.appendChild(l),t.buildBeforeElement(l,{counts:i});e.parentNode.insertBefore(a,e)}function je(e,t,n){const o=ke(e,t,n);return M(o,o,n,t),o}function Pe(e,t,n){const o=e[t];Q(o.tagSupport,n.counts),o.deleted=!0,++n.counts.removed}function Ne(e,t){const n=t.parentNode,o=document.createTextNode(e);return n.insertBefore(o,t),n.removeChild(t),o}function Ee(e){return[void 0,!1,null].includes(e)?"":e}function Ae(e,t,n){t.insertBefore=n;const o=t.clone||n;if(t.lastValue===e&&"lastValue"in t)return;t.lastValue=e;const r=Ee(e),s=t.clone;if(s)return void(s.textContent=r);const i=Ne(r,o);t.clone=i}function Le(t,n,o,r,s){switch(ee(t)){case e.templater:return void xe(t,o,r,n);case e.tag:const i=t;let a=i.templater;return a||(a=Te(i)),void xe(a,o,r,n);case e.tagArray:return Be(n,t,o,r,s);case e.tagComponent:return Xe(t,n,o,r,s);case e.function:const l=t;if(l.oneRender){const e=function(e,t,n){const o=new oe([]);o.tagJsType="oneRender";const r=ke(o,n,t),s=()=>(o.tag=e(),r);return o.wrapper=s,s.parentWrap=s,s.oneRender=!0,s.parentWrap.original=e,r}(l,n,r);return M(e,e,n,r),void xe(e.templater,o,r,n)}}!function(e,t,n){t.lastValue=e;const o=Ne(Ee(e),n);t.clone=o}(t,n,o)}const Oe=new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');function Ie(n,o,r,i){const a=n,l=ee(o);if(function(n,o,r,s){const i=n,a="lastValue"in i,l=i.lastValue;if(a&&l!==o){const e=typeof o;return(!K(e)||typeof l!==e)&&!(o instanceof Function&&l instanceof Function)&&(function(e,t){const n=t.clone,o=n.parentNode;o.insertBefore(e,n),o.removeChild(n),delete t.clone,delete t.lastValue}(r,i),"changed-simple-value")}const d=n,c=d.lastArray;if(c&&s!==e.tagArray){const e=d.placeholder;delete d.lastArray,delete d.placeholder,X(r,e);for(let e=c.length-1;e>=0;--e){const{tagSupport:t}=c[e];Q(t,{added:0,removed:0})}return"array"}const u=n.tagSupport;if(u){const r=t(o);return t(n._value)&&r?!I(o,u)&&(Z(u),H(u),2):s!==e.tagComponent&&(!o||!o.oneRender)&&(Z(u),H(u),"different-tag")}}(n,o,i,l),l===e.tagComponent)return function(e,t,n,o){if(!t.tagSupport)return Xe(e,t,n,o,{counts:{added:0,removed:0}}),t;const r=new ze(e,o,t),s=t.tagSupport,i=s.global.newest;if(!i)return Z(s),Xe(e,t,n,o,{counts:{added:0,removed:0}}),t;{const e=i.memory.state;r.memory.state.length=0,r.memory.state.push(...e)}return r.global=s.global,t.tagSupport=r,et(o,r,t,n),t}(o,a,i,r);if(a.tagSupport)return l===e.function||function(t,n,o){const r=t.tagSupport;let i=n;const a=s(n);if(a){const e=n;i=e.templater,i||(i=new oe([]),i.tag=e,e.templater=i)}const l=new ze(i,o,t);a&&(l.global=r.global);const d=n&&I(r,l);(function(t){return t?.tagJsType===e.templater})(n)&&_e(l,o,t);if(d)return void r.updateBy(l);if(d){return xe(i,r.global.insertBefore,o,t)}Ae(n,t,t.insertBefore)}(n,o,r),a;switch(l){case e.tagArray:return Be(n,o,i,r,{counts:{added:0,removed:0}}),n;case e.templater:return xe(o,i,r,a),a;case e.tag:const t=o;let s=t.templater;return s||(s=Se(),t.templater=s,s.tag=t),xe(s,i,r,a),a;case e.subject:return o;case e.function:return n.clone||(n.clone=se(i)),n}return Ae(o,n,i),a}function Fe(e,t,n,o){if(!e.hasAttribute("end"))return;const s=e.getAttribute("id");if(s?.substring(0,Y.length)!==Y)return;const i=t[s];if(r(i._value)||a(i.value))return{variableName:s,ownerSupport:n,subject:i,insertBefore:e};Ve(e,i,n,o)}function Ve(e,t,n,o){let r=!1;const s=s=>{if(r)return void Ie(t,s,n,e);Le(s,t,e,n,{counts:{...o}}),r=!0};let i=s;const a=t.subscribe((e=>i(e)));if(e.parentNode){const n=t.clone=se(e);i=o=>{const r=n.parentNode;r.insertBefore(e,n),r.removeChild(n),delete t.clone,i=s,s(o)}}n.global.subscriptions.push(a)}function Re(e,t,n,o){if(!e.getAttribute)return;"TEXTAREA"===e.nodeName&&function(e,t,n){const o=e.value;if(o.search(Oe)>=0){const r=o.match(/__tagvar(\d{1,4})/),s="{"+(r?r[0]:"")+"}";e.value="",e.setAttribute("text-var-value",s);const i=(t,n,o)=>e.value=o;be("text-var-value",s,e,t,n,i)}}(e,n,o);let r=t.counts.added;r=function(e,t){const n=e.oninit;if(!n)return t.added;const o=n.tagFunction;if(!o)return t.added;const r=o.tagFunction;return r?(r({target:e,stagger:t.added}),++t.added):t.added}(e,t.counts)-r;e.focus&&(e.hasAttribute("autofocus")&&e.focus(),e.hasAttribute("autoselect")&&e.select());const s=e.children;if(s)for(let e=s.length-1;e>=0;--e){Re(s[e],{...t,counts:t.counts},n,o)}}function Me(e,t,n,o){const r=n.counts,s=[],i=[];for(let a=o.length-1;a>=0;--a){const l=o[a],d=Fe(l,e,t,r);if(d)i.push(d);else if(l.children)for(let o=l.children.length-1;o>=0;--o){const a=l.children[o];if(He(a)){const n=Fe(a,e,t,r);n&&i.push(n)}const{clones:d,tagComponents:c}=Me(e,t,n,a.children);s.push(...d),i.push(...c)}}return{clones:s,tagComponents:i}}function He(e){return"TEMPLATE"===e.tagName&&void 0!==e.getAttribute("interpolate")&&void 0!==e.getAttribute("end")}function Je(e,t,n,o,r){const s=[],i=[],a=n.interpolation,l=e.children[0],d=l.content.children;if(a.keys.length){const{clones:e,tagComponents:n}=Me(t,o,r,d);s.push(...e),i.push(...n)}return we(l,t,o),We(d,t,o),{clones:s,tagComponents:i}}function We(e,t,n){for(let o=e.length-1;o>=0;--o){const r=e[o];we(r,t,n),r.children&&We(r.children,t,n)}}function Ge(e){const t=function(e){const t=[];return{string:e.replace(Ce,((e,n)=>{if(e.startsWith("<"))return e;const o=n.substring(1,n.length-1);return t.push(o),`<template interpolate end id="${o}"></template>`})),keys:t}}(e);return t.string=t.string.replace(U,Y),t}function Ye(e,t,n,o,r){const s=function(e,t){const n=[];let o=e.children[0].content.firstChild;const r=document.createDocumentFragment();for(;o;){const e=o.nextSibling;n.push(o),r.appendChild(o),o=e}t.parentNode&&t.parentNode.insertBefore(r,t);return n}(e,t);if(!s.length)return s;for(let e=s.length-1;e>=0;--e){const t=s[e];Re(t,r,o,n),n.clones.push(t)}return s}const qe=new RegExp(Y,"g");class Ue{templater;subject;isApp=!0;appElement;strings;values;propsConfig;memory={state:[]};clones=[];global={destroy$:new c,context:{},providers:[],renderCount:0,subscriptions:[],oldest:this,blocked:[],childTags:[]};hasLiveElements=!1;constructor(e,t,n){this.templater=e,this.subject=t;const o=e.props;this.propsConfig=this.clonePropsBy(o,n)}clonePropsBy(e,t){const n=this.templater.children.value,o=e.map((e=>P(e)));return this.propsConfig={latest:e,latestCloned:o,castProps:t,lastClonedKidValues:n.map((e=>te(e.values)))}}buildBeforeElement(e,t={counts:{added:0,removed:0}}){const n=this.subject,o=this.global;o.insertBefore=e,o.placeholder||function(e){const t=e.insertBefore;e.placeholder=se(t)}(o);const r=o.placeholder;o.oldest=this,o.newest=this,n.tagSupport=this,this.hasLiveElements=!0;const s=this.update(),i=this.getTemplate(),a=document.createDocumentFragment(),l=document.createElement("template");l.innerHTML=i.string,a.appendChild(l);const{tagComponents:d}=Je(a,s,i,this,{counts:t.counts});Ye(a,r,this,s,t);const c=d.length;for(let e=0;e<c;++e){const n=d[e];Ve(n.insertBefore,n.subject,n.ownerSupport,t.counts),Ye(a,n.insertBefore,n.ownerSupport,s,t)}}getTemplate(){const e=this.templater.tag,t=this.strings||e.strings,n=this.values||e.values,o=Ge(t.map(((e,t)=>(e.replace(qe,q)+(n.length>t?`{${Y}${t}}`:"")).replace(/>\s*/g,">").replace(/\s*</g,"<"))).join(""));return{interpolation:o,string:o.string,strings:t,values:n,context:this.global.context||{}}}update(){return this.updateContext(this.global.context)}updateContext(t){const n=this.templater.tag,o=this.strings||n.strings,r=this.values||n.values;return o.forEach(((n,o)=>{if(!(r.length>o))return;const s=Y+o,a=r[o];if(s in t){if(this.global.deleted){const e=a&&a.tagSupport;if(e)return e.destroy(),t}return function(e,t,n){const o=e[t];i(n)||o.next(n)}(t,s,a)}t[s]=function(t,n){switch(ee(t)){case e.tagComponent:return new p(t);case e.templater:return re(t.tag,n);case e.tag:return re(t,n);case e.subject:return t}return new p(t)}(a,this)})),t}updateBy(e){const t=e.templater.tag;this.updateConfig(t.strings,t.values)}updateConfig(e,t){this.strings=e,this.updateValues(t)}updateValues(e){return this.values=e,this.updateContext(this.global.context)}destroy(e={stagger:0,byParent:!1}){const t=!e.byParent,n=this.global,o=this.subject,s=e.byParent?[]:ne(this.global.childTags);t&&r(this.templater)&&(n.destroy$.next(),R(this,this)),this.destroySubscriptions();for(let e=s.length-1;e>=0;--e){const t=s[e],n=t.global;delete n.newest,n.deleted=!0,r(t.templater)&&R(t,t)}let i;if("TEMPLATE"===n.insertBefore.nodeName){n.placeholder&&!("arrayValue"in this.memory)&&(e.byParent||Z(this))}if(t){const{stagger:t,promise:n}=this.destroyClones(e);e.stagger=t,n&&(i=n)}else this.destroyClones();return delete n.placeholder,n.context={},delete n.oldest,delete n.newest,this.global.childTags.length=0,delete o.tagSupport,i=i?i.then((async()=>{const e=s.map((e=>e.destroy({stagger:0,byParent:!0})));return Promise.all(e)})):Promise.all(s.map((e=>e.destroy({stagger:0,byParent:!0})))),i.then((()=>e.stagger))}destroyClones({stagger:e}={stagger:0}){const t=[...this.clones];this.clones.length=0;const n=t.map((t=>this.checkCloneRemoval(t,e))).filter((e=>e)),o=this.global.context;for(const e in o){const t=o[e].clone;t?.parentNode&&t.parentNode.removeChild(t)}return n.length?{promise:Promise.all(n),stagger:e}:{stagger:e}}checkCloneRemoval(e,t){let n;const o=e;o.ondestroy&&(n=function(e,t){const n=e.ondestroy;if(!n)return;const o=n.tagFunction;if(!o)return;const r=o.tagFunction;if(!r)return;return r({target:e,stagger:t})}(o,t));const r=()=>{const t=e.parentNode;t&&t.removeChild(e);const n=this.ownerTagSupport;n&&(n.clones=n.clones.filter((t=>t!==e)))};return n instanceof Promise?n.then(r):(r(),n)}destroySubscriptions(){const e=this.global.subscriptions;for(let t=e.length-1;t>=0;--t)e[t].unsubscribe();e.length=0}}class ze extends Ue{templater;ownerTagSupport;subject;version;isApp=!1;constructor(e,t,n,o,r=0){super(e,n,o),this.templater=e,this.ownerTagSupport=t,this.subject=n,this.version=r}getAppTagSupport(){let e=this;for(;e.ownerTagSupport;)e=e.ownerTagSupport;return e}}function Xe(e,t,n,o,r){if(!0!==e.tagged){const t=e.wrapper.parentWrap.original;let n=t.name||t.constructor?.name;"Function"===n&&(n=void 0);const o=n||t.toString().substring(0,120);throw new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${o}\n\n`)}const s=new ze(e,o,t);let i=t.tagSupport;(s.global=i?.global||s.global).insertBefore=n;if(!i){i=function(e,t,n){const o=n.clones.map((e=>e));if(t=nt(t,e.tagSupport,e,n),n.clones.length>o.length){const e=n.clones.filter((e=>!o.find((t=>t===e))));t.clones.push(...e)}return t}(t,i||s,o)}const a=G(i,t,n,r);return o.global.childTags.push(a),i}function Ke(e,n,o){return e.map((e=>function(e,n,o,r){if(t(e)||!e)return e;if(!n)return e;return Qe(e,n,o,r)}(e,n.ownerTagSupport,o,n)))}function Qe(e,t,n,o,r,s,i=[]){if(e instanceof Function)return function(e,t,n,o,r,s){const i=e.toCall;if(i)return e;const a=(...e)=>a.toCall(...e);return a.toCall=(...e)=>function(e,t,n,o){const r=n.global.newest,s=void 0===g(),i=e(...t),a=()=>{if(!1===s){const e=r.memory.state.every((e=>{const t=e.lastValue,n=e.get();return E(P(t),n)}));if(e)return i}return st(r,!0),i};if(s)return a();return b.memory.tagClosed$.toCallback(a),i}(a.prop,e,t,a.stateArray),a.original=e,a.prop=e,a.stateArray=n,Object.assign(a,e),a}(e,t,n);if(i.includes(e))return e;if(i.push(e),"object"!=typeof e||!e)return e;if(e instanceof Array){for(let r=e.length-1;r>=0;--r){const s=e[r];if(e[r]=Qe(s,t,n,o,r,e,i),s instanceof Function){if(s.toCall)continue;Ze(r,s,e,o)}}return e}for(const r in e){const s=e[r],a=Qe(s,t,n,o,r,e,i),l=Object.getOwnPropertyDescriptor(e,r)?.set;if(!l&&(e[r]=a,a instanceof Function)){if(s.toCall)continue;Ze(r,s,e,o)}}return e}function Ze(e,t,n,o){t?.toCall||o.global.destroy$.toCallback((()=>n[e]=t))}function et(e,t,n,o,r=!1){let s=n.tagSupport?.global.newest;const i=s.templater.wrapper,a=t.templater.wrapper;let l=!1;if(i&&a){l=i.parentWrap.original===a.parentWrap.original}const d=t.templater;if(!l){H(s.global.oldest);return Xe(d,n,o,e,{counts:{added:0,removed:0}})}{const n=function(e,t,n){const o=J(n.props,e.propsConfig.latestCloned);if(o)return o;const r=J(e.propsConfig.latestCloned,t.propsConfig.latestCloned);if(r)return r;const s=function(e,t){const n=e.propsConfig.lastClonedKidValues,o=t.propsConfig.lastClonedKidValues;return!n.every(((e,t)=>{const n=o[t];return e.every(((e,t)=>e===n[t]))}))&&9}(e,t);return s}(s,t,d);if(!n){const n=function(e,t,n,o){const r=t.global.newest;if(!r){const t=n.memory.state;o.length=0;const r=Ke(o,e,t);return o.push(...r),e.propsConfig.castProps=r,o}t=r||t;const s=t.propsConfig,i=s.castProps,a=[];for(let t=o.length-1;t>=0;--t){const r=o[t],s=tt(i[t],r,e,n);a.push(s)}return e.propsConfig.castProps=a,a}(t,s,e,d.props);return t.propsConfig.castProps=n,s.propsConfig.latestCloned=t.propsConfig.latestCloned,s.propsConfig.lastClonedKidValues=t.propsConfig.lastClonedKidValues,s}}const c=s.global.oldest;if(t.global.locked)return t.global.blocked.push(t),t;return function(e,t,n,o,r,s){let i=e.tagSupport;if(t&&n.children._value.length){t.templater.children.next(n.children._value)}const a=s&&I(o,r);if(a){const t=i.global.oldest;return e.tagSupport=r,t.updateBy(r),r}s&&i&&(o.global.deleted||H(o),r.global.context={});return function(e,t,n,o){return e.buildBeforeElement(t,{counts:{added:0,removed:0}}),e.global.oldest=e,e.global.newest=e,n.global.oldest=e,n.global.newest=e,o.tagSupport=e,o.tagSupport.ownerTagSupport.global.childTags.push(e),e}(r,r.global.insertBefore,r,e)}(n,c,d,s.global.newest,st(t,r),l)}function tt(e,t,n,o,r=[]){if(e instanceof Function){if(t.toCall)return e.toCall=t.toCall,t;const n=o.global.newest.memory.state;return e.prop=t,e.stateArray=n,e}if(r.includes(t))return t;if(r.push(t),"object"!=typeof t||!t)return t;if(t instanceof Array){for(let s=t.length-1;s>=0;--s){const i=t[s];t[s]=tt(e[s],i,n,o,r)}return t}if(void 0===e)return t;for(const s in t){const i=t[s],a=tt(e[s],i,n,o,r),l=Object.getOwnPropertyDescriptor(t,s)?.set;l||(t[s]=a)}return t}function nt(e,t,n,o){const r=M(e,t,n,o);!t||I(t,r)||(!function(e,t,n){const o=e.global,r=o.insertBefore,s=t.global={...o};!function(e,t){e.global.destroy$,e.global.providers.forEach((n=>{n.children.forEach(((o,r)=>{if(e.global.destroy$===o.global.destroy$)return n.children.splice(r,1),void n.children.push(t)}))}))}(e,t),H(e),s.insertBefore=r,delete s.deleted,s.oldest=t,s.newest=t,n.tagSupport=t;const i=t.global.placeholder?.parentNode,a=r.parentNode;i&&a&&a.removeChild(r)}(t,r,n),r.global.oldest=r);const s=t?.ownerTagSupport;return r.ownerTagSupport=o||s,r}function ot(e,t){const n=function(e,t,n=[]){n.push({tagSupport:e,renderCount:e.global.renderCount,provider:t});const o=t.children;for(let e=o.length-1;e>=0;--e)n.push({tagSupport:o[e],renderCount:o[e].global.renderCount,provider:t});return n}(e,t);for(let e=n.length-1;e>=0;--e){const{tagSupport:t,renderCount:o,provider:r}=n[e];if(t.global.deleted)continue;o===t.global.renderCount&&(r.clone=P(r.instance),st(t.global.newest,!1))}}function rt(e,t,n,o){const r=o.tagSupport,s=r.global;t.global=s;const i=s.renderCount;!function(e){const t=e.global.providers.filter((e=>!E(e.instance,e.clone)));for(let e=t.length-1;e>=0;--e){const n=t[e];ot(n.owner,n),n.clone=P(n.instance)}}(e);const a=s.newest;if(i!==s.renderCount)return e.global.oldest.updateBy(a),a;const l=nt(t,a||r||s.oldest,o,n),d=s.oldest||e;return I(a,l)&&(o.tagSupport=l,d.updateBy(l)),l}function st(e,t){const n=e.global,o=e.templater;if(!o.wrapper){const t=e.ownerTagSupport;return++n.renderCount,t.global.deleted?e:st(t.global.newest,!0)}if(e.global.locked)return e.global.blocked.push(e),e;const r=e.subject,s=e.global.oldest;let i,a=!1;if(t&&e&&(i=e.ownerTagSupport,i)){a=!E(o.props,e.propsConfig.latestCloned)}const l=rt(s,e,i,r);if(i&&a){return st(i.global.newest,!0),l}return l}function it(e,t,n,...o){const r=e.memory.state;C(r,n);const s=t(...o);return C(n,r),st(e,!1),s instanceof Promise&&s.finally((()=>{C(n,r),st(e,!1)})),s}let at=e=>(e,t,n,o,r,s)=>{throw new y("Callback function was called immediately in sync and must instead be call async")};const lt=()=>at,dt=at;function ct(e){const t=b.memory.stateConfig.array;at=n=>(...o)=>e.global.callbackMaker?it(e,n,t,...o):n(...o)}function ut(e){x(e)}function pt(e){x((()=>{const t=g();t?.global.destroy$.toCallback(e)}))}function gt(e){b.memory.childrenCurrentSupport=e}function bt(){return b.memory.childrenCurrentSupport.templater.children}b({beforeRender:e=>ct(e),beforeRedraw:e=>ct(e),afterRender:e=>{e.global.callbackMaker=!0,at=dt}}),b({beforeRender:e=>gt(e),beforeRedraw:e=>gt(e)});const ft=[];function ht(e,...t){return new z(e,t)}let mt=0;function yt(t){const n=function(...t){const o=new oe(t);o.tagJsType=e.tagComponent;const r=function(t,n){const o=b.memory.stateConfig.array;return function(r,s){const i=r.global;++i.renderCount;const a=t.children,l=i.oldest?.templater.children.lastArray;l&&(a.lastArray=l);const d=n.original;let c=t.props;const u=r.propsConfig.castProps||Ke(c,r,o);c.map((e=>P(e)));let p=d(...u);p instanceof Function&&(p=p()),p&&p.tagJsType===e.tag||(p=ht`${p}`),p.templater=t,t.tag=p,p.memory.arrayValue=t.arrayValue;const g=new ze(t,r.ownerTagSupport,s,u,i.renderCount);g.global=i;const f=b.memory.stateConfig.array;if(g.memory.state.push(...f),t.madeChildIntoSubject){const e=a.value;for(let t=e.length-1;t>=0;--t){const n=e[t],o=n.values;for(let e=o.length-1;e>=0;--e){const t=o[e];if(!(t instanceof Function))continue;const r=n.values[e];r.isChildOverride||(n.values[e]=function(...e){const n=g.ownerTagSupport;return le(t,n,this,e)},r.isChildOverride=!0)}}}return g}}(o,n);return r.parentWrap||(r.parentWrap=n),o.tagged=!0,o.wrapper=r,o};n.original=t,n.compareTo=t.toString();const o=t;return n.isTag=!0,n.original=o,o.tags=ft,o.setUse=b,o.tagIndex=mt++,ft.push(n),n}yt.oneRender=(...e)=>{throw new Error("Do not call function tag.oneRender but instead set it as: `(props) => tag.oneRender = (state) => html`` `")},yt.route=e=>{throw new Error("Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")},yt.app=e=>{throw new Error("Do not call function tag.route but instead set it as: `tag.route = (routeProps: RouteProps) => (state) => html`` `")},Object.defineProperty(yt,"oneRender",{set(e){e.oneRender=!0}});const vt=[];function $t(e,t,n){const o=vt.findIndex((e=>e.element===t));o>=0&&(vt[o].tagSupport.destroy(),vt.splice(o,1),console.warn("Found and destroyed app element already rendered to element",{element:t}));const r=function(e){let t={};const n=new p(t);t=new Ue(e,n),n.next(e),n.tagSupport=t,F(t,void 0);const o=e.wrapper,r=o(t,n);return V(t,r),r}(e(n));r.appElement=t,r.isApp=!0,r.global.isApp=!0;const s=document.createElement("template");s.setAttribute("id","app-tag-"+vt.length),s.setAttribute("app-tag-detail",vt.length.toString());const i=document.createDocumentFragment();return i.appendChild(s),t.destroy=async()=>{await r.destroy();const e=r.global.insertBefore;e.parentNode.removeChild(e)},r.buildBeforeElement(s),r.global.oldest=r,r.global.newest=r,t.setUse=e.original.setUse,vt.push({element:t,tagSupport:r}),t.appendChild(i),{tagSupport:r,tags:e.original.tags}}const wt={tagElement:$t,renderWithSupport:nt,renderTagSupport:st,renderTagOnly:M},Ct=yt((()=>{let e=D("a")((t=>[e,e=t])),t=D(!0)((e=>[t,t=e]));return ht`
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
  `})),xt=yt((()=>{const e=x((()=>new p(0))),t=x((()=>new p(1)));let n=D(0)((e=>[n,n=e]));return++n,ht`
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
  `})),Tt=yt((()=>{let e=D(!0)((t=>[e,e=t]));return ht`
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
  `})),St=3e3,kt=6e3,_t=yt((()=>{let e=D(0)((t=>[e,e=t])),t=D(void 0)((e=>[t,t=e])),n=D(void 0)((e=>[n,n=e])),o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e]));const s=lt(),i=()=>++e,a=()=>{console.info("🟢 interval test 0 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=St&&(r=0)})),500),console.info("▶️ interval started"),t=setInterval(s((()=>{i()})),St)},l=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🛑 interval test 0 stopped")};return ut(a),pt(l),++o,ht`<!--intervalDebug.js-->
    <div>interval type 1 at ${St}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${St} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${()=>{t||n?l():a()}}
      style.background-color=${t||n?"red":"green"}
    >start/stop</button>
    <button type="button" onclick=${()=>setTimeout(s((()=>{r+=200})),1e3)}>delay increase currentTime</button>
  `})),Bt=yt((()=>{let e=D(0)((t=>[e,e=t])),t=D(void 0)((e=>[t,t=e])),n=D(void 0)((e=>[n,n=e])),o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e]));const s=lt(),i=()=>++e;const a=()=>{clearInterval(t),clearInterval(n),t=void 0,n=void 0,console.info("🔴 interval 1 stopped")};function l(){if(t)return a();console.info("🟢 interval test 1 started..."),r=0,n=setInterval(s((()=>{r+=500,r>=kt&&(r=0)})),500),t=setInterval(s((()=>{i(),console.info("slow interval ran")})),kt)}return ut(l),pt(a),++o,ht`
    <div>interval type 2 with ${kt}ms</div>
    intervalId: ${t}
    <button type="button" onclick=${i}>${e}:${o}</button>
    <input type="range" min="0" max=${kt} step="1" value=${r} />
    <div>
      --${r}--
    </div>
    <button type="button" onclick=${l}
      style.background-color=${t?"red":"green"}
    >start/stop</button>
  `}));const Dt=async({target:e,stagger:t,staggerBy:n,fxName:o="fadeInDown"})=>{e.style.opacity="0",t&&await Pt(t*n),e.style.opacity="1",e.classList.add("animate__animated","animate__"+o)},jt=async({target:e,stagger:t,capturePosition:n=!0,fxName:o="fadeOutUp",staggerBy:r})=>{n&&function(e){e.style.zIndex=e.style.zIndex||1;const t=e.offsetTop+"px",n=e.offsetLeft+"px",o=e.clientWidth+(e.offsetWidth-e.clientWidth)+1+"px",r=e.clientHeight+(e.offsetHeight-e.clientHeight)+1+"px";setTimeout((()=>{e.style.top=t,e.style.left=n,e.style.width=o,e.style.height=r,e.style.position="absolute"}),0)}(e),t&&await Pt(t*r),e.classList.add("animate__animated","animate__"+o),await Pt(1e3),e.classList.remove("animate__animated","animate__"+o)};function Pt(e){return new Promise((t=>{setTimeout(t,e)}))}const{in:Nt,out:Et}=function({fxIn:e,fxOut:t,staggerBy:n=300}){return{in:t=>Dt({fxName:e,staggerBy:n,...t}),out:e=>jt({fxName:t,staggerBy:n,capturePosition:!0,...e})}}({fxIn:"fadeInDown",fxOut:"fadeOutUp"}),At=yt((()=>{let e=D("tagJsDebug.js")((t=>[e,e=t])),t=D(!1)((e=>[t,t=e])),n=D(0)((e=>[n,n=e]));return++n,ht`<!-- tagDebug.js -->
    <div style="display:flex;flex-wrap:wrap;gap:1em">    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${()=>t=!t}
        >hide/show</button>

        ${t&&ht`
          <div oninit=${Nt} ondestroy=${Et}>
            <div>${_t()}</div>
            <hr />
            <div>${Bt()}</div>
          </div>
        `}
      </fieldset>
    </div>
  `})),Lt=yt((({renderCount:e,name:t})=>ht`<div><small>(${t} render count <span id=${t+"_render_count"}>${e}</span>)</small></div>`)),Ot=yt(((e="tagSwitchDebug")=>{let t=D(null)((e=>[t,t=e])),n=D(0)((e=>[n,n=e]));let o="select tag below";switch(t){case null:o="null, select tag below";break;case"":o=ht`<div id="empty-string-1"></div>`;break;case"1":o=Ft({title:"value switch"});break;case"2":o=Vt({title:"value switch"});break;case"3":o=Rt({title:"value switch"})}let r=ht`<div id="select-tag-above">select tag above</div>`;switch(t){case null:r=ht`<div id="select-tag-above">null, select tag above</div>`;break;case"":r=ht`<div id="select-tag-above">empty-string, select tag above</div>`;break;case"1":r=Ft({title:"tag switch"});break;case"2":r=Vt({title:"tag switch"});break;case"3":r=Rt({title:"tag switch"})}return++n,ht`
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
        <div>${"3"===t?Rt({title:"ternary simple"}):Ft({title:"ternary simple"})}</div>
      </div>

      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${It({selectedTag:t})}</div>
      </div>

      <div id="arraySwitching-test-wrap" style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div id="arraySwitching-wrap">${Mt({selectedTag:t})}</div>
      </div>
    </div>
    ${Lt({renderCount:n,name:"tagSwitchDebug"})}
  `})),It=yt((({selectedTag:e})=>ht`
    <div id="ternaryPropTest-wrap">
      ${e}:${"3"===e?Rt({title:"ternaryPropTest"}):Ft({title:"ternaryPropTest"})}
    </div>
  `)),Ft=yt((({title:e})=>{let t=D(0)((e=>[t,t=e])),n=D(0)((e=>[n,n=e]));return++n,ht`
    <div id="tag1" style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Lt({renderCount:n,name:"tag1"})}
    </div>
  `})),Vt=yt((({title:e})=>{let t=D(0)((e=>[t,t=e])),n=D(0)((e=>[n,n=e]));return++n,ht`
    <div id="tag2" style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Lt({renderCount:n,name:"tag1"})}
    </div>
  `})),Rt=yt((({title:e})=>{let t=D(0)((e=>[t,t=e])),n=D(0)((e=>[n,n=e]));return++n,ht`
    <div  id="tag3" style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${e} World</div>
      <button onclick=${()=>++t}>increase ${t}</button>
      ${Lt({renderCount:n,name:"tag1"})}
    </div>
  `})),Mt=yt((({selectedTag:e})=>{switch(e){case void 0:return ht`its an undefined value`;case null:return ht`its a null value`;case"":return ht``;case"1":return ht`${Ft({title:`tag ${e}`})}`;case"2":return ht`${["b","c"].map((t=>ht`${Vt({title:`array ${e} ${t}`})}`.key(t)))}`;case"3":return ht`${["d","e","f"].map((t=>ht`${Rt({title:`array ${e} ${t}`})}`.key(t)))}`}return ht`nothing to show for in arrays`})),Ht=yt((()=>{const e=Jt();return ht`
    <fieldset>
      <legend>counter0</legend>
      ${e}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${e}
    </fieldset>
  `})),Jt=()=>{let e=D(0)((t=>[e,e=t]));return ht`
    counter:<span>🪞<span id="mirror-counter-display">${e}</span></span>
    <button id="mirror-counter-button" onclick=${()=>++e}>${e}</button>
  `},Wt=yt(((e,t)=>{let n=D(0)((e=>[n,n=e])),o=D(0)((e=>[o,o=e]));return++n,ht`<!--innerHtmlTests.js-->
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
  `})),Gt=yt((e=>{let t=D(0)((e=>[t,t=e])),n=D(0)((e=>[n,n=e]));return++t,ht`<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${e}</legend>
      ${bt()}
      <button id="innerHtmlPropsTest-button" onclick=${()=>++n}
      >increase innerHtmlPropsTest ${n}</button>
      <span id="innerHtmlPropsTest-display">${n}</span>
      ${!1}
    </fieldset>
  `})),Yt=yt(((e,t)=>ht`
  <fieldset>
    <legend>xxxxx</legend>  
    <div>hello other world ${e} - ${t}</div>
    <div style="border:2px solid red;">***${bt()}***</div>
  </fieldset>
`)),qt=yt(((e="childTests")=>(e=D(0)((t=>[e,e=t])),t=D(0)((e=>[t,t=e])))=>ht`
  <fieldset id="children-test" style="flex:2 2 20em">
    <legend>childTests</legend>

    <hr />
    <hr />
    <hr />
    ${Yt(1,2).html`
      <div><hr />abc-123-${Date.now()}<hr /></div>
    `}
    <hr />
    <hr />
    <hr />
    
    ${Wt({},2).html`
      <b>Field set body A</b>
      <hr />
      <button id="innerHtmlTest-childTests-button"
        onclick=${()=>++t}
      >🐮 (A) increase childTests inside ${t}:${e}</button>
      <span id="innerHtmlTest-childTests-display">${t}</span>
      ${Lt({renderCount:e,name:"childTests-innerHtmlTest"})}
    `}

    ${Gt(22).html`
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
`));var Ut=n(617),zt=n(435);const Xt=yt((({label:e,memory:t})=>{let n=D(!1)((e=>[n,n=e])),o=D(!1)((e=>[o,o=e]));return ht`
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
  `})),Kt=Date.now(),Qt=yt((({appCounterSubject:e})=>(t=x((()=>Date.now())))=>{x("countersDebug state");let n=D(0)((e=>[n,n=e])),o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e])),s=D(0)((e=>[s,s=e])),i=x((()=>({counter:0})));const a=lt(),l=x((()=>new c(n))),d=x((()=>new p("222")));c.all([d,l]).pipe(function(e){const t=g();if(!t)throw new y("callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering");const n=b.memory.stateConfig.array;return(...o)=>t.global.callbackMaker?it(t,e,n,...o):e(...o)}((e=>n))),B.all([d,l]).pipe((e=>n));ut((()=>{++s,console.info("countersDebug.ts: 👉 i should only ever run once"),l.subscribe(a((e=>n=e)))}));const u=()=>{++n,d.next("333-"+n)},f=()=>++o;++r;return ht`<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${ht`
        <div>👉 Subscriptions:${c.globalSubCount$}</div>
        <button onclick=${()=>console.info("subs",c.globalSubs)}>log subs</button>
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
            onclick=${u}
          >stand alone counters:${n}</button>
          <span>
            🥦 <span id="standalone-display">${n}</span>
          </span>
        </div>
    
        ${n>1&&ht`
          <div>
            <button id="conditional-counter"
              onclick=${u}
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
  `})),Zt=yt((({propCounter:e,increasePropCounter:t})=>{let n=D(0)((e=>[n,n=e]));return++n,ht`
    <button id="❤️-inner-counter" onclick=${t}
    >❤️ propCounter:${e}</button>
    <span>
      ❤️ <span id="❤️-inner-display">${e}</span>
    </span>
    <div>renderCount:${n}</div>
    ${Lt({renderCount:n,name:"inner_counters"})}
  `}));class en{constructor(){this.tagDebug=0,this.showDialog=!1}}const tn=()=>({counter:0});function nn(){return{upper:L(on),test:0}}function on(){return{name:"upperTagDebugProvider",test:0}}const rn=yt(((e="providerDebugBase")=>{L(tn);const t=L(en),n=L(nn);D("props debug base");let o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e]));return t.showDialog&&document.getElementById("provider_debug_dialog").showModal(),++r,ht`
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
      ${an({propCounter:o,propCounterChange:e=>{o=e}})}
    </div>

    <hr />
    renderCount outer:<span name="render_count_outer">${r}</span>
    ${Lt({renderCount:r,name:"providerDebugBase"})}

    ${sn(t)}
  `})),sn=yt((e=>ht`
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
`)),an=yt((({propCounter:e,propCounterChange:t})=>{const n=O(tn),o=O(nn),r=O(en),s=O(on);let i=D(!1)((e=>[i,i=e])),a=D(0)((e=>[a,a=e]));const l=lt(),d=x((()=>new c));return ut((()=>{console.info("providerDebug.ts: 👉 👉 i should only ever run once"),d.subscribe((e=>{l((t=>{o.test=e}))()}))})),++a,ht`<!--providerDebug.js-->
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
        onclick=${()=>d.set=o.test+1}
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
      <div oninit=${Nt} ondestroy=${Et}>
        <hr />
        <h3>Provider as Props</h3>
        ${ln(r)}
      </div>
    `}

    <div>
      renderCount inner:${a}
      ${Lt({renderCount:a,name:"providerDebugInner"})}
    </div>
  `})),ln=yt((e=>ht`<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(e,null,2)}</textarea>
  `)),dn=yt((()=>(e=D(0)((t=>[e,e=t])),t=D(0)((e=>[t,t=e])),n=T([e],(()=>++t)),o=D(0)((e=>[o,o=e])),r=T.noInit([e],(()=>++o)),s=D(0)((e=>[s,s=e])),i=T.asSubject([e],(()=>++s)),a=D(!1)((e=>[a,a=e])),l=D(0)((e=>[l,l=e])),d=T.truthy([a],(()=>++l)),c=D(0)((e=>[c,c=e])),u=T.truthy.asSubject([a],(()=>(++c,a))).pipe((e=>void 0===e?"undefined":c)))=>ht`
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
          watchTruth:<span id="🦷-watchTruth">${d||"false"}</span>
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
        watchTruthAsSub:<span id="🦷-watchTruthAsSub">${u}</span>
        </small>
      </div>
      <div>
        <small>
          (truthSubChangeCount:<span id="🦷-truthSubChangeCount">${c}</span>)
        </small>
      </div>
    </fieldset>

    <button id="🦷-truthChange-button" type="button"
      onclick=${()=>a=!a}
    >toggle to ${a?"true":"false"}</button>
  </fieldset>`)),cn=()=>yt.oneRender=(e=new p(0),t=D(0)((e=>[t,t=e])))=>{++t;return ht`
    ${c.all([0,"all",4]).pipe((e=>JSON.stringify(e)))}elias
    <span>👍<span id="👍-counter-display">${e}</span></span>
    <button type="button" id="👍-counter-button"
      onclick=${()=>++e.value}
    >++👍</button>
    ${Lt({renderCount:t,name:"oneRender_tag_ts"})}
    <hr />
    ${un()}
  `},un=yt((()=>(e=D(0)((t=>[e,e=t])),t=B(0),n=D(0)((e=>[n,n=e])))=>(++n,ht`
  <span>👍👍 sub counter-subject-display:<span id="👍👍-counter-subject-display">${t}</span></span>
  <br />
  <span>👍👍 sub counter<span id="👍👍-counter-display">${e}</span></span>
  <br />
  <button type="button" id="👍👍-counter-button"
    onclick=${()=>{t.next(++e)}}
  >++👍👍</button>
  ${Lt({renderCount:n,name:"insideMultiRender"})}
`))),pn={function:()=>++pn.count,count:0},gn=yt((()=>(e=D([])((t=>[e,e=t])),t=D(0)((e=>[t,t=e])),n=(()=>++t),o=D(0)((e=>[o,o=e])),r=D(!0)((e=>[r,r=e])),s=D("a")((e=>[s,s=e])),i=++o,a=(t=>{e=e.map((e=>e)),e.push("string"==typeof t?t:"push"+e.length)}),l=(t=>e=e.filter((e=>e!==t))))=>ht`
  <button id="fun-parent-button" onclick=${n}>++parent</button><span id="fun_in_prop_display">${t}</span>
  ${Lt({renderCount:o,name:"funInProps_tag_parent"})}
  <div>
    <strong>main:</strong><span id="main_wrap_state">${pn.function.toCall?"taggjedjs-wrapped":"nowrap"}</span>:${pn.count}
  </div>
  <button id="toggle-fun-in-child" type="button" onclick=${()=>r=!r}>toggle child</button>
  array length: ${e.length}
  <button onclick=${a}>reset add</button>
  <hr />
  ${r&&fn({myFunction:n,array:e,addArrayItem:a,deleteItem:l,child:{myChildFunction:n}},pn,n)}
  ${bn(a)}
`)),bn=yt((e=>(t=D(0)((e=>[t,t=e])),n=++t,o=(t=>{if("Enter"===t.key){const n=t.target.value.trim();e(n),t.target.value=""}}))=>ht`
  <input type="text" onkeydown=${o} onchange=${t=>{e(t.target.value),t.target.value=""}} />
  <button type="button" onclick=${e}>add by outside</button>
  ${Lt({renderCount:t,name:"addArrayComponent"})}
`)),fn=yt((({addArrayItem:e,myFunction:t,deleteItem:n,child:o,array:r},s,i)=>(a=D("other")((e=>[a,a=e])),l=D(0)((e=>[l,l=e])),d=D(0)((e=>[d,d=e])),c=++d)=>ht`
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
  <button onclick=${pn.function}>++main</button>
  <button onclick=${()=>++l}>++me</button>
  
  <div>
    child array length: ${r.length}
    ${r.map((e=>hn(e,n).key(e)))}
    <button onclick=${e}>addArrayItem</button>
  </div>
  
  <div>
    counter:<span>${l}</span>
  </div>
  ${Lt({renderCount:d,name:"funInProps_tag_child"})}
`)),hn=yt(((e,t)=>ht`
  <div style="border:1px solid black;">
    ${e}<button type="button" onclick=${()=>t(e)}>delete</button>
  </div>
`)),mn=e=>{const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return e.replace(/[&<>"'/]/gi,(e=>t[e]))},yn=(e,t)=>e.length>=t;function vn({onSubmit:e,placeholder:t,label:n,defaultValue:o,onBlur:r}){return ht`
        <div class="input-container">
            <input class="new-todo" id="todo-input" type="text" data-testid="text-input" placeholder=${t} value=${o} onblur=${()=>{r&&r()}} onKeyDown=${t=>{if("Enter"===t.key){const n=t.target.value.trim();if(!yn(n,2))return;e(mn(n)),t.target.value=""}}} />
            <label htmlFor="todo-input" style="visibility:hidden">
                ${n}
            </label>
        </div>
    `}const $n="ADD_ITEM",wn="UPDATE_ITEM",Cn="REMOVE_ITEM",xn="TOGGLE_ITEM",Tn="TOGGLE_ALL",Sn="REMOVE_COMPLETED_ITEMS";const kn=yt(((e,t,n)=>{x("item");let o=D(!1)((e=>[o,o=e])),r=D(0)((e=>[r,r=e]));const{title:s,completed:i,id:a}=e,l=()=>t({type:Cn,payload:{id:a}});return++r,ht`
        <li class=${e.completed,""} data-testid="todo-item">
            <div class="view">
                ${o?ht`${vn({onSubmit:e=>(0===e.length?l():((e,n)=>{t({type:wn,payload:{id:e,title:n}})})(a,e),o=!1,"44s"),label:"Edit Todo Input",defaultValue:s,onBlur:()=>o=!1})} - ${s}`:ht`
                    completed:${i}
                    <input class="toggle" type="checkbox" data-testid="todo-item-toggle" checked=${i} onChange=${()=>t({type:xn,payload:{id:a}})} />
                    <label data-testid="todo-item-label" onDblClick=${()=>{o=!0}}>
                        ${s}
                    </label>
                    <button class="destroy" data-testid="todo-item-button" onClick=${l}>delete</button>
                `}
            </div>
            item render count: ${r}
        </li>
    `})),_n=yt((({todos:e,dispatch:t})=>{let n=D(0)((e=>[n,n=e]));++n;const o=T([e,""],(()=>e.filter((e=>e))));return ht`
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
                    ${kn(e,t,n)}
                `.key(e.id)))}
            </ul>
        </main>
    `})),Bn=yt(((e,t)=>(n=e.filter((e=>!e.completed)),o=(()=>t({type:Sn})))=>0===e.length?null:ht`
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
`));function Dn(e=21){let t="",n=e;for(;n--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64*Math.random()|0];return t}const jn=yt((function(){return(e=D([])((t=>[e,e=t])),t=(t=>{e=((e,t)=>{switch(t.type){case $n:return e.concat({id:Dn(),title:t.payload.title,completed:!1});case wn:return e.map((e=>e.id===t.payload.id?{...e,title:t.payload.title}:e));case Cn:return e.filter((e=>e.id!==t.payload.id));case xn:return e.map((e=>e.id===t.payload.id?{...e,completed:!e.completed}:e));case"REMOVE_ALL_ITEMS":return[];case Tn:return e.map((e=>e.completed!==t.payload.completed?{...e,completed:t.payload.completed}:e));case Sn:return e.filter((e=>!e.completed))}throw Error(`Unknown action: ${t.type}`)})(e,t)}))=>ht`
        ${function(e){return ht`
        <header class="header" data-testid="header">
            <h1>todos</h1>
            ${vn({onSubmit:t=>e({type:$n,payload:{title:t}}),label:"New Todo Input",placeholder:"What needs to be done?"})}
        </header>
    `}(t)}
        ${_n({todos:e,dispatch:t})}
        ${Bn(e,t)}
    `})),Pn=yt(((e="propsDebugMain")=>(e=D(0)((t=>[e,e=t])),t=D(0)((e=>[t,t=e])),n=D(0)((e=>[n,n=e])),o=D({test:33,x:"y"})((e=>[o,o=e])),r=D((()=>new Date))((e=>[r,r=e])),s=JSON.stringify(o,null,2))=>ht`
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
    ${An({propNumber:t,propsJson:o,propNumberChange:e=>{t=e}})}
  </fieldset>

  <fieldset>
    <legend>sync props callback</legend>
    🥡 syncPropNumber: <span id="sync-prop-number-display">${e}</span>
    <button onclick=${()=>++e}>🥡 ++</button>
    ${Lt({renderCount:n,name:"sync_props_callback"})}
    <hr />
    ${En({syncPropNumber:e,propNumberChange:t=>e=t,parentTest:e=>e})}
  </fieldset>

  <fieldset>
    <legend>date prop</legend>
    date:${r}
    <input type="date" value=${function(e){const t=new Date(e),n=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return{date:`${n}-${o}-${r}`,time:`${s}:${i}`}}(r).date} onchange=${e=>{const t=e.target.value;r=new Date(t)}} />
    <hr />
    ${Nn({date:r})}
  </fieldset>
`)),Nn=yt((({date:e})=>ht`date:${e}`)),En=yt((({syncPropNumber:e,propNumberChange:t,parentTest:n})=>{x("string forced");let o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e]));return++r,e%2==1&&t(e+=1),ht`<!--syncPropDebug-->
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
  `})),An=yt((({propNumber:e,propsJson:t,propNumberChange:n})=>(o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e])),s=D(e)((e=>[s,s=e])),i=T([e],(()=>s=e)),a=T([s],(()=>++r)),l=function(e){return t=>{let n=D(e)(t);return T([e],(()=>t(n=e))),t(n),n}}(e)((t=>[e,e=t])))=>ht`<!--propsDebug.js-->
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
`)),Ln=yt((({propNumber:e,callback:t})=>{let n=D(0)((e=>[n,n=e]));return++n,ht`
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${t}
    >🐄 🥩 local & 1-parent increase ${e}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${e}</span>
    ${Lt({renderCount:n,name:"propFnUpdateTest"})}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `}));const On=yt((function(){const e=x([]);let t=D(0)((e=>[t,t=e]));const n=()=>({name:"Person "+e.length,scores:"0,".repeat(0).split(",").map(((e,t)=>({frame:t+1,score:Math.floor(4*Math.random())+1})))});return++t,ht`<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${Fn({players:e,getNewPlayer:n})}
    </div>

    <button id="array-test-push-item" onclick=${()=>{e.push(n())}}>push item ${e.length+1}</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n())}}>push 3 items</button>

    <button onclick=${()=>{e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n()),e.push(n())}}>push 9 items</button>

    ${e.length>0&&ht`
      <button oninit=${Nt} ondestroy=${Et}
        style="--animate-duration: .1s;"
        onclick=${()=>e.length=0}
      >remove all</button>
    `}

    ${Lt({renderCount:t,name:"arrayTests.ts"})}
  `})),In=yt((({score:e,playerIndex:t})=>{let n=D(0)((e=>[n,n=e]));return++n,ht`
    frame:${e.frame}:
    <button
      id=${`score-data-${t}-${e.frame}-inside-button`}
      onclick=${()=>++e.score}
    >inner score button ++${e.score}</button>
    <span id=${`score-data-${t}-${e.frame}-inside-display`}
    >${e.score}</span>
    <button onclick=${()=>++n}>increase renderCount</button>
    ${Lt({renderCount:n,name:"scoreData"+e.frame})}
  `})),Fn=yt((({players:e,getNewPlayer:t})=>ht`
    <!-- playersLoop.js -->
    ${e.map(((n,o)=>ht`
    <div oninit=${Nt} ondestroy=${Et}
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
          oninit=${Nt} ondestroy=${Et}
        >
          <fieldset>
            <legend>
              <button id=${`score-data-${t}-${e.frame}-outside-button`}
                onclick=${()=>++e.score}
              >outer score button ++${e.score}</button>
              <span id=${`score-data-${t}-${e.frame}-outside-display`}
              >${e.score}</span>
            </legend>
            ${In({score:e,playerIndex:t})}
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
  `)),Vn=yt((()=>{let e=D("app first state")((t=>[e,e=t])),t=D(!1)((e=>[t,t=e])),o=D(0)((e=>[o,o=e])),r=D(0)((e=>[r,r=e])),s=D(null)((e=>[s,s=e]));function i(e=!0){s=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await async function(){(0,Ut.dy)("#🍄-slowChangeCount"),(0,zt.it)("no template tags",(()=>{const e=document.getElementsByTagName("template");(0,zt.l_)(e.length).toBe(0,"Expected no templates to be on document")})),(0,zt.it)("elements exists",(()=>{(0,zt.l_)((0,Ut.L7)("h1-app")).toBeDefined();const e=(0,Ut.L7)("toggle-test");(0,zt.l_)(e).toBeDefined(),(0,zt.l_)(e.innerText).toBe("toggle test")})),(0,zt.it)("toggle test",(()=>{const e=(0,Ut.L7)("toggle-test");e.click(),(0,zt.l_)(e.innerText).toBe("toggle test true"),e.click(),(0,zt.l_)(e.innerText).toBe("toggle test");const t=(0,Ut.L7)("props-debug-textarea");(0,zt.l_)(t.value.replace(/\s/g,"")).toBe('{"test":33,"x":"y"}')})),await Promise.resolve().then(n.bind(n,888)),await Promise.resolve().then(n.bind(n,977)),await Promise.resolve().then(n.bind(n,434)),await Promise.resolve().then(n.bind(n,110)),await Promise.resolve().then(n.bind(n,735)),await Promise.resolve().then(n.bind(n,973)),await Promise.resolve().then(n.bind(n,893)),await Promise.resolve().then(n.bind(n,790)),await Promise.resolve().then(n.bind(n,122)),await Promise.resolve().then(n.bind(n,389)),await Promise.resolve().then(n.bind(n,153)),await Promise.resolve().then(n.bind(n,241)),(0,zt.it)("has no templates",(()=>{(0,zt.l_)(document.getElementsByTagName("template").length).toBe(0,"expected no templates on document")}));try{const e=Date.now();await(0,zt.ht)();const t=Date.now()-e;return console.info(`✅ all tests passed in ${t}ms`),!0}catch(e){return console.error("❌ tests failed: "+e.message,e),!1}}();e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),2e3)}pt((()=>{clearTimeout(s),s=null})),++r;const a=lt(),l=x((()=>new c(o)));ut((()=>{console.info("1️⃣ app init should only run once"),i(!1),l.subscribe(a((e=>o=e)))}));return ht`<!--app.js-->
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
          ${Pn(void 0)}
        </fieldset>

        ${qt(void 0)}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${Ct()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${xt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${Ot(void 0)}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>arrays</legend>
          ${On()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Mirroring</legend>
          ${Ht()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${Tt()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>oneRender</legend>
          ${cn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>functions in props</legend>
          ${gn()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>todo</legend>
          ${jn()}
        </fieldset>
      </div>

      ${At()}
    </div>
  `}));var Rn;!function(e){e.Todo="todo",e.FunInPropsTag="funInPropsTag",e.OneRender="oneRender",e.WatchTesting="watchTesting",e.Mirroring="mirroring",e.Content="content",e.Arrays="arrays",e.Counters="counters",e.TableDebug="tableDebug",e.Props="props",e.Child="child",e.TagSwitchDebug="tagSwitchDebug",e.ProviderDebug="providerDebug"}(Rn||(Rn={}));const Mn=Object.values(Rn),Hn=function(){const e=localStorage.taggedjs||JSON.stringify({autoTest:!0,views:[]});return JSON.parse(e)}();function Jn(){localStorage.taggedjs=JSON.stringify(Hn)}const Wn=yt((()=>{x("isolated app state");let e=D(0)((t=>[e,e=t])),t=D(0)((e=>[t,t=e])),o=D(null)((e=>[o,o=e]));const r=x((()=>new c(t))),s=lt();function i(e=!0){o=setTimeout((async()=>{console.debug("🏃 Running tests...");const t=await async function(e){e.includes(Rn.Content)&&await Promise.resolve().then(n.bind(n,888)),e.includes(Rn.Counters)&&await Promise.resolve().then(n.bind(n,977)),e.includes(Rn.Props)&&await Promise.resolve().then(n.bind(n,434)),e.includes(Rn.ProviderDebug)&&await Promise.resolve().then(n.bind(n,110)),e.includes(Rn.TagSwitchDebug)&&await Promise.resolve().then(n.bind(n,735)),e.includes(Rn.Child)&&await Promise.resolve().then(n.bind(n,973)),e.includes(Rn.Arrays)&&await Promise.resolve().then(n.bind(n,893)),e.includes(Rn.Mirroring)&&await Promise.resolve().then(n.bind(n,790)),e.includes(Rn.WatchTesting)&&await Promise.resolve().then(n.bind(n,122)),e.includes(Rn.FunInPropsTag)&&await Promise.resolve().then(n.bind(n,153)),e.includes(Rn.OneRender)&&await Promise.resolve().then(n.bind(n,389)),e.includes(Rn.Todo)&&await Promise.resolve().then(n.bind(n,241));try{const e=Date.now();await(0,zt.ht)();const t=Date.now()-e;return console.info(`✅ isolated tests passed in ${t}ms`),!0}catch(e){return console.error("❌ isolated tests failed: "+e.message,e),!1}}(Hn.views);e&&(t?alert("✅ all app tests passed"):alert("❌ tests failed. See console for more details"))}),2e3)}return ut((()=>{console.info("1️⃣ app init should only run once"),r.subscribe(s((e=>{t=e}))),Hn.autoTest&&i(!1)})),++e,ht`<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div>
      <button id="app-counter-subject-button"
        onclick=${()=>r.set=t+1}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-display">${t}</span>
      </span>
      auto testing <input type="checkbox" ${Hn.autoTest?"checked":null} onchange=${function(){Hn.autoTest=Hn.autoTest=!Hn.autoTest,Jn()}} />
      <button type="button" onclick=${()=>i(!0)}>run tests</button>
    </div>

    <div>
      <h3>Sections</h3>
      <div style="display:flex;gap:1em;flex-wrap:wrap;margin:1em;">
        ${Mn.map((e=>ht`
          <div>
            <input type="checkbox"
              id=${"view-type-"+e} name=${"view-type-"+e}
              ${Hn.views.includes(e)&&"checked"}
              onclick=${()=>function(e){Hn.views.includes(e)?Hn.views=Hn.views.filter((t=>t!==e)):(Hn.views.push(e),Hn.autoTest&&i()),Jn()}(e)}
            />
            <label for=${"view-type-"+e}>&nbsp;${e}</label>
          </div>
        `.key(e)))}
      </div>
    </div>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${Hn.views.includes(Rn.OneRender)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>oneRender</legend>
            ${cn()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Props)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${Pn(void 0)}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.WatchTesting)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>watchTesting</legend>
            ${dn()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.TableDebug)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${Tt()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.ProviderDebug)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${rn(void 0)}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.TagSwitchDebug)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${Ot(void 0)}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Mirroring)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${Ht()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Arrays)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${On()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Counters)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${Qt({appCounterSubject:r})}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Content)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${xt()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Child)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${qt(void 0)}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.FunInPropsTag)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>funInPropsTag</legend>
            ${gn()}
          </fieldset>
        `}

        ${Hn.views.includes(Rn.Todo)&&ht`
          <fieldset style="flex:2 2 20em">
            <legend>todo</legend>
            ${jn()}
          </fieldset>
        `}

        ${!1}
      </div>
      ${Lt({renderCount:e,name:"isolatedApp"})}
    </div>
  `})),Gn=()=>{console.info("attaching app to element...");const e=document.getElementsByTagName("app")[0],t=window.location.pathname.split("/").filter((e=>e)),n=t[0]?.toLowerCase();if(n&&["isolated.html","index-static.html"].includes(n)){const t=Date.now();$t(Wn,e,{test:1});const n=Date.now()-t;return void console.info(`⏱️ isolated render in ${n}ms`)}const o=Date.now();$t(Vn,e,{test:1});const r=Date.now()-o;console.info(`⏱️ rendered in ${r}ms`)}})();var r=o.gV,s=o.jG,i=o.l2,a=o.fm;export{r as App,s as IsolatedApp,i as app,a as hmr};
//# sourceMappingURL=bundle.js.map