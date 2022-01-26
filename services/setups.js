const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);

        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error('Database read error');
        console.error(err);
    }
}

async function getAll(query) {
    const data = await read();
    let setups = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        setups = setups.filter(s => s.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if (query.from) {
        setups = setups.filter(s => s.price >= Number(query.from))
    }
    if (query.to) {
        setups = setups.filter(s => s.price <= Number(query.to))
    }

    return setups;
}

async function getById(id) {
    const data = await read();
    const setup = data[id];
    if (setup) {
        return Object.assign({}, { id }, setup);
    } else {
        return undefined;
    }
}

async function createSetup(setup) {
    const setups = await read();

    let id;

    do {
        id = nextId();
    } while(setups.hasOwnProperty(id));

    setups[id] = setup;

    await write(setups)
}

function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16))
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createSetup
    };

    next();
};