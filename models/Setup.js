const { Schema, model } = require('mongoose');

const setupSchema = new Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    price: { type: Number }
});

const Setup = model('Setup', setupSchema);

module.exports = Setup;