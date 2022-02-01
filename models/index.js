const mongoose = require('mongoose');

require('./Setup');
require('./Peripheral');

const connectionString = 'mongodb://localhost:27017/setupkings';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database Error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database');
    }
}

module.exports = init;