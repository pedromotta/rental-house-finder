const rp = require('request-promise-native')
const Apartments = require('./apartments')

const VIVA_REAL = 'VivaReal'
const SIZE = 50

class VivaReal {
    async requestApartments(page) {
        const options = {
            uri: 'https://glue-api.vivareal.com/v1/listings',
            qs: {
                addressCity: 'Belo Horizonte',
                addressCountry: 'BR',
                addressLocationId: 'BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Sagrada Familia',
                addressNeighborhood: 'Sagrada Família',
                addressState: 'Minas Gerais',
                addressStreet: '',
                addressZone: 'Bairros',
                addresses: 'BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Sagrada Familia',
                filterPricingInfoBusinessType: 'RENTAL',
                facets: 'amenities',
                filter: '(address.locationId:"BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Sagrada Familia") AND pricingInfos.businessType:"RENTAL" AND unitTypes IN ["APARTMENT"] AND propertyType:"UNIT" AND listingType:"USED"',
                filterUnitType: 'APARTMENT',
                filterListingType: 'USED',
                includeFields: 'search,url',
                size: SIZE,
                from: SIZE * page,
                filterPropertyType: 'UNIT',
                q: '',
                developmentsSize: '5',
                sort: 'updatedAt DESC sortFilter:pricingInfos.businessType=\'RENTAL\'',
                __vt: 'lfnl%3Ab',
            },
            json: true // Automatically parses the JSON string in the response
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
