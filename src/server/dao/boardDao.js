const db = require('./PooledDatabaseConnection');
const Board = require('../dto/Board');

const getBoards = () => {
  const sql = 'SELECT * FROM teama.boards';
  return db.query(sql)
    .then(results => results.map(result => Board.fromDB(result)));
};

const getBoardsForProject = projectId => {
  const sql = 'SELECT * FROM teama.boards WHERE project_id = ?';
  return db.query(sql, [projectId])
    .then(results => results.map(result => Board.fromDB(result)));
};

const createBoardForProject = (projectId, board) => {
  const values = [projectId, board.name, board.description];
  const sql = 'SET @insertId = 0; CALL add_board(?, ?, ?, @insertId); SELECT @insertId as insertId';
  return db.query(sql, values)
    .then(dbRes => {
      const rows = dbRes[dbRes.length - 1];
      return rows[0].insertId;
    })
    ;
};

module.exports = {
  getBoards,
  getBoardsForProject,
  createBoardForProject,
};
