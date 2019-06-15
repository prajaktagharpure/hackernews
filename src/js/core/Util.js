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
    showMore (topitems, items, count = 20) {
      return topitems.length >= count && topitems.length < items.length && items.length > count
    },
    getCurrentComment (arr) {
      return arr.filter(item => item.current)[0]
    }
  }
}
