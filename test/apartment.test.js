const assert = require('chai').assert
const fs = require('fs')
const ApartmentModel = require('../src/apartment-model')
const Apartment = require('../src/apartment')

describe('Apartment tests', () => {
    it('exports Apartment class', () => {
        assert.isFunction(Apartment)
    })
    it('parses apartment model to apartment domain', () => {
        const apartmentModel = new ApartmentModel({
            '_id': '5ce97d9110e64d37849778c5',
            'provider': 'VivaReal',
            'id': '2433610387',
            'neighborhood': 'Sagrada Família',
            'url': 'https://www.vivareal.com.br/imovel/apartamento-3-quartos-sagrada-familia-bairros-belo-horizonte-com-garagem-80m2-aluguel-RS1500-id-2433610387/',
            'title': 'Apartamento com 80m² e 3 quartos',
            '__v': 0
        })

        const apartment = Apartment.fromDb('VivaReal', apartmentModel)
        const expectedApartment = new Apartment('VivaReal', '2433610387',
            'https://www.vivareal.com.br/imovel/apartamento-3-quartos-sagrada-familia-bairros-belo-horizonte-com-garagem-80m2-aluguel-RS1500-id-2433610387/',
            'Sagrada Família',
            'Apartamento com 80m² e 3 quartos');

        assert.deepEqual(apartment, expectedApartment)
    })
    it('parses apartment json to apartment domain', () => {
        const vivaRealResponseJson = JSON.parse(fs.readFileSync('resources/viva-real-response.json', 'utf-8'))

        const firstApartmentOfJson = vivaRealResponseJson.search.result.listings[0]

        const apartment = Apartment.fromJson('VivaReal', firstApartmentOfJson)

        const expectedApartment = new Apartment('VivaReal', '2433980101',
            'https://www.vivareal.com.br/imovel/apartamento-3-quartos-sagrada-familia-bairros-belo-horizonte-com-garagem-72m2-aluguel-RS1400-id-2433980101/',
            'Sagrada Família',
            'APARTAMENTO para aluguel, 3 quarto(s), BELO HORIZONTE/MG')

        assert.deepEqual(apartment, expectedApartment)
    })
})
