type WithDestroy<T> = {
  destroy?: (event: Event) => T
}

export function runElementDestroyCall<T>(
  nextSibling: Element & WithDestroy<T>,
  stagger: number,
): T | undefined {
  const onDestroyDoubleWrap = nextSibling.destroy // nextSibling.ondestroy
  const onDestroyWrap = (onDestroyDoubleWrap as any).tagFunction
  if(!onDestroyWrap) {
    return
  }

  const onDestroy = onDestroyWrap.tagFunction

  const event = {
    target: nextSibling,
    stagger
  } as unknown as Event
  return onDestroy(event)
}
