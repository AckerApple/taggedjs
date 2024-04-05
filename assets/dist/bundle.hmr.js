/******/ var __webpack_modules__ = ({

/***/ "./assets/dist/bundle.js":
/*!*******************************!*\
  !*** ./assets/dist/bundle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ __webpack_exports__App),
/* harmony export */   IsolatedApp: () => (/* binding */ __webpack_exports__IsolatedApp),
/* harmony export */   hmr: () => (/* binding */ __webpack_exports__hmr)
/* harmony export */ });
/******/ var __webpack_modules__ = ({

/***/ "./src/ContentDebug.component.ts":
/*!***************************************!*\
  !*** ./src/ContentDebug.component.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_268__) => {

__nested_webpack_require_268__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_268__.d(__nested_webpack_exports__, {
/* harmony export */   contentDebug: () => (/* binding */ contentDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_268__(/*! taggedjs */ "../main/ts/index.ts");

const contentDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
    <!--proof you cannot see false values -->
    <div style="font-size:0.8em">You should see "" here => "${false}"</div>
    <div style="font-size:0.8em">You should see "" here => "${null}"</div>
    <div style="font-size:0.8em">You should see "" here => "${undefined}"</div>
    <!--proof you can see true booleans -->
    <div style="font-size:0.8em">You should see "true" here => "${true}"</div>
    <!--proof you can try to use the tagVar syntax -->
    <div style="font-size:0.8em">You should see "${'{'}22${'}'}" here => "{22}"</div>
    <div style="font-size:0.8em">You should see "${'{'}__tagVar0${'}'}" here => "{__tagVar0}"</div>
    <div style="font-size:0.8em">should be a safe string no html "&lt;div&gt;hello&lt;/div&gt;" here => "${'<div>hello</div>'}"</div>
    (render count ${renderCount})
  `;
});


/***/ }),

/***/ "./src/PropsDebug.component.ts":
/*!*************************************!*\
  !*** ./src/PropsDebug.component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_2019__) => {

__nested_webpack_require_2019__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_2019__.d(__nested_webpack_exports__, {
/* harmony export */   propsDebugMain: () => (/* binding */ propsDebugMain)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2019__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_2019__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


const propsDebugMain = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_ = 'propsDebugMain') => {
    let propNumber = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [propNumber, propNumber = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    let propsJson = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)({ test: 33, x: 'y' })(x => [propsJson, propsJson = x]);
    function propsJsonChanged(event) {
        propsJson = JSON.parse(event.target.value);
        return propsJson;
    }
    ++renderCount;
    const json = JSON.stringify(propsJson, null, 2);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <textarea id="props-debug-textarea" wrap="off" onchange=${propsJsonChanged}
      style="height:200px;font-size:0.6em;width:100%"
    >${json}</textarea>
    
    <pre>${json}</pre>
    <div><small>(renderCount:${renderCount})</small></div>
    
    <div>
      <button id="propsDebug-🥩-0-button"
        onclick=${() => ++propNumber}
      >🥩 propNumber ${propNumber}</button>
      <span id="propsDebug-🥩-0-display">${propNumber}</span>
    </div>
    
    <fieldset>
      <legend>child</legend>
      ${propsDebug({
        propNumber,
        propsJson,
        propNumberChange: x => {
            propNumber = x;
        }
    })}
    </fieldset>
    ${ /*renderCountDiv({renderCount, name:'propsDebugMain'})*/false}
  `;
});
const propsDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ propNumber, propsJson, propNumberChange, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    let propNumberChangeCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [propNumberChangeCount, propNumberChangeCount = x]);
    const inProp = propNumber;
    const test = (x) => {
        return [propNumber, propNumber = x];
    };
    propNumber = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setProp)(test);
    const watchResults = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.watch)([propNumber], () => {
        ++propNumberChangeCount;
    });
    ++renderCount;
    function pasteProps(event) {
        const value = JSON.parse(event.target.value);
        Object.assign(propsJson, value);
    }
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<!--propsDebug.js-->
    <h3>Props Json</h3>
    <textarea style="font-size:0.6em;height:200px;width:100%" wrap="off" onchange=${pasteProps}>${JSON.stringify(propsJson, null, 2)}</textarea>
    <pre>${JSON.stringify(propsJson, null, 2)}</pre>
    <hr />
    <h3>Props Number</h3>
    
    <textarea style="font-size:0.6em;height:200px;width:100%;color:white;" wrap="off" disabled
    >${JSON.stringify(watchResults, null, 2)}</textarea>
    
    <div>
      <button id="propsDebug-🥩-1-button" onclick=${() => propNumberChange(++propNumber)}
      >🥩 propNumber ${propNumber}</button>
      <span id="propsDebug-🥩-1-display">${propNumber}</span>
    </div>
    <button
      title="test of increasing render count and nothing else"
      onclick=${() => ++renderCount}
    >renderCount ${renderCount}</button>
    
    <button onclick=${() => ++propNumber}
      title="only changes number locally but if change by parent than that is the number"
    >local set propNumber ${propNumber}</button>
    
    <div><small>(propNumberChangeCount:<span id="propsDebug-🥩-change-display">${propNumberChangeCount}</span>)</small></div>
    
    <hr />
    <h3>Fn update test</h3>
    ${propFnUpdateTest({ propNumber, callback: () => {
            ++propNumber;
        } })}
    
    ${ /*renderCountDiv({renderCount, name: 'propsDebug'})*/false}
  `;
});
const propFnUpdateTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ propNumber, callback, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${callback}
    >🥩 local & 1-parent increase ${propNumber}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${propNumber}</span>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'propFnUpdateTest' })}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `;
});


/***/ }),

/***/ "./src/animations.ts":
/*!***************************!*\
  !*** ./src/animations.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_7166__) => {

__nested_webpack_require_7166__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_7166__.d(__nested_webpack_exports__, {
/* harmony export */   animateDestroy: () => (/* binding */ animateDestroy),
/* harmony export */   animateInit: () => (/* binding */ animateInit),
/* harmony export */   captureElementPosition: () => (/* binding */ captureElementPosition)
/* harmony export */ });
const staggerBy = 300;
const animateInit = async ({ target, stagger }) => {
    target.style.opacity = 0;
    if (stagger) {
        await wait(stagger * staggerBy);
    }
    target.style.opacity = 1;
    target.classList.add('animate__animated', 'animate__fadeInDown');
};
const animateDestroy = async ({ target, stagger, capturePosition = true }) => {
    if (capturePosition) {
        captureElementPosition(target);
    }
    if (stagger) {
        await wait(stagger * staggerBy);
    }
    target.classList.add('animate__animated', 'animate__fadeOutUp');
    await wait(1000); // don't allow remove from stage until animation completed
    target.classList.remove('animate__animated', 'animate__fadeOutUp');
};
// absolute
function captureElementPosition(element) {
    element.style.zIndex = element.style.zIndex || 1;
    const toTop = element.offsetTop + 'px';
    const toLeft = element.offsetLeft + 'px';
    const toWidth = (element.clientWidth + (element.offsetWidth - element.clientWidth) + 1) + 'px';
    const toHeight = (element.clientHeight + (element.offsetHeight - element.clientHeight) + 1) + 'px';
    const fix = () => {
        element.style.top = toTop;
        element.style.left = toLeft;
        element.style.width = toWidth;
        element.style.height = toHeight;
        element.style.position = 'absolute';
    };
    // element.style.position = 'fixed'
    // allow other elements that are being removed to have a moment to figure out where they currently sit
    setTimeout(fix, 0);
}
function wait(time) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}


/***/ }),

/***/ "./src/app.component.ts":
/*!******************************!*\
  !*** ./src/app.component.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_9394__) => {

__nested_webpack_require_9394__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_9394__.d(__nested_webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _attributeDebug_component__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_9394__(/*! ./attributeDebug.component */ "./src/attributeDebug.component.ts");
/* harmony import */ var _ContentDebug_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_9394__(/*! ./ContentDebug.component */ "./src/ContentDebug.component.ts");
/* harmony import */ var _tableDebug_component__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_9394__(/*! ./tableDebug.component */ "./src/tableDebug.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_9394__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _tagJsDebug__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_9394__(/*! ./tagJsDebug */ "./src/tagJsDebug.ts");
/* harmony import */ var _tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_9394__(/*! ./tagSwitchDebug.component */ "./src/tagSwitchDebug.component.ts");
/* harmony import */ var _childTests__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_9394__(/*! ./childTests */ "./src/childTests.ts");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_9394__(/*! ./tests */ "./src/tests.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_9394__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var _countersDebug__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_9394__(/*! ./countersDebug */ "./src/countersDebug.ts");
/* harmony import */ var _providerDebug__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_9394__(/*! ./providerDebug */ "./src/providerDebug.ts");











const App = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)(() => {
    let _firstState = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)('app first state')(x => [_firstState, _firstState = x]);
    let toggleValue = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(false)(x => [toggleValue, toggleValue = x]);
    let appCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [appCounter, appCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [renderCount, renderCount = x]);
    const toggle = () => {
        toggleValue = !toggleValue;
    };
    function runTesting(manual = true) {
        const waitFor = 1000;
        setTimeout(() => {
            console.debug('🏃 Running tests...');
            const result = (0,_tests__WEBPACK_IMPORTED_MODULE_7__.runTests)();
            if (!manual) {
                return;
            }
            if (result) {
                alert('✅ all tests passed');
                return;
            }
            alert('❌ tests failed. See console for more details');
        }, waitFor); // cause delay to be separate from renders
    }
    ++renderCount;
    const callbacks = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.getCallback)();
    const appCounterSubject = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.set)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_3__.Subject());
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.onInit)(() => {
        console.log('app init should only run once');
        runTesting(false);
        appCounterSubject.subscribe(x => {
            callbacks((y) => {
                console.log('callback increase counter', { appCounter, x });
                appCounter = x;
            })();
        });
    });
    const content = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${2 + 2}</h1>

    <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
    <button onclick=${runTesting}>run test</button>

    <div>
      <button id="app-counter-subject-button"
        onclick=${() => appCounterSubject.set(appCounter + 1)}
      >🍒 ++app subject</button>
      <span>
        🍒 <span id="app-counter-subject-button">${appCounter}</span>
      </span>
    </div>

    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_8__.renderCountDiv)({ name: 'app', renderCount })}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${(0,_countersDebug__WEBPACK_IMPORTED_MODULE_9__.counters)({ appCounterSubject })}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${(0,_providerDebug__WEBPACK_IMPORTED_MODULE_10__.providerDebugBase)(undefined)}
        </fieldset>

        ${(0,_childTests__WEBPACK_IMPORTED_MODULE_6__.childTests)(undefined)}

        <fieldset style="flex:2 2 20em">
          <legend>Attribute Tests</legend>
          ${(0,_attributeDebug_component__WEBPACK_IMPORTED_MODULE_0__.attributeDebug)()}
        </fieldset>

        <fieldset id="content-debug" style="flex:2 2 20em">
          <legend>Content Debug</legend>
          ${(0,_ContentDebug_component__WEBPACK_IMPORTED_MODULE_1__.contentDebug)()}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Tag Switching</legend>
          ${(0,_tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_5__.tagSwitchDebug)(undefined)}
        </fieldset>

        <fieldset style="flex:2 2 20em">
          <legend>Table Tests</legend>
          ${(0,_tableDebug_component__WEBPACK_IMPORTED_MODULE_2__.tableDebug)()}
        </fieldset>
      </div>

      ${(0,_tagJsDebug__WEBPACK_IMPORTED_MODULE_4__.tagDebug)()}
    </div>
  `;
    return content;
});


/***/ }),

/***/ "./src/arrayTests.ts":
/*!***************************!*\
  !*** ./src/arrayTests.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_15310__) => {

__nested_webpack_require_15310__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_15310__.d(__nested_webpack_exports__, {
/* harmony export */   arrayTests: () => (/* binding */ arrayTests)
/* harmony export */ });
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_15310__(/*! ./animations */ "./src/animations.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_15310__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_15310__(/*! taggedjs */ "../main/ts/index.ts");



const frameCount = 4;
const arrayTests = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(function ArrayTests() {
    let memory = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.set)(() => ({ counter: 0 }));
    const players = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.set)([]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [renderCount, renderCount = x]);
    const getNewPerson = () => ({
        name: 'Person ' + players.length,
        scores: '0,'.repeat(/*frameCount*/ 0).split(',').map((_v, index) => ({
            frame: index + 1,
            score: Math.floor(Math.random() * 4) + 1
        }))
    });
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${players.map((player, index) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
        <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateInit} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateDestroy} style="background-color:black;">
          <div>
            name:${player.name}
          </div>
          <div>
            index:${index}
          </div>
          
          <div style="background-color:purple;padding:.5em">
            scores:${player.scores.map((score, playerIndex) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
            <div style="border:1px solid white;"
              oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateInit} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateDestroy}
            >
              <fieldset>
                <legend>
                  <button id=${`score-data-${playerIndex}-${score.frame}-outside-button`}
                    onclick=${() => ++score.score}
                  >outer score button ++${score.score}</button>
                  <span id=${`score-data-${playerIndex}-${score.frame}-outside-display`}
                  >${score.score}</span>
                </legend>
                ${scoreData({ score, playerIndex })}
              </fieldset>
            </div>
          `.key(score))}</div>
          
          ${player.edit && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
            <button onclick=${() => {
        players.splice(index, 1);
        player.edit = !player.edit;
    }}>remove</button>
          `}
          ${player.edit && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
            <button id=${'player-remove-promise-btn-' + index} onclick=${async () => {
        player.edit = !player.edit;
        players.splice(index, 1);
    }}>remove by promise</button>
          `}
          <button id=${'player-edit-btn-' + index} onclick=${() => player.edit = !player.edit}>edit</button>
          <button onclick=${() => {
        players.splice(index, 0, getNewPerson());
    }}>add before</button>
        </div>
      `.key(player))}
    </div>

    <button id="array-test-push-item" onclick=${() => {
        players.push(getNewPerson());
    }}>push item ${players.length + 1}</button>

    <button onclick=${() => {
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
    }}>push 3 items</button>

    <button onclick=${() => {
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
        players.push(getNewPerson());
    }}>push 9 items</button>

    ${players.length > 0 && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
      <button oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateInit} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateDestroy} onclick=${() => {
        players.length = 0;
    }}>remove all</button>
    `}

    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'arrayTests.ts' })}
  `;
});
const scoreData = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ score, playerIndex }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
    frame:${score.frame}:
    <button
      id=${`score-data-${playerIndex}-${score.frame}-inside-button`}
      onclick=${() => ++score.score}
    >inner score button ++${score.score}</button>
    <span id=${`score-data-${playerIndex}-${score.frame}-inside-display`}
    >${score.score}</span>
    <button onclick=${() => ++renderCount}>increase renderCount</button>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'scoreData' + score.frame })}
  `;
});


/***/ }),

/***/ "./src/attributeDebug.component.ts":
/*!*****************************************!*\
  !*** ./src/attributeDebug.component.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_21054__) => {

__nested_webpack_require_21054__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_21054__.d(__nested_webpack_exports__, {
/* harmony export */   attributeDebug: () => (/* binding */ attributeDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_21054__(/*! taggedjs */ "../main/ts/index.ts");

const attributeDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let selected = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)('a')(x => [selected, selected = x]);
    let isOrange = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(true)(x => [isOrange, isOrange = x]);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <input onchange=${(event) => selected = event.target.value} placeholder="a b or c" />
    <select id="select-sample-drop-down">
      ${['a', 'b', 'c'].map(item => (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
        <option value=${item} ${item == selected ? 'selected' : ''}>${item} - ${item == selected ? 'true' : 'false'}</option>
      `.key(item))}
    </select>
    <hr />
    <h3>Special Attributes</h3>
    <div>
      <input type="checkbox" onchange=${(event) => isOrange = event.target.checked} ${isOrange && 'checked'} /> - ${isOrange ? 'true' : 'false'}
    </div>
    <div style="display: flex;flex-wrap:wrap;gap:1em">      
      <div
        style.background-color=${isOrange ? 'orange' : ''}
        style.color=${isOrange ? 'black' : ''}
      >style.background-color=&dollar;{'orange'}</div>
      
      <div
        class.background-orange=${isOrange ? true : false}
        class.text-black=${isOrange ? true : false}
      >class.background-orange=&dollar;{true}</div>
      
      <div class=${isOrange ? 'background-orange text-black' : ''}
      >class=&dollar;{'background-orange text-black'}</div>
      
      <div ${{ class: 'text-white' + (isOrange ? ' background-orange' : '') }}
      >class=&dollar;{'background-orange'} but always white</div>
    </div>
    <style>
      .background-orange {background-color:orange}
      .text-black {color:black}
      .text-white {color:white}
    </style>
  `;
});


/***/ }),

/***/ "./src/childTests.ts":
/*!***************************!*\
  !*** ./src/childTests.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_23406__) => {

__nested_webpack_require_23406__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_23406__.d(__nested_webpack_exports__, {
/* harmony export */   childTests: () => (/* binding */ childTests)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23406__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _innerHtmlTests__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_23406__(/*! ./innerHtmlTests */ "./src/innerHtmlTests.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_23406__(/*! ./renderCount.component */ "./src/renderCount.component.ts");



const childTests = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_ = 'childTests') => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <fieldset id="children-test" style="flex:2 2 20em">
      <legend>childTests</legend>
      
      ${ /*renderCountDiv(renderCount)}- ${renderCount*/false}
      
      ${(0,_innerHtmlTests__WEBPACK_IMPORTED_MODULE_1__.innerHtmlTest)({}, (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
        <b>Field set body A</b>
        <hr />
        <button id="innerHtmlTest-childTests-button"
          onclick=${() => ++counter}
        >🐮 increase childTests inside ${counter}:${renderCount}</button>
        <span id="innerHtmlTest-childTests-display">${counter}</span>
        ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'childTests-innerHtmlTest' })}
      `)}

      ${(0,_innerHtmlTests__WEBPACK_IMPORTED_MODULE_1__.innerHtmlPropsTest)(22, (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
        <b>Field set body B</b>
        <hr />
        <button id="innerHtmlPropsTest-childTests-button"
          onclick=${() => ++counter}
        >🐮 increase childTests inside 22 ${counter}</button>
        <span id="innerHtmlPropsTest-childTests-display">${counter}</span>
        ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'innerHtmlPropsTest child' })}
      `)}

      ${ /*childContentTest({legend: 'Inner Test', id:'children-inner-test'}, html`
      ${innerHtmlTest(html`
        <b>Field set body C</b>
      `)}
      
      ${innerHtmlPropsTest(33, html`
        <b>Field set body D</b>
      `)}

      <hr />
      
      <button onclick=${() => ++counter}>increase childTests inside ${counter}</button>
      ${renderCountDiv(renderCount)}
    `)*/false}
      
      <hr />
      <button id="childTests-button"
        onclick=${() => ++counter}
      >🐮 increase childTests outside ${counter} - ${renderCount}</button>
      <span id="childTests-display">${counter}</span>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'childTests' })}
    </fieldset>
  `;
});
const childContentTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ legend, id }, children) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <fieldset id=${id} style="flex:2 2 20em">
      <legend>${legend}</legend>
      ${children}
      <hr />
      <button onclick=${() => ++counter}>increase childContentTest ${counter}</button>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'childContentTest' })}
    </fieldset>
  `;
});


/***/ }),

