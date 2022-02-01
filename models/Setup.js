const { Schema, model, Types: { ObjectId } } = require('mongoose');

const setupSchema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'notFound.jpg'},
    price: { type: Number, required: true, min: 0 },
    peripherals: { type: [ObjectId],default: [] , ref: 'Peripheral'}
});

const Setup = model('Setup', setupSchema);

module.exports = Setup;