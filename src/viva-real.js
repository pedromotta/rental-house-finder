const rp = require('request-promise-native')
const Apartments = require('./apartments')
const parameters = require('./viva-real-parameters')

const VIVA_REAL = 'VivaReal'
const SIZE = 100

class VivaReal {
    async requestApartments(page) {
        const options = {
            uri: 'https://glue-api.vivareal.com/v1/listings',
            qs: parameters(SIZE, page),
            json: true
        };

        return await rp(options)
    }

    async findAll() {
        let page = 0
        let response
        let apartments = Apartments.empty(VIVA_REAL)

        do {
            console.debug('Buscando página', page, '...')
            response = await this.requestApartments(page)
            apartments = apartments.append(Apartments.fromResponse(VIVA_REAL, response))
            page++
        } while ((page * SIZE) < response.search.totalCount)

        console.log(apartments.length, 'imóveis encontrados em', VIVA_REAL)
        return apartments
    }
}

module.exports = VivaReal
