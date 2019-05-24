const rp = require('request-promise-native')
const Properties = require('./properties')

const PROVIDER = 'VivaReal'
const SIZE = 50

class VivaReal {
    async findProperties(page) {
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
        let properties = Properties.empty(PROVIDER)

        do {
            console.debug('Buscando página', page, '...')
            response = await this.findProperties(page)
            properties = properties.append(Properties.fromResponse(PROVIDER, response))
            page++
        } while ((page * SIZE) < response.search.totalCount)

        console.log(properties.length, 'imóveis encontrados em', PROVIDER)
        return properties
    }
}

module.exports = VivaReal
