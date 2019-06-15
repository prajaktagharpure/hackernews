export default {
  isObjValueInArray (arr, key, val) {
    return this.getObjValueInArray(arr, key, val).length
  },
  getObjValueInArray (arr, key, val) {
    return arr.filter(o => o[key] === val)
  },
  isObjEmpty (o) {
    if (o) { return Object.keys(o).length === 0 && o.constructor === Object }
  },

  ItemUtil: {
    showMore (topitems, items) {
      return topitems.length === 20 && items.length > 20
    },
    getCurrentComment (arr) {
      return arr.filter(item => item.current)[0]
    }
  }
}
