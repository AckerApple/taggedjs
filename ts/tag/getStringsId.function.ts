
export function getStringsId(
  strings: string[],
  values: any[]
): number {
  const array = strings.map(x => x.length)
  array.push(strings.length)
  // array.push(values.length)
  return Number(array.join(''))
}
