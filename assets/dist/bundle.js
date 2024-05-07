/******/ var __webpack_modules__ = ({

/***/ "./node_modules/taggedjs-animate/js/createFx.function.js":
/*!***************************************************************!*\
  !*** ./node_modules/taggedjs-animate/js/createFx.function.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureElementPosition: () => (/* binding */ captureElementPosition),
/* harmony export */   createFx: () => (/* binding */ createFx)
/* harmony export */ });
function createFx({ fxIn, fxOut, staggerBy = 300, }) {
    return {
        in: (input) => animateInit({ fxName: fxIn, staggerBy, ...input }),
        out: (input) => animateDestroy({ fxName: fxOut, staggerBy, capturePosition: true, ...input }),
    };
}
const animateInit = async ({ target, stagger, staggerBy, fxName = 'fadeInDown' }) => {
    target.style.opacity = '0';
    if (stagger) {
        await wait(stagger * staggerBy);
    }
    target.style.opacity = '1';
    target.classList.add('animate__animated', 'animate__' + fxName);
};
const animateDestroy = async ({ target, stagger, capturePosition = true, fxName = 'fadeOutUp', staggerBy }) => {
    if (capturePosition) {
        captureElementPosition(target);
    }
    if (stagger) {
        await wait(stagger * staggerBy);
    }
    target.classList.add('animate__animated', 'animate__' + fxName);
    await wait(1000); // don't allow remove from stage until animation completed
    target.classList.remove('animate__animated', 'animate__' + fxName);
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
//# sourceMappingURL=createFx.function.js.map

/***/ }),

/***/ "./node_modules/taggedjs-animate/js/index.js":
/*!***************************************************!*\
  !*** ./node_modules/taggedjs-animate/js/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fadeInDown: () => (/* binding */ fadeInDown),
/* harmony export */   fadeOutUp: () => (/* binding */ fadeOutUp)
/* harmony export */ });
/* harmony import */ var _createFx_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createFx.function */ "./node_modules/taggedjs-animate/js/createFx.function.js");

const { in: fadeInDown, out: fadeOutUp } = (0,_createFx_function__WEBPACK_IMPORTED_MODULE_0__.createFx)({ fxIn: 'fadeInDown', fxOut: 'fadeOutUp' });
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/ContentDebug.component.ts":
/*!***************************************!*\
  !*** ./src/ContentDebug.component.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentDebug: () => (/* binding */ contentDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const contentDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    const vs0 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.state)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(0));
    const vs1 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.state)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(1));
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
    <!--proof you cannot see false values -->
    <div style="font-size:0.8em">
      <fieldset>
        <legend>false test</legend>
        You should see "" here => "${false}"
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
        You should see "" here => "${undefined}"
      </fieldset>
    </div>
    <!--proof you can see true booleans -->
    <div style="font-size:0.8em">
      <fieldset>
        <legend>true test</legend>
        You should see "true" here => "${true}"
      </fieldset>
    </div>
    <!--proof you can try to use the tagVar syntax -->
    <div style="font-size:0.8em">You should see "${'{'}22${'}'}" here => "{22}"</div>
    <div style="font-size:0.8em">You should see "${'{'}__tagVar0${'}'}" here => "{__tagVar0}"</div>
    <div style="font-size:0.8em">should be a safe string no html "&lt;div&gt;hello&lt;/div&gt;" here => "${'<div>hello</div>'}"</div>
    <div style="display:flex;flex-wrap:wrap;gap;1em">
      <fieldset style="flex:1">
        <legend>value subject</legend>
        0 === ${vs0}
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>piped subject</legend>        
        <span id="content-subject-pipe-display0">55</span> ===
        <span id="content-subject-pipe-display1">${vs0.pipe(() => 55)}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest</legend>
        <span id="content-combineLatest-pipe-display0">1</span> ===
        <span id="content-combineLatest-pipe-display1">${(0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.combineLatest)([vs0, vs1]).pipe(x => x[1])}</span>
      </fieldset>
      
      <fieldset style="flex:1">
        <legend>combineLatest piped html</legend>
        <span id="content-combineLatest-pipeHtml-display0"><b>bold 77</b></span> ===
        <span id="content-combineLatest-pipeHtml-display1">${(0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.combineLatest)([vs0, vs1]).pipe((0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.willPromise)(x => Promise.resolve((0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<b>bold 77</b>`)))}</span>
      </fieldset>
    </div>
    (render count ${renderCount})
  `;
});


/***/ }),

/***/ "./src/PropsDebug.component.ts":
/*!*************************************!*\
  !*** ./src/PropsDebug.component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   propsDebugMain: () => (/* binding */ propsDebugMain)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


const propsDebugMain = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_ = 'propsDebugMain') => {
    let propNumber = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [propNumber, propNumber = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    let propsJson = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)({ test: 33, x: 'y' })(x => [propsJson, propsJson = x]);
    let date = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(() => new Date())(x => [date, date = x]);
    let syncPropNumber = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [syncPropNumber, syncPropNumber = x]);
    function propsJsonChanged(event) {
        propsJson = JSON.parse(event.target.value);
        return propsJson;
    }
    const elmChangeDate = (event) => {
        const newDateString = event.target.value;
        date = new Date(newDateString);
    };
    ++renderCount;
    const json = JSON.stringify(propsJson, null, 2);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <textarea id="props-debug-textarea" wrap="off"
      onchange=${propsJsonChanged}
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

    <fieldset>
      <legend>sync props callback</legend>
      🥡 syncPropNumber: <span id="sync-prop-number-display">${syncPropNumber}</span>
      <button onclick=${() => ++syncPropNumber}>🥡 ++</button>
      <hr />
      ${syncPropDebug({
        syncPropNumber,
        propNumberChange: x => {
            syncPropNumber = x;
        },
        nothingTest: x => x
    })}
    </fieldset>

    <fieldset>
      <legend>date prop</legend>
      date:${date}
      <input type="date" value=${timestampToValues(date).date} onchange=${elmChangeDate} />
      <hr />
      ${propDateDebug({ date })}
    </fieldset>
  `;
});
const propDateDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ date }) => {
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    date:${date}
  `;
});
/** Tests calling a property that is a function immediately which should cause rendering */
const syncPropDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ syncPropNumber, propNumberChange, nothingTest, }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
    if (syncPropNumber % 2 === 1) {
        propNumberChange(syncPropNumber = syncPropNumber + 1);
    }
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<!--syncPropDebug-->
    <div>
      🥡 syncPropNumber:<span id="sync-prop-child-display">${syncPropNumber}</span>
      <button id="sync-prop-child-button" onclick=${() => propNumberChange(++syncPropNumber)}>🥡 ++</button>
    </div>
    <div>
      <div>
        counter:<span id="sync-prop-counter-display">${counter}</span>
      </div>
      nothingTest<span id="nothing-prop-counter-display">${nothingTest(counter)}</span>
      <button id="nothing-prop-counter-button" onclick=${() => nothingTest(++counter)}>++</button>
    </div>
  `;
});
const propsDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ propNumber, propsJson, propNumberChange, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    let propNumberChangeCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [propNumberChangeCount, propNumberChangeCount = x]);
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
      >🐄 🥩 propNumber ${propNumber}</button>
      <span id="propsDebug-🥩-1-display">${propNumber}</span>
    </div>
    <button
      title="test of increasing render count and nothing else"
      onclick=${() => ++renderCount}
    >renderCount ${renderCount}</button>
    
    <button onclick=${() => ++propNumber}
      title="only changes number locally but if change by parent than that is the number"
    >🐄 🥩 local set propNumber ${propNumber}</button>
    
    <div>
      <small>
        (propNumberChangeCount:<span id="propsDebug-🥩-change-display">${propNumberChangeCount}</span>)
      </small>
    </div>
    
    <hr />
    <h3>Fn update test</h3>
    ${propFnUpdateTest({
        propNumber,
        callback: () => ++propNumber
    })}    
  `;
});
const propFnUpdateTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ propNumber, callback, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <button id="propsOneLevelFunUpdate-🥩-button"
      onclick=${callback}
    >🐄 🥩 local & 1-parent increase ${propNumber}</button>
    <span id="propsOneLevelFunUpdate-🥩-display">${propNumber}</span>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'propFnUpdateTest' })}
    <small style="opacity:.5">the count here and within parent increases but not in parent parent</small>
  `;
});
function timestampToValues(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`
    };
}


/***/ }),

/***/ "./src/animations.ts":
/*!***************************!*\
  !*** ./src/animations.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fadeInDown: () => (/* reexport safe */ taggedjs_animate__WEBPACK_IMPORTED_MODULE_0__.fadeInDown),
/* harmony export */   fadeOutUp: () => (/* reexport safe */ taggedjs_animate__WEBPACK_IMPORTED_MODULE_0__.fadeOutUp)
/* harmony export */ });
/* harmony import */ var taggedjs_animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs-animate */ "./node_modules/taggedjs-animate/js/index.js");



/***/ }),

/***/ "./src/app.component.ts":
/*!******************************!*\
  !*** ./src/app.component.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _attributeDebug_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributeDebug.component */ "./src/attributeDebug.component.ts");
/* harmony import */ var _ContentDebug_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentDebug.component */ "./src/ContentDebug.component.ts");
/* harmony import */ var _tableDebug_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tableDebug.component */ "./src/tableDebug.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _tagJsDebug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tagJsDebug */ "./src/tagJsDebug.ts");
/* harmony import */ var _tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tagSwitchDebug.component */ "./src/tagSwitchDebug.component.ts");
/* harmony import */ var _mirroring_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mirroring.tag */ "./src/mirroring.tag.ts");
/* harmony import */ var _childTests__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./childTests */ "./src/childTests.ts");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tests */ "./src/tests.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var _countersDebug__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./countersDebug */ "./src/countersDebug.ts");
/* harmony import */ var _providerDebug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./providerDebug */ "./src/providerDebug.ts");












const App = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)(() => {
    let _firstState = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)('app first state')(x => [_firstState, _firstState = x]);
    let toggleValue = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(false)(x => [toggleValue, toggleValue = x]);
    let appCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(0)(x => [appCounter, appCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(0)(x => [renderCount, renderCount = x]);
    let testTimeout = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(null)(x => [testTimeout, testTimeout = x]);
    const toggle = () => {
        toggleValue = !toggleValue;
    };
    // if I am destroyed before my test runs, prevent test from running
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.onDestroy)(() => {
        clearTimeout(testTimeout);
        testTimeout = null;
    });
    function runTesting(manual = true) {
        const waitFor = 1000;
        testTimeout = setTimeout(async () => {
            console.debug('🏃 Running tests...');
            const result = await (0,_tests__WEBPACK_IMPORTED_MODULE_8__.runTests)();
            if (!manual) {
                return;
            }
            if (result) {
                alert('✅ all app tests passed');
                return;
            }
            alert('❌ tests failed. See console for more details');
        }, waitFor); // cause delay to be separate from renders
    }
    ++renderCount;
    const callbacks = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.callbackMaker)();
    const appCounterSubject = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.state)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_3__.Subject(appCounter));
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.onInit)(() => {
        console.log('app init should only run once');
        runTesting(false);
        appCounterSubject.subscribe(x => {
            callbacks((y) => {
                console.log('app callback increase counter', { appCounter, x });
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

    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_9__.renderCountDiv)({ name: 'app', renderCount })}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${(0,_countersDebug__WEBPACK_IMPORTED_MODULE_10__.counters)({ appCounterSubject })}
        </fieldset>

        <fieldset id="provider-debug" style="flex:2 2 20em">
          <legend>Provider Debug</legend>
          ${(0,_providerDebug__WEBPACK_IMPORTED_MODULE_11__.providerDebugBase)(undefined)}
        </fieldset>

        ${(0,_childTests__WEBPACK_IMPORTED_MODULE_7__.childTests)(undefined)}

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
          <legend>Tag Mirroring</legend>
          ${(0,_mirroring_tag__WEBPACK_IMPORTED_MODULE_6__.mirroring)()}
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

/***/ "./src/app.function.ts":
/*!*****************************!*\
  !*** ./src/app.function.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   app: () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "./src/app.component.ts");
/* harmony import */ var _isolatedApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isolatedApp */ "./src/isolatedApp.ts");



const app = () => {
    console.info('attaching app to element...');
    const element = document.getElementsByTagName('app')[0];
    const pathname = window.location.pathname;
    const locationSplit = pathname.split('/').filter(x => x);
    const location = locationSplit[0]?.toLowerCase();
    if (location && ['isolated.html', 'index-static.html'].includes(location)) {
        (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tagElement)(_isolatedApp__WEBPACK_IMPORTED_MODULE_2__.IsolatedApp, element, { test: 1 });
        return;
    }
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tagElement)(_app_component__WEBPACK_IMPORTED_MODULE_1__.App, element, { test: 1 });
};


/***/ }),

/***/ "./src/arrayTests.ts":
/*!***************************!*\
  !*** ./src/arrayTests.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayTests: () => (/* binding */ arrayTests)
/* harmony export */ });
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations */ "./src/animations.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");



const frameCount = 4;
const arrayTests = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(function ArrayTests() {
    const players = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.state)([]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [renderCount, renderCount = x]);
    const getNewPlayer = () => ({
        name: 'Person ' + players.length,
        scores: '0,'.repeat(/*frameCount*/ 0).split(',').map((_v, index) => ({
            frame: index + 1,
            score: Math.floor(Math.random() * 4) + 1
        }))
    });
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${playersDisplay({ players, getNewPlayer })}
    </div>

    <button id="array-test-push-item" onclick=${() => {
        players.push(getNewPlayer());
    }}>push item ${players.length + 1}</button>

    <button onclick=${() => {
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
    }}>push 3 items</button>

    <button onclick=${() => {
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
        players.push(getNewPlayer());
    }}>push 9 items</button>

    ${players.length > 0 && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
      <button oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeInDown} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOutUp} onclick=${() => {
        players.length = 0;
    }}>remove all</button>
    `}

    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'arrayTests.ts' })}
  `;
});
const scoreData = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ score, playerIndex }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [renderCount, renderCount = x]);
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
const playersDisplay = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ players, getNewPlayer, }) => {
    const playersContent = players.map((player, index) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
    <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeInDown} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOutUp} style="background-color:black;">
      <div>
        name:${player.name}
      </div>
      <div>
        index:${index}
      </div>
      
      <div style="background-color:purple;padding:.5em">
        scores:${player.scores.map((score, playerIndex) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
        <div style="border:1px solid white;"
          oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeInDown} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOutUp}
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
        players.splice(index, 0, getNewPlayer());
    }}>add before</button>
    </div>
  `.key(player));
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
    <!-- playersLoop.js -->
    ${playersContent}
    <!-- end:playersLoop.js -->
  `;
});


/***/ }),

/***/ "./src/attributeDebug.component.ts":
/*!*****************************************!*\
  !*** ./src/attributeDebug.component.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributeDebug: () => (/* binding */ attributeDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const attributeDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let selected = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)('a')(x => [selected, selected = x]);
    let isOrange = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(true)(x => [isOrange, isOrange = x]);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   childTests: () => (/* binding */ childTests)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _innerHtmlTests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./innerHtmlTests */ "./src/innerHtmlTests.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");



const childTests = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_ = 'childTests') => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
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
        >🐮 increase childTests inside ${counter}</button>
        <span id="innerHtmlPropsTest-childTests-display">${counter}</span>
        ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'innerHtmlPropsTest child' })}
      `)}

      ${childAsPropTest({ child: (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
        hello child as prop test
        <button id="child-as-prop-test-button"
          onclick=${() => ++counter}
        >🐮 child as prop ${counter}</button>
        <span id="child-as-prop-test-display">${counter}</span>
      ` })}

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
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
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
function childAsPropTest({ child }) {
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <fieldset>
      <legend>child as prop</legend>
      ${child}
    </fieldset>
  `;
}


/***/ }),

/***/ "./src/countersDebug.ts":
/*!******************************!*\
  !*** ./src/countersDebug.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   counters: () => (/* binding */ counters)
/* harmony export */ });
/* harmony import */ var _mouseover_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mouseover.tag */ "./src/mouseover.tag.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");



const counters = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ appCounterSubject, }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [counter, counter = x]);
    let propCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [propCounter, propCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [renderCount, renderCount = x]);
    let initCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [initCounter, initCounter = x]);
    let memory = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.state)(() => ({ counter: 0 }));
    const callback = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.callbackMaker)();
    const callbackTestSub = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.state)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_2__.Subject());
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.onInit)(() => {
        ++initCounter;
        console.info('countersDebug.ts: 👉 i should only ever run once');
        callbackTestSub.subscribe(x => {
            callback((y) => {
                counter = x;
            })();
        });
    });
    const increaseCounter = () => {
        ++counter;
    };
    const increasePropCounter = () => ++propCounter;
    ++renderCount; // for debugging
    const sharedMemory = true;
    const testInnerCounters = true;
    const displayRenderCounters = true;
    const testBasics = true;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `<!--counters-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${testBasics && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
        <div>👉 Subscriptions:${taggedjs__WEBPACK_IMPORTED_MODULE_2__.Subject.globalSubCount$}</div>
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
          <button id="❤️-increase-counter"
            onclick=${increasePropCounter}
          >❤️ propCounter:${propCounter}</button>
          <span>
            ❤️ <span id="❤️-counter-display">${propCounter}</span>
            </span>
        </div>

        <div>
          <button id="subject-increase-counter"
            onclick=${() => callbackTestSub.set(counter + 1)}
          >subject increase:</button>
          <span>
            🥦 <span id="subject-counter-display">${counter}</span>
          </span>
        </div>
      `}
    </div>

    ${sharedMemory && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
      <fieldset>
        <legend>shared memory</legend>
        <div class.bold.text-blue=${true} style="display:flex;flex-wrap:wrap;gap:.5em">
          ${(0,_mouseover_tag__WEBPACK_IMPORTED_MODULE_0__.mouseOverTag)({ label: 'a-a-😻', memory })}
          ${(0,_mouseover_tag__WEBPACK_IMPORTED_MODULE_0__.mouseOverTag)({ label: 'b-b-😻', memory })}
        </div>
        memory.counter:😻${memory.counter}
        <button onclick=${() => ++memory.counter}>increase 😻</button>
      </fieldset>
    `}
    
    ${testInnerCounters && (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
      <fieldset>
        <legend>inner counter</legend>
        ${innerCounters({ propCounter, increasePropCounter })}
      </fieldset>
    `}
    ${displayRenderCounters && (0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'counters' })}
  `;
});
const innerCounters = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.tag)(({ propCounter, increasePropCounter, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount; // for debugging
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
    <button id="❤️-inner-counter" onclick=${increasePropCounter}
    >❤️ propCounter:${propCounter}</button>
    <span>
      ❤️ <span id="❤️-inner-display">${propCounter}</span>
    </span>
    <div>renderCount:${renderCount}</div>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'inner counters' })}
  `;
});


/***/ }),

/***/ "./src/elmSelectors.ts":
/*!*****************************!*\
  !*** ./src/elmSelectors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   byId: () => (/* binding */ byId),
/* harmony export */   elmCount: () => (/* binding */ elmCount),
/* harmony export */   htmlById: () => (/* binding */ htmlById),
/* harmony export */   lastById: () => (/* binding */ lastById),
/* harmony export */   queryOneInnerHTML: () => (/* binding */ queryOneInnerHTML)
/* harmony export */ });
function elmCount(selector) {
    return document.querySelectorAll(selector).length;
}
function queryOneInnerHTML(query, pos = 0) {
    return document.querySelectorAll(query)[pos].innerHTML;
}
function byId(id) {
    return document.getElementById(id);
}
function htmlById(id) {
    return document.getElementById(id).innerHTML;
}
function lastById(id) {
    const elms = document.querySelectorAll('#' + id);
    return elms[elms.length - 1];
}


/***/ }),

/***/ "./src/expect.html.ts":
/*!****************************!*\
  !*** ./src/expect.html.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   expectElmCount: () => (/* binding */ expectElmCount),
/* harmony export */   expectHTML: () => (/* binding */ expectHTML),
/* harmony export */   expectMatchedHtml: () => (/* binding */ expectMatchedHtml),
/* harmony export */   testCounterElements: () => (/* binding */ testCounterElements),
/* harmony export */   testDuelCounterElements: () => (/* binding */ testDuelCounterElements)
/* harmony export */ });
/* harmony import */ var _expect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expect */ "./src/expect.ts");

function expectMatchedHtml(...queries) {
    const elements = queries.reduce((all, query) => {
        const elements = document.querySelectorAll(query);
        all.push(...elements);
        return all;
    }, []);
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elements.length).toBeGreaterThan(0);
    const lastElm = elements.pop();
    const lastHtml = lastElm.innerHTML;
    elements.every(elm => (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(lastHtml).toBe(elm.innerHTML));
}
function expectHTML(query, innerHTML) {
    const elements = document.querySelectorAll(query);
    elements.forEach(element => (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(element.innerHTML).toBe(innerHTML, `Expected element ${query} innerHTML to be -->${innerHTML}<-- but it was -->${element.innerHTML}<--`));
}
function expectElmCount(query, count, message) {
    //  const found = elementCount(query)
    const elements = document.querySelectorAll(query);
    const found = elements.length;
    message = message || `Expected ${count} elements to match query ${query} but found ${found}`;
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(found).toBe(count, message);
    return elements;
}
function testDuelCounterElements(...sets
// [button0, display0]: [string, string], // button, display
// [button1, display1]: [string, string], // button, display
) {
    const [button0, display0] = sets.shift();
    let query = expectElmCount(display0, 1);
    const display0Element = query[0];
    const ip0 = display0Element.innerText;
    testCounterElements(button0, display0);
    let increase = 2;
    sets.forEach(([button1, display1]) => {
        query = expectElmCount(display1, 1);
        let display1Element = query[0];
        let ip1Check = display1Element.innerText;
        const value = (Number(ip0) + increase).toString();
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`);
        testCounterElements(button1, display1);
        query = expectElmCount(display1, 1);
        display1Element = query[0];
        ip1Check = display1Element.innerText;
        const secondIncrease = increase + 2;
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(ip1Check).toBe((Number(ip0) + secondIncrease).toString(), `Expected ${display1} innerText to be ${Number(ip0) + secondIncrease} but instead it is ${ip1Check}`);
        increase = increase + 2;
    });
}
/** increases counter by two */
function testCounterElements(counterButtonId, counterDisplayId, { elementCountExpected } = {
    elementCountExpected: 1
}) {
    // const getByIndex = (selector: string, index: number) => document.querySelectorAll(selector)[index] as unknown as HTMLElement[]
    const increaseCounters = document.querySelectorAll(counterButtonId);
    const counterDisplays = document.querySelectorAll(counterDisplayId);
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(increaseCounters.length).toBe(elementCountExpected, `Expected ${counterButtonId} to be ${elementCountExpected} elements but is instead ${increaseCounters.length}`);
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(counterDisplays.length).toBe(elementCountExpected, `Expected ${counterDisplayId} to be ${elementCountExpected} elements but is instead ${counterDisplays.length}`);
    increaseCounters.forEach((increaseCounter, index) => {
        const counterDisplay = counterDisplays[index];
        let counterValue = Number(counterDisplay?.innerText);
        increaseCounter?.click();
        let oldCounterValue = counterValue + 1;
        counterValue = Number(counterDisplay?.innerText);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to be value ${oldCounterValue} but is instead ${counterValue}`);
        increaseCounter?.click();
        counterValue = Number(counterDisplay?.innerText);
        ++oldCounterValue;
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to increase value to ${oldCounterValue} but is instead ${counterValue}`);
    });
}


