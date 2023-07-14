const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    move: {
        required: true,
        type: String
    }
})

dataSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Data', dataSchema)