const host = 'https://www.vivareal.com.br'

class Property {
    constructor(provider, id, url, neighborhood) {
        this.provider = provider
        this.id = id
        this.neighborhood = neighborhood
        this.url = url
    }

    static fromJson(provider, json) {
        const id = json.listing.id
        const url = host.concat(json.url.link.href)
        const neighborhood = json.listing.address.neighborhood
        return new Property(provider, id, url, neighborhood)
    }

    static fromDb(provider, model) {
        return new Property(provider, model.id, model.url, model.neighborhood)
    }
}

module.exports = Property
