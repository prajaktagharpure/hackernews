import '@babel/polyfill'

export default {
  _serviceUrl: 'https://hacker-news.firebaseio.com/v0/',
  getTopStoriesUrl () {
    return this._serviceUrl + 'topstories.json?print=pretty'
  },
  getItemUrl (id) {
    return this._serviceUrl + 'item/' + id + '.json?print=pretty'
  },
  fetchData: async (serviceUrl, data) => {
    try {
      const response = await fetch(serviceUrl, data || null)
      try {
        return await response.json()
      } catch (parseJSONError) {
        console.error(`parseJSON failed: ${parseJSONError}`)
      }
    } catch (error) {
      console.error(`Fetch data failed: ${error}`)
    }
  },
  postData: async (serviceUrl, settings) => {
    return this.fetchData(serviceUrl, settings)
  }
}
