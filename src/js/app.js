import { List } from './components/list'
import A from './actions/actions'

export const App = {
  init (store = {}) {
    this.appElement = document.querySelector('#app')
    A.topstories.loadTopStories(store)
    this.render()
    this.initComponents(store)
  },
  initComponents (store) {
    List.init(store)
  },
  getTemplate (model) {
    return `
    <section id="list-container" class="list-container">
    </section>
    `
  },
  render () {
    this.appElement.innerHTML = this.getTemplate()
  }
}