/***/ }),

/***/ "./src/expect.ts":
/*!***********************!*\
  !*** ./src/expect.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   describe: () => (/* binding */ describe),
/* harmony export */   execute: () => (/* binding */ execute),
/* harmony export */   expect: () => (/* binding */ expect),
/* harmony export */   it: () => (/* binding */ it)
/* harmony export */ });
const onlyTests = [];
let tests = [];
let tab = 0;
function describe(label, run) {
    tests.push(async () => {
        const oldTests = tests;
        tests = [];
        try {
            console.debug('  '.repeat(tab) + '↘ ' + label);
            ++tab;
            await run();
            await runTests(tests);
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
    onlyTests.push(async () => {
        const oldTests = tests;
        tests = [];
        try {
            console.debug('  '.repeat(tab) + '↘ ' + label);
            ++tab;
            await run();
            await runTests(tests);
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
    tests.push(async () => {
        try {
            await run();
            console.debug(' '.repeat(tab) + '✅ ' + label);
        }
        catch (error) {
            console.debug(' '.repeat(tab) + '❌ ' + label);
            throw error;
        }
    });
}
it.only = (label, run) => {
    onlyTests.push(async () => {
        try {
            await run();
            console.debug('✅ ' + label);
        }
        catch (error) {
            console.debug('❌ ' + label);
            throw error;
        }
    });
};
it.skip = (label, run) => {
    console.debug('⏭️ Skipped ' + label);
};
async function execute() {
    if (onlyTests.length) {
        return runTests(onlyTests);
    }
    return runTests(tests);
}
async function runTests(tests) {
    for (const test of tests) {
        try {
            await test();
        }
        catch (err) {
            console.error(`Error testing ${test.name}`);
            throw err;
        }
    }
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
        },
        toBeGreaterThan: (amount, customMessage) => {
            const expectNum = expected;
            if (!isNaN(expectNum) && expectNum > amount) {
                return;
            }
            const message = customMessage || `Expected ${typeof (expected)} ${JSON.stringify(expected)} to be greater than amount`;
            console.error(message, { amount, expected });
            throw new Error(message);
        }
    };
}


/***/ }),

/***/ "./src/innerHtmlTests.ts":
/*!*******************************!*\
  !*** ./src/innerHtmlTests.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   innerHtmlPropsTest: () => (/* binding */ innerHtmlPropsTest),
/* harmony export */   innerHtmlTest: () => (/* binding */ innerHtmlTest)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


const innerHtmlTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_props, children) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
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
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intervalTester0: () => (/* binding */ intervalTester0),
/* harmony export */   intervalTester1: () => (/* binding */ intervalTester1)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const test0interval = 3000;
const test1interval = 6000;
const intervalTester0 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let intervalCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [intervalCount, intervalCount = x]);
    let intervalId = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(undefined)(x => [intervalId, intervalId = x]);
    let intervalId2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(undefined)(x => [intervalId2, intervalId2 = x]);
    let renderCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCounter, renderCounter = x]);
    let currentTime = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [currentTime, currentTime = x]);
    const callback = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.callbackMaker)();
    const increase = () => ++intervalCount;
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
    let intervalCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [intervalCount, intervalCount = x]);
    let intervalId = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(undefined)(x => [intervalId, intervalId = x]);
    let intervalId2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(undefined)(x => [intervalId2, intervalId2 = x]);
    let renderCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCounter, renderCounter = x]);
    let currentTime = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [currentTime, currentTime = x]);
    const callback = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.callbackMaker)();
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsolatedApp: () => (/* binding */ IsolatedApp)
/* harmony export */ });
/* harmony import */ var _childTests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./childTests */ "./src/childTests.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _arrayTests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrayTests */ "./src/arrayTests.ts");
/* harmony import */ var _tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tagSwitchDebug.component */ "./src/tagSwitchDebug.component.ts");
/* harmony import */ var _mirroring_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mirroring.tag */ "./src/mirroring.tag.ts");
/* harmony import */ var _PropsDebug_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PropsDebug.component */ "./src/PropsDebug.component.ts");
/* harmony import */ var _providerDebug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./providerDebug */ "./src/providerDebug.ts");
/* harmony import */ var _countersDebug__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./countersDebug */ "./src/countersDebug.ts");
/* harmony import */ var _tableDebug_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tableDebug.component */ "./src/tableDebug.component.ts");
/* harmony import */ var _ContentDebug_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ContentDebug.component */ "./src/ContentDebug.component.ts");










const IsolatedApp = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.tag)(() => {
    const views = [
        // 'content',
        // 'counters',
        'props',
        // 'mirroring',
        // 'providerDebug',
        // 'arrays',
        // 'tagSwitchDebug',
        // 'child',
    ];
    let appCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.letState)(0)(x => [appCounter, appCounter = x]);
    const appCounterSubject = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.state)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_1__.Subject(appCounter));
    const callback = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.callbackMaker)();
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.onInit)(() => {
        console.log('app init should only run once');
        appCounterSubject.subscribe(callback(x => {
            console.log('callback increase counter', { appCounter, x });
            appCounter = x;
        }));
    });
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `<!--isolatedApp.js-->
    <h1 id="app">🏷️ TaggedJs - isolated</h1>

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        ${views.includes('props') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>propsDebugMain</legend>
            ${(0,_PropsDebug_component__WEBPACK_IMPORTED_MODULE_5__.propsDebugMain)(undefined)}
          </fieldset>
        `}

        ${views.includes('tableDebug') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>tableDebug</legend>
            ${(0,_tableDebug_component__WEBPACK_IMPORTED_MODULE_8__.tableDebug)()}
          </fieldset>
        `}

        ${views.includes('providerDebug') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>providerDebugBase</legend>
            ${(0,_providerDebug__WEBPACK_IMPORTED_MODULE_6__.providerDebugBase)(undefined)}
          </fieldset>
        `}

        ${views.includes('tagSwitchDebug') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>tagSwitchDebug</legend>
            ${(0,_tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_3__.tagSwitchDebug)(undefined)}
          </fieldset>
        `}

        ${views.includes('mirroring') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>mirroring</legend>
            ${(0,_mirroring_tag__WEBPACK_IMPORTED_MODULE_4__.mirroring)(undefined)}
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
            ${(0,_countersDebug__WEBPACK_IMPORTED_MODULE_7__.counters)({ appCounterSubject })}
          </fieldset>
        `}

        ${views.includes('content') && (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
          <fieldset style="flex:2 2 20em">
            <legend>content</legend>
            ${(0,_ContentDebug_component__WEBPACK_IMPORTED_MODULE_9__.contentDebug)()}
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

/***/ "./src/mirroring.tag.ts":
/*!******************************!*\
  !*** ./src/mirroring.tag.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mirroring: () => (/* binding */ mirroring)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const mirroring = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    const tag = tagCounter();
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <fieldset>
      <legend>counter0</legend>
      ${tag}
    </fieldset>
    <fieldset>
      <legend>counter1</legend>
      ${tag}
    </fieldset>
  `;
});
const tagCounter = () => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    counter:<span>🪞<span id="mirror-counter-display">${counter}</span></span>
    <button id="mirror-counter-button" onclick=${() => ++counter}>${counter}</button>
  `;
};


/***/ }),

/***/ "./src/mouseover.tag.ts":
/*!******************************!*\
  !*** ./src/mouseover.tag.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mouseOverTag: () => (/* binding */ mouseOverTag)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const mouseOverTag = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ label, memory, }) => {
    let mouseOverEditShow = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(false)(x => [mouseOverEditShow, mouseOverEditShow = x]);
    let edit = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(false)(x => [edit, edit = x]);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div style="background-color:purple;padding:.2em;flex:1"
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagDebugProvider: () => (/* binding */ TagDebugProvider),
/* harmony export */   providerDebugBase: () => (/* binding */ providerDebugBase)
/* harmony export */ });
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations */ "./src/animations.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var _tagJsDebug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tagJsDebug */ "./src/tagJsDebug.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");




class TagDebugProvider {
    tagDebug = 0;
    showDialog = false;
}
const ProviderFunc = () => ({ counter: 0 });
const providerDebugBase = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)((_x = 'providerDebugBase') => {
    // This provider, has a provider
    const provider = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(_tagJsDebug__WEBPACK_IMPORTED_MODULE_2__.tagDebugProvider);
    const providerClass = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(TagDebugProvider);
    taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(ProviderFunc); // test that an arrow function can be a provider
    const test = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)('props debug base');
    let propCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(0)(x => [propCounter, propCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(0)(x => [renderCount, renderCount = x]);
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

    <div style="display:flex;flex-wrap:wrap;gap:1em">
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
    const funcProvider = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.inject(ProviderFunc); // test that an arrow function can be a provider
    let showProProps = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(false)(x => [showProProps, showProProps = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(0)(x => [renderCount, renderCount = x]);
    // let propCounter: number = letState(0)(x => [propCounter, propCounter = x])
    const callbacks = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.callbackMaker)();
    const callbackTestSub = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.state)(() => new taggedjs__WEBPACK_IMPORTED_MODULE_3__.Subject());
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.onInit)(() => {
        console.info('providerDebug.ts: 👉 👉 i should only ever run once');
        callbackTestSub.subscribe(x => {
            callbacks((y) => {
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
      <button id="increase-arrow-provider-⚡️-1-button" onclick=${() => ++funcProvider.counter}
      >⚡️ increase upper.provider.test ${funcProvider.counter}</button>
      <span>
      ⚡️<span id="increase-arrow-provider-⚡️-1-display">${funcProvider.counter}</span>
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
      <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeInDown} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.fadeOutUp}>
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCountDiv: () => (/* binding */ renderCountDiv)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const renderCountDiv = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ renderCount, name }) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<div><small>(${name} render count ${renderCount})</small></div>`);


/***/ }),

/***/ "./src/tableDebug.component.ts":
/*!*************************************!*\
  !*** ./src/tableDebug.component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tableDebug: () => (/* binding */ tableDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

const tableDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(() => {
    let showCell = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(true)(x => [showCell, showCell = x]);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tagDebug: () => (/* binding */ tagDebug),
/* harmony export */   tagDebugProvider: () => (/* binding */ tagDebugProvider),
/* harmony export */   upperTagDebugProvider: () => (/* binding */ upperTagDebugProvider)
/* harmony export */ });
/* harmony import */ var _PropsDebug_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropsDebug.component */ "./src/PropsDebug.component.ts");
/* harmony import */ var _arrayTests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrayTests */ "./src/arrayTests.ts");
/* harmony import */ var _intervalDebug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intervalDebug */ "./src/intervalDebug.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./animations */ "./src/animations.ts");






function tagDebugProvider() {
    const upper = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(upperTagDebugProvider);
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
const tagDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)(() => {
    let _firstState = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)('tagJsDebug.js')(x => [_firstState, _firstState = x]);
    let showIntervals = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(false)(x => [showIntervals, showIntervals = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `<!-- tagDebug.js -->
    <h3 id="debugging">Debugging</h3>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_4__.renderCountDiv)({ renderCount, name: 'tagJsDebug' })}

    <div style="display:flex;flex-wrap:wrap;gap:1em">
      <fieldset style="flex:4 4 40em">
        <legend>arrays</legend>
        ${(0,_arrayTests__WEBPACK_IMPORTED_MODULE_1__.arrayTests)()}
      </fieldset>
    
      <fieldset id="debug-intervals" style="flex:2 2 20em">
        <legend>
          Interval Testing
        </legend>

        <button
          onclick=${() => showIntervals = !showIntervals}
        >hide/show</button>

        ${showIntervals && (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `
          <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_5__.fadeInDown} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_5__.fadeOutUp}>
            <div>${(0,_intervalDebug__WEBPACK_IMPORTED_MODULE_2__.intervalTester0)()}</div>
            <hr />
            <div>${(0,_intervalDebug__WEBPACK_IMPORTED_MODULE_2__.intervalTester1)()}</div>
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arraySwitching: () => (/* binding */ arraySwitching),
/* harmony export */   tag1: () => (/* binding */ tag1),
/* harmony export */   tag2: () => (/* binding */ tag2),
/* harmony export */   tag3: () => (/* binding */ tag3),
/* harmony export */   tagSwitchDebug: () => (/* binding */ tagSwitchDebug),
/* harmony export */   ternaryPropTest: () => (/* binding */ ternaryPropTest)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


const tagSwitchDebug = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)((_t = 'tagSwitchDebug') => {
    let selectedTag = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(null)(x => [selectedTag, selectedTag = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
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
        case "":
            tagOutput = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<div id="empty-string-1"></div>`;
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
        case "":
            tagOutput2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `<div id="select-tag-above">empty-string, select tag above</div>`;
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
    <div id="selectTag-wrap">
      selectedTag: |${selectedTag === null && 'null' ||
        selectedTag === undefined && 'undefined' ||
        selectedTag === '' && 'empty-string' ||
        selectedTag}|
    </div>
    
    <select id="tag-switch-dropdown" onchange=${changeSelectedTag}>
	    <option></option>
      <!-- TODO: implement selected attribute --->
	    <option value="" ${typeof (selectedTag) === 'string' && !selectedTag.length ? { selected: true } : {}}>empty-string</option>
	    <option value="undefined" ${selectedTag === undefined ? { selected: true } : {}}>undefined</option>
	    <option value="null" ${selectedTag === null ? { selected: true } : {}}>null</option>
	    <option value="1" ${selectedTag === '1' ? { selected: true } : {}}>tag 1</option>
	    <option value="2" ${selectedTag === '2' ? { selected: true } : {}}>tag 2</option>
	    <option value="3" ${selectedTag === '3' ? { selected: true } : {}}>tag 3</option>
    </select>

    <div id="switch-tests-wrap" style="display:flex;flex-wrap:wrap;gap:1em;">
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

      <div id="arraySwitching-test-wrap" style="border:1px solid red;flex-grow:1">
        <h3>Test 4 - arraySwitching</h3>
        <div id="arraySwitching-wrap">${arraySwitching({ selectedTag })}</div>
      </div>
    </div>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tagSwitchDebug' })}
  `;
});
const ternaryPropTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ selectedTag }) => {
    const outTag = selectedTag === '3' ? tag3({ title: 'ternaryPropTest' }) : tag1({ title: 'ternaryPropTest' });
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div id="ternaryPropTest-wrap">
      ${selectedTag}:${outTag}
    </div>
  `;
});
const tag1 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ title }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div id="tag1" style="border:1px solid orange;">
      <div id="tagSwitch-1-hello">Hello 1 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tag1' })}
    </div>
  `;
});
const tag2 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ title }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div id="tag2" style="border:1px solid orange;">
      <div id="tagSwitch-2-hello">Hello 2 ${title} World</div>
      <button onclick=${() => ++counter}>increase ${counter}</button>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'tag1' })}
    </div>
  `;
});
const tag3 = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ title }) => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [counter, counter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.letState)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <div  id="tag3" style="border:1px solid orange;">
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
        case '':
            return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) ``; // tests how .previousSibling works
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runTests: () => (/* binding */ runTests)
/* harmony export */ });
/* harmony import */ var _elmSelectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elmSelectors */ "./src/elmSelectors.ts");
/* harmony import */ var _expect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expect */ "./src/expect.ts");
/* harmony import */ var _expect_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expect.html */ "./src/expect.html.ts");



