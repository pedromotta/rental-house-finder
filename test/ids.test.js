const assert = require('chai').assert
const Ids = require('../src/ids')

describe('Ids tests', () => {
    it('exports Ids class', () => {
        assert.isFunction(Ids)
    })
    it('removes duplicate ids', () => {
        const ids = new Ids([1, 2, 2, 3, 4])
        const uniqueIds = ids.removeDuplicates()

        assert.instanceOf(uniqueIds, Ids)
        assert.deepEqual(uniqueIds, new Ids([1, 2, 3, 4]))
    })
    it('contains an existent item', () => {
        const ids = new Ids([1, 2, 2, 3, 4])
        const containsItem = ids.contains(3)

        assert.isTrue(containsItem)
    })
    it('filters only new ids', () => {
        const ids = new Ids([1, 2, 3, 4])
        const oldIds = new Ids([1, 4])

        const newIds = ids.remove(oldIds)

        assert.instanceOf(newIds, Ids)
        assert.deepEqual(newIds, new Ids([2, 3]))
    })
})
