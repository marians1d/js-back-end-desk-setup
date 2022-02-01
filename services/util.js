function peripheralViewModel(peripheral) {
    return {
        id: peripheral._id,
        name: peripheral.name,
        description: peripheral.description,
        imageUrl: peripheral.imageUrl
    }
}

function setupViewModel(setup) {
    const model = {
        id: setup._id,
        name: setup.name,
        description: setup.description,
        imageUrl: setup.imageUrl,
        price: setup.price,
        peripherals: setup.peripherals
    }

    if (model.peripherals.length > 0 && model.peripherals[0].name) {
        model.peripherals = model.peripherals.map(peripheralViewModel);
    }

    return model;
}

module.exports = {
    peripheralViewModel,
    setupViewModel
}