import domCastTagged from "./domCastTagged.function.ts"

export default function domCastHtmlTaggedLoader(source) {
    const resourcePath = this.resourcePath;  
    return domCastTagged(source, resourcePath);
}
