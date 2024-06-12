export function htmlInterpolationToDomMeta(
  strings: string[],
  values: any[]
) {
  // Sanitize placeholders in the fragments
  const sanitizedFragments = sanitizePlaceholders(strings);

  // Add placeholders to the fragments
  const fragmentsWithPlaceholders = addPlaceholders(sanitizedFragments, values);

  // Parse the modified fragments
  const htmlString = fragmentsWithPlaceholders.join('');
  const parsedElements = parseHTML(htmlString);

  // Replace placeholders with actual dynamic values
  replacePlaceholders(parsedElements, values);

  // Restore any sanitized placeholders in text nodes
  restorePlaceholders(parsedElements);

  return parsedElements
}

function sanitizePlaceholders(fragments: string[]) {
  return fragments.map(fragment => fragment.replace(/(^__tagVar\d+|__tagVar\d+$)/g, (match, index) => `__safeTagVar${index}`));
}

function addPlaceholders(fragments: string[], dynamicValues: any[]) {
  return fragments.map((fragment, index) => {
    if (index < dynamicValues.length) {
      return fragment + '__tagVar' + index;
    }
    return fragment;
  });
}

type ObjectNode = {
  nodeName: string
}
type ObjectText = ObjectNode & {
  textContent: string
}
type ObjectElement = ObjectNode & {
  attributes: [string, any][]
  children?: ObjectChildren
}

type ObjectChildren = (ObjectText | ObjectElement)[]

function parseHTML(html: string) {
  const elements: (ObjectElement | ObjectText)[] = [];
  const stack: ObjectElement[] = [];
  let currentElement: ObjectElement | null | undefined = null;
  let valueIndex = 0;
  let position = 0;
  const regexTag = /<\/?([a-zA-Z0-9\-]+)([^>]*)>/g;
  const regexAttr = /([a-zA-Z0-9\-\.]+)(?:="([^"]*)"|=(\S+))?/g;

  while (position < html.length) {
    const tagMatch = regexTag.exec(html);

    if (!tagMatch) {
      break;
    }

    const [fullMatch, tagName, attrString] = tagMatch;
    const isClosingTag = fullMatch.startsWith('</');
    const isSelfClosing = fullMatch.endsWith('/>');

    if (position < tagMatch.index) {
      const textContent = html.slice(position, tagMatch.index).trim();
      if (textContent) {
        const textNode: ObjectText = {
          nodeName: 'text',
          textContent: textContent
        };
        if (currentElement) {
          if (!currentElement.children) {
            currentElement.children = [];
          }
          currentElement.children.push(textNode);
        } else {
          elements.push(textNode);
        }
      }
    }

    position = tagMatch.index + fullMatch.length;

    if (isClosingTag) {
      currentElement = stack.pop();
      continue;
    }

    const element: ObjectElement = {
      nodeName: tagName,
      attributes: [] as [string, any][]
    };

    let attrMatch;
    while ((attrMatch = regexAttr.exec(attrString)) !== null) {
      let [_, attrName, attrValueQuoted, attrValueUnquoted] = attrMatch;
      let attrValue = attrValueQuoted || attrValueUnquoted;
      if (attrValue === undefined) {
        attrValue = "__tagVar" + valueIndex++;
      }
      element.attributes.push([attrName, attrValue]);
    }

    if (currentElement) {
      if (!currentElement.children) {
        currentElement.children = [];
      }
      currentElement.children.push(element);
    } else {
      elements.push(element);
    }

    if (!isSelfClosing) {
      stack.push(currentElement as ObjectElement);
      currentElement = element;
    }
  }

  return elements;
}

function replacePlaceholders(
  elements: (ObjectElement | ObjectText)[],
  dynamicValues: any[]
) {
  function traverseAndReplace(element: ObjectElement | ObjectText) {
    if ('attributes' in element) {
      element.attributes = element.attributes.map(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('__tagVar')) {
          const index = parseInt(value.replace('__tagVar', ''), 10);
          if (!isNaN(index) && index < dynamicValues.length) {
            value = dynamicValues[index];
          }
        }
        return [key, value];
      });
    }

    if ('children' in element) {
      const children = element.children as ObjectChildren
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeName === 'text') {
          let textContent = (child as ObjectText).textContent;
          const placeholderStartMatch = textContent.match(/^__tagVar(\d+)/);
          const placeholderEndMatch = textContent.match(/__tagVar(\d+)$/);

          if (placeholderStartMatch) {
            const index = parseInt(placeholderStartMatch[1], 10);
            if (!isNaN(index) && index < dynamicValues.length) {
              children.splice(i, 0, {
                nodeName: 'text',
                textContent: dynamicValues[index]
              });
              textContent = textContent.replace(`__tagVar${index}`, '');
              i++;  // Adjust the index to skip the newly inserted element
            }
          }

          if (placeholderEndMatch) {
            const index = parseInt(placeholderEndMatch[1], 10);
            if (!isNaN(index) && index < dynamicValues.length) {
              textContent = textContent.replace(`__tagVar${index}`, '');
              children.splice(i + 1, 0, {
                nodeName: 'text',
                textContent: dynamicValues[index]
              });
            }
          }

          ;(child as ObjectText).textContent = textContent;
        }
      }

      children.forEach(traverseAndReplace);

      // Remove empty children array
      if (children.length === 0) {
        delete element.children;
      }
    }
  }

  elements.forEach(traverseAndReplace);
}

function restorePlaceholders(elements: ObjectChildren) {
  elements.forEach(traverseAndRestore);
}

function traverseAndRestore(element: ObjectElement | ObjectText) {
  if ('attributes' in element) {
    element.attributes = element.attributes.map(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('__safeTagVar')) {
        const index = parseInt(value.replace('__safeTagVar', ''), 10);
        value = `__tagVar${index}`;
      }
      return [key, value];
    });
  }

  if ('children' in element) {
    const children = element.children as ObjectChildren
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as ObjectText
      if (child.nodeName === 'text') {
        child.textContent = child.textContent.replace(/__safeTagVar(\d+)/g, (match, index) => `__tagVar${index}`);
      }
      traverseAndRestore(child);
    }

    // Remove empty children array
    if (children.length === 0) {
      delete element.children;
    }
  }
}