/***/ "./src/countersDebug.ts":
/*!******************************!*\
  !*** ./src/countersDebug.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_27430__) => {

__nested_webpack_require_27430__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_27430__.d(__nested_webpack_exports__, {
/* harmony export */   counters: () => (/* binding */ counters)
/* harmony export */ });
/* harmony import */ var _mouseover_tag__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_27430__(/*! ./mouseover.tag */ "./src/mouseover.tag.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_27430__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_27430__(/*! taggedjs */ "../main/ts/index.ts");



const counters = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ appCounterSubject, }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [counter, counter = x]);
    let propCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [propCounter, propCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [renderCount, renderCount = x]);
    let initCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [initCounter, initCounter = x]);
    let memory = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.set)(() => ({ counter: 0 }));
    const callbacks = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.getCallback)();
    const callbackTestSub = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.set)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_2__.Subject());
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.onInit)(() => {
        ++initCounter;
        console.info('countersDebug.ts: 👉 i should only ever run once');
        callbackTestSub.subscribe(x => {
            console.log('🥦 sub called');
            callbacks((y) => {
                console.log('callback increase counter', { counter, x });
                counter = x;
            })();
        });
    });
    const increaseCounter = () => {
        ++counter;
    };
    const increasePropCounter = () => {
        ++propCounter;
    };
    ++renderCount; // for debugging
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">

      <div>Subscriptions:${taggedjs__WEBPACK_IMPORTED_MODULE_2__.Subject.globalSubCount$}</div>
      <button onclick=${() => console.info('subs', taggedjs__WEBPACK_IMPORTED_MODULE_2__.Subject.globalSubs)}>log subs</button>
      <div>initCounter:${initCounter}</div>
  
      <div>
        <button id="app-counter-subject-button"
          onclick=${() => appCounterSubject.set((appCounterSubject.value || 0) + 1)}
        >🍒 ++app subject</button>
        <span>
          🍒 <span id="app-counter-subject-button">${appCounterSubject.value}</span>
        </span>
      </div>

      <div>
        <button id="standalone-counter"
          onclick=${increaseCounter}
        >stand alone counter:${counter}</button>
        <span>
          🥦 <span id="standalone-display">${counter}</span>
        </span>
      </div>
  
      ${counter > 1 && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
        <div>
          <button id="conditional-counter"
            onclick=${increaseCounter}
          >conditional counter:${counter}</button>
          <span>
            🥦 <span id="conditional-display">${counter}</span>
          </span>
        </div>
      `}
  
      <div>
        <button id="increase-counter"
          onclick=${increasePropCounter}
        >propCounter:${propCounter}</button>
        <span id="counter-display">${propCounter}</span>
      </div>

      <div>
        <button id="subject-increase-counter"
          onclick=${() => callbackTestSub.set(counter + 1)}
        >subject increase:</button>
        <span>
          🥦 <span id="subject-counter-display">${counter}</span>
        </span>
      </div>
    </div>

    <div>
      ${(0,_mouseover_tag__WEBPACK_IMPORTED_MODULE_0__.mouseOverTag)({ label: 'a-a', memory })}
      ${(0,_mouseover_tag__WEBPACK_IMPORTED_MODULE_0__.mouseOverTag)({ label: 'b-b', memory })}
      memory.counter:${memory.counter}
    </div>

    
    <fieldset>
      <legend>inner counter</legend>
      ${innerCounters({ propCounter, increasePropCounter })}
    </fieldset>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'counters' })}
  `;
});
const innerCounters = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ propCounter, increasePropCounter, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount; // for debugging
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
    <button id="inner-increase-counter" onclick=${increasePropCounter}
    >propCounter:${propCounter}</button>
    <span id="inner-counter-display">${propCounter}</span>
    <div>renderCount:${renderCount}</div>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'inner counters' })}
  `;
});


/***/ }),

/***/ "./src/elmSelectors.ts":
/*!*****************************!*\
  !*** ./src/elmSelectors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_32659__) => {

__nested_webpack_require_32659__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_32659__.d(__nested_webpack_exports__, {
/* harmony export */   byId: () => (/* binding */ byId),
/* harmony export */   elementCount: () => (/* binding */ elementCount),
/* harmony export */   lastById: () => (/* binding */ lastById),
/* harmony export */   queryOneInnerHTML: () => (/* binding */ queryOneInnerHTML)
/* harmony export */ });
function elementCount(selector) {
    return document.querySelectorAll(selector).length;
}
function queryOneInnerHTML(query, pos = 0) {
    return document.querySelectorAll(query)[pos].innerHTML;
}
function byId(id) {
    return document.getElementById(id);
}
function lastById(id) {
    const elms = document.querySelectorAll('#' + id);
    return elms[elms.length - 1];
}


/***/ }),

/***/ "./src/expect.ts":
/*!***********************!*\
  !*** ./src/expect.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_33650__) => {

__nested_webpack_require_33650__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_33650__.d(__nested_webpack_exports__, {
/* harmony export */   describe: () => (/* binding */ describe),
/* harmony export */   execute: () => (/* binding */ execute),
/* harmony export */   expect: () => (/* binding */ expect),
/* harmony export */   it: () => (/* binding */ it)
/* harmony export */ });
const onlyTests = [];
let tests = [];
let tab = 0;
function describe(label, run) {
    tests.push(() => {
        const oldTests = tests;
        tests = [];
        try {
            console.debug('  '.repeat(tab) + '👉 ' + label);
            ++tab;
            run();
            runTests(tests);
            --tab;
        }
        catch (error) {
            --tab;
            // console.debug(' '.repeat(tab) + '❌ ' + label)
            throw error;
        }
        finally {
            tests = oldTests;
        }
    });
}
describe.only = (label, run) => {
    onlyTests.push(() => {
        const oldTests = tests;
        tests = [];
        try {
            console.debug('  '.repeat(tab) + '👉 ' + label);
            ++tab;
            run();
            runTests(tests);
            --tab;
        }
        catch (error) {
            --tab;
            // console.debug(' '.repeat(tab) + '❌ ' + label)
            throw error;
        }
        finally {
            tests = oldTests;
        }
    });
};
function it(label, run) {
    tests.push(() => {
        try {
            run();
            console.debug(' '.repeat(tab) + '✅ ' + label);
        }
        catch (error) {
            console.debug(' '.repeat(tab) + '❌ ' + label);
            throw error;
        }
    });
}
it.only = (label, run) => {
    onlyTests.push(() => {
        try {
            run();
            console.debug('✅ ' + label);
        }
        catch (error) {
            console.debug('❌ ' + label);
            throw error;
        }
    });
};
function execute() {
    if (onlyTests.length) {
        return runTests(onlyTests);
    }
    return runTests(tests);
}
function runTests(tests) {
    tests.forEach(test => {
        try {
            test();
        }
        catch (err) {
            console.error(`Error testing ${test.name}`);
            throw err;
        }
    });
}
function expect(expected) {
    return {
        toBeDefined: () => {
            if (expected !== undefined && expected !== null) {
                return;
            }
            const message = `Expected ${JSON.stringify(expected)} to be defined`;
            console.error(message, { expected });
            throw new Error(message);
        },
        toBe: (received, customMessage) => {
            if (expected === received) {
                return;
            }
            const message = customMessage || `Expected ${typeof (expected)} ${JSON.stringify(expected)} to be ${typeof (received)} ${JSON.stringify(received)}`;
            console.error(message, { received, expected });
            throw new Error(message);
        }
    };
}


/***/ }),

/***/ "./src/innerHtmlTests.ts":
/*!*******************************!*\
  !*** ./src/innerHtmlTests.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_36916__) => {

__nested_webpack_require_36916__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_36916__.d(__nested_webpack_exports__, {
/* harmony export */   innerHtmlPropsTest: () => (/* binding */ innerHtmlPropsTest),
/* harmony export */   innerHtmlTest: () => (/* binding */ innerHtmlTest)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_36916__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_36916__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


const innerHtmlTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_props, children) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-1">
      <legend>no props test</legend>
      <div style="border:2px solid purple;">
        ${children}
      </div>
      <div>isSubjectInstance:${(0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.isSubjectInstance)(children)}</div>
      <div>isSubjectTagArray:${(0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(children.value)}</div>
      <button id="innerHtmlTest-counter-button"
      onclick=${() => ++counter}>increase innerHtmlTest ${counter}</button>
      <span id="innerHtmlTest-counter-display">${counter}</span>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'innerHtmlTest' })}
    </fieldset>
  `;
});
const innerHtmlPropsTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((x, children) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<!--innerHtmlTests.js-->
    <fieldset id="innerHtmlTests-2">
      <legend>innerHTML Props: ${x}</legend>
      ${children}
      <button id="innerHtmlPropsTest-button" onclick=${() => ++counter}
      >increase innerHtmlPropsTest ${counter}</button>
      <span id="innerHtmlPropsTest-display">${counter}</span>
      ${ /*renderCountDiv(renderCount)*/false}
    </fieldset>
  `;
});


/***/ }),

/***/ "./src/intervalDebug.ts":
/*!******************************!*\
  !*** ./src/intervalDebug.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_39611__) => {

__nested_webpack_require_39611__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_39611__.d(__nested_webpack_exports__, {
/* harmony export */   intervalTester0: () => (/* binding */ intervalTester0),
/* harmony export */   intervalTester1: () => (/* binding */ intervalTester1)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_39611__(/*! taggedjs */ "../main/ts/index.ts");

const test0interval = 3000;
const test1interval = 6000;
const intervalTester0 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let intervalCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [intervalCount, intervalCount = x]);
    let intervalId = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(undefined)(x => [intervalId, intervalId = x]);
    let intervalId2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(undefined)(x => [intervalId2, intervalId2 = x]);
    let renderCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCounter, renderCounter = x]);
    let currentTime = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [currentTime, currentTime = x]);
    const callback = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.getCallback)();
    const increase = () => ++intervalCount;
    console.log('intervalId', intervalId);
    const startInterval = () => {
        console.info('interval test 0 started...');
        trackTime();
        intervalId = setInterval(callback(() => {
            increase();
        }), test0interval);
    };
    const stopInterval = () => {
        clearInterval(intervalId);
        clearInterval(intervalId2);
        intervalId = undefined;
        intervalId2 = undefined;
        console.info('🛑 interval test 0 stopped');
    };
    function trackTime() {
        currentTime = 0;
        intervalId2 = setInterval(callback(() => {
            currentTime = currentTime + 500;
            if (currentTime >= test0interval) {
                currentTime = 0;
                console.log('interval tick');
            }
        }), 500);
        console.log('▶️ interval started');
    }
    const toggle = () => {
        if (intervalId || intervalId2) {
            stopInterval();
            return;
        }
        startInterval();
    };
    const delayIncrease = () => setTimeout(callback(() => {
        currentTime = currentTime + 200;
    }), 1000);
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.onInit)(startInterval);
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy)(stopInterval);
    ++renderCounter;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<!--intervalDebug.js-->
    <div>interval type 1 at ${test0interval}ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test0interval} step="1" value=${currentTime} />
    <div>
      --${currentTime}--
    </div>
    <button type="button" onclick=${toggle}
      style.background-color=${intervalId || intervalId2 ? 'red' : 'green'}
    >start/stop</button>
    <button type="button" onclick=${delayIncrease}>delay increase currentTime</button>
  `;
});
const intervalTester1 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let intervalCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [intervalCount, intervalCount = x]);
    let intervalId = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(undefined)(x => [intervalId, intervalId = x]);
    let intervalId2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(undefined)(x => [intervalId2, intervalId2 = x]);
    let renderCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCounter, renderCounter = x]);
    let currentTime = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [currentTime, currentTime = x]);
    const callback = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.getCallback)();
    const increase = () => ++intervalCount;
    function trackTime() {
        currentTime = 0;
        intervalId2 = setInterval(callback(() => {
            currentTime = currentTime + 500;
            if (currentTime >= test1interval) {
                currentTime = 0;
            }
        }), 500);
    }
    const destroy = () => {
        clearInterval(intervalId);
        clearInterval(intervalId2);
        intervalId = undefined;
        intervalId2 = undefined;
        console.info('interval 1 stopped');
    };
    function toggleInterval() {
        if (intervalId) {
            return destroy();
        }
        console.info('interval test 1 started...');
        trackTime();
        intervalId = setInterval(callback(() => {
            increase();
            console.info('slow interval ran');
        }), test1interval);
    }
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.onInit)(toggleInterval);
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.onDestroy)(toggleInterval);
    ++renderCounter;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div>interval type 2 with ${test1interval}ms</div>
    intervalId: ${intervalId}
    <button type="button" onclick=${increase}>${intervalCount}:${renderCounter}</button>
    <input type="range" min="0" max=${test1interval} step="1" value=${currentTime} />
    <div>
      --${currentTime}--
    </div>
    <button type="button" onclick=${toggleInterval}
      style.background-color=${intervalId ? 'red' : 'green'}
    >start/stop</button>
  `;
});


/***/ }),

/***/ "./src/isolatedApp.ts":
/*!****************************!*\
  !*** ./src/isolatedApp.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_45272__) => {

__nested_webpack_require_45272__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_45272__.d(__nested_webpack_exports__, {
/* harmony export */   IsolatedApp: () => (/* binding */ IsolatedApp)
/* harmony export */ });
/* harmony import */ var _childTests__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_45272__(/*! ./childTests */ "./src/childTests.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_45272__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _arrayTests__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_45272__(/*! ./arrayTests */ "./src/arrayTests.ts");
/* harmony import */ var _tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_45272__(/*! ./tagSwitchDebug.component */ "./src/tagSwitchDebug.component.ts");
/* harmony import */ var _PropsDebug_component__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_45272__(/*! ./PropsDebug.component */ "./src/PropsDebug.component.ts");
/* harmony import */ var _providerDebug__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_45272__(/*! ./providerDebug */ "./src/providerDebug.ts");
/* harmony import */ var _countersDebug__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_45272__(/*! ./countersDebug */ "./src/countersDebug.ts");
/* harmony import */ var _tableDebug_component__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_45272__(/*! ./tableDebug.component */ "./src/tableDebug.component.ts");








const IsolatedApp = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.tag)(() => {
    const stateTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.set)('isolated-app-state');
    // const component = childTests() as any
    // const template = component.wrapper().getTemplate()
    const views = [
        // 'child',
        // 'arrays',
        // 'props',
        // 'tagSwitchDebug',
        // 'providerDebug',
        'counters',
    ];
    let appCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.setLet)(0)(x => [appCounter, appCounter = x]);
    const appCounterSubject = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.set)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_1__.Subject(appCounter));
    const callbacks = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.getCallback)();
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.onInit)(() => {
        console.log('app init should only run once');
        appCounterSubject.subscribe(x => {
            callbacks((y) => {
                console.log('callback increase counter', { appCounter, x });
                appCounter = x;
            })();
        });
    });
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${views.includes('props') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${(0,_PropsDebug_component__WEBPACK_IMPORTED_MODULE_4__.propsDebugMain)(undefined)}
          </fieldset>
        `}

        ${views.includes('tableDebug') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${(0,_tableDebug_component__WEBPACK_IMPORTED_MODULE_7__.tableDebug)()}
          </fieldset>
        `}

        ${views.includes('providerDebug') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${(0,_providerDebug__WEBPACK_IMPORTED_MODULE_5__.providerDebugBase)(undefined)}
          </fieldset>
        `}

        ${views.includes('tagSwitchDebug') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${(0,_tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_3__.tagSwitchDebug)(undefined)}
          </fieldset>
        `}

        ${views.includes('arrays') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>arrays</legend>
            ${(0,_arrayTests__WEBPACK_IMPORTED_MODULE_2__.arrayTests)()}
          </fieldset>
        `}

        ${views.includes('counters') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>counters</legend>
            ${(0,_countersDebug__WEBPACK_IMPORTED_MODULE_6__.counters)({ appCounterSubject })}
          </fieldset>
        `}

        ${views.includes('child') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>Children Tests</legend>
            ${(0,_childTests__WEBPACK_IMPORTED_MODULE_0__.childTests)(undefined)}
          </fieldset>
        `}

        ${ /*
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ template.string }</textarea>
      <textarea style="font-size:0.6em;min-width:50vw;height:400px">${ JSON.stringify(template, null, 2) }</textarea>
      */false}
      </div>
    </div>
  `;
});


/***/ }),

/***/ "./src/mouseover.tag.ts":
/*!******************************!*\
  !*** ./src/mouseover.tag.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_50567__) => {

__nested_webpack_require_50567__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_50567__.d(__nested_webpack_exports__, {
/* harmony export */   mouseOverTag: () => (/* binding */ mouseOverTag)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_50567__(/*! taggedjs */ "../main/ts/index.ts");

const mouseOverTag = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ label, memory, }) => {
    let mouseOverEditShow = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(false)(x => [mouseOverEditShow, mouseOverEditShow = x]);
    let edit = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(false)(x => [edit, edit = x]);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="background-color:purple;padding:.2em;"
      onmouseover=${() => mouseOverEditShow = true}
      onmouseout=${() => mouseOverEditShow = false}
    >
      mouseover - ${label}:${memory.counter}:${mouseOverEditShow || 'false'}
      <button onclick=${() => ++memory.counter}>++counter</button>
      <a style.visibility=${(edit || mouseOverEditShow) ? 'visible' : 'hidden'}
        onclick=${() => edit = !edit}
      >⚙️&nbsp;</a>
    </div>
  `;
});


/***/ }),

/***/ "./src/providerDebug.ts":
/*!******************************!*\
  !*** ./src/providerDebug.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_51982__) => {

__nested_webpack_require_51982__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_51982__.d(__nested_webpack_exports__, {
/* harmony export */   TagDebugProvider: () => (/* binding */ TagDebugProvider),
/* harmony export */   providerDebugBase: () => (/* binding */ providerDebugBase)
/* harmony export */ });
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_51982__(/*! ./animations */ "./src/animations.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_51982__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var _tagJsDebug__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_51982__(/*! ./tagJsDebug */ "./src/tagJsDebug.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_51982__(/*! taggedjs */ "../main/ts/index.ts");




class TagDebugProvider {
    tagDebug = 0;
    showDialog = false;
}
const providerDebugBase = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)((_x = 'providerDebugBase') => {
    const provider = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(_tagJsDebug__WEBPACK_IMPORTED_MODULE_2__.tagDebugProvider);
    // TODO: Fix provider create typing
    const providerClass = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(TagDebugProvider);
    const test = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)('props debug base');
    let propCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [propCounter, propCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [renderCount, renderCount = x]);
    if (providerClass.showDialog) {
        document.getElementById('provider_debug_dialog').showModal();
    }
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `
    <div>
      <strong>testValue</strong>:${provider.test}
    </div>
    <div>
      <strong>upperTest</strong>:${provider.upper?.test || '?'}
    </div>
    <div>
      <strong>providerClass</strong>:${providerClass.tagDebug || '?'}
    </div>

    <div style="display:flex;gap:1em">
      <div>
        <button id="increase-provider-🍌-0-button" onclick=${() => ++provider.test}
        >🍌 increase provider.test ${provider.test}</button>
        <span>
          🍌 <span id="increase-provider-🍌-0-display">${provider.test}</span>
        </span>
      </div>
      
      <div>
        <button id="increase-provider-upper-🌹-0-button" onclick=${() => ++provider.upper.test}
        >🌹 increase upper.provider.test ${provider.upper.test}</button>
        <span>
          🌹 <span id="increase-provider-upper-🌹-0-display">${provider.upper.test}</span>
        </span>
      </div>
      
      <div>
        <button id="increase-provider-🍀-0-button" onclick=${() => ++providerClass.tagDebug}
        >🍀 increase provider class ${providerClass.tagDebug}</button>
        <span>
          🍀 <span id="increase-provider-🍀-0-display">${providerClass.tagDebug}</span>
        </span>
      </div>

      <div>
        <button id="increase-prop-🐷-0-button" onclick=${() => ++propCounter}
        >🐷 increase propCounter ${propCounter}</button>
        <span>
          🐷 <span id="increase-prop-🐷-0-display">${propCounter}</span>
        </span>
      </div>

      <button onclick=${() => providerClass.showDialog = true}
      >💬 toggle dialog ${providerClass.showDialog}</button>
    </div>

    <hr />

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${providerDebug({
        propCounter,
        propCounterChange: x => {
            propCounter = x;
        }
    })}
    </div>

    <hr />
    renderCount outer:${renderCount}
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'providerDebugBase' })}

    <dialog id="provider_debug_dialog" style="padding:0"
      onmousedown="var r = this.getBoundingClientRect();(r.top<=event.clientY&&event.clientY<=r.top+r.height&&r.left<=event.clientX&&event.clientX<=r.left+r.width) || this.close()"
      ondragstart="const {e,dt,t} = {t:this,e:event,dt:event.dataTransfer};const d=t.drag=t.drag||{x:0,y:0};d.initX=d.x;d.startX=event.clientX-t.offsetLeft;d.startY=event.clientY-t.offsetTop;t.ondragover=e.target.ondragover=(e)=>e.preventDefault();dt.effectAllowed='move';dt.dropEffect='move'"
      ondrag="const {t,e,dt,d}={e:event,dt:event.dataTransfer,d:this.drag}; if(e.clientX===0) return;d.x = d.x + e.offsetX - d.startX; d.y = d.y + e.offsetY - d.startY; this.style.left = d.x + 'px'; this.style.top = d.y+'px';"
      ondragend="const {t,e,d}={t:this,e:event,d:this.drag};if (d.initX === d.x) {d.x=d.x+e.offsetX-(d.startX-d.x);d.y=d.y+e.offsetY-(d.startY-d.y);this.style.transform=translate3d(d.x+'px', d.y+'px', 0)};this.draggable=false"
      onclose=${() => providerClass.showDialog = false}
    >
      <div style="padding:.25em" onmousedown="this.parentNode.draggable=true"
      >dialog title</div>
      ${providerClass.showDialog ? (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `
        <textarea wrap="off">${JSON.stringify(providerClass, null, 2)}</textarea>
      ` : 'no dialog'}
      <div style="padding:.25em">
        <button type="button" onclick="provider_debug_dialog.close()">🅧 close</button>
      </div>
    </dialog>
  `;
});
const providerDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)(({ propCounter, propCounterChange, }) => {
    const provider = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.inject(_tagJsDebug__WEBPACK_IMPORTED_MODULE_2__.tagDebugProvider);
    const upperProvider = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.inject(_tagJsDebug__WEBPACK_IMPORTED_MODULE_2__.upperTagDebugProvider);
    const providerClass = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.inject(TagDebugProvider);
    let showProProps = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(false)(x => [showProProps, showProProps = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [renderCount, renderCount = x]);
    // let propCounter: number = setLet(0)(x => [propCounter, propCounter = x])
    const callbacks = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.getCallback)();
    const callbackTestSub = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.set)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_3__.Subject());
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.onInit)(() => {
        console.info('providerDebug.ts: 👉 👉 i should only ever run once');
        callbackTestSub.subscribe(x => {
            console.log('🍌 sub called');
            callbacks((y) => {
                console.log('callback increase counter', { counter: provider.test, x });
                provider.test = x;
            })();
        });
    });
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `<!--providerDebug.js-->
    <div>
      <button id="increase-provider-🍌-1-button" onclick=${() => ++provider.test}
      >🍌 increase provider.test ${provider.test}</button>
      <span>
        🍌 <span id="increase-provider-🍌-1-display">${provider.test}</span>
      </span>
    </div>
    
    <div>
      <button id="increase-provider-upper-🌹-1-button" onclick=${() => ++upperProvider.test}
      >🌹 increase upper.provider.test ${upperProvider.test}</button>
      <span>
        🌹<span id="increase-provider-upper-🌹-1-display">${upperProvider.test}</span>
      </span>
    </div>

    <div>
      <button id="subject-increase-counter"
        onclick=${() => callbackTestSub.set(provider.test + 1)}
      >🍌 subject increase:</button>
      <span>
        🍌 <span id="subject-counter-display">${provider.test}</span>
      </span>
    </div>
    
    <div>
      <button id="increase-provider-🍀-1-button" onclick=${() => ++providerClass.tagDebug}
      >🍀 increase provider class ${providerClass.tagDebug}</button>
      <span>
        🍀 <span id="increase-provider-🍀-1-display">${providerClass.tagDebug}</span>
      </span>
    </div>

    <div>
      <button id="increase-prop-🐷-1-button" onclick=${() => propCounterChange(++propCounter)}
      >🐷 increase propCounter ${propCounter}</button>
      <span>
        🐷 <span id="increase-prop-🐷-1-display">${propCounter}</span>
      </span>
    </div>

    <button onclick=${() => providerClass.showDialog = true}
      >💬 toggle dialog ${providerClass.showDialog}</button>

    <button onclick=${() => showProProps = !showProProps}
    >${showProProps ? 'hide' : 'show'} provider as props</button>
    
    ${showProProps && (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `
      <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateInit} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateDestroy}>
        <hr />
        <h3>Provider as Props</h3>
        ${testProviderAsProps(providerClass)}
      </div>
    `}

    <div>
      renderCount inner:${renderCount}
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'providerDebugInner' })}
    </div>
  `;
});
const testProviderAsProps = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)((providerClass) => {
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `<!--providerDebug.js@TestProviderAsProps-->
    <textarea wrap="off" rows="20" style="width:100%;font-size:0.6em">${JSON.stringify(providerClass, null, 2)}</textarea>
  `;
});


