class Ids {
    constructor(ids) {
        this.ids = ids
    }

    removeDuplicates() {
        return new Ids(this.ids.filter((id, index) => this.ids.indexOf(id) === index))
    }

    contains(id) {
        return this.ids.includes(id)
    }

    remove(sourceIds) {
        return new Ids(this.ids.filter(id => !sourceIds.contains(id)))
    }
}

module.exports = Ids
