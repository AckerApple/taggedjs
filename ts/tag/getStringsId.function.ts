export function getStringsId(
  strings: string[],
): number {
  const array = strings.map(x => x.length)
  array.push(strings.length)
  return Number(array.join(''))
}
