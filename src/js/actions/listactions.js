import service from '../services/service'

export default {
  loadNewsList () {
    let topstories = service.fetchData(service.getTopStoriesUrl())
    topstories.then((topstories) => {
      console.log(topstories)

      // store.dispatch(C.pubsub.STORE_TOP_STORIES_IDS, topstories)
    })

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['this', 'that'])
      }, 2000)
    })
    return promise
  },
  getNewsList () {
    // return store.state.items
  },
  addItem (newsitem) {
    // store.dispatch(C.pubsub.ADD_ITEM, newsitem)
  },
  getTopStoriesIds () {
    // if (store.state.topstoriesids) { return store.state.topstoriesids }
  }
}
