export function domMetaArrayToOutput(reconstructed, allDom, filePath) {
    // const allStrings = `\nconst allStrings: any[] = ${JSON.stringify(allDom)}`;
    const allStrings = `\nconst allStrings = ${JSON.stringify(allDom)}`;
    const output = reconstructed.code + allStrings;
    const target = filePath.includes('tagSwitchDebug.component.ts');
    return output;
}
//# sourceMappingURL=domMetaArrayToOutput.function.js.map