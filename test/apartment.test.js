const assert = require('chai').assert
const fs = require('fs')
const ApartmentModel = require('../src/apartment-model')
const Apartment = require('../src/apartment')

describe('Apartment tests', () => {
    it('exports Apartment class', () => {
        assert.isFunction(Apartment)
    })
})
