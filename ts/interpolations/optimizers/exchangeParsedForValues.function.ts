import { replacePlaceholders } from "./replacePlaceholders.function.js"
import { restorePlaceholders } from "./restorePlaceholders.function.js"
import { ObjectElement, ObjectText } from "./ObjectNode.types.js"

export function exchangeParsedForValues(
  parsedElements: (ObjectElement | ObjectText)[],
  values: unknown[],
) {
  // Replace placeholders with actual dynamic values
  replacePlaceholders(parsedElements, values)
  
  // Restore any sanitized placeholders in text nodes
  restorePlaceholders(parsedElements)

  return parsedElements
}
