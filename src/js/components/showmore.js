import A from '../actions/actions'
import C from '../core/Constants'
export const ShowMore = {
  init (store, selector) {
    this.store = store
    this.selector = selector

    store.subscribe(this.render.bind(this))
    return this.render()
  },
  getTemplate () {
    return `<a id="${this.selector}" class="waves-effect waves-light btn show_more">Show More</a>`
  },
  render () {
    let state = this.store.getState()
    // init vars for loading stories/comments
    this.topstories = state.topstories || this.topstories
    this.topStoryIds = state.topStoryIds || this.topStoryIds
    this.topcomments = state.topcomments || this.topcomments
    this.commentsIds = state.commentsIds || this.commentsIds
    return this.getTemplate()
  },
  afterRender () {
    // Click handler
    let showMoreBtns = Array.from(document.getElementsByClassName('show_more'))
    showMoreBtns.forEach(element => {
      element.addEventListener('click', (e) => {
        let elem = e.target
        if (elem.id.indexOf('story') >= 0) {
          console.log('show more from stories clicked')
          A.topstories.loadMoreItems(this.store, C.loadmoretype.STORY, this.topstories, this.topStoryIds)
        } else if (elem.id.indexOf('comments') >= 0) {
          console.log('show more from comments clicked')
          let index = elem.id.split('_')[2]
          A.topstories.loadMoreItems(this.store, C.loadmoretype.COMMENTS, this.topcomments, this.commentsIds, index)
        }
      })
    })
  }
}
