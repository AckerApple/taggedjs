import { states, html, tag, noElement, button, h1, hr, div } from "taggedjs"
import { menu, useMenuName } from "./menu.tag"
import { innerCounterContent } from "./countersDebug";
import { content } from "./content.tag"
import { animateWrap, fx } from "taggedjs-animate-css"
import { homePage } from "./homePage.tag"

const appDate = Date.now()

function appFun(){
  return function runAppFun(menuName = useMenuName()) {
    let showHide = false

    console.info('🍒 Main app rendered', appDate)

    return noElement('<!--app.js-->',
      h1({id:"h1-app"}, `🏷️ TaggedJs - ${2+2}`),

      button({type:"button",
        onClick:() => showHide = !showHide,
      }, 'show/hide ', _=> showHide),
      
      _=> showHide && fxTag(),

      menu(),

      _=> menuName === 'home' && homePage(),
      _=> menuName === 'counters' && innerCounterContent(),
      _=> menuName === 'content' && content(),
    )
  }
}
appFun.isApp = true

export const App = tag(appFun)

const fxTag = tag(() => noElement(
  hr,
  
  div({attr: fx({duration: '.1s'})},
    'Hello animated world'
  ),
  
  hr,
))