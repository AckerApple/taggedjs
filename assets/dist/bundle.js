/******/ var __webpack_modules__ = ({

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   propsDebugMain: () => (/* binding */ propsDebugMain)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


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
    console.log('highest propNumber', propNumber);
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
    <textarea id="props-debug-textarea" wrap="off" onchange=${propsJsonChanged}
      style="height:200px;font-size:0.6em;width:100%"
      oninit=${() => console.log('text area init')}
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
            console.log('highest received new value', x);
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
    console.log('parent prop number', propNumber);
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
            console.log('parent increase number', propNumber);
        } })}
    
    ${ /*renderCountDiv({renderCount, name: 'propsDebug'})*/false}
  `;
});
const propFnUpdateTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.tag)(({ propNumber, callback, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount;
    console.log('propFnUpdateTest - propNumber', propNumber);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/* harmony import */ var _childTests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./childTests */ "./src/childTests.ts");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tests */ "./src/tests.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var _countersDebug__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./countersDebug */ "./src/countersDebug.ts");
/* harmony import */ var _providerDebug__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./providerDebug */ "./src/providerDebug.ts");











const App = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)(() => {
    console.log('render app.ts');
    let _firstState = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)('app first state')(x => [_firstState, _firstState = x]);
    let toggleValue = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(false)(x => [toggleValue, toggleValue = x]);
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
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.onInit)(() => runTesting(false));
    const content = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `<!--app.js-->
    <h1 id="h1-app">🏷️ TaggedJs - ${2 + 2}</h1>

    <button id="toggle-test" onclick=${toggle}>toggle test ${toggleValue}</button>
    <button onclick=${runTesting}>run test</button>

    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_8__.renderCountDiv)({ name: 'app', renderCount })}

    <div id="tagDebug-fx-wrap">
      <div style="display:flex;flex-wrap:wrap;gap:1em">
        <fieldset id="counters" style="flex:2 2 20em">
          <legend>counters</legend>
          ${(0,_countersDebug__WEBPACK_IMPORTED_MODULE_9__.counters)()}
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
    console.log('array test', { x: players[0]?.scores[0]?.score });
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `<!--arrayTests.js-->
    <div style="display:flex;flex-wrap:wrap;gap:1em">
      ${players.map((item, index) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
        <div oninit=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateInit} ondestroy=${_animations__WEBPACK_IMPORTED_MODULE_0__.animateDestroy} style="background-color:black;">
          <button onclick=${() => {
        players.splice(index, 1);
    }}>remove</button>

          <div>
            name:${item.name}
          </div>
          <div>
            index:${index}
          </div>
          
          <div style="background-color:purple;padding:.5em">
            scores:${item.scores.map((score, playerIndex) => (0,taggedjs__WEBPACK_IMPORTED_MODULE_2__.html) `
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
          
          <button onclick=${() => {
        players.splice(index, 1);
    }}>remove</button>
          <button onclick=${() => {
        players.splice(index, 0, getNewPerson());
    }}>add before</button>
        </div>
      `.key(item))}
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
    console.log('inner render', score.score);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attributeDebug: () => (/* binding */ attributeDebug)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   childTests: () => (/* binding */ childTests)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _innerHtmlTests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./innerHtmlTests */ "./src/innerHtmlTests.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");



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
        >increase childTests inside ${counter}:${renderCount}</button>
        <span id="innerHtmlTest-childTests-display">${counter}</span>
        ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'childTests-innerHtmlTest' })}
      `)}

      ${(0,_innerHtmlTests__WEBPACK_IMPORTED_MODULE_1__.innerHtmlPropsTest)(22, (0,taggedjs__WEBPACK_IMPORTED_MODULE_0__.html) `
        <b>Field set body B</b>
        <hr />
        <button id="innerHtmlPropsTest-childTests-button"
          onclick=${() => ++counter}
        >increase childTests inside 22 ${counter}</button>
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
      >increase childTests outside ${counter} - ${renderCount}</button>
      <span id="childTests-display">${counter}</span>
      ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_2__.renderCountDiv)({ renderCount, name: 'childTests' })}
    </fieldset>
  `;
});


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
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");


const counters = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.tag)(() => {
    let counter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.setLet)(0)(x => [counter, counter = x]);
    let propCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.setLet)(0)(x => [propCounter, propCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.setLet)(0)(x => [renderCount, renderCount = x]);
    let initCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.setLet)(0)(x => [initCounter, initCounter = x]);
    (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.onInit)(() => {
        ++initCounter;
        console.info('tagJsDebug.js: 👉 i should only ever run once');
    });
    const increaseCounter = () => {
        ++counter;
        console.log('counter increased', counter);
    };
    const increasePropCounter = () => {
        ++propCounter;
        console.log('propCounter increased', propCounter);
    };
    ++renderCount; // for debugging
    console.log('---- parent render ----');
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `<!--counters-->
    <div>Subscriptions:${taggedjs__WEBPACK_IMPORTED_MODULE_1__.Subject.globalSubCount$}</div>
    <button onclick=${() => console.info('subs', taggedjs__WEBPACK_IMPORTED_MODULE_1__.Subject.globalSubs)}>log subs</button>
    <div>initCounter:${initCounter}</div>

    <button id="increase-standalone-counter"
      onclick=${increaseCounter}
    >counter:${counter}</button>
    <span id="counter-standalone-display">${counter}</span>

    <button id="increase-counter"
      onclick=${increasePropCounter}
    >propCounter:${propCounter}</button>
    <span id="counter-display">${propCounter}</span>
    
    <fieldset>
      <legend>inner counter</legend>
      ${innerCounters({ propCounter, increasePropCounter })}
    </fieldset>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_0__.renderCountDiv)({ renderCount, name: 'counters' })}
  `;
});
const innerCounters = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.tag)(({ propCounter, increasePropCounter, }) => {
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.setLet)(0)(x => [renderCount, renderCount = x]);
    ++renderCount; // for debugging
    console.log('---- inner counters ----', { propCounter, renderCount });
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.html) `
    <button id="inner-increase-counter" onclick=${increasePropCounter}
    >propCounter:${propCounter}</button>
    <span id="inner-counter-display">${propCounter}</span>
    <div>renderCount:${renderCount}</div>
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_0__.renderCountDiv)({ renderCount, name: 'inner counters' })}
  `;
});


/***/ }),

/***/ "./src/expect.ts":
/*!***********************!*\
  !*** ./src/expect.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   execute: () => (/* binding */ execute),
/* harmony export */   expect: () => (/* binding */ expect),
/* harmony export */   it: () => (/* binding */ it)
/* harmony export */ });
const onlyTests = [];
const tests = [];
function it(label, run) {
    tests.push(() => {
        try {
            run();
            console.debug('✅ ' + label);
        }
        catch (error) {
            console.debug('❌ ' + label);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   innerHtmlPropsTest: () => (/* binding */ innerHtmlPropsTest),
/* harmony export */   innerHtmlTest: () => (/* binding */ innerHtmlTest)
/* harmony export */ });
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");


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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsolatedApp: () => (/* binding */ IsolatedApp)
/* harmony export */ });
/* harmony import */ var _childTests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./childTests */ "./src/childTests.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _arrayTests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrayTests */ "./src/arrayTests.ts");
/* harmony import */ var _tagSwitchDebug_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tagSwitchDebug.component */ "./src/tagSwitchDebug.component.ts");
/* harmony import */ var _PropsDebug_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PropsDebug.component */ "./src/PropsDebug.component.ts");
/* harmony import */ var _providerDebug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./providerDebug */ "./src/providerDebug.ts");
/* harmony import */ var _countersDebug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./countersDebug */ "./src/countersDebug.ts");
/* harmony import */ var _tableDebug_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tableDebug.component */ "./src/tableDebug.component.ts");