/***/ }),

/***/ "./src/renderCount.component.ts":
/*!**************************************!*\
  !*** ./src/renderCount.component.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_61579__) => {

__nested_webpack_require_61579__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_61579__.d(__nested_webpack_exports__, {
/* harmony export */   renderCountDiv: () => (/* binding */ renderCountDiv)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_61579__(/*! taggedjs */ "../main/ts/index.ts");

const renderCountDiv = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ renderCount, name }) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<div><small>(${name} render count ${renderCount})</small></div>`);


/***/ }),

/***/ "./src/tableDebug.component.ts":
/*!*************************************!*\
  !*** ./src/tableDebug.component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_62388__) => {

__nested_webpack_require_62388__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_62388__.d(__nested_webpack_exports__, {
/* harmony export */   tableDebug: () => (/* binding */ tableDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_62388__(/*! taggedjs */ "../main/ts/index.ts");

const tableDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let showCell = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(true)(x => [showCell, showCell = x]);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="max-height: 800px;overflow-y: scroll;">
      <table cellPadding=${5} cellSpacing=${5} border="1">
        <thead style="position: sticky;top: 0;">
          <tr>
            <th>hello</th>
            <th>hello</th>
            ${showCell && (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
              <td>hello 2 thead cell</td>
            `}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>world</td>
            <td>world</td>
            ${showCell && (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
              <td>world 2 tbody cell</td>
            `}
          </tr>
        </tbody>
      </table>
    </div>
  `;
});


/***/ }),

/***/ "./src/tagJsDebug.ts":
/*!***************************!*\
  !*** ./src/tagJsDebug.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_63860__) => {

__nested_webpack_require_63860__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_63860__.d(__nested_webpack_exports__, {
/* harmony export */   tagDebug: () => (/* binding */ tagDebug),
/* harmony export */   tagDebugProvider: () => (/* binding */ tagDebugProvider),
/* harmony export */   upperTagDebugProvider: () => (/* binding */ upperTagDebugProvider)
/* harmony export */ });
/* harmony import */ var _PropsDebug_component__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_63860__(/*! ./PropsDebug.component */ "./src/PropsDebug.component.ts");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_63860__(/*! ./animations */ "./src/animations.ts");
/* harmony import */ var _arrayTests__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_63860__(/*! ./arrayTests */ "./src/arrayTests.ts");
/* harmony import */ var _intervalDebug__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_63860__(/*! ./intervalDebug */ "./src/intervalDebug.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_63860__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_63860__(/*! ./renderCount.component */ "./src/renderCount.component.ts");






function tagDebugProvider() {
    const upper = taggedjs__WEBPACK_IMPORTED_MODULE_4__.providers.create(upperTagDebugProvider);
    return {
        upper,
        test: 0
    };
}
function upperTagDebugProvider() {
    return {
        name: 'upperTagDebugProvider',
        test: 0
    };
}
const tagDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_4__.tag)(() => {
    let _firstState = (0,taggedjs__WEBPACK_IMPORTED_MODULE_4__.setLet)('tagJsDebug.js')(x => [_firstState, _firstState = x]);
    let showIntervals = (0,taggedjs__WEBPACK_IMPORTED_MODULE_4__.setLet)(false)(x => [showIntervals, showIntervals = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_4__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_4__.html) `<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_5__.renderCountDiv)({ renderCount, name: 'tagJsDebug' })}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <fieldset style="flex:4 4 40em">
        <legend>arrays</legend>
        ${(0,_arrayTests__WEBPACK_IMPORTED_MODULE_2__.arrayTests)()}
      </fieldset>
    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${() => showIntervals = !showIntervals}
        >hide/show</button>

        ${showIntervals && (0,taggedjs__WEBPACK_IMPORTED_MODULE_4__.html) `
          <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_1__.animateInit} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_1__.animateDestroy}>
            <div>${(0,_intervalDebug__WEBPACK_IMPORTED_MODULE_3__.intervalTester0)()}</div>
            <hr />
            <div>${(0,_intervalDebug__WEBPACK_IMPORTED_MODULE_3__.intervalTester1)()}</div>
          </div>
        `}
      </fieldset>

      <fieldset id="props-debug" style="flex:2 2 20em">
        <legend>Props Debug</legend>
        ${(0,_PropsDebug_component__WEBPACK_IMPORTED_MODULE_0__.propsDebugMain)(undefined)}
      </fieldset>
    </div>
  `;
});


/***/ }),

/***/ "./src/tagSwitchDebug.component.ts":
/*!*****************************************!*\
  !*** ./src/tagSwitchDebug.component.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_67487__) => {

__nested_webpack_require_67487__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_67487__.d(__nested_webpack_exports__, {
/* harmony export */   arraySwitching: () => (/* binding */ arraySwitching),
/* harmony export */   tag1: () => (/* binding */ tag1),
/* harmony export */   tag2: () => (/* binding */ tag2),
/* harmony export */   tag3: () => (/* binding */ tag3),
/* harmony export */   tagSwitchDebug: () => (/* binding */ tagSwitchDebug),
/* harmony export */   ternaryPropTest: () => (/* binding */ ternaryPropTest)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_67487__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_67487__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


const tagSwitchDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_t = 'tagSwitchDebug') => {
    let selectedTag = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(null)(x => [selectedTag, selectedTag = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    function changeSelectedTag(event) {
        selectedTag = event.target.value;
        if (selectedTag === 'undefined') {
            selectedTag = undefined;
        }
        if (selectedTag === 'null') {
            selectedTag = null;
        }
    }
    let tagOutput = 'select tag below';
    switch (selectedTag) {
        case null:
            tagOutput = 'null, select tag below';
            break;
        case '1':
            tagOutput = tag1({ title: 'value switch' });
            break;
        case '2':
            tagOutput = tag2({ title: 'value switch' });
            break;
        case '3':
            tagOutput = tag3({ title: 'value switch' });
            break;
    }
    let tagOutput2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<div id="select-tag-above">select tag above</div>`;
    switch (selectedTag) {
        case null:
            tagOutput2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<div id="select-tag-above">null, select tag above</div>`;
            break;
        case '1':
            tagOutput2 = tag1({ title: 'tag switch' });
            break;
        case '2':
            tagOutput2 = tag2({ title: 'tag switch' });
            break;
        case '3':
            tagOutput2 = tag3({ title: 'tag switch' });
            break;
    }
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div>
      selectedTag: |${selectedTag == null ? 'null' : selectedTag}|
    </div>
    
    <select id="tag-switch-dropdown" onchange=${changeSelectedTag}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="undefined" ${selectedTag === undefined ? { selected: true } : {}}>undefined</option>
	    <option value="null" ${selectedTag === null ? { selected: true } : {}}>null</option>
	    <option value="1" ${selectedTag === '1' ? { selected: true } : {}}>tag 1</option>
	    <option value="2" ${selectedTag === '2' ? { selected: true } : {}}>tag 2</option>
	    <option value="3" ${selectedTag === '3' ? { selected: true } : {}}>tag 3</option>
    </select>

    <div style="display:flex;gap:1em;">
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 1 - string | Tag</h3>
        <div>${tagOutput}</div>
      </div>

      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 2 - Tag</h3>
        <div>${tagOutput2}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3 - ternary (only 1 or 3 shows)</h3>
        <div>${selectedTag === '3' ? tag3({ title: 'ternary simple' }) : tag1({ title: 'ternary simple' })}</div>
      </div>
      
      <div style="border:1px solid blue;flex-grow:1">
        <h3>Test 3.2 - ternary via prop (only 1 or 3 shows)</h3>
        <div>${ternaryPropTest({ selectedTag })}</div>
      </div>
      
      <div style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div>${arraySwitching({ selectedTag })}</div>
      </div>
    </div>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tagSwitchDebug' })}
  `;
});
const ternaryPropTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ selectedTag }) => {
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
  <div>${selectedTag === '3' ? tag3({ title: 'ternaryPropTest' }) : tag1({ title: 'ternaryPropTest' })}</div>
  `;
});
const tag1 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ title }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tag1' })}
    </div>
  `;
});
const tag2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ title }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tag1' })}
    </div>
  `;
});
const tag3 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ title }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [counter, counter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="border:1px solid orange;">
      <div id="tagSwitch-3-hello">Hello 3 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tag1' })}
    </div>
  `;
});
const arraySwitching = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ selectedTag }) => {
    switch (selectedTag) {
        case undefined:
            return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `its an undefined value`;
        case null:
            return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `its a null value`;
        case '1':
            // return html`${['a'].map(x => html`${tag1({title: `array ${selectedTag} ${x}`})}`.key(x))}`
            return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `${tag1({ title: `tag ${selectedTag}` })}`;
        case '2':
            return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `${['b', 'c'].map(x => (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `${tag2({ title: `array ${selectedTag} ${x}` })}`.key(x))}`;
        case '3':
            return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `${['d', 'e', 'f'].map(x => (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `${tag3({ title: `array ${selectedTag} ${x}` })}`.key(x))}`;
    }
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `nothing to show for in arrays`;
});


/***/ }),

/***/ "./src/tests.ts":
/*!**********************!*\
  !*** ./src/tests.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_75387__) => {

__nested_webpack_require_75387__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_75387__.d(__nested_webpack_exports__, {
/* harmony export */   runTests: () => (/* binding */ runTests)
/* harmony export */ });
/* harmony import */ var _elmSelectors__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_75387__(/*! ./elmSelectors */ "./src/elmSelectors.ts");
/* harmony import */ var _expect__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_75387__(/*! ./expect */ "./src/expect.ts");


function runTests() {
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('elements exists', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(document.getElementById('h1-app')).toBeDefined();
        const toggleTest = document.getElementById('toggle-test');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest).toBeDefined();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest?.innerText).toBe('toggle test');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('toggle test', () => {
        const toggleTest = document.getElementById('toggle-test');
        toggleTest?.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest?.innerText).toBe('toggle test true');
        toggleTest?.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest?.innerText).toBe('toggle test');
        const propsTextarea = document.getElementById('props-debug-textarea');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(propsTextarea.value.replace(/\s/g, '')).toBe(`{"test":33,"x":"y"}`);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('basic increase counter', () => {
        expectElementCount('#conditional-counter', 0);
        testCounterElements('#increase-counter', '#counter-display');
        testCounterElements('#standalone-counter', '#standalone-display');
        expectElementCount('#conditional-counter', 1);
        testCounterElements('#conditional-counter', '#conditional-display');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('props testing', () => {
        testDuelCounterElements(['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'], ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display']);
        testDuelCounterElements(['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'], ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display']);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.queryOneInnerHTML)('#propsDebug-🥩-change-display')).toBe('9');
        const ownerHTML = document.querySelectorAll('#propsDebug-🥩-0-display')[0].innerHTML;
        const parentHTML = document.querySelectorAll('#propsDebug-🥩-1-display')[0].innerHTML;
        const childHTML = document.querySelectorAll('#propsOneLevelFunUpdate-🥩-display')[0].innerHTML;
        const ownerNum = Number(ownerHTML);
        const parentNum = Number(parentHTML);
        const childNum = Number(childHTML);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(parentNum).toBe(childNum);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(ownerNum + 2).toBe(parentNum); // testing of setProp() doesn't change owner
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('providers', async () => {
        testDuelCounterElements(['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'], ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display']);
        testDuelCounterElements(['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'], ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display']);
        testDuelCounterElements(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('provider debug', () => {
        testDuelCounterElements(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('tagSwitching', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#select-tag-above')).toBe(1, 'Expected select-tag-above element to be defined');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tag-switch-dropdown')).toBe(1, 'Expected one #tag-switch-dropdown');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-1-hello')).toBe(2, 'Expected two #tagSwitch-1-hello elements');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-2-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-3-hello')).toBe(0);
        const dropdown = document.getElementById('tag-switch-dropdown');
        dropdown.value = "1";
        dropdown.onchange({ target: dropdown });
        expectElementCount('#tagSwitch-1-hello', 5);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-2-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-3-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#select-tag-above')).toBe(0);
        dropdown.value = "2";
        dropdown.onchange({ target: dropdown });
        expectElementCount('#tagSwitch-1-hello', 2);
        expectElementCount('#tagSwitch-2-hello', 4);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-3-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#select-tag-above')).toBe(0);
        dropdown.value = "3";
        dropdown.onchange({ target: dropdown });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-1-hello')).toBe(0, 'Expected no hello 1s');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#tagSwitch-2-hello')).toBe(0);
        expectElementCount('#tagSwitch-3-hello', 7);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#select-tag-above')).toBe(0);
        dropdown.value = "";
        dropdown.onchange({ target: dropdown });
        expectElementCount('#select-tag-above', 1);
        expectElementCount('#tag-switch-dropdown', 1);
        expectElementCount('#tagSwitch-1-hello', 2);
        expectElementCount('#tagSwitch-2-hello', 0);
        expectElementCount('#tagSwitch-3-hello', 0);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.describe)('array testing', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('basics', () => {
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#array-test-push-item')).toBe(1);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#score-data-0-1-inside-button')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#score-data-0-1-outside-button')).toBe(0);
            document.getElementById('array-test-push-item')?.click();
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#score-data-0-1-inside-button')).toBe(1);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#score-data-0-1-outside-button')).toBe(1);
            const insideElm = document.getElementById('score-data-0-1-inside-button');
            const insideDisplay = document.getElementById('score-data-0-1-inside-display');
            let indexValue = insideDisplay?.innerText;
            const outsideElm = document.getElementById('score-data-0-1-outside-button');
            const outsideDisplay = document.getElementById('score-data-0-1-outside-display');
            const outsideValue = outsideDisplay?.innerText;
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(indexValue).toBe(outsideValue);
            insideElm?.click();
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(insideDisplay?.innerText).toBe(outsideDisplay?.innerText);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(indexValue).toBe((Number(insideDisplay?.innerText) - 1).toString());
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(indexValue).toBe((Number(outsideDisplay?.innerText) - 1).toString());
            outsideElm?.click();
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(insideDisplay?.innerText).toBe(outsideDisplay?.innerText);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(indexValue).toBe((Number(insideDisplay?.innerText) - 2).toString());
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(indexValue).toBe((Number(outsideDisplay?.innerText) - 2).toString());
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('deletes', async () => {
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#player-remove-promise-btn-0')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#player-edit-btn-0')).toBe(1);
            await (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('player-edit-btn-0').onclick();
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#player-remove-promise-btn-0')).toBe(1);
            await (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('player-remove-promise-btn-0').onclick();
            await delay(1000); // animation
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#player-remove-promise-btn-0')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elementCount)('#player-edit-btn-0')).toBe(0);
        });
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('child tests', () => {
        testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display');
        testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display');
        testDuelCounterElements(['#childTests-button', '#childTests-display'], ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display']);
        testDuelCounterElements(['#childTests-button', '#childTests-display'], ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display']);
    });
    try {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.execute)();
        console.info('✅ all tests passed');
        return true;
    }
    catch (error) {
        console.error('❌ tests failed: ' + error.message, error);
        return false;
    }
}
function testDuelCounterElements([button0, display0], // button, display
[button1, display1]) {
    let query = expectElementCount(display0, 1);
    const display0Element = query[0];
    const ip0 = display0Element.innerText;
    testCounterElements(button0, display0);
    query = expectElementCount(display1, 1);
    let display1Element = query[0];
    let ip1Check = display1Element.innerText;
    const value = (Number(ip0) + 2).toString();
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`);
    testCounterElements(button1, display1);
    query = expectElementCount(display1, 1);
    display1Element = query[0];
    ip1Check = display1Element.innerText;
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(ip1Check).toBe((Number(ip0) + 4).toString(), `Expected ${display1} innerText to be ${Number(ip0) + 4} but instead it is ${ip1Check}`);
}
/** increases counter by two */
function testCounterElements(counterButtonId, counterDisplayId, { elementCountExpected } = {
    elementCountExpected: 1
}) {
    // const getByIndex = (selector: string, index: number) => document.querySelectorAll(selector)[index] as unknown as HTMLElement[]
    const increaseCounters = document.querySelectorAll(counterButtonId);
    const counterDisplays = document.querySelectorAll(counterDisplayId);
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(increaseCounters.length).toBe(elementCountExpected, `Expected ${counterButtonId} to be ${elementCountExpected} elements but is instead ${increaseCounters.length}`);
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(counterDisplays.length).toBe(elementCountExpected, `Expected ${counterDisplayId} to be ${elementCountExpected} elements but is instead ${counterDisplays.length}`);
    increaseCounters.forEach((increaseCounter, index) => {
        const counterDisplay = counterDisplays[index];
        let counterValue = Number(counterDisplay?.innerText);
        increaseCounter?.click();
        let oldCounterValue = counterValue + 1;
        counterValue = Number(counterDisplay?.innerText);
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to be value ${oldCounterValue} but is instead ${counterValue}`);
        increaseCounter?.click();
        counterValue = Number(counterDisplay?.innerText);
        ++oldCounterValue;
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to increase value to ${oldCounterValue} but is instead ${counterValue}`);
    });
}
function expectElementCount(query, count, message) {
    //  const found = elementCount(query)
    const elements = document.querySelectorAll(query);
    const found = elements.length;
    message = message || `Expected ${count} elements to match query ${query} but found ${found}`;
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(found).toBe(count, message);
    return elements;
}
function delay(time) {
    return new Promise((res) => setTimeout(res, time));
}


/***/ }),

/***/ "../main/ts/ElementTargetEvent.interface.ts":
/*!**************************************************!*\
  !*** ../main/ts/ElementTargetEvent.interface.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_90316__) => {

__nested_webpack_require_90316__.r(__nested_webpack_exports__);



/***/ }),

/***/ "../main/ts/Subject.ts":
/*!*****************************!*\
  !*** ../main/ts/Subject.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_90590__) => {

__nested_webpack_require_90590__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_90590__.d(__nested_webpack_exports__, {
/* harmony export */   Subject: () => (/* binding */ Subject)
/* harmony export */ });
class Subject {
    value;
    isSubject = true;
    subscribers = [];
    // unsubcount = 0 // 🔬 testing
    constructor(value) {
        this.value = value;
    }
    subscribe(callback) {
        this.subscribers.push(callback);
        SubjectClass.globalSubs.push(callback); // 🔬 testing
        const countSubject = SubjectClass.globalSubCount$;
        SubjectClass.globalSubCount$.set(countSubject.value + 1);
        const unsubscribe = () => {
            unsubscribe.unsubscribe();
        };
        // Return a function to unsubscribe from the BehaviorSubject
        unsubscribe.unsubscribe = () => {
            removeSubFromArray(this.subscribers, callback);
            removeSubFromArray(SubjectClass.globalSubs, callback); // 🔬 testing
            SubjectClass.globalSubCount$.set(countSubject.value - 1);
            // any double unsubscribes will be ignored
            unsubscribe.unsubscribe = () => undefined;
        };
        return unsubscribe;
    }
    set(value) {
        this.value = value;
        // Notify all subscribers with the new value
        this.subscribers.forEach((callback) => {
            callback.value = value;
            callback(value);
        });
    }
    next = this.set;
}
function removeSubFromArray(subscribers, callback) {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
        subscribers.splice(index, 1);
    }
}
const SubjectClass = Subject;
SubjectClass.globalSubs = []; // 🔬 for testing
SubjectClass.globalSubCount$ = new Subject(); // for ease of debugging
SubjectClass.globalSubCount$.set(0);


/***/ }),

/***/ "../main/ts/Tag.class.ts":
/*!*******************************!*\
  !*** ../main/ts/Tag.class.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_92618__) => {

__nested_webpack_require_92618__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_92618__.d(__nested_webpack_exports__, {
/* harmony export */   ArrayValueNeverSet: () => (/* binding */ ArrayValueNeverSet),
/* harmony export */   Tag: () => (/* binding */ Tag),
/* harmony export */   escapeSearch: () => (/* binding */ escapeSearch),
/* harmony export */   escapeVariable: () => (/* binding */ escapeVariable),
/* harmony export */   variablePrefix: () => (/* binding */ variablePrefix)
/* harmony export */ });
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_92618__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_92618__(/*! ./render */ "../main/ts/render.ts");
/* harmony import */ var _interpolateElement__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_92618__(/*! ./interpolateElement */ "../main/ts/interpolateElement.ts");
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_92618__(/*! ./interpolateTemplate */ "../main/ts/interpolateTemplate.ts");
/* harmony import */ var _elementDestroyCheck_function__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_92618__(/*! ./elementDestroyCheck.function */ "../main/ts/elementDestroyCheck.function.ts");
/* harmony import */ var _processNewValue_function__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_92618__(/*! ./processNewValue.function */ "../main/ts/processNewValue.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_92618__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_92618__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");








