const mongoose = require('mongoose')

let apartmentsSchema = new mongoose.Schema({
    provider: {
        type: String,
        enum: ["VivaReal"]
    },
    id: {
        type: String,
        unique: true,
        index: true
    },
    neighborhood: String,
    url: String,
    title: String
})

module.exports = mongoose.model('Apartments', apartmentsSchema)
