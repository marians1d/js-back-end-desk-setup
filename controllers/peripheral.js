module.exports = {
    get(req, res) {
        res.render('createPeripheral', { title: 'Create Peripheral'});
    },
    async post(req, res) {
        const peripheral = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined
        }

        try {
            req.storage.createPeripheral(peripheral);
            
            res.redirect('/');
        } catch (err) {
            console.log('Error creating peripheral');
            console.log(err.message);
            res.redirect('/peripheral');
        }
    }
}