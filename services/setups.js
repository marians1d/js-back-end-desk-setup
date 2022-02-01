const Setup = require('../models/Setup');
const { setupViewModel } = require('./util')

async function getAllSetups(query) {
    const options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) }
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }

        options.price.$lte = Number(query.to);
    }

    const setups = await Setup.find(options);
    return setups.map(setupViewModel);
}

async function getSetupById(id) {
    const setup = await Setup.findById(id).populate('peripherals');
    if (setup) {
        return setupViewModel(setup);
    } else {
        return undefined;
    }
}

async function createSetup(setup) {
    const setupResult = new Setup(setup);
    await setupResult.save();
}

async function updateSetupById(id, setup) {
    const existing = await Setup.findById(id);

    existing.name = setup.name;
    existing.description = setup.description;
    existing.imageUrl = setup.imageUrl;
    existing.price = setup.price;
    existing.peripherals = setup.peripherals;

    await existing.save();
}

async function attachPeripheral(setupId, peripheralId) {
    const existing = await Setup.findById(setupId);

    existing.peripherals.push(peripheralId);

    await existing.save();
}

async function deleteSetupById(id) {
    await Setup.findByIdAndDelete(id);
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllSetups,
        getSetupById,
        createSetup,
        deleteSetupById,
        updateSetupById,
        attachPeripheral
    };

    next();
};