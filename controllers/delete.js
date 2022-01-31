module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const setup = await req.storage.getSetupById(id);

        if (setup) {
            res.render('delete', { title: 'Delete Setup', setup});
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            await req.storage.deleteSetupById(id);
            res.redirect('/');
        } catch(err) {
            console.error('Attempted to delete invalid Id');
            res.redirect('/404');
        }
    }
}