import { Comment } from './comment'
import U from '../core/Util'
export const ListItem = {
  init (store = {}, model) {
    this.store = store
    this.render(model)

    store.subscribe(this.render.bind(this))
  },
  getTemplate (model) {
    if (!U.isObjEmpty(model)) {
      let listItemView = `
      <li class="collection-item"> 
        <div class="collapsible-header listitem-header" id="listheader-${model.index}">${model.topstory.title}</div>
        <div class="collapsible-body" class="item-comments" id="comments-${model.index}" item='{model.topstory}'>
      `
      listItemView += Comment.init(this.store)

      listItemView += `  </div>
       </li>
      `
      return listItemView
    }
  },
  render (model) {
    if (model && model.topstory) {
      return this.getTemplate(model)
    }
    let state = this.store.getState(); let topcomments

    if (state && state.topcomments) { topcomments = state.topcomments }

    if (topcomments) {
      // document.getElementById("comment-" + state.index)= this.getTemplate({ topcomments, index: state.index })
      topcomments.forEach((comment, index) => {
        let commentComponent = document.getElementById('comments-' + state.index)
        commentComponent.innerHTML = ''
        commentComponent.innerHTML += Comment.render({ comment, index })
      })
    }
  }
}