const IsolatedApp = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.tag)(() => {
    const stateTest = (0,taggedjs__WEBPACK_IMPORTED_MODULE_1__.set)('isolated-app-state');
    // const component = childTests() as any
    // const template = component.wrapper().getTemplate()
    const views = [
        'arrays',
        // 'props',
        // 'tagSwitchDebug',
        // 'counters',
    ];
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
            ${(0,_countersDebug__WEBPACK_IMPORTED_MODULE_6__.counters)()}
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
const providerDebugBase = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.tag)((_x = 'providerDebugBase') => {
    const provider = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(_tagJsDebug__WEBPACK_IMPORTED_MODULE_2__.tagDebugProvider);
    // TODO: Fix provider create typing
    const providerClass = taggedjs__WEBPACK_IMPORTED_MODULE_3__.providers.create(TagDebugProvider);
    const test = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)('props debug base');
    let propCounter = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [propCounter, propCounter = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [renderCount, renderCount = x]);
    console.log('x.0', propCounter);
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
      <button id="increase-provider-🍌-0-button" onclick=${() => ++provider.test}
      >🍌 increase provider.test ${provider.test}</button>
      <span id="increase-provider-🍌-0-display">${provider.test}</span>
      
      <button id="increase-provider-upper-🌹-0-button" onclick=${() => ++provider.upper.test}
      >🌹 increase upper.provider.test ${provider.upper.test}</button>
      
      <span id="increase-provider-upper-🌹-0-display">${provider.upper.test}</span>
      <button id="increase-provider-🍀-0-button" onclick=${() => ++providerClass.tagDebug}
      >🍀 increase provider class ${providerClass.tagDebug}</button>
      <span id="increase-provider-🍀-0-display">${providerClass.tagDebug}</span>

      <button id="increase-prop-🐷-0-button" onclick=${() => ++propCounter}
      >🐷 increase propCounter ${propCounter}</button>
      <span id="increase-prop-🐷-0-display">${propCounter}</span>

      <button onclick=${() => providerClass.showDialog = true}
      >💬 toggle dialog ${providerClass.showDialog}</button>
    </div>

    <hr />
    ${providerDebug({
        propCounter,
        propCounterChange: x => {
            console.log('x', x);
            propCounter = x;
        }
    })}

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
    const test = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.set)('provider debug inner test');
    let showProProps = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(false)(x => [showProProps, showProProps = x]);
    let renderCount = (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.setLet)(0)(x => [renderCount, renderCount = x]);
    // let propCounter: number = setLet(0)(x => [propCounter, propCounter = x])
    ++renderCount;
    return (0,taggedjs__WEBPACK_IMPORTED_MODULE_3__.html) `<!--providerDebug.js-->
    <button id="increase-provider-🍌-1-button" onclick=${() => ++provider.test}
    >🍌 increase provider.test ${provider.test}</button>
    <span id="increase-provider-🍌-1-display">${provider.test}</span>
    
    <button id="increase-provider-upper-🌹-1-button" onclick=${() => ++upperProvider.test}
    >🌹 increase upper.provider.test ${upperProvider.test}</button>
        
    <span id="increase-provider-upper-🌹-1-display">${upperProvider.test}</span>
    <button id="increase-provider-🍀-1-button" onclick=${() => ++providerClass.tagDebug}
    >🍀 increase provider class ${providerClass.tagDebug}</button>
    <span id="increase-provider-🍀-1-display">${providerClass.tagDebug}</span>

    <div>
      <button id="increase-prop-🐷-1-button" onclick=${() => propCounterChange(++propCounter)}
      >🐷 increase propCounter ${propCounter}</button>
      <span id="increase-prop-🐷-1-display">${propCounter}</span>
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

    <hr />
    renderCount inner:${renderCount}
    ${(0,_renderCount_component__WEBPACK_IMPORTED_MODULE_1__.renderCountDiv)({ renderCount, name: 'providerDebugInner' })}
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tagDebug: () => (/* binding */ tagDebug),
/* harmony export */   tagDebugProvider: () => (/* binding */ tagDebugProvider),
/* harmony export */   upperTagDebugProvider: () => (/* binding */ upperTagDebugProvider)
/* harmony export */ });
/* harmony import */ var _PropsDebug_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropsDebug.component */ "./src/PropsDebug.component.ts");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animations */ "./src/animations.ts");
/* harmony import */ var _arrayTests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrayTests */ "./src/arrayTests.ts");
/* harmony import */ var _intervalDebug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intervalDebug */ "./src/intervalDebug.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");
/* harmony import */ var _renderCount_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderCount.component */ "./src/renderCount.component.ts");






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
    console.log('selectedTag', selectedTag);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runTests: () => (/* binding */ runTests)
/* harmony export */ });
/* harmony import */ var _expect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expect */ "./src/expect.ts");

function runTests() {
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('elements exists', () => {
        console.log('787');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(document.getElementById('h1-app')).toBeDefined();
        console.log('787-2');
        const toggleTest = document.getElementById('toggle-test');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(toggleTest).toBeDefined();
        console.log('787-3');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(toggleTest?.innerText).toBe('toggle test');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('toggle test', () => {
        const toggleTest = document.getElementById('toggle-test');
        toggleTest?.click();
        console.log('787-4');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(toggleTest?.innerText).toBe('toggle test true');
        toggleTest?.click();
        console.log('787-5');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(toggleTest?.innerText).toBe('toggle test');
        const propsTextarea = document.getElementById('props-debug-textarea');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(propsTextarea.value.replace(/\s/g, '')).toBe(`{"test":33,"x":"y"}`);
        console.log('788');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('basic increase counter', () => {
        testCounterElements('#increase-counter', '#counter-display');
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('props testing', () => {
        testDuelCounterElements(['#propsDebug-🥩-0-button', '#propsDebug-🥩-0-display'], ['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display']);
        testDuelCounterElements(['#propsDebug-🥩-1-button', '#propsDebug-🥩-1-display'], ['#propsOneLevelFunUpdate-🥩-button', '#propsOneLevelFunUpdate-🥩-display']);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(queryOneInnerHTML('#propsDebug-🥩-change-display')).toBe('9');
        const ownerHTML = document.querySelectorAll('#propsDebug-🥩-0-display')[0].innerHTML;
        const parentHTML = document.querySelectorAll('#propsDebug-🥩-1-display')[0].innerHTML;
        const childHTML = document.querySelectorAll('#propsOneLevelFunUpdate-🥩-display')[0].innerHTML;
        const ownerNum = Number(ownerHTML);
        const parentNum = Number(parentHTML);
        const childNum = Number(childHTML);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(parentNum).toBe(childNum);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(ownerNum + 2).toBe(parentNum); // testing of setProp() doesn't change owner
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('providers', async () => {
        testDuelCounterElements(['#increase-provider-🍌-0-button', '#increase-provider-🍌-0-display'], ['#increase-provider-🍌-1-button', '#increase-provider-🍌-1-display']);
        testDuelCounterElements(['#increase-provider-upper-🌹-0-button', '#increase-provider-upper-🌹-0-display'], ['#increase-provider-upper-🌹-1-button', '#increase-provider-upper-🌹-1-display']);
        testDuelCounterElements(['#increase-provider-🍀-0-button', '#increase-provider-🍀-0-display'], ['#increase-provider-🍀-1-button', '#increase-provider-🍀-1-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('provider debug', () => {
        testDuelCounterElements(['#increase-prop-🐷-0-button', '#increase-prop-🐷-0-display'], ['#increase-prop-🐷-1-button', '#increase-prop-🐷-1-display']);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('tagSwitching', () => {
        console.log('0 - 0');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#select-tag-above')).toBe(1, 'Expected select-tag-above element to be defined');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tag-switch-dropdown')).toBe(1, 'Expected one #tag-switch-dropdown');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-1-hello')).toBe(2, 'Expected two #tagSwitch-1-hello elements');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-2-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-3-hello')).toBe(0);
        console.log('0 - 1');
        const dropdown = document.getElementById('tag-switch-dropdown');
        dropdown.value = "1";
        dropdown.onchange({ target: dropdown });
        console.log('0 - 2');
        expectElementCount('#tagSwitch-1-hello', 5);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-2-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-3-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#select-tag-above')).toBe(0);
        dropdown.value = "2";
        dropdown.onchange({ target: dropdown });
        expectElementCount('#tagSwitch-1-hello', 2);
        expectElementCount('#tagSwitch-2-hello', 4);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-3-hello')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#select-tag-above')).toBe(0);
        dropdown.value = "3";
        dropdown.onchange({ target: dropdown });
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-1-hello')).toBe(0, 'Expected no hello 1s');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#tagSwitch-2-hello')).toBe(0);
        expectElementCount('#tagSwitch-3-hello', 7);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#select-tag-above')).toBe(0);
        dropdown.value = "";
        dropdown.onchange({ target: dropdown });
        expectElementCount('#select-tag-above', 1);
        expectElementCount('#tag-switch-dropdown', 1);
        expectElementCount('#tagSwitch-1-hello', 2);
        expectElementCount('#tagSwitch-2-hello', 0);
        expectElementCount('#tagSwitch-3-hello', 0);
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('array testing', () => {
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#array-test-push-item')).toBe(1);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#score-data-0-1-inside-button')).toBe(0);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#score-data-0-1-outside-button')).toBe(0);
        document.getElementById('array-test-push-item')?.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#score-data-0-1-inside-button')).toBe(1);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(elementCount('#score-data-0-1-outside-button')).toBe(1);
        const insideElm = document.getElementById('score-data-0-1-inside-button');
        const insideDisplay = document.getElementById('score-data-0-1-inside-display');
        let indexValue = insideDisplay?.innerText;
        const outsideElm = document.getElementById('score-data-0-1-outside-button');
        const outsideDisplay = document.getElementById('score-data-0-1-outside-display');
        const outsideValue = outsideDisplay?.innerText;
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(indexValue).toBe(outsideValue);
        insideElm?.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(insideDisplay?.innerText).toBe(outsideDisplay?.innerText);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(indexValue).toBe((Number(insideDisplay?.innerText) - 1).toString());
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(indexValue).toBe((Number(outsideDisplay?.innerText) - 1).toString());
        outsideElm?.click();
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(insideDisplay?.innerText).toBe(outsideDisplay?.innerText);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(indexValue).toBe((Number(insideDisplay?.innerText) - 2).toString());
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(indexValue).toBe((Number(outsideDisplay?.innerText) - 2).toString());
    });
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.it)('child tests', () => {
        testCounterElements('#innerHtmlPropsTest-button', '#innerHtmlPropsTest-display');
        testCounterElements('#innerHtmlTest-counter-button', '#innerHtmlTest-counter-display');
        testDuelCounterElements(['#childTests-button', '#childTests-display'], ['#innerHtmlPropsTest-childTests-button', '#innerHtmlPropsTest-childTests-display']);
        testDuelCounterElements(['#childTests-button', '#childTests-display'], ['#innerHtmlTest-childTests-button', '#innerHtmlTest-childTests-display']);
    });
    try {
        console.log('execute');
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.execute)();
        console.info('✅ all tests passed');
        return true;
    }
    catch (error) {
        console.error('❌ tests failed: ' + error.message, error);
        return false;
    }
}
function elementCount(selector) {
    return document.querySelectorAll(selector).length;
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
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(ip1Check).toBe(value, `Expected second increase provider to be increased to ${ip0} but got ${ip1Check}`);
    testCounterElements(button1, display1);
    query = expectElementCount(display1, 1);
    display1Element = query[0];
    ip1Check = display1Element.innerText;
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(ip1Check).toBe((Number(ip0) + 4).toString(), `Expected ${display1} innerText to be ${Number(ip0) + 4} but instead it is ${ip1Check}`);
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
        // const counterDisplay = getByIndex(index)
        console.log('clicked 0');
        let counterValue = Number(counterDisplay?.innerText);
        increaseCounter?.click();
        let oldCounterValue = counterValue + 1;
        counterValue = Number(counterDisplay?.innerText);
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to be value ${oldCounterValue} but is instead ${counterValue}`);
        console.log('clicked 1');
        increaseCounter?.click();
        counterValue = Number(counterDisplay?.innerText);
        ++oldCounterValue;
        (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(oldCounterValue).toBe(counterValue, `Expected element(s) ${counterDisplayId} to increase value to ${oldCounterValue} but is instead ${counterValue}`);
    });
}
function expectElementCount(query, count, message) {
    //  const found = elementCount(query)
    const elements = document.querySelectorAll(query);
    const found = elements.length;
    message = message || `Expected ${count} elements to match query ${query} but found ${found}`;
    (0,_expect__WEBPACK_IMPORTED_MODULE_0__.expect)(found).toBe(count, message);
    return elements;
}
function queryOneInnerHTML(query, pos = 0) {
    return document.querySelectorAll(query)[pos].innerHTML;
}