async function runTests() {
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('no template tags', () => {
        const templateTags = document.getElementsByTagName('template');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(templateTags.length).toBe(0, 'Expected no templates to be on document');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('elements exists', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(document.getElementById('h1-app')).toBeDefined();
        const toggleTest = document.getElementById('toggle-test');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest).toBeDefined();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest?.innerText).toBe('toggle test');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.describe)('content', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('basic', () => {
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectMatchedHtml)('#content-subject-pipe-display0', '#content-subject-pipe-display1');
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectMatchedHtml)('#content-combineLatest-pipe-display0', '#content-combineLatest-pipe-display1');
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('html', () => {
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectMatchedHtml)('#content-combineLatest-pipeHtml-display0', '#content-combineLatest-pipeHtml-display1');
        });
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('toggle test', () => {
        const toggleTest = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('toggle-test');
        toggleTest.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest?.innerText).toBe('toggle test true');
        toggleTest.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(toggleTest?.innerText).toBe('toggle test');
        const propsTextarea = document.getElementById('props-debug-textarea');
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(propsTextarea.value.replace(/\s/g, '')).toBe(`{"test":33,"x":"y"}`);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('basic increase counter', () => {
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#conditional-counter', 0);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#❤️-increase-counter', '#❤️-counter-display');
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#❤️-inner-counter', '#❤️-inner-display');
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#standalone-counter', '#standalone-display');
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#conditional-counter', 1);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#conditional-counter', '#conditional-display');
        // test again after higher elements have had reruns
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#❤️-inner-counter', '#❤️-inner-display');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.describe)('props', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('basics', () => {
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'], ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display']);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'], ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display']);
            // the number of times the watch counted a change happens to match that increase counter
            const funUpdateValue = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('propsOneLevelFunUpdate-🥩-display').innerHTML;
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.queryOneInnerHTML)('#propsDebug-🥩-change-display')).toBe(funUpdateValue);
            const ownerHTML = document.querySelectorAll('#propsDebug-🥩-0-display')[0].innerHTML;
            const parentHTML = document.querySelectorAll('#propsDebug-🥩-1-display')[0].innerHTML;
            const childHTML = document.querySelectorAll('#propsOneLevelFunUpdate-🥩-display')[0].innerHTML;
            const ownerNum = Number(ownerHTML);
            const parentNum = Number(parentHTML);
            const childNum = Number(childHTML);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(parentNum).toBe(childNum);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(ownerNum + 2).toBe(parentNum); // testing of setProp() doesn't change owner
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('props as functions', () => {
            const syncCounter = Number((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.htmlById)('sync-prop-number-display'));
            // const syncCounter = Number( htmlById('sync-prop-child-display') )
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectMatchedHtml)('#sync-prop-number-display', '#sync-prop-child-display');
            (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('sync-prop-child-button').click();
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectHTML)('#sync-prop-number-display', (syncCounter + 2).toString());
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#nothing-prop-counter-button', '#nothing-prop-counter-display');
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectHTML)('#sync-prop-number-display', (syncCounter + 2).toString());
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectMatchedHtml)('#sync-prop-counter-display', '#nothing-prop-counter-display');
        });
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('providers', async () => {
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'], ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display']);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'], ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display']);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('provider debug', () => {
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
        // change a counter in the parent element
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
        // now ensure that this inner tag still operates correctly even though parent just rendered but i did not from that change
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.describe)('tagSwitching', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('0', () => {
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#select-tag-above')).toBe(1, 'Expected select-tag-above element to be defined');
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tag-switch-dropdown')).toBe(1, 'Expected one #tag-switch-dropdown');
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-1-hello')).toBe(2, 'Expected two #tagSwitch-1-hello elements');
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-2-hello')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-3-hello')).toBe(0);
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('1', () => {
            const dropdown = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('tag-switch-dropdown');
            dropdown.value = "1";
            dropdown.onchange({ target: dropdown });
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-1-hello', 5);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-2-hello')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-3-hello')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#select-tag-above')).toBe(0);
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('2', () => {
            const dropdown = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('tag-switch-dropdown');
            dropdown.value = "2";
            dropdown.onchange({ target: dropdown });
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-1-hello', 2);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-2-hello', 4);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-3-hello')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#select-tag-above')).toBe(0);
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('3', () => {
            const dropdown = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('tag-switch-dropdown');
            dropdown.value = "3";
            dropdown.onchange({ target: dropdown });
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-1-hello')).toBe(0, 'Expected no hello 1s');
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#tagSwitch-2-hello')).toBe(0);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-3-hello', 7);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#select-tag-above')).toBe(0);
        });
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('4', () => {
            const dropdown = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('tag-switch-dropdown');
            dropdown.value = "";
            dropdown.onchange({ target: dropdown });
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#select-tag-above', 1);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tag-switch-dropdown', 1);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-1-hello', 2);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-2-hello', 0);
            (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#tagSwitch-3-hello', 0);
        });
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('child tests', () => {
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display');
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testCounterElements)('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display');
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#childTests-button', '#childTests-display'], ['#child-as-prop-test-button', '#child-as-prop-test-display'], ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display']);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.testDuelCounterElements)(['#childTests-button', '#childTests-display'], ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.describe)('array testing', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('array basics', () => {
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#array-test-push-item')).toBe(1);
            const insideCount = (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#score-data-0-1-inside-button');
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(insideCount).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#score-data-0-1-outside-button')).toBe(0);
            document.getElementById('array-test-push-item')?.click();
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#score-data-0-1-inside-button')).toBe(1);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#score-data-0-1-outside-button')).toBe(1);
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
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('🗑️ deletes', async () => {
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#player-remove-promise-btn-0')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#player-edit-btn-0')).toBe(1);
            await (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('player-edit-btn-0').onclick();
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#player-remove-promise-btn-0')).toBe(1);
            await (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('player-remove-promise-btn-0').onclick();
            await delay(1000); // animation
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#player-remove-promise-btn-0')).toBe(0);
            (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.elmCount)('#player-edit-btn-0')).toBe(0);
        });
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('🪞 mirror testing', async () => {
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#mirror-counter-display', 2);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#mirror-counter-button', 2);
        const counter = Number((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.htmlById)('mirror-counter-display'));
        (0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.byId)('mirror-counter-button').click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(counter + 1).toBe(Number((0,_elmSelectors__WEBPACK_IMPORTED_MODULE_0__.htmlById)('mirror-counter-display')));
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectElmCount)('#mirror-counter-display', 2);
        (0,_expect_html__WEBPACK_IMPORTED_MODULE_2__.expectMatchedHtml)('#mirror-counter-display');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_1__.it)('has no templates', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_1__.expect)(document.getElementsByTagName('template').length).toBe(0);
    });
    try {
        await (0,_expect__WEBPACK_IMPORTED_MODULE_1__.execute)();
        console.info('✅ all tests passed');
        return true;
    }
    catch (error) {
        console.error('❌ tests failed: ' + error.message, error);
        return false;
    }
}
function delay(time) {
    return new Promise((res) => setTimeout(res, time));
}


/***/ }),

/***/ "../main/ts/ElementTargetEvent.interface.ts":
/*!**************************************************!*\
  !*** ../main/ts/ElementTargetEvent.interface.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../main/ts/Tag.class.ts":
/*!*******************************!*\
  !*** ../main/ts/Tag.class.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tag: () => (/* binding */ Tag),
/* harmony export */   escapeSearch: () => (/* binding */ escapeSearch),
/* harmony export */   escapeVariable: () => (/* binding */ escapeVariable),
/* harmony export */   variablePrefix: () => (/* binding */ variablePrefix)
/* harmony export */ });
const variablePrefix = '__tagvar';
const escapeVariable = '--' + variablePrefix + '--';
const escapeSearch = new RegExp(escapeVariable, 'g');
class Tag {
    strings;
    values;
    isTagClass = true;
    // present only when an array. Populated by Tag.key()
    memory = {};
    templater;
    constructor(strings, values) {
        this.strings = strings;
        this.values = values;
    }
    /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
    key(arrayValue) {
        this.memory.arrayValue = arrayValue;
        return this;
    }
}


/***/ }),

/***/ "../main/ts/TagSupport.class.ts":
/*!**************************************!*\
  !*** ../main/ts/TagSupport.class.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTagSupport: () => (/* binding */ BaseTagSupport),
/* harmony export */   TagSupport: () => (/* binding */ TagSupport)
/* harmony export */ });
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _cloneValueArray_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cloneValueArray.function */ "../main/ts/cloneValueArray.function.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _destroy_support__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./destroy.support */ "../main/ts/destroy.support.ts");
/* harmony import */ var _elementDestroyCheck_function__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elementDestroyCheck.function */ "../main/ts/elementDestroyCheck.function.ts");
/* harmony import */ var _updateContextItem_function__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updateContextItem.function */ "../main/ts/updateContextItem.function.ts");
/* harmony import */ var _processNewValue_function__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./processNewValue.function */ "../main/ts/processNewValue.function.ts");
/* harmony import */ var _setTagPlaceholder_function__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./setTagPlaceholder.function */ "../main/ts/setTagPlaceholder.function.ts");
/* harmony import */ var _interpolations_interpolateElement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./interpolations/interpolateElement */ "../main/ts/interpolations/interpolateElement.ts");
/* harmony import */ var _interpolations_interpolateTemplate__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./interpolations/interpolateTemplate */ "../main/ts/interpolations/interpolateTemplate.ts");
/* harmony import */ var _afterInterpolateElement_function__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./afterInterpolateElement.function */ "../main/ts/afterInterpolateElement.function.ts");
/* harmony import */ var _renderSubjectComponent_function__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./renderSubjectComponent.function */ "../main/ts/renderSubjectComponent.function.ts");















const prefixSearch = new RegExp(_Tag_class__WEBPACK_IMPORTED_MODULE_0__.variablePrefix, 'g');
/** used only for apps, otherwise use TagSupport */
class BaseTagSupport {
    templater;
    subject;
    isApp = true;
    appElement; // only seen on this.getAppElement().appElement
    propsConfig;
    // stays with current render
    memory = {
        state: [],
    };
    // travels with all rerenderings
    global = {
        context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
        providers: [],
        /** Indicator of re-rending. Saves from double rending something already rendered */
        renderCount: 0,
        deleted: false,
        subscriptions: []
    };
    constructor(templater, subject) {
        this.templater = templater;
        this.subject = subject;
        const children = templater.children; // children tags passed in as arguments
        const kidValue = children.value;
        const props = templater.props; // natural props
        const latestCloned = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_1__.deepClone)(props);
        this.propsConfig = {
            latest: props,
            latestCloned, // assume its HTML children and then detect
            lastClonedKidValues: kidValue.map(kid => {
                const cloneValues = (0,_cloneValueArray_function__WEBPACK_IMPORTED_MODULE_3__.cloneValueArray)(kid.values);
                return cloneValues;
            })
        };
        // if the latest props are not HTML children, then clone the props for later render cycles to compare
        if (!(0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagTemplater)(props) && !(0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagClass)(props)) {
            this.propsConfig.latestCloned = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_1__.deepClone)(latestCloned);
        }
    }
}
class TagSupport extends BaseTagSupport {
    templater;
    ownerTagSupport;
    subject;
    version;
    isApp = false;
    hasLiveElements = false;
    childTags = []; // tags on me
    clones = []; // elements on document. Needed at destroy process to know what to destroy
    // may not be needed anymore?
    strings;
    values;
    lastTemplateString = undefined; // used to compare templates for updates
    constructor(templater, // at runtime rendering of a tag, it needs to be married to a new TagSupport()
    ownerTagSupport, subject, version = 0) {
        super(templater, subject);
        this.templater = templater;
        this.ownerTagSupport = ownerTagSupport;
        this.subject = subject;
        this.version = version;
    }
    destroy(options = {
        stagger: 0,
        byParent: false, // Only destroy clones of direct children
    }) {
        const global = this.global;
        const subject = this.subject;
        // put back down the template tag
        const insertBefore = global.insertBefore;
        if (insertBefore.nodeName === 'TEMPLATE') {
            const placeholder = global.placeholder;
            if (placeholder && !('arrayValue' in this.memory)) {
                if (!options.byParent) {
                    (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_4__.restoreTagMarker)(this);
                }
            }
        }
        // the isComponent check maybe able to be removed
        const isComponent = (0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagComponent)(this.templater) ? true : false;
        if (isComponent) {
            (0,_tagRunner__WEBPACK_IMPORTED_MODULE_5__.runBeforeDestroy)(this, this);
        }
        const childTags = options.byParent ? [] : (0,_destroy_support__WEBPACK_IMPORTED_MODULE_6__.getChildTagsToDestroy)(this.childTags);
        // signify that no further event rendering should take place by making logic think a render occurred during event
        // signify immediately child has been deleted (looked for during event processing)
        childTags.forEach(child => {
            const subGlobal = child.global;
            delete subGlobal.newest;
            subGlobal.deleted = true;
            // delete subGlobal.placeholder
            // restoreTagMarker(child)
        });
        // data reset
        delete global.placeholder;
        delete subject.tagSupport;
        global.context = {};
        delete global.oldest;
        delete global.newest;
        global.deleted = true;
        this.childTags.length = 0;
        this.hasLiveElements = false;
        delete subject.tagSupport;
        this.destroySubscriptions();
        let mainPromise;
        if (this.ownerTagSupport) {
            this.ownerTagSupport.childTags = this.ownerTagSupport.childTags.filter(child => child !== this);
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
        const global = this.global;
        global.subscriptions.forEach(cloneSub => cloneSub.unsubscribe());
        global.subscriptions.length = 0;
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
    /** Reviews elements for the presences of ondestroy */
    checkCloneRemoval(clone, stagger) {
        let promise;
        const customElm = clone;
        if (customElm.ondestroy) {
            promise = (0,_elementDestroyCheck_function__WEBPACK_IMPORTED_MODULE_7__.elementDestroyCheck)(customElm, stagger);
        }
        const next = () => {
            clone.parentNode?.removeChild(clone);
            const ownerSupport = this.ownerTagSupport;
            if (ownerSupport) {
                // Sometimes my clones were first registered to my owner, remove them from owner
                ownerSupport.clones = ownerSupport.clones.filter(compareClone => compareClone !== clone);
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
    update() {
        return this.updateContext(this.global.context);
    }
    updateBy(tagSupport) {
        const tempTag = tagSupport.templater.tag;
        this.updateConfig(tempTag.strings, tempTag.values);
    }
    updateConfig(strings, values) {
        this.strings = strings;
        this.updateValues(values);
    }
    updateValues(values) {
        this.values = values;
        return this.updateContext(this.global.context);
    }
    updateContext(context) {
        const thisTag = this.templater.tag;
        const strings = this.strings || thisTag.strings;
        const values = this.values || thisTag.values;
        strings.map((_string, index) => {
            const variableName = _Tag_class__WEBPACK_IMPORTED_MODULE_0__.variablePrefix + index;
            const hasValue = values.length > index;
            const value = values[index];
            // is something already there?
            const exists = variableName in context;
            if (exists) {
                return (0,_updateContextItem_function__WEBPACK_IMPORTED_MODULE_8__.updateContextItem)(context, variableName, value);
            }
            if (!hasValue) {
                return;
            }
            // 🆕 First time values below
            context[variableName] = (0,_processNewValue_function__WEBPACK_IMPORTED_MODULE_9__.processNewValue)(hasValue, value, this);
        });
        return context;
    }
    /** Function that kicks off actually putting tags down as HTML elements */
    buildBeforeElement(insertBefore, options = {
        forceElement: false,
        counts: { added: 0, removed: 0 },
    }) {
        const subject = this.subject;
        const global = this.global;
        global.insertBefore = insertBefore;
        if (!global.placeholder) {
            (0,_setTagPlaceholder_function__WEBPACK_IMPORTED_MODULE_10__.setTagPlaceholder)(global);
        }
        const placeholderElm = global.placeholder;
        global.oldest = this;
        global.newest = this;
        subject.tagSupport = this;
        this.hasLiveElements = true;
        // remove old clones
        if (this.clones.length) {
            // this.destroyClones()
            // this.clones.forEach(clone => this.checkCloneRemoval(clone, 0))
        }
        global.insertBefore = insertBefore;
        const context = this.update();
        const template = this.getTemplate();
        const isForceElement = options.forceElement;
        const elementContainer = document.createElement('div');
        elementContainer.id = 'tag-temp-holder';
        // render content with a first child that we can know is our first element
        elementContainer.innerHTML = `<template id="temp-template-tag-wrap">${template.string}</template>`;
        // Search/replace innerHTML variables but don't interpolate tag components just yet
        const { tagComponents } = (0,_interpolations_interpolateElement__WEBPACK_IMPORTED_MODULE_11__.interpolateElement)(elementContainer, context, template, this, // ownerSupport,
        {
            forceElement: options.forceElement,
            counts: options.counts
        });
        (0,_afterInterpolateElement_function__WEBPACK_IMPORTED_MODULE_13__.afterInterpolateElement)(elementContainer, placeholderElm, this, // ownerSupport
        context, options);
        // Any tag components that were found should be processed AFTER the owner processes its elements. Avoid double processing of elements attributes like (oninit)=${}
        tagComponents.forEach(tagComponent => {
            (0,_interpolations_interpolateTemplate__WEBPACK_IMPORTED_MODULE_12__.subscribeToTemplate)(tagComponent.insertBefore, tagComponent.subject, tagComponent.ownerSupport, options.counts, { isForceElement });
            (0,_afterInterpolateElement_function__WEBPACK_IMPORTED_MODULE_13__.afterInterpolateElement)(elementContainer, tagComponent.insertBefore, tagComponent.ownerSupport, context, options);
        });
    }
    getTemplate() {
        const thisTag = this.templater.tag;
        const strings = this.strings || thisTag.strings;
        const values = this.values || thisTag.values;
        const string = strings.map((string, index) => {
            const safeString = string.replace(prefixSearch, _Tag_class__WEBPACK_IMPORTED_MODULE_0__.escapeVariable);
            const endString = safeString + (values.length > index ? `{${_Tag_class__WEBPACK_IMPORTED_MODULE_0__.variablePrefix}${index}}` : '');
            const trimString = endString.replace(/>\s*/g, '>').replace(/\s*</g, '<');
            return trimString;
        }).join('');
        const interpolation = (0,_interpolations_interpolateElement__WEBPACK_IMPORTED_MODULE_11__.interpolateString)(string);
        this.lastTemplateString = interpolation.string;
        return {
            interpolation,
            string: interpolation.string,
            strings,
            values,
            context: this.global.context || {},
        };
    }
    /** Used during HMR only where static content itself could have been edited */
    async rebuild() {
        delete this.strings; // seek the templater strings instead now
        delete this.values; // seek the templater strings instead now
        restoreTagMarkers(this);
        const newSupport = (0,_renderSubjectComponent_function__WEBPACK_IMPORTED_MODULE_14__.renderSubjectComponent)(this.subject, this, this.ownerTagSupport);
        await this.destroy();
        newSupport.buildBeforeElement(this.global.insertBefore, {
            forceElement: true,
            counts: { added: 0, removed: 0 },
        });
        return newSupport;
    }
    getAppElement() {
        let tag = this;
        while (tag.ownerTagSupport) {
            tag = tag.ownerTagSupport;
        }
        return tag;
    }
}
function restoreTagMarkers(support) {
    (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_4__.restoreTagMarker)(support);
    support.childTags.forEach(childTag => restoreTagMarkers(childTag.global.oldest));
}


/***/ }),

/***/ "../main/ts/TemplaterResult.class.ts":
/*!*******************************************!*\
  !*** ../main/ts/TemplaterResult.class.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplaterResult: () => (/* binding */ TemplaterResult)
/* harmony export */ });
class TemplaterResult {
    props;
    children;
    isTemplater = true;
    tagged;
    wrapper;
    tag;
    constructor(props, children) {
        this.props = props;
        this.children = children;
    }
}


/***/ }),

/***/ "../main/ts/afterInterpolateElement.function.ts":
/*!******************************************************!*\
  !*** ../main/ts/afterInterpolateElement.function.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterInterpolateElement: () => (/* binding */ afterInterpolateElement)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "../main/ts/render.ts");
/* harmony import */ var _interpolations_interpolateTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interpolations/interpolateTemplate */ "../main/ts/interpolations/interpolateTemplate.ts");


