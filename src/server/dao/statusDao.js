const db = require('./PooledDatabaseConnection');
const Status = require('../dto/Status');

//api/statuses/GET: Get a list of status objects
const getStatuses = () => {
    const sql = 'SELECT * FROM teama.statuses';
    return db.query(sql)
        .then(results => results.map(result => Status.fromDB(result)));
};


//api/statuses/POST: Create a new status
const createStatus = status => {
    console.log('Creating new status in db', status);
    const values = [board.id, status.name, statust.description];
    const sql = 'SET @insertId = 0; CALL add_status(?, ?, ?, @insertId); SELECT @insertId as insertId';
    return db.query(sql, [values]);
};


//api/priorities/:statusId/GET:  Get a specific status object by status id
const getPriorityById = priorityId => {
    const sql = 'SELECT * FROM teama.statuses WHERE priority_id = ?';
    return db.query(sql, [priorityId])
        .then(results => results.map(result => Status.fromDB(result)));
};