import { div, button, span, strong, output, tag } from "taggedjs";
import { renderCountDiv } from "./renderCount.component";
import { arrayFunTag } from "./arrayFun.tag";
import { main } from "./funInProps.tag";
export const funInPropsChild = tag((arg0, mainProp, myFunction3) => {
    funInPropsChild.updates(x => {
        [arg0, mainProp, myFunction3] = x;
        myFunction3 = output(myFunction3);
        myFunction = output(arg0.myFunction);
    });
    myFunction3 = output(myFunction3);
    // let other = 'other'
    let counter = 0;
    let renderCount = 0;
    ++renderCount;
    let { addArrayItem, myFunction, deleteItem, child, array } = arg0;
    myFunction = output(myFunction);
    return div(div(strong('mainFunction:'), _ => mainProp.function.wrapped ? 'taggjedjs-wrapped' : 'nowrap', ':', span(_ => mainProp.count)), div(strong('childFunction:'), _ => child.myChildFunction.wrapped ? 'taggjedjs-wrapped' : 'nowrap'), div(strong('myFunction:'), myFunction.wrapped ? 'taggjedjs-wrapped' : 'nowrap'), button.id `fun_in_prop1`.onClick(myFunction)('🤰 ++object argument'), button.id `fun_in_prop2`.onClick(output(child.myChildFunction))('🤰 ++child.myChildFunction'), button.id `fun_in_prop3`.onClick(myFunction3)('+🤰 +argument'), button.onClick(main.function)('🆎 ++main'), button.onClick(() => ++counter)('++me'), div('child array length: ', _ => array.length, _ => array.map(item => arrayFunTag(item, deleteItem).key(item)), button.onClick(addArrayItem)('addArrayItem')), div('counter:', span(_ => counter)), _ => renderCountDiv({ renderCount, name: 'funInProps_tag_child' }));
});
//# sourceMappingURL=funInPropsChild.tag.js.map