const { Schema, model } = require('mongoose');

const peripheralSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'notFound.jpg' }
});

const Peripheral = model('Peripheral', peripheralSchema);

module.exports = Peripheral;