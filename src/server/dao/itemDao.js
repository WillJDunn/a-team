const db = require('./PooledDatabaseConnection');
const Item = require('../dto/Item');

//api/statuses/GET: /api/items/GET: Get a list of all items
const getItems = () => {
    const sql = 'SELECT * FROM teama.items';
    return db.query(sql)
        .then(results => results.map(result => Item.fromDB(result)));
};

//api/items/:itemId/GET: Retrieve an item by id
const getItemById = itemId =>{
    const sql = 'SELECT * FROM teama.items WHERE item_id = ?';
    return db.query(sql,[itemId])
        .then(results => results.map(result => Item.fromDB(result)));
}

//api/items/POST:Create a new item (story or issue)
const createItem = item => {
    console.log('Creating new item in db', item);
    const values = [project.id, board.id, status.id, priority.id, is_issue, item.name, item.description, due_date, time_estimate, created_by, assigned_to, labels];
    const sql = 'SET @insertId = 0; CALL add_item(?, ?,?, ?,?, ?,?, ?,?, ?,?, ?, @insertId); SELECT @insertId as insertId';
    return db.query(sql, [values]);
};
