module.exports = {
    get(req, res) {
        res.render('create', { title: 'Post Desk Setup'});
    },
    async post(req, res) {
        const setup = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
        }

        await req.storage.createSetup(setup);

        res.redirect('/');
    }
}