module.exports = {
    async get(req, res) {
        const id = req.params.id;
        console.log(id);
        const setup = await req.storage.getById(id);
        console.log(setup);

        if (setup) {
            res.render('delete', { title: 'Delete Setup', setup});
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            await req.storage.deleteById(id);
            res.redirect('/');
        } catch(err) {
            res.redirect('/404')
        }
    }
}