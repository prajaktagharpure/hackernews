import { expect } from 'chai'
import { List } from '../../js/components/list'

describe('Testing List Component', () => {
  it('should pass if the Component has render function', () => {
    let result = List.render && typeof List.render === 'function'
    expect(result).to.equal(true)
  })
  it('should pass if the Component has init function', () => {
    let result = List.init && typeof List.init === 'function'
    expect(result).to.equal(true)
  })
  it('should pass if the Component has getTemplate function', () => {
    let result = List.getTemplate && typeof List.getTemplate === 'function'
    expect(result).to.equal(true)
  })
})
