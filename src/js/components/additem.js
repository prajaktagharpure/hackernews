import A from '../actions/actions'

export const AddItem = {
  init (store = {}) {
    this.store = store
  },
  getTemplate () {
    return `
    <button class="add-item-btn"> Add Item </button>
    `
  },
  render (model) {
    this.listitems = model.listitems
    return this.getTemplate()
  },
  afterRender () {
    const addItemBtn = document.querySelector('.add-item-btn')
    if (addItemBtn) {
      addItemBtn.addEventListener('click', evt => {
        A.topstories.addTopStory(this.store, 'some more')
      })
    }
  }
}
