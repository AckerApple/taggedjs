export function replaceHoldersByPosMaps(parsedElements, values, valuePositions) {
    Object.values(valuePositions).forEach((valuePosMeta, index) => replaceHolderByPosMap(parsedElements, values, valuePosMeta, index));
}
function replaceHolderByPosMap(parsedElements, values, valuePosition, valueIndex) {
    valuePosition.set(parsedElements, values[valueIndex]);
    /*
    const posMap = [...valuePosition.pos]
    const lastName = posMap.pop()
    const varPart: any = posMap.reduce((
      all: any,
      name: string | number,
    ) => {
      return all[ name as any ]
    }, parsedElements)
  
    varPart[lastName as any] = values[valueIndex]
    */
}
//# sourceMappingURL=test.function.js.map