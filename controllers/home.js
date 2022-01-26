module.exports = {
    async home(req, res) {
        const setups = await req.storage.getAll(req.query);

        res.render('index', { title: 'SetupKings', setups, query: req.query});
    }
}