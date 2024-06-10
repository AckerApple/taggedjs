function parseHtmlTemplates(code) {
  const results = [];
  let lastIndex = 0;
  
  // Regular expression to match outermost html template literals
  const regex = /html`([^`]*?(?:\${[^`]*?`[^`]*?`[^`]*?}[^`]*?)*?)`/g;
  let match;

  while ((match = regex.exec(code)) !== null) {
      // Push the preceding code (if any)
      if (match.index > lastIndex) {
          results.push(code.substring(lastIndex, match.index));
      }
      // Push the HTML template literal
      results.push({ html: match[1] });
      // Update the last index past the end of the current match
      lastIndex = regex.lastIndex;
  }

  // If there's remaining code after the last match, add it to the results
  if (lastIndex < code.length) {
      results.push(code.substring(lastIndex));
  }

  return results;
}

function extractTemplateParts(parsedResults) {
  return parsedResults.map(item => {
      if (typeof item === 'string') {
          return item; // Return plain strings directly.
      } else {
          // Parsing the HTML template literal.
          const { html } = item;
          const strings = [];
          const values = [];
          let lastIndex = 0;
          let index = 0;

          while (index < html.length) {
              if (html[index] === '$' && html[index + 1] === '{') {
                  // Save the literal part before the ${
                  strings.push(html.substring(lastIndex, index));
                  let braceCount = 1;
                  let valueStart = index + 2;
                  index += 2;

                  // Find the matching }
                  while (index < html.length && braceCount > 0) {
                      if (html[index] === '{') {
                          braceCount++;
                      } else if (html[index] === '}') {
                          braceCount--;
                      }
                      index++;
                  }

                  // Push the value without the outer braces
                  values.push(html.substring(valueStart, index - 1).trim());
                  lastIndex = index;
              } else {
                  index++;
              }
          }

          // Push remaining string part after the last value
          if (lastIndex < html.length) {
              strings.push(html.substring(lastIndex));
          }

          return {
              html,
              strings,
              values
          };
      }
  });
}

function recursiveTemplateParse(parsedResults) {
  const recurseValues = (values) => {
      return values.map(value => {
          if (value.startsWith('html`') && value.endsWith('`')) {
              // Strip the surrounding html`` and parse it
              const innerHtml = value.slice(5, -1);
              const parsed = extractTemplateParts([{ html: innerHtml }]);
              if (parsed.length > 0 && typeof parsed[0] !== 'string') {
                  // Recursively handle nested templates
                  parsed[0].values = recurseValues(parsed[0].values);
                  return parsed[0];
              }
          }
          return value;
      });
  };

  return parsedResults.map(item => {
      if (typeof item === 'object' && item.html) {
          // Process each template object recursively
          item.values = recurseValues(item.values);
      }
      return item;
  });
}

function reconstructCode(parsedResults) {
  const allStrings = [];
  let allStringsIndex = 0;

  const transform = (item) => {
      if (typeof item === 'string') {
          return item; // Return plain text directly.
      } else if (typeof item === 'object') {
          const { strings, values } = item;
          allStrings.push(strings); // Store strings in the allStrings array.
          const currentStringsIndex = allStringsIndex++;

          // Transform each value, which may be nested
          const transformedValues = values.map(value => {
              if (typeof value === 'string') {
                  return value; // Return JavaScript expressions directly.
              } else {
                  return transform(value); // Recurse into nested objects.
              }
          });

          return `new Tag(allStrings[${currentStringsIndex}], [${transformedValues.join(', ')}])`;
      }
  };

  const transformedCode = parsedResults.map(transform).join('');

  return {
      code: transformedCode,
      allStrings
  };
}

export function stringCastHtmlTagged(code) {
  const parsedResults = parseHtmlTemplates(code);
  const detailedResults = extractTemplateParts(parsedResults);
  const finalResults = recursiveTemplateParse(detailedResults)
  const newCode = reconstructCode(finalResults)
  const output = newCode.code+'\n\nconst allStrings=' + JSON.stringify(newCode.allStrings)
  return output
}
