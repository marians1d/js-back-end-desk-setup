module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const setup = await req.storage.getById(id);

        if(setup) {
            res.render('details', { title: `SetupKings - ${setup.name}`, setup})
        } else {
            res.redirect('/404');
        }
    }
}