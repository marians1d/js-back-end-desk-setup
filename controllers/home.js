module.exports = {
    async home(req, res) {
        const setups = await req.storage.getAll();
        res.render('index', { title: 'SetupKings', setup});
    }
}