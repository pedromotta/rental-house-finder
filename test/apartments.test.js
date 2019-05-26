const proxyquire = require('proxyquire')
const assert = require('chai').assert
const fs = require('fs')
const Apartment = require('../src/apartment')
const Ids = require('../src/ids')
const ApartmentModel = require('../src/apartment-model')
const apartmentModelMock = {}
const Apartments = proxyquire('../src/apartments', { '../src/apartment-model': apartmentModelMock })

describe('Apartments tests', () => {
    const apartment1 = new Apartment('Test', '1', 'https://www.vivareal.com.br/1', 'Sagrada Família', 'Apartamento novo')
    const apartment2 = new Apartment('Test', '2', 'https://www.vivareal.com.br/2', 'Sagrada Família', 'Apartamento usado')
    const apartment3 = new Apartment('Test', '3', 'https://www.vivareal.com.br/3', 'Sagrada Família', 'Apartamento lindo')
    let apartments
    before(() => {
        apartments = new Apartments('TestVivaReal', [apartment1, apartment2, apartment2, apartment3])
    });
    it('exports Apartments class', () => {
        assert.isFunction(Apartments)
    })
    it('creates an empty apartments instance', () => {
        assert.deepEqual(Apartments.empty('Test'), new Apartments('Test', []))
    })
    it('gets apartment by id', () => {
        assert.equal(apartments.apartmentWithId('2'), apartment2)
    })
    it('gets apartments by ids', () => {
        const ids = new Ids(['1', '3'])

        assert.deepEqual(apartments.apartmentsWithIds(ids), new Apartments('TestVivaReal', [apartment1, apartment3]))
    })
    it('gets only one apartment when it is duplicated', () => {
        const ids = new Ids(['2'])

        assert.deepEqual(apartments.apartmentsWithIds(ids), new Apartments('TestVivaReal', [apartment2]))
    })
    it('ids with all apartments ids', () => {
        const ids = new Ids(['1', '2', '2', '3'])

        assert.deepEqual(apartments.ids(), ids)
    })
    it('creates a new apartments instances joining apartments', () => {
        const apartment4 = new Apartment('', '4', '', '', '')
        const apartment5 = new Apartment('', '5', '', '', '')
        const newApartments = new Apartments('TestVivaReal', [apartment4, apartment5])

        assert.deepEqual(apartments.append(newApartments), new Apartments('TestVivaReal', [apartment1, apartment2, apartment2, apartment3, apartment4, apartment5]))
    })
    it('generates final html', () => {
        const html = fs.readFileSync('resources/template-email-example.html', 'utf-8')
        const apartments = new Apartments('TestVivaReal', [apartment1, apartment2])

        assert.equal(apartments.html(), html)
    })
    it('returns only the apartment that there is not in the db', async () => {
        apartmentModelMock.find = () => { return [new ApartmentModel(apartment1), new ApartmentModel(apartment2), new ApartmentModel(apartment3)] }

        const apartment4 = new Apartment('', '4', '', '', '')
        const apartment5 = new Apartment('', '5', '', '', '')
        const allApartments = new Apartments('TestVivaReal', [apartment1, apartment2, apartment3, apartment4, apartment5])

        const onlyNewApartments = await allApartments.news()

        assert.deepEqual(onlyNewApartments, new Apartments('TestVivaReal', [apartment4, apartment5]))
    })
})
