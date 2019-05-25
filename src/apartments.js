const Handlebars = require('handlebars')
const fs = require('fs')
const Apartment = require('./apartment')
const Ids = require('./ids')
const AptartmentsModel = require('./apartments-model')

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
        const properties = json.search.result.listings.map(listing => Apartment.fromJson(this.provider, listing))
        return new Apartments(provider, properties)
    }

    static fromDb(provider, models) {
        const properties = models.map(model => Apartment.fromDb(provider, model))
        return new Apartments(provider, properties)
    }

    async news() {
        const ids = new Ids(this.apartments.map(p => p.id))

        const knownApartments = await AptartmentsModel.findByIds(ids)

        console.log(knownApartments.length, 'imóveis conhecidos')

        ids.removeDuplicates().
        const newProperties = ids.filter(function (id, index) {
            return ids.indexOf(id) === index;
        }).filter(id => {
            return !knownApartments.find(property => id === property.id)
        }).map(newId => this.apartments.find(p => p.id === newId))

        console.log(newProperties.length, 'imóveis para salvar')

        return new Apartments(this.provider, newProperties)
    }

    async save() {
        const dbProperties = await AptartmentsModel.insertMany(this.apartments)
        console.log(dbProperties.length, 'novos imóveis salvos')
        return Apartments.fromDb(this.provider, dbProperties)
    }

    html() {
        const html = fs.readFileSync('template-email.html', 'utf-8')
        const template = Handlebars.compile(html)
        return template({
            properties: this.apartments
        })
    }

    append(properties) {
        const joinedProperties = this.apartments.concat(properties.properties)
        return new Apartments(this.provider, joinedProperties)
    }
}

module.exports = Apartments
