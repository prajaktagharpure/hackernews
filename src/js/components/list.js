import { ListItem } from './listitem'
import { ShowMore } from './showmore'
import U from '../core/Util'
import A from '../actions/actions'
import M from 'materialize-css'

export const List = {

  init (store) {
    this.store = store
    this.appComponent = document.querySelector('#list-container')
    // Initialise child components with store parameter
    ListItem.init(store)
    this.render()

    store.subscribe(this.render.bind(this))
  },

  getTemplate (model) {
    if (!U.isObjEmpty(model)) {
      let listViewHtml = `
      <ul class="collapsible expandable" id="list-parent"><li class="collection-header"><h4>Hackernews Top Stories</h4></li>
      `
      model.topstories.forEach((topstory, index) => {
        listViewHtml += ListItem.render({ topstory, index })
      })
      listViewHtml += `</ul>
        ` + ShowMore.init(this.store, 'showmore_story')

      return listViewHtml
    }
  },
  render () {
    let state = this.store.getState()
    this.topstories = state.topstories || this.topstories
    this.topStoryIds = state.topStoryIds || this.topStoryIds
    let topstories
    if (state && state.topstories) { topstories = state.topstories }
    if (topstories) {
      this.appComponent.innerHTML = this.getTemplate({ topstories })
      this.afterRender()
    }
  },
  afterRender () {
    // Initialising collapsible in materialise css
    var elem = document.querySelector('.collapsible.expandable')
    M.Collapsible.init(elem, {
      accordion: false
    })
    // click handlers
    let listObj = this
    let listHeaders = document.getElementsByClassName('listitem-header')
    Array.from(listHeaders).forEach(function (element) {
      element.addEventListener('click', (e) => {
        let elem = e.target; let index = elem.getAttribute('id').split('-')[1]; let topstories = listObj.topstories || []
        if (Array.from(elem.classList).indexOf('comments_loaded') === -1) {
          elem.classList.add('comments_loaded')
          A.topstories.loadStoryComments(listObj.store, topstories[index], index)
        }
      })
    })

    ShowMore.afterRender()
  }
}
