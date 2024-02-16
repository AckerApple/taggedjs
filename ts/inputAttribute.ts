export function inputAttribute(
  name: string,
  value: any,
  element: Element,
) {
  const names = name.split('.')

  // style.position = "absolute"
  if(names[0] === 'style') {
    (element as any).style[names[1]] = value
  }

  // Example: class.width-full = "true"
  if(names[0] === 'class') {
    names.shift()
    if(value) {
      names.forEach(name => element.classList.add(name))
    } else {
      names.forEach(name => element.classList.remove(name))
    }
    return
  }
}
