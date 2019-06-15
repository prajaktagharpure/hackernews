import A from '../actions/actions'
import U from '../core/Util'
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
    this.topstories = state.topStoriesReducer.topstories || this.topstories
    this.topStoryIds = state.topStoriesReducer.topStoryIds || this.topStoryIds
    return this.getTemplate()
  },
  afterRender () {
    // Click handler
    let showMoreBtns = Array.from(document.getElementsByClassName('show_more'))
    showMoreBtns.forEach(element => {
      if (element.getAttribute('listener') !== 'true') {
        element.setAttribute('listener', 'true')
        element.addEventListener('click', (e) => {
          let elem = e.target
          if (elem.id.indexOf('story') >= 0) {
            console.log('show more from stories clicked')
            A.topstories.loadMoreItems(this.store, C.loadmoretype.STORY, this.topstories, this.topStoryIds)
          } else if (elem.id.indexOf('comments') >= 0) {
            console.log('show more from comments clicked')
            let index = elem.id.split('_')[2]
            let state = this.store.getState()
            let topcommentsConfig = U.getObjValueInArray(state.topCommentsReducer, 'index', index)[0]
            let topcomments = topcommentsConfig.topcomments
            let commentsIds = topcommentsConfig.commentsIds
            A.topstories.loadMoreItems(this.store, C.loadmoretype.COMMENTS, topcomments, commentsIds, index)
          }
        })
      }
    })
  }
}
