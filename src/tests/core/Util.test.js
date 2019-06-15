import { expect } from 'chai'
import U from '../../js/core/Util'

describe('Testing Util Suite', () => {
  describe('Testing isObjEmpty function', () => {
    it('should return true if the object is empty', () => {
      expect(U.isObjEmpty({})).to.equal(true)
    })
    it('should return false if the object is not empty', () => {
      expect(U.isObjEmpty({ something: 'something' })).to.equal(false)
    })
  })
  describe('Testing showMore function from ItemUtil obj', () => {
    it('should false if topitems are less than 20 and than actual items are more than 20', () => {
      expect(U.ItemUtil.showMore([1, 2], [1, 1, 1, 1])).to.equal(false)
    })

    let topitems = []; let items = []
    for (let i = 0; i <= 35; i++) {
      if (topitems.length <= 20) {
        topitems.push(i)
      }

      items.push(i + 2)
    }
    it('should return true as items are more than 20 and topitems are 20', () => {
      expect(U.ItemUtil.showMore(topitems, items)).to.equal(true)
    })
  })
  describe('Testing isObjValueInArray and getObjValueArray', () => {
    it('isObjValueInArray should return true', () => {
      let arr = [{ 'current': true, 'someval': '4' }, { 'someval': '3' }]
      let key = 'current'; let val = true
      expect(U.isObjValueInArray(arr, key, val)).to.equal(1)
    })
  })
})
