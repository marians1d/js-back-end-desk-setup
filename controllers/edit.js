module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const setup = await req.storage.getSetupById(id);

        if(setup) {
            res.render('edit', { title: `Edit - ${setup.name}`, setup})
        } else {
            res.redirect('/404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        const setup = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: Number(req.body.price),
        };

        try {
            await req.storage.updateSetupById(id, setup);
            
            res.redirect('/');
        } catch (err) {
            console.error(err.message);
            res.redirect('/404');
        }

    }
}