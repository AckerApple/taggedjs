import { html, tag, state } from "./taggedjs/index.js"

export const contentDebug = tag(function ContentDebug() {
  let renderCount = state(0, x => [renderCount, renderCount=x])

  ++renderCount

  return html`
    <div style="font-size:0.8em">You should see "0" here => "${0}"</div>
    <!--proof you cannot see false values -->
    <div style="font-size:0.8em">You should see "" here => "${false}"</div>
    <div style="font-size:0.8em">You should see "" here => "${null}"</div>
    <div style="font-size:0.8em">You should see "" here => "${undefined}"</div>
    <!--proof you can see true booleans -->
    <div style="font-size:0.8em">You should see "true" here => "${true}"</div>
    <!--proof you can try to use the tagVar syntax -->
    <div style="font-size:0.8em">You should see "${'{'}22${'}'}" here => "{22}"</div>
    <div style="font-size:0.8em">You should see "${'{'}__tagVar0${'}'}" here => "{__tagVar0}"</div>
    (render count ${renderCount})
  `
})