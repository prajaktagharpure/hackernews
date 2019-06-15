import service from '../services/service'
import C from '../core/Constants'
import U from '../core/Util'

export default {
  loadTopStories (store, count = 20) {
    let topStoryIds = service.fetchData(service.getTopStoriesUrl())
    topStoryIds.then((topStoryIds) => {
      let top20storyIds = topStoryIds.slice(0, count)
      let promises = this.getItemsByIDs(top20storyIds)
      let showMore = U.ItemUtil.showMore(top20storyIds, topStoryIds)
      Promise.all(promises).then((topstories) => {
        store.dispatch(this.loadTopStoriesSuccess({ topstories, topStoryIds, showMore }))
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
    let commentsIds = topstory.kids
    if (commentsIds && commentsIds.length) {
      let topcomments = commentsIds.slice(0, count)
      let showMore = U.ItemUtil.showMore(topcomments, commentsIds)
      let current = true

      let promises = this.getItemsByIDs(topcomments)
      Promise.all(promises).then((topcomments) => {
        store.dispatch(this.loadStoryCommentsSuccess({ topcomments, index, commentsIds, showMore, current }))
      })
    }
  },
  loadStoryCommentsSuccess (comments) {
    return { type: C.types.LOAD_STORY_COMMENTS_SUCCESS, comments }
  },
  loadMoreItems (store, type, items, ids, index) {
    let currindex = items.length
    let newids = ids.slice(currindex, currindex + 20)
    let promises = this.getItemsByIDs(newids)
    let showMore = U.ItemUtil.showMore(newids, ids)

    Promise.all(promises).then((newitems) => {
      if (type === C.loadmoretype.STORY) {
        store.dispatch(this.loadMoreItemSuccess({ topstories: newitems, topStoryIds: ids, type, showMore }))
      } else {
        store.dispatch(this.loadMoreItemSuccess({ topcomments: newitems, commentsIds: ids, type, index, showMore, current: true }))
      }
    })
  },
  loadMoreItemSuccess (data) {
    return { type: C.types.LOAD_MORE_ITEMS_SUCCESS, data }
  }
}
