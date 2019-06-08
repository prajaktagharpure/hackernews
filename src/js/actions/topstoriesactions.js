import service from '../services/service'
import C from '../core/Constants'
export default {
  loadTopStories (store, count = 20) {
    let topStoryIds = service.fetchData(service.getTopStoriesUrl())
    topStoryIds.then((topStoryIds) => {
      let top20storyIds = topStoryIds.slice(0, count)
      let promises = this.getItemsByIDs(top20storyIds)

      Promise.all(promises).then((topstories) => {
        store.dispatch(this.loadTopStoriesSuccess({ topstories, topStoryIds }))
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
  loadStoryComments (store, topstory, index, count = 1) {
    let commentsIds = topstory.kids
    let topcomments = commentsIds.slice(0, count)

    let promises = this.getItemsByIDs(topcomments)
    Promise.all(promises).then((topcomments) => {
      store.dispatch(this.loadStoryCommentsSuccess({ topcomments, index, commentsIds }))
    })
  },
  loadStoryCommentsSuccess (comments) {
    return { type: C.types.LOAD_STORY_COMMENTS_SUCCESS, comments }
  },
  loadMoreItems (store, type, items, ids, index) {
    let currindex = items.length
    let newids = ids.slice(currindex, currindex + 21)
    let promises = this.getItemsByIDs(newids)
    Promise.all(promises).then((newitems) => {
      if (type === C.loadmoretype.STORY) {
        store.dispatch(this.loadStoryCommentsSuccess({ topstories: items.concat(newitems), topStoryIds: ids, type }))
      } else {
        store.dispatch(this.loadStoryCommentsSuccess({ topcomments: items.concat(newitems), commentsIds: ids, type, index }))
      }
    })
  },
  loadStoryCommentsSucces (data) {
    return { type: C.types.LOAD_MORE_ITEMS_SUCCESS, data }
  }
}