/***/ }),

/***/ "../main/ts/ElementTargetEvent.interface.ts":
/*!**************************************************!*\
  !*** ../main/ts/ElementTargetEvent.interface.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../main/ts/Subject.ts":
/*!*****************************!*\
  !*** ../main/ts/Subject.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayValueNeverSet: () => (/* binding */ ArrayValueNeverSet),
/* harmony export */   Tag: () => (/* binding */ Tag),
/* harmony export */   escapeSearch: () => (/* binding */ escapeSearch),
/* harmony export */   escapeVariable: () => (/* binding */ escapeVariable),
/* harmony export */   variablePrefix: () => (/* binding */ variablePrefix)
/* harmony export */ });
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "../main/ts/render.ts");
/* harmony import */ var _interpolateElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interpolateElement */ "../main/ts/interpolateElement.ts");
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolateTemplate */ "../main/ts/interpolateTemplate.ts");
/* harmony import */ var _elementDestroyCheck_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elementDestroyCheck.function */ "../main/ts/elementDestroyCheck.function.ts");
/* harmony import */ var _processNewValue_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./processNewValue.function */ "../main/ts/processNewValue.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");








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
        // the isComponent check maybe able to be removed
        const isComponent = this.tagSupport ? true : false;
        if (isComponent) {
            (0,_tagRunner__WEBPACK_IMPORTED_MODULE_0__.runBeforeDestroy)(this.tagSupport, this);
        }
        const childTags = options.byParent ? [] : getChildTagsToDestroy(this.childTags);
        delete this.tagSupport.templater.global.oldest;
        delete this.tagSupport.templater.global.newest;
        this.hasLiveElements = false;
        delete this.tagSupport.subject.tag;
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
        // ???
        // this.tagSupport.propsConfig = {...tag.tagSupport.propsConfig}
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
                const subject = context[variableName];
                const tag = subject.tag;
                if (tag) {
                    const oldWrap = tag.tagSupport.templater.wrapper; // tag versus component
                    if (oldWrap && (0,_isInstance__WEBPACK_IMPORTED_MODULE_6__.isTagComponent)(value)) {
                        const oldValueFn = oldWrap.original;
                        const newValueFn = value.wrapper?.original;
                        const fnMatched = oldValueFn === newValueFn;
                        if (fnMatched) {
                            const newTemp = value;
                            newTemp.global = tag.tagSupport.templater.global;
                            /*
                            const tagSubject = subject as TagSubject
                            if(!newTemp.tagSupport) {
                              const ownerTagSupport = tag.ownerTag?.tagSupport as TagSupport
                              newTemp.tagSupport = new TagSupport(ownerTagSupport, newTemp, tagSubject)
                            }
              
                            const redraw = renderTagSupport(newTemp.tagSupport, false)
              
                            if(!isLikeTags(tag, redraw)) {
                              destroyTagMemory(tag, subject as TagSubject)
                              newTemp.global = {...tag.tagSupport.templater.global}
                              newTemp.global.context = {}
                              const insertBefore = tag.tagSupport.templater.global.insertBefore as Element
                              redraw.buildBeforeElement(insertBefore)
                              throw new Error('clone time')
                            } else {
                              newTemp.global = tag.tagSupport.templater.global
                            }
                            */
                        }
                    }
                }
                // return updateExistingValue(subject, value, this)
                if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_6__.isSubjectInstance)(value)) {
                    // value.set(value.value)
                    return;
                }
                /*
                const subTag = (subject as any).tag
                if(subTag && !subTag.hasLiveElements) {
                  return
                }
                */
                subject.set(value);
                return;
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
            tagComponent.subject, tagComponent.ownerTag, options.counts, { isForceElement }, context, tagComponent.variableName, options.test);
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
        this.tagSupport.templater.global.oldest = this;
        this.tagSupport.templater.global.newest = this;
        this.tagSupport.subject.tag = this;
        this.hasLiveElements = true;
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
        // cTag.destroySubscriptions()
        allTags.push(cTag);
        childTags.splice(index, 1);
        getChildTagsToDestroy(cTag.childTags, allTags);
        /*
        for (let iIndex = this.childTags.length - 1; iIndex >= 0; --iIndex) {
          const iTag = this.childTags[iIndex]
          if(cTag === iTag) {
            this.childTags.splice(iIndex, 1)
          }
        }
        */
    }
    return allTags;
}


