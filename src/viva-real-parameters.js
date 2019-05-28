module.exports = (size, page) => {
    return {
        addressCity: 'Belo Horizonte,Belo Horizonte,Belo Horizonte,Belo Horizonte,Belo Horizonte,Belo Horizonte,Belo Horizonte',
        addressCountry: 'BR,BR,BR,BR,BR,BR,BR',
        addressLocationId: 'BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Graca,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Sagrada Familia,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Santa Tereza,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Horto,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Esplanada,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Floresta,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Santa Efigenia',
        addressNeighborhood: 'Graça,Sagrada Família,Santa Tereza,Horto,Esplanada,Floresta,Santa Efigênia',
        addressState: 'Minas Gerais,Minas Gerais,Minas Gerais,Minas Gerais,Minas Gerais,Minas Gerais,Minas Gerais',
        addressStreet: ',,,,,,',
        addressZone: 'Bairros,Bairros,Bairros,Bairros,Bairros,Bairros,Bairros',
        addresses: 'BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Graca,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Sagrada Familia,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Santa Tereza,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Horto,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Esplanada,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Floresta,BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Santa Efigenia',
        filterPricingInfoBusinessType: 'RENTAL',
        facets: 'amenities',
        filter: '(address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Graca" OR address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Sagrada Familia" OR address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Santa Tereza" OR address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Horto" OR address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Esplanada" OR address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Floresta" OR address.locationId: "BR>Minas Gerais>NULL>Belo Horizonte>Barrios>Santa Efigenia") AND pricingInfos.businessType: "RENTAL" AND unitTypes IN ["APARTMENT"] AND propertyType: "UNIT" AND listingType: "USED"',
        filterUnitType: 'APARTMENT',
        filterListingType: 'USED',
        includeFields: 'search, url',
        size: size,
        from: size * page,
        filterPropertyType: 'UNIT',
        q: '',
        developmentsSize: '5',
        sort: 'updatedAt DESC sortFilter:pricingInfos.businessType=\'RENTAL\'',
        __vt: 'lfnl: b'
    }
}
