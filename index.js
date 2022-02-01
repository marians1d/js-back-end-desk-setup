// [x] initialize and configure Express app
// [x] initialize tempating lib
// [x] create home controller
// [x] bind routing
// [x] create layout
// [x] create data service
// - [x] read all
// - [x] read one by Id
// - [x] create
// - [x] edit
// - [x] delete
// - [x] search
// - [x] peripheral create
// - [x] peripheral read
// - [x] attach peripheral
// [x] implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improved home (search)
// - [x] edit
// - [x] delete
// - [x] create peripheral
// - [x] attach peripheral to setup
// - [x] update details to include peripherals
// [x] add front end code
// [x] add database conection
// [x] create Setup model
// [x] upgrade setup service to use Setup model
// [x] add validation rules to Setup model
// [x] create Peripheral model

const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models');

const setupService = require('./services/setups');
const peripheralService = require('./services/peripheral');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const deleteSetup = require('./controllers/delete');
const peripheral = require('./controllers/peripheral');
const attach = require('./controllers/attach');

const { notFound } = require('./controllers/notFound');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(setupService());
    app.use(peripheralService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(create.get)
        .post(create.post);

    app.route('/delete/:id')
        .get(deleteSetup.get)
        .post(deleteSetup.post);

    app.route('/edit/:id')
        .get(edit.get)
        .post(edit.post);

    app.route('/peripheral')
        .get(peripheral.get)
        .post(peripheral.post);

    app.route('/attach/:id')
        .get(attach.get)
        .post(attach.post)

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}