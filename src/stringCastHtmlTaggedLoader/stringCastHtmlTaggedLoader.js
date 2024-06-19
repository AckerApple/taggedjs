import stringCastHtmlTaggedFunction from "./stringCastHtmlTagged.function.js"

export default function stringCastHtmlTaggedLoader(source) {
    const resourcePath = this.resourcePath;  
    return stringCastHtmlTaggedFunction(source, resourcePath);
}
