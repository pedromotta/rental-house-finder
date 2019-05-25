class Ids {
    constructor(ids) {
        this.ids = ids
    }

    removeDuplicates() {
        const uniqueIds = this.ids.filter((id, index) => this.ids.indexOf(id) === index)
        return new Ids(uniqueIds)
    }
}

module.exports = Ids
