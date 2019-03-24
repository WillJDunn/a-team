const db = require('./PooledDatabaseConnection');
const Item = require('../dto/Item');

//api/statuses/GET: /api/items/GET: Get a list of all items
const getItems = () => {
    const sql = 'SELECT * FROM teama.items';
    return db.query(sql)
        .then(results => results.map(result => Item.fromDB(result)));
};


//api/statuses/GET: /api/items/GET: Get a list of all items by