/***/ }),

/***/ "../main/ts/Tag.utils.ts":
/*!*******************************!*\
  !*** ../main/ts/Tag.utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSubjectFunction: () => (/* binding */ getSubjectFunction),
/* harmony export */   redrawTag: () => (/* binding */ redrawTag)
/* harmony export */ });
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");



function getSubjectFunction(value, tag) {
    return new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject((0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__.bindSubjectCallback)(value, tag));
}
/** for components */
function redrawTag(subject, templater, ownerTag) {
    const existingTag = subject.tag || templater.global.newest || templater.global.oldest;
    if (!templater.global.oldest) {
        throw new Error('issue before event redraw');
    }
    const tagSupport = templater.tagSupport; // || existingTag?.tagSupport
    if (!templater.tagSupport) {
        throw new Error('need tag support');
    }
    if (!tagSupport.templater.global.oldest) {
        throw new Error('33333');
    }
    let { retag, remit } = (0,_TemplaterResult_class__WEBPACK_IMPORTED_MODULE_1__.renderWithSupport)(tagSupport, existingTag, subject, ownerTag);
    return retag;
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
/* harmony export */   TagSupport: () => (/* binding */ TagSupport),
/* harmony export */   renderTagSupport: () => (/* binding */ renderTagSupport)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _renderExistingTag_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderExistingTag.function */ "../main/ts/renderExistingTag.function.ts");



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
        console.log('latestCloned', latestCloned);
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
function renderTagSupport(tagSupport, renderUp) {
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(tagSupport.templater)) {
        const newTag = tagSupport.templater.global.newest;
        const ownerTag = newTag.ownerTag;
        return renderTagSupport(ownerTag.tagSupport, true);
    }
    // const oldTagSetup = this
    const subject = tagSupport.subject;
    const templater = tagSupport.templater; // oldTagSetup.templater // templater
    const subjectTag = subject.tag;
    const newest = subjectTag?.tagSupport.templater.global.newest;
    let ownerTag;
    let selfPropChange = false;
    if (renderUp && newest) {
        ownerTag = newest.ownerTag;
        if (ownerTag) {
            const nowProps = templater.props;
            const latestProps = newest.tagSupport.propsConfig.latestCloned;
            selfPropChange = !(0,_deepFunctions__WEBPACK_IMPORTED_MODULE_0__.deepEqual)(nowProps, latestProps);
            if (selfPropChange) {
                console.log('yyyyy', { renderUp, nowProps, latestProps });
                // throw new Error('66 - stop')
            }
        }
    }
    const useTagSupport = tagSupport.templater.global.newest?.tagSupport; // oldTagSetup
    // const oldest = templater.global.oldest as Tag
    if (!templater.global.oldest) {
        throw new Error('888');
    }
    const exit = (0,_renderExistingTag_function__WEBPACK_IMPORTED_MODULE_2__.renderExistingTag)(
    // templater.global.newest as Tag,
    templater.global.oldest, templater, useTagSupport, subject);
    const tag = exit.redraw;
    // oldest.updateByTag(exit.redraw)
    // only update and no more?
    if (exit.remit) {
        // console.log('-- update tag', tag.tagSupport.templater.wrapper.original)
        // oldest.updateByTag(exit.redraw)
        return tag;
    }
    console.log('consider rendering up to', {
        ownerOrg: tag.ownerTag?.tagSupport.templater.wrapper?.original,
        owner: tag.ownerTag,
        renderUp,
        remit: exit.remit,
        org: tag.tagSupport.templater.wrapper.original,
        props: tag.tagSupport.propsConfig.latest,
        clonedProps: tag.tagSupport.propsConfig.latestCloned,
    });
    // Have owner re-render
    // ??? - recently removed. As causes some sort of owner newest disconnect during prop testing
    // ??? - restored with condition - must render parent if I modified my props
    if (ownerTag && selfPropChange) {
        const ownerTagSupport = ownerTag.tagSupport;
        console.log('--- renderup ---', ownerTagSupport.templater.wrapper?.original);
        renderTagSupport(ownerTagSupport, true);
        return tag;
    }
    return tag;
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplaterResult: () => (/* binding */ TemplaterResult),
/* harmony export */   renderWithSupport: () => (/* binding */ renderWithSupport)
/* harmony export */ });
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");




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
    // const wrapTagSupport = existingTag?.tagSupport.templater.global.newest?.tagSupport || tagSupport
    // this.tagSupport = wrapTagSupport
    /* BEFORE RENDER */
    // signify to other operations that a rendering has occurred so they do not need to render again
    // ++wrapTagSupport.memory.renderCount
    const runtimeOwnerTag = existingTag?.ownerTag || ownerTag;
    if (existingTag) {
        // wrapTagSupport.templater.props = existingTag.tagSupport.templater.global.newest?.tagSupport.templater.props || wrapTagSupport.templater.props
        wrapTagSupport.memory.state.newest = [...existingTag.tagSupport.memory.state.newest];
        // ??? - new
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
        // retag.buildBeforeElement(templater.global.insertBefore)
        // subject.tag = retag
        // return retag
    }
    /*
    if(existingTag) {
      if(!isLikeTags(retag,existingTag)) {
        destroyTagMemory(existingTag, subject)
      }
      // throw new Error('similar but different tags')
    }
    */
    retag.ownerTag = runtimeOwnerTag;
    wrapTagSupport.templater.global.newest = retag;
    // ??? - new
    // subject.tag = retag
    if (wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
        throw new Error('56513540');
    }
    if (wrapTagSupport.templater.global.oldest && !wrapTagSupport.templater.global.oldest.hasLiveElements) {
        throw new Error('5555 - 10');
    }
    // new maybe not needed
    // this.oldest = this.oldest || retag
    // wrapTagSupport.oldest = wrapTagSupport.oldest || retag
    return { remit: true, retag };
}


/***/ }),

/***/ "../main/ts/ValueSubject.ts":
/*!**********************************!*\
  !*** ../main/ts/ValueSubject.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValueSubject: () => (/* binding */ ValueSubject)
/* harmony export */ });
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subject */ "../main/ts/Subject.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alterProps: () => (/* binding */ alterProps)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");


