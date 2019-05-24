const Property = require('./property')
const PropertiesModel = require('./properties-model')

class Properties {
    constructor(provider, properties) {
        this.provider = provider
        this.properties = properties
        this.length = properties.length
    }

    static empty(provider) {
        return new Properties(provider, [])
    }

    static fromResponse(provider, json) {
        const properties = json.search.result.listings.map(listing => Property.fromJson(this.provider, listing))
        return new Properties(provider, properties)
    }

    static fromDb(provider, models) {
        const properties = models.map(model => Property.fromDb(provider, model))
        return new Properties(provider, properties)
    }

    async news() {
        const ids = this.properties.map(p => p.id)
        const knownProperties = await PropertiesModel.findByIds(ids)

        console.log(knownProperties.length, 'imóveis já conhecidos')

        const newProperties = ids.filter(function (id, index) {
            return ids.indexOf(id) === index;
        }).filter(id => {
            return !knownProperties.find(property => id === property.id)
        }).map(newId => this.properties.find(p => p.id === newId))

        console.log(newProperties.length, 'imóveis para salvar')

        return new Properties(this.provider, newProperties)
    }

    async save() {
        const dbProperties = await PropertiesModel.insertMany(this.properties)
        return Properties.fromDb(this.provider, dbProperties)
    }

    append(properties) {
        const joinedProperties = this.properties.concat(properties.properties)
        return new Properties(this.provider, joinedProperties)
    }
}

module.exports = Properties
