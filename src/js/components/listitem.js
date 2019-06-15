import { Comment } from './comment'
import { ShowMore } from './showmore'
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
    let state = this.store.getState().topCommentsReducer
    if (state && state.length) {
      let topcomments
      let topcommentConfig = U.ItemUtil.getCurrentComment(state)
      this.topcomments = topcommentConfig.topcomments
      this.commentsIds = topcommentConfig.commentsIds
      this.showMore = topcommentConfig.showMore

      if (topcommentConfig && topcommentConfig.topcomments) { topcomments = topcommentConfig.topcomments }

      if (topcomments) {
        let commentComponent = document.getElementById('comments-' + topcommentConfig.index)
        commentComponent.innerHTML = ''
        topcomments.forEach((comment, index) => {
          commentComponent.innerHTML += Comment.render({ comment, index })
        })
        if (this.showMore) { commentComponent.innerHTML += ShowMore.init(this.store, 'showmore_comments_' + topcommentConfig.index) }
      }
      this.afterRender()
    }
  },
  afterRender () {
    Comment.afterRender()
    ShowMore.afterRender()
  }
}