/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
function alterProps(props, templater, ownerSupport) {
    function callback(toCall, callWith) {
        const renderCount = templater.global.renderCount;
        const callbackResult = toCall(...callWith);
        const tag = templater.global.newest;
        if (templater.global.renderCount > renderCount) {
            throw new Error('already rendered');
        }
        const lastestOwner = ownerSupport.templater.global.newest;
        const newOwner = (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(lastestOwner.tagSupport, // ??? newestOwner.tagSupport, // ??? ownerSupport,
        true);
        if (newOwner.tagSupport.templater.global.newest != newOwner) {
            throw new Error('newest assignment issue?');
        }
        return callbackResult;
    }
    const isPropTag = (0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(props);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindSubjectCallback: () => (/* binding */ bindSubjectCallback),
/* harmony export */   runTagCallback: () => (/* binding */ runTagCallback)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/** File largely responsible for reacting to element events, such as onclick */

function bindSubjectCallback(value, tag) {
    // Is this children? No override needed
    if (value.isChildOverride) {
        return value;
    }
    const subjectFunction = (element, args) => runTagCallback(value, tag, element, args);
    // link back to original. Mostly used for <div oninit ondestroy> animations
    subjectFunction.tagFunction = value;
    return subjectFunction;
}
function runTagCallback(value, tag, bindTo, args) {
    const tagSupport = tag.tagSupport;
    const renderCount = tagSupport ? tagSupport.templater.global.renderCount : 0;
    const method = value.bind(bindTo);
    const callbackResult = method(...args);
    const sameRenderCount = renderCount === tagSupport.templater.global.renderCount;
    if (tagSupport && !sameRenderCount) {
        return; // already rendered
    }
    (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport, true);
    // throw new Error('after click render stop')
    if (callbackResult instanceof Promise) {
        return callbackResult.then(() => {
            (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport, true);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkDestroyPrevious: () => (/* binding */ checkDestroyPrevious),
/* harmony export */   destroyArrayTag: () => (/* binding */ destroyArrayTag)
/* harmony export */ });
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");



function checkDestroyPrevious(subject, // existing.value is the old value
newValue) {
    const existingSubArray = subject;
    const wasArray = existingSubArray.lastArray;
    // no longer an array
    if (wasArray && !(0,_isInstance__WEBPACK_IMPORTED_MODULE_0__.isTagArray)(newValue)) {
        // if(isTagInstance(newValue) || isTagComponent(newValue)) {
        //   const templater = newValue as TemplaterResult
        //   delete templater.global.oldest
        //   delete templater.global.newest
        //   templater.global.context = {}
        // }
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   destroyTagMemory: () => (/* binding */ destroyTagMemory),
/* harmony export */   destroyTagSupportPast: () => (/* binding */ destroyTagSupportPast)
/* harmony export */ });
function destroyTagMemory(tag, subject) {
    const oldTagSupport = tag.tagSupport;
    if (subject != tag.tagSupport.subject) {
        throw new Error('fff - subjects do not match');
    }
    delete subject.tag;
    delete tag.tagSupport.subject.tag;
    // ???
    const oldest = tag.tagSupport.templater.global.oldest;
    oldest.destroy();
    // tag.destroy()
    destroyTagSupportPast(oldTagSupport);
    // ???
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

/***/ "../main/ts/elementInitCheck.ts":
/*!**************************************!*\
  !*** ../main/ts/elementInitCheck.ts ***!
  \**************************************/
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

/***/ "../main/ts/errors.ts":
/*!****************************!*\
  !*** ../main/ts/errors.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCallback: () => (/* binding */ getCallback)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set.function */ "../main/ts/set.function.ts");



let getCallback = () => (callback) => () => {
    throw new Error('The real callback function was called and that should never occur');
};
(0,_setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse)({
    beforeRender: (tagSupport) => initMemory(tagSupport),
    beforeRedraw: (tagSupport) => initMemory(tagSupport),
    // afterRender: (tagSupport: TagSupport) => {},
});
function updateState(stateFrom, stateTo) {
    stateFrom.forEach((state, index) => {
        const fromValue = (0,_set_function__WEBPACK_IMPORTED_MODULE_2__.getStateValue)(state);
        const callback = stateTo[index].callback;
        if (callback) {
            callback(fromValue); // set the value
        }
        stateTo[index].lastValue = fromValue; // record the value
    });
}
function initMemory(tagSupport) {
    getCallback = () => {
        const oldState = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.stateConfig.array;
        const callbackMaker = (callback) => {
            const trigger = (...args) => triggerStateUpdate(tagSupport, callback, oldState, ...args);
            return trigger;
        };
        return callbackMaker;
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
    (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport, false);
    // TODO: turn back on below
    if (promise instanceof Promise) {
        promise.finally(() => {
            // send the oldest state changes into the newest
            updateState(oldState, newest);
            (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tagSupport, false);
        });
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
    // ???
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
/* harmony export */   renderTagSupport: () => (/* reexport safe */ _TagSupport_class__WEBPACK_IMPORTED_MODULE_9__.renderTagSupport),
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
/* harmony import */ var _tagElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tagElement */ "../main/ts/tagElement.ts");
/* harmony import */ var _ElementTargetEvent_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElementTargetEvent.interface */ "../main/ts/ElementTargetEvent.interface.ts");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tag */ "../main/ts/tag.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html */ "../main/ts/html.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Subject */ "../main/ts/Subject.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _watch_function__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./watch.function */ "../main/ts/watch.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _interpolateElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./interpolateElement */ "../main/ts/interpolateElement.ts");
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./providers */ "../main/ts/providers.ts");
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _setLet_function__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./setLet.function */ "../main/ts/setLet.function.ts");
/* harmony import */ var _setProp_function__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./setProp.function */ "../main/ts/setProp.function.ts");
/* harmony import */ var _onInit__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./onInit */ "../main/ts/onInit.ts");
/* harmony import */ var _onDestroy__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./onDestroy */ "../main/ts/onDestroy.ts");
/* harmony import */ var _getCallback__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./getCallback */ "../main/ts/getCallback.ts");
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

/***/ "../main/ts/interpolateAttributes.ts":
/*!*******************************************!*\
  !*** ../main/ts/interpolateAttributes.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateAttributes: () => (/* binding */ interpolateAttributes)
/* harmony export */ });
/* harmony import */ var _processAttribute_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processAttribute.function */ "../main/ts/processAttribute.function.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateContentTemplates: () => (/* binding */ interpolateContentTemplates)
/* harmony export */ });
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpolateTemplate */ "../main/ts/interpolateTemplate.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateElement: () => (/* binding */ interpolateElement),
/* harmony export */   interpolateString: () => (/* binding */ interpolateString)
/* harmony export */ });
/* harmony import */ var _interpolateAttributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpolateAttributes */ "../main/ts/interpolateAttributes.ts");
/* harmony import */ var _interpolations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interpolations */ "../main/ts/interpolations.ts");
/* harmony import */ var _interpolateContentTemplates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interpolateContentTemplates */ "../main/ts/interpolateContentTemplates.ts");
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");




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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterElmBuild: () => (/* binding */ afterElmBuild),
/* harmony export */   interpolateTemplate: () => (/* binding */ interpolateTemplate),
/* harmony export */   subscribeToTemplate: () => (/* binding */ subscribeToTemplate),
/* harmony export */   updateBetweenTemplates: () => (/* binding */ updateBetweenTemplates)
/* harmony export */ });
/* harmony import */ var _Tag_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tag.class */ "../main/ts/Tag.class.ts");
/* harmony import */ var _elementInitCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elementInitCheck */ "../main/ts/elementInitCheck.ts");
/* harmony import */ var _processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processSubjectValue.function */ "../main/ts/processSubjectValue.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _scanTextAreaValue_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scanTextAreaValue.function */ "../main/ts/scanTextAreaValue.function.ts");
/* harmony import */ var _updateExistingValue_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateExistingValue.function */ "../main/ts/updateExistingValue.function.ts");






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
    subscribeToTemplate(insertBefore, existingSubject, ownerTag, counts, { isForceElement }, context, variableName);
    return { clones };
}
function subscribeToTemplate(insertBefore, subject, ownerTag, counts, // used for animation stagger computing
{ isForceElement }, context, variableName, test = false) {
    let called = false;
    const callback = (value) => {
        // const orgInsert = insertBefore
        const clone = subject.clone;
        if (clone && clone.parentNode) {
            insertBefore = clone;
        }
        if (called) {
            const tag = subject.tag;
            // context[variableName] = 
            (0,_updateExistingValue_function__WEBPACK_IMPORTED_MODULE_5__.updateExistingValue)(subject, value, ownerTag, insertBefore);
            return;
        }
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processSubjectValue)(value, subject, insertBefore, ownerTag, {
            counts: { ...counts },
            forceElement: isForceElement,
        }, test);
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
    if (!options.forceElement) {
        diff = (0,_elementInitCheck__WEBPACK_IMPORTED_MODULE_1__.elementInitCheck)(elm, options.counts) - diff;
    }
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

/***/ "../main/ts/isInstance.ts":
/*!********************************!*\
  !*** ../main/ts/isInstance.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onDestroy: () => (/* binding */ onDestroy)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onInit: () => (/* binding */ onInit)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processAttribute: () => (/* binding */ processAttribute)
/* harmony export */ });
/* harmony import */ var _inputAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputAttribute */ "../main/ts/inputAttribute.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");



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
            return result(child, args);
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
            const result = newAttrValue(child, args);
            return result;
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processNewValue: () => (/* binding */ processNewValue)
/* harmony export */ });
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");


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
        ownerTag.childTags.push(value);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processRegularValue: () => (/* binding */ processRegularValue)
/* harmony export */ });
/* harmony import */ var _interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interpolateTemplate */ "../main/ts/interpolateTemplate.ts");

function processRegularValue(value, subject, // could be tag via subject.tag
template) {
    subject.template = template;
    const before = subject.clone || template; // Either the template is on the doc OR its the first element we last put on doc
    subject.lastValue = value;
    // Processing of regular values
    const clone = (0,_interpolateTemplate__WEBPACK_IMPORTED_MODULE_0__.updateBetweenTemplates)(value, before);
    subject.clone = clone; // remember single element put down, for future updates
    return [];
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
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _processTagResult_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processTagResult.function */ "../main/ts/processTagResult.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");




