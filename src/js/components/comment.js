import U from '../core/Util'
export const Comment = {
  init (store = {}, selector) {
    this.store = store
    this.appComponent = document.getElementById(selector)
    return this.render()
  },
  getTemplate (model = {}) {
    if (!U.isObjEmpty(model) && model.comment) {
      return `
        <div id="comment-${model.index}"
        <span>By ${model.comment.by}</span>
        <blockquote>
          ${model.comment.text}
        </blockquote>
      `
    }
    return `<span>Comments sections </span>`
  },
  render (model) {
    return this.getTemplate(model)
  },
  afterRender () {}
}
