module.exports = {
    async home(req, res) {
        const setups = await req.storage.getAllSetups(req.query);

        res.render('index', { title: 'SetupKings', setups, query: req.query});
    }
}