function afterInterpolateElement(container, insertBefore, tagSupport, 
// preClones: Clones,
context, options) {
    const clones = (0,_render__WEBPACK_IMPORTED_MODULE_0__.buildClones)(container, insertBefore);
    if (!clones.length) {
        return clones;
    }
    clones.forEach(clone => (0,_interpolations_interpolateTemplate__WEBPACK_IMPORTED_MODULE_1__.afterElmBuild)(clone, options, context, tagSupport));
    tagSupport.clones.push(...clones);
    return clones;
}


/***/ }),

/***/ "../main/ts/alterProps.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/alterProps.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alterProps: () => (/* binding */ alterProps),
/* harmony export */   callbackPropOwner: () => (/* binding */ callbackPropOwner)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "../main/ts/state/index.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");





/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
function alterProps(props, ownerSupport) {
    const isPropTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTag)(props);
    const watchProps = isPropTag ? 0 : props;
    const newProps = resetFunctionProps(watchProps, ownerSupport);
    return newProps;
}
function resetFunctionProps(props, ownerSupport) {
    if (typeof (props) !== 'object') {
        return props;
    }
    const newProps = props;
    // BELOW: Do not clone because if first argument is object, the memory ref back is lost
    // const newProps = {...props} 
    Object.entries(newProps).forEach(([name, value]) => {
        if (value instanceof Function) {
            const toCall = newProps[name].toCall;
            if (toCall) {
                return; // already previously converted
            }
            newProps[name] = (...args) => {
                return newProps[name].toCall(...args); // what gets called can switch over parent state changes
            };
            // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
            newProps[name].toCall = (...args) => {
                return callbackPropOwner(value, args, ownerSupport);
            };
            newProps[name].original = value;
            return;
        }
    });
    return newProps;
}
function callbackPropOwner(toCall, callWith, ownerSupport) {
    // const renderCount = ownerSupport.global.renderCount
    const cycle = (0,_tagRunner__WEBPACK_IMPORTED_MODULE_4__.isInCycle)();
    const result = toCall(...callWith);
    const run = () => {
        const lastestOwner = ownerSupport.global.newest;
        if (cycle) {
            // appears a prop function was called sync/immediately so lets see if owner changed state
            const allMatched = lastestOwner.memory.state.every(state => {
                const lastValue = state.lastValue;
                const get = state.get();
                const equal = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)((0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(lastValue), get);
                return equal;
            });
            if (allMatched) {
                return result; // owner did not change
            }
        }
        const newest = (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__.renderTagSupport)(lastestOwner, true);
        lastestOwner.global.newest = newest;
        return result;
    };
    if (!cycle) {
        return run();
    }
    _state__WEBPACK_IMPORTED_MODULE_3__.setUse.memory.tagClosed$.toCallback(run);
    return result;
}


/***/ }),

/***/ "../main/ts/checkDestroyPrevious.function.ts":
/*!***************************************************!*\
  !*** ../main/ts/checkDestroyPrevious.function.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkDestroyPrevious: () => (/* binding */ checkDestroyPrevious),
/* harmony export */   destroyArrayTag: () => (/* binding */ destroyArrayTag),
/* harmony export */   restoreTagMarker: () => (/* binding */ restoreTagMarker)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");
/* harmony import */ var _insertAfter_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insertAfter.function */ "../main/ts/insertAfter.function.ts");




function checkDestroyPrevious(subject, // existing.value is the old value
newValue, insertBefore) {
    const arraySubject = subject;
    const wasArray = arraySubject.lastArray;
    // no longer an array
    if (wasArray && !(0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(newValue)) {
        const placeholderElm = arraySubject.placeholder;
        delete arraySubject.lastArray;
        delete arraySubject.placeholder;
        (0,_insertAfter_function__WEBPACK_IMPORTED_MODULE_3__.insertAfter)(insertBefore, placeholderElm);
        wasArray.forEach(({ tagSupport }) => destroyArrayTag(tagSupport, { added: 0, removed: 0 }));
        return 'array';
    }
    const tagSubject = subject;
    const lastSupport = tagSubject.tagSupport;
    // no longer tag or component?
    if (lastSupport) {
        const isValueTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTag)(newValue);
        const isSubjectTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTag)(subject.value);
        if (isSubjectTag && isValueTag) {
            const newTag = newValue;
            // its a different tag now
            if (!(0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__.isLikeTags)(newTag, lastSupport)) {
                // put template back down
                restoreTagMarker(lastSupport);
                (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(lastSupport, tagSubject);
                return 2;
            }
            return false;
        }
        const isValueTagComponent = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagComponent)(newValue);
        if (isValueTagComponent) {
            return false; // its still a tag component
        }
        // put template back down
        restoreTagMarker(lastSupport);
        // destroy old component, value is not a component
        (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(lastSupport, tagSubject);
        return 'different-tag';
    }
    const displaySubject = subject;
    const hasLastValue = 'lastValue' in displaySubject;
    const lastValue = displaySubject.lastValue; // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
    // was simple value but now something bigger
    if (hasLastValue && lastValue !== newValue) {
        destroySimpleValue(insertBefore, displaySubject);
        return 'changed-simple-value';
    }
    return false;
}
function destroyArrayTag(tagSupport, counts) {
    (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagSupportPast)(tagSupport);
    tagSupport.destroy({
        stagger: counts.removed++,
    });
    const insertBefore = tagSupport.global.insertBefore;
    const parentNode = insertBefore.parentNode;
    parentNode.removeChild(insertBefore);
}
function destroySimpleValue(insertBefore, // always a template tag
subject) {
    const clone = subject.clone;
    const parent = clone.parentNode;
    // 1 put the template back down
    parent.insertBefore(insertBefore, clone);
    parent.removeChild(clone);
    delete subject.clone;
    delete subject.lastValue;
}
function restoreTagMarker(lastSupport) {
    const insertBefore = lastSupport.global.insertBefore;
    const global = lastSupport.global;
    const placeholderElm = global.placeholder;
    if (placeholderElm) {
        (0,_insertAfter_function__WEBPACK_IMPORTED_MODULE_3__.insertAfter)(insertBefore, placeholderElm);
        delete global.placeholder;
    }
}


/***/ }),

/***/ "../main/ts/cloneValueArray.function.ts":
/*!**********************************************!*\
  !*** ../main/ts/cloneValueArray.function.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloneValueArray: () => (/* binding */ cloneValueArray)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");


function cloneValueArray(values) {
    return values.map((value) => {
        const tag = value;
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value)) {
            const tagComponent = value;
            return (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(tagComponent.props);
        }
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagClass)(tag) || (0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagTemplater)(tag)) {
            return cloneValueArray(tag.values);
        }
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagArray)(tag)) {
            return cloneValueArray(tag);
        }
        return (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(value);
    });
}


/***/ }),

/***/ "../main/ts/deepFunctions.ts":
/*!***********************************!*\
  !*** ../main/ts/deepFunctions.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
    const directEqual = obj1 === obj2;
    if (directEqual || isSameFunctions(obj1, obj2)) {
        return true;
    }
    // If obj is already visited, return the cloned reference
    if (visited.has(obj1)) {
        return true;
    }
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        // both are dates and were already determined not the same
        if (obj1 instanceof Date && obj2 instanceof Date) {
            return obj1.getTime() === obj2.getTime();
        }
        // Register the cloned object to avoid cyclic references
        visited.set(obj1, 0);
        // Check if obj1 and obj2 are both arrays
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            return isArrayDeepEqual(obj1, obj2, visited);
        }
        else if (Array.isArray(obj1) || Array.isArray(obj2)) {
            // One is an array, and the other is not
            return false;
        }
        return isObjectDeepEqual(obj1, obj2, visited);
    }
    return false;
}
function isObjectDeepEqual(obj1, obj2, visited) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length === 0 && keys2.length === 0) {
        return true;
    }
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const keyFound = keys2.includes(key);
        if (!keyFound || !isDeepEqual(obj1[key], obj2[key], visited)) {
            return false;
        }
    }
    return true;
}
function isArrayDeepEqual(obj1, obj2, visited) {
    if (obj1.length !== obj2.length) {
        return false;
    }
    for (let i = 0; i < obj1.length; i++) {
        if (!isDeepEqual(obj1[i], obj2[i], visited)) {
            return false;
        }
    }
    return true;
}
function isSameFunctions(fn0, fn1) {
    const bothFunction = fn0 instanceof Function && fn1 instanceof Function;
    return bothFunction && fn0.toString() === fn1.toString();
}


/***/ }),

/***/ "../main/ts/destroy.support.ts":
/*!*************************************!*\
  !*** ../main/ts/destroy.support.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getChildTagsToDestroy: () => (/* binding */ getChildTagsToDestroy)
/* harmony export */ });
function getChildTagsToDestroy(childTags, allTags = []) {
    for (let index = childTags.length - 1; index >= 0; --index) {
        const cTag = childTags[index];
        allTags.push(cTag);
        childTags.splice(index, 1);
        getChildTagsToDestroy(cTag.childTags, allTags);
    }
    return allTags;
}


/***/ }),

/***/ "../main/ts/destroyTag.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/destroyTag.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   destroyTagMemory: () => (/* binding */ destroyTagMemory),
/* harmony export */   destroyTagSupportPast: () => (/* binding */ destroyTagSupportPast)
/* harmony export */ });
function destroyTagMemory(oldTagSupport, subject) {
    // must destroy oldest which is tag with elements on stage
    const oldest = oldTagSupport.global.oldest;
    oldest.destroy();
    destroyTagSupportPast(oldTagSupport);
    oldTagSupport.global.context = {};
}
function destroyTagSupportPast(oldTagSupport) {
    delete oldTagSupport.global.oldest;
    delete oldTagSupport.global.newest;
}


/***/ }),

/***/ "../main/ts/elementDestroyCheck.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/elementDestroyCheck.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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

/***/ "../main/ts/errors.ts":
/*!****************************!*\
  !*** ../main/ts/errors.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayNoKeyError: () => (/* binding */ ArrayNoKeyError),
/* harmony export */   StateMismatchError: () => (/* binding */ StateMismatchError),
/* harmony export */   SyncCallbackError: () => (/* binding */ SyncCallbackError),
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
class SyncCallbackError extends TagError {
    constructor(message, details) {
        super(message, 'sync-callback-error', details);
        this.name = SyncCallbackError.name;
    }
}


/***/ }),

/***/ "../main/ts/hasTagSupportChanged.function.ts":
/*!***************************************************!*\
  !*** ../main/ts/hasTagSupportChanged.function.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasKidsChanged: () => (/* binding */ hasKidsChanged),
/* harmony export */   hasPropChanges: () => (/* binding */ hasPropChanges),
/* harmony export */   hasTagSupportChanged: () => (/* binding */ hasTagSupportChanged)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");

function hasTagSupportChanged(oldTagSupport, newTagSupport, newTemplater) {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   html: () => (/* binding */ html)
/* harmony export */ });
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");

function html(strings, ...values) {
    return new _Tag_class__WEBPACK_IMPORTED_MODULE_0__.Tag(strings, values);
}


/***/ }),

/***/ "../main/ts/index.ts":
/*!***************************!*\
  !*** ../main/ts/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayNoKeyError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_2__.ArrayNoKeyError),
/* harmony export */   BaseTagSupport: () => (/* reexport safe */ _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__.BaseTagSupport),
/* harmony export */   StateMismatchError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_2__.StateMismatchError),
/* harmony export */   Subject: () => (/* reexport safe */ _subject_index__WEBPACK_IMPORTED_MODULE_5__.Subject),
/* harmony export */   SyncCallbackError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_2__.SyncCallbackError),
/* harmony export */   Tag: () => (/* reexport safe */ _Tag_class__WEBPACK_IMPORTED_MODULE_10__.Tag),
/* harmony export */   TagError: () => (/* reexport safe */ _errors__WEBPACK_IMPORTED_MODULE_2__.TagError),
/* harmony export */   TagSupport: () => (/* reexport safe */ _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__.TagSupport),
/* harmony export */   ValueSubject: () => (/* reexport safe */ _subject_index__WEBPACK_IMPORTED_MODULE_5__.ValueSubject),
/* harmony export */   callbackMaker: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.callbackMaker),
/* harmony export */   combineLatest: () => (/* reexport safe */ _subject_index__WEBPACK_IMPORTED_MODULE_5__.combineLatest),
/* harmony export */   hmr: () => (/* binding */ hmr),
/* harmony export */   html: () => (/* reexport safe */ _html__WEBPACK_IMPORTED_MODULE_1__.html),
/* harmony export */   interpolateElement: () => (/* reexport safe */ _interpolations_interpolateElement__WEBPACK_IMPORTED_MODULE_8__.interpolateElement),
/* harmony export */   interpolateString: () => (/* reexport safe */ _interpolations_interpolateElement__WEBPACK_IMPORTED_MODULE_8__.interpolateString),
/* harmony export */   isSubjectInstance: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_3__.isSubjectInstance),
/* harmony export */   isTag: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_3__.isTag),
/* harmony export */   isTagArray: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_3__.isTagArray),
/* harmony export */   isTagClass: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_3__.isTagClass),
/* harmony export */   isTagComponent: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_3__.isTagComponent),
/* harmony export */   isTagTemplater: () => (/* reexport safe */ _isInstance__WEBPACK_IMPORTED_MODULE_3__.isTagTemplater),
/* harmony export */   letState: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.letState),
/* harmony export */   onDestroy: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.onDestroy),
/* harmony export */   onInit: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.onInit),
/* harmony export */   providers: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.providers),
/* harmony export */   renderTagSupport: () => (/* reexport safe */ _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_12__.renderTagSupport),
/* harmony export */   renderWithSupport: () => (/* reexport safe */ _renderWithSupport_function__WEBPACK_IMPORTED_MODULE_13__.renderWithSupport),
/* harmony export */   runBeforeRender: () => (/* reexport safe */ _tagRunner__WEBPACK_IMPORTED_MODULE_11__.runBeforeRender),
/* harmony export */   setProp: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.setProp),
/* harmony export */   setUse: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.setUse),
/* harmony export */   state: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.state),
/* harmony export */   tag: () => (/* reexport safe */ _tag__WEBPACK_IMPORTED_MODULE_0__.tag),
/* harmony export */   tagElement: () => (/* reexport safe */ _tagElement__WEBPACK_IMPORTED_MODULE_9__.tagElement),
/* harmony export */   tags: () => (/* reexport safe */ _tag__WEBPACK_IMPORTED_MODULE_0__.tags),
/* harmony export */   watch: () => (/* reexport safe */ _state_index__WEBPACK_IMPORTED_MODULE_4__.watch),
/* harmony export */   willCallback: () => (/* reexport safe */ _subject_index__WEBPACK_IMPORTED_MODULE_5__.willCallback),
/* harmony export */   willPromise: () => (/* reexport safe */ _subject_index__WEBPACK_IMPORTED_MODULE_5__.willPromise),
/* harmony export */   willSubscribe: () => (/* reexport safe */ _subject_index__WEBPACK_IMPORTED_MODULE_5__.willSubscribe)
/* harmony export */ });
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag */ "../main/ts/tag.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html */ "../main/ts/html.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _state_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/index */ "../main/ts/state/index.ts");
/* harmony import */ var _subject_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subject/index */ "../main/ts/subject/index.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _ElementTargetEvent_interface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ElementTargetEvent.interface */ "../main/ts/ElementTargetEvent.interface.ts");
/* harmony import */ var _interpolations_interpolateElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./interpolations/interpolateElement */ "../main/ts/interpolations/interpolateElement.ts");
/* harmony import */ var _tagElement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tagElement */ "../main/ts/tagElement.ts");
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");
/* harmony import */ var _renderWithSupport_function__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./renderWithSupport.function */ "../main/ts/renderWithSupport.function.ts");

















const hmr = {
    tagElement: _tagElement__WEBPACK_IMPORTED_MODULE_9__.tagElement, renderWithSupport: _renderWithSupport_function__WEBPACK_IMPORTED_MODULE_13__.renderWithSupport, renderTagSupport: _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_12__.renderTagSupport,
};


/***/ }),

/***/ "../main/ts/insertAfter.function.ts":
/*!******************************************!*\
  !*** ../main/ts/insertAfter.function.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   insertAfter: () => (/* binding */ insertAfter)
/* harmony export */ });
// Function to insert element after reference element
function insertAfter(newNode, referenceNode) {
    const parentNode = referenceNode.parentNode;
    parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


/***/ }),

/***/ "../main/ts/interpolations/bindSubjectCallback.function.ts":
/*!*****************************************************************!*\
  !*** ../main/ts/interpolations/bindSubjectCallback.function.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindSubjectCallback: () => (/* binding */ bindSubjectCallback),
/* harmony export */   runTagCallback: () => (/* binding */ runTagCallback)
/* harmony export */ });
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");
/** File largely responsible for reacting to element events, such as onclick */

function bindSubjectCallback(value, tagSupport) {
    // Is this children? No override needed
    if (value.isChildOverride) {
        return value;
    }
    const subjectFunction = (element, args) => runTagCallback(value, tagSupport, element, args);
    // link back to original. Mostly used for <div oninit ondestroy> animations
    subjectFunction.tagFunction = value;
    return subjectFunction;
}
function runTagCallback(value, tagSupport, bindTo, args) {
    const renderCount = tagSupport.global.renderCount;
    const method = value.bind(bindTo);
    const callbackResult = method(...args);
    const sameRenderCount = renderCount === tagSupport.global.renderCount;
    // already rendered OR tag was deleted before event processing
    if (!sameRenderCount || tagSupport.global.deleted) {
        if (callbackResult instanceof Promise) {
            return callbackResult.then(() => {
                return 'promise-no-data-ever'; // tag was deleted during event processing
            });
        }
        return 'no-data-ever'; // already rendered
    }
    const newest = (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport.global.newest, true);
    tagSupport.global.newest = newest;
    if (callbackResult instanceof Promise) {
        return callbackResult.then(() => {
            if (tagSupport.global.deleted) {
                return 'promise-no-data-ever'; // tag was deleted during event processing
            }
            const newest = (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport.global.newest, true);
            tagSupport.global.newest = newest;
            return 'promise-no-data-ever';
        });
    }
    // Caller always expects a Promise
    return 'no-data-ever';
}


/***/ }),

/***/ "../main/ts/interpolations/elementInitCheck.ts":
/*!*****************************************************!*\
  !*** ../main/ts/interpolations/elementInitCheck.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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

/***/ "../main/ts/interpolations/inputAttribute.ts":
/*!***************************************************!*\
  !*** ../main/ts/interpolations/inputAttribute.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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

/***/ "../main/ts/interpolations/interpolateAttributes.ts":
/*!**********************************************************!*\
  !*** ../main/ts/interpolations/interpolateAttributes.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateAttributes: () => (/* binding */ interpolateAttributes)
/* harmony export */ });
/* harmony import */ var _processAttribute_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processAttribute.function */ "../main/ts/interpolations/processAttribute.function.ts");

function howToSetAttribute(element, name, value) {
    element.setAttribute(name, value);
}
function howToSetInputValue(element, name, value) {
    /*
    if((element as any)[name] === value) {
      return // its already the value we are setting
    }
    */
    element[name] = value;
}
function interpolateAttributes(child, scope, ownerSupport) {
    const attrNames = child.getAttributeNames();
    let howToSet = howToSetAttribute;
    attrNames.forEach(attrName => {
        if (child.nodeName === 'INPUT' && attrName === 'value') {
            howToSet = howToSetInputValue;
        }
        const value = child.getAttribute(attrName);
        (0,_processAttribute_function__WEBPACK_IMPORTED_MODULE_0__.processAttribute)(attrName, value, child, scope, ownerSupport, howToSet);
        howToSet = howToSetAttribute; // put back
    });
}


/***/ }),