const variablePrefix = '__tagvar';
const escapeVariable = '--' + variablePrefix + '--';
const prefixSearch = new RegExp(variablePrefix, 'g');
const escapeSearch = new RegExp(escapeVariable, 'g');
class ArrayValueNeverSet {
    isArrayValueNeverSet = true;
}
class Tag {
    strings;
    values;
    version = 0;
    isTag = true;
    hasLiveElements = false;
    clones = []; // elements on document. Needed at destroy process to know what to destroy
    cloneSubs = []; // subscriptions created by clones
    childTags = []; // tags on me
    tagSupport;
    lastTemplateString = undefined; // used to compare templates for updates
    // only present when a child of a tag
    ownerTag;
    // insertBefore?: Element
    appElement; // only seen on this.getAppElement().appElement
    // present only when an array. Populated by this.key()
    arrayValue = new ArrayValueNeverSet();
    constructor(strings, values) {
        this.strings = strings;
        this.values = values;
    }
    /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
    key(arrayValue) {
        this.arrayValue = arrayValue;
        return this;
    }
    destroy(options = {
        stagger: 0,
        byParent: false, // Only destroy clones of direct children
    }) {
        if (!this.hasLiveElements) {
            throw new Error('destroying wrong tag');
        }
        const tagSupport = this.tagSupport;
        const global = tagSupport.templater.global;
        // removing is considered rendering. Prevents after event processing of this tag even tho possibly deleted
        // ++this.tagSupport.templater.global.renderCount
        // the isComponent check maybe able to be removed
        const isComponent = tagSupport ? true : false;
        if (isComponent) {
            (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runBeforeDestroy)(tagSupport, this);
        }
        const childTags = options.byParent ? [] : getChildTagsToDestroy(this.childTags);
        // signify that no further event rendering should take place by making logic think a render occurred during event
        // childTags.forEach(child => ++child.tagSupport.templater.global.renderCount)
        // signify immediately child has been deleted (looked for during event processing)
        childTags.forEach(child => {
            const subGlobal = child.tagSupport.templater.global;
            delete subGlobal.newest;
            subGlobal.deleted = true;
        });
        delete global.oldest;
        delete global.newest;
        global.deleted = true;
        this.hasLiveElements = false;
        delete tagSupport.subject.tag;
        this.destroySubscriptions();
        let mainPromise;
        if (this.ownerTag) {
            this.ownerTag.childTags = this.ownerTag.childTags.filter(child => child !== this);
        }
        if (!options.byParent) {
            const { stagger, promise } = this.destroyClones(options);
            options.stagger = stagger;
            if (promise) {
                mainPromise = promise;
            }
        }
        else {
            this.destroyClones();
        }
        if (mainPromise) {
            mainPromise = mainPromise.then(async () => {
                const promises = childTags.map(kid => kid.destroy({ stagger: 0, byParent: true }));
                return Promise.all(promises);
            });
        }
        else {
            mainPromise = Promise.all(childTags.map(kid => kid.destroy({ stagger: 0, byParent: true })));
        }
        return mainPromise.then(() => options.stagger);
    }
    destroySubscriptions() {
        this.cloneSubs.forEach(cloneSub => cloneSub.unsubscribe());
        this.cloneSubs.length = 0;
    }
    destroyClones({ stagger } = {
        stagger: 0,
    }) {
        //const promises = this.clones.reverse().map(
        const promises = this.clones.map(clone => this.checkCloneRemoval(clone, stagger)).filter(x => x); // only return promises
        this.clones.length = 0; // tag maybe used for something else
        if (promises.length) {
            return { promise: Promise.all(promises), stagger };
        }
        return { stagger };
    }
    checkCloneRemoval(clone, stagger) {
        let promise;
        const customElm = clone;
        if (customElm.ondestroy) {
            promise = (0,_elementDestroyCheck_function__WEBPACK_IMPORTED_MODULE_4__.elementDestroyCheck)(customElm, stagger);
        }
        const next = () => {
            clone.parentNode?.removeChild(clone);
            const ownerTag = this.ownerTag;
            if (ownerTag) {
                // Sometimes my clones were first registered to my owner, remove them from owner
                ownerTag.clones = ownerTag.clones.filter(compareClone => compareClone !== clone);
            }
        };
        if (promise instanceof Promise) {
            return promise.then(next);
        }
        else {
            next();
        }
        return promise;
    }
    getTemplate() {
        const string = this.strings.map((string, index) => {
            const safeString = string.replace(prefixSearch, escapeVariable);
            const endString = safeString + (this.values.length > index ? `{${variablePrefix}${index}}` : '');
            // const trimString = index === 0 || index === this.strings.length-1 ? endString.trim() : endString
            const trimString = endString.replace(/>\s*/g, '>').replace(/\s*</g, '<');
            return trimString;
        }).join('');
        const interpolation = (0,_interpolateElement__WEBPACK_IMPORTED_MODULE_2__.interpolateString)(string);
        this.lastTemplateString = interpolation.string;
        return {
            interpolation,
            // string,
            string: interpolation.string,
            strings: this.strings,
            values: this.values,
            context: this.tagSupport.templater.global.context || {},
        };
    }
    isLikeTag(tag) {
        return (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_7__.isLikeTags)(this, tag);
        const { string } = tag.getTemplate();
        // TODO: most likely remove?
        if (!this.lastTemplateString) {
            throw new Error('no template here');
        }
        const stringMatched = string === this.lastTemplateString;
        if (!stringMatched || tag.values.length !== this.values.length) {
            return false;
        }
        const allVarsMatch = tag.values.every((value, index) => {
            const compareTo = this.values[index];
            const isFunctions = value instanceof Function && compareTo instanceof Function;
            if (isFunctions) {
                const stringMatch = value.toString() === compareTo.toString();
                if (stringMatch) {
                    return true;
                }
                return false;
            }
            return true;
        });
        if (allVarsMatch) {
            return true;
        }
        return false;
    }
    updateByTag(tag) {
        if (!this.tagSupport.templater.global.oldest) {
            throw new Error('no oldest here');
        }
        if (!this.hasLiveElements) {
            throw new Error('trying to update a tag with no elements on stage');
        }
        this.tagSupport.templater.global.newest = tag;
        if (!this.tagSupport.templater.global.context) {
            throw new Error('issue back here');
        }
        this.updateConfig(tag.strings, tag.values);
    }
    updateConfig(strings, values) {
        this.strings = strings;
        this.updateValues(values);
    }
    update() {
        return this.updateContext(this.tagSupport.templater.global.context);
    }
    updateValues(values) {
        this.values = values;
        return this.updateContext(this.tagSupport.templater.global.context);
    }
    updateContext(context) {
        this.strings.map((_string, index) => {
            const variableName = variablePrefix + index;
            const hasValue = this.values.length > index;
            const value = this.values[index];
            // is something already there?
            const exists = variableName in context;
            if (exists) {
                return updateContextItem(context, variableName, value);
            }
            if (!hasValue) {
                return;
            }
            // 🆕 First time values below
            context[variableName] = (0,_processNewValue_function__WEBPACK_IMPORTED_MODULE_5__.processNewValue)(hasValue, value, this);
        });
        return context;
    }
    getAppElement() {
        let tag = this;
        while (tag.ownerTag) {
            tag = tag.ownerTag;
        }
        return tag;
    }
    /** Used during HMR only where static content itself could have been edited */
    rebuild() {
        // const insertBefore = this.insertBefore
        const insertBefore = this.tagSupport.templater.global.insertBefore;
        if (!insertBefore) {
            const err = new Error('Cannot rebuild. Previous insertBefore element is not defined on tag');
            err.tag = this;
            throw err;
        }
        this.buildBeforeElement(insertBefore, {
            forceElement: true,
            counts: { added: 0, removed: 0 }, test: false,
        });
    }
    buildBeforeElement(insertBefore, options = {
        forceElement: false,
        counts: { added: 0, removed: 0 },
        test: false
    }) {
        if (!insertBefore.parentNode) {
            throw new Error('no parent before removing clones');
        }
        this.tagSupport.templater.global.oldest = this;
        this.tagSupport.templater.global.newest = this;
        this.tagSupport.subject.tag = this;
        this.hasLiveElements = true;
        // remove old clones
        if (this.clones.length) {
            this.clones.forEach(clone => this.checkCloneRemoval(clone, 0));
        }
        // this.insertBefore = insertBefore
        this.tagSupport.templater.global.insertBefore = insertBefore;
        // const context = this.tagSupport.memory.context // this.update()
        const context = this.update();
        const template = this.getTemplate();
        if (!insertBefore.parentNode) {
            throw new Error('no parent before building tag');
        }
        const elementContainer = document.createElement('div');
        elementContainer.id = 'tag-temp-holder';
        // render content with a first child that we can know is our first element
        elementContainer.innerHTML = `<template id="temp-template-tag-wrap">${template.string}</template>`;
        // Search/replace innerHTML variables but don't interpolate tag components just yet
        const { tagComponents } = (0,_interpolateElement__WEBPACK_IMPORTED_MODULE_2__.interpolateElement)(elementContainer, context, template, this, // ownerTag,
        {
            forceElement: options.forceElement,
            counts: options.counts
        }, options.test);
        if (!insertBefore.parentNode) {
            throw new Error('no parent building tag');
        }
        afterInterpolateElement(elementContainer, insertBefore, this, // ownerTag
        context, options);
        // this.clones.push(...clones)
        // Any tag components that were found should be processed AFTER the owner processes its elements. Avoid double processing of elements attributes like (oninit)=${}
        let isForceElement = options.forceElement;
        tagComponents.forEach(tagComponent => {
            // const preClones = this.clones.map(clone => clone)
            (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_3__.subscribeToTemplate)(tagComponent.insertBefore, // temporary,
            tagComponent.subject, tagComponent.ownerTag, options.counts, { isForceElement });
            if (!insertBefore.parentNode) {
                throw new Error('no parent building tag components');
            }
            afterInterpolateElement(elementContainer, insertBefore, this, context, options);
            // remove component clones from ownerTag as they will belong to the components they live on
            /*
            if( preClones.length ) {
              this.clones = this.clones.filter(cloneFilter => !preClones.find(clone => clone === cloneFilter))
            }
            */
        });
    }
}
function afterInterpolateElement(container, insertBefore, ownerTag, 
// preClones: Clones,
context, options) {
    const clones = (0,_render__WEBPACK_IMPORTED_MODULE_1__.buildClones)(container, insertBefore);
    ownerTag.clones.push(...clones);
    clones.forEach(clone => (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_3__.afterElmBuild)(clone, options, context, ownerTag));
    return clones;
}
function getChildTagsToDestroy(childTags, allTags = []) {
    for (let index = childTags.length - 1; index >= 0; --index) {
        const cTag = childTags[index];
        if (allTags.find(x => x === cTag)) {
            // TODO: Lets find why a child tag is attached twice to owner
            throw new Error('child tag registered twice for delete');
        }
        allTags.push(cTag);
        childTags.splice(index, 1);
        getChildTagsToDestroy(cTag.childTags, allTags);
    }
    return allTags;
}
function updateContextItem(context, variableName, value) {
    const subject = context[variableName];
    const tag = subject.tag;
    if (tag) {
        const oldTemp = tag.tagSupport.templater;
        const oldWrap = oldTemp.wrapper; // tag versus component
        if (value.global !== oldTemp.global) {
            if (oldWrap && (0,_isInstance__WEBPACK_IMPORTED_MODULE_6__.isTagComponent)(value)) {
                const oldValueFn = oldWrap.original;
                const newValueFn = value.wrapper?.original;
                const fnMatched = oldValueFn === newValueFn;
                if (fnMatched) {
                    value.global = oldTemp.global;
                }
            }
        }
    }
    // return updateExistingValue(subject, value, this)
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_6__.isSubjectInstance)(value)) {
        return;
    }
    subject.set(value); // listeners will evaluate updated values to possibly update display(s)
    return;
}


/***/ }),

/***/ "../main/ts/TagSupport.class.ts":
/*!**************************************!*\
  !*** ../main/ts/TagSupport.class.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_108807__) => {

__nested_webpack_require_108807__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_108807__.d(__nested_webpack_exports__, {
/* harmony export */   BaseTagSupport: () => (/* binding */ BaseTagSupport),
/* harmony export */   TagSupport: () => (/* binding */ TagSupport)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_108807__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_108807__(/*! ./isInstance */ "../main/ts/isInstance.ts");


class BaseTagSupport {
    templater;
    subject;
    isApp = true;
    propsConfig;
    memory = {
        // context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
        state: {
            newest: [],
        },
    };
    constructor(templater, subject) {
        this.templater = templater;
        this.subject = subject;
        const children = this.templater.children; // children tags passed in as arguments
        const props = this.templater.props; // natural props
        const latestCloned = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(props); // alterProps(props, templater)
        this.propsConfig = {
            latest: props,
            latestCloned, // assume its HTML children and then detect
            clonedProps: latestCloned, // maybe duplicate
            lastClonedKidValues: children.value.map(kid => {
                const cloneValues = cloneValueArray(kid.values);
                return cloneValues;
            })
        };
        // if the latest props are not HTML children, then clone the props for later render cycles to compare
        if (!(0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(props)) {
            this.propsConfig.latestCloned = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(latestCloned);
            this.propsConfig.clonedProps = this.propsConfig.latestCloned;
        }
    }
}
function cloneValueArray(values) {
    return values.map((value) => {
        const tag = value;
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(tag)) {
            return cloneValueArray(tag.values);
        }
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(tag)) {
            const tagComponent = tag;
            return (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(tagComponent.props);
        }
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagArray)(tag)) {
            return cloneValueArray(tag);
        }
        return (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(value);
    });
}
class TagSupport extends BaseTagSupport {
    ownerTagSupport;
    templater;
    subject;
    isApp = false;
    constructor(ownerTagSupport, templater, subject) {
        super(templater, subject);
        this.ownerTagSupport = ownerTagSupport;
        this.templater = templater;
        this.subject = subject;
    }
}


/***/ }),

/***/ "../main/ts/TemplaterResult.class.ts":
/*!*******************************************!*\
  !*** ../main/ts/TemplaterResult.class.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_112100__) => {

__nested_webpack_require_112100__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_112100__.d(__nested_webpack_exports__, {
/* harmony export */   TemplaterResult: () => (/* binding */ TemplaterResult),
/* harmony export */   renderWithSupport: () => (/* binding */ renderWithSupport)
/* harmony export */ });
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_112100__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_112100__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_112100__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_112100__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");




class TemplaterResult {
    props;
    children;
    isTag = false; // when true, is basic tag non-component
    tagged;
    wrapper;
    global = {
        newestTemplater: this,
        context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
        providers: [],
        /** Indicator of re-rending. Saves from double rending something already rendered */
        renderCount: 0,
        deleted: false
    };
    tagSupport;
    constructor(props, children) {
        this.props = props;
        this.children = children;
    }
    /*
    redraw?: (
      force?: boolean, // force children to redraw
    ) => Tag
    */
    isTemplater = true;
}
function renderWithSupport(tagSupport, existingTag, subject, ownerTag) {
    const wrapTagSupport = tagSupport; // this.tagSupport
    /* BEFORE RENDER */
    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag;
    if (existingTag) {
        wrapTagSupport.memory.state.newest = [...existingTag.tagSupport.memory.state.newest];
        wrapTagSupport.templater.global = existingTag.tagSupport.templater.global;
        (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runBeforeRedraw)(wrapTagSupport, existingTag);
    }
    else {
        if (!wrapTagSupport) {
            throw new Error('63521');
        }
        // first time render
        (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runBeforeRender)(wrapTagSupport, runtimeOwnerTag);
        // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
        const providers = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        providers.ownerTag = runtimeOwnerTag;
    }
    /* END: BEFORE RENDER */
    const templater = wrapTagSupport.templater;
    const retag = templater.wrapper(wrapTagSupport, subject);
    /* AFTER */
    (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runAfterRender)(wrapTagSupport, retag);
    const isLikeTag = !existingTag || (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__.isLikeTags)(existingTag, retag);
    if (!isLikeTag) {
        (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_3__.destroyTagMemory)(existingTag, subject);
        delete templater.global.oldest;
        delete templater.global.newest;
        delete subject.tag;
        templater.global.insertBefore = existingTag.tagSupport.templater.global.insertBefore;
    }
    retag.ownerTag = runtimeOwnerTag;
    wrapTagSupport.templater.global.newest = retag;
    if (wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
        throw new Error('56513540');
    }
    if (wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
        throw new Error('5555 - 10');
    }
    return retag;
}


/***/ }),

/***/ "../main/ts/ValueSubject.ts":
/*!**********************************!*\
  !*** ../main/ts/ValueSubject.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_116090__) => {

__nested_webpack_require_116090__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_116090__.d(__nested_webpack_exports__, {
/* harmony export */   ValueSubject: () => (/* binding */ ValueSubject)
/* harmony export */ });
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_116090__(/*! ./Subject */ "../main/ts/Subject.ts");

class ValueSubject extends _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject {
    value;
    constructor(value) {
        super(value);
        this.value = value;
    }
    subscribe(callback) {
        const unsubscribe = super.subscribe(callback);
        // Call the callback immediately with the current value
        callback(this.value);
        return unsubscribe;
    }
}


/***/ }),

/***/ "../main/ts/alterProps.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/alterProps.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_117081__) => {

__nested_webpack_require_117081__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_117081__.d(__nested_webpack_exports__, {
/* harmony export */   alterProps: () => (/* binding */ alterProps)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_117081__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_117081__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");


/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
function alterProps(props, templater, ownerSupport) {
    function callback(toCall, callWith) {
        const renderCount = templater.global.renderCount;
        const callbackResult = toCall(...callWith);
        if (templater.global.renderCount > renderCount) {
            throw new Error('already rendered');
        }
        const lastestOwner = ownerSupport.templater.global.newest;
        const newOwner = (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_1__.renderTagSupport)(lastestOwner.tagSupport, true);
        if (newOwner.tagSupport.templater.global.newest != newOwner) {
            throw new Error('newest assignment issue?');
        }
        return callbackResult;
    }
    const isPropTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagInstance)(props);
    const watchProps = isPropTag ? 0 : props;
    const newProps = resetFunctionProps(watchProps, callback);
    return newProps;
}
function resetFunctionProps(props, callback) {
    if (typeof (props) !== 'object') {
        return props;
    }
    const newProps = props;
    // BELOW: Do not clone because if first argument is object, the memory ref back is lost
    // const newProps = {...props} 
    Object.entries(newProps).forEach(([name, value]) => {
        if (value instanceof Function) {
            const original = newProps[name].original;
            if (original) {
                return; // already previously converted
            }
            newProps[name] = (...args) => {
                return callback(value, args);
            };
            newProps[name].original = value;
            return;
        }
    });
    return newProps;
}


/***/ }),

/***/ "../main/ts/bindSubjectCallback.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/bindSubjectCallback.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_119672__) => {

__nested_webpack_require_119672__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_119672__.d(__nested_webpack_exports__, {
/* harmony export */   bindSubjectCallback: () => (/* binding */ bindSubjectCallback),
/* harmony export */   runTagCallback: () => (/* binding */ runTagCallback)
/* harmony export */ });
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_119672__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");
/** File largely responsible for reacting to element events, such as onclick */

function bindSubjectCallback(value, tag) {
    // Is this children? No override needed
    if (value.isChildOverride) {
        return value;
    }
    if (!tag.ownerTag && !tag.tagSupport.templater.global.isApp) {
        throw new Error('no ownerTag issue here');
    }
    const subjectFunction = (element, args) => runTagCallback(value, tag, element, args);
    // link back to original. Mostly used for <div oninit ondestroy> animations
    subjectFunction.tagFunction = value;
    return subjectFunction;
}
function runTagCallback(value, tag, bindTo, args) {
    const tagSupport = tag.tagSupport;
    const renderCount = tagSupport.templater.global.renderCount;
    const method = value.bind(bindTo);
    const callbackResult = method(...args);
    const sameRenderCount = renderCount === tagSupport.templater.global.renderCount;
    // already rendered OR tag was deleted before event processing
    if (!sameRenderCount || tagSupport.templater.global.deleted) {
        if (callbackResult instanceof Promise) {
            return callbackResult.then(() => {
                return 'promise-no-data-ever'; // tag was deleted during event processing
            });
        }
        return 'no-data-ever'; // already rendered
    }
    (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport, true);
    if (callbackResult instanceof Promise) {
        return callbackResult.then(() => {
            if (tagSupport.templater.global.deleted) {
                return 'promise-no-data-ever'; // tag was deleted during event processing
            }
            (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport, true);
            return 'promise-no-data-ever';
        });
    }
    // Caller always expects a Promise
    return 'no-data-ever';
}


/***/ }),

/***/ "../main/ts/checkDestroyPrevious.function.ts":
/*!***************************************************!*\
  !*** ../main/ts/checkDestroyPrevious.function.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_122374__) => {

__nested_webpack_require_122374__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_122374__.d(__nested_webpack_exports__, {
/* harmony export */   checkDestroyPrevious: () => (/* binding */ checkDestroyPrevious),
/* harmony export */   destroyArrayTag: () => (/* binding */ destroyArrayTag)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_122374__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_122374__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_122374__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");



function checkDestroyPrevious(subject, // existing.value is the old value
newValue) {
    const existingSubArray = subject;
    const wasArray = existingSubArray.lastArray;
    // no longer an array
    if (wasArray && !(0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(newValue)) {
        wasArray.forEach(({ tag }) => destroyArrayTag(tag, { added: 0, removed: 0 }));
        delete subject.lastArray;
        return 1;
    }
    const tagSubject = subject;
    const existingTag = tagSubject.tag;
    // no longer tag or component?
    if (existingTag) {
        const isValueTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagInstance)(newValue);
        const isSubjectTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagInstance)(subject.value);
        if (isSubjectTag && isValueTag) {
            const newTag = newValue;
            if (!(0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__.isLikeTags)(newTag, existingTag)) {
                (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(existingTag, tagSubject);
                return 2;
            }
            return false;
        }
        const isValueTagComponent = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagComponent)(newValue);
        if (isValueTagComponent) {
            return false; // its still a tag component
        }
        // destroy old component, value is not a component
        (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(existingTag, tagSubject);
        return 3;
    }
    const displaySubject = subject;
    const hasLastValue = 'lastValue' in displaySubject;
    const lastValue = displaySubject.lastValue; // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
    // was simple value but now something bigger
    if (hasLastValue && lastValue !== newValue) {
        destroySimpleValue(displaySubject.template, displaySubject);
        return 4;
    }
    return false;
}
function destroyArrayTag(tag, counts) {
    (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagSupportPast)(tag.tagSupport);
    tag.destroy({
        stagger: counts.removed++,
    });
}
function destroySimpleValue(template, subject) {
    const clone = subject.clone;
    const parent = clone.parentNode;
    // put the template back down
    parent.insertBefore(template, clone);
    parent.removeChild(clone);
    delete subject.clone;
    delete subject.lastValue;
    // subject.template = template
}


/***/ }),