function processSubjectComponent(templater, subject, template, ownerTag, options) {
    // Check if function component is wrapped in a tag() call
    // TODO: This below check not needed in production mode
    if (templater.tagged !== true) {
        let name = templater.wrapper.original.name || templater.wrapper.original.constructor?.name;
        if (name === 'Function') {
            name = undefined;
        }
        const label = name || templater.wrapper.original.toString().substring(0, 120);
        const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`);
        throw error;
    }
    if (!templater.tagSupport) {
        templater.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__.TagSupport(ownerTag.tagSupport, templater, subject);
    }
    // templater.oldest = subject.tag?.tagSupport.oldest || templater.oldest
    templater.global.insertBefore = template;
    let retag = subject.tag;
    const providers = _setUse_function__WEBPACK_IMPORTED_MODULE_1__.setUse.memory.providerConfig;
    providers.ownerTag = ownerTag;
    const isRedraw = !retag || options.forceElement;
    if (isRedraw) {
        const preClones = ownerTag.clones.map(clone => clone);
        const result = (0,_TemplaterResult_class__WEBPACK_IMPORTED_MODULE_0__.renderWithSupport)(templater.tagSupport, subject.tag, subject, ownerTag);
        if (result.retag.tagSupport.templater.global.newest != result.retag) {
            throw new Error('mismatch result newest');
        }
        retag = result.retag;
        templater.global.newest = retag;
        if (ownerTag.clones.length > preClones.length) {
            const myClones = ownerTag.clones.filter(fClone => !preClones.find(clone => clone === fClone));
            retag.clones.push(...myClones);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processSubjectValue: () => (/* binding */ processSubjectValue),
/* harmony export */   processTag: () => (/* binding */ processTag)
/* harmony export */ });
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _processTagArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processTagArray */ "../main/ts/processTagArray.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./processRegularValue.function */ "../main/ts/processRegularValue.function.ts");






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
options, // {added:0, removed:0}
test = false) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.tag:
            processTag(value, subject, template, ownerTag, options);
            return [];
        case ValueTypes.tagArray:
            return (0,_processTagArray__WEBPACK_IMPORTED_MODULE_2__.processTagArray)(subject, value, template, ownerTag, options);
        case ValueTypes.tagComponent:
            (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_0__.processSubjectComponent)(value, subject, template, ownerTag, options);
            return [];
    }
    return (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, template);
}
/** Could be a regular tag or a component. Both are Tag.class */
function processTag(tag, subject, // could be tag via result.tag
insertBefore, // <template end interpolate /> (will be removed)
ownerTag, // owner
options) {
    // first time seeing this tag?
    if (!tag.tagSupport) {
        if (!(0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(tag)) {
            throw new Error('issue non-tag here');
        }
        const fakeTemplater = {
            global: {
                providers: [],
                context: {},
            },
            children: new _ValueSubject__WEBPACK_IMPORTED_MODULE_4__.ValueSubject([]), // no children
            props: {},
        };
        tag.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_3__.TagSupport(ownerTag.tagSupport, fakeTemplater, // the template is provided via html`` call
        subject);
        // asking me to render will cause my parent to render
        ownerTag.childTags.push(tag);
    }
    tag.ownerTag = ownerTag;
    subject.template = insertBefore;
    tag.buildBeforeElement(insertBefore, {
        counts: { added: 0, removed: 0 },
        forceElement: true, test: false,
    });
    tag.tagSupport.templater.global.oldest = tag;
    if (!tag.lastTemplateString) {
        throw new Error('999 - 1');
    }
    tag.tagSupport.templater.global.newest = tag;
    if (!tag.tagSupport.templater.global.oldest || !tag.tagSupport.templater.global.oldest.hasLiveElements) {
        throw new Error('4711654');
    }
    subject.tag = tag;
    if (!tag.hasLiveElements) {
        throw new Error('44444 - 0');
    }
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
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");




function processTagArray(subject, value, // arry of Tag classes
template, // <template end interpolate />
ownerTag, options) {
    // const clones: Clones = []
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
            (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_3__.destroyArrayTag)(tag, options.counts);
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
        const previousSupport = !previous?.deleted && previous?.tag.tagSupport;
        const fakeSubject = new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject({});
        const fakeTemplater = {
            isTag: true,
            global: {
                providers: [],
                context: {},
            },
            children: new _ValueSubject__WEBPACK_IMPORTED_MODULE_0__.ValueSubject([]),
        };
        subTag.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_1__.TagSupport(ownerTag.tagSupport, fakeTemplater, fakeSubject);
        fakeTemplater.tagSupport = subTag.tagSupport;
        if (previousSupport) {
            subTag.tagSupport.templater.global = previousSupport.templater.global;
            previousSupport.templater.global.newest = subTag;
        }
        else {
            ownerTag.childTags.push(subTag);
        }
        subTag.ownerTag = ownerTag;
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
            const err = new _errors__WEBPACK_IMPORTED_MODULE_2__.ArrayNoKeyError(message, details);
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
    subTag.tagSupport.templater.global.oldest = subTag;
    subTag.tagSupport.templater.global.newest = subTag;
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
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");

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
    tag.tagSupport.templater.global.newest = tag;
    if (!tag.tagSupport.templater.global.oldest) {
        throw new Error('maybe 3');
    }
    subjectTag.tag = tag; // let reprocessing know we saw this previously as an if
    if (!tag.hasLiveElements) {
        throw new Error('44444 - 4');
    }
}


/***/ }),

/***/ "../main/ts/provider.utils.ts":
/*!************************************!*\
  !*** ../main/ts/provider.utils.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   providersChangeCheck: () => (/* binding */ providersChangeCheck)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");


function providersChangeCheck(tag) {
    const providersWithChanges = tag.tagSupport.templater.global.providers.filter(provider => !(0,_deepFunctions__WEBPACK_IMPORTED_MODULE_1__.deepEqual)(provider.instance, provider.clone));
    // reset clones
    providersWithChanges.forEach(provider => {
        const appElement = tag.getAppElement();
        handleProviderChanges(appElement, provider);
        provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_1__.deepClone)(provider.instance);
    });
}
function handleProviderChanges(appElement, provider) {
    const tagsWithProvider = getTagsWithProvider(appElement, provider);
    tagsWithProvider.forEach(({ tag, renderCount, provider }) => {
        const notRendered = renderCount === tag.tagSupport.templater.global.renderCount;
        if (notRendered) {
            provider.clone = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_1__.deepClone)(provider.instance);
            (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.renderTagSupport)(tag.tagSupport, false);
        }
    });
}
function getTagsWithProvider(tag, provider, memory = []) {
    const compare = tag.tagSupport.templater.global.providers;
    const hasProvider = compare.find(xProvider => xProvider.constructMethod === provider.constructMethod);
    if (hasProvider) {
        memory.push({
            tag,
            renderCount: tag.tagSupport.templater.global.renderCount,
            provider: hasProvider,
        });
    }
    tag.childTags.forEach(child => getTagsWithProvider(child, provider, memory));
    return memory;
}


/***/ }),

/***/ "../main/ts/providers.ts":
/*!*******************************!*\
  !*** ../main/ts/providers.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   providers: () => (/* binding */ providers)
/* harmony export */ });
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


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
/* harmony import */ var _hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasTagSupportChanged.function */ "../main/ts/hasTagSupportChanged.function.ts");
/* harmony import */ var _provider_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider.utils */ "../main/ts/provider.utils.ts");
/* harmony import */ var _Tag_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tag.utils */ "../main/ts/Tag.utils.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");




/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
function renderExistingTag(oldestTag, // existing tag already there
newTemplater, tagSupport, subject) {
    if (subject.tag) {
        newTemplater.global = subject.tag.tagSupport.templater.global;
    }
    if (!oldestTag.hasLiveElements) {
        throw new Error('1080');
    }
    const preRenderCount = tagSupport.templater.global.renderCount;
    (0,_provider_utils__WEBPACK_IMPORTED_MODULE_1__.providersChangeCheck)(oldestTag);
    // When the providers were checked, a render to myself occurred and I do not need to re-render again
    const latestTag = tagSupport.templater.global.newest;
    if (preRenderCount !== tagSupport.templater.global.renderCount) {
        oldestTag.updateByTag(latestTag);
        return {
            remit: true,
            redraw: latestTag,
        };
    }
    const oldTagSupport = oldestTag.tagSupport;
    const hasChanged = (0,_hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__.hasTagSupportChanged)(oldTagSupport, newTemplater.tagSupport, newTemplater);
    const oldTemplater = tagSupport.templater || newTemplater;
    const redraw = (0,_Tag_utils__WEBPACK_IMPORTED_MODULE_2__.redrawTag)(subject, newTemplater, oldestTag.ownerTag);
    const oldest = tagSupport.templater.global.oldest || oldestTag;
    redraw.tagSupport.templater.global.oldest = oldest;
    if (redraw != redraw.tagSupport.templater.global.newest) {
        throw new Error('newest mismatched 22');
    }
    if (!redraw.tagSupport.templater.global.oldest) {
        throw new Error('8888888 - 0');
    }
    if (!oldTemplater.global.oldest) {
        throw new Error('8888888');
    }
    /* ??? - new removal
    if(newTemplater.global.oldest && !newTemplater.global.oldest.hasLiveElements) {
      throw new Error('7777')
    }
    */
    // ??? - add to ensure setProps causes lower redraw
    if ((0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_3__.isLikeTags)(latestTag, redraw)) {
        oldest.updateByTag(redraw);
    }
    if (!hasChanged) {
        // ??? - removed in favor of always update
        // oldest?.updateByTag(redraw)
        return { redraw, remit: true };
    }
    return { redraw, remit: false };
}


/***/ }),

/***/ "../main/ts/scanTextAreaValue.function.ts":
/*!************************************************!*\
  !*** ../main/ts/scanTextAreaValue.function.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scanTextAreaValue: () => (/* binding */ scanTextAreaValue)
/* harmony export */ });
/* harmony import */ var _processAttribute_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./processAttribute.function */ "../main/ts/processAttribute.function.ts");

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateEchoBack: () => (/* binding */ StateEchoBack),
/* harmony export */   getStateValue: () => (/* binding */ getStateValue),
/* harmony export */   set: () => (/* binding */ set)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "../main/ts/errors.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setLet: () => (/* binding */ setLet)
/* harmony export */ });
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setProp: () => (/* binding */ setProp)
/* harmony export */ });
/* harmony import */ var _set_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set.function */ "../main/ts/set.function.ts");
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");


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
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
/* harmony import */ var _TemplaterResult_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TemplaterResult.class */ "../main/ts/TemplaterResult.class.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");
/* harmony import */ var _deepFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deepFunctions */ "../main/ts/deepFunctions.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _alterProps_function__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./alterProps.function */ "../main/ts/alterProps.function.ts");








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
    return { childSubject: new _ValueSubject__WEBPACK_IMPORTED_MODULE_3__.ValueSubject([]), madeSubject: true };
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
        oldTagSetup.templater.global.newestTemplater = templater;
        ++oldTagSetup.templater.global.renderCount;
        templater.global = oldTagSetup.templater.global;
        const childSubject = templater.children;
        const lastArray = oldTagSetup.templater.global.oldest?.tagSupport.templater.children.lastArray;
        if (lastArray) {
            childSubject.lastArray = lastArray;
        }
        const originalFunction = innerTagWrap.original;
        // const oldTagSetup = templater.tagSupport
        const oldest = templater.global.oldest;
        if (oldest && !oldest.hasLiveElements) {
            throw new Error('issue already 22');
        }
        // ???
        let props = templater.props;
        // let props = oldTagSetup.propsConfig.latest
        const ownerTagSupport = oldTagSetup.ownerTagSupport;
        const oldTemplater = ownerTagSupport?.templater;
        const oldLatest = oldTemplater?.global.newest;
        const newestOwnerTemplater = oldLatest?.tagSupport.templater;
        if (oldLatest && !newestOwnerTemplater) {
            throw new Error('what to do here?');
        }
        // ???
        let castedProps = (0,_alterProps_function__WEBPACK_IMPORTED_MODULE_7__.alterProps)(props, newestOwnerTemplater, oldTagSetup.ownerTagSupport);
        const clonedProps = (0,_deepFunctions__WEBPACK_IMPORTED_MODULE_5__.deepClone)(props); // castedProps
        // CALL ORIGINAL COMPONENT FUNCTION
        const tag = originalFunction(castedProps, childSubject);
        tag.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_6__.TagSupport(oldTagSetup.ownerTagSupport, templater, subject);
        tag.tagSupport.propsConfig = {
            latest: props, // castedProps
            latestCloned: clonedProps,
            clonedProps: clonedProps,
            lastClonedKidValues: tag.tagSupport.propsConfig.lastClonedKidValues,
        };
        tag.tagSupport.memory = oldTagSetup.memory; // state handover
        // tag.tagSupport.mutatingRender = oldTagSetup.mutatingRender
        // ???
        /*
        oldTagSetup.propsConfig = {...tag.tagSupport.propsConfig}
        if(oldest) {
          oldest.tagSupport.propsConfig = {...tag.tagSupport.propsConfig}
        }
        */
        if (madeSubject) {
            childSubject.value.forEach(kid => {
                kid.values.forEach((value, index) => {
                    if (!(value instanceof Function)) {
                        return;
                    }
                    if (kid.values[index].isChildOverride) {
                        return; // already overwritten
                    }
                    // all functions need to report to me
                    kid.values[index] = function (...args) {
                        (0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_4__.runTagCallback)(value, tag.ownerTag, this, // bindTo
                        args);
                    };
                    kid.values[index].isChildOverride = true;
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyTagUpdater: () => (/* binding */ applyTagUpdater),
/* harmony export */   tagElement: () => (/* binding */ tagElement)
/* harmony export */ });
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _tagRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tagRunner */ "../main/ts/tagRunner.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");



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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runAfterRender: () => (/* binding */ runAfterRender),
/* harmony export */   runBeforeDestroy: () => (/* binding */ runBeforeDestroy),
/* harmony export */   runBeforeRedraw: () => (/* binding */ runBeforeRedraw),
/* harmony export */   runBeforeRender: () => (/* binding */ runBeforeRender)
/* harmony export */ });
/* harmony import */ var _setUse_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setUse.function */ "../main/ts/setUse.function.ts");
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateExistingTagComponent: () => (/* binding */ updateExistingTagComponent)
/* harmony export */ });
/* harmony import */ var _hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasTagSupportChanged.function */ "../main/ts/hasTagSupportChanged.function.ts");
/* harmony import */ var _TagSupport_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagSupport.class */ "../main/ts/TagSupport.class.ts");
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _destroyTag_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./destroyTag.function */ "../main/ts/destroyTag.function.ts");




function updateExistingTagComponent(ownerTag, tempResult, subject, insertBefore) {
    let existingTag = subject.tag;
    /*
    if(existingTag && !existingTag.hasLiveElements) {
      throw new Error('issue already began')
    }
    */
    const oldWrapper = existingTag.tagSupport.templater.wrapper;
    const newWrapper = tempResult.wrapper;
    let isSameTag = false;
    if (tempResult.global.oldest && !tempResult.global.oldest.hasLiveElements) {
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
        (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_3__.destroyTagMemory)(oldTagSupport.templater.global.oldest, subject);
        (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_2__.processSubjectComponent)(tempResult, subject, oldInsertBefore, ownerTag, {
            forceElement: false,
            counts: { added: 0, removed: 0 },
        });
        return;
    }
    else {
        if (!tempResult.tagSupport) {
            tempResult.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_1__.TagSupport(oldTagSupport.ownerTagSupport, tempResult, subject);
        }
        const newTagSupport = tempResult.tagSupport;
        const hasChanged = (0,_hasTagSupportChanged_function__WEBPACK_IMPORTED_MODULE_0__.hasTagSupportChanged)(oldTagSupport, newTagSupport, tempResult);
        console.log('hasChanged - 0', tempResult.wrapper.original);
        if (!hasChanged) {
            /*
            const stateChanged = false
            if(stateChanged) {
              const newTag = renderTagSupport(
                tempResult.tagSupport,
                false,
              )
        
              const oldTag = oldGlobal.oldest as Tag
              oldTag.updateByTag(newTag)
            }
            */
            return; // its the same tag component
        }
    }
    const oldestTag = tempResult.global.oldest; // oldTagSupport.oldest as Tag // existingTag
    const previous = tempResult.global.newest;
    if (!previous || !oldestTag) {
        throw new Error('how no previous or oldest nor newest?');
    }
    const newTag = (0,_TagSupport_class__WEBPACK_IMPORTED_MODULE_1__.renderTagSupport)(tempResult.tagSupport, false);
    existingTag = subject.tag;
    const hasOldest = newTag.tagSupport.templater.global.oldest ? true : false;
    if (!hasOldest) {
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
        /*
        if(!newTag.hasLiveElements) {
          throw new Error('44444 - 6')
        }
        */
        oldestTag.updateByTag(newTag); // the oldest tag has element references
    }
    else {
        // Although function looked the same it returned a different html result
        if (isSameTag && existingTag) {
            (0,_destroyTag_function__WEBPACK_IMPORTED_MODULE_3__.destroyTagMemory)(existingTag, subject);
            newTag.tagSupport.templater.global.context = {}; // do not share previous outputs
        }
        oldest = undefined;
        // ??? - new remove
        // subject.tag = newTag
    }
    if (!oldest) {
        newTag.buildBeforeElement(oldTagSupport.templater.global.insertBefore, {
            forceElement: true,
            counts: { added: 0, removed: 0 }, test: false,
        });
        newTag.tagSupport.templater.global.oldest = newTag;
        newTag.tagSupport.templater.global.newest = newTag;
        oldTagSupport.templater.global.oldest = newTag;
        subject.tag = newTag;
    }
    oldTagSupport.templater.global.newest = newTag;
    // ???
    // oldTagSupport.propsConfig = {...tempResult.tagSupport.propsConfig}
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
        console.log('not matched', { lastValue, nowValue });
        return false;
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
/* harmony import */ var _isInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isInstance */ "../main/ts/isInstance.ts");
/* harmony import */ var _processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./processSubjectValue.function */ "../main/ts/processSubjectValue.function.ts");
/* harmony import */ var _processTagArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./processTagArray */ "../main/ts/processTagArray.ts");
/* harmony import */ var _updateExistingTagComponent_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./updateExistingTagComponent.function */ "../main/ts/updateExistingTagComponent.function.ts");
/* harmony import */ var _processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./processRegularValue.function */ "../main/ts/processRegularValue.function.ts");
/* harmony import */ var _checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checkDestroyPrevious.function */ "../main/ts/checkDestroyPrevious.function.ts");
/* harmony import */ var _ValueSubject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ValueSubject */ "../main/ts/ValueSubject.ts");
/* harmony import */ var _processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./processSubjectComponent.function */ "../main/ts/processSubjectComponent.function.ts");
/* harmony import */ var _isLikeTags_function__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./isLikeTags.function */ "../main/ts/isLikeTags.function.ts");
/* harmony import */ var _bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bindSubjectCallback.function */ "../main/ts/bindSubjectCallback.function.ts");











function updateExistingValue(subject, value, ownerTag, insertBefore) {
    const subjectSubArray = subject;
    const subjectSubTag = subject;
    const isChildSubject = subjectSubArray.isChildSubject;
    const isComponent = (0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagComponent)(value);
    // If we are working with tag component 2nd argument children, the value has to be digged
    if (isChildSubject) {
        value = value.value; // A subject contains the value
    }
    const oldInsertBefore = subject.template || subjectSubTag.tag?.tagSupport.templater.global.insertBefore || subjectSubTag.clone;
    (0,_checkDestroyPrevious_function__WEBPACK_IMPORTED_MODULE_6__.checkDestroyPrevious)(subject, value);
    /*
    if(subjectSubTag.tag && !subjectSubTag.tag.hasLiveElements) {
      throw new Error('cannot update tag with no live elements')
    }
    */
    // handle already seen tag components
    if (isComponent) {
        const templater = value;
        // When was something before component
        if (!subjectSubTag.tag) {
            (0,_processSubjectComponent_function__WEBPACK_IMPORTED_MODULE_8__.processSubjectComponent)(templater, subject, oldInsertBefore, ownerTag, {
                forceElement: true,
                counts: { added: 0, removed: 0 },
            });
            return subjectSubTag;
        }
        if (!templater.global.oldest) {
            const oldTag = subjectSubTag.tag;
            const oldWrap = oldTag.tagSupport.templater.wrapper; // tag versus component
            if (oldWrap) {
                if (oldWrap.original === templater.wrapper?.original) {
                    templater.global = { ...oldTag.tagSupport.templater.global };
                    console.log('🐷 disconnected global', {
                        oldWrap: oldTag.tagSupport.templater.wrapper.original,
                        tempWrap: templater.wrapper.original,
                        global: templater.global,
                    });
                }
            }
        }
        (0,_updateExistingTagComponent_function__WEBPACK_IMPORTED_MODULE_4__.updateExistingTagComponent)(ownerTag, templater, // latest value
        subjectSubTag, insertBefore);
        return subjectSubTag;
    }
    // was component but no longer
    const subjectTag = subjectSubTag.tag;
    if (subjectTag) {
        handleStillTag(subjectTag, subject, value, ownerTag);
        return subjectSubTag;
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
        const bound = (0,_bindSubjectCallback_function__WEBPACK_IMPORTED_MODULE_10__.bindSubjectCallback)(value, ownerTag);
        subject.set(bound);
        return subject;
    }
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isTagInstance)(value)) {
        subjectSubTag.template = oldInsertBefore;
        (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processTag)(value, subjectSubTag, subjectSubTag.template, ownerTag, // existingTag, // tag,
        {
            counts: {
                added: 0,
                removed: 0,
            }
        });
        return subjectSubTag;
    }
    // we have been given a subject
    if ((0,_isInstance__WEBPACK_IMPORTED_MODULE_1__.isSubjectInstance)(value)) {
        return value;
    }
    // This will cause all other values to render
    (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, oldInsertBefore);
    return subjectSubTag;
}
function handleStillTag(existingTag, subject, value, ownerTag) {
    const oldWrapper = existingTag.tagSupport.templater.wrapper;
    const newWrapper = value?.wrapper;
    // const wrapMatch = oldWrapper && newWrapper && oldWrapper?.original === newWrapper?.original
    // TODO: We shouldn't need both of these
    const isSameTag = value && (0,_isLikeTags_function__WEBPACK_IMPORTED_MODULE_9__.isLikeTags)(existingTag, value);
    const isSameTag2 = value && value.getTemplate && existingTag.isLikeTag(value);
    const tag = value;
    if (!tag.tagSupport) {
        const fakeTemplater = {
            isTag: true,
            global: {
                context: {},
                oldest: tag,
            },
            children: new _ValueSubject__WEBPACK_IMPORTED_MODULE_7__.ValueSubject([]),
        };
        tag.tagSupport = new _TagSupport_class__WEBPACK_IMPORTED_MODULE_0__.TagSupport(ownerTag.tagSupport, fakeTemplater, subject);
        fakeTemplater.tagSupport = tag.tagSupport;
    }
    if (isSameTag) {
        existingTag.updateByTag(tag);
        return;
    }
    if (isSameTag || isSameTag2) {
        return (0,_processSubjectValue_function__WEBPACK_IMPORTED_MODULE_2__.processTag)(value, subject, subject.template, ownerTag, // existingTag, // tag,
        {
            counts: {
                added: 0,
                removed: 0,
            }
        });
    }
    return (0,_processRegularValue_function__WEBPACK_IMPORTED_MODULE_5__.processRegularValue)(value, subject, subject.template);
}


/***/ }),

/***/ "../main/ts/watch.function.ts":
/*!************************************!*\
  !*** ../main/ts/watch.function.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   watch: () => (/* binding */ watch)
/* harmony export */ });
/* harmony import */ var _setLet_function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setLet.function */ "../main/ts/setLet.function.ts");

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
/* harmony export */   hmr: () => (/* reexport safe */ taggedjs__WEBPACK_IMPORTED_MODULE_2__.hmr)
/* harmony export */ });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app.component.ts");
/* harmony import */ var _isolatedApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isolatedApp */ "./src/isolatedApp.ts");
/* harmony import */ var taggedjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! taggedjs */ "../main/ts/index.ts");




})();

var __webpack_exports__App = __webpack_exports__.App;
var __webpack_exports__IsolatedApp = __webpack_exports__.IsolatedApp;
var __webpack_exports__hmr = __webpack_exports__.hmr;
export { __webpack_exports__App as App, __webpack_exports__IsolatedApp as IsolatedApp, __webpack_exports__hmr as hmr };

//# sourceMappingURL=bundle.js.map