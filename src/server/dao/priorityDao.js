const db = require('./PooledDatabaseConnection');
const Priority = require('../dto/Priority');

//api/priorities/GET: Get a list of priority objects
const getPriorities = () => {
    const sql = 'SELECT * FROM teama.priorities;
    return db.query(sql).then(results => results.map(result => Priority.fromDB(result)));
};


//api/priorities/POST: Create a new priority
const createPriority = priority => {
    console.log('Creating new priority in db', priority);
    const values = [project.id,priority.name, priority.description];
    const sql = 'SET @insertId = 0; CALL add_priority(?, ?, ?, @insertId); SELECT @insertId as insertId';
    return db.query(sql, [values]);
};

//api/priorites/:priorityId/GET:  Get a specific priority object by priority id
const getPriorityById = priorityId =>{
    const sql = 'SELECT * FROM teama.priorities WHERE priority_id = ?';
    return db.query(sql,[priorityId])
        .then(results => results.map(result =>Priority.fromDB(result)));
}