/***/ "../main/ts/deepFunctions.ts":
/*!***********************************!*\
  !*** ../main/ts/deepFunctions.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_125885__) => {

__nested_webpack_require_125885__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_125885__.d(__nested_webpack_exports__, {
/* harmony export */   deepClone: () => (/* binding */ deepClone),
/* harmony export */   deepEqual: () => (/* binding */ deepEqual)
/* harmony export */ });
function deepClone(obj) {
    return makeDeepClone(obj, new WeakMap());
}
function makeDeepClone(obj, visited) {
    // If obj is a primitive type or null, return it directly
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // If obj is already visited, return the cloned reference
    if (visited.has(obj)) {
        return visited.get(obj);
    }
    // Handle special cases like Date and RegExp
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    // Create an empty object or array with the same prototype
    const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    // Register the cloned object to avoid cyclic references
    visited.set(obj, clone);
    // Clone each property or element of the object or array
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            clone[i] = makeDeepClone(obj[i], visited);
        }
    }
    else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = makeDeepClone(obj[key], visited);
            }
        }
    }
    return clone;
}
function deepEqual(obj1, obj2) {
    return isDeepEqual(obj1, obj2, new WeakMap());
}
function isDeepEqual(obj1, obj2, visited) {
    if (obj1 === obj2 || isSameFunctions(obj1, obj2)) {
        return true;
    }
    if (typeof obj1 !== 'object' ||
        typeof obj2 !== 'object' ||
        obj1 === null ||
        obj2 === null) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    // If obj is already visited, return the cloned reference
    if (visited.has(obj1)) {
        return true;
    }
    // Register the cloned object to avoid cyclic references
    visited.set(obj1, 0);
    for (const key of keys1) {
        const keyFound = keys2.includes(key);
        if (!keyFound || !isDeepEqual(obj1[key], obj2[key], visited)) {
            /*
            if(isSameFunctions(obj1[key], obj2[key])) {
              continue
            }
            */
            return false;
        }
    }
    // Check if obj1 and obj2 are both arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!isDeepEqual(obj1[i], obj2[i], visited)) {
                return false;
            }
        }
    }
    else if (Array.isArray(obj1) || Array.isArray(obj2)) {
        // One is an array, and the other is not
        return false;
    }
    return true;
}
function isSameFunctions(fn0, fn1) {
    const bothFunction = fn0 instanceof Function && fn1 instanceof Function;
    return bothFunction && fn0.toString() === fn1.toString();
}


/***/ }),

/***/ "../main/ts/destroyTag.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/destroyTag.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_129351__) => {

__nested_webpack_require_129351__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_129351__.d(__nested_webpack_exports__, {
/* harmony export */   destroyTagMemory: () => (/* binding */ destroyTagMemory),
/* harmony export */   destroyTagSupportPast: () => (/* binding */ destroyTagSupportPast)
/* harmony export */ });
function destroyTagMemory(tag, subject) {
    const oldTagSupport = tag.tagSupport;
    if (subject != tag.tagSupport.subject) {
        throw new Error('fff - subjects do not match');
    }
    delete subject.tag;
    delete tag.tagSupport.subject.tag; // TODO: this line maybe not needed
    // must destroy oldest which is tag with elements on stage
    const oldest = tag.tagSupport.templater.global.oldest;
    oldest.destroy();
    destroyTagSupportPast(oldTagSupport);
    tag.tagSupport.templater.global.context = {};
}
function destroyTagSupportPast(oldTagSupport) {
    delete oldTagSupport.templater.global.oldest;
    delete oldTagSupport.templater.global.newest;
}


/***/ }),

/***/ "../main/ts/elementDestroyCheck.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/elementDestroyCheck.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_130648__) => {

__nested_webpack_require_130648__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_130648__.d(__nested_webpack_exports__, {
/* harmony export */   elementDestroyCheck: () => (/* binding */ elementDestroyCheck)
/* harmony export */ });
function elementDestroyCheck(nextSibling, stagger) {
    const onDestroyDoubleWrap = nextSibling.ondestroy;
    if (!onDestroyDoubleWrap) {
        return;
    }
    const onDestroyWrap = onDestroyDoubleWrap.tagFunction;
    if (!onDestroyWrap) {
        return;
    }
    const onDestroy = onDestroyWrap.tagFunction;
    if (!onDestroy) {
        return;
    }
    const event = { target: nextSibling, stagger };
    return onDestroy(event);
}


/***/ }),

/***/ "../main/ts/elementInitCheck.ts":
/*!**************************************!*\
  !*** ../main/ts/elementInitCheck.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_131579__) => {

__nested_webpack_require_131579__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_131579__.d(__nested_webpack_exports__, {
/* harmony export */   elementInitCheck: () => (/* binding */ elementInitCheck)
/* harmony export */ });
function elementInitCheck(nextSibling, counts) {
    const onInitDoubleWrap = nextSibling.oninit;
    if (!onInitDoubleWrap) {
        return counts.added;
    }
    const onInitWrap = onInitDoubleWrap.tagFunction;
    if (!onInitWrap) {
        return counts.added;
    }
    const onInit = onInitWrap.tagFunction;
    if (!onInit) {
        return counts.added;
    }
    const event = { target: nextSibling, stagger: counts.added };
    onInit(event);
    return ++counts.added;
}


/***/ }),

/***/ "../main/ts/errors.ts":
/*!****************************!*\
  !*** ../main/ts/errors.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_132503__) => {

__nested_webpack_require_132503__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_132503__.d(__nested_webpack_exports__, {
/* harmony export */   ArrayNoKeyError: () => (/* binding */ ArrayNoKeyError),
/* harmony export */   StateMismatchError: () => (/* binding */ StateMismatchError),
/* harmony export */   TagError: () => (/* binding */ TagError)
/* harmony export */ });
class TagError extends Error {
    details;
    constructor(message, errorCode, details = {}) {
        super(message);
        this.name = TagError.name;
        this.details = { ...details, errorCode };
    }
}
class ArrayNoKeyError extends TagError {
    constructor(message, details) {
        super(message, 'array-no-key-error', details);
        this.name = ArrayNoKeyError.name;
    }
}
class StateMismatchError extends TagError {
    constructor(message, details) {
        super(message, 'state-mismatch-error', details);
        this.name = StateMismatchError.name;
    }
}


/***/ }),

/***/ "../main/ts/getCallback.ts":
/*!*********************************!*\
  !*** ../main/ts/getCallback.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_133696__) => {

__nested_webpack_require_133696__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_133696__.d(__nested_webpack_exports__, {
/* harmony export */   getCallback: () => (/* binding */ getCallback)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_133696__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_133696__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_133696__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");



let innerCallback = (callback) => () => {
    throw new Error('Callback function was called immediately in sync and must instead be call async');
};
const getCallback = () => innerCallback;
const originalGetter = innerCallback; // getCallback
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse)({
    beforeRender: (tagSupport) => initMemory(tagSupport),
    beforeRedraw: (tagSupport) => initMemory(tagSupport),
    afterRender: (_tagSupport) => {
        innerCallback = originalGetter; // prevent crossing callbacks with another tag
    },
});
function updateState(stateFrom, stateTo) {
    stateFrom.forEach((state, index) => {
        const fromValue = (0,_set_function__WEBPACK_IMPORTED_MODULE_1__.getStateValue)(state);
        const callback = stateTo[index].callback;
        if (callback) {
            callback(fromValue); // set the value
        }
        stateTo[index].lastValue = fromValue; // record the value
    });
}
function initMemory(tagSupport) {
    const oldState = _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.stateConfig.array;
    innerCallback = (callback) => {
        const trigger = (...args) => triggerStateUpdate(tagSupport, callback, oldState, ...args);
        return trigger;
    };
}
function triggerStateUpdate(tagSupport, callback, oldState, ...args) {
    const state = tagSupport.memory.state;
    const newest = state.newest;
    // ensure that the oldest has the latest values first
    updateState(newest, oldState);
    // run the callback
    const promise = callback(...args);
    // send the oldest state changes into the newest
    updateState(oldState, newest);
    (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__.renderTagSupport)(tagSupport, false);
    if (promise instanceof Promise) {
        promise.finally(() => {
            // send the oldest state changes into the newest
            updateState(oldState, newest);
            (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__.renderTagSupport)(tagSupport, false);
        });
    }
}


/***/ }),

/***/ "../main/ts/hasTagSupportChanged.function.ts":
/*!***************************************************!*\
  !*** ../main/ts/hasTagSupportChanged.function.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_136736__) => {

__nested_webpack_require_136736__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_136736__.d(__nested_webpack_exports__, {
/* harmony export */   hasKidsChanged: () => (/* binding */ hasKidsChanged),
/* harmony export */   hasPropChanges: () => (/* binding */ hasPropChanges),
/* harmony export */   hasTagSupportChanged: () => (/* binding */ hasTagSupportChanged)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_136736__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");

function hasTagSupportChanged(oldTagSupport, newTagSupport, newTemplater) {
    const sameSupport = oldTagSupport === newTagSupport;
    const samePropConfig = oldTagSupport.propsConfig === newTagSupport.propsConfig;
    // const sameProps = oldTagSupport.propsConfig.latest === newTagSupport.propsConfig.latest
    if (sameSupport) {
        throw new Error('sameSupport - 22');
    }
    if (samePropConfig) {
        throw new Error('samePropConfig - 22');
    }
    if (newTagSupport.templater.isTag || oldTagSupport.templater.isTag || newTemplater.isTag) {
        throw new Error('trying to compare a basic tag');
    }
    const latestProps = newTemplater.props; // newTagSupport.propsConfig.latest
    const pastCloneProps = oldTagSupport.propsConfig.latestCloned;
    const propsChanged = hasPropChanges(latestProps, pastCloneProps);
    // if no changes detected, no need to continue to rendering further tags
    if (propsChanged) {
        return propsChanged;
    }
    const kidsChanged = hasKidsChanged(oldTagSupport, newTagSupport);
    // we already know props didn't change and if kids didn't either, than don't render
    return kidsChanged;
}
function hasPropChanges(props, // natural props
pastCloneProps) {
    /*
    const isCommonEqual = props === undefined && props === compareToProps
    if(isCommonEqual) {
      return false
    }
    */
    let castedProps = props;
    let castedPastProps = pastCloneProps;
    // check all prop functions match
    if (typeof (props) === 'object') {
        if (!pastCloneProps) {
            return 3;
        }
        castedProps = { ...props };
        castedPastProps = { ...(pastCloneProps || {}) };
        const allFunctionsMatch = Object.entries(castedProps).every(([key, value]) => {
            /*if(!(key in (castedPastProps as any))) {
              return false
            }*/
            let compare = castedPastProps[key];
            if (!(value instanceof Function)) {
                return 4; // this will be checked in deepEqual
            }
            if (!(compare instanceof Function)) {
                return false; // its a function now but was not before
            }
            // ensure we are comparing apples to apples as function get wrapped
            if (compare.original) {
                compare = compare.original;
            }
            const original = value.original;
            if (original) {
                value = value.original;
            }
            if (value.toString() !== compare.toString()) {
                return false; // both are function but not the same
            }
            delete castedProps[key]; // its a function and not needed to be compared
            delete castedPastProps[key]; // its a function and not needed to be compared
            return 5;
        });
        if (!allFunctionsMatch) {
            return 6; // a change has been detected by function comparisons
        }
    }
    const isEqual = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)(castedPastProps, castedProps);
    return isEqual ? false : 7; // if equal then no changes
}
function hasKidsChanged(oldTagSupport, newTagSupport) {
    const oldCloneKidValues = oldTagSupport.propsConfig.lastClonedKidValues;
    const newClonedKidValues = newTagSupport.propsConfig.lastClonedKidValues;
    const everySame = oldCloneKidValues.every((set, index) => {
        const x = newClonedKidValues[index];
        return set.every((item, index) => item === x[index]);
    });
    return everySame ? false : 9;
}


/***/ }),

/***/ "../main/ts/html.ts":
/*!**************************!*\
  !*** ../main/ts/html.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_141014__) => {

__nested_webpack_require_141014__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_141014__.d(__nested_webpack_exports__, {
/* harmony export */   html: () => (/* binding */ html)
/* harmony export */ });
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_141014__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");

function html(strings, ...values) {
    return new _Tag_class__WEBPACK_IMPORTED_MODULE_0__.Tag(strings, values);
}


/***/ }),

/***/ "../main/ts/index.ts":
/*!***************************!*\
  !*** ../main/ts/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_141676__) => {

__nested_webpack_require_141676__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_141676__.d(__nested_webpack_exports__, {
/* harmony export */   ArrayNoKeyError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_4__.ArrayNoKeyError),
/* harmony export */   BaseTagSupport: () => (/* reexport safe */ _TagSupport_class__WEBPACK_IMPORTED_MODULE_9__.BaseTagSupport),
/* harmony export */   StateMismatchError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_4__.StateMismatchError),
/* harmony export */   Subject: () => (/* reexport safe */ _Subject__WEBPACK_IMPORTED_MODULE_5__.Subject),
/* harmony export */   Tag: () => (/* reexport safe */ _Tag_class__WEBPACK_IMPORTED_MODULE_11__.Tag),
/* harmony export */   TagError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_4__.TagError),
/* harmony export */   TagSupport: () => (/* reexport safe */ _TagSupport_class__WEBPACK_IMPORTED_MODULE_9__.TagSupport),
/* harmony export */   ValueSubject: () => (/* reexport safe */ _ValueSubject__WEBPACK_IMPORTED_MODULE_7__.ValueSubject),
/* harmony export */   getCallback: () => (/* reexport safe */ _getCallback__WEBPACK_IMPORTED_MODULE_20__.getCallback),
/* harmony export */   hmr: () => (/* binding */ hmr),
/* harmony export */   html: () => (/* reexport safe */ _html__WEBPACK_IMPORTED_MODULE_3__.html),
/* harmony export */   interpolateElement: () => (/* reexport safe */ _interpolateElement__WEBPACK_IMPORTED_MODULE_10__.interpolateElement),
/* harmony export */   interpolateString: () => (/* reexport safe */ _interpolateElement__WEBPACK_IMPORTED_MODULE_10__.interpolateString),
/* harmony export */   isSubjectInstance: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_6__.isSubjectInstance),
/* harmony export */   isTagArray: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_6__.isTagArray),
/* harmony export */   isTagComponent: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_6__.isTagComponent),
/* harmony export */   isTagInstance: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_6__.isTagInstance),
/* harmony export */   onDestroy: () => (/* reexport safe */ _onDestroy__WEBPACK_IMPORTED_MODULE_19__.onDestroy),
/* harmony export */   onInit: () => (/* reexport safe */ _onInit__WEBPACK_IMPORTED_MODULE_18__.onInit),
/* harmony export */   providers: () => (/* reexport safe */ _providers__WEBPACK_IMPORTED_MODULE_14__.providers),
/* harmony export */   runBeforeRender: () => (/* reexport safe */ _tagRunner__WEBPACK_IMPORTED_MODULE_12__.runBeforeRender),
/* harmony export */   set: () => (/* reexport safe */ _set_function__WEBPACK_IMPORTED_MODULE_15__.set),
/* harmony export */   setLet: () => (/* reexport safe */ _setLet_function__WEBPACK_IMPORTED_MODULE_16__.setLet),
/* harmony export */   setProp: () => (/* reexport safe */ _setProp_function__WEBPACK_IMPORTED_MODULE_17__.setProp),
/* harmony export */   setUse: () => (/* reexport safe */ _setUse_function__WEBPACK_IMPORTED_MODULE_13__.setUse),
/* harmony export */   tag: () => (/* reexport safe */ _tag__WEBPACK_IMPORTED_MODULE_2__.tag),
/* harmony export */   tagElement: () => (/* reexport safe */ _tagElement__WEBPACK_IMPORTED_MODULE_0__.tagElement),
/* harmony export */   tags: () => (/* reexport safe */ _tag__WEBPACK_IMPORTED_MODULE_2__.tags),
/* harmony export */   watch: () => (/* reexport safe */ _watch_function__WEBPACK_IMPORTED_MODULE_8__.watch)
/* harmony export */ });
/* harmony import */ var _tagElement__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_141676__(/*! ./tagElement */ "../main/ts/tagElement.ts");
/* harmony import */ var _ElementTargetEvent_interface__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_141676__(/*! ./ElementTargetEvent.interface */ "../main/ts/ElementTargetEvent.interface.ts");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_141676__(/*! ./tag */ "../main/ts/tag.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_141676__(/*! ./html */ "../main/ts/html.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_141676__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_141676__(/*! ./Subject */ "../main/ts/Subject.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_141676__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_141676__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _watch_function__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_141676__(/*! ./watch.function */ "../main/ts/watch.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_141676__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _interpolateElement__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_141676__(/*! ./interpolateElement */ "../main/ts/interpolateElement.ts");
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_141676__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_141676__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_141676__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_141676__(/*! ./providers */ "../main/ts/providers.ts");
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_141676__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _setLet_function__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_141676__(/*! ./setLet.function */ "../main/ts/setLet.function.ts");
/* harmony import */ var _setProp_function__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_141676__(/*! ./setProp.function */ "../main/ts/setProp.function.ts");
/* harmony import */ var _onInit__WEBPACK_IMPORTED_MODULE_18__ = __nested_webpack_require_141676__(/*! ./onInit */ "../main/ts/onInit.ts");
/* harmony import */ var _onDestroy__WEBPACK_IMPORTED_MODULE_19__ = __nested_webpack_require_141676__(/*! ./onDestroy */ "../main/ts/onDestroy.ts");
/* harmony import */ var _getCallback__WEBPACK_IMPORTED_MODULE_20__ = __nested_webpack_require_141676__(/*! ./getCallback */ "../main/ts/getCallback.ts");
// import { redrawTag } from "./redrawTag.function"










// export * from "./redrawTag.function"

// TODO: export *




/* hooks */
// TODO: export *







/* end: hooks */
const hmr = {
    tagElement: _tagElement__WEBPACK_IMPORTED_MODULE_0__.tagElement,
    // redrawTag
};


/***/ }),

/***/ "../main/ts/inputAttribute.ts":
/*!************************************!*\
  !*** ../main/ts/inputAttribute.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_148637__) => {

__nested_webpack_require_148637__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_148637__.d(__nested_webpack_exports__, {
/* harmony export */   inputAttribute: () => (/* binding */ inputAttribute)
/* harmony export */ });
function inputAttribute(name, value, element) {
    const names = name.split('.');
    // style.position = "absolute"
    if (names[0] === 'style') {
        element.style[names[1]] = value;
    }
    // Example: class.width-full = "true"
    if (names[0] === 'class') {
        names.shift();
        if (value) {
            names.forEach(name => element.classList.add(name));
        }
        else {
            names.forEach(name => element.classList.remove(name));
        }
        return;
    }
}


/***/ }),

/***/ "../main/ts/interpolateAttributes.ts":
/*!*******************************************!*\
  !*** ../main/ts/interpolateAttributes.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_149638__) => {

__nested_webpack_require_149638__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_149638__.d(__nested_webpack_exports__, {
/* harmony export */   interpolateAttributes: () => (/* binding */ interpolateAttributes)
/* harmony export */ });
/* harmony import */ var _processAttribute_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_149638__(/*! ./processAttribute.function */ "../main/ts/processAttribute.function.ts");

function howToSetAttribute(element, name, value) {
    element.setAttribute(name, value);
}
function howToSetInputValue(element, name, value) {
    element[name] = value;
}
function interpolateAttributes(child, scope, ownerTag) {
    const attrNames = child.getAttributeNames();
    let howToSet = howToSetAttribute;
    attrNames.forEach(attrName => {
        if (child.nodeName === 'INPUT' && attrName === 'value') {
            howToSet = howToSetInputValue;
        }
        const value = child.getAttribute(attrName);
        (0,_processAttribute_function__WEBPACK_IMPORTED_MODULE_0__.processAttribute)(attrName, value, child, scope, ownerTag, howToSet);
        howToSet = howToSetAttribute; // put back
    });
}


/***/ }),

/***/ "../main/ts/interpolateContentTemplates.ts":
/*!*************************************************!*\
  !*** ../main/ts/interpolateContentTemplates.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_151076__) => {

__nested_webpack_require_151076__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_151076__.d(__nested_webpack_exports__, {
/* harmony export */   interpolateContentTemplates: () => (/* binding */ interpolateContentTemplates)
/* harmony export */ });
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_151076__(/*! ./interpolateTemplate */ "../main/ts/interpolateTemplate.ts");

function interpolateContentTemplates(element, context, tag, options, children) {
    if (!children || element.tagName === 'TEMPLATE') {
        return { clones: [], tagComponents: [] }; // done
    }
    // counting for animation stagger computing
    const counts = options.counts;
    const clones = [];
    const tagComponents = [];
    const childArray = new Array(...children);
    childArray.forEach(child => {
        const { clones: nextClones, tagComponent } = (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__.interpolateTemplate)(child, context, tag, counts, options);
        clones.push(...nextClones);
        if (tagComponent) {
            tagComponents.push(tagComponent);
            return;
        }
        if (child.children) {
            const nextKids = new Array(...child.children);
            nextKids.forEach((subChild, index) => {
                // IF <template end /> its a variable to be processed
                if (isRenderEndTemplate(subChild)) {
                    const { tagComponent } = (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__.interpolateTemplate)(subChild, context, tag, counts, options);
                    if (tagComponent) {
                        tagComponents.push(tagComponent);
                    }
                }
                const { clones: nextClones, tagComponents: nextTagComponent } = interpolateContentTemplates(subChild, context, tag, options, subChild.children);
                clones.push(...nextClones);
                tagComponents.push(...nextTagComponent);
            });
        }
    });
    return { clones, tagComponents };
}
function isRenderEndTemplate(child) {
    const isTemplate = child.tagName === 'TEMPLATE';
    return isTemplate &&
        child.getAttribute('interpolate') !== undefined &&
        child.getAttribute('end') !== undefined;
}


/***/ }),

/***/ "../main/ts/interpolateElement.ts":
/*!****************************************!*\
  !*** ../main/ts/interpolateElement.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_153599__) => {

__nested_webpack_require_153599__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_153599__.d(__nested_webpack_exports__, {
/* harmony export */   interpolateElement: () => (/* binding */ interpolateElement),
/* harmony export */   interpolateString: () => (/* binding */ interpolateString)
/* harmony export */ });
/* harmony import */ var _interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_153599__(/*! ./interpolateAttributes */ "../main/ts/interpolateAttributes.ts");
/* harmony import */ var _interpolations__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_153599__(/*! ./interpolations */ "../main/ts/interpolations.ts");
/* harmony import */ var _interpolateContentTemplates__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_153599__(/*! ./interpolateContentTemplates */ "../main/ts/interpolateContentTemplates.ts");
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_153599__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");




/** Review elements within an element */
function interpolateElement(container, context, // variables used to evaluate
interpolatedTemplates, tagOwner, options, test = false) {
    const clones = [];
    const tagComponents = [];
    const result = interpolatedTemplates.interpolation;
    const template = container.children[0];
    const children = template.content.children;
    if (result.keys.length) {
        const { clones: nextClones, tagComponents: nextTagComponents } = (0,_interpolateContentTemplates__WEBPACK_IMPORTED_MODULE_2__.interpolateContentTemplates)(container, context, tagOwner, options, children);
        clones.push(...nextClones);
        tagComponents.push(...nextTagComponents);
    }
    (0,_interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__.interpolateAttributes)(container, context, tagOwner);
    processChildrenAttributes(children, context, tagOwner);
    return { clones, tagComponents };
}
function processChildrenAttributes(children, context, ownerTag) {
    new Array(...children).forEach(child => {
        (0,_interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__.interpolateAttributes)(child, context, ownerTag);
        if (child.children) {
            processChildrenAttributes(child.children, context, ownerTag);
        }
    });
}
function interpolateString(string) {
    const result = (0,_interpolations__WEBPACK_IMPORTED_MODULE_1__.interpolateToTemplates)(string);
    result.string = result.string.replace(_Tag_class__WEBPACK_IMPORTED_MODULE_3__.escapeSearch, _Tag_class__WEBPACK_IMPORTED_MODULE_3__.variablePrefix);
    return result;
}


