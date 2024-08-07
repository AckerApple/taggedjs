export function domMetaArrayToOutput(reconstructed, allDom, filePath) {
    // const outputVarString = JSON.stringify(allDom)
    const outputVarString = customStringify(allDom);
    const allStrings = `\n// @ts-ignore\nconst allStrings = ${outputVarString}`;
    // console.log('\n\n', allStrings, '\n\n')
    // const allStrings = `\nconst allStrings: {pos: any[], domMeta: any[], org:any[]}[] = ${JSON.stringify(allDom)}`
    const output = reconstructed.code + allStrings;
    return output;
}
function customStringify(obj) {
    const funStrings = obj.map(o => JSON.stringify(o));
    const jsonString = '[' + funStrings.join(',') + ']';
    return jsonString.replace(/"__isFunction\*\*(.*?)\*\*isFunction__"/g, (match, p1) => {
        return p1; // .replace(/\\"/g, '"').replace(/\\n/g, '\n');
    });
}
//# sourceMappingURL=domMetaArrayToOutput.function.js.map