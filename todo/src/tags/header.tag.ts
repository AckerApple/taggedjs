import { header, h1, input, tag } from 'taggedjs'
import { handleKey } from './item.tag'
import { Dispatch } from '../reducer'

export const Header = (dispatch: Dispatch) =>
  header
    .class`header`
    .attr('data-testid', "header")(
      h1('src todos'),
      input
        .class`new-todo`
        .attr('autoFocus', true)
        .placeholder`What needs to be done?`
        .onKeydown(e => {
          const enter = handleKey(e, title => dispatch.addItem(title))
          if(enter) {
            e.target.value = ""
          }
        })
    )
