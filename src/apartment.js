const host = 'https://www.vivareal.com.br'

class Apartment {
    constructor(provider, id, url, neighborhood, title) {
        this.provider = provider
        this.id = id
        this.neighborhood = neighborhood
        this.url = url
        this.title = title
    }

    static fromJson(provider, json) {
        const id = json.listing.id
        const url = host.concat(json.url.link.href)
        const neighborhood = json.listing.address.neighborhood
        const title = json.listing.title
        return new Apartment(provider, id, url, neighborhood, title)
    }

    static fromDb(provider, model) {
        return new Apartment(provider, model.id, model.url, model.neighborhood, model.title)
    }
}

module.exports = Apartment
