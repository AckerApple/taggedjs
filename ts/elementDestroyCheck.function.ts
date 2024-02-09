export function elementDestroyCheck(
  nextSibling: Element & {ondestroy?: (event: Event) => any},
  stagger: number,
) {
  const onDestroyDoubleWrap = nextSibling.ondestroy
  if(!onDestroyDoubleWrap) {
    return
  }

  const onDestroyWrap = (onDestroyDoubleWrap as any).tagFunction
  if(!onDestroyWrap) {
    return
  }

  const onDestroy = onDestroyWrap.tagFunction
  if(!onDestroy) {
    return
  }

  const event = {target: nextSibling, stagger} as unknown as Event
  return onDestroy(event)
}