/***/ "../main/ts/interpolations/interpolateContentTemplates.ts":
/*!****************************************************************!*\
  !*** ../main/ts/interpolations/interpolateContentTemplates.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateContentTemplates: () => (/* binding */ interpolateContentTemplates)
/* harmony export */ });
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpolateTemplate */ "../main/ts/interpolations/interpolateTemplate.ts");

function interpolateContentTemplates(element, context, tagSupport, options, children) {
    if (!children || element.tagName === 'TEMPLATE') {
        return { clones: [], tagComponents: [] }; // done
    }
    // counting for animation stagger computing
    const counts = options.counts;
    const clones = [];
    const tagComponents = [];
    const childArray = new Array(...children);
    childArray.forEach(child => {
        const { clones: nextClones, tagComponent } = (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__.interpolateTemplate)(child, context, tagSupport, counts, options);
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
                    const { tagComponent } = (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__.interpolateTemplate)(subChild, context, tagSupport, counts, options);
                    if (tagComponent) {
                        tagComponents.push(tagComponent);
                    }
                }
                const { clones: nextClones, tagComponents: nextTagComponent } = interpolateContentTemplates(subChild, context, tagSupport, options, subChild.children);
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

/***/ "../main/ts/interpolations/interpolateElement.ts":
/*!*******************************************************!*\
  !*** ../main/ts/interpolations/interpolateElement.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateElement: () => (/* binding */ interpolateElement),
/* harmony export */   interpolateString: () => (/* binding */ interpolateString)
/* harmony export */ });
/* harmony import */ var _interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpolateAttributes */ "../main/ts/interpolations/interpolateAttributes.ts");
/* harmony import */ var _interpolations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interpolations */ "../main/ts/interpolations/interpolations.ts");
/* harmony import */ var _interpolateContentTemplates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interpolateContentTemplates */ "../main/ts/interpolations/interpolateContentTemplates.ts");
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tag.class */ "../main/ts/Tag.class.ts");




/** Review elements within an element */
function interpolateElement(container, // element containing innerHTML to review interpolations
context, // variables used to evaluate
interpolatedTemplates, ownerSupport, options) {
    const clones = [];
    const tagComponents = [];
    const result = interpolatedTemplates.interpolation;
    const template = container.children[0];
    const children = template.content.children;
    if (result.keys.length) {
        const { clones: nextClones, tagComponents: nextTagComponents } = (0,_interpolateContentTemplates__WEBPACK_IMPORTED_MODULE_2__.interpolateContentTemplates)(container, context, ownerSupport, options, children);
        clones.push(...nextClones);
        tagComponents.push(...nextTagComponents);
    }
    (0,_interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__.interpolateAttributes)(container, context, ownerSupport);
    processChildrenAttributes(children, context, ownerSupport);
    return { clones, tagComponents };
}
function processChildrenAttributes(children, context, ownerSupport) {
    new Array(...children).forEach(child => {
        (0,_interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__.interpolateAttributes)(child, context, ownerSupport);
        if (child.children) {
            processChildrenAttributes(child.children, context, ownerSupport);
        }
    });
}
function interpolateString(string) {
    const result = (0,_interpolations__WEBPACK_IMPORTED_MODULE_1__.interpolateToTemplates)(string);
    result.string = result.string.replace(_Tag_class__WEBPACK_IMPORTED_MODULE_3__.escapeSearch, _Tag_class__WEBPACK_IMPORTED_MODULE_3__.variablePrefix);
    return result;
}


/***/ }),

/***/ "../main/ts/interpolations/interpolateTemplate.ts":
/*!********************************************************!*\
  !*** ../main/ts/interpolations/interpolateTemplate.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterElmBuild: () => (/* binding */ afterElmBuild),
/* harmony export */   interpolateTemplate: () => (/* binding */ interpolateTemplate),
/* harmony export */   subscribeToTemplate: () => (/* binding */ subscribeToTemplate)
/* harmony export */ });
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _elementInitCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elementInitCheck */ "../main/ts/interpolations/elementInitCheck.ts");
/* harmony import */ var _processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../processSubjectValue.function */ "../main/ts/processSubjectValue.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _scanTextAreaValue_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scanTextAreaValue.function */ "../main/ts/interpolations/scanTextAreaValue.function.ts");
/* harmony import */ var _updateExistingValue_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../updateExistingValue.function */ "../main/ts/updateExistingValue.function.ts");






function interpolateTemplate(insertBefore, // <template end interpolate /> (will be removed)
context, // variable scope of {`__tagvar${index}`:'x'}
ownerSupport, // Tag class
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
                ownerSupport,
                subject: existingSubject,
                insertBefore
            }
        };
    }
    let isForceElement = options.forceElement;
    subscribeToTemplate(insertBefore, existingSubject, ownerSupport, counts, { isForceElement });
    return { clones };
}
function subscribeToTemplate(insertBefore, subject, ownerSupport, counts, // used for animation stagger computing
{ isForceElement }) {
    let called = false;
    const callback = (value) => {
        if (called) {
            (0,_updateExistingValue_function__WEBPACK_IMPORTED_MODULE_5__.updateExistingValue)(subject, value, ownerSupport, insertBefore);
            return;
        }
        const templater = value;
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processSubjectValue)(templater, subject, insertBefore, ownerSupport, {
            counts: { ...counts },
            forceElement: isForceElement,
        });
        if (isForceElement) {
            isForceElement = false; // only can happen once
        }
        called = true;
    };
    const sub = subject.subscribe(callback);
    ownerSupport.global.subscriptions.push(sub);
}
function afterElmBuild(elm, options, context, ownerSupport) {
    if (!elm.getAttribute) {
        return;
    }
    const tagName = elm.nodeName; // elm.tagName
    if (tagName === 'TEXTAREA') {
        (0,_scanTextAreaValue_function__WEBPACK_IMPORTED_MODULE_4__.scanTextAreaValue)(elm, context, ownerSupport);
    }
    let diff = options.counts.added;
    diff = (0,_elementInitCheck__WEBPACK_IMPORTED_MODULE_1__.elementInitCheck)(elm, options.counts) - diff;
    if (elm.children) {
        new Array(...elm.children).forEach((child, index) => {
            const subOptions = {
                ...options,
                counts: options.counts,
            };
            return afterElmBuild(child, subOptions, context, ownerSupport);
        });
    }
}


/***/ }),

/***/ "../main/ts/interpolations/interpolations.ts":
/*!***************************************************!*\
  !*** ../main/ts/interpolations/interpolations.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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

/***/ "../main/ts/interpolations/processAttribute.function.ts":
/*!**************************************************************!*\
  !*** ../main/ts/interpolations/processAttribute.function.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processAttribute: () => (/* binding */ processAttribute)
/* harmony export */ });
/* harmony import */ var _inputAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputAttribute */ "../main/ts/interpolations/inputAttribute.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bindSubjectCallback.function */ "../main/ts/interpolations/bindSubjectCallback.function.ts");



const startRegX = /^\s*{__tagvar/;
const endRegX = /}\s*$/;
function isTagVar(value) {
    return value && value.search(startRegX) >= 0 && value.search(endRegX) >= 0;
}
function processAttribute(attrName, value, child, scope, ownerSupport, howToSet) {
    if (isTagVar(value)) {
        return processScopedNameValueAttr(attrName, value, child, scope, ownerSupport, howToSet);
    }
    if (isTagVar(attrName)) {
        const contextValueSubject = getContextValueByVarString(scope, attrName);
        let lastValue;
        // the above callback gets called immediately since its a ValueSubject()
        const sub = contextValueSubject.subscribe((value) => {
            processNameOnlyAttr(value, lastValue, child, ownerSupport, howToSet);
            lastValue = value;
        });
        ownerSupport.global.subscriptions.push(sub); // this is where unsubscribe is picked up
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
child, scope, ownerSupport, howToSet) {
    // get the code inside the brackets like "variable0" or "{variable0}"
    const result = getContextValueByVarString(scope, value);
    return processNameValueAttr(attrName, result, child, ownerSupport, howToSet);
}
function getContextValueByVarString(scope, value) {
    const code = value.replace('{', '').split('').reverse().join('').replace('}', '').split('').reverse().join('');
    return scope[code];
}
function processNameOnlyAttr(attrValue, lastValue, child, ownerSupport, howToSet) {
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
        processNameValueAttr(attrValue, '', child, ownerSupport, howToSet);
        return;
    }
    if (attrValue instanceof Object) {
        Object.entries(attrValue).forEach(([name, value]) => processNameValueAttr(name, value, child, ownerSupport, howToSet));
        return;
    }
}
function processNameValueAttr(attrName, result, child, ownerSupport, howToSet) {
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
                newAttrValue = (0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__.bindSubjectCallback)(newAttrValue, ownerSupport);
            }
            return processAttributeSubjectValue(newAttrValue, child, attrName, isSpecial, howToSet);
        };
        // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
        const sub = result.subscribe(callback);
        // Record subscription for later unsubscribe when element destroyed
        ownerSupport.global.subscriptions.push(sub);
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
    const isDeadValue = [undefined, false, null].includes(newAttrValue);
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

/***/ "../main/ts/interpolations/scanTextAreaValue.function.ts":
/*!***************************************************************!*\
  !*** ../main/ts/interpolations/scanTextAreaValue.function.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scanTextAreaValue: () => (/* binding */ scanTextAreaValue)
/* harmony export */ });
/* harmony import */ var _processAttribute_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processAttribute.function */ "../main/ts/interpolations/processAttribute.function.ts");

const search = new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');
function scanTextAreaValue(textarea, context, ownerSupport) {
    const value = textarea.value;
    if (value.search(search) >= 0) {
        const match = value.match(/__tagvar(\d{1,4})/);
        const token = match ? match[0] : '';
        const dynamic = '{' + token + '}';
        textarea.value = '';
        textarea.setAttribute('text-var-value', dynamic);
        const howToSet = (_elm, _name, value) => textarea.value = value;
        (0,_processAttribute_function__WEBPACK_IMPORTED_MODULE_0__.processAttribute)('text-var-value', dynamic, // realValue, // context[token].value,
        textarea, context, ownerSupport, howToSet);
    }
}


/***/ }),

/***/ "../main/ts/isInstance.ts":
/*!********************************!*\
  !*** ../main/ts/isInstance.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSubjectInstance: () => (/* binding */ isSubjectInstance),
/* harmony export */   isTag: () => (/* binding */ isTag),
/* harmony export */   isTagArray: () => (/* binding */ isTagArray),
/* harmony export */   isTagClass: () => (/* binding */ isTagClass),
/* harmony export */   isTagComponent: () => (/* binding */ isTagComponent),
/* harmony export */   isTagTemplater: () => (/* binding */ isTagTemplater)
/* harmony export */ });
function isTagComponent(value) {
    return value?.wrapper?.original instanceof Function;
}
function isTag(value) {
    return isTagTemplater(value) || isTagClass(value);
}
function isTagTemplater(value) {
    const templater = value;
    return templater?.isTemplater === true && templater.wrapper === undefined;
}
function isTagClass(value) {
    const templater = value;
    return templater?.isTagClass === true;
}
function isSubjectInstance(subject) {
    return (subject?.isSubject === true || subject?.subscribe) ? true : false; // subject?.isSubject === true || 
}
function isTagArray(value) {
    return value instanceof Array && value.every(x => isTagClass(x) || isTagTemplater(x));
}


/***/ }),

/***/ "../main/ts/isLikeTags.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/isLikeTags.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isLikeTags: () => (/* binding */ isLikeTags)
/* harmony export */ });
function isLikeTags(tagSupport0, // new
tagSupport1) {
    const templater0 = tagSupport0.templater;
    const templater1 = tagSupport1.templater;
    const tag0 = templater0?.tag || tagSupport0;
    const tag1 = templater1.tag;
    const strings0 = tag0.strings;
    const strings1 = tagSupport1.strings || tag1.strings;
    if (strings0.length !== strings1.length) {
        return false;
    }
    const everyStringMatched = strings0.every((string, index) => strings1[index] === string);
    if (!everyStringMatched) {
        return false;
    }
    const values0 = tagSupport0.values || tag0.values;
    const values1 = tagSupport1.values || tag1.values;
    const valuesLengthsMatch = values0.length === values1.length;
    if (!valuesLengthsMatch) {
        return false;
    }
    const allVarsMatch = values1.every((value, index) => {
        const compareTo = values0[index];
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

/***/ "../main/ts/processNewValue.function.ts":
/*!**********************************************!*\
  !*** ../main/ts/processNewValue.function.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processNewValue: () => (/* binding */ processNewValue)
/* harmony export */ });
/* harmony import */ var _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subject/ValueSubject */ "../main/ts/subject/ValueSubject.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");




function processNewValue(hasValue, value, ownerSupport) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value)) {
        const tagSubject = new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
        return tagSubject;
    }
    if (value instanceof Function) {
        return new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
    }
    if (!hasValue) {
        return new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(undefined);
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagTemplater)(value)) {
        const templater = value;
        const tag = templater.tag;
        return processNewTag(tag, ownerSupport);
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagClass)(value)) {
        return processNewTag(value, ownerSupport);
    }
    // is already a value subject?
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isSubjectInstance)(value)) {
        return value;
    }
    return new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(value);
}
function processNewTag(value, ownerSupport) {
    const tag = value;
    let templater = tag.templater;
    if (!templater) {
        const children = new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject([]);
        templater = new _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__.TemplaterResult(undefined, children);
        templater.tag = tag;
        tag.templater = templater;
    }
    const subject = new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(templater);
    const tagSupport = subject.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__.TagSupport(templater, ownerSupport, subject);
    return subject;
}


/***/ }),

/***/ "../main/ts/processRegularValue.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/processRegularValue.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processRegularValue: () => (/* binding */ processRegularValue)
/* harmony export */ });
/* harmony import */ var _updateBeforeTemplate_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateBeforeTemplate.function */ "../main/ts/updateBeforeTemplate.function.ts");

function processRegularValue(value, subject, // could be tag via subject.tag
insertBefore) {
    subject.insertBefore = insertBefore;
    const before = subject.clone || insertBefore; // Either the template is on the doc OR its the first element we last put on doc
    // matches but also was defined at some point
    if (subject.lastValue === value && 'lastValue' in subject) {
        return; // no need to update display, its the same
    }
    subject.lastValue = value;
    // Processing of regular values
    const clone = (0,_updateBeforeTemplate_function__WEBPACK_IMPORTED_MODULE_0__.updateBeforeTemplate)(value, before);
    subject.clone = clone; // remember single element put down, for future updates
}


/***/ }),

/***/ "../main/ts/processSubjectComponent.function.ts":
/*!******************************************************!*\
  !*** ../main/ts/processSubjectComponent.function.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processSubjectComponent: () => (/* binding */ processSubjectComponent)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "../main/ts/state/index.ts");
/* harmony import */ var _processTagResult_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processTagResult.function */ "../main/ts/processTagResult.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _renderSubjectComponent_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderSubjectComponent.function */ "../main/ts/renderSubjectComponent.function.ts");




