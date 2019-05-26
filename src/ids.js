class Ids {
    constructor(ids) {
        this.ids = ids.map(id => typeof (id) === 'string' ? id.trim() : id)
    }

    removeDuplicates() {
        return new Ids([...new Set(this.ids)])
    }

    contains(id) {
        return this.ids.includes(id)
    }

    remove(sourceIds) {
        return new Ids(this.ids.filter(id => !sourceIds.contains(id)))
    }
}

module.exports = Ids
