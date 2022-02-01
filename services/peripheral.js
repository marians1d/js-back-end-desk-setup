const Peripheral = require('../models/Peripheral');
const { peripheralViewModel } = require('./util');

async function getAllPeripherals() {
    const data = await Peripheral.find({});

    return data.map(peripheralViewModel);
}

async function createPeripheral(peripheral) {
    await Peripheral.create(peripheral);
}

module.exports = () => (req, res, next) => {
    Object.assign(req.storage, {
        getAllPeripherals,
        createPeripheral
    });

    next();
}