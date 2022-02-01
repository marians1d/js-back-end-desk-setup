module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [setup, peripherals] = await Promise.all([
                req.storage.getSetupById(id),
                req.storage.getAllPeripherals()
            ]);

            const existingIds = setup.peripherals.map(p => p.id.toString());
            const availablePeripherals = peripherals.filter(p => existingIds.includes(p.id.toString()) == false);

            res.render('attach', { title: 'Attach Peripheral', setup, peripherals: availablePeripherals });
        } catch (err) {
            res.redirect('/404');
        }

    },
    async post(req, res) {
        const setupId = req.params.id;
        const peripheralId = req.body.peripheral;

        console.log(setupId, peripheralId);

        try {
            await req.storage.attachPeripheral(setupId, peripheralId);
            
            res.redirect('/');
        } catch (err) {
            console.log('Error creating peripheral');
            console.log(err.message);
            res.redirect('/attach/' + setupId);
        }

    }
}