/***/ }),

/***/ "../main/ts/interpolateTemplate.ts":
/*!*****************************************!*\
  !*** ../main/ts/interpolateTemplate.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_156409__) => {

__nested_webpack_require_156409__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_156409__.d(__nested_webpack_exports__, {
/* harmony export */   afterElmBuild: () => (/* binding */ afterElmBuild),
/* harmony export */   interpolateTemplate: () => (/* binding */ interpolateTemplate),
/* harmony export */   subscribeToTemplate: () => (/* binding */ subscribeToTemplate),
/* harmony export */   updateBetweenTemplates: () => (/* binding */ updateBetweenTemplates)
/* harmony export */ });
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_156409__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _elementInitCheck__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_156409__(/*! ./elementInitCheck */ "../main/ts/elementInitCheck.ts");
/* harmony import */ var _processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_156409__(/*! ./processSubjectValue.function */ "../main/ts/processSubjectValue.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_156409__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _scanTextAreaValue_function__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_156409__(/*! ./scanTextAreaValue.function */ "../main/ts/scanTextAreaValue.function.ts");
/* harmony import */ var _updateExistingValue_function__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_156409__(/*! ./updateExistingValue.function */ "../main/ts/updateExistingValue.function.ts");






function interpolateTemplate(insertBefore, // <template end interpolate /> (will be removed)
context, // variable scope of {`__tagvar${index}`:'x'}
ownerTag, // Tag class
counts, // used for animation stagger computing
options) {
    // TODO: THe clones array is useless here
    const clones = [];
    if (!insertBefore.hasAttribute('end')) {
        return { clones }; // only care about <template end>
    }
    const variableName = insertBefore.getAttribute('id');
    if (variableName?.substring(0, _Tag_class__WEBPACK_IMPORTED_MODULE_0__.variablePrefix.length) !== _Tag_class__WEBPACK_IMPORTED_MODULE_0__.variablePrefix) {
        return { clones }; // ignore, not a tagVar
    }
    const existingSubject = context[variableName];
    const isDynamic = (0,_isInstance__WEBPACK_IMPORTED_MODULE_3__.isTagComponent)(existingSubject.value) || (0,_isInstance__WEBPACK_IMPORTED_MODULE_3__.isTagArray)(existingSubject.value);
    // process dynamics later
    if (isDynamic) {
        return {
            clones,
            tagComponent: {
                variableName,
                ownerTag,
                subject: existingSubject,
                insertBefore
            }
        };
    }
    let isForceElement = options.forceElement;
    subscribeToTemplate(insertBefore, existingSubject, ownerTag, counts, { isForceElement });
    return { clones };
}
function subscribeToTemplate(insertBefore, subject, ownerTag, counts, // used for animation stagger computing
{ isForceElement }) {
    let called = false;
    const callback = (value) => {
        // const orgInsert = insertBefore
        const clone = subject.clone;
        if (clone && clone.parentNode) {
            insertBefore = clone;
        }
        if (called) {
            (0,_updateExistingValue_function__WEBPACK_IMPORTED_MODULE_5__.updateExistingValue)(subject, value, ownerTag, insertBefore);
            return;
        }
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processSubjectValue)(value, subject, insertBefore, ownerTag, {
            counts: { ...counts },
            forceElement: isForceElement,
        });
        if (isForceElement) {
            isForceElement = false; // only can happen once
        }
        // ownerTag.clones.push(...clones)
        // ownerTag.clones.push(...nextClones)
        // clones.push(...nextClones)
        called = true;
    };
    const sub = subject.subscribe(callback);
    ownerTag.cloneSubs.push(sub);
}
// Function to update the value of x
function updateBetweenTemplates(value, lastFirstChild) {
    const parent = lastFirstChild.parentNode;
    // mimic React skipping to display EXCEPT for true does display on page
    if (value === undefined || value === false || value === null) { // || value === true
        value = '';
    }
    // Insert the new value (never use innerHTML here)
    const textNode = document.createTextNode(value); // never innerHTML
    parent.insertBefore(textNode, lastFirstChild);
    /* remove existing nodes */
    parent.removeChild(lastFirstChild);
    return textNode;
}
function afterElmBuild(elm, options, context, ownerTag) {
    if (!elm.getAttribute) {
        return;
    }
    const tagName = elm.nodeName; // elm.tagName
    if (tagName === 'TEXTAREA') {
        (0,_scanTextAreaValue_function__WEBPACK_IMPORTED_MODULE_4__.scanTextAreaValue)(elm, context, ownerTag);
    }
    let diff = options.counts.added;
    diff = (0,_elementInitCheck__WEBPACK_IMPORTED_MODULE_1__.elementInitCheck)(elm, options.counts) - diff;
    if (elm.children) {
        /*
        const subCounts = {
          added: options.counts.added, // - diff,
          removed: options.counts.removed,
        }
        */
        new Array(...elm.children).forEach((child, index) => {
            const subOptions = {
                ...options,
                counts: options.counts,
            };
            return afterElmBuild(child, subOptions, context, ownerTag);
        });
    }
}


/***/ }),

/***/ "../main/ts/interpolations.ts":
/*!************************************!*\
  !*** ../main/ts/interpolations.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_162116__) => {

__nested_webpack_require_162116__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_162116__.d(__nested_webpack_exports__, {
/* harmony export */   interpolateReplace: () => (/* binding */ interpolateReplace),
/* harmony export */   interpolateToTemplates: () => (/* binding */ interpolateToTemplates)
/* harmony export */ });
// support arrow functions in attributes
const interpolateReplace = /(?:<[^>]*?(?:(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^>\s]+)))*\s*)\/?>)|({__tagvar[^}]+})/g;
/** replaces ${x} with <template id="x-start"></template><template id="x-end"></template> */
function interpolateToTemplates(template) {
    const keys = [];
    const string = template.replace(interpolateReplace, (match, expression) => {
        if (match.startsWith('<')) {
            // If the match is an HTML tag, don't replace
            return match;
        }
        const noBraces = expression.substring(1, expression.length - 1);
        const id = noBraces;
        keys.push(id);
        return `<template interpolate end id="${id}"></template>`;
    });
    return { string, keys };
}


/***/ }),

/***/ "../main/ts/isInstance.ts":
/*!********************************!*\
  !*** ../main/ts/isInstance.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_163432__) => {

__nested_webpack_require_163432__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_163432__.d(__nested_webpack_exports__, {
/* harmony export */   isSubjectInstance: () => (/* binding */ isSubjectInstance),
/* harmony export */   isTagArray: () => (/* binding */ isTagArray),
/* harmony export */   isTagComponent: () => (/* binding */ isTagComponent),
/* harmony export */   isTagInstance: () => (/* binding */ isTagInstance)
/* harmony export */ });
function isTagComponent(value) {
    return value?.isTemplater === true;
}
function isTagInstance(tag) {
    return tag?.isTag === true;
}
function isSubjectInstance(subject) {
    return (subject?.isSubject === true || subject?.subscribe) ? true : false; // subject?.isSubject === true || 
}
function isTagArray(value) {
    return value instanceof Array && value.every(x => isTagInstance(x));
}


/***/ }),

/***/ "../main/ts/isLikeTags.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/isLikeTags.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_164544__) => {

__nested_webpack_require_164544__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_164544__.d(__nested_webpack_exports__, {
/* harmony export */   isLikeTags: () => (/* binding */ isLikeTags)
/* harmony export */ });
function isLikeTags(tag0, tag1) {
    if (tag0.strings.length !== tag1.strings.length) {
        return false;
    }
    const everyStringMatched = tag0.strings.every((string, index) => tag1.strings[index] === string);
    if (!everyStringMatched) {
        return false;
    }
    const valuesLengthsMatch = tag0.values.length === tag1.values.length;
    if (!valuesLengthsMatch) {
        return false;
    }
    const allVarsMatch = tag1.values.every((value, index) => {
        const compareTo = tag0.values[index];
        const isFunctions = value instanceof Function && compareTo instanceof Function;
        if (isFunctions) {
            const stringMatch = value.toString() === compareTo.toString();
            if (stringMatch) {
                return true;
            }
            return false;
        }
        return true; // deepEqual(value, compareTo)
    });
    if (allVarsMatch) {
        return true;
    }
    return false;
}


/***/ }),

/***/ "../main/ts/onDestroy.ts":
/*!*******************************!*\
  !*** ../main/ts/onDestroy.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_165935__) => {

__nested_webpack_require_165935__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_165935__.d(__nested_webpack_exports__, {
/* harmony export */   onDestroy: () => (/* binding */ onDestroy)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_165935__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");

/** When undefined, it means a tag is being built for the first time so do run destroy(s) */
let destroyCurrentTagSupport;
function onDestroy(callback) {
    destroyCurrentTagSupport.templater.global.destroyCallback = callback;
}
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse)({
    beforeRender: tagSupport => destroyCurrentTagSupport = tagSupport,
    beforeRedraw: tagSupport => destroyCurrentTagSupport = tagSupport,
    beforeDestroy: (tagSupport, tag) => {
        const callback = tagSupport.templater.global.destroyCallback;
        if (callback) {
            callback();
        }
    }
});


/***/ }),

/***/ "../main/ts/onInit.ts":
/*!****************************!*\
  !*** ../main/ts/onInit.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_167125__) => {

__nested_webpack_require_167125__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_167125__.d(__nested_webpack_exports__, {
/* harmony export */   onInit: () => (/* binding */ onInit)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_167125__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");

function setCurrentTagSupport(support) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.initCurrentSupport = support;
}
function onInit(callback) {
    if (!_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.initCurrentSupport.memory.init) {
        _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.initCurrentSupport.memory.init = callback;
        callback(); // fire init
    }
}
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse)({
    beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
    beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
});


/***/ }),

/***/ "../main/ts/processAttribute.function.ts":
/*!***********************************************!*\
  !*** ../main/ts/processAttribute.function.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_168389__) => {

__nested_webpack_require_168389__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_168389__.d(__nested_webpack_exports__, {
/* harmony export */   processAttribute: () => (/* binding */ processAttribute)
/* harmony export */ });
/* harmony import */ var _inputAttribute__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_168389__(/*! ./inputAttribute */ "../main/ts/inputAttribute.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_168389__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_168389__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");



const startRegX = /^\s*{__tagvar/;
const endRegX = /}\s*$/;
function isTagVar(value) {
    return value && value.search(startRegX) >= 0 && value.search(endRegX) >= 0;
}
function processAttribute(attrName, value, child, scope, ownerTag, howToSet) {
    if (isTagVar(value)) {
        return processScopedNameValueAttr(attrName, value, child, scope, ownerTag, howToSet);
    }
    if (isTagVar(attrName)) {
        const contextValueSubject = getContextValueByVarString(scope, attrName);
        let lastValue;
        // the above callback gets called immediately since its a ValueSubject()
        const sub = contextValueSubject.subscribe((value) => {
            processNameOnlyAttr(value, lastValue, child, ownerTag, howToSet);
            lastValue = value;
        });
        ownerTag.cloneSubs.push(sub); // this is where unsubscribe is picked up
        child.removeAttribute(attrName);
        return;
    }
    // Non dynamic
    const isSpecial = isSpecialAttr(attrName);
    if (isSpecial) {
        return (0,_inputAttribute__WEBPACK_IMPORTED_MODULE_0__.inputAttribute)(attrName, value, child);
    }
}
function processScopedNameValueAttr(attrName, value, // {__tagVarN}
child, scope, ownerTag, howToSet) {
    // get the code inside the brackets like "variable0" or "{variable0}"
    const result = getContextValueByVarString(scope, value);
    return processNameValueAttr(attrName, result, child, ownerTag, howToSet);
}
function getContextValueByVarString(scope, value) {
    const code = value.replace('{', '').split('').reverse().join('').replace('}', '').split('').reverse().join('');
    return scope[code];
}
function processNameOnlyAttr(attrValue, lastValue, child, ownerTag, howToSet) {
    if (lastValue && lastValue != attrValue) {
        if (typeof (lastValue) === 'string') {
            child.removeAttribute(lastValue);
        }
        else if (lastValue instanceof Object) {
            Object.entries(lastValue).forEach(([name]) => child.removeAttribute(name));
        }
    }
    if (typeof (attrValue) === 'string') {
        if (!attrValue.length) {
            return;
        }
        processNameValueAttr(attrValue, '', child, ownerTag, howToSet);
        return;
    }
    if (attrValue instanceof Object) {
        Object.entries(attrValue).forEach(([name, value]) => processNameValueAttr(name, value, child, ownerTag, howToSet));
        return;
    }
}
function processNameValueAttr(attrName, result, child, ownerTag, howToSet) {
    const isSpecial = isSpecialAttr(attrName);
    // attach as callback?
    if (result instanceof Function) {
        const action = function (...args) {
            const result2 = result(child, args);
            return result2;
        };
        child[attrName].action = action;
        // child.addEventListener(attrName, action)
    }
    // Most every variable comes in here since everything is made a ValueSubject
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isSubjectInstance)(result)) {
        child.removeAttribute(attrName);
        const callback = (newAttrValue) => {
            if (newAttrValue instanceof Function) {
                newAttrValue = (0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__.bindSubjectCallback)(newAttrValue, ownerTag);
            }
            return processAttributeSubjectValue(newAttrValue, child, attrName, isSpecial, howToSet);
        };
        // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
        const sub = result.subscribe(callback);
        // Record subscription for later unsubscribe when element destroyed
        ownerTag.cloneSubs.push(sub);
        return;
    }
    howToSet(child, attrName, result);
    // child.setAttribute(attrName, result.value)
    return;
}
function processAttributeSubjectValue(newAttrValue, child, attrName, isSpecial, howToSet) {
    if (newAttrValue instanceof Function) {
        const fun = function (...args) {
            return newAttrValue(child, args);
        };
        // access to original function
        fun.tagFunction = newAttrValue;
        child[attrName] = fun;
        return;
    }
    if (isSpecial) {
        (0,_inputAttribute__WEBPACK_IMPORTED_MODULE_0__.inputAttribute)(attrName, newAttrValue, child);
        return;
    }
    if (newAttrValue) {
        howToSet(child, attrName, newAttrValue);
        return;
    }
    const isDeadValue = newAttrValue === undefined || newAttrValue === false || newAttrValue === null;
    if (isDeadValue) {
        child.removeAttribute(attrName);
        return;
    }
    // value is 0
    howToSet(child, attrName, newAttrValue);
}
/** Looking for (class | style) followed by a period */
function isSpecialAttr(attrName) {
    return attrName.search(/^(class|style)(\.)/) >= 0;
}


/***/ }),

/***/ "../main/ts/processNewValue.function.ts":
/*!**********************************************!*\
  !*** ../main/ts/processNewValue.function.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_174149__) => {

__nested_webpack_require_174149__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_174149__.d(__nested_webpack_exports__, {
/* harmony export */   processNewValue: () => (/* binding */ processNewValue)
/* harmony export */ });
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_174149__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_174149__(/*! ./isInstance */ "../main/ts/isInstance.ts");


function processNewValue(hasValue, value, ownerTag) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value)) {
        const tagSubject = new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
        return tagSubject;
    }
    if (value instanceof Function) {
        // return getSubjectFunction(value, ownerTag)
        return new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
    }
    if (!hasValue) {
        return; // more strings than values, stop here
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(value)) {
        value.ownerTag = ownerTag;
        if (ownerTag.childTags.find(x => x === value)) {
            throw new Error('about to reattach tag already present - 2');
        }
        return new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isSubjectInstance)(value)) {
        return value; // its already a value subject
    }
    return new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
}


/***/ }),

/***/ "../main/ts/processRegularValue.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/processRegularValue.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_176042__) => {

__nested_webpack_require_176042__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_176042__.d(__nested_webpack_exports__, {
/* harmony export */   processRegularValue: () => (/* binding */ processRegularValue)
/* harmony export */ });
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_176042__(/*! ./interpolateTemplate */ "../main/ts/interpolateTemplate.ts");

function processRegularValue(value, subject, // could be tag via subject.tag
template) {
    subject.template = template;
    const before = subject.clone || template; // Either the template is on the doc OR its the first element we last put on doc
    if (subject.lastValue === value) {
        return; // no need to update display, its the same
    }
    subject.lastValue = value;
    // Processing of regular values
    const clone = (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__.updateBetweenTemplates)(value, before);
    subject.clone = clone; // remember single element put down, for future updates
}


/***/ }),

/***/ "../main/ts/processSubjectComponent.function.ts":
/*!******************************************************!*\
  !*** ../main/ts/processSubjectComponent.function.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_177373__) => {

__nested_webpack_require_177373__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_177373__.d(__nested_webpack_exports__, {
/* harmony export */   processSubjectComponent: () => (/* binding */ processSubjectComponent)
/* harmony export */ });
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_177373__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_177373__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _processTagResult_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_177373__(/*! ./processTagResult.function */ "../main/ts/processTagResult.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_177373__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");