function processSubjectComponent(templater, subject, insertBefore, ownerSupport, options) {
    // Check if function component is wrapped in a tag() call
    // TODO: This below check not needed in production mode
    if (templater.tagged !== true) {
        const wrapper = templater.wrapper;
        const original = wrapper.original;
        let name = original.name || original.constructor?.name;
        if (name === 'Function') {
            name = undefined;
        }
        const label = name || original.toString().substring(0, 120);
        const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`);
        throw error;
    }
    const tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_2__.TagSupport(templater, ownerSupport, subject);
    let reSupport = subject.tagSupport;
    const global = tagSupport.global = reSupport?.global || tagSupport.global;
    global.insertBefore = insertBefore;
    const providers = _state__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.providerConfig;
    providers.ownerSupport = ownerSupport;
    const isRender = !reSupport || options.forceElement;
    if (isRender) {
        const support = reSupport || tagSupport;
        reSupport = (0,_renderSubjectComponent_function__WEBPACK_IMPORTED_MODULE_3__.renderSubjectComponent)(subject, support, ownerSupport);
    }
    (0,_processTagResult_function__WEBPACK_IMPORTED_MODULE_1__.processTagResult)(reSupport, subject, // The element set here will be removed from document. Also result.tag will be added in here
    insertBefore, // <template end interpolate /> (will be removed)
    options);
    return reSupport;
}


/***/ }),

/***/ "../main/ts/processSubjectValue.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/processSubjectValue.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processSubjectValue: () => (/* binding */ processSubjectValue)
/* harmony export */ });
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _processTagArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processTagArray */ "../main/ts/processTagArray.ts");
/* harmony import */ var _processRegularValue_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./processRegularValue.function */ "../main/ts/processRegularValue.function.ts");
/* harmony import */ var _processTag_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./processTag.function */ "../main/ts/processTag.function.ts");





var ValueTypes;
(function (ValueTypes) {
    ValueTypes["tag"] = "tag";
    ValueTypes["templater"] = "templater";
    ValueTypes["tagArray"] = "tag-array";
    ValueTypes["tagComponent"] = "tag-component";
    ValueTypes["value"] = "value";
})(ValueTypes || (ValueTypes = {}));
function getValueType(value) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value)) {
        return ValueTypes.tagComponent;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagTemplater)(value)) {
        return ValueTypes.templater;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagClass)(value)) {
        return ValueTypes.tag;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagArray)(value)) {
        return ValueTypes.tagArray;
    }
    return ValueTypes.value;
}
// export type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag
function processSubjectValue(value, subject, // could be tag via result.tag
insertBefore, // <template end interpolate /> (will be removed)
ownerSupport, // owner
options) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.templater:
            (0,_processTag_function__WEBPACK_IMPORTED_MODULE_4__.processTag)(value, insertBefore, ownerSupport, subject);
            return;
        case ValueTypes.tag:
            const tag = value;
            let templater = tag.templater;
            if (!templater) {
                templater = (0,_processTag_function__WEBPACK_IMPORTED_MODULE_4__.tagFakeTemplater)(tag);
            }
            (0,_processTag_function__WEBPACK_IMPORTED_MODULE_4__.processTag)(templater, insertBefore, ownerSupport, subject);
            return;
        case ValueTypes.tagArray:
            return (0,_processTagArray__WEBPACK_IMPORTED_MODULE_2__.processTagArray)(subject, value, insertBefore, ownerSupport, options);
        case ValueTypes.tagComponent:
            (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_0__.processSubjectComponent)(value, subject, insertBefore, ownerSupport, options);
            return;
    }
    (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_3__.processRegularValue)(value, subject, insertBefore);
}


/***/ }),

/***/ "../main/ts/processTag.function.ts":
/*!*****************************************!*\
  !*** ../main/ts/processTag.function.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFakeTemplater: () => (/* binding */ getFakeTemplater),
/* harmony export */   processTag: () => (/* binding */ processTag),
/* harmony export */   setupNewTemplater: () => (/* binding */ setupNewTemplater),
/* harmony export */   tagFakeTemplater: () => (/* binding */ tagFakeTemplater)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subject */ "../main/ts/subject/index.ts");


/** Could be a regular tag or a component. Both are Tag.class */
function processTag(templater, insertBefore, ownerSupport, // owner
subject) {
    let tagSupport = subject.tagSupport;
    // first time seeing this tag?
    if (!tagSupport) {
        tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.TagSupport(templater, ownerSupport, subject);
        setupNewTemplater(tagSupport, ownerSupport, subject);
        ownerSupport.childTags.push(tagSupport);
    }
    subject.tagSupport = tagSupport;
    tagSupport.ownerTagSupport = ownerSupport;
    tagSupport.buildBeforeElement(insertBefore, {
        counts: { added: 0, removed: 0 },
        forceElement: true,
    });
}
function setupNewTemplater(tagSupport, ownerSupport, subject) {
    tagSupport.global.oldest = tagSupport;
    tagSupport.global.newest = tagSupport;
    // asking me to render will cause my parent to render
    tagSupport.ownerTagSupport = ownerSupport;
    subject.tagSupport = tagSupport;
}
function tagFakeTemplater(tag) {
    const templater = getFakeTemplater();
    templater.tag = tag;
    tag.templater = templater;
    return templater;
}
function getFakeTemplater() {
    return {
        children: new _subject__WEBPACK_IMPORTED_MODULE_1__.ValueSubject([]), // no children
        props: {},
        isTag: true,
        isTemplater: false,
        tagged: false,
        // wrapper: (() => undefined) as unknown as Wrapper,
    };
}


/***/ }),

/***/ "../main/ts/processTagArray.ts":
/*!*************************************!*\
  !*** ../main/ts/processTagArray.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processTagArray: () => (/* binding */ processTagArray)
/* harmony export */ });
/* harmony import */ var _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subject/ValueSubject */ "../main/ts/subject/ValueSubject.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");
/* harmony import */ var _processTag_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./processTag.function */ "../main/ts/processTag.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");






function processTagArray(subject, value, // arry of Tag classes
insertBefore, // <template end interpolate />
ownerSupport, options) {
    const clones = ownerSupport.clones; // []
    let lastArray = subject.lastArray = subject.lastArray || [];
    if (!subject.placeholder) {
        setPlaceholderElm(insertBefore, subject);
    }
    const runtimeInsertBefore = subject.placeholder; // || insertBefore
    let removed = 0;
    /** 🗑️ remove previous items first */
    lastArray = subject.lastArray = subject.lastArray.filter((item, index) => {
        const newLength = value.length - 1;
        const at = index - removed;
        const lessLength = newLength < at;
        const subValue = value[index - removed];
        const subTag = subValue;
        // const tag = subTag?.templater.tag as Tag
        const lastTag = item.tagSupport.templater.tag;
        const newArrayValue = subTag?.memory.arrayValue;
        const lastArrayValue = lastTag.memory.arrayValue;
        const destroyItem = lessLength || !areLikeValues(newArrayValue, lastArrayValue);
        if (destroyItem) {
            const last = lastArray[index];
            const tagSupport = last.tagSupport;
            (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_2__.destroyArrayTag)(tagSupport, options.counts);
            last.deleted = true;
            ++removed;
            ++options.counts.removed;
            return false;
        }
        return true;
    });
    value.forEach((item, index) => {
        const previous = lastArray[index];
        const previousSupport = previous?.tagSupport;
        const subTag = item;
        if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_5__.isTagClass)(subTag) && !subTag.templater) {
            (0,_processTag_function__WEBPACK_IMPORTED_MODULE_3__.tagFakeTemplater)(subTag);
        }
        const tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_4__.TagSupport(subTag.templater, ownerSupport, new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject(undefined));
        // tagSupport.templater = subTag.templater
        if (previousSupport) {
            (0,_processTag_function__WEBPACK_IMPORTED_MODULE_3__.setupNewTemplater)(tagSupport, ownerSupport, previousSupport.subject);
            const global = previousSupport.global;
            tagSupport.global = global;
            global.newest = tagSupport;
        }
        // check for html``.key()
        const keySet = 'arrayValue' in subTag.memory;
        if (!keySet) {
            const details = {
                template: tagSupport.getTemplate().string,
                array: value,
                ownerTagContent: ownerSupport.lastTemplateString,
            };
            const message = 'Use html`...`.key(item) instead of html`...` to template an Array';
            console.error(message, details);
            const err = new _errors__WEBPACK_IMPORTED_MODULE_1__.ArrayNoKeyError(message, details);
            throw err;
        }
        const couldBeSame = lastArray.length > index;
        if (couldBeSame) {
            const prevSupport = previous.tagSupport;
            const prevGlobal = prevSupport.global;
            // subTag.tagSupport = subTag.tagSupport || prevSupport
            const oldest = prevGlobal.oldest;
            oldest.updateBy(tagSupport);
            return [];
        }
        processAddTagArrayItem(runtimeInsertBefore, tagSupport, index, options, lastArray);
        ownerSupport.childTags.push(tagSupport);
    });
    return clones;
}
function setPlaceholderElm(insertBefore, subject) {
    if (insertBefore.nodeName !== 'TEMPLATE') {
        subject.placeholder = insertBefore;
        return;
    }
    const placeholder = subject.placeholder = document.createTextNode('');
    const parentNode = insertBefore.parentNode;
    parentNode.insertBefore(placeholder, insertBefore);
    parentNode.removeChild(insertBefore);
}
function processAddTagArrayItem(before, tagSupport, index, options, lastArray) {
    const lastValue = {
        tagSupport, index
    };
    // Added to previous array
    lastArray.push(lastValue);
    const counts = {
        added: options.counts.added + index,
        removed: options.counts.removed,
    };
    const newTempElm = document.createElement('template');
    const parent = before.parentNode;
    parent.insertBefore(newTempElm, before);
    tagSupport.buildBeforeElement(newTempElm, // before,
    { counts, forceElement: options.forceElement });
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processTagResult: () => (/* binding */ processTagResult)
/* harmony export */ });
function processTagResult(tagSupport, subject, // used for recording past and current value
insertBefore, // <template end interpolate />
{ counts, forceElement, }) {
    // *if appears we already have seen
    const subjectTag = subject;
    const lastSupport = subjectTag.tagSupport;
    const prevSupport = lastSupport?.global.oldest || undefined; // || tag.tagSupport.oldest // subjectTag.tag
    const justUpdate = prevSupport; // && !forceElement
    if (prevSupport && justUpdate) {
        return processTagResultUpdate(tagSupport, subjectTag, prevSupport);
    }
    tagSupport.buildBeforeElement(insertBefore, {
        counts,
        forceElement,
    });
}
function processTagResultUpdate(tagSupport, subject, // used for recording past and current value
prevSupport) {
    // components
    if (subject instanceof Function) {
        const newSupport = subject(prevSupport);
        prevSupport.updateBy(newSupport);
        subject.tagSupport = newSupport;
        return;
    }
    prevSupport.updateBy(tagSupport);
    subject.tagSupport = tagSupport;
    return;
}


/***/ }),

/***/ "../main/ts/render.ts":
/*!****************************!*\
  !*** ../main/ts/render.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderExistingTag: () => (/* binding */ renderExistingTag)
/* harmony export */ });
/* harmony import */ var _state_provider_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/provider.utils */ "../main/ts/state/provider.utils.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _renderWithSupport_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderWithSupport.function */ "../main/ts/renderWithSupport.function.ts");



/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
function renderExistingTag(oldestSupport, // oldest with elements on html
newSupport, // new to be rendered
ownerSupport, // ownerSupport
subject) {
    const lastSupport = subject.tagSupport;
    const global = lastSupport.global;
    // share point between renders
    newSupport.global = global;
    const preRenderCount = global.renderCount;
    (0,_state_provider_utils__WEBPACK_IMPORTED_MODULE_0__.providersChangeCheck)(oldestSupport);
    // When the providers were checked, a render to myself occurred and I do not need to re-render again
    const prevSupport = global.newest;
    if (preRenderCount !== global.renderCount) {
        oldestSupport.updateBy(prevSupport);
        return prevSupport; // already rendered during triggered events
    }
    const toRedrawTag = prevSupport || lastSupport || global.oldest;
    const reSupport = (0,_renderWithSupport_function__WEBPACK_IMPORTED_MODULE_2__.renderWithSupport)(newSupport, toRedrawTag, subject, 
    // oldestSupport,
    ownerSupport);
    const oldest = global.oldest || oldestSupport;
    reSupport.global.oldest = oldest;
    if ((0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__.isLikeTags)(prevSupport, reSupport)) {
        subject.tagSupport = reSupport;
        oldest.updateBy(reSupport);
    }
    return reSupport;
}


/***/ }),

/***/ "../main/ts/renderSubjectComponent.function.ts":
/*!*****************************************************!*\
  !*** ../main/ts/renderSubjectComponent.function.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSubjectComponent: () => (/* binding */ renderSubjectComponent)
/* harmony export */ });
/* harmony import */ var _renderWithSupport_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderWithSupport.function */ "../main/ts/renderWithSupport.function.ts");

function renderSubjectComponent(subject, reSupport, ownerSupport) {
    const preClones = ownerSupport.clones.map(clone => clone);
    reSupport = (0,_renderWithSupport_function__WEBPACK_IMPORTED_MODULE_0__.renderWithSupport)(reSupport, subject.tagSupport, // existing tag
    subject, ownerSupport);
    reSupport.global.newest = reSupport;
    if (ownerSupport.clones.length > preClones.length) {
        const myClones = ownerSupport.clones.filter(fClone => !preClones.find(clone => clone === fClone));
        reSupport.clones.push(...myClones);
    }
    ownerSupport.childTags.push(reSupport);
    return reSupport;
}


/***/ }),

/***/ "../main/ts/renderTagSupport.function.ts":
/*!***********************************************!*\
  !*** ../main/ts/renderTagSupport.function.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTagSupport: () => (/* binding */ renderTagSupport)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _renderExistingTag_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderExistingTag.function */ "../main/ts/renderExistingTag.function.ts");


/** Main function used by all other callers to render/update display of a tag component */
function renderTagSupport(tagSupport, // must be latest/newest state render
renderUp) {
    const global = tagSupport.global;
    const templater = tagSupport.templater;
    // is it just a vanilla tag, not component?
    if (!templater.wrapper) { // || isTagTemplater(templater) 
        const ownerTag = tagSupport.ownerTagSupport;
        ++global.renderCount;
        return renderTagSupport(ownerTag, true);
    }
    const subject = tagSupport.subject;
    let ownerSupport;
    let selfPropChange = false;
    const shouldRenderUp = renderUp && tagSupport;
    if (shouldRenderUp) {
        ownerSupport = tagSupport.ownerTagSupport;
        if (ownerSupport) {
            const nowProps = templater.props;
            const latestProps = tagSupport.propsConfig.latestCloned;
            selfPropChange = !(0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)(nowProps, latestProps);
        }
    }
    const oldest = tagSupport.global.oldest;
    const tag = (0,_renderExistingTag_function__WEBPACK_IMPORTED_MODULE_1__.renderExistingTag)(oldest, tagSupport, ownerSupport, // useTagSupport,
    subject);
    const renderOwner = ownerSupport && selfPropChange;
    if (renderOwner) {
        const ownerTagSupport = ownerSupport;
        renderTagSupport(ownerTagSupport, true);
        return tag;
    }
    return tag;
}


/***/ }),

/***/ "../main/ts/renderWithSupport.function.ts":
/*!************************************************!*\
  !*** ../main/ts/renderWithSupport.function.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderWithSupport: () => (/* binding */ renderWithSupport)
/* harmony export */ });
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "../main/ts/state/index.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");




function renderWithSupport(tagSupport, // new
lastSupport, // previous
subject, // events & memory
ownerSupport) {
    const oldRenderCount = tagSupport.global.renderCount;
    beforeWithRender(tagSupport, ownerSupport, lastSupport);
    const templater = tagSupport.templater;
    // NEW TAG CREATED HERE
    const wrapper = templater.wrapper;
    const reSupport = wrapper(tagSupport, subject);
    /* AFTER */
    (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runAfterRender)(tagSupport, reSupport);
    // When we rendered, only 1 render should have taken place OTHERWISE rendering caused another render and that is the latest instead
    if (reSupport.global.renderCount > oldRenderCount + 1) {
        return tagSupport.global.newest;
    }
    tagSupport.global.newest = reSupport;
    const isLikeTag = !lastSupport || (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__.isLikeTags)(lastSupport, reSupport);
    if (!isLikeTag) {
        destroyUnlikeTags(lastSupport, reSupport, subject);
    }
    const lastOwnerSupport = lastSupport?.ownerTagSupport;
    reSupport.ownerTagSupport = (ownerSupport || lastOwnerSupport);
    return reSupport;
}
function beforeWithRender(tagSupport, ownerSupport, lastSupport) {
    const lastOwnerSupport = lastSupport?.ownerTagSupport;
    const runtimeOwnerSupport = lastOwnerSupport || ownerSupport;
    if (lastSupport) {
        const lastState = lastSupport.memory.state;
        const memory = tagSupport.memory;
        memory.state = [...lastState];
        tagSupport.global = lastSupport.global;
        (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runBeforeRedraw)(tagSupport, lastSupport);
    }
    else {
        // first time render
        (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runBeforeRender)(tagSupport, runtimeOwnerSupport);
        // TODO: Logic below most likely could live within providers.ts inside the runBeforeRender function
        const providers = _state__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        providers.ownerSupport = runtimeOwnerSupport;
    }
}
function destroyUnlikeTags(lastSupport, // old
reSupport, // new
subject) {
    const oldGlobal = lastSupport.global;
    const insertBefore = oldGlobal.insertBefore;
    (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_3__.destroyTagMemory)(lastSupport, subject);
    // when a tag is destroyed, disconnect the globals
    reSupport.global = { ...oldGlobal }; // break memory references
    const global = reSupport.global;
    global.insertBefore = insertBefore;
    global.deleted = false;
    delete global.oldest;
    delete global.newest;
    delete subject.tagSupport;
}


/***/ }),

/***/ "../main/ts/setTagPlaceholder.function.ts":
/*!************************************************!*\
  !*** ../main/ts/setTagPlaceholder.function.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setTagPlaceholder: () => (/* binding */ setTagPlaceholder)
/* harmony export */ });
function setTagPlaceholder(global) {
    const insertBefore = global.insertBefore;
    const placeholder = global.placeholder = document.createTextNode('');
    const parentNode = insertBefore.parentNode;
    parentNode.insertBefore(placeholder, insertBefore);
    parentNode.removeChild(insertBefore);
}


/***/ }),

/***/ "../main/ts/state/callbackMaker.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/state/callbackMaker.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callbackMaker: () => (/* binding */ callbackMaker)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");
/* harmony import */ var _state_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.utils */ "../main/ts/state/state.utils.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errors */ "../main/ts/errors.ts");




let innerCallback = (callback) => (a, b, c, d, e, f) => {
    throw new _errors__WEBPACK_IMPORTED_MODULE_3__.SyncCallbackError('Callback function was called immediately in sync and must instead be call async');
};
const callbackMaker = () => innerCallback;
const originalGetter = innerCallback; // callbackMaker
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse)({
    beforeRender: (tagSupport) => initMemory(tagSupport),
    beforeRedraw: (tagSupport) => initMemory(tagSupport),
    afterRender: (_tagSupport) => {
        innerCallback = originalGetter; // prevent crossing callbacks with another tag
    },
});
function updateState(stateFrom, stateTo) {
    stateFrom.forEach((state, index) => {
        const fromValue = (0,_state_utils__WEBPACK_IMPORTED_MODULE_1__.getStateValue)(state);
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
    // ensure that the oldest has the latest values first
    updateState(state, oldState);
    // run the callback
    const promise = callback(...args);
    // send the oldest state changes into the newest
    updateState(oldState, state);
    (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__.renderTagSupport)(tagSupport, false);
    if (promise instanceof Promise) {
        promise.finally(() => {
            // send the oldest state changes into the newest
            updateState(oldState, state);
            (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_2__.renderTagSupport)(tagSupport, false);
        });
    }
}


/***/ }),

/***/ "../main/ts/state/index.ts":
/*!*********************************!*\
  !*** ../main/ts/state/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callbackMaker: () => (/* reexport safe */ _callbackMaker_function__WEBPACK_IMPORTED_MODULE_6__.callbackMaker),
/* harmony export */   letState: () => (/* reexport safe */ _letState_function__WEBPACK_IMPORTED_MODULE_3__.letState),
/* harmony export */   onDestroy: () => (/* reexport safe */ _onDestroy__WEBPACK_IMPORTED_MODULE_8__.onDestroy),
/* harmony export */   onInit: () => (/* reexport safe */ _onInit__WEBPACK_IMPORTED_MODULE_7__.onInit),
/* harmony export */   providers: () => (/* reexport safe */ _providers__WEBPACK_IMPORTED_MODULE_5__.providers),
/* harmony export */   setProp: () => (/* reexport safe */ _setProp_function__WEBPACK_IMPORTED_MODULE_4__.setProp),
/* harmony export */   setUse: () => (/* reexport safe */ _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse),
/* harmony export */   state: () => (/* reexport safe */ _state_function__WEBPACK_IMPORTED_MODULE_2__.state),
/* harmony export */   watch: () => (/* reexport safe */ _watch_function__WEBPACK_IMPORTED_MODULE_0__.watch)
/* harmony export */ });
/* harmony import */ var _watch_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watch.function */ "../main/ts/state/watch.function.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");
/* harmony import */ var _state_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state.function */ "../main/ts/state/state.function.ts");
/* harmony import */ var _letState_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./letState.function */ "../main/ts/state/letState.function.ts");
/* harmony import */ var _setProp_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setProp.function */ "../main/ts/state/setProp.function.ts");
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./providers */ "../main/ts/state/providers.ts");
/* harmony import */ var _callbackMaker_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./callbackMaker.function */ "../main/ts/state/callbackMaker.function.ts");
/* harmony import */ var _onInit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./onInit */ "../main/ts/state/onInit.ts");
/* harmony import */ var _onDestroy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./onDestroy */ "../main/ts/state/onDestroy.ts");











/***/ }),

/***/ "../main/ts/state/letState.function.ts":
/*!*********************************************!*\
  !*** ../main/ts/state/letState.function.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   letState: () => (/* binding */ letState)
/* harmony export */ });
/* harmony import */ var _state_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.utils */ "../main/ts/state/state.utils.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");


/** Used for variables that need to remain the same variable during render passes */
function letState(defaultValue) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    const rearray = config.rearray;
    let getSetMethod;
    const restate = rearray[config.array.length];
    if (restate) {
        let oldValue = (0,_state_utils__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(restate);
        getSetMethod = ((x) => [oldValue, oldValue = x]);
        const push = {
            get: () => (0,_state_utils__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
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
        get: () => (0,_state_utils__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
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

/***/ "../main/ts/state/onDestroy.ts":
/*!*************************************!*\
  !*** ../main/ts/state/onDestroy.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onDestroy: () => (/* binding */ onDestroy)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");

function setCurrentTagSupport(support) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.destroyCurrentSupport = support;
}
function onDestroy(callback) {
    const tagSupport = _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.destroyCurrentSupport;
    tagSupport.global.destroyCallback = callback;
}
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse)({
    beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
    beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
    beforeDestroy: (tagSupport) => {
        const callback = tagSupport.global.destroyCallback;
        if (callback) {
            callback();
        }
    }
});


/***/ }),

/***/ "../main/ts/state/onInit.ts":
/*!**********************************!*\
  !*** ../main/ts/state/onInit.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onInit: () => (/* binding */ onInit)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");

function setCurrentTagSupport(support) {
    _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.currentSupport = support;
}
function onInit(callback) {
    const tagSupport = _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.currentSupport;
    if (!tagSupport.global.init) {
        tagSupport.global.init = callback;
        callback(); // fire init
    }
}
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse)({
    beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
    beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
});


/***/ }),

/***/ "../main/ts/state/provider.utils.ts":
/*!******************************************!*\
  !*** ../main/ts/state/provider.utils.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   providersChangeCheck: () => (/* binding */ providersChangeCheck)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");


function providersChangeCheck(tagSupport) {
    const global = tagSupport.global;
    const providersWithChanges = global.providers.filter(provider => !(0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)(provider.instance, provider.clone));
    // reset clones
    providersWithChanges.forEach(provider => {
        const appElement = tagSupport.getAppElement();
        handleProviderChanges(appElement, provider);
        provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(provider.instance);
    });
}
function handleProviderChanges(appElement, provider) {
    const tagsWithProvider = getTagsWithProvider(appElement, provider);
    tagsWithProvider.forEach(({ tagSupport, renderCount, provider }) => {
        if (tagSupport.global.deleted) {
            return; // i was deleted after another tag processed
        }
        const notRendered = renderCount === tagSupport.global.renderCount;
        if (notRendered) {
            provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(provider.instance);
            (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_1__.renderTagSupport)(tagSupport, false);
        }
    });
}
function getTagsWithProvider(tagSupport, provider, memory = []) {
    const global = tagSupport.global;
    const compare = global.providers;
    const hasProvider = compare.find(xProvider => xProvider.constructMethod === provider.constructMethod);
    if (hasProvider) {
        memory.push({
            tagSupport,
            renderCount: global.renderCount,
            provider: hasProvider,
        });
    }
    tagSupport.childTags.forEach(child => getTagsWithProvider(child, provider, memory));
    return memory;
}


/***/ }),

/***/ "../main/ts/state/providers.ts":
/*!*************************************!*\
  !*** ../main/ts/state/providers.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   providers: () => (/* binding */ providers)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");
/* harmony import */ var _state_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state.function */ "../main/ts/state/state.function.ts");



_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig = {
    providers: [],
    ownerSupport: undefined,
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
            // fake calling state the same number of previous times
            for (let x = 0; x < existing.stateDiff; ++x) {
                (0,_state_function__WEBPACK_IMPORTED_MODULE_2__.state)(existing.stateDiff);
            }
            return (0,_state_function__WEBPACK_IMPORTED_MODULE_2__.state)(existing.stateDiff);
        }
        const oldStateCount = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig.array.length;
        // Providers with provider requirements just need to use providers.create() and providers.inject()
        const instance = 'prototype' in constructMethod ? new constructMethod() : constructMethod();
        const stateDiff = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig.array.length - oldStateCount;
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        config.providers.push({
            constructMethod,
            instance,
            clone: (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepClone)(instance),
            stateDiff,
        });
        (0,_state_function__WEBPACK_IMPORTED_MODULE_2__.state)(() => instance); // tie provider to a state for rendering change checking
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
            ownerTagSupport: config.ownerSupport
        };
        while (owner.ownerTagSupport) {
            const ownerProviders = owner.ownerTagSupport.global.providers;
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
            owner = owner.ownerTagSupport; // cause reloop
        }
        const msg = `Could not inject provider: ${constructor.name} ${constructor}`;
        console.warn(`${msg}. Available providers`, config.providers);
        throw new Error(msg);
    }
};
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse)({
    beforeRender: (tagSupport, ownerSupport) => {
        run(tagSupport, ownerSupport);
    },
    beforeRedraw: (tagSupport, newTagSupport) => {
        run(tagSupport, newTagSupport.ownerTagSupport);
    },
    afterRender: (tagSupport) => {
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
        tagSupport.global.providers = [...config.providers];
        config.providers.length = 0;
    }
});
function run(tagSupport, ownerSupport) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
    config.ownerSupport = ownerSupport;
    if (tagSupport.global.providers.length) {
        config.providers.length = 0;
        config.providers.push(...tagSupport.global.providers);
    }
}


/***/ }),

/***/ "../main/ts/state/setProp.function.ts":
/*!********************************************!*\
  !*** ../main/ts/state/setProp.function.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setProp: () => (/* binding */ setProp)
/* harmony export */ });
/* harmony import */ var _state_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.utils */ "../main/ts/state/state.utils.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");


/** Used for variables that need to remain the same variable during render passes */
function setProp(getSet) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    const rearray = config.rearray;
    const [propValue] = getSet(undefined);
    getSet(propValue); // restore original value instead of undefined
    const restate = rearray[config.array.length];
    if (restate) {
        let watchValue = restate.watch;
        let oldValue = (0,_state_utils__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(restate);
        const push = {
            get: () => (0,_state_utils__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
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
        get: () => (0,_state_utils__WEBPACK_IMPORTED_MODULE_0__.getStateValue)(push),
        callback: getSet,
        lastValue: propValue,
        watch: propValue,
    };
    config.array.push(push);
    return propValue;
}


/***/ }),

/***/ "../main/ts/state/setUse.function.ts":
/*!*******************************************!*\
  !*** ../main/ts/state/setUse.function.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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

/***/ "../main/ts/state/state.function.ts":
/*!******************************************!*\
  !*** ../main/ts/state/state.function.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");
/* harmony import */ var _state_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.utils */ "../main/ts/state/state.utils.ts");


/** Used for variables that need to remain the same variable during render passes */
function state(defaultValue) {
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.stateConfig;
    let getSetMethod;
    const rearray = config.rearray;
    const restate = rearray[config.array.length];
    if (restate) {
        let oldValue = (0,_state_utils__WEBPACK_IMPORTED_MODULE_1__.getStateValue)(restate);
        getSetMethod = ((x) => [oldValue, oldValue = x]);
        const push = {
            get: () => (0,_state_utils__WEBPACK_IMPORTED_MODULE_1__.getStateValue)(push),
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
        get: () => (0,_state_utils__WEBPACK_IMPORTED_MODULE_1__.getStateValue)(push),
        callback: getSetMethod,
        lastValue: initValue,
        defaultValue: initValue,
    };
    config.array.push(push);
    return initValue;
}


/***/ }),

/***/ "../main/ts/state/state.utils.ts":
/*!***************************************!*\
  !*** ../main/ts/state/state.utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateEchoBack: () => (/* binding */ StateEchoBack),
/* harmony export */   getStateValue: () => (/* binding */ getStateValue)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "../main/ts/errors.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/state/setUse.function.ts");


_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig = {
    array: [], // state memory on the first render
    // rearray: [] as State,
};
const beforeRender = (tagSupport) => initState(tagSupport);
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse)({
    beforeRender,
    beforeRedraw: beforeRender,
    afterRender: (tagSupport) => {
        const memory = tagSupport.memory;
        // const state: State = memory.state
        const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
        const rearray = config.rearray;
        if (rearray.length) {
            if (rearray.length !== config.array.length) {
                const message = `States lengths has changed ${rearray.length} !== ${config.array.length}. Typically occurs when a function is intended to be wrapped with a tag() call`;
                const wrapper = tagSupport.templater?.wrapper;
                const details = {
                    oldStates: config.array,
                    newStates: config.rearray,
                    tagFunction: wrapper.original,
                };
                const error = new _errors__WEBPACK_IMPORTED_MODULE_0__.StateMismatchError(message, details);
                console.warn(message, details);
                throw error;
            }
        }
        delete config.rearray; // clean up any previous runs
        delete config.tagSupport;
        memory.state = config.array; // [...config.array]
        memory.state.forEach(item => item.lastValue = getStateValue(item)); // set last values
        config.array = [];
    }
});
function getStateValue(state) {
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
    const memory = tagSupport.memory;
    const state = memory.state;
    const config = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig;
    // TODO: This guard may no longer be needed
    if (config.rearray) {
        checkStateMismatch(tagSupport, config, state);
    }
    config.rearray = [];
    if (state?.length) {
        state.forEach(state => getStateValue(state));
        config.rearray.push(...state);
    }
    config.tagSupport = tagSupport;
}
function checkStateMismatch(tagSupport, config, state) {
    const wrapper = tagSupport.templater?.wrapper;
    const wasWrapper = config.tagSupport?.templater.wrapper;
    const message = 'last state not cleared. Possibly in the middle of rendering one component and another is trying to render';
    if (!wasWrapper) {
        return; // its not a component or was not a component before
    }
    console.error(message, {
        config,
        tagFunction: wrapper.original,
        wasInMiddleOf: wasWrapper.original,
        state,
        expectedClearArray: config.rearray,
    });
    throw new _errors__WEBPACK_IMPORTED_MODULE_0__.StateMismatchError(message, {
        config,
        tagFunction: wrapper.original,
        state,
        expectedClearArray: config.rearray,
    });
}


/***/ }),

/***/ "../main/ts/state/watch.function.ts":
/*!******************************************!*\
  !*** ../main/ts/state/watch.function.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   watch: () => (/* binding */ watch)
/* harmony export */ });
/* harmony import */ var _letState_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./letState.function */ "../main/ts/state/letState.function.ts");

/**
 * When an item in watch array changes, callback function will be triggered. Does not trigger on initial watch setup.
 * @param currentValues T[]
 * @param callback WatchCallback
 * @returns T[]
 */
function watch(currentValues, callback) {
    let previousValues = (0,_letState_function__WEBPACK_IMPORTED_MODULE_0__.letState)(undefined)(x => [previousValues, previousValues = x]);
    // First time running watch?
    if (previousValues === undefined) {
        // callback(currentValues, previousValues) // do not call during init
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


/***/ }),

/***/ "../main/ts/subject/Subject.class.ts":
/*!*******************************************!*\
  !*** ../main/ts/subject/Subject.class.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subject: () => (/* binding */ Subject)
/* harmony export */ });
class Subject {
    value;
    onSubscription;
    methods = [];
    isSubject = true;
    subscribers = [];
    subscribeWith;
    // unsubcount = 0 // 🔬 testing
    constructor(value, onSubscription) {
        this.value = value;
        this.onSubscription = onSubscription;
    }
    subscribe(callback) {
        const subscription = getSubscription(this, callback);
        // are we within a pipe?
        const subscribeWith = this.subscribeWith;
        if (subscribeWith) {
            // are we in a pipe?
            if (this.methods.length) {
                const orgCallback = callback;
                callback = (value) => {
                    runPipedMethods(value, this.methods, lastValue => orgCallback(lastValue, subscription));
                };
            }
            return subscribeWith(callback);
        }
        this.subscribers.push(subscription);
        SubjectClass.globalSubs.push(subscription); // 🔬 testing
        if (this.onSubscription) {
            this.onSubscription(subscription);
        }
        return subscription;
    }
    set(value) {
        this.value = value;
        // Notify all subscribers with the new value
        this.subscribers.forEach(sub => {
            // (sub.callback as any).value = value
            sub.callback(value, sub);
        });
    }
    next = this.set;
    toPromise() {
        return new Promise((res, rej) => {
            this.subscribe((x, subscription) => {
                subscription.unsubscribe();
                res(x);
            });
        });
    }
    /** like toPromise but faster */
    toCallback(callback) {
        this.subscribe((x, subscription) => {
            subscription.unsubscribe();
            callback(x);
        });
        return this;
    }
    pipe(...operations) {
        const subject = new Subject();
        subject.methods = operations;
        subject.subscribeWith = (x) => this.subscribe(x);
        return subject;
    }
}
function removeSubFromArray(subscribers, callback) {
    const index = subscribers.findIndex(sub => sub.callback === callback);
    if (index !== -1) {
        subscribers.splice(index, 1);
    }
}
const SubjectClass = Subject;
SubjectClass.globalSubs = []; // 🔬 for testing
SubjectClass.globalSubCount$ = new Subject(); // for ease of debugging
SubjectClass.globalSubCount$.set(0);
function getSubscription(subject, callback) {
    const countSubject = SubjectClass.globalSubCount$;
    SubjectClass.globalSubCount$.set(countSubject.value + 1);
    const subscription = () => {
        subscription.unsubscribe();
    };
    subscription.callback = callback;
    subscription.subscriptions = [];
    // Return a function to unsubscribe from the BehaviorSubject
    subscription.unsubscribe = () => {
        removeSubFromArray(subject.subscribers, callback); // each will be called when update comes in
        removeSubFromArray(SubjectClass.globalSubs, callback); // 🔬 testing
        SubjectClass.globalSubCount$.set(countSubject.value - 1);
        // any double unsubscribes will be ignored
        subscription.unsubscribe = () => subscription;
        // unsubscribe from any combined subjects
        subscription.subscriptions.forEach(subscription => subscription.unsubscribe());
        return subscription;
    };
    subscription.add = (sub) => {
        subscription.subscriptions.push(sub);
        return subscription;
    };
    subscription.next = (value) => {
        callback(value, subscription);
    };
    return subscription;
}
function runPipedMethods(value, methods, onComplete) {
    const cloneMethods = [...methods];
    const firstMethod = cloneMethods.shift();
    const next = (newValue) => {
        if (cloneMethods.length) {
            return runPipedMethods(newValue, cloneMethods, onComplete);
        }
        onComplete(newValue);
        // return newValue = next
    };
    let handler = next;
    const setHandler = (x) => handler = x;
    const pipeUtils = { setHandler, next };
    const methodResponse = firstMethod(value, pipeUtils);
    handler(methodResponse);
}


/***/ }),

/***/ "../main/ts/subject/ValueSubject.ts":
/*!******************************************!*\
  !*** ../main/ts/subject/ValueSubject.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValueSubject: () => (/* binding */ ValueSubject)
/* harmony export */ });
/* harmony import */ var _Subject_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subject.class */ "../main/ts/subject/Subject.class.ts");

class ValueSubject extends _Subject_class__WEBPACK_IMPORTED_MODULE_0__.Subject {
    value;
    constructor(value) {
        super(value);
        this.value = value;
    }
    subscribe(callback) {
        const subscription = super.subscribe(callback);
        // Call the callback immediately with the current value
        callback(this.value, subscription);
        return subscription;
    }
}


/***/ }),

/***/ "../main/ts/subject/combineLatest.function.ts":
/*!****************************************************!*\
  !*** ../main/ts/subject/combineLatest.function.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   combineLatest: () => (/* binding */ combineLatest)
/* harmony export */ });
/* harmony import */ var _Subject_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subject.class */ "../main/ts/subject/Subject.class.ts");

function combineLatest(subjects) {
    const output = new _Subject_class__WEBPACK_IMPORTED_MODULE_0__.Subject();
    const subscribe = (callback) => {
        const valuesSeen = [];
        const values = [];
        const setValue = (x, index) => {
            valuesSeen[index] = true;
            values[index] = x;
            if (valuesSeen.length === subjects.length && valuesSeen.every(x => x)) {
                callback(values, subscription);
            }
        };
        const clones = [...subjects];
        const firstSub = clones.shift();
        const subscription = firstSub.subscribe(x => setValue(x, 0));
        const subscriptions = clones.map((subject, index) => subject.subscribe(x => setValue(x, index + 1)));
        subscription.subscriptions = subscriptions;
        return subscription;
    };
    output.subscribeWith = subscribe;
    return output;
}


/***/ }),

/***/ "../main/ts/subject/index.ts":
/*!***********************************!*\
  !*** ../main/ts/subject/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subject: () => (/* reexport safe */ _Subject_class__WEBPACK_IMPORTED_MODULE_0__.Subject),
/* harmony export */   ValueSubject: () => (/* reexport safe */ _ValueSubject__WEBPACK_IMPORTED_MODULE_1__.ValueSubject),
/* harmony export */   combineLatest: () => (/* reexport safe */ _combineLatest_function__WEBPACK_IMPORTED_MODULE_2__.combineLatest),
/* harmony export */   willCallback: () => (/* reexport safe */ _will_functions__WEBPACK_IMPORTED_MODULE_3__.willCallback),
/* harmony export */   willPromise: () => (/* reexport safe */ _will_functions__WEBPACK_IMPORTED_MODULE_3__.willPromise),
/* harmony export */   willSubscribe: () => (/* reexport safe */ _will_functions__WEBPACK_IMPORTED_MODULE_3__.willSubscribe)
/* harmony export */ });
/* harmony import */ var _Subject_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subject.class */ "../main/ts/subject/Subject.class.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/subject/ValueSubject.ts");
/* harmony import */ var _combineLatest_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./combineLatest.function */ "../main/ts/subject/combineLatest.function.ts");
/* harmony import */ var _will_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./will.functions */ "../main/ts/subject/will.functions.ts");






/***/ }),

/***/ "../main/ts/subject/will.functions.ts":
/*!********************************************!*\
  !*** ../main/ts/subject/will.functions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   willCallback: () => (/* binding */ willCallback),
/* harmony export */   willPromise: () => (/* binding */ willPromise),
/* harmony export */   willSubscribe: () => (/* binding */ willSubscribe)
/* harmony export */ });
function willCallback(callback) {
    return ((lastValue, utils) => {
        utils.setHandler(() => {
            return undefined;
        });
        callback(lastValue, utils.next);
    });
}
/** .pipe( promise((x) => Promise.resolve(44)) ) */
function willPromise(callback) {
    return ((lastValue, utils) => {
        utils.setHandler(() => {
            return undefined;
        }); // do nothing on initial return
        const result = callback(lastValue);
        result.then(x => utils.next(x));
    });
}
/** .pipe( willSubscribe((x) => new ValueSubject(44)) ) */
const willSubscribe = (callback) => {
    return ((lastValue, utils) => {
        utils.setHandler(() => {
            return undefined;
        }); // do nothing on initial return
        const result = callback(lastValue);
        const subscription = result.subscribe(x => {
            subscription.unsubscribe();
            utils.next(x);
        });
    });
};


/***/ }),

/***/ "../main/ts/tag.ts":
/*!*************************!*\
  !*** ../main/ts/tag.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tag: () => (/* binding */ tag),
/* harmony export */   tags: () => (/* binding */ tags)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "../main/ts/state/index.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _interpolations_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolations/bindSubjectCallback.function */ "../main/ts/interpolations/bindSubjectCallback.function.ts");
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _alterProps_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alterProps.function */ "../main/ts/alterProps.function.ts");
/* harmony import */ var _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./subject/ValueSubject */ "../main/ts/subject/ValueSubject.ts");








const tags = [];
let tagCount = 0;
/** Wraps a tag component in a state manager and always push children to last argument as an array */
// export function tag<T>(a: T): T;
function tag(tagComponent) {
    /** function developer triggers */
    const result = (function tagWrapper(props, children) {
        // is the props argument actually children?
        const isPropTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagClass)(props) || (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagTemplater)(props) || (0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(props);
        if (isPropTag) {
            children = props;
            props = undefined;
        }
        const { childSubject, madeSubject } = kidsToTagArraySubject(children);
        childSubject.isChildSubject = true;
        const templater = new _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__.TemplaterResult(props, childSubject);
        // attach memory back to original function that contains developer display logic
        const innerTagWrap = getTagWrap(templater, madeSubject);
        innerTagWrap.original = tagComponent.lastResult?.original || tagComponent;
        templater.tagged = true;
        templater.wrapper = innerTagWrap;
        return templater;
    }); // we override the function provided and pretend original is what's returned
    updateResult(result, tagComponent);
    // group tags together and have hmr pickup
    updateComponent(tagComponent);
    tags.push(tagComponent);
    // fake the return as being (props?, children?) => TemplaterResult
    return result;
}
function kidsToTagArraySubject(children) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isSubjectInstance)(children)) {
        return { childSubject: children, madeSubject: false };
    }
    const kidArray = children;
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(kidArray)) {
        return { childSubject: new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_7__.ValueSubject(children), madeSubject: true };
    }
    const kid = children;
    if (kid) {
        kid.memory.arrayValue = 0;
        return { childSubject: new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_7__.ValueSubject([kid]), madeSubject: true };
    }
    return {
        childSubject: new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_7__.ValueSubject([]),
        madeSubject: true
    };
}
function updateResult(result, tagComponent) {
    result.isTag = true;
    result.original = tagComponent;
}
function updateComponent(tagComponent) {
    tagComponent.tags = tags;
    tagComponent.setUse = _state__WEBPACK_IMPORTED_MODULE_1__.setUse;
    tagComponent.tagIndex = tagCount++; // needed for things like HMR
    tagComponent.lastResult = tagComponent;
}
/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
function getTagWrap(templater, madeSubject) {
    // this function gets called by taggedjs
    const innerTagWrap = function (oldTagSetup, subject) {
        const global = oldTagSetup.global;
        ++global.renderCount;
        const childSubject = templater.children;
        const lastArray = global.oldest?.templater.children.lastArray;
        if (lastArray) {
            childSubject.lastArray = lastArray;
        }
        const originalFunction = innerTagWrap.original;
        let props = templater.props;
        let castedProps = (0,_alterProps_function__WEBPACK_IMPORTED_MODULE_6__.alterProps)(props, oldTagSetup.ownerTagSupport);
        const clonedProps = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_4__.deepClone)(props); // castedProps
        // CALL ORIGINAL COMPONENT FUNCTION
        const tag = originalFunction(castedProps, childSubject);
        tag.templater = templater;
        templater.tag = tag;
        const tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_5__.TagSupport(templater, oldTagSetup.ownerTagSupport, subject, global.renderCount);
        tagSupport.global = global;
        tagSupport.propsConfig = {
            latest: props,
            latestCloned: clonedProps,
            lastClonedKidValues: tagSupport.propsConfig.lastClonedKidValues,
        };
        tagSupport.memory = oldTagSetup.memory; // state handover
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
                        const ownerSupport = tagSupport.ownerTagSupport;
                        (0,_interpolations_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_3__.runTagCallback)(value, // callback
                        ownerSupport, this, // bindTo
                        args);
                    };
                    valuesValue.isChildOverride = true;
                });
            });
        }
        return tagSupport;
    };
    return innerTagWrap;
}


/***/ }),

/***/ "../main/ts/tagElement.ts":
/*!********************************!*\
  !*** ../main/ts/tagElement.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runWrapper: () => (/* binding */ runWrapper),
/* harmony export */   tagElement: () => (/* binding */ tagElement)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subject/ValueSubject */ "../main/ts/subject/ValueSubject.ts");



const appElements = [];
function tagElement(app, // (...args: unknown[]) => TemplaterResult,
element, props) {
    const appElmIndex = appElements.findIndex(appElm => appElm.element === element);
    if (appElmIndex >= 0) {
        appElements[appElmIndex].tagSupport.destroy();
        appElements.splice(appElmIndex, 1);
        // an element already had an app on it
        console.warn('Found and destroyed app element already rendered to element', { element });
    }
    // Create the app which returns [props, runOneTimeFunction]
    const wrapper = app(props);
    // have a function setup and call the tagWrapper with (props, {update, async, on})
    const tagSupport = runWrapper(wrapper);
    // TODO: is the below needed?
    tagSupport.appElement = element;
    tagSupport.isApp = true;
    tagSupport.global.isApp = true;
    const templateElm = document.createElement('template');
    templateElm.setAttribute('id', 'app-tag-' + appElements.length);
    templateElm.setAttribute('app-tag-detail', appElements.length.toString());
    element.appendChild(templateElm);
    element.destroy = async () => {
        await tagSupport.destroy();
        const insertBefore = tagSupport.global.insertBefore;
        const parentNode = insertBefore.parentNode;
        parentNode.removeChild(insertBefore);
    };
    tagSupport.buildBeforeElement(templateElm);
    tagSupport.global.oldest = tagSupport;
    tagSupport.global.newest = tagSupport;
    element.setUse = app.original.setUse;
    appElements.push({ element, tagSupport });
    return {
        tagSupport,
        tags: app.original.tags,
    };
}
function runWrapper(templater) {
    let newSupport = {};
    const subject = new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_2__.ValueSubject(newSupport);
    newSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.BaseTagSupport(templater, subject);
    subject.set(templater);
    subject.tagSupport = newSupport;
    (0,_tagRunner__WEBPACK_IMPORTED_MODULE_1__.runBeforeRender)(newSupport, undefined);
    // Call the apps function for our tag templater
    const wrapper = templater.wrapper;
    const tagSupport = wrapper(newSupport, subject);
    (0,_tagRunner__WEBPACK_IMPORTED_MODULE_1__.runAfterRender)(newSupport, tagSupport);
    return tagSupport;
}


/***/ }),

/***/ "../main/ts/tagRunner.ts":
/*!*******************************!*\
  !*** ../main/ts/tagRunner.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInCycle: () => (/* binding */ isInCycle),
/* harmony export */   runAfterRender: () => (/* binding */ runAfterRender),
/* harmony export */   runBeforeDestroy: () => (/* binding */ runBeforeDestroy),
/* harmony export */   runBeforeRedraw: () => (/* binding */ runBeforeRedraw),
/* harmony export */   runBeforeRender: () => (/* binding */ runBeforeRender)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "../main/ts/state/index.ts");
/* harmony import */ var _subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subject */ "../main/ts/subject/index.ts");
// TODO: This should be more like `new TaggedJs().use({})`


// Emits event at the end of a tag being rendered. Use tagClosed$.toPromise() to render a tag after a current tag is done rendering
_state__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.tagClosed$ = new _subject__WEBPACK_IMPORTED_MODULE_1__.Subject(undefined, subscription => {
    if (!isInCycle()) {
        subscription.next(); // we are not currently processing so process now
    }
});
function isInCycle() {
    return _state__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.stateConfig.tagSupport;
}
// Life cycle 1
function runBeforeRender(tagSupport, ownerSupport) {
    _state__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, ownerSupport));
}
// Life cycle 2
function runAfterRender(tagSupport, ownerTagSupport) {
    _state__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, ownerTagSupport));
    _state__WEBPACK_IMPORTED_MODULE_0__.setUse.memory.tagClosed$.next(ownerTagSupport);
}
// Life cycle 3
function runBeforeRedraw(tagSupport, ownerTagSupport) {
    _state__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, ownerTagSupport));
}
// Life cycle 4 - end of life
function runBeforeDestroy(tagSupport, ownerTagSupport) {
    _state__WEBPACK_IMPORTED_MODULE_0__.setUse.tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, ownerTagSupport));
}


/***/ }),

/***/ "../main/ts/updateBeforeTemplate.function.ts":
/*!***************************************************!*\
  !*** ../main/ts/updateBeforeTemplate.function.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateBeforeTemplate: () => (/* binding */ updateBeforeTemplate)
/* harmony export */ });
// Function to update the value of x
function updateBeforeTemplate(value, lastFirstChild) {
    const parent = lastFirstChild.parentNode;
    let castedValue = value;
    // mimic React skipping to display EXCEPT for true does display on page
    if ([undefined, false, null].includes(value)) { // || value === true
        castedValue = '';
    }
    // Insert the new value (never use innerHTML here)
    const textNode = document.createTextNode(castedValue); // never innerHTML
    parent.insertBefore(textNode, lastFirstChild);
    /* remove existing nodes */
    parent.removeChild(lastFirstChild);
    return textNode;
}


/***/ }),

/***/ "../main/ts/updateContextItem.function.ts":
/*!************************************************!*\
  !*** ../main/ts/updateContextItem.function.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateContextItem: () => (/* binding */ updateContextItem)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");


function updateContextItem(context, variableName, value) {
    const subject = context[variableName];
    const tagSubject = subject;
    const tagSupport = tagSubject.tagSupport;
    if (tagSupport) {
        if (value) {
            if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagComponent)(value)) {
                const templater = value;
                let newSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_1__.TagSupport(templater, tagSupport.ownerTagSupport, subject);
                if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagComponent)(tagSupport)) {
                    shareTemplaterGlobal(tagSupport, newSupport);
                }
            }
        }
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isSubjectInstance)(value)) {
        return; // emits on its own
    }
    // listeners will evaluate updated values to possibly update display(s)
    subject.set(value);
    return;
}
function shareTemplaterGlobal(oldTagSupport, tagSupport) {
    const oldTemp = oldTagSupport.templater;
    const oldWrap = oldTemp.wrapper; // tag versus component
    const oldValueFn = oldWrap.original;
    const templater = tagSupport.templater;
    const newWrapper = templater.wrapper;
    const newValueFn = newWrapper?.original;
    const fnMatched = oldValueFn === newValueFn;
    if (fnMatched) {
        tagSupport.global = oldTagSupport.global;
        // ??? new mirroring transfer state
        const newest = oldTagSupport.global.newest;
        if (newest) {
            const prevState = newest.memory.state;
            tagSupport.memory.state = [...prevState];
        }
    }
}


/***/ }),

/***/ "../main/ts/updateExistingTagComponent.function.ts":
/*!*********************************************************!*\
  !*** ../main/ts/updateExistingTagComponent.function.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateExistingTagComponent: () => (/* binding */ updateExistingTagComponent)
/* harmony export */ });
/* harmony import */ var _hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasTagSupportChanged.function */ "../main/ts/hasTagSupportChanged.function.ts");
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");
/* harmony import */ var _renderTagSupport_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTagSupport.function */ "../main/ts/renderTagSupport.function.ts");
/* harmony import */ var _alterProps_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alterProps.function */ "../main/ts/alterProps.function.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");






function updateExistingTagComponent(ownerSupport, tagSupport, // lastest
subject, insertBefore) {
    // ??? changed during mirroring
    // let lastSupport = subject.tagSupport
    let lastSupport = subject.tagSupport?.global.newest; // || subject.tagSupport
    let oldestTag = lastSupport.global.oldest;
    const oldWrapper = lastSupport.templater.wrapper;
    const newWrapper = tagSupport.templater.wrapper;
    let isSameTag = false;
    if (oldWrapper && newWrapper) {
        const oldFunction = oldWrapper.original;
        const newFunction = newWrapper.original;
        isSameTag = oldFunction === newFunction;
    }
    const templater = tagSupport.templater;
    if (!isSameTag) {
        const oldestSupport = lastSupport.global.oldest;
        (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(oldestSupport, subject);
        return (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_1__.processSubjectComponent)(templater, subject, insertBefore, ownerSupport, {
            forceElement: false,
            counts: { added: 0, removed: 0 },
        });
    }
    else {
        const hasChanged = (0,_hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__.hasTagSupportChanged)(lastSupport, tagSupport, templater);
        if (!hasChanged) {
            // if the new props are an object then implicitly since no change, the old props are an object
            const newProps = templater.props;
            if (newProps && typeof (newProps) === 'object') {
                syncFunctionProps(lastSupport, ownerSupport, newProps);
            }
            return lastSupport; // its the same tag component
        }
    }
    const previous = lastSupport.global.newest;
    const newSupport = (0,_renderTagSupport_function__WEBPACK_IMPORTED_MODULE_3__.renderTagSupport)(tagSupport, false);
    lastSupport = subject.tagSupport;
    const newOldest = newSupport.global.oldest;
    const hasOldest = newOldest ? true : false;
    if (!hasOldest) {
        return buildNewTag(newSupport, insertBefore, lastSupport, subject);
    }
    if (newOldest && templater.children.value.length) {
        const oldKidsSub = newOldest.templater.children;
        oldKidsSub.set(templater.children.value);
    }
    // detect if both the function is the same and the return is the same
    const isLikeTag = isSameTag && (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_5__.isLikeTags)(previous, newSupport);
    if (isLikeTag) {
        subject.tagSupport = newSupport;
        oldestTag.updateBy(newSupport); // the oldest tag has element references
        return newSupport;
    }
    else {
        // Although function looked the same it returned a different html result
        if (isSameTag && lastSupport) {
            (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_2__.destroyTagMemory)(lastSupport, subject);
            newSupport.global.context = {}; // do not share previous outputs
        }
        oldestTag = undefined;
    }
    if (!oldestTag) {
        lastSupport = newSupport;
        buildNewTag(newSupport, lastSupport.global.insertBefore, lastSupport, subject);
    }
    lastSupport.global.newest = newSupport;
    return newSupport;
}
function buildNewTag(newSupport, oldInsertBefore, oldTagSupport, subject) {
    newSupport.buildBeforeElement(oldInsertBefore, {
        forceElement: true,
        counts: { added: 0, removed: 0 },
    });
    newSupport.global.oldest = newSupport;
    newSupport.global.newest = newSupport;
    oldTagSupport.global.oldest = newSupport;
    oldTagSupport.global.newest = newSupport;
    subject.tagSupport = newSupport;
    return newSupport;
}
function syncFunctionProps(lastSupport, ownerSupport, newProps) {
    lastSupport = lastSupport.global.newest || lastSupport;
    const priorPropConfig = lastSupport.propsConfig;
    const priorProps = priorPropConfig.latestCloned;
    const prevSupport = ownerSupport.global.newest;
    Object.entries(priorProps).forEach(([name, value]) => {
        if (!(value instanceof Function)) {
            return;
        }
        // TODO: The code below maybe irrelevant
        const newCallback = newProps[name];
        const original = newCallback.original;
        if (original) {
            return; // already previously converted
        }
        // Currently, call self but over parent state changes, I may need to call a newer parent tag owner
        priorProps[name].toCall = (...args) => {
            return (0,_alterProps_function__WEBPACK_IMPORTED_MODULE_4__.callbackPropOwner)(newCallback, // value, // newOriginal,
            args, prevSupport);
        };
        return;
    });
}


/***/ }),

/***/ "../main/ts/updateExistingValue.function.ts":
/*!**************************************************!*\
  !*** ../main/ts/updateExistingValue.function.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateExistingValue: () => (/* binding */ updateExistingValue)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _processTagArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./processTagArray */ "../main/ts/processTagArray.ts");
/* harmony import */ var _updateExistingTagComponent_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./updateExistingTagComponent.function */ "../main/ts/updateExistingTagComponent.function.ts");
/* harmony import */ var _processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./processRegularValue.function */ "../main/ts/processRegularValue.function.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");
/* harmony import */ var _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./subject/ValueSubject */ "../main/ts/subject/ValueSubject.ts");
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _interpolations_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./interpolations/bindSubjectCallback.function */ "../main/ts/interpolations/bindSubjectCallback.function.ts");
/* harmony import */ var _processTag_function__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./processTag.function */ "../main/ts/processTag.function.ts");
/* harmony import */ var _insertAfter_function__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./insertAfter.function */ "../main/ts/insertAfter.function.ts");













function updateExistingValue(subject, value, ownerSupport, insertBefore) {
    const subjectTag = subject;
    const isComponent = (0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagComponent)(value);
    (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_6__.checkDestroyPrevious)(subject, value, insertBefore);
    // handle already seen tag components
    if (isComponent) {
        return prepareUpdateToComponent(value, subjectTag, insertBefore, ownerSupport);
    }
    // was component but no longer
    const tagSupport = subjectTag.tagSupport;
    if (tagSupport) {
        handleStillTag(subject, value, ownerSupport);
        return subjectTag;
    }
    // its another tag array
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagArray)(value)) {
        (0,_processTagArray__WEBPACK_IMPORTED_MODULE_3__.processTagArray)(subject, value, insertBefore, // oldInsertBefore as InsertBefore,
        ownerSupport, { counts: {
                added: 0,
                removed: 0,
            } });
        return subject;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagTemplater)(value)) {
        (0,_processTag_function__WEBPACK_IMPORTED_MODULE_11__.processTag)(value, insertBefore, ownerSupport, subjectTag);
        return subjectTag;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagClass)(value)) {
        const tag = value;
        let templater = tag.templater;
        if (!templater) {
            templater = (0,_processTag_function__WEBPACK_IMPORTED_MODULE_11__.getFakeTemplater)();
            tag.templater = templater;
            templater.tag = tag;
        }
        (0,_processTag_function__WEBPACK_IMPORTED_MODULE_11__.processTag)(templater, insertBefore, ownerSupport, subjectTag);
        return subjectTag;
    }
    // we have been given a subject
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isSubjectInstance)(value)) {
        return value;
    }
    // now its a function
    if (value instanceof Function) {
        const bound = (0,_interpolations_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_10__.bindSubjectCallback)(value, ownerSupport);
        subject.set(bound);
        return subject;
    }
    // This will cause all other values to render
    (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, insertBefore);
    return subjectTag;
}
function handleStillTag(subject, value, ownerSupport) {
    const lastSupport = subject.tagSupport;
    let templater = value;
    const isClass = (0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagClass)(value);
    if (isClass) {
        const tag = value;
        templater = tag.templater;
        if (!templater) {
            const children = new _subject_ValueSubject__WEBPACK_IMPORTED_MODULE_7__.ValueSubject([]);
            templater = new _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_1__.TemplaterResult(undefined, children);
            templater.tag = tag;
            tag.templater = templater;
        }
    }
    const valueSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.TagSupport(templater, ownerSupport, subject);
    if (isClass) {
        valueSupport.global = lastSupport.global;
    }
    const isSameTag = value && (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_9__.isLikeTags)(lastSupport, valueSupport);
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_2__.isTagTemplater)(value)) {
        (0,_processTag_function__WEBPACK_IMPORTED_MODULE_11__.setupNewTemplater)(valueSupport, ownerSupport, subject);
    }
    if (isSameTag) {
        lastSupport.updateBy(valueSupport);
        return;
    }
    if (isSameTag) {
        // const subjectTag = subject as TagSubject
        const global = lastSupport.global;
        const insertBefore = global.insertBefore;
        return (0,_processTag_function__WEBPACK_IMPORTED_MODULE_11__.processTag)(templater, insertBefore, ownerSupport, subject);
    }
    return (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, subject.insertBefore);
}
function prepareUpdateToComponent(templater, subjectTag, insertBefore, ownerSupport) {
    // When last value was not a component
    if (!subjectTag.tagSupport) {
        (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_8__.processSubjectComponent)(templater, subjectTag, insertBefore, // oldInsertBefore as InsertBefore,
        ownerSupport, {
            forceElement: true,
            counts: { added: 0, removed: 0 },
        });
        return subjectTag;
    }
    const tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.TagSupport(templater, ownerSupport, subjectTag);
    const subjectSup = subjectTag.tagSupport;
    const prevSupport = subjectSup.global.newest;
    if (prevSupport) {
        const newestState = prevSupport.memory.state;
        tagSupport.memory.state = [...newestState];
    }
    else {
        const placeholder = subjectSup.global.placeholder;
        if (placeholder && !insertBefore.parentNode) {
            (0,_insertAfter_function__WEBPACK_IMPORTED_MODULE_12__.insertAfter)(insertBefore, placeholder);
            delete subjectSup.global.placeholder;
        }
        (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_8__.processSubjectComponent)(templater, subjectTag, insertBefore, ownerSupport, {
            forceElement: true,
            counts: { added: 0, removed: 0 },
        });
        return subjectTag;
    }
    tagSupport.global = subjectSup.global;
    subjectTag.tagSupport = tagSupport;
    (0,_updateExistingTagComponent_function__WEBPACK_IMPORTED_MODULE_4__.updateExistingTagComponent)(ownerSupport, tagSupport, // latest value
    subjectTag, insertBefore);
    return subjectTag;
}


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* reexport safe */ _app_component__WEBPACK_IMPORTED_MODULE_0__.App),
/* harmony export */   IsolatedApp: () => (/* reexport safe */ _isolatedApp__WEBPACK_IMPORTED_MODULE_1__.IsolatedApp),
/* harmony export */   app: () => (/* reexport safe */ _app_function__WEBPACK_IMPORTED_MODULE_3__.app),
/* harmony export */   hmr: () => (/* reexport safe */ taggedjs__WEBPACK_IMPORTED_MODULE_2__.hmr)
/* harmony export */ });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app.component.ts");
/* harmony import */ var _isolatedApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isolatedApp */ "./src/isolatedApp.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _app_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.function */ "./src/app.function.ts");





})();

var __webpack_exports__App = __webpack_exports__.App;
var __webpack_exports__IsolatedApp = __webpack_exports__.IsolatedApp;
var __webpack_exports__app = __webpack_exports__.app;
var __webpack_exports__hmr = __webpack_exports__.hmr;
export { __webpack_exports__App as App, __webpack_exports__IsolatedApp as IsolatedApp, __webpack_exports__app as app, __webpack_exports__hmr as hmr };

//# sourceMappingURL=bundle.js.map