export default {
  isObjEmpty (o) {
    if (o) { return Object.keys(o).length === 0 && o.constructor === Object }
  }
}
