export function getStringsId(
  strings: string[],
): number {
  const array = strings.map(lengthMapper)
  array.push(strings.length)
  return Number(array.join(''))
}

function lengthMapper(x: any) {
  return x.length
}