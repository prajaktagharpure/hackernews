export default {
  isObjEmpty (o) {
    if (o) { return Object.keys(o).length === 0 && o.constructor === Object }
  },

  ItemUtil: {
    showMore (topitems, items) {
      return topitems.length === 20 && items.length > 20
    }
  }
}
