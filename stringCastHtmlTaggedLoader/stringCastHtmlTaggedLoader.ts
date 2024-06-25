import { stringCastHtmlTagged } from "./stringCastHtmlTagged.function"

export default function stringCastHtmlTaggedLoader(this: any, source: string) {
    const resourcePath = this.resourcePath;  
    return stringCastHtmlTagged(source, resourcePath);
}
