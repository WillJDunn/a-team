const db = require('./PooledDatabaseConnection');
const Comment = require('../dto/Comment');

// api/items/:itemId/comments/GET:Get all comments for an item
const getCommentByItemId = itemId => {
    const sql = 'SELECT * FROM teama.comments WHERE item_id = ?';
    return db.query(sql, [itemId])
        .then(results => results.map(result => Comment.fromDB(result)));
};

///api/items/:itemId/comments/POST:Add a new comment to the item
const createComment = comment => {
    console.log('Creating new comment in db', project);
    const values = [project.id, board.id, status.id, priority.id, is_issue, item.name, description, due_date, time_estimate, created_by, assigned_to, labels];
    const sql = 'SET @insertId = 0; CALL add_item(?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?, @insertId); SELECT @insertId as insertId';
    return db.query(sql, [values]);
};