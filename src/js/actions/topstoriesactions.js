import service from '../services/service'
import C from '../core/Constants'
export default {
  loadTopStories (store, count = 20) {
    let topStoryIds = service.fetchData(service.getTopStoriesUrl())
    topStoryIds.then((topStoryIds) => {
      let top20storyIds = topStoryIds.slice(0, count)
      let promises = this.getItemsByIDs(top20storyIds)

      Promise.all(promises).then((topstories) => {
        store.dispatch(this.loadTopStoriesSuccess({ topstories }))
      })
    })
  },
  loadTopStoriesSuccess (topstories) {
    return { type: C.types.LOAD_TOP_STORIES_SUCCESS, topstories }
  },
  addTopStory (store, topstory) {
    store.dispatch(this.addTopStorySuccess(topstory))
  },
  addTopStorySuccess (topstory) {
    return { type: C.types.ADD_TOP_STORY_SUCCESS, topstory }
  },
  getItemsByIDs (ids) {
    return ids.map((id) => {
      return service.fetchData(service.getItemUrl(id))
    })
  },
  loadStoryComments (store, topstory, index, count = 20) {
    let comments = topstory.kids
    let topcomments = comments.slice(0, count)

    let promises = this.getItemsByIDs(topcomments)
    Promise.all(promises).then((topcomments) => {
      store.dispatch(this.loadStoryCommentsSuccess({ topcomments, index }))
    })
  },
  loadStoryCommentsSuccess (comments) {
    return { type: C.types.LOAD_STORY_COMMENTS_SUCCESS, comments }
  }
}