function processSubjectComponent(templater, subject, template, ownerTag, options) {
    // Check if function component is wrapped in a tag() call
    // TODO: This below check not needed in production mode
    if (templater.tagged !== true) {
        const original = templater.wrapper.original;
        let name = original.name || original.constructor?.name;
        if (name === 'Function') {
            name = undefined;
        }
        const label = name || original.toString().substring(0, 120);
        const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`);
        throw error;
    }
    templater.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__.TagSupport(ownerTag.tagSupport, templater, subject);
    // templater.oldest = subject.tag?.tagSupport.oldest || templater.oldest
    templater.global.insertBefore = template;
    let retag = subject.tag;
    const providers = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
    providers.ownerTag = ownerTag;
    const isRedraw = !retag || options.forceElement;
    if (isRedraw) {
        const preClones = ownerTag.clones.map(clone => clone);
        retag = (0,_TemplaterResult_class__WEBPACK_IMPORTED_MODULE_0__.renderWithSupport)(templater.tagSupport, subject.tag, // existing tag
        subject, ownerTag);
        if (retag.tagSupport.templater.global.newest != retag) {
            throw new Error('mismatch result newest');
        }
        templater.global.newest = retag;
        if (ownerTag.clones.length > preClones.length) {
            const myClones = ownerTag.clones.filter(fClone => !preClones.find(clone => clone === fClone));
            retag.clones.push(...myClones);
        }
        if (ownerTag.childTags.find(x => x === retag)) {
            throw new Error('about to reattach tag already present');
        }
        ownerTag.childTags.push(retag);
    }
    (0,_processTagResult_function__WEBPACK_IMPORTED_MODULE_2__.processTagResult)(retag, subject, // The element set here will be removed from document. Also result.tag will be added in here
    template, // <template end interpolate /> (will be removed)
    options);
}


/***/ }),

/***/ "../main/ts/processSubjectValue.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/processSubjectValue.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_180821__) => {

__nested_webpack_require_180821__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_180821__.d(__nested_webpack_exports__, {
/* harmony export */   applyFakeTemplater: () => (/* binding */ applyFakeTemplater),
/* harmony export */   processSubjectValue: () => (/* binding */ processSubjectValue),
/* harmony export */   processTag: () => (/* binding */ processTag)
/* harmony export */ });
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_180821__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_180821__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _processTagArray__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_180821__(/*! ./processTagArray */ "../main/ts/processTagArray.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_180821__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_180821__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_180821__(/*! ./processRegularValue.function */ "../main/ts/processRegularValue.function.ts");






var ValueTypes;
(function (ValueTypes) {
    ValueTypes["tag"] = "tag";
    ValueTypes["tagArray"] = "tag-array";
    ValueTypes["tagComponent"] = "tag-component";
    ValueTypes["value"] = "value";
})(ValueTypes || (ValueTypes = {}));
function getValueType(value) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value)) {
        return ValueTypes.tagComponent;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(value)) {
        return ValueTypes.tag;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagArray)(value)) {
        return ValueTypes.tagArray;
    }
    return ValueTypes.value;
}
function processSubjectValue(value, subject, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
ownerTag, // owner
options) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.tag:
            processTag(value, subject, template, ownerTag);
            return;
        case ValueTypes.tagArray:
            return (0,_processTagArray__WEBPACK_IMPORTED_MODULE_2__.processTagArray)(subject, value, template, ownerTag, options);
        case ValueTypes.tagComponent:
            (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_0__.processSubjectComponent)(value, subject, template, ownerTag, options);
            return;
    }
    (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, template);
}
/** Could be a regular tag or a component. Both are Tag.class */
function processTag(tag, subject, // could be tag via result.tag
insertBefore, // <template end interpolate /> (will be removed)
ownerTag) {
    // first time seeing this tag?
    if (!tag.tagSupport) {
        if (!(0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(tag)) {
            throw new Error('issue non-tag here');
        }
        applyFakeTemplater(tag, ownerTag, subject);
        if (ownerTag.childTags.find(x => x === tag)) {
            throw new Error('about to reattach tag already present - 5');
        }
        ownerTag.childTags.push(tag);
    }
    tag.ownerTag = ownerTag;
    subject.template = insertBefore;
    tag.buildBeforeElement(insertBefore, {
        counts: { added: 0, removed: 0 },
        forceElement: true, test: false,
    });
}
function applyFakeTemplater(tag, ownerTag, subject) {
    if (!ownerTag) {
        throw new Error('no owner error');
    }
    const fakeTemplater = getFakeTemplater();
    tag.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__.TagSupport(ownerTag.tagSupport, fakeTemplater, // the template is provided via html`` call
    subject);
    fakeTemplater.global.oldest = tag;
    fakeTemplater.global.newest = tag;
    fakeTemplater.tagSupport = tag.tagSupport;
    // asking me to render will cause my parent to render
    tag.ownerTag = ownerTag;
}
function getFakeTemplater() {
    return {
        global: {
            renderCount: 0,
            providers: [],
            context: {},
        },
        children: new _ValueSubject__WEBPACK_IMPORTED_MODULE_4__.ValueSubject([]), // no children
        props: {},
        isTag: true,
    };
}


/***/ }),

/***/ "../main/ts/processTagArray.ts":
/*!*************************************!*\
  !*** ../main/ts/processTagArray.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_185639__) => {

__nested_webpack_require_185639__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_185639__.d(__nested_webpack_exports__, {
/* harmony export */   processTagArray: () => (/* binding */ processTagArray)
/* harmony export */ });
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_185639__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_185639__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_185639__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");
/* harmony import */ var _processSubjectValue_function__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_185639__(/*! ./processSubjectValue.function */ "../main/ts/processSubjectValue.function.ts");




function processTagArray(subject, value, // arry of Tag classes
template, // <template end interpolate />
ownerTag, options) {
    const clones = ownerTag.clones; // []
    let lastArray = subject.lastArray = subject.lastArray || [];
    subject.template = template;
    let removed = 0;
    /** 🗑️ remove previous items first */
    lastArray = subject.lastArray = subject.lastArray.filter((item, index) => {
        const newLength = value.length - 1;
        const at = index - removed;
        const lessLength = newLength < at;
        const subTag = value[index - removed];
        const subArrayValue = subTag?.arrayValue;
        const destroyItem = lessLength || !areLikeValues(subArrayValue, item.tag.arrayValue);
        if (destroyItem) {
            const last = lastArray[index];
            const tag = last.tag;
            (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_2__.destroyArrayTag)(tag, options.counts);
            last.deleted = true;
            ++removed;
            ++options.counts.removed;
            return false;
        }
        return true;
    });
    // const masterBefore = template || (template as any).clone
    const before = template || subject.value.insertBefore || template.clone;
    value.forEach((subTag, index) => {
        const previous = lastArray[index];
        const previousSupport = previous?.tag.tagSupport;
        const fakeSubject = new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject({});
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_3__.applyFakeTemplater)(subTag, ownerTag, fakeSubject);
        if (previousSupport) {
            subTag.tagSupport.templater.global = previousSupport.templater.global;
            previousSupport.templater.global.newest = subTag;
        }
        // check for html``.key()
        const keyNotSet = subTag.arrayValue;
        if (keyNotSet?.isArrayValueNeverSet) {
            const details = {
                template: subTag.getTemplate().string,
                array: value,
                ownerTagContent: ownerTag.lastTemplateString,
            };
            const message = 'Use html`...`.key(item) instead of html`...` to template an Array';
            console.error(message, details);
            const err = new _errors__WEBPACK_IMPORTED_MODULE_1__.ArrayNoKeyError(message, details);
            throw err;
        }
        const couldBeSame = lastArray.length > index;
        if (couldBeSame) {
            const isSame = areLikeValues(previous.tag.arrayValue, subTag.arrayValue);
            if (isSame) {
                subTag.tagSupport = subTag.tagSupport || previous.tag.tagSupport;
                const oldest = previous.tag.tagSupport.templater.global.oldest;
                oldest.updateByTag(subTag);
                return [];
            }
            processAddTagArrayItem(before, subTag, index, options, lastArray, true);
            throw new Error('item should be back');
            // return [] // removed: item should have been previously deleted and will be added back
        }
        processAddTagArrayItem(before, subTag, index, options, lastArray, true);
        ownerTag.childTags.push(subTag);
    });
    return clones;
}
function processAddTagArrayItem(before, subTag, index, options, lastArray, test) {
    const lastValue = {
        tag: subTag, index
    };
    // Added to previous array
    lastArray.push(lastValue);
    const counts = {
        added: options.counts.added + index,
        removed: options.counts.removed,
    };
    const lastFirstChild = before; // tag.clones[0] // insertBefore.lastFirstChild    
    if (!lastFirstChild.parentNode) {
        throw new Error('issue adding array item');
    }
    subTag.buildBeforeElement(lastFirstChild, { counts, forceElement: options.forceElement, test });
}
/** compare two values. If both values are arrays then the items will be compared */
function areLikeValues(valueA, valueB) {
    if (valueA === valueB) {
        return true;
    }
    const bothArrays = valueA instanceof Array && valueB instanceof Array;
    const matchLengths = bothArrays && valueA.length == valueB.length;
    if (matchLengths) {
        return valueA.every((item, index) => item == valueB[index]);
    }
    return false;
}


/***/ }),

/***/ "../main/ts/processTagResult.function.ts":
/*!***********************************************!*\
  !*** ../main/ts/processTagResult.function.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_191076__) => {

__nested_webpack_require_191076__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_191076__.d(__nested_webpack_exports__, {
/* harmony export */   processTagResult: () => (/* binding */ processTagResult)
/* harmony export */ });
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_191076__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");

function processTagResult(tag, subject, // used for recording past and current value
insertBefore, // <template end interpolate />
{ counts, forceElement, }) {
    if (!insertBefore.parentNode) {
        throw new Error('before here processTagResult');
    }
    // *if appears we already have seen
    const subjectTag = subject;
    const existingTag = subjectTag.tag;
    const previousTag = existingTag?.tagSupport.templater.global.oldest || undefined; // || tag.tagSupport.oldest // subjectTag.tag
    const justUpdate = previousTag; // && !forceElement
    if (previousTag) {
        if (justUpdate) {
            const areLike = previousTag.isLikeTag(tag);
            // are we just updating an if we already had?
            if (areLike) {
                // components
                if (subject instanceof Function) {
                    const newTag = subject(previousTag.tagSupport);
                    previousTag.updateByTag(newTag);
                    if (!newTag.tagSupport.templater.global.oldest) {
                        throw new Error('maybe 0');
                    }
                    subjectTag.tag = newTag;
                    if (!newTag.hasLiveElements) {
                        throw new Error('44444 - 2');
                    }
                    return;
                }
                previousTag.updateByTag(tag);
                if (!tag.tagSupport.templater.global.oldest) {
                    throw new Error('maybe 1');
                }
                subjectTag.tag = tag;
                if (!tag.hasLiveElements) {
                    throw new Error('44444 - 3');
                }
                return;
            }
            (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_0__.destroyTagMemory)(previousTag, subject);
            throw new Error('585 - think we never get here');
        }
    }
    tag.buildBeforeElement(insertBefore, {
        counts,
        forceElement, test: false,
    });
}


/***/ }),

/***/ "../main/ts/provider.utils.ts":
/*!************************************!*\
  !*** ../main/ts/provider.utils.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_193677__) => {

__nested_webpack_require_193677__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_193677__.d(__nested_webpack_exports__, {
/* harmony export */   providersChangeCheck: () => (/* binding */ providersChangeCheck)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_193677__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_193677__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");


function providersChangeCheck(tag) {
    const global = tag.tagSupport.templater.global;
    const providersWithChanges = global.providers.filter(provider => !(0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)(provider.instance, provider.clone));
    // reset clones
    providersWithChanges.forEach(provider => {
        const appElement = tag.getAppElement();
        handleProviderChanges(appElement, provider);
        provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(provider.instance);
    });
}
function handleProviderChanges(appElement, provider) {
    const tagsWithProvider = getTagsWithProvider(appElement, provider);
    tagsWithProvider.forEach(({ tag, renderCount, provider }) => {
        if (tag.tagSupport.templater.global.deleted) {
            return; // i was deleted after another tag processed
        }
        const notRendered = renderCount === tag.tagSupport.templater.global.renderCount;
        if (notRendered) {
            provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(provider.instance);
            (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_1__.renderTagSupport)(tag.tagSupport, false);
        }
    });
}
function getTagsWithProvider(tag, provider, memory = []) {
    const global = tag.tagSupport.templater.global;
    const compare = global.providers;
    const hasProvider = compare.find(xProvider => xProvider.constructMethod === provider.constructMethod);
    if (hasProvider) {
        memory.push({
            tag,
            renderCount: global.renderCount,
            provider: hasProvider,
        });
    }
    tag.childTags.forEach(child => getTagsWithProvider(child, provider, memory));
    memory.forEach(({ tag }) => {
        if (tag.tagSupport.templater.global.deleted) {
            throw new Error('do not get here - 0');
        }
    });
    return memory;
}


/***/ }),

/***/ "../main/ts/providers.ts":
/*!*******************************!*\
  !*** ../main/ts/providers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_196360__) => {

__nested_webpack_require_196360__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_196360__.d(__nested_webpack_exports__, {
/* harmony export */   providers: () => (/* binding */ providers)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_196360__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_196360__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


// TODO: rename
_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig = {
    providers: [],
    //currentTagSupport: undefined as TagSupport | undefined,
    ownerTag: undefined,
};
function get(constructMethod) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
    const providers = config.providers;
    return providers.find(provider => provider.constructMethod === constructMethod);
}
const providers = {
    create: (constructMethod) => {
        const existing = get(constructMethod);
        if (existing) {
            existing.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(existing.instance);
            return existing.instance;
        }
        // Providers with provider requirements just need to use providers.create() and providers.inject()
        const instance = constructMethod.constructor ? new constructMethod() : constructMethod();
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        config.providers.push({
            constructMethod,
            instance,
            clone: (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(instance)
        });
        return instance;
    },
    /**
     * @template T
     * @param {(new (...args: any[]) => T) | () => T} constructor
     * @returns {T}
     */
    inject: (constructor) => {
        const oldValue = get(constructor);
        if (oldValue) {
            return oldValue.instance;
        }
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        let owner = {
            ownerTag: config.ownerTag
        };
        while (owner.ownerTag) {
            const ownerProviders = owner.ownerTag.tagSupport.templater.global.providers;
            const provider = ownerProviders.find(provider => {
                if (provider.constructMethod === constructor) {
                    return true;
                }
            });
            if (provider) {
                provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(provider.instance); // keep a copy of the latest before any change occur
                config.providers.push(provider);
                return provider.instance;
            }
            owner = owner.ownerTag; // cause reloop
        }
        const msg = `Could not inject provider: ${constructor.name} ${constructor}`;
        console.warn(`${msg}. Available providers`, config.providers);
        throw new Error(msg);
    }
};
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse)({
    beforeRender: (tagSupport, ownerTag) => {
        run(tagSupport, ownerTag);
    },
    beforeRedraw: (tagSupport, tag) => {
        run(tagSupport, tag.ownerTag);
    },
    afterRender: (tagSupport) => {
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        tagSupport.templater.global.providers = [...config.providers];
        config.providers.length = 0;
    }
});
function run(tagSupport, ownerTag) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
    // config.currentTagSupport = tagSupport
    config.ownerTag = ownerTag;
    if (tagSupport.templater.global.providers.length) {
        config.providers.length = 0;
        config.providers.push(...tagSupport.templater.global.providers);
    }
}


/***/ }),

/***/ "../main/ts/render.ts":
/*!****************************!*\
  !*** ../main/ts/render.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_200519__) => {

__nested_webpack_require_200519__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_200519__.d(__nested_webpack_exports__, {
/* harmony export */   buildClones: () => (/* binding */ buildClones)
/* harmony export */ });
function buildClones(temporary, insertBefore) {
    const clones = [];
    const template = temporary.children[0];
    let nextSibling = template.content.firstChild;
    while (nextSibling) {
        const nextNextSibling = nextSibling.nextSibling;
        buildSibling(nextSibling, insertBefore);
        clones.push(nextSibling);
        nextSibling = nextNextSibling;
    }
    return clones;
}
function buildSibling(nextSibling, insertBefore) {
    const parentNode = insertBefore.parentNode;
    parentNode.insertBefore(nextSibling, insertBefore);
}


/***/ }),

/***/ "../main/ts/renderExistingTag.function.ts":
/*!************************************************!*\
  !*** ../main/ts/renderExistingTag.function.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_201584__) => {

__nested_webpack_require_201584__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_201584__.d(__nested_webpack_exports__, {
/* harmony export */   renderExistingTag: () => (/* binding */ renderExistingTag)
/* harmony export */ });
/* harmony import */ var _provider_utils__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_201584__(/*! ./provider.utils */ "../main/ts/provider.utils.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_201584__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_201584__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");



/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
function renderExistingTag(oldestTag, // existing tag already there
newTemplater, tagSupport, subject) {
    newTemplater.global = subject.tag.tagSupport.templater.global;
    if (!oldestTag.hasLiveElements) {
        throw new Error('1080 - should have live elements');
    }
    const preRenderCount = tagSupport.templater.global.renderCount;
    (0,_provider_utils__WEBPACK_IMPORTED_MODULE_0__.providersChangeCheck)(oldestTag);
    // When the providers were checked, a render to myself occurred and I do not need to re-render again
    const latestTag = tagSupport.templater.global.newest;
    if (preRenderCount !== tagSupport.templater.global.renderCount) {
        oldestTag.updateByTag(latestTag);
        return latestTag;
    }
    const oldTemplater = tagSupport.templater || newTemplater;
    const redraw = (0,_TemplaterResult_class__WEBPACK_IMPORTED_MODULE_1__.renderWithSupport)(newTemplater.tagSupport, subject.tag || oldTemplater.global.newest || oldTemplater.global.oldest, // hmmmmmm, why not newest?
    subject, oldestTag.ownerTag);
    const oldest = tagSupport.templater.global.oldest || oldestTag;
    redraw.tagSupport.templater.global.oldest = oldest;
    if ((0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__.isLikeTags)(latestTag, redraw)) {
        subject.tag = redraw;
        oldest.updateByTag(redraw);
    }
    return redraw;
}


/***/ }),

/***/ "../main/ts/renderTagSupport.function.ts":
/*!***********************************************!*\
  !*** ../main/ts/renderTagSupport.function.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_204058__) => {

__nested_webpack_require_204058__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_204058__.d(__nested_webpack_exports__, {
/* harmony export */   renderTagSupport: () => (/* binding */ renderTagSupport)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_204058__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_204058__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _renderExistingTag_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_204058__(/*! ./renderExistingTag.function */ "../main/ts/renderExistingTag.function.ts");



/** Main function used by all other callers to render/update display of a tag component */
function renderTagSupport(tagSupport, renderUp) {
    const global = tagSupport.templater.global;
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(tagSupport.templater)) {
        const newTag = global.newest;
        const ownerTag = newTag.ownerTag;
        ++global.renderCount;
        return renderTagSupport(ownerTag.tagSupport, true);
    }
    // const oldTagSetup = this
    const subject = tagSupport.subject;
    const templater = tagSupport.templater; // oldTagSetup.templater // templater
    const subjectTag = subject.tag;
    const newest = subjectTag?.tagSupport.templater.global.newest;
    let ownerTag;
    let selfPropChange = false;
    const shouldRenderUp = renderUp && newest;
    if (shouldRenderUp) {
        ownerTag = newest.ownerTag;
        if (ownerTag) {
            const nowProps = templater.props;
            const latestProps = newest.tagSupport.propsConfig.latestCloned;
            selfPropChange = !(0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)(nowProps, latestProps);
        }
    }
    const useTagSupport = global.newest?.tagSupport; // oldTagSetup
    if (!templater.global.oldest) {
        throw new Error('already causing trouble');
    }
    const tag = (0,_renderExistingTag_function__WEBPACK_IMPORTED_MODULE_2__.renderExistingTag)(templater.global.oldest, templater, useTagSupport, subject);
    const renderOwner = ownerTag && selfPropChange;
    if (renderOwner) {
        const ownerTagSupport = ownerTag.tagSupport;
        renderTagSupport(ownerTagSupport, true);
        return tag;
    }
    return tag;
}


/***/ }),

/***/ "../main/ts/scanTextAreaValue.function.ts":
/*!************************************************!*\
  !*** ../main/ts/scanTextAreaValue.function.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_206735__) => {

__nested_webpack_require_206735__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_206735__.d(__nested_webpack_exports__, {
/* harmony export */   scanTextAreaValue: () => (/* binding */ scanTextAreaValue)
/* harmony export */ });
/* harmony import */ var _processAttribute_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_206735__(/*! ./processAttribute.function */ "../main/ts/processAttribute.function.ts");

const search = new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');
function scanTextAreaValue(textarea, context, ownerTag) {
    const value = textarea.value;
    if (value.search(search) >= 0) {
        const match = value.match(/__tagvar(\d{1,4})/);
        const token = match ? match[0] : '';
        const dynamic = '{' + token + '}';
        textarea.value = '';
        textarea.setAttribute('text-var-value', dynamic);
        const howToSet = (_elm, _name, value) => textarea.value = value;
        (0,_processAttribute_function__WEBPACK_IMPORTED_MODULE_0__.processAttribute)('text-var-value', dynamic, // realValue, // context[token].value,
        textarea, context, ownerTag, howToSet);
    }
}


/***/ }),

/***/ "../main/ts/set.function.ts":
/*!**********************************!*\
  !*** ../main/ts/set.function.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_208133__) => {

__nested_webpack_require_208133__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_208133__.d(__nested_webpack_exports__, {
/* harmony export */   StateEchoBack: () => (/* binding */ StateEchoBack),
/* harmony export */   getStateValue: () => (/* binding */ getStateValue),
/* harmony export */   set: () => (/* binding */ set)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_208133__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_208133__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


// TODO: rename
_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig = {
    array: [], // state memory on the first render
    // rearray: [] as StateConfigArray, // state memory to be used before the next render
};
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse)({
    beforeRender: (tagSupport) => initState(tagSupport),
    beforeRedraw: (tagSupport) => initState(tagSupport),
    afterRender: (tagSupport) => {
        const state = tagSupport.memory.state;
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
        const rearray = config.rearray;
        if (rearray.length) {
            if (rearray.length !== config.array.length) {
                const message = `States lengths has changed ${rearray.length} !== ${config.array.length}. Typically occurs when a function is intended to be wrapped with a tag() call`;
                const details = {
                    oldStates: config.array,
                    newStates: config.rearray,
                    component: tagSupport.templater?.wrapper.original,
                };
                const error = new _errors__WEBPACK_IMPORTED_MODULE_0__.StateMismatchError(message, details);
                console.warn(message, details);
                throw error;
            }
        }
        delete config.rearray; // clean up any previous runs
        state.newest = config.array; // [...config.array]
        state.newest.forEach(item => item.lastValue = getStateValue(item)); // set last values
        config.array = [];
    }
});
function getStateValue(
// state: StateConfig,
state) {
    const callback = state.callback;
    if (!callback) {
        return state.defaultValue;
    }
    const oldState = callback(StateEchoBack); // get value and set to undefined
    const [oldValue] = oldState;
    const [checkValue] = callback(oldValue); // set back to original value
    if (checkValue !== StateEchoBack) {
        const message = 'State property not used correctly. Second item in array is not setting value as expected.\n\n' +
            'For "let" state use `let name = state(default)(x => [name, name = x])`\n\n' +
            'For "const" state use `const name = state(default)()`\n\n' +
            'Problem state:\n' + (callback ? callback.toString() : JSON.stringify(state)) + '\n';
        console.error(message, { state, callback, oldState, oldValue, checkValue });
        throw new Error(message);
    }
    // state.lastValue = oldValue
    return oldValue;
}
class StateEchoBack {
}
function initState(tagSupport) {
    const state = tagSupport.memory.state;
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    // TODO: This guard may no longer be needed
    if (config.rearray) {
        const message = 'last state not cleared. Possibly in the middle of rendering one component and another is trying to render';
        console.error(message, {
            config,
            component: tagSupport.templater?.wrapper.original,
            wasInMiddleOf: config.tagSupport?.templater.wrapper.original,
            state,
            expectedClearArray: config.rearray,
        });
        throw new _errors__WEBPACK_IMPORTED_MODULE_0__.StateMismatchError(message, {
            config,
            component: tagSupport.templater?.wrapper.original,
            state,
            expectedClearArray: config.rearray,
        });
    }
    // TODO: this maybe redundant and not needed
    config.rearray = []; // .length = 0
    if (state?.newest.length) {
        state.newest.map(state => getStateValue(state));
        config.rearray.push(...state.newest);
    }
    config.tagSupport = tagSupport;
}
/** Used for variables that need to remain the same variable during render passes */
function set(defaultValue) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    let getSetMethod;
    const rearray = config.rearray;
    const restate = rearray[config.array.length];
    if (restate) {
        let oldValue = getStateValue(restate);
        getSetMethod = ((x) => [oldValue, oldValue = x]);
        const push = {
            get: () => getStateValue(push),
            callback: getSetMethod,
            lastValue: oldValue,
            defaultValue: restate.defaultValue,
        };
        config.array.push(push);
        return oldValue;
    }
    // State first time run
    const defaultFn = defaultValue instanceof Function ? defaultValue : () => defaultValue;
    let initValue = defaultFn();
    getSetMethod = ((x) => [initValue, initValue = x]);
    const push = {
        get: () => getStateValue(push),
        callback: getSetMethod,
        lastValue: initValue,
        defaultValue: initValue,
    };
    config.array.push(push);
    return initValue;
}


/***/ }),

/***/ "../main/ts/setLet.function.ts":
/*!*************************************!*\
  !*** ../main/ts/setLet.function.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_213848__) => {

__nested_webpack_require_213848__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_213848__.d(__nested_webpack_exports__, {
/* harmony export */   setLet: () => (/* binding */ setLet)
/* harmony export */ });
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_213848__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_213848__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


/** Used for variables that need to remain the same variable during render passes */
function setLet(defaultValue) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    const rearray = config.rearray;
    let getSetMethod;
    const restate = rearray[config.array.length];
    if (restate) {
        let oldValue = (0,_set_function__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(restate);
        getSetMethod = ((x) => [oldValue, oldValue = x]);
        const push = {
            get: () => (0,_set_function__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
            callback: getSetMethod,
            lastValue: oldValue,
            defaultValue: restate.defaultValue,
        };
        config.array.push(push);
        return makeStateResult(oldValue, push);
    }
    // State first time run
    const defaultFn = defaultValue instanceof Function ? defaultValue : () => defaultValue;
    let initValue = defaultFn();
    getSetMethod = ((x) => [initValue, initValue = x]);
    const push = {
        get: () => (0,_set_function__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
        callback: getSetMethod,
        lastValue: initValue,
        defaultValue: initValue,
    };
    config.array.push(push);
    return makeStateResult(initValue, push);
}
function makeStateResult(initValue, push) {
    // return initValue
    const result = (y) => {
        push.callback = y || (x => [initValue, initValue = x]);
        return initValue;
    };
    return result;
}


/***/ }),

/***/ "../main/ts/setProp.function.ts":
/*!**************************************!*\
  !*** ../main/ts/setProp.function.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_216129__) => {

__nested_webpack_require_216129__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_216129__.d(__nested_webpack_exports__, {
/* harmony export */   setProp: () => (/* binding */ setProp)
/* harmony export */ });
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_216129__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_216129__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


/** Used for variables that need to remain the same variable during render passes */
function setProp(getSet) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    const rearray = config.rearray;
    const [propValue] = getSet(undefined);
    getSet(propValue); // restore original value instead of undefined
    const restate = rearray[config.array.length];
    if (restate) {
        let watchValue = restate.watch;
        let oldValue = (0,_set_function__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(restate);
        const push = {
            get: () => (0,_set_function__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
            callback: getSet,
            lastValue: oldValue,
            watch: restate.watch,
        };
        // has the prop value changed?
        if (propValue != watchValue) {
            push.watch = propValue;
            oldValue = push.lastValue = propValue;
        }
        config.array.push(push);
        getSet(oldValue);
        return oldValue;
    }
    const push = {
        get: () => (0,_set_function__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
        callback: getSet,
        lastValue: propValue,
        watch: propValue,
    };
    config.array.push(push);
    return propValue;
}


/***/ }),

/***/ "../main/ts/setUse.function.ts":
/*!*************************************!*\
  !*** ../main/ts/setUse.function.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_218175__) => {

__nested_webpack_require_218175__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_218175__.d(__nested_webpack_exports__, {
/* harmony export */   setUse: () => (/* binding */ setUse)
/* harmony export */ });
const tagUse = [];
function setUse(use) {
    // must provide defaults
    const useMe = {
        beforeRender: use.beforeRender || (() => undefined),
        beforeRedraw: use.beforeRedraw || (() => undefined),
        afterRender: use.afterRender || (() => undefined),
        beforeDestroy: use.beforeDestroy || (() => undefined),
    };
    setUse.tagUse.push(useMe);
}
setUse.tagUse = tagUse;
setUse.memory = {};


/***/ }),

/***/ "../main/ts/tag.ts":
/*!*************************!*\
  !*** ../main/ts/tag.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_219002__) => {

__nested_webpack_require_219002__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_219002__.d(__nested_webpack_exports__, {
/* harmony export */   tag: () => (/* binding */ tag),
/* harmony export */   tags: () => (/* binding */ tags)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_219002__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_219002__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_219002__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_219002__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_219002__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_219002__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_219002__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _alterProps_function__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_219002__(/*! ./alterProps.function */ "../main/ts/alterProps.function.ts");








const tags = [];
let tagCount = 0;
/** Wraps a tag component in a state manager and always push children to last argument as an array */
// export function tag<T>(a: T): T;
function tag(tagComponent) {
    const result = (function tagWrapper(props, children) {
        const isPropTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagInstance)(props) || (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(props);
        if (isPropTag) {
            children = props;
            props = undefined;
        }
        const { childSubject, madeSubject } = kidsToTagArraySubject(children);
        childSubject.isChildSubject = true;
        const templater = new _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__.TemplaterResult(props, childSubject);
        const innerTagWrap = getTagWrap(templater, madeSubject);
        innerTagWrap.original = tagComponent;
        templater.tagged = true;
        templater.wrapper = innerTagWrap;
        return templater;
    }); // we override the function provided and pretend original is what's returned
    updateResult(result, tagComponent);
    // group tags together and have hmr pickup
    updateComponent(tagComponent);
    tags.push(tagComponent);
    return result;
}
function kidsToTagArraySubject(children) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isSubjectInstance)(children)) {
        return { childSubject: children, madeSubject: false };
    }
    const kidArray = children;
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(kidArray)) {
        return { childSubject: new _ValueSubject__WEBPACK_IMPORTED_MODULE_3__.ValueSubject(children), madeSubject: true };
    }
    const kid = children;
    if (kid) {
        kid.arrayValue = 0;
        return { childSubject: new _ValueSubject__WEBPACK_IMPORTED_MODULE_3__.ValueSubject([kid]), madeSubject: true };
    }
    return {
        childSubject: new _ValueSubject__WEBPACK_IMPORTED_MODULE_3__.ValueSubject([]),
        madeSubject: true
    };
}
function updateResult(result, tagComponent) {
    result.isTag = true;
    result.original = tagComponent;
}
function updateComponent(tagComponent) {
    tagComponent.tags = tags;
    tagComponent.setUse = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse;
    tagComponent.tagIndex = tagCount++; // needed for things like HMR
}
/** creates/returns a function that when called then calls the original component function */
function getTagWrap(templater, madeSubject) {
    const innerTagWrap = function (oldTagSetup, subject) {
        const global = oldTagSetup.templater.global;
        global.newestTemplater = templater;
        ++global.renderCount;
        templater.global = global;
        const childSubject = templater.children;
        const lastArray = global.oldest?.tagSupport.templater.children.lastArray;
        if (lastArray) {
            childSubject.lastArray = lastArray;
        }
        const originalFunction = innerTagWrap.original;
        // const oldTagSetup = templater.tagSupport
        const oldest = templater.global.oldest;
        if (oldest && !oldest.hasLiveElements) {
            throw new Error('issue already 22');
        }
        let props = templater.props;
        const ownerTagSupport = oldTagSetup.ownerTagSupport;
        const oldTemplater = ownerTagSupport?.templater;
        const oldLatest = oldTemplater?.global.newest;
        const newestOwnerTemplater = oldLatest?.tagSupport.templater;
        if (oldLatest && !newestOwnerTemplater) {
            throw new Error('what to do here?');
        }
        let castedProps = (0,_alterProps_function__WEBPACK_IMPORTED_MODULE_7__.alterProps)(props, newestOwnerTemplater, oldTagSetup.ownerTagSupport);
        const clonedProps = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_5__.deepClone)(props); // castedProps
        // CALL ORIGINAL COMPONENT FUNCTION
        const tag = originalFunction(castedProps, childSubject);
        tag.version = global.renderCount;
        tag.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__.TagSupport(oldTagSetup.ownerTagSupport, templater, subject);
        tag.tagSupport.propsConfig = {
            latest: props, // castedProps
            latestCloned: clonedProps,
            clonedProps: clonedProps,
            lastClonedKidValues: tag.tagSupport.propsConfig.lastClonedKidValues,
        };
        tag.tagSupport.memory = oldTagSetup.memory; // state handover
        if (madeSubject) {
            childSubject.value.forEach(kid => {
                kid.values.forEach((value, index) => {
                    if (!(value instanceof Function)) {
                        return;
                    }
                    const valuesValue = kid.values[index];
                    if (valuesValue.isChildOverride) {
                        return; // already overwritten
                    }
                    // all functions need to report to me
                    kid.values[index] = function (...args) {
                        const ownerTag = tag.ownerTag;
                        (0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_4__.runTagCallback)(value, // callback
                        ownerTag, this, // bindTo
                        args);
                    };
                    valuesValue.isChildOverride = true;
                });
            });
        }
        return tag;
    };
    return innerTagWrap;
}


/***/ }),

/***/ "../main/ts/tagElement.ts":
/*!********************************!*\
  !*** ../main/ts/tagElement.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_226159__) => {

__nested_webpack_require_226159__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_226159__.d(__nested_webpack_exports__, {
/* harmony export */   applyTagUpdater: () => (/* binding */ applyTagUpdater),
/* harmony export */   tagElement: () => (/* binding */ tagElement)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_226159__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_226159__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_226159__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");



const appElements = [];
function tagElement(app, // (...args: unknown[]) => TemplaterResult,
element, props) {
    const appElmIndex = appElements.findIndex(appElm => appElm.element === element);
    if (appElmIndex >= 0) {
        appElements[appElmIndex].tag.destroy();
        appElements.splice(appElmIndex, 1);
        // an element already had an app on it
        console.warn('Found and destroyed app element already rendered to element', { element });
    }
    // Create the app which returns [props, runOneTimeFunction]
    const wrapper = app(props);
    // have a function setup and call the tagWrapper with (props, {update, async, on})
    const result = applyTagUpdater(wrapper);
    const { tag } = result;
    // TODO: is the below needed?
    tag.appElement = element;
    tag.tagSupport.templater.global.isApp = true;
    const templateElm = document.createElement('template');
    templateElm.setAttribute('id', 'app-tag-' + appElements.length);
    templateElm.setAttribute('app-tag-detail', appElements.length.toString());
    element.appendChild(templateElm);
    tag.buildBeforeElement(templateElm);
    wrapper.global.oldest = tag;
    wrapper.global.newest = tag;
    if (!tag.hasLiveElements) {
        throw new Error('x');
    }
    ;
    element.setUse = app.original.setUse;
    appElements.push({ element, tag });
    return { tag, tags: app.original.tags };
}
function applyTagUpdater(wrapper) {
    const subject = new _ValueSubject__WEBPACK_IMPORTED_MODULE_2__.ValueSubject({});
    const tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.BaseTagSupport(wrapper, subject);
    wrapper.tagSupport = tagSupport;
    (0,_tagRunner__WEBPACK_IMPORTED_MODULE_1__.runBeforeRender)(tagSupport, undefined);
    // Call the apps function for our tag templater
    const tag = wrapper.wrapper(tagSupport, subject);
    // wrapper.global.oldest = tag
    // wrapper.global.newest = tag
    (0,_tagRunner__WEBPACK_IMPORTED_MODULE_1__.runAfterRender)(tagSupport, tag);
    return { tag, tagSupport };
}


/***/ }),

/***/ "../main/ts/tagRunner.ts":
/*!*******************************!*\
  !*** ../main/ts/tagRunner.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_229151__) => {

__nested_webpack_require_229151__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_229151__.d(__nested_webpack_exports__, {
/* harmony export */   runAfterRender: () => (/* binding */ runAfterRender),
/* harmony export */   runBeforeDestroy: () => (/* binding */ runBeforeDestroy),
/* harmony export */   runBeforeRedraw: () => (/* binding */ runBeforeRedraw),
/* harmony export */   runBeforeRender: () => (/* binding */ runBeforeRender)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_229151__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
// TODO: This should be more like `new TaggedJs().use({})`

// Life cycle 1
function runBeforeRender(tagSupport, tagOwner) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, tagOwner));
}
// Life cycle 2
function runAfterRender(tagSupport, tag) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, tag));
}
// Life cycle 3
function runBeforeRedraw(tagSupport, tag) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, tag));
}
// Life cycle 4 - end of life
function runBeforeDestroy(tagSupport, tag) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, tag));
}


/***/ }),

/***/ "../main/ts/updateExistingTagComponent.function.ts":
/*!*********************************************************!*\
  !*** ../main/ts/updateExistingTagComponent.function.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_230910__) => {

__nested_webpack_require_230910__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_230910__.d(__nested_webpack_exports__, {
/* harmony export */   updateExistingTagComponent: () => (/* binding */ updateExistingTagComponent)
/* harmony export */ });
/* harmony import */ var _hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_230910__(/*! ./hasTagSupportChanged.function */ "../main/ts/hasTagSupportChanged.function.ts");
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_230910__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_230910__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_230910__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");




function updateExistingTagComponent(ownerTag, templater, subject, insertBefore) {
    let existingTag = subject.tag;
    /*
    if(existingTag && !existingTag.hasLiveElements) {
      throw new Error('issue already began')
    }
    */
    const oldWrapper = existingTag.tagSupport.templater.wrapper;
    const newWrapper = templater.wrapper;
    let isSameTag = false;
    if (templater.global.oldest && !templater.global.oldest.hasLiveElements) {
        throw new Error('88893434');
    }
    if (oldWrapper && newWrapper) {
        const oldFunction = oldWrapper.original;
        const newFunction = newWrapper.original;
        isSameTag = oldFunction === newFunction;
    }
    const oldTagSupport = existingTag.tagSupport;
    const oldGlobal = oldTagSupport.templater.global;
    const globalInsert = oldGlobal.insertBefore;
    const oldInsertBefore = globalInsert?.parentNode ? globalInsert : insertBefore;
    if (!oldInsertBefore.parentNode) {
        throw new Error('stop here no parent node update existing tag');
    }
    if (!isSameTag) {
        (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(oldTagSupport.templater.global.oldest, subject);
        (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_1__.processSubjectComponent)(templater, subject, oldInsertBefore, ownerTag, {
            forceElement: false,
            counts: { added: 0, removed: 0 },
        });
        return;
    }
    else {
        const newTagSupport = templater.tagSupport;
        const hasChanged = (0,_hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__.hasTagSupportChanged)(oldTagSupport, newTagSupport, templater);
        if (!hasChanged) {
            return; // its the same tag component
        }
    }
    const oldestTag = templater.global.oldest; // oldTagSupport.oldest as Tag // existingTag
    const previous = templater.global.newest;
    if (!previous || !oldestTag) {
        throw new Error('how no previous or oldest nor newest?');
    }
    const newTag = (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_3__.renderTagSupport)(templater.tagSupport, false);
    existingTag = subject.tag;
    const newOldest = newTag.tagSupport.templater.global.oldest;
    const hasOldest = newOldest ? true : false;
    if (!hasOldest) {
        return buildNewTag(newTag, oldInsertBefore, oldTagSupport, subject);
    }
    if (newOldest && templater.children.value.length) {
        const oldKidsSub = newOldest.tagSupport.templater.children;
        oldKidsSub.set(templater.children.value);
    }
    // const newTag = tempResult.newest as Tag
    if (previous && !oldestTag) {
        throw new Error('bad elders');
    }
    // detect if both the function is the same and the return is the same
    const isLikeTag = isSameTag && previous.isLikeTag(newTag);
    if (previous && !oldestTag) {
        throw new Error('bad elders');
    }
    let oldest = oldTagSupport.templater.global.oldest;
    if (isLikeTag) {
        if (!newTag.tagSupport.templater.global.oldest) {
            throw new Error('maybe 6');
        }
        subject.tag = newTag;
        oldestTag.updateByTag(newTag); // the oldest tag has element references
        return;
    }
    else {
        // Although function looked the same it returned a different html result
        if (isSameTag && existingTag) {
            (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(existingTag, subject);
            newTag.tagSupport.templater.global.context = {}; // do not share previous outputs
        }
        oldest = undefined;
    }
    if (!oldest) {
        buildNewTag(newTag, oldTagSupport.templater.global.insertBefore, oldTagSupport, subject);
    }
    oldTagSupport.templater.global.newest = newTag;
    return;
}
function checkStateChanged(state) {
    return !state.newest.every(state => {
        const lastValue = state.lastValue;
        const nowValue = state.get();
        const matched = lastValue === nowValue;
        if (matched) {
            return true;
        }
        return false;
    });
}
function buildNewTag(newTag, oldInsertBefore, oldTagSupport, subject) {
    newTag.buildBeforeElement(oldInsertBefore, {
        forceElement: true,
        counts: { added: 0, removed: 0 }, test: false,
    });
    newTag.tagSupport.templater.global.oldest = newTag;
    newTag.tagSupport.templater.global.newest = newTag;
    oldTagSupport.templater.global.oldest = newTag;
    oldTagSupport.templater.global.newest = newTag;
    if (!newTag.tagSupport.templater.global.oldest) {
        throw new Error('maybe 5');
    }
    subject.tag = newTag;
    if (!newTag.hasLiveElements) {
        throw new Error('44444 - 5');
    }
    return;
}


/***/ }),

/***/ "../main/ts/updateExistingValue.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/updateExistingValue.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_236927__) => {

__nested_webpack_require_236927__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_236927__.d(__nested_webpack_exports__, {
/* harmony export */   updateExistingValue: () => (/* binding */ updateExistingValue)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_236927__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_236927__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_236927__(/*! ./processSubjectValue.function */ "../main/ts/processSubjectValue.function.ts");
/* harmony import */ var _processTagArray__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_236927__(/*! ./processTagArray */ "../main/ts/processTagArray.ts");
/* harmony import */ var _updateExistingTagComponent_function__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_236927__(/*! ./updateExistingTagComponent.function */ "../main/ts/updateExistingTagComponent.function.ts");
/* harmony import */ var _processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_236927__(/*! ./processRegularValue.function */ "../main/ts/processRegularValue.function.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_236927__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_236927__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_236927__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_236927__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");










function updateExistingValue(subject, value, ownerTag, insertBefore) {
    const subjectTag = subject;
    const isComponent = (0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value);
    const oldInsertBefore = subject.template || subjectTag.tag?.tagSupport.templater.global.insertBefore || subject.clone;
    (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_6__.checkDestroyPrevious)(subject, value);
    // handle already seen tag components
    if (isComponent) {
        const templater = value;
        // When was something before component
        if (!subjectTag.tag) {
            (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_7__.processSubjectComponent)(templater, subjectTag, oldInsertBefore, ownerTag, {
                forceElement: true,
                counts: { added: 0, removed: 0 },
            });
            return subjectTag;
        }
        templater.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.TagSupport(
        // subjectTag.tag.tagSupport.ownerTagSupport,
        ownerTag.tagSupport, templater, subjectTag);
        (0,_updateExistingTagComponent_function__WEBPACK_IMPORTED_MODULE_4__.updateExistingTagComponent)(ownerTag, templater, // latest value
        subjectTag, insertBefore);
        return subjectTag;
    }
    // was component but no longer
    const tag = subjectTag.tag;
    if (tag) {
        handleStillTag(tag, subject, value, ownerTag);
        return subjectTag;
    }
    // its another tag array
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagArray)(value)) {
        (0,_processTagArray__WEBPACK_IMPORTED_MODULE_3__.processTagArray)(subject, value, oldInsertBefore, ownerTag, { counts: {
                added: 0,
                removed: 0,
            } });
        return subject;
    }
    // now its a function
    if (value instanceof Function) {
        // const newSubject = getSubjectFunction(value, ownerTag)
        const bound = (0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_9__.bindSubjectCallback)(value, ownerTag);
        subject.set(bound);
        return subject;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(value)) {
        subjectTag.template = oldInsertBefore;
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processTag)(value, subjectTag, subjectTag.template, ownerTag);
        return subjectTag;
    }
    // we have been given a subject
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isSubjectInstance)(value)) {
        return value;
    }
    // This will cause all other values to render
    (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, oldInsertBefore);
    return subjectTag;
}
function handleStillTag(existingTag, subject, value, ownerTag) {
    // TODO: We shouldn't need both of these
    const isSameTag = value && (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_8__.isLikeTags)(existingTag, value);
    const isSameTag2 = value && value.getTemplate && existingTag.isLikeTag(value);
    const tag = value;
    if (!tag.tagSupport) {
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.applyFakeTemplater)(tag, ownerTag, subject);
    }
    if (isSameTag) {
        existingTag.updateByTag(tag);
        return;
    }
    if (isSameTag || isSameTag2) {
        return (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processTag)(value, subject, subject.template, ownerTag);
    }
    return (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, subject.template);
}


/***/ }),

/***/ "../main/ts/watch.function.ts":
/*!************************************!*\
  !*** ../main/ts/watch.function.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_242827__) => {

__nested_webpack_require_242827__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_242827__.d(__nested_webpack_exports__, {
/* harmony export */   watch: () => (/* binding */ watch)
/* harmony export */ });
/* harmony import */ var _setLet_function__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_242827__(/*! ./setLet.function */ "../main/ts/setLet.function.ts");

/** When an item in watch array changes, callback function will be triggered */
function watch(currentValues, callback) {
    let previousValues = (0,_setLet_function__WEBPACK_IMPORTED_MODULE_0__.setLet)(undefined)(x => [previousValues, previousValues = x]);
    if (previousValues === undefined) {
        callback(currentValues, previousValues);
        // const result = {currentValues, previousValues}
        previousValues = currentValues;
        return currentValues;
    }
    const allExact = currentValues.every((item, index) => item === previousValues[index]);
    if (allExact) {
        return currentValues;
    }
    callback(currentValues, previousValues);
    previousValues.length = 0;
    previousValues.push(...currentValues);
    return currentValues;
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nested_webpack_require_244201__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_244201__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nested_webpack_require_244201__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nested_webpack_require_244201__.o(definition, key) && !__nested_webpack_require_244201__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nested_webpack_require_244201__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__nested_webpack_require_244201__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__nested_webpack_require_244201__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_244201__.d(__nested_webpack_exports__, {
/* harmony export */   App: () => (/* reexport safe */ _app_component__WEBPACK_IMPORTED_MODULE_0__.App),
/* harmony export */   IsolatedApp: () => (/* reexport safe */ _isolatedApp__WEBPACK_IMPORTED_MODULE_1__.IsolatedApp),
/* harmony export */   hmr: () => (/* reexport safe */ taggedjs__WEBPACK_IMPORTED_MODULE_2__.hmr)
/* harmony export */ });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_244201__(/*! ./app.component */ "./src/app.component.ts");
/* harmony import */ var _isolatedApp__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_244201__(/*! ./isolatedApp */ "./src/isolatedApp.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_244201__(/*! taggedjs */ "../main/ts/index.ts");




})();

var __webpack_exports__App = __nested_webpack_exports__.App;
var __webpack_exports__IsolatedApp = __nested_webpack_exports__.IsolatedApp;
var __webpack_exports__hmr = __nested_webpack_exports__.hmr;


//# sourceMappingURL=bundle.js.map

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./assets/index.hmr.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* reexport safe */ _dist_bundle_js__WEBPACK_IMPORTED_MODULE_0__.App),
/* harmony export */   IsolatedApp: () => (/* reexport safe */ _dist_bundle_js__WEBPACK_IMPORTED_MODULE_0__.IsolatedApp),
/* harmony export */   hmr: () => (/* reexport safe */ _dist_bundle_js__WEBPACK_IMPORTED_MODULE_0__.hmr)
/* harmony export */ });
/* harmony import */ var _dist_bundle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dist/bundle.js */ "./assets/dist/bundle.js");
console.log('*** hmr index ***')
/*
export { hmr } from "taggedjs"
export { App } from "./js/app.component.js"
export { IsolatedApp } from "./js/isolatedApp.js"
*/





})();

var __webpack_exports__App = __webpack_exports__.App;
var __webpack_exports__IsolatedApp = __webpack_exports__.IsolatedApp;
var __webpack_exports__hmr = __webpack_exports__.hmr;
export { __webpack_exports__App as App, __webpack_exports__IsolatedApp as IsolatedApp, __webpack_exports__hmr as hmr };

//# sourceMappingURL=bundle.hmr.js.map