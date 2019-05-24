const mongoose = require('mongoose');

let propertiesSchema = new mongoose.Schema({
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
    url: String
});

propertiesSchema.statics.findByIds = function (ids) {
    return this.find({
        id: {
            $in: ids
        }
    })
}

module.exports = mongoose.model('Properties', propertiesSchema)
