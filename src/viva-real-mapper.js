const Apartment = require('./apartment')
const AptartmentModel = require('./apartment-model')

const PROVIDER = 'VivaReal'
const HOST = 'https://www.vivareal.com.br'

class VivaRealMapper {
    static fromJson(json) {
        const id = json.listing.id.trim()
        const url = HOST.concat(json.url.link.href)
        const neighborhood = json.listing.address.neighborhood
        const title = json.listing.title
        return new Apartment(PROVIDER, id, url, neighborhood, title)
    }

    static fromModel(model) {
        return new Apartment(PROVIDER, model.id, model.url, model.neighborhood, model.title)
    }
}

module.exports = VivaRealMapper
