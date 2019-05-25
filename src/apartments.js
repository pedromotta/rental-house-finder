const Handlebars = require('handlebars')
const fs = require('fs')
const Apartment = require('./apartment')
const Ids = require('./ids')
const AptartmentModel = require('./apartment-model')

class Apartments {
    constructor(provider, apartments) {
        this.provider = provider
        this.apartments = apartments
        this.length = apartments.length
    }

    static empty(provider) {
        return new Apartments(provider, [])
    }

    static fromResponse(provider, json) {
        const apartments = json.search.result.listings.map(listing => Apartment.fromJson(provider, listing))
        return new Apartments(provider, apartments)
    }

    static fromDb(provider, apartmentModels) {
        const apartmens = apartmentModels.map(model => Apartment.fromDb(provider, model))
        return new Apartments(provider, apartmens)
    }

    apartmentWithId(id) {
        return this.apartments.find(apto => apto.id === id)
    }

    apartmentsWithIds(ids) {
        return new Apartments(this.provider, ids.ids.map(id => this.apartments.find(apto => apto.id === id)))
    }

    ids() {
        return new Ids(this.apartments.map(apto => apto.id))
    }

    async news() {
        const knownApartments = await AptartmentModel.find({})
        const knownIds = Apartments.fromDb(this.provider, knownApartments).ids()

        console.log(knownApartments.length, 'imóveis conhecidos')

        const newIds = this.ids().removeDuplicates().remove(knownIds)

        console.log(newIds.ids.length, 'imóveis para salvar')
        return this.apartmentsWithIds(newIds)
    }

    async save() {
        console.log('Salvando %i imóveis', this.ids().ids.length)
        const dbProperties = await AptartmentModel.insertMany(this.apartments)
        console.log(dbProperties.length, 'novos imóveis salvos')
        return Apartments.fromDb(this.provider, dbProperties)
    }

    html() {
        const html = fs.readFileSync('resources/template-email.html', 'utf-8')
        const template = Handlebars.compile(html)
        return template({
            properties: this.apartments
        })
    }

    append(apartments) {
        const joinedProperties = this.apartments.concat(apartments.apartments)
        return new Apartments(this.provider, joinedProperties)
    }
}

module.exports = Apartments
