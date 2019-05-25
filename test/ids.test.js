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